'use client';

import MainLayout from "@/layouts/MainLayout";
import PageHero from "@/components/ui/PageHero";
import AboutSection from "@/components/pages/home/AboutSection";
import VisionMissionSection from "@/components/pages/about/VisionMissionSection";
import CoreValuesSection from "@/components/pages/home/CoreValuesSection";
import GroupSizeSection from "@/components/pages/home/GroupSizeSection";

const AboutPage = () => {
  return (
    <MainLayout>
      {/* Hero Section */}
      <PageHero 
        i18nKey={{
          title: 'about.hero',
          description: 'about.hero.description'
        }}
        variant="simple"
      />
      
      {/* About Section */}
      <AboutSection />

      {/* Vision Mission Section */}
      <VisionMissionSection />

      {/* Core Values Section */}
      <CoreValuesSection />

      {/* Group Size Section */}
      <GroupSizeSection />

      
    </MainLayout>
  );
};

export default AboutPage; 