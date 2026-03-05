"use client";

import { forwardRef } from "react";

export interface InputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "className"
> {
  label?: string;
  error?: string;
}

const baseInputClasses =
  "w-full rounded-xl border border-current/20 bg-white/5 backdrop-blur-sm px-4 py-3 text-base transition-all duration-300 placeholder:opacity-50 focus:outline-none focus:ring-2 focus:ring-current/30 focus:border-current/40 hover:border-current/30";

/**
 * Form input — diğer section'larla uyumlu stil.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s/g, "-");

    return (
      <div className="space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium opacity-80"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={baseInputClasses}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...props}
        />
        {error && (
          <p
            id={`${inputId}-error`}
            className="text-sm opacity-80"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
