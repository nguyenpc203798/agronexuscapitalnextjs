'use client';

import MainLayout from "@/layouts/MainLayout";
import HomeSlider from "@/components/pages/home/HomeSlider";
import AboutSection from "@/components/pages/home/AboutSection";
import VisionMissionSection from "@/components/pages/home/VisionMissionSection";
import CoreValuesSection from "@/components/pages/home/CoreValuesSection";
import GroupSizeSection from "@/components/pages/home/GroupSizeSection";
import InvestmentFieldsSection from "@/components/pages/home/InvestmentFieldsSection";
import IndustrySection from "@/components/pages/home/IndustrySection";
import NewsSection from "@/components/pages/home/NewsSection";

const HomePage = () => {
  return (
    <MainLayout>
      {/* Slider Section */}
      <HomeSlider />

      {/* About Section */}
      <AboutSection />

      {/* Vision Mission Section */}
      <VisionMissionSection />

      {/* Core Values Section */}
      <CoreValuesSection />

      {/* Group Size Section */}
      <GroupSizeSection />

      {/* Investment Fields Section */}
      <InvestmentFieldsSection />

      {/* Industry Detail Sections */}
      <IndustrySection />
      
      {/* News Section */}
      <NewsSection />
    </MainLayout>
  );
};

export default HomePage;