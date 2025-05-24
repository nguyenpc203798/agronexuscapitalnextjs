'use client';

import { memo, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { fadeInUp, staggerChildren } from '@/lib/animations';

interface CounterItemProps {
  number: number;
  label: string;
  duration: number;
  hasPlusSign?: boolean;
  delay: number;
}

const CounterItem = ({ number, label, duration = 2000, hasPlusSign = false, delay }: CounterItemProps) => {
  const [count, setCount] = useState(0);
  const counterRef = useRef<HTMLParagraphElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!isInView) return;
    
    let start = 0;
    const end = Math.min(number, 999);
    const totalDuration = duration;
    const incrementTime = totalDuration / end;
    
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      
      if (start >= end) clearInterval(timer);
    }, incrementTime);
    
    return () => clearInterval(timer);
  }, [number, duration, isInView]);
  
  // Format number to always show 2 digits (e.g., 04, 07)
  const formattedNumber = count < 10 ? `0${count}` : count.toString();
  
  return (
    <motion.div 
      className="pl-4 md:pl-16"
      variants={fadeInUp}
      onViewportEnter={() => setIsInView(true)}
    >
      <div className="flex flex-grow">
        <p 
          ref={counterRef}
          className="text-[7rem] md:text-[9rem] font-bold text-[#1e6c39]"
        >
          {formattedNumber}
        </p>
        {hasPlusSign && (
          <p className="text-[7rem] md:text-[9rem] font-bold text-[#1e6c39]">+</p>
        )}
      </div>
      <hr className="my-4 border-t border-gray-300" />
      <p>{label}</p>
    </motion.div>
  );
};

const GroupSizeSection = memo(() => {
  const { t } = useLanguage();
  
  const counterItems = [
    { number: 4, label: "Ngành hàng đầu tư", hasPlusSign: false, delay: 0 },
    { number: 7, label: "Đề án đầu tư", hasPlusSign: false, delay: 200 },
    { number: 50, label: "Dự án đầu tư", hasPlusSign: true, delay: 400 },
    { number: 8, label: "Nhà máy / kho", hasPlusSign: false, delay: 600 },
    { number: 60, label: "Hệ thống điểm bán", hasPlusSign: false, delay: 800 },
    { number: 250, label: "Đội ngũ nhân sự", hasPlusSign: true, delay: 1000 }
  ];

  return (
    <section id="quymo" className="py-16 container">
      <motion.div 
        className="mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerChildren}
      >
        <motion.div 
          className="text-center mb-12"
          variants={fadeInUp}
        >
          <h2 className="text-[3rem]">Quy mô tập đoàn</h2>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 gap-12"
          variants={staggerChildren}
        >
          {counterItems.map((item, index) => (
            <CounterItem 
              key={index} 
              number={item.number} 
              label={item.label} 
              duration={2000} 
              hasPlusSign={item.hasPlusSign}
              delay={item.delay}
            />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
});

GroupSizeSection.displayName = 'GroupSizeSection';

export default GroupSizeSection; 