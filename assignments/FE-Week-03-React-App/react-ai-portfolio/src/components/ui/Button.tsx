import type { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";

interface ButtonBaseProps {
  variant?: "primary" | "accent";
  className?: string;
}

interface ButtonAsButton extends ButtonBaseProps, ButtonHTMLAttributes<HTMLButtonElement> {
  href?: undefined;
}

interface ButtonAsLink extends ButtonBaseProps, AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantStyles: Record<string, string> = {
  primary: "bg-primary text-white hover:bg-primary/90",
  accent: "bg-accent text-white hover:bg-accent/90",
};

export function Button({
  variant = "primary",
  className = "",
  children,
  ...rest
}: ButtonProps) {
  const classes = `inline-block rounded-lg px-5 py-2.5 text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 ${variantStyles[variant]} ${className}`;

  if ("href" in rest && rest.href) {
    return (
      <a className={classes} {...rest as AnchorHTMLAttributes<HTMLAnchorElement>}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...rest as ButtonHTMLAttributes<HTMLButtonElement>}>
      {children}
    </button>
  );
}
