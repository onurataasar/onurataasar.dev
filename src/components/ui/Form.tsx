"use client";

import { type ReactNode } from "react";

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode;
  /** Form submit handler — backend/Formspree entegrasyonu için */
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
}

/**
 * Form wrapper — semantic form elementi, section stiliyle uyumlu.
 */
export function Form({ children, onSubmit, ...props }: FormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="space-y-4"
      noValidate
      {...props}
    >
      {children}
    </form>
  );
}
