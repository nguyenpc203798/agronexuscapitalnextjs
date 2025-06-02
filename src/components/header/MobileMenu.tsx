import { memo, useState, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import ThemeSwitcher from "@/components/header/ThemeSwitcher";
import LanguageSwitcher from "@/components/header/LanguageSwitcher";

const MobileMenu = memo(({ 
  isOpen, 
  t 
}: { 
  isOpen: boolean; 
  t: (key: string) => string; 
}) => {
  const [showProductsSubmenu, setShowProductsSubmenu] = useState(false);
  const pathname = usePathname();
  
  const handleToggleProductsSubmenu = useCallback(() => {
    setShowProductsSubmenu(prev => !prev);
  }, []);

  const isActive = (path: string) => {
    return pathname === path;
  };
  
  const isProductActive = () => {
    return pathname.startsWith('/category/');
  };

  return (
    <div className={`md:hidden blur-bg overflow-hidden rounded-[2rem] mt-1 transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
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
        
        <div className="flex flex-col">
          <button 
            onClick={handleToggleProductsSubmenu}
            className={`flex items-center justify-between transition-colors py-2 ${isProductActive() ? 'text-green-800' : 'text-foreground hover:text-primary'}`}
          >
            {t("nav.categories")}
            <ChevronDown className={`h-4 w-4 transition-transform ${showProductsSubmenu ? 'rotate-180' : ''}`} />
          </button>
          
          <div className={`ml-4 flex flex-col space-y-2 mt-2 overflow-hidden transition-all duration-300 ease-in-out ${showProductsSubmenu ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
            <Link 
              href="/category/coffee" 
              className={`transition-colors py-1 ${isActive('/category/coffee') ? 'text-green-800' : 'text-foreground hover:text-primary'}`}
            >
              {t("nav.products_items.coffee")}
            </Link>
            <Link 
              href="/category/rubber" 
              className={`transition-colors py-1 ${isActive('/category/rubber') ? 'text-green-800' : 'text-foreground hover:text-primary'}`}
            >
              {t("nav.products_items.rubber")}
            </Link>
            <Link 
              href="/category/tapioca" 
              className={`transition-colors py-1 ${isActive('/category/tapioca') ? 'text-green-800' : 'text-foreground hover:text-primary'}`}
            >
              {t("nav.products_items.tapioca")}
            </Link>
            <Link 
              href="/category/cashew" 
              className={`transition-colors py-1 ${isActive('/category/cashew') ? 'text-green-800' : 'text-foreground hover:text-primary'}`}
            >
              {t("nav.products_items.cashew")}
            </Link>
            <Link 
              href="/category/anise" 
              className={`transition-colors py-1 ${isActive('/category/anise') ? 'text-green-800' : 'text-foreground hover:text-primary'}`}
            >
              {t("nav.products_items.star_anise")}
            </Link>
            <Link 
              href="/category/cinnamon" 
              className={`transition-colors py-1 ${isActive('/category/cinnamon') ? 'text-green-800' : 'text-foreground hover:text-primary'}`}
            >
              {t("nav.products_items.cinnamon")}
            </Link>
            <Link 
              href="/category/pepper" 
              className={`transition-colors py-1 ${isActive('/category/pepper') ? 'text-green-800' : 'text-foreground hover:text-primary'}`}
            >
              {t("nav.products_items.pepper")}
            </Link>
          </div>
        </div>
        
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