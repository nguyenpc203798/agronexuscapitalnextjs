'use client';

import { memo, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';  
import { useLanguage } from '@/context/LanguageContext';
import { fadeInUp, staggerChildren } from '@/lib/animations';
import Image from 'next/image';

const CoreValuesSection = memo(() => {
  const { t } = useLanguage();
  
  // Sử dụng framer-motion để tạo hiệu ứng parallax
  const sectionRef = useRef<HTMLElement>(null);
  
  // Sử dụng useScroll và useTransform từ framer-motion để tạo hiệu ứng parallax
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  // Hiệu ứng di chuyển y khi scroll
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  const coreValues = [
    {
      id: 'commitment',
      title: t("home.core_values_section.Commitment_title"),
      description: t("home.core_values_section.Commitment_description")
    },
    {
      id: 'collaboration',
      title: t("home.core_values_section.Collaboration_title"),
      description: t("home.core_values_section.Collaboration_description")
    },
    {
      id: 'sustainability',
      title: t("home.core_values_section.Sustainability_title"),
      description: t("home.core_values_section.Sustainability_description")
    },
    {
      id: 'innovation',
      title: t("home.core_values_section.Innovation_title"),
      description: t("home.core_values_section.Innovation_description")
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="relative py-16 lg:py-24 overflow-hidden"
    >
      {/* Background với parallax từ Framer Motion */}
      <div className="absolute inset-0 w-full z-0 h-[130%] -top-[45%]">
        <motion.div style={{ y }} className="w-full h-full">
          <Image 
            src="/images/pages/home/CoreValues.jpg"
            alt="Core Values Background"
            fill
            sizes="100vw"
            className="object-cover"
            quality={90}
            priority={false}
          />
        </motion.div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 md:px-8 lg:px-0 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerChildren}
        >
          <motion.h2 
            className="text-center text-shadow text-white mb-[3rem]"
            variants={fadeInUp}
          >
            {t("home.core_values_section.title")}
          </motion.h2>
          
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16"
            variants={staggerChildren}
          >
            {coreValues.map((value, index) => (
              <motion.div
                key={value.id}
                className="bg-black bg-opacity-30 aspect-square shadow-lg relative text-center backdrop-blur-sm p-[2rem] rounded-[2rem]"
                variants={fadeInUp}
                custom={index}
              >
                <div className="absolute top-[85%] left-1/2 transform -translate-x-1/2 w-[30%] h-[2px] bg-white" />
                <h4 className="text-3xl text-white mb-4 mt-[4rem] lg:mt-0">
                  {value.title}
                </h4>
                <p className="text-white">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
});

CoreValuesSection.displayName = 'CoreValuesSection';

export default CoreValuesSection; 