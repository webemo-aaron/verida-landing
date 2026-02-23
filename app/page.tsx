import { Hero } from "./components/Hero";
import { HowItWorks } from "./components/HowItWorks";
import { UseCases } from "./components/UseCases";
import { Features } from "./components/Features";
import { Comparison } from "./components/Comparison";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main>
      <Hero />
      <HowItWorks />
      <UseCases />
      <Features />
      <Comparison />
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <p>&copy; 2026 Verida. All rights reserved.</p>
          <div className={styles.footerLinks}>
            <a href="#privacy">Privacy</a>
            <a href="#terms">Terms</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
