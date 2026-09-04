"use client";

import Image from "next/image";
import { useId, useState, type FormEvent } from "react";
import { COUNTRY, SEARCH_SCOPES, type SearchScope } from "@/data/site";
import { usePreview } from "@/components/preview/PreviewProvider";
import styles from "./SiteHeader.module.css";

export function SiteHeader() {
  const { notConnected, announce, favorites, setSearch } = usePreview();
  const [scope, setScope] = useState<SearchScope>("all");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const menuId = useId();
  const scopeId = useId();
  const stateId = useId();
  const zipId = useId();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const term = state.trim() || zip.trim();
    setSearch({ scope, query: term });
    setMenuOpen(false);

    if (zip.trim() && !state.trim()) {
      announce(
        "ZIP search needs the live listings service, which isn’t connected in this preview. Showing matching categories instead.",
      );
    } else if (term) {
      announce(`Showing categories matching “${term}”.`);
    } else {
      announce(
        scope === "all"
          ? "Showing all categories."
          : `Showing ${SEARCH_SCOPES.find((s) => s.value === scope)?.label} categories.`,
      );
    }

    document
      .getElementById("categories")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.topRow}>
          <a
            className={styles.logoLink}
            href="#main"
            aria-label="Dunlop & Butler — home"
          >
            <Image
              className={styles.logo}
              src="/assets/logos/dunlop-butler-logo.png"
              alt="Dunlop &amp; Butler — Tiny Homes &amp; ADUs, national classified ads"
              width={482}
              height={96}
              priority
            />
          </a>

          <button
            type="button"
            className={styles.country}
            onClick={() => notConnected("Country selector")}
            aria-label={`Country: ${COUNTRY.label}. Changing country is not connected in this preview.`}
          >
            <Image
              src={COUNTRY.flag}
              alt=""
              width={20}
              height={15}
              className={styles.flag}
            />
            <span className={styles.countryCode}>{COUNTRY.code}</span>
            <img
              src="/assets/icons/chevron-down.svg"
              alt=""
              width={16}
              height={16}
              aria-hidden="true"
            />
          </button>

          <form
            className={styles.search}
            role="search"
            onSubmit={handleSubmit}
            aria-label="Search classified ads"
          >
            <div className={styles.scopeField}>
              <label className="visually-hidden" htmlFor={scopeId}>
                Category
              </label>
              <select
                id={scopeId}
                className={styles.scopeSelect}
                value={scope}
                onChange={(e) => setScope(e.target.value as SearchScope)}
              >
                {SEARCH_SCOPES.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <img
                className={styles.scopeChevron}
                src="/assets/icons/chevron-down.svg"
                alt=""
                width={16}
                height={16}
                aria-hidden="true"
              />
            </div>

            <span className={styles.divider} aria-hidden="true" />

            <div className={styles.field}>
              <label className="visually-hidden" htmlFor={stateId}>
                Search by state
              </label>
              <input
                id={stateId}
                className={styles.input}
                type="search"
                placeholder="Search by state"
                value={state}
                onChange={(e) => setState(e.target.value)}
                autoComplete="address-level1"
              />
            </div>

            <span className={styles.divider} aria-hidden="true" />

            <div className={styles.field}>
              <label className="visually-hidden" htmlFor={zipId}>
                Search by zip code
              </label>
              <input
                id={zipId}
                className={styles.input}
                type="search"
                inputMode="numeric"
                placeholder="Search by zip code"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                autoComplete="postal-code"
              />
            </div>

            <button type="submit" className={styles.searchSubmit}>
              <img
                src="/assets/icons/search.svg"
                alt=""
                width={20}
                height={20}
                aria-hidden="true"
              />
              <span className={styles.searchSubmitLabel}>Search</span>
            </button>
          </form>

          <button
            type="button"
            className={styles.menuToggle}
            aria-expanded={menuOpen}
            aria-controls={menuId}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className={styles.burger} aria-hidden="true" />
            <span>{menuOpen ? "Close" : "Menu"}</span>
          </button>

          <div className={styles.menu} id={menuId} data-open={menuOpen}>
            <button
              type="button"
              className={styles.iconButton}
              onClick={() =>
                announce(
                  favorites.length
                    ? `${favorites.length} saved ad${favorites.length === 1 ? "" : "s"} in this session. Saving is demo-only and resets on reload.`
                    : "No saved ads yet. Use the heart on a listing card — saving is demo-only in this preview.",
                )
              }
            >
              <img
                src="/assets/icons/heart.svg"
                alt=""
                width={20}
                height={20}
                aria-hidden="true"
              />
              <span className={styles.iconButtonLabel}>Saved ads</span>
              {favorites.length > 0 ? (
                <span className={styles.badge}>{favorites.length}</span>
              ) : null}
              <span className="visually-hidden">
                {favorites.length} saved, demo only
              </span>
            </button>

            <button
              type="button"
              className={styles.account}
              onClick={() => notConnected("My Account")}
            >
              <img
                src="/assets/icons/user.svg"
                alt=""
                width={20}
                height={20}
                aria-hidden="true"
              />
              <span>My Account</span>
            </button>

            <button
              type="button"
              className={styles.postAd}
              onClick={() => notConnected("Post an Ad")}
            >
              Post an Ad
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
