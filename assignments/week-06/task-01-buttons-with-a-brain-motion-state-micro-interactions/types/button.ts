import type { LucideIcon } from "lucide-react";

export type ButtonState =
  | "idle"
  | "loading"
  | "success"
  | "error";

export type ButtonVariant = "primary" | "secondary" | "danger";

export type ButtonSize = "sm" | "md" | "lg";

export interface SmartButtonProps {
  label: string;
  successLabel?: string;
  errorLabel?: string;
  loadingLabel?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: LucideIcon;
  disabled?: boolean;
  onClick?: () => Promise<void> | void;
  className?: string;
  ariaLabel?: string;
}

export interface ButtonStateConfig {
  state: ButtonState;
  label: string;
  icon: LucideIcon | null;
  ariaLive: "off" | "polite" | "assertive";
}
