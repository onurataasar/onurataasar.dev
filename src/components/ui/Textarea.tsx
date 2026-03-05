"use client";

import { forwardRef } from "react";

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "className"> {
  label?: string;
  error?: string;
}

const baseTextareaClasses =
  "w-full rounded-xl border border-current/20 bg-white/5 backdrop-blur-sm px-4 py-3 text-base lg:text-lg transition-all duration-300 placeholder:opacity-50 focus:outline-none focus:ring-2 focus:ring-current/30 focus:border-current/40 hover:border-current/30 resize-y min-h-[140px] lg:min-h-[180px]";

/**
 * Form textarea — Input ile aynı görsel dil.
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, id, ...props }, ref) => {
    const textareaId = id ?? label?.toLowerCase().replace(/\s/g, "-");

    return (
      <div className="space-y-1.5">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-sm font-medium opacity-80"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={baseTextareaClasses}
          aria-invalid={!!error}
          aria-describedby={error ? `${textareaId}-error` : undefined}
          {...props}
        />
        {error && (
          <p
            id={`${textareaId}-error`}
            className="text-sm opacity-80"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
