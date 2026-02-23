"use client";

import { motion } from "framer-motion";
import { Card, CardBody, CardHeader } from "./ui/Card";
import styles from "./HowItWorks.module.css";

const steps = [
  {
    number: "01",
    title: "Design",
    description:
      "Build workflows visually. No code required. Smart defaults for common operations patterns.",
    icon: "✎",
  },
  {
    number: "02",
    title: "Verify",
    description:
      "AI proposes actions. Your policies verify. Real-time checks before anything touches production.",
    icon: "✓",
  },
  {
    number: "03",
    title: "Execute",
    description:
      "Deploy with full confidence. Every action logged. Immutable audit trails for compliance.",
    icon: "→",
  },
];

export function HowItWorks() {
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
        ease: "easeOut",
      },
    },
  };

  return (
    <section className={styles.section}>
      <div className={`${styles.content} container`}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={itemVariants}
        >
          <h2 className={styles.title}>Governance in 3 Steps</h2>
          <p className={styles.subtitle}>
            Design once. Verify always. Execute fearlessly.
          </p>
        </motion.div>

        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {steps.map((step, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card variant="elevated">
                <CardHeader>
                  <div className={styles.stepNumber}>{step.number}</div>
                  <h3>{step.title}</h3>
                </CardHeader>
                <CardBody>
                  <p>{step.description}</p>
                  <div className={styles.icon}>{step.icon}</div>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className={styles.flow}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={itemVariants}
        >
          <div className={styles.flowItem}>
            <span className={styles.flowLabel}>Your Teams</span>
            <div className={styles.flowArrow}>→</div>
            <span className={styles.flowLabel}>AI Execution</span>
            <div className={styles.flowArrow}>→</div>
            <span className={styles.flowLabel}>Policy Verification</span>
            <div className={styles.flowArrow}>→</div>
            <span className={styles.flowLabel}>Production Ready</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
