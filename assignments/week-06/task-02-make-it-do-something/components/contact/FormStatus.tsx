"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import type { FormStatus } from "@/lib/types";

interface FormStatusMessageProps {
  status: FormStatus;
  onDismiss: () => void;
}

export function FormStatusMessage({ status, onDismiss }: FormStatusMessageProps) {
  const isVisible = status === "success" || status === "error";

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          role="alert"
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className={`flex items-start gap-3 rounded-xl p-4 ${
            status === "success"
              ? "border border-green-500/20 bg-green-500/10"
              : "border border-red-500/20 bg-red-500/10"
          }`}
        >
          {status === "success" ? (
            <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-green-400" aria-hidden="true" />
          ) : (
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-red-400" aria-hidden="true" />
          )}

          <div className="flex-1">
            <p className={`font-medium ${
              status === "success" ? "text-green-300" : "text-red-300"
            }`}>
              {status === "success"
                ? "Message sent successfully!"
                : "Something went wrong"}
            </p>
            <p className="mt-1 text-sm text-gray-400">
              {status === "success"
                ? "Thank you for reaching out. I will get back to you soon."
                : "Please try again later or contact me directly via email."}
            </p>
          </div>

          <button
            type="button"
            onClick={onDismiss}
            className="shrink-0 rounded-lg p-1 text-gray-400 transition-colors hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            aria-label="Dismiss message"
          >
            <XCircle className="h-4 w-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
