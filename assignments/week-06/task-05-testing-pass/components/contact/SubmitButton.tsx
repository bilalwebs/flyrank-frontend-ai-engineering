"use client";

import { motion } from "framer-motion";
import { Send, Loader2 } from "lucide-react";
import type { FormStatus } from "@/lib/types";

interface SubmitButtonProps {
  status: FormStatus;
  disabled?: boolean;
}

export function SubmitButton({ status, disabled = false }: SubmitButtonProps) {
  const isSubmitting = status === "submitting";

  return (
    <motion.button
      type="submit"
      disabled={disabled || isSubmitting}
      whileHover={{ scale: disabled || isSubmitting ? 1 : 1.02 }}
      whileTap={{ scale: disabled || isSubmitting ? 1 : 0.98 }}
      className={`
        relative flex w-full items-center justify-center gap-2 rounded-xl
        px-6 py-3.5 text-base font-semibold text-white
        transition-all duration-300 focus:outline-none focus:ring-2
        focus:ring-purple-500/50 focus:ring-offset-2 focus:ring-offset-gray-900
        ${
          disabled || isSubmitting
            ? "cursor-not-allowed bg-purple-600/40"
            : "bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40"
        }
      `}
    >
      {isSubmitting ? (
        <>
          <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
          <span>Sending...</span>
        </>
      ) : (
        <>
          <Send className="h-5 w-5" aria-hidden="true" />
          <span>Send Message</span>
        </>
      )}

      {isSubmitting && (
        <motion.div
          className="absolute inset-0 rounded-xl bg-purple-500/10"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}
    </motion.button>
  );
}
