import { SITE } from "@/data/site";
import styles from "./AnnouncementStrip.module.css";

export function AnnouncementStrip() {
  return (
    <div className={styles.strip}>
      <p className={styles.text}>{SITE.strapline}</p>
    </div>
  );
}
