'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import LazyImage from '@/components/LazyImage';

// Tab content interface
interface TabContentProps {
  sector: 'agriculture' | 'energy' | 'minerals' | 'aquaculture';
  active: boolean;
}

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: 40, transition: { duration: 0.3 } }
};

// ESG Card Component
const ESGCard = ({ title, category, sector }: { title: string; category: 'environment' | 'social' | 'governance'; sector: string }) => {
  const { t } = useLanguage();
  
  // Hàm lấy các item theo index
  const getItemValue = (index: number) => {
    const key = `esg.${sector}.${category}.item${index}`;
    const value = t(key);
    
    // Nếu giá trị trả về là key, tức là không tìm thấy giá trị dịch
    return value !== key ? value : null;
  };
  
  // Tạo mảng các item từ cấu trúc item1, item2, item3...
  const items = [];
  for (let i = 1; i <= 10; i++) { // Giả sử tối đa 10 mục
    const item = getItemValue(i);
    if (item) {
      items.push(item);
    } else {
      break; // Dừng khi không còn item
    }
  }

  return (
    <div className="px-[4rem] w-full lg:w-[33%] bg-white dark:bg-gray-800 p-6 rounded-[1.5rem] shadow-lg hover:shadow-xl transition-shadow duration-300 h-[18rem]">
      <h2 className="text-[2rem] font-bold text-center dark:text-white">
        {title}
      </h2>
      <ul className="list-disc text-[16px] dark:text-gray-200 pl-5">
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

// Tab Content Component
const TabContent: React.FC<TabContentProps> = ({ sector, active }) => {
  const { t } = useLanguage();
  
  return (
    <AnimatePresence mode="wait">
      {active && (
        <motion.div
          key={sector}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={fadeInUp}
          className="w-full"
        >
          <div className="w-full md:h-[33rem] xl:h-[40rem] rounded-[2rem] overflow-hidden">
            <LazyImage 
              src={`/images/pages/esg/${sector}.jpg`}
              alt={`ESG ${t(`esg.sectors.${sector}`)}`}
              className="object-cover"
            />
          </div>
          <div className="flex justify-center">
            <div className="relative z-10 flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-[2rem] mt-[-6rem] w-[90%]">
              <ESGCard 
                title={t(`esg.${sector}.environment.title`)} 
                category="environment"
                sector={sector}
              />
              <ESGCard 
                title={t(`esg.${sector}.social.title`)} 
                category="social"
                sector={sector}
              />
              <ESGCard 
                title={t(`esg.${sector}.governance.title`)} 
                category="governance"
                sector={sector}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Main Component
const ESGCriteriaSection = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'agriculture' | 'energy' | 'minerals' | 'aquaculture'>('agriculture');

  // Handle tab change
  const handleTabChange = (tab: 'agriculture' | 'energy' | 'minerals' | 'aquaculture') => {
    setActiveTab(tab);
  };

  return (
    <div className="container tieuchidautuphattrien">
      <div className="flex flex-col md:flex-row justify-center md:space-x-10 space-y-4 md:space-y-0 mb-[4rem]">
        {(['agriculture', 'energy', 'minerals', 'aquaculture'] as const).map((sector) => (
          <button
            key={sector}
            onClick={() => handleTabChange(sector)}
            className={`w-[100%] md:w-[13rem] md:text-[1.3rem] border border-gray-300 py-2 rounded-full transition-all duration-500 ease-in-out ${
              activeTab === sector
                ? 'bg-primary text-white border-none md:w-[15rem]'
                : 'bg-background text-foreground hover:bg-primary hover:text-white'
            }`}
          >
            {t(`esg.sectors.${sector}`)}
          </button>
        ))}
      </div>
      
      {/* Tab Content */}
      <div id="layout" className="mb-[6rem]">
        <TabContent sector="agriculture" active={activeTab === 'agriculture'} />
        <TabContent sector="energy" active={activeTab === 'energy'} />
        <TabContent sector="minerals" active={activeTab === 'minerals'} />
        <TabContent sector="aquaculture" active={activeTab === 'aquaculture'} />
      </div>
    </div>
  );
};

export default ESGCriteriaSection; 