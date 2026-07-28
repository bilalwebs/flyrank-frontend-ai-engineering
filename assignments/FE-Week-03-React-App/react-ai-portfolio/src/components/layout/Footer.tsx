import type { Social } from "../../types";
import { SocialLinks } from "../ui/SocialLinks";

interface FooterProps {
  socials: Social[];
  siteName: string;
}

export function Footer({ socials, siteName }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-white/10 bg-background py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 sm:flex-row sm:justify-between sm:px-6">
        <p className="text-sm text-text/50">
          &copy; {currentYear} {siteName}. All rights reserved.
        </p>
        <SocialLinks socials={socials} />
      </div>
    </footer>
  );
}
