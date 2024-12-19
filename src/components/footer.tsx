import { useTranslation } from "react-i18next";
import { LanguageToggle } from "./language-toggle";

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t bg-card">
      <div className="max-w-[1400px] mx-auto px-6 py-4">
        <div className="flex justify-between items-center text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            <span>© {new Date().getFullYear()} Korean LLM Leaderboard</span>
            <a href="/privacy" className="hover:underline">
              {t("privacy_policy")}
            </a>
            <a href="/terms" className="hover:underline">
              {t("terms_of_service")}
            </a>
          </div>
          <LanguageToggle />
        </div>
      </div>
    </footer>
  );
}
