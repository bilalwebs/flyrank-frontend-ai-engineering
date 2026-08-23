"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import type { ButtonState } from "@/types/button";
import { DELAY_RANGE, SUCCESS_RATE } from "@/constants/animations";

interface UseButtonStateReturn {
  state: ButtonState;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  trigger: (onClick?: () => Promise<void> | void) => Promise<void>;
  reset: () => void;
}

export function useButtonState(): UseButtonStateReturn {
  const [state, setState] = useState<ButtonState>("idle");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const cleanup = useCallback(() => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const scheduleReset = useCallback(() => {
    cleanup();
    timeoutRef.current = setTimeout(() => {
      if (mountedRef.current) {
        setState("idle");
      }
    }, 2000);
  }, [cleanup]);

  const reset = useCallback(() => {
    cleanup();
    if (mountedRef.current) {
      setState("idle");
    }
  }, [cleanup]);

  const trigger = useCallback(
    async (onClick?: () => Promise<void> | void) => {
      if (state === "loading") return;

      cleanup();
      setState("loading");

      try {
        if (onClick) {
          await onClick();
        }
      } catch {
        if (mountedRef.current) {
          setState("error");
          scheduleReset();
        }
        return;
      }

      const delay =
        DELAY_RANGE.min +
        Math.random() * (DELAY_RANGE.max - DELAY_RANGE.min);

      timeoutRef.current = setTimeout(() => {
        if (!mountedRef.current) return;

        const success = Math.random() < SUCCESS_RATE;
        setState(success ? "success" : "error");

        timeoutRef.current = setTimeout(() => {
          if (mountedRef.current) {
            setState("idle");
          }
        }, 2000);
      }, delay);
    },
    [state, cleanup, scheduleReset]
  );

  useEffect(() => {
    return () => {
      cleanup();
    };
  }, [cleanup]);

  return {
    state,
    isLoading: state === "loading",
    isSuccess: state === "success",
    isError: state === "error",
    trigger,
    reset,
  };
}
