"use client";

import { motion, AnimatePresence } from "framer-motion";

interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  value: string;
  error?: string;
  touched?: boolean;
  as?: "input" | "textarea";
  placeholder?: string;
  onChange: (value: string) => void;
  onBlur: () => void;
}

export function FormField({
  label,
  name,
  type = "text",
  required = false,
  value,
  error,
  touched = false,
  as = "input",
  placeholder,
  onChange,
  onBlur,
}: FormFieldProps) {
  const hasError = Boolean(touched && error);
  const inputId = `field-${name}`;
  const errorId = `error-${name}`;

  const baseClasses =
    "w-full rounded-xl border bg-white/5 px-4 py-3 min-h-[44px] text-base text-white placeholder-gray-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500";
  const errorClasses = hasError
    ? "border-red-500/50 focus:ring-red-500/30 focus:border-red-500"
    : "border-white/10 hover:border-white/20";

  const fieldClasses = `${baseClasses} ${errorClasses}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <label
        htmlFor={inputId}
        className="mb-2 block text-sm font-medium text-gray-200"
      >
        {label}
        {required && (
          <span className="ml-1 text-purple-400" aria-hidden="true">
            *
          </span>
        )}
      </label>

      {as === "textarea" ? (
        <textarea
          id={inputId}
          name={name}
          value={value}
          placeholder={placeholder}
          required={required}
          rows={5}
          className={`${fieldClasses} resize-none py-3`}
          aria-invalid={hasError}
          aria-describedby={hasError ? errorId : undefined}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
        />
      ) : (
        <input
          id={inputId}
          name={name}
          type={type}
          value={value}
          placeholder={placeholder}
          required={required}
          className={fieldClasses}
          aria-invalid={hasError}
          aria-describedby={hasError ? errorId : undefined}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
        />
      )}

      <AnimatePresence mode="wait">
        {hasError && error && (
          <motion.p
            id={errorId}
            role="alert"
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: "auto", marginTop: 8 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden text-sm text-red-300"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
