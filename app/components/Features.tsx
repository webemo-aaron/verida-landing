"use client";

import { motion } from "framer-motion";
import { Card, CardBody } from "./ui/Card";
import styles from "./Features.module.css";

const features = [
  {
    icon: "🔒",
    title: "Policy-Driven Execution",
    description:
      "Define policies once. Enforce them everywhere. Governance that scales without friction.",
  },
  {
    icon: "✓",
    title: "Real-Time Verification",
    description:
      "AI proposes, humans verify. Every execution checked against your custom rules.",
  },
  {
    icon: "📋",
    title: "Immutable Audit Trails",
    description:
      "Every decision logged. 30+ day retention. Compliance-ready by design.",
  },
  {
    icon: "🔌",
    title: "300+ Integrations",
    description:
      "CRM, helpdesk, accounting, HR, Slack, email, databases, custom APIs.",
  },
  {
    icon: "🎨",
    title: "Visual Workflow Builder",
    description: "Design complex workflows without code. Deploy in days, not months.",
  },
  {
    icon: "🌐",
    title: "Self-Hosted & Hybrid",
    description:
      "VPC, air-gapped, on-premises, or cloud. Your infrastructure, your rules.",
  },
];

export function Features() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
        duration: 0.6,
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
          <h2 className={styles.title}>Enterprise-Grade Controls Built In</h2>
          <p className={styles.subtitle}>
            Policy enforcement, verification gates, and audit trails—not bolt-ons.
          </p>
        </motion.div>

        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card variant="elevated">
                <CardBody>
                  <div className={styles.icon}>{feature.icon}</div>
                  <h3 className={styles.featureTitle}>{feature.title}</h3>
                  <p className={styles.description}>{feature.description}</p>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
