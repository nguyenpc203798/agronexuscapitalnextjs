import { memo, useState, useCallback, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

// Import các component đã tách
import Navigation from "@/components/header/Navigation";
import MobileMenu from "@/components/header/MobileMenu";
import DesktopActions from "@/components/header/DesktopActions";

// Component chính
const Header = memo(() => {
  const { t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  // useCallback để tối ưu hóa hàm xử lý sự kiện
  const handleToggleMenu = useCallback(() => {
    setIsMenuOpen(prevState => !prevState);
  }, []);
  
  // Theo dõi sự kiện cuộn
  useEffect(() => {
    const controlHeader = () => {
      const currentScrollY = window.scrollY;
      
      // Xác định hướng cuộn
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Cuộn xuống và vượt qua ngưỡng 100px
        setIsVisible(false);
      } else {
        // Cuộn lên
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };
    
    // Thêm event listener
    window.addEventListener('scroll', controlHeader);
    
    // Dọn dẹp event listener khi component unmount
    return () => {
      window.removeEventListener('scroll', controlHeader);
    };
  }, [lastScrollY]);
  
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 md:px-2 transition-transform duration-500 ease-in-out ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="container border-2 border-background mx-auto px-8 py-4 blur-bg rounded-bl-[2rem] rounded-br-[2rem] md:rounded-[2rem] md:mt-4">
        <div className="flex h-12 md:h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image 
                src="/images/logo/logo.svg" 
                alt="Tantai Trading Logo" 
                width={120} 
                height={40} 
                className="h-8 md:h-10 w-auto"
              />
            </Link>
          </div>
          
          {/* Navigation ở giữa */}
          <div className="flex-grow flex justify-center">
            <Navigation t={t} />
          </div>
          
          {/* Actions */}
          <div className="flex items-center space-x-4">
            <DesktopActions t={t} />
            
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={handleToggleMenu}
              aria-label="Toggle menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <MobileMenu isOpen={isMenuOpen} t={t} />
    </header>
  );
});

Header.displayName = "Header";

export default Header; 