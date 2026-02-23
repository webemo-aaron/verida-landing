"use client";

import { motion } from "framer-motion";
import { EmailForm } from "./EmailForm";
import styles from "./Hero.module.css";

export function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
      },
    },
  };

  return (
    <section className={styles.hero}>
      <div className={styles.background}>
        <div className={styles.gradient} />
      </div>

      <motion.div
        className={`${styles.content} container`}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <p className={styles.badge}>Trusted by 500+ Operations Teams</p>
        </motion.div>

        <motion.h1 variants={itemVariants} className={styles.headline}>
          Trusted AI Execution for Operations
        </motion.h1>

        <motion.p variants={itemVariants} className={styles.subheader}>
          Govern your workflows. Execute with confidence. Stay audit-ready by
          design.
        </motion.p>

        <motion.div variants={itemVariants} className={styles.ctaContainer}>
          <EmailForm variant="inline" />
        </motion.div>

        <motion.p variants={itemVariants} className={styles.footnote}>
          Join early access. No credit card required.
        </motion.p>
      </motion.div>
    </section>
  );
}
