'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from "@/context/LanguageContext";
import MainLayout from "@/layouts/MainLayout";
import PageHero from '@/components/ui/PageHero';
import IndustrySection from '@/components/pages/home/IndustrySection';
import InvestmentFieldsSection from '@/components/pages/home/InvestmentFieldsSection';
// Danh sách các sản phẩm ngành hàng
  
const CategoryPage = memo(() => {
  const { t } = useLanguage();

  return (
    <MainLayout>
        {/* Hero Section */}
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <PageHero 
          title={t("category.title")}
          variant="simple"
        />
      </motion.div>

      <InvestmentFieldsSection />
      
      <IndustrySection />
    </MainLayout>
  );
});

CategoryPage.displayName = 'CategoryPage';

export default CategoryPage; 