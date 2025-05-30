import { memo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ThemeSwitcher from "@/components/header/ThemeSwitcher";
import LanguageSwitcher from "@/components/header/LanguageSwitcher";

const DesktopActions = memo(({ t }: { t: (key: string) => string }) => {   
  return (
    <div className="hidden md:flex items-center space-x-2">
      <ThemeSwitcher />
      <LanguageSwitcher />
      <Link href="/contact">
        <Button 
          size="sm" 
          className="ml-4 bg-transparent"
        >
          {t("nav.contact")}
        </Button>
      </Link>
    </div>
  );
});

DesktopActions.displayName = "DesktopActions";

export default DesktopActions;  