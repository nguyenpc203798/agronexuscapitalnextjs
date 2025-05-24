import { memo } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Globe } from "lucide-react";
import {
  HoverDropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import type { Language } from "@/context/LanguageContext";

// Tách phần hiển thị ngôn ngữ thành component riêng (SRP)
const LanguageText = memo(({ language }: { language: string }) => {
  return <>{language === "en" ? "VI" : "EN"}</>;
});

LanguageText.displayName = "LanguageText";

// Tách phần tooltip content thành component riêng (SRP)
const LanguageTooltipText = memo(({ language }: { language: string }) => {
  return <p>{language === "en" ? "Switch to English" : "Chuyển sang tiếng Việt"}</p>;
});

LanguageTooltipText.displayName = "LanguageTooltipText";

const LANGUAGES = [
  { code: "vi", label: "Tiếng Việt", short: "VI", flag: "🇻🇳" },
  { code: "en", label: "English", short: "EN", flag: "🇬🇧" },
];

// Component chính
const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <HoverDropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          aria-label="Change language"
          className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-accent focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          tabIndex={0}
        >
          <Globe className="w-5 h-5" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[160px]">
        {LANGUAGES.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code as Language)}
            className="flex items-center gap-2 cursor-pointer"
            aria-label={lang.label}
          >
            <span className="text-lg">{lang.flag}</span>
            <span>{lang.label}</span>
            {language === lang.code && (
              <span className="ml-auto text-green-500">✔</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </HoverDropdownMenu>
  );
};

LanguageSwitcher.displayName = "LanguageSwitcher";

export default LanguageSwitcher; 