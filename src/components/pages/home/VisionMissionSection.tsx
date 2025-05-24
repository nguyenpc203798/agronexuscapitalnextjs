'use client';

import { memo, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { fadeInUp, staggerChildren } from '@/lib/animations';

const VisionMissionSection = memo(() => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('vision');
  
  // Sử dụng framer-motion để tạo hiệu ứng parallax
  const sectionRef = useRef<HTMLElement>(null);
  
  // Sử dụng useScroll và useTransform từ framer-motion để tạo hiệu ứng parallax tốt hơn
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  // Hiệu ứng di chuyển y khi scroll
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <section 
      ref={sectionRef}
      className="relative overflow-hidden"
    >
      {/* Background với Next.js Image và parallax từ Framer Motion */}
      <div className="absolute inset-0 w-full z-0 h-[130%] -top-[15%]">
        <motion.div style={{ y }} className="w-full h-full">
          <Image 
            src="/images/tamnhinsumenh/sumenh.jpg"
            alt="Vision and Mission Background"
            fill
            sizes="100vw"
            className="object-cover"
            quality={90}
            priority={false}
          />
        </motion.div>
      </div>
      
      {/* Content */}
      <div className="container relative z-10 mx-auto px-4">
        <div 
          className="p-[2rem] lg:p-[3rem] h-[90rem] md:h-[50rem] lg:h-[60rem] xl:h-[70rem] relative rounded-[3rem] w-full"
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
                className={`backdrop-blur-sm bg-black bg-opacity-50 px-10 py-4 text-white text-[14px] md:text-[18px] lg:text-[22px] font-bold rounded-full hover:bg-white hover:text-black transition-all duration-700 ${activeTab === 'vision' ? 'bg-white text-black' : ''}`}
              >
                Tầm nhìn
              </button>
              <button 
                onClick={() => handleTabChange('mission')}
                className={`backdrop-blur-sm bg-black bg-opacity-50 px-10 py-4 text-white text-[14px] md:text-[18px] lg:text-[22px] font-bold rounded-full hover:bg-white hover:text-black transition-all duration-700 ${activeTab === 'mission' ? 'bg-white text-black' : ''}`}
              >
                Sứ mệnh
              </button>
            </motion.div>
            
            <motion.div
              className="backdrop-blur-sm bg-black bg-opacity-50 p-[3rem] rounded-[2rem] h-full sm:h-[50%] md:h-[70%] lg:h-[85%] xl:h-[60%] z-10"
              variants={fadeInUp}
            >
              {activeTab === 'vision' ? (
                <p className="mx-auto text-white text-justify">
                  Với khát vọng tiên phong và chiến lược phát triển bền vững, Agronexus Capital định hướng trở thành Tập
                  đoàn Đầu tư Tài chính Xanh hàng đầu khu vực, mang tầm vóc quốc tế, đưa thương hiệu nông sản Việt Nam ra
                  khắp thế giới.
                </p>
              ) : (
                <p className="mx-auto text-white text-justify">
                  Agronexus Capital cam kết đồng hành cùng các doanh nghiệp, đặc biệt trong lĩnh vực nông nghiệp xanh,
                  năng lượng tái tạo và phát triển bền vững. Chúng tôi cung cấp các giải pháp tài chính toàn diện,
                  tư vấn chiến lược và kết nối thị trường để thúc đẩy sự tăng trưởng bền vững và thịnh vượng chung.
                </p>
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