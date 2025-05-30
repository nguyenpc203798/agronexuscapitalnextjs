import { memo } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { FaGoogle, FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

// Tách phần Company Info thành component riêng (SRP)
const Address = memo(({ t }: { t: (key: string) => string }) => {
  return (
    <div className="pl-[10%] max-w-[80%]">
      <h3 className="font-semibold mb-4 text-2xl">{t("footer.address")}</h3>
      <p className="text-white text-xl">
        {t("footer.address_info.building")}
      </p>
      <p className="text-white text-xl">
        {t("footer.address_info.street")}
      </p>
      <p className="text-white text-xl">
        {t("footer.address_info.ward")}
      </p>
      <p className="text-white text-xl">
        {t("footer.address_info.district")}, {t("footer.address_info.city")}
      </p>  
    </div>
  );
});

Address.displayName = "Address";

// Tách phần Contact Info thành component riêng (SRP)
const ContactInfo = memo(({ t }: { t: (key: string) => string }) => {
  return (
    <div className="pl-[10%] max-w-[80%]">
      <h3 className="font-semibold mb-4 text-2xl">{t("nav.contact")}</h3>
      <address className="not-italic text-white">
        <p className="mt-2">
          <a href="mailto:info@tantaitrading.com" className="hover:text-primary transition-colors text-white text-xl">
            {t("footer.contact_info.email")}
          </a>
        </p>
        <p>
          <a href="tel:+84899565868" className="hover:text-primary transition-colors text-white text-xl">
            {t("footer.contact_info.phone")}
          </a>
        </p>
      </address>
    </div>
  );  
});

ContactInfo.displayName = "ContactInfo";


// Tách phần Contact Info thành component riêng (SRP)
const Copyright = memo(({ t }: { t: (key: string) => string }) => {
  return (
    <div className="pl-[10%] max-w-[80%]">
      <ul className="flex flex-row gap-4 items-center mb-4" data-wow-delay="0.4s">
        <li><Link href="#" className="text-white hover:text-primary transition-colors"><FaGoogle size={20} /></Link></li>
        <li><Link href="#" className="text-white hover:text-primary transition-colors"> <FaFacebook size={20} /></Link></li>
        <li><Link href="#" className="text-white hover:text-primary transition-colors"><FaTwitter size={20} /></Link></li>
        <li><Link href="#" className="text-white hover:text-primary transition-colors"><FaInstagram size={20} /></Link></li>
      </ul>
      <address className="not-italic text-white">
        <p className="text-white text-xl">{t("footer.copyright")}</p>
        <p className="text-white text-xl">{t("footer.copyright_description")}</p>
      </address>
    </div>
  );
});

Copyright.displayName = "Copyright";

// Tách phần About Links thành component riêng (SRP)
const AboutLinks = memo(({ t }: { t: (key: string) => string }) => {
  return (
    <div className="pl-[10%] max-w-[80%]">
      <ul className="space-y-2">
        <li>
          <Link href="/about" className="text-white text-xl hover:text-primary transition-colors">
            {t("footer.links.about")}
          </Link>
        </li>
        <li>
          <Link href="/contact" className="text-white text-xl hover:text-primary transition-colors">
            {t("footer.links.categories")}
          </Link>
        </li>
        <li>
          <Link href="/privacy" className="text-white text-xl hover:text-primary transition-colors">
            {t("footer.links.sustainability")}
          </Link>
        </li>
        <li>
          <Link href="/terms" className="text-white text-xl hover:text-primary transition-colors">
            {t("footer.links.news")}
          </Link>
        </li>
        <li>
          <Link href="/terms" className="text-white text-xl hover:text-primary transition-colors">
            {t("footer.links.contact")}
          </Link>
        </li>
      </ul>
    </div>
  );
});

AboutLinks.displayName = "AboutLinks";

// Component chính
const Footer = memo(() => {
  const { t } = useLanguage();

  return (
    <footer className="bg-tantai py-[120px] bg-[#364a3d] dark:bg-[#487758]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 ml-10 md:ml-0 md:grid-cols-4 gap-8 font-semibold text-white">
          <Address t={t} />
          <ContactInfo t={t} />
          <Copyright t={t} />
          <AboutLinks t={t} />
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";

export default Footer; 