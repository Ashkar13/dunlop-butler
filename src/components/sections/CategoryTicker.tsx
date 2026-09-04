"use client";

import { useState } from "react";
import { TICKER_ITEMS } from "@/data/site";
import styles from "./CategoryTicker.module.css";

/**
 * Seamless marquee: the item run is rendered twice and the track slides by
 * exactly half its width, so the loop has no visible seam. The duplicate run
 * is hidden from assistive tech, the whole strip pauses on hover and on
 * keyboard focus, and an explicit pause control is always available.
 */
export function CategoryTicker() {
  const [paused, setPaused] = useState(false);

  const run = (duplicate: boolean) => (
    <ul
      className={styles.run}
      aria-hidden={duplicate || undefined}
      role={duplicate ? "presentation" : undefined}
    >
      {TICKER_ITEMS.map((item) => (
        <li key={item} className={styles.item}>
          <span className={styles.label}>{item}</span>
          <span className={styles.dot} aria-hidden="true" />
        </li>
      ))}
    </ul>
  );

  return (
    <div className={styles.strip}>
      <div
        className={styles.viewport}
        data-paused={paused}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className={styles.track}>
          {run(false)}
          {run(true)}
        </div>
      </div>
      <div className={`container ${styles.controlRow}`}>
        <button
          type="button"
          className={styles.control}
          aria-pressed={paused}
          onClick={() => setPaused((p) => !p)}
        >
          {paused ? "Play category strip" : "Pause category strip"}
        </button>
      </div>
    </div>
  );
}
