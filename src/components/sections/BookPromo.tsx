import Image from "next/image";
import { BOOK } from "@/data/site";
import styles from "./BookPromo.module.css";

export function BookPromo() {
  return (
    <section className={styles.section} aria-labelledby="book-title">
      <div className="container">
        <div className={styles.panel}>
          <div className={styles.coverFrame}>
            <Image
              className={styles.cover}
              src={BOOK.cover}
              alt="Cover of “Everything You Need To Know About Tiny Homes & ADUs”, 2026 Edition"
              width={900}
              height={606}
              sizes="(min-width: 900px) 422px, 80vw"
            />
          </div>

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
              <span className="visually-hidden"> on Amazon (opens in a new tab)</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
