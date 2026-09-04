import Image from "next/image";
import { BOOK } from "@/data/site";
import styles from "./BookPromo.module.css";

export function BookPromo() {
  return (
    <section className={styles.section} aria-labelledby="book-title">
      <div className="container">
        <div className={styles.panel}>
          {/* The cover is taken out of flow and pinned to the card's bottom
              edge, so nothing — padding, margin or an inline baseline — can sit
              underneath it. The card clips whatever overflows. */}
          <Image
            className={styles.cover}
            src={BOOK.cover}
            alt="Cover of “Everything You Need To Know About Tiny Homes & ADUs”, 2026 Edition"
            width={BOOK.coverWidth}
            height={BOOK.coverHeight}
            sizes="(min-width: 900px) 561px, 70vw"
          />
          {/* Reserves the cover's column so the copy never sits over it. */}
          <div className={styles.coverSpacer} aria-hidden="true" />

          <div className={styles.copy}>
            <div className={styles.text}>
              <h2 id="book-title" className={styles.title}>
                {BOOK.title}
              </h2>
              <p className={styles.subtitle}>{BOOK.subtitle}</p>
            </div>
            <a
              className={styles.cta}
              href={BOOK.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {BOOK.cta}
              <span className="visually-hidden">
                {" "}
                on Amazon (opens in a new tab)
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
