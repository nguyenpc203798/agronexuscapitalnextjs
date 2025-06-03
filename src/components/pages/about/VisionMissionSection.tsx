'use client';

import { memo, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { fadeInUp, staggerChildren } from '@/lib/animations';

const VisionMissionSection = memo(() => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('vision');

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <section 
      className="relative overflow-hidden"
    >
      {/* Background với Next.js Image */}
      <div className="absolute inset-0 w-full z-0 h-full">
        <Image 
          src="/images/pages/home/VisionMission.jpg"
          alt="Vision and Mission Background"
          fill
          sizes="100vw"
          className="object-cover"
          quality={90}
          priority={false}
        />
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4">
        <div 
          className="py-[2rem] lg:p-[3rem] h-[55rem] md:h-[40rem] lg:h-[50rem]  relative rounded-[3rem] w-full"
        >
          <motion.div 
            className="h-full w-full lg:w-[50%] flex flex-col justify-end space-y-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerChildren}
          >
            <motion.div 
              className="flex justify-center lg:justify-start space-x-8"
              variants={fadeInUp}
            >
              <button 
                onClick={() => handleTabChange('vision')}
                className={`backdrop-blur-sm bg-black bg-opacity-50 px-10 py-4 text-[14px] md:text-[18px] lg:text-[22px] font-bold rounded-full hover:bg-white hover:text-black transition-all duration-700 ${activeTab === 'vision' ? 'bg-white text-black' : 'text-white'}`}
              >
                {t("home.vision_mission_section.vision_title")}
              </button>
              <button 
                onClick={() => handleTabChange('mission')}
                className={`backdrop-blur-sm bg-black bg-opacity-50 px-10 py-4 text-[14px] md:text-[18px] lg:text-[22px] font-bold rounded-full hover:bg-white hover:text-black transition-all duration-700 ${activeTab === 'mission' ? 'bg-white text-black' : 'text-white'}`}
              >
                {t("home.vision_mission_section.mission_title")}
              </button>
            </motion.div>

            <motion.div
              className="backdrop-blur-sm bg-black bg-opacity-50 p-[3rem] rounded-[2rem] h-full sm:h-[50%] md:h-[70%] lg:h-[85%] xl:h-[60%] z-10"
              variants={fadeInUp}
            >
              {activeTab === 'vision' ? (
                <p className="mx-auto text-white text-justify">
                  {t("home.vision_mission_section.vision_description")}
                </p>
              ) : (
                <ul className="mx-auto text-white text-justify list-disc pl-5">
                  <li> <strong>{t("home.vision_mission_section.mission_items.item1_strong")}</strong> {t("home.vision_mission_section.mission_items.item1")}</li>
                  <li> <strong>{t("home.vision_mission_section.mission_items.item2_strong")}</strong> {t("home.vision_mission_section.mission_items.item2")}</li>
                  <li> <strong>{t("home.vision_mission_section.mission_items.item3_strong")}</strong> {t("home.vision_mission_section.mission_items.item3")}</li>
                  <li> <strong>{t("home.vision_mission_section.mission_items.item4_strong")}</strong> {t("home.vision_mission_section.mission_items.item4")}</li>
                  <li> <strong>{t("home.vision_mission_section.mission_items.item5_strong")}</strong> {t("home.vision_mission_section.mission_items.item5")}</li>
                </ul>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

VisionMissionSection.displayName = 'VisionMissionSection';

export default VisionMissionSection; 