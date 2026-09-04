"use client";

import { FOOTER_MENUS, SITE } from "@/data/site";
import { usePreview } from "@/components/preview/PreviewProvider";
import styles from "./SiteFooter.module.css";

export function SiteFooter() {
  const { notConnected } = usePreview();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <p className={styles.copyright}>{SITE.copyright}</p>

        <div className={styles.menus}>
          {FOOTER_MENUS.map((menu) => (
            <nav key={menu.title} aria-label={menu.title} className={styles.menu}>
              <h2 className={styles.menuTitle}>{menu.title}</h2>
              <ul className={styles.links}>
                {menu.links.map((link) => (
                  <li key={link}>
                    <button
                      type="button"
                      className={styles.link}
                      onClick={() => notConnected(link)}
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>
    </footer>
  );
}
