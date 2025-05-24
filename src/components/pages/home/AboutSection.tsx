'use client';

import { motion } from 'framer-motion';
import { memo } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import LazyImage from '@/components/LazyImage';
import { fadeInUp, staggerChildren } from '@/lib/animations';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const AboutSection = memo(() => {
  const { t } = useLanguage();

  return (
    <section id="vechungtoi" className="mt-[4rem] md:mt-0 container py-12">
      <div className="text-center">
        <motion.h2
          className="text-[3rem] mt-[3rem] mb-[3rem]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
        >
          {t("home.about_section.title")}
        </motion.h2>
      </div>
      <motion.div
        className="bg-contain md:bg-cover text-center md:text-left mx-auto flex flex-col md:flex-row gap-8 justify-between"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerChildren}
      >
        <motion.div
          className="w-full md:w-[55%]"
          variants={fadeInUp}
        >
          <div className="h-[45rem] w-full">
            <LazyImage
              className="h-full w-full object-contain hover:scale-110 transition duration-500"
              alt="Aerial view of green fields and a road running through them"
              height={450}
              src="/images/pages/home/LimTower.png"
              width={800}
            />
          </div>
        </motion.div>
        <motion.div
          className="relative w-full md:w-[45%] mt-[5rem]"
          variants={staggerChildren}
        >
          <motion.div
            className="w-full flex flex-row justify-center md:justify-start"
            variants={fadeInUp}
          >
            <LazyImage
              className="w-[200px] md:w-[300px] object-contain mb-8"
              alt="Logo Agronexus Capital"
              height={450}
              src="/images/logo/logo.svg"
              width={800}
            />
          </motion.div>
          <motion.h2
            className="font-[600] text-[2rem] mb-6"
            variants={fadeInUp}
          >
           {t("home.about_section.main_description")}
          </motion.h2>
          <motion.p
            className="font-[500] mx-auto mb-[3rem] text-[1.5rem] text-foreground"
            variants={fadeInUp}
          >
            {t("home.about_section.second_description")}
          </motion.p>
          <motion.p
            className="mx-auto"
            variants={fadeInUp}
          >
            {t("home.about_section.third_description")}
          </motion.p>
          <motion.div
            className="w-full mt-12 flex flex-row justify-center md:justify-start gap-8"
            variants={fadeInUp}
          >
            <Link href="/about">
              <Button
                className="px-12 py-6 text-xl"
              >
                {t("home.about_section.see_more")}
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
});

AboutSection.displayName = 'AboutSection';

export default AboutSection; 