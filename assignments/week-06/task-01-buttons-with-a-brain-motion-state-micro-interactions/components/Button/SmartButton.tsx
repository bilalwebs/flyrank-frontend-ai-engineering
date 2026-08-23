"use client";

import { useId, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Check, AlertCircle } from "lucide-react";
import type { SmartButtonProps, ButtonState } from "@/types/button";
import { useButtonState } from "@/hooks/useButtonState";
import {
  ANIMATION_DURATION,
  BUTTON_VARIANTS,
  BUTTON_SIZES,
} from "@/constants/animations";

function getAriaLive(state: ButtonState): "off" | "polite" | "assertive" {
  switch (state) {
    case "success":
      return "polite";
    case "error":
      return "assertive";
    default:
      return "off";
  }
}

function getDisplayLabel(
  state: ButtonState,
  label: string,
  successLabel?: string,
  errorLabel?: string,
  loadingLabel?: string
): string {
  switch (state) {
    case "loading":
      return loadingLabel ?? "Loading...";
    case "success":
      return successLabel ?? "Done!";
    case "error":
      return errorLabel ?? "Error";
    default:
      return label;
  }
}

export function SmartButton({
  label,
  successLabel,
  errorLabel,
  loadingLabel,
  variant = "primary",
  size = "md",
  icon: Icon,
  disabled = false,
  onClick,
  className = "",
  ariaLabel,
}: SmartButtonProps) {
  const { state, isLoading, isSuccess, isError, trigger } = useButtonState();
  const id = useId();

  const isDisabled = disabled || isLoading;
  const displayLabel = getDisplayLabel(
    state,
    label,
    successLabel,
    errorLabel,
    loadingLabel
  );

  const handleClick = useCallback(() => {
    if (isDisabled) return;
    trigger(onClick);
  }, [isDisabled, trigger, onClick]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleClick();
      }
    },
    [handleClick]
  );

  const variantStyles = BUTTON_VARIANTS[variant];
  const sizeStyles = BUTTON_SIZES[size];

  const stateVariantStyles = isDisabled
    ? variantStyles.disabled
    : isSuccess
      ? variantStyles.success
      : isError
        ? variantStyles.error
        : variantStyles.idle;

  return (
    <>
      <motion.button
        id={id}
        type="button"
        disabled={isDisabled}
        aria-label={ariaLabel ?? label}
        aria-busy={isLoading}
        aria-live={getAriaLive(state)}
        tabIndex={isDisabled ? -1 : 0}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        whileHover={
          isDisabled
            ? undefined
            : {
                scale: 1.03,
                transition: { duration: ANIMATION_DURATION.fast, ease: "easeOut" },
              }
        }
        whileTap={
          isDisabled
            ? undefined
            : {
                scale: 0.97,
                transition: { duration: ANIMATION_DURATION.instant, ease: "easeOut" },
              }
        }
        animate={
          isError
            ? {
                x: [0, -8, 8, -6, 6, -3, 3, 0],
                transition: {
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                },
              }
            : { x: 0 }
        }
        className={[
          "relative inline-flex items-center justify-center font-medium",
          "rounded-xl",
          "outline-none focus-visible:ring-2 focus-visible:ring-white/50",
          "focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
          stateVariantStyles,
          sizeStyles,
          isDisabled ? "pointer-events-none" : "cursor-pointer",
          className,
        ].join(" ")}
      >
        {isSuccess && (
          <motion.span
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{
              duration: ANIMATION_DURATION.normal,
              ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number],
            }}
            className="absolute inset-0 rounded-xl bg-green-500/20"
          />
        )}

        {isError && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 rounded-xl bg-red-500/20"
          />
        )}

        <span className="relative flex items-center gap-2">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.span
                key="spinner"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{
                  duration: ANIMATION_DURATION.fast,
                  ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number],
                }}
                className="flex items-center"
              >
                <Loader2 className="animate-spin" size={18} />
              </motion.span>
            ) : isSuccess ? (
              <motion.span
                key="success"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{
                  duration: ANIMATION_DURATION.normal,
                  ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number],
                }}
                className="flex items-center"
              >
                <Check size={18} />
              </motion.span>
            ) : isError ? (
              <motion.span
                key="error"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{
                  duration: ANIMATION_DURATION.fast,
                  ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number],
                }}
                className="flex items-center"
              >
                <AlertCircle size={18} />
              </motion.span>
            ) : Icon ? (
              <motion.span
                key="icon"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: ANIMATION_DURATION.fast }}
                className="flex items-center"
              >
                <Icon size={18} />
              </motion.span>
            ) : null}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.span
              key={state}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{
                duration: ANIMATION_DURATION.fast,
                ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
              }}
            >
              {displayLabel}
            </motion.span>
          </AnimatePresence>
        </span>
      </motion.button>

      <span role="status" aria-live={getAriaLive(state)} className="sr-only">
        {isSuccess && "Action completed successfully"}
        {isError && "Action failed, please try again"}
      </span>
    </>
  );
}
