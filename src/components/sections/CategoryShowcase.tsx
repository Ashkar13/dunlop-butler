"use client";

import Image from "next/image";
import { useId, useRef, useState, type KeyboardEvent } from "react";
import { SHOWCASE_CARDS, SHOWCASE_TABS } from "@/data/site";
import { usePreview } from "@/components/preview/PreviewProvider";
import styles from "./CategoryShowcase.module.css";

/**
 * Quick-filter tabs (Figma developer note on node 59885:890): "the cards
 * displayed below update dynamically based on the selected tab".
 *
 * The filtering is real, over the local card data. Two of the five tabs have
 * no cards in the supplied design, so they render a named empty state rather
 * than invented listings.
 */
export function CategoryShowcase() {
  const [active, setActive] = useState(SHOWCASE_TABS[0].id);
  const { isFavorite, toggleFavorite, notConnected } = usePreview();
  const listRef = useRef<HTMLDivElement>(null);
  const baseId = useId();

  const activeTab =
    SHOWCASE_TABS.find((tab) => tab.id === active) ?? SHOWCASE_TABS[0];
  const cards = SHOWCASE_CARDS.filter((card) => card.tab === active);

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const keys = ["ArrowLeft", "ArrowRight", "Home", "End"];
    if (!keys.includes(event.key)) return;
    event.preventDefault();
    const index = SHOWCASE_TABS.findIndex((tab) => tab.id === active);
    let next = index;
    if (event.key === "ArrowLeft")
      next = (index - 1 + SHOWCASE_TABS.length) % SHOWCASE_TABS.length;
    if (event.key === "ArrowRight") next = (index + 1) % SHOWCASE_TABS.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = SHOWCASE_TABS.length - 1;
    setActive(SHOWCASE_TABS[next].id);
    listRef.current
      ?.querySelectorAll<HTMLButtonElement>("[role='tab']")
      [next]?.focus();
  }

  return (
    <section className={styles.section} aria-labelledby="showcase-title">
      <div className={`container ${styles.inner}`}>
        <header className={styles.heading}>
          <h2 id="showcase-title" className="sectionHeading">
            Every category, one platform
          </h2>
          <p className={`sectionSub ${styles.sub}`}>
            Browse by property type, or jump straight to manufacturers,
            contractors, and resources.
          </p>
        </header>

        <div className={styles.tabScroller}>
          <div
            className={styles.tabs}
            role="tablist"
            aria-label="Filter listings by category"
            ref={listRef}
            onKeyDown={onKeyDown}
          >
            {SHOWCASE_TABS.map((tab) => {
              const selected = tab.id === active;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  id={`${baseId}-tab-${tab.id}`}
                  aria-selected={selected}
                  aria-controls={`${baseId}-panel`}
                  tabIndex={selected ? 0 : -1}
                  className={styles.tab}
                  data-selected={selected}
                  onClick={() => setActive(tab.id)}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div
          className={styles.panel}
          role="tabpanel"
          id={`${baseId}-panel`}
          aria-labelledby={`${baseId}-tab-${active}`}
          tabIndex={-1}
        >
          {cards.length > 0 ? (
            <ul className={styles.grid} key={active}>
              {cards.map((card) => {
                const saved = isFavorite(card.id);
                return (
                  <li key={card.id} className={styles.card}>
                    <div
                      className={styles.media}
                      data-contain={card.tab === "our-book"}
                    >
                      <Image
                        className={styles.image}
                        src={card.image}
                        alt={card.title}
                        width={card.width}
                        height={card.height}
                        sizes="(min-width: 1200px) 282px, (min-width: 768px) 45vw, 92vw"
                      />
                      <button
                        type="button"
                        className={styles.save}
                        aria-pressed={saved}
                        onClick={() => toggleFavorite(card.id, card.title)}
                      >
                        <img
                          src="/assets/icons/heart.svg"
                          alt=""
                          width={20}
                          height={20}
                          aria-hidden="true"
                        />
                        <span className="visually-hidden">
                          {saved ? "Remove" : "Save"} {card.title} (demo only)
                        </span>
                      </button>
                    </div>
                    <div className={styles.body}>
                      <h3 className={styles.cardTitle}>{card.title}</h3>
                      <p className={styles.cardText}>{card.description}</p>
                      {card.href ? (
                        <a
                          className={styles.cta}
                          href={card.href}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View Details
                          <span className="visually-hidden">
                            {" "}
                            for {card.title} (opens Amazon in a new tab)
                          </span>
                        </a>
                      ) : (
                        <button
                          type="button"
                          className={styles.cta}
                          onClick={() =>
                            notConnected(`View details — ${card.title}`)
                          }
                        >
                          View Details
                          <span className="visually-hidden">
                            {" "}
                            for {card.title}
                          </span>
                        </button>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className={styles.emptyState}>
              <strong>{activeTab.label}</strong> —{" "}
              {activeTab.missing ??
                "No cards have been supplied for this category yet."}{" "}
              This preview only renders content that came with the design.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
