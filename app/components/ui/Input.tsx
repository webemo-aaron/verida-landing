import React from "react";
import styles from "./Input.module.css";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({
  label,
  error,
  className = "",
  ...props
}: InputProps) {
  const id = props.id || props.name;

  return (
    <div className={styles.wrapper}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}
      <input className={`${styles.input} ${className}`} id={id} {...props} />
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
}
