import { createContext, useContext, useEffect, useState, useMemo, useCallback } from "react";
import enTranslations from "@/i18n/en.json";
import viTranslations from "@/i18n/vi.json";

// Định nghĩa kiểu ngôn ngữ
export type Language = "en" | "vi";

// Định nghĩa kiểu dữ liệu cho context
type LanguageContextType = {
  language: Language;
  currentLocale: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

// Khai báo translations
const translations = {
  en: enTranslations,
  vi: viTranslations,
};

// Tạo context với giá trị mặc định undefined
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Custom hook để sử dụng ngôn ngữ
export function useLanguage() {
  const context = useContext(LanguageContext);
  
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  
  return context;
}

// Hook riêng để quản lý ngôn ngữ
function useLanguageState() {
  // Bắt đầu với giá trị mặc định cho SSR
  const [language, setLanguageState] = useState<Language>("en");
  const [isClient, setIsClient] = useState(false);

  // Cập nhật ngôn ngữ
  const setLanguage = useCallback((newLanguage: Language) => {
    setLanguageState(newLanguage);
  }, []);

  // Function dịch
  const t = useCallback((key: string): string => {
    const keys = key.split(".");
    let value: unknown = translations[language];
    
    for (const k of keys) {
      if (!value || typeof value !== 'object' || !(k in (value as Record<string, unknown>))) return key;
      value = (value as Record<string, unknown>)[k];
    }
    
    return typeof value === 'string' ? value : key;
  }, [language]);

  // Effect chỉ chạy một lần sau khi component được mount
  useEffect(() => {
    setIsClient(true);
    
    // Đọc từ localStorage sau khi client-side
    const storedLanguage = localStorage.getItem("language") as Language;
    
    if (storedLanguage) {
      setLanguageState(storedLanguage);
    }
  }, []);

  // Effect để đồng bộ với localStorage và DOM
  useEffect(() => {
    if (!isClient) return;
    
    // Lưu vào localStorage
    localStorage.setItem("language", language);
    
    // Cập nhật lang attribute
    document.documentElement.setAttribute("lang", language);
  }, [language, isClient]);

  return {
    language,
    currentLocale: language,
    setLanguage,
    t
  };
}

// Component Provider
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const { language, currentLocale, setLanguage, t } = useLanguageState();
  
  // Memo hóa giá trị context để tránh re-render không cần thiết
  const value = useMemo(() => ({ 
    language, 
    currentLocale,
    setLanguage,
    t 
  }), [language, currentLocale, setLanguage, t]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
} 