"use client";

import React, { useState } from "react";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import styles from "./EmailForm.module.css";

interface EmailFormProps {
  variant?: "inline" | "stacked";
  onSuccess?: () => void;
}

export function EmailForm({ variant = "inline", onSuccess }: EmailFormProps) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Get reCAPTCHA token
      const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY?.trim();
      if (!siteKey) {
        throw new Error("reCAPTCHA not configured");
      }

      const token = await new Promise<string>((resolve, reject) => {
        (window as any).grecaptcha.ready(() => {
          (window as any).grecaptcha
            .execute(siteKey, { action: "submit" })
            .then(resolve)
            .catch(reject);
        });
      });

      const response = await fetch("/api/email/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email, 
          role: role || "other", 
          company,
          recaptchaToken: token 
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to subscribe");
      }

      setSuccess(true);
      setEmail("");
      setRole("");
      setCompany("");

      if (onSuccess) {
        onSuccess();
      }

      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const variantClass = styles[`variant-${variant}`];

  if (success) {
    return (
      <div className={`${styles.form} ${variantClass} ${styles.success}`}>
        <div className={styles.successMessage}>
          <span className={styles.checkmark}>✓</span>
          <div>
            <p style={{ marginBottom: 0, fontWeight: 600 }}>
              Check your email
            </p>
            <p style={{ marginBottom: 0, fontSize: "0.9rem" }}>
              We'll send you updates on early access.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`${styles.form} ${variantClass}`}>
      <Input
        type="email"
        placeholder="you@company.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        disabled={loading}
        aria-label="Email address"
      />

      {variant === "stacked" && (
        <>
          <select
            className={styles.select}
            value={role}
            onChange={(e) => setRole(e.target.value)}
            disabled={loading}
            aria-label="Your role"
          >
            <option value="">Your role (optional)</option>
            <option value="operations-lead">Operations Lead</option>
            <option value="cto">CTO / VP Engineering</option>
            <option value="compliance">Compliance Officer</option>
            <option value="developer">Developer</option>
            <option value="other">Other</option>
          </select>

          <Input
            type="text"
            placeholder="Company (optional)"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            disabled={loading}
            aria-label="Company name"
          />
        </>
      )}

      {error && <p className={styles.error}>{error}</p>}

      <Button
        type="submit"
        disabled={loading}
        style={{ width: "100%" }}
      >
        {loading ? "Joining..." : "Join Early Access"}
      </Button>
    </form>
  );
}
