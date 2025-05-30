'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import Image from 'next/image';
import { fadeInUp, staggerChildren } from '@/lib/animations';

interface InvestmentFieldProps {
  title: string;
  image: string;
  link: string;
  delay: number;
}

const InvestmentField = ({ title, image, link, delay }: InvestmentFieldProps) => {

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();

    // Lấy ID từ href (bỏ dấu '#' ở đầu)
    const targetId = link.replace('#', '');

    const targetElement = document.getElementById(targetId);  

    if (targetElement) {
      // Nếu không có Lenis nhưng có phần tử mục tiêu, sử dụng native smooth scroll
      scrollToElementNatively(targetElement);
    }
  };

  // Hàm cuộn mượt không phụ thuộc vào Lenis
  const scrollToElementNatively = (element: HTMLElement) => {
    // Sử dụng native smooth scrolling của trình duyệt
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });

    // Thêm hash vào URL để người dùng có thể sao chép đường dẫn
    window.history.pushState(null, '', `#${element.id}`);
  };

  return (
    <motion.a
      href={link}
      className="shadow-xl"
      variants={fadeInUp}
      custom={delay}
      onClick={handleClick}
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
          <span className="text-white text-2xl text-center w-[9rem]">{title}</span>
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
      title: t("home.investment_fields_section.fields.agriculture"),
      image: '/images/category/HighTechAgriculture/Represent.jpg',
      link: '#nongsan',
      delay: 0
    },
    {
      id: 'energy',
      title: t("home.investment_fields_section.fields.energy"),
      image: '/images/category/Energy/Represent.jpg',
      link: '#nangluong',
      delay: 0.2
    },
    {
      id: 'minerals',
      title: t("home.investment_fields_section.fields.minerals"),
      image: '/images/category/Minerals/Represent.jpg',
      link: '#khoangsan',
      delay: 0.4
    },
    {
      id: 'aquaculture',
      title: t("home.investment_fields_section.fields.aquaculture"),
      image: '/images/category/SeaFood/Represent.jpg',
      link: '#thuysan',
      delay: 0.6
    },
    {
      id: 'logistics',
      title: t("home.investment_fields_section.fields.logistics"),
      image: '/images/category/Warehouse&Logistics/Represent.jpg',
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
            <h2>{t("home.investment_fields_section.title")}</h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8"
            variants={staggerChildren}
          >
            {investmentFields.map((field) => (
              <InvestmentField
                key={field.id}
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