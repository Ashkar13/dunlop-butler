"use client";

import { STATS } from "@/data/site";
import { useCountUp } from "@/components/ui/useCountUp";
import styles from "./StatsBand.module.css";

// Module-level constant so the hook's inputs never change identity.
const VALUES = STATS.map((stat) => stat.value);

export function StatsBand() {
  const { containerRef, display } = useCountUp<HTMLElement>(VALUES);

  return (
    <section
      className={styles.band}
      aria-label="Market at a glance"
      ref={containerRef}
    >
      <div className={`container ${styles.grid}`}>
        {STATS.map((stat, index) => (
          <div key={stat.label} className={styles.stat}>
            <p className={styles.value}>
              {/* Reserves the final size so the box never reflows mid-count. */}
              <span className={styles.sizer} aria-hidden="true">
                {stat.value}
              </span>
              <span className={styles.live} aria-hidden="true">
                {display[index]}
              </span>
              {/* Assistive tech gets the finished figure, announced once. */}
              <span className="visually-hidden">{stat.value}</span>
            </p>
            <p className={styles.label}>{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
