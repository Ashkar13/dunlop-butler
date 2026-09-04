"use client";

import { useId, useState } from "react";
import { BASIC_PLAN, PREMIUM_PLAN, PREMIUM_TERMS } from "@/data/site";
import styles from "./Pricing.module.css";

function Feature({ text }: { text: string }) {
  return (
    <li className={styles.feature}>
      <img
        src="/assets/icons/check.svg"
        alt=""
        width={24}
        height={24}
        aria-hidden="true"
      />
      <span>{text}</span>
    </li>
  );
}

/**
 * Figma developer note on node 59885:976: "The premium card's price and
 * duration are dynamic. Selecting a different tab (3 / 4 / 6 months) updates
 * the displayed price and period in real time — no page reload required."
 *
 * The switch is wired. Only the 4-month price ($14.95) appears in the design,
 * so the other two terms state plainly that their price is still to come
 * rather than showing a made-up number.
 */
export function Pricing() {
  const [termId, setTermId] = useState("4m");
  const groupId = useId();
  const term = PREMIUM_TERMS.find((t) => t.id === termId) ?? PREMIUM_TERMS[1];

  return (
    <section className={styles.section} aria-labelledby="pricing-title">
      <div className={`container ${styles.inner}`}>
        <header className={styles.heading}>
          <h2 id="pricing-title" className="sectionHeading">
            Simple, scalable pricing
          </h2>
          <p className="sectionSub">
            Flat-fee listings with a clear path to premium upgrades.
          </p>
        </header>

        <div className={styles.grid}>
          {/* ---------------------------------------------------- Basic */}
          <article className={styles.card}>
            <div className={styles.planHead}>
              <div className={styles.planTitleRow}>
                <img
                  src={BASIC_PLAN.icon}
                  alt=""
                  width={32}
                  height={32}
                  aria-hidden="true"
                />
                <h3 className={styles.planName}>{BASIC_PLAN.name}</h3>
              </div>
              <p className={styles.planDesc}>{BASIC_PLAN.description}</p>
            </div>

            <div className={styles.priceRow}>
              <p className={styles.priceGroup}>
                <span className={styles.price}>{BASIC_PLAN.price}</span>
                <span className={styles.period}>{BASIC_PLAN.period}</span>
              </p>
              <p className={styles.note}>{BASIC_PLAN.note}</p>
            </div>

            <ul className={styles.features}>
              {BASIC_PLAN.features.map((f) => (
                <Feature key={f} text={f} />
              ))}
            </ul>
          </article>

          {/* -------------------------------------------------- Premium */}
          <article className={`${styles.card} ${styles.cardFeatured}`}>
            <div className={styles.planHead}>
              <div className={styles.planTitleRow}>
                <img
                  src={PREMIUM_PLAN.icon}
                  alt=""
                  width={32}
                  height={32}
                  aria-hidden="true"
                />
                <h3 className={styles.planName}>{PREMIUM_PLAN.name}</h3>
                <span className={styles.badge}>{PREMIUM_PLAN.badge}</span>
              </div>
              <p className={styles.planDesc}>{PREMIUM_PLAN.description}</p>
            </div>

            <div
              className={styles.termTabs}
              role="radiogroup"
              aria-label="Premium listing term"
            >
              {PREMIUM_TERMS.map((option) => {
                const selected = option.id === termId;
                return (
                  <button
                    key={option.id}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    id={`${groupId}-${option.id}`}
                    className={styles.termTab}
                    data-selected={selected}
                    onClick={() => setTermId(option.id)}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>

            <div className={styles.priceRow} aria-live="polite">
              {term.price ? (
                <p className={styles.priceGroup}>
                  <span className={styles.price}>{term.price}</span>
                  <span className={styles.period}>{term.period}</span>
                </p>
              ) : (
                <p className={styles.pricePending}>
                  Price for {term.label.toLowerCase()} hasn’t been supplied yet
                  — only the 4-month rate appears in the design.
                </p>
              )}
              <p className={styles.note}>{PREMIUM_PLAN.note}</p>
            </div>

            <ul className={styles.features}>
              {PREMIUM_PLAN.features.map((f) => (
                <Feature key={f} text={f} />
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}
