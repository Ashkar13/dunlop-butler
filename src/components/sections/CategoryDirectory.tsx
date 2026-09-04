"use client";

import { useMemo } from "react";
import { DIRECTORY } from "@/data/site";
import { usePreview } from "@/components/preview/PreviewProvider";
import styles from "./CategoryDirectory.module.css";

/**
 * The header's search genuinely filters this directory: the scope select
 * chooses which vertical is shown, and the term matches category names.
 * It does not pretend to query a nationwide listings database — there isn't
 * one in this preview.
 */
export function CategoryDirectory() {
  const { search, setSearch, notConnected, announce } = usePreview();
  const term = search.query.trim().toLowerCase();

  const results = useMemo(() => {
    return DIRECTORY.filter(
      (group) => search.scope === "all" || search.scope === group.id,
    ).map((group) => {
      const all = [...group.columns[0], ...group.columns[1]];
      const matched = term
        ? all.filter((name) => name.toLowerCase().includes(term))
        : all;
      const half = Math.ceil(matched.length / 2);
      return {
        ...group,
        matched,
        columns: [matched.slice(0, half), matched.slice(half)] as [
          string[],
          string[],
        ],
      };
    });
  }, [search.scope, term]);

  const filtering = term.length > 0 || search.scope !== "all";
  const total = results.reduce((sum, group) => sum + group.matched.length, 0);

  return (
    <section
      className={styles.section}
      id="categories"
      aria-labelledby="categories-title"
    >
      <div className={`container ${styles.inner}`}>
        <header className={styles.heading}>
          <h2 id="categories-title" className="sectionHeading">
            Organized by what matters
          </h2>
          <p className="sectionSub">
            Explore Tiny Homes and ADUs together by category or search by state.
          </p>
        </header>

        {filtering ? (
          <div className={styles.filterBar} role="status">
            <p className={styles.filterText}>
              {total > 0
                ? `${total} categor${total === 1 ? "y" : "ies"} match${
                    term ? ` “${search.query.trim()}”` : " your selection"
                  }.`
                : `No categories match “${search.query.trim()}”.`}
            </p>
            <button
              type="button"
              className={styles.clear}
              onClick={() => {
                setSearch({ scope: "all", query: "" });
                announce("Search cleared. Showing all categories.");
              }}
            >
              Clear search
            </button>
          </div>
        ) : null}

        <div className={styles.grid}>
          {results.map((group) => (
            <article key={group.id} className={styles.card}>
              <div className={styles.cardHead}>
                <div className={styles.cardTitleWrap}>
                  <img
                    src={group.icon}
                    alt=""
                    width={32}
                    height={32}
                    aria-hidden="true"
                  />
                  <h3 className={styles.cardTitle}>{group.title}</h3>
                </div>
                <button
                  type="button"
                  className={styles.seeAll}
                  onClick={() => notConnected(`See all ${group.title}`)}
                >
                  <span>See All</span>
                  <img
                    src="/assets/icons/arrow-up-right.svg"
                    alt=""
                    width={16}
                    height={16}
                    aria-hidden="true"
                  />
                </button>
              </div>

              <hr className={styles.rule} />

              {group.matched.length === 0 ? (
                <p className={styles.empty}>
                  No {group.title} categories match this search.
                </p>
              ) : (
                <div className={styles.columns}>
                  {group.columns.map((column, index) => (
                    <ul key={index} className={styles.column}>
                      {column.map((name) => (
                        <li key={name}>
                          <button
                            type="button"
                            className={styles.link}
                            onClick={() => notConnected(name)}
                          >
                            {name}
                          </button>
                        </li>
                      ))}
                    </ul>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
