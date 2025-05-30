import { memo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Component Navigation với chức năng active link
const Navigation = memo(({ t }: { t: (key: string) => string }) => {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <nav className="hidden md:flex space-x-8">
      <Link
        href="/"
        className={`group relative font-semibold transition-colors ${isActive("/")
            ? "text-green-800"
            : "text-foreground hover:text-green-800"
          }`}
      >
        {t("nav.home")}
        <div className="absolute w-0 group-hover:w-full h-1 bg-primary rounded transition-all duration-500 mb-4"></div>
      </Link>
      <Link
        href="/about"
        className={`group relative font-semibold transition-colors ${isActive("/about")
            ? "text-green-800"
            : "text-foreground hover:text-green-800"
          }`}
      >
        {t("nav.about")}
        <div className="absolute w-0 group-hover:w-full h-1 bg-primary rounded transition-all duration-500 mb-4"></div>
      </Link>
      <Link
        href="/category"
        className={`group relative font-semibold transition-colors ${isActive("/category")
            ? "text-green-800"
            : "text-foreground hover:text-green-800"
          }`}
      >
        {t("nav.categories")}
        <div className="absolute w-0 group-hover:w-full h-1 bg-primary rounded transition-all duration-500 mb-4"></div>
      </Link>
      <Link
        href="/news"
        className={`group relative font-semibold transition-colors ${isActive("/news")
            ? "text-green-800"
            : "text-foreground hover:text-green-800"
          }`}
      >
        {t("nav.news")}
        <div className="absolute w-0 group-hover:w-full h-1 bg-primary rounded transition-all duration-500 mb-4"></div>
      </Link>
    </nav>
  );
});

Navigation.displayName = "Navigation";

export default Navigation;
