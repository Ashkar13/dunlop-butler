"use client";

import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type RefObject,
} from "react";

/**
 * Reusable count-up animation. No dependencies.
 *
 * Give it the display strings exactly as they should end up ("31.5B", "40+",
 * "180%") and it returns a ref to attach to the container plus the strings to
 * render. Everything animates from zero on one shared clock, so a row of
 * figures starts and lands together.
 *
 * Behaviour:
 *  - starts the first time the container enters the viewport, once per load
 *  - eases out over `duration` ms and lands on the supplied string verbatim,
 *    so decimals and suffixes are never re-derived or rounded away
 *  - server-renders (and no-JS renders) the final values, so the markup is
 *    correct without JavaScript
 *  - honours `prefers-reduced-motion: reduce` by never starting
 */

export type Metric = {
  /** Anything before the number, e.g. a currency symbol. */
  prefix: string;
  value: number;
  decimals: number;
  /** Anything after the number: "B", "+", "%". */
  suffix: string;
  /** The original string, used as the exact landing value. */
  raw: string;
};

export function parseMetric(raw: string): Metric {
  const match = raw.match(/^(\D*?)(-?\d+(?:\.\d+)?)(.*)$/);
  if (!match) return { prefix: "", value: 0, decimals: 0, suffix: raw, raw };
  const [, prefix, digits, suffix] = match;
  const dot = digits.indexOf(".");
  return {
    prefix,
    value: Number(digits),
    decimals: dot === -1 ? 0 : digits.length - dot - 1,
    suffix,
    raw,
  };
}

export function formatMetric(metric: Metric, current: number): string {
  return metric.prefix + current.toFixed(metric.decimals) + metric.suffix;
}

/** Natural deceleration — fast off the mark, gentle landing. */
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

// useLayoutEffect warns during SSR; fall back to useEffect on the server.
const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

export function useCountUp<T extends HTMLElement>(
  values: readonly string[],
  duration = 1800,
): { containerRef: RefObject<T | null>; display: string[] } {
  const key = values.join("|");
  const metrics = useMemo(
    () => key.split("|").map(parseMetric),
    // `key` is the stable identity of `values`
    [key],
  );

  const containerRef = useRef<T | null>(null);
  const started = useRef(false);
  const [display, setDisplay] = useState<string[]>(() =>
    metrics.map((m) => m.raw),
  );

  useIsomorphicLayoutEffect(() => {
    const el = containerRef.current;
    if (!el || started.current) return;

    const prefersReduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced || typeof IntersectionObserver === "undefined") {
      // Final values are already rendered — nothing to do.
      return;
    }

    // Reset to zero before the browser paints, so there is no flash of the
    // final number before the animation begins.
    setDisplay(metrics.map((m) => formatMetric(m, 0)));

    let frame = 0;

    const run = () => {
      const start = performance.now();
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        if (t < 1) {
          const eased = easeOutCubic(t);
          setDisplay(metrics.map((m) => formatMetric(m, m.value * eased)));
          frame = requestAnimationFrame(step);
        } else {
          // Land on the supplied strings exactly.
          setDisplay(metrics.map((m) => m.raw));
        }
      };
      frame = requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            observer.disconnect();
            run();
          }
        }
      },
      { threshold: 0.35 },
    );

    /* Only start observing once the page has finished loading and the browser
       has laid out a frame. During hydration the document can still be short
       — images and fonts have not settled — which briefly puts a below-the-fold
       section inside the viewport and would fire the observer immediately. */
    let settle = 0;
    const startObserving = () => {
      settle = requestAnimationFrame(() => {
        if (containerRef.current) observer.observe(containerRef.current);
      });
    };

    if (document.readyState === "complete") {
      startObserving();
    } else {
      window.addEventListener("load", startObserving, { once: true });
    }

    return () => {
      window.removeEventListener("load", startObserving);
      observer.disconnect();
      cancelAnimationFrame(settle);
      cancelAnimationFrame(frame);
    };
  }, [metrics, duration]);

  return { containerRef, display };
}
