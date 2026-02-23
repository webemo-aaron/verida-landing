"use client";

import { motion } from "framer-motion";
import { Card, CardBody, CardHeader } from "./ui/Card";
import styles from "./UseCases.module.css";

const useCases = [
  {
    icon: "💬",
    title: "SupportOps",
    description: "Ticket triage, escalation routing, and auto-response verification.",
  },
  {
    icon: "📈",
    title: "RevOps",
    description: "Lead qualification, pipeline management, contract automation.",
  },
  {
    icon: "✓",
    title: "Compliance",
    description: "Compliance checks, audit logging, regulatory automation.",
  },
  {
    icon: "👥",
    title: "HR Operations",
    description: "Onboarding, offer letters, leave requests with governance.",
  },
  {
    icon: "💳",
    title: "Finance",
    description: "Expense approvals, invoice processing, reconciliation.",
  },
  {
    icon: "⚙️",
    title: "DevOps",
    description: "Incident response, deployment approvals, infrastructure decisions.",
  },
];

export function UseCases() {
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
          <h2 className={styles.title}>Built for Every Operations Team</h2>
          <p className={styles.subtitle}>
            Whether SupportOps or DevOps, Verida brings governance to your
            workflows.
          </p>
        </motion.div>

        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {useCases.map((useCase, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card variant="bordered">
                <CardBody>
                  <div className={styles.icon}>{useCase.icon}</div>
                  <h3 className={styles.caseTitle}>{useCase.title}</h3>
                  <p className={styles.description}>{useCase.description}</p>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
