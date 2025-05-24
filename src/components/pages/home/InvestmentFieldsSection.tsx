'use client';

import { memo, useRef } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import Image from 'next/image';
import Link from 'next/link';
import { fadeInUp, staggerChildren } from '@/lib/animations';

interface InvestmentFieldProps {
  id: string;
  title: string;
  image: string;
  link: string;
  delay: number;
}

const InvestmentField = ({ id, title, image, link, delay }: InvestmentFieldProps) => {
  return (
    <motion.a 
      href={link}
      className="shadow-xl"
      variants={fadeInUp}
      custom={delay}
    >
      <div className="group relative rounded-[1rem] w-full">
        <Image 
          src={image}
          alt={title}
          width={400}
          height={400}
          className="aspect-square h-full w-full rounded-[1rem] object-cover"
        />
        <div className="backdrop-blur-sm absolute bg-black rounded-[1rem] bg-opacity-30 flex justify-center items-center
          w-[90%] bottom-[5%] right-[5%] h-[6rem] z-10
          transition-all duration-500
          group-hover:w-full group-hover:h-full group-hover:bottom-0 group-hover:right-0">
          <span className="text-white text-3xl">{title}</span>
        </div>
      </div>
    </motion.a>
  );
};

const InvestmentFieldsSection = memo(() => {
  const { t } = useLanguage();
  
  const investmentFields = [
    { 
      id: 'agriculture', 
      title: 'Nông nghiệp', 
      image: '/images/4nganhhang/nncncao.jpg', 
      link: '#nongsan',
      delay: 0
    },
    { 
      id: 'energy', 
      title: 'Năng lượng', 
      image: '/images/4nganhhang/nangluong.jpg', 
      link: '#nangluong',
      delay: 0.2
    },
    { 
      id: 'minerals', 
      title: 'Khoáng sản', 
      image: '/images/4nganhhang/khoangsan.jpg', 
      link: '#khoangsan',
      delay: 0.4
    },
    { 
      id: 'aquaculture', 
      title: 'Thủy sản', 
      image: '/images/4nganhhang/thuysan.jpg', 
      link: '#thuysan',
      delay: 0.6
    },
    { 
      id: 'logistics', 
      title: 'Kho cảng & logistics', 
      image: '/images/4nganhhang/khocanglogic/đaiien.jpg', 
      link: '#kho-cang-logicstic',
      delay: 0.8
    }
  ];

  return (
    <section id="nghanhhang" className="py-16">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerChildren}
        >
          <motion.div 
            className="text-center mb-12"
            variants={fadeInUp}
          >
            <h2 className="text-[3rem]">Ngành hàng đầu tư</h2>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8"
            variants={staggerChildren}
          >
            {investmentFields.map((field) => (
              <InvestmentField 
                key={field.id}
                id={field.id}
                title={field.title}
                image={field.image}
                link={field.link}
                delay={field.delay}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
});

InvestmentFieldsSection.displayName = 'InvestmentFieldsSection';

export default InvestmentFieldsSection; 