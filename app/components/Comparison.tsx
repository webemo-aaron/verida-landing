"use client";

import { motion } from "framer-motion";
import styles from "./Comparison.module.css";

const comparisonData = [
  {
    feature: "Policy-Driven Governance",
    verida: true,
    zapier: false,
    make: false,
    n8n: false,
    retool: false,
  },
  {
    feature: "AI Execution + Verification",
    verida: true,
    zapier: false,
    make: false,
    n8n: "Limited",
    retool: true,
  },
  {
    feature: "Immutable Audit Trail",
    verida: true,
    zapier: "Limited",
    make: true,
    n8n: true,
    retool: true,
  },
  {
    feature: "Self-Hosted Deployment",
    verida: true,
    zapier: false,
    make: false,
    n8n: true,
    retool: true,
  },
  {
    feature: "Operations-First Design",
    verida: true,
    zapier: false,
    make: false,
    n8n: false,
    retool: false,
  },
  {
    feature: "Enterprise Compliance (SOC2, GDPR, HIPAA)",
    verida: true,
    zapier: false,
    make: false,
    n8n: "Partial",
    retool: true,
  },
];

export function Comparison() {
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

  const renderCell = (value: boolean | string) => {
    if (value === true) {
      return (
        <div className={styles.checkmark}>✓</div>
      );
    }
    if (value === false) {
      return <div className={styles.dash}>—</div>;
    }
    return <div className={styles.limited}>{value}</div>;
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
          <h2 className={styles.title}>Why Choose Verida?</h2>
          <p className={styles.subtitle}>
            How we compare to the leading automation platforms.
          </p>
        </motion.div>

        <motion.div
          className={styles.tableWrapper}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={itemVariants}
        >
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Capability</th>
                <th className={styles.veridaCol}>Verida</th>
                <th>Zapier</th>
                <th>Make</th>
                <th>n8n</th>
                <th>Retool</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, index) => (
                <tr key={index}>
                  <td className={styles.featureName}>{row.feature}</td>
                  <td className={styles.veridaCol}>{renderCell(row.verida)}</td>
                  <td>{renderCell(row.zapier)}</td>
                  <td>{renderCell(row.make)}</td>
                  <td>{renderCell(row.n8n)}</td>
                  <td>{renderCell(row.retool)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        <motion.p
          className={styles.note}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={itemVariants}
        >
          Verida leads on governance and trust-first design. Competitors excel in
          other areas (e.g., Zapier's ecosystem breadth, n8n's openness). Choose
          based on your priorities.
        </motion.p>
      </div>
    </section>
  );
}
