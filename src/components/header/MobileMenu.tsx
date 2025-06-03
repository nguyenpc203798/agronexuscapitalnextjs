import { memo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeSwitcher from "@/components/header/ThemeSwitcher";
import LanguageSwitcher from "@/components/header/LanguageSwitcher";

const MobileMenu = memo(({ 
  isOpen, 
  t 
}: { 
  isOpen: boolean; 
  t: (key: string) => string; 
}) => {
  const pathname = usePathname();
  


  const isActive = (path: string) => {
    return pathname === path;
  };
  

  return (
    <div className={`lg:hidden blur-bg overflow-hidden rounded-[2rem] mt-1 transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
      <nav className="container mx-auto px-16 py-4 flex flex-col space-y-4">
        <Link 
          href="/" 
          className={`transition-colors py-2 ${isActive('/') ? 'text-green-800' : 'text-foreground hover:text-primary'}`}
        >
          {t("nav.home")}
        </Link>
        <Link 
          href="/about" 
          className={`transition-colors py-2 ${isActive('/about') ? 'text-green-800' : 'text-foreground hover:text-primary'}`}
        >
          {t("nav.about")}
        </Link>

        <Link 
          href="/category" 
          className={`transition-colors py-2 ${isActive('/category') ? 'text-green-800' : 'text-foreground hover:text-primary'}`}
        >
          {t("nav.categories")}
        </Link>

        <Link 
          href="/esg" 
          className={`transition-colors py-2 ${isActive('/esg') ? 'text-green-800' : 'text-foreground hover:text-primary'}`}
        >
          {t("nav.esg")}
        </Link>
        
        <Link 
          href="/news" 
          className={`transition-colors py-2 ${isActive('/news') ? 'text-green-800' : 'text-foreground hover:text-primary'}`}
        >
          {t("nav.news")}
        </Link>
        
        <Link 
          href="/contact" 
          className={`transition-colors py-2 ${isActive('/contact') ? 'text-green-800' : 'text-foreground hover:text-primary'}`}
        >
          {t("nav.contact")}
        </Link>
        
        <div className="flex items-center justify-center space-x-4 pt-2">
          <ThemeSwitcher />
          <LanguageSwitcher />
        </div>
      </nav>
    </div>
  );
});

MobileMenu.displayName = "MobileMenu";

export default MobileMenu; 