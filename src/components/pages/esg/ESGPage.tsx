'use client';

import React from 'react';
import MainLayout from "@/layouts/MainLayout";
import PageHero from "@/components/ui/PageHero";
import ESGIntroSection from '@/components/pages/esg/ESGIntroSection';
import ESGCriteriaSection from '@/components/pages/esg/ESGCriteriaSection';

const ESGPage = () => {
  
  return (
    <MainLayout>
      {/* Hero Section */}
      <PageHero 
        i18nKey={{
          title: 'esg.title',
          description: 'about.hero.description'
        }}
        variant="simple"
      />
      {/* Intro Section */}
      <ESGIntroSection />
      
      {/* ESG Criteria Section */}
      <ESGCriteriaSection />
    </MainLayout>
  );
};

export default ESGPage; 