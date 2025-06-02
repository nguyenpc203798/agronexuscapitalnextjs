'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

const ESGIntroSection = () => {
  const { t } = useLanguage();

  return (
    <div className="container">
      {/* Content Section */}
      <div className="px-4 py-[3rem] md:py-[6rem]">
        <div className="text-justify">
          <h2 className="text-black text-[1rem] md:text-[2rem] dark:text-white font-bold leading-[30px] lg:leading-[50px] mb-10">
            &quot;{t('esg.main_heading_top')} <br />
            {t('esg.main_heading_bottom')} 
            <span className="text-green-700 dark:text-green-500">
              {t('esg.main_heading_bottom_green')}
            </span>
            &quot;
          </h2>
          <p className="mb-10 font-semibold">
            {t('esg.intro_description')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ESGIntroSection; 