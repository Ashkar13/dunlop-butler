import Image from "next/image";
import { SITE } from "@/data/site";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <Image
        className={styles.image}
        src="/assets/images/hero-interior-wide.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        quality={90}
      />
      <div className={styles.scrim} aria-hidden="true" />
      <div className={`container ${styles.content}`}>
        <h1 id="hero-title" className={styles.title}>
          {SITE.name}
        </h1>
        <p className={styles.lead}>{SITE.tagline}</p>
        <p className={styles.states}>All 50 states</p>
        <p className={styles.note}>Advertise your affordable living solution.</p>
      </div>
    </section>
  );
}
