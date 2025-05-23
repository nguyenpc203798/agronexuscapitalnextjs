'use client';

import { memo } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, EffectFade, Autoplay } from 'swiper/modules';
import { useLanguage } from '@/context/LanguageContext';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const HomeSlider = memo(() => {
  const { t } = useLanguage();
  
  // Mảng chứa thông tin các slide
  const sliderImages = [
    {
      src: '/images/pages/home/slider/slide1.jpg',
      alt: t('home.slider.slide1_alt') || 'Agronexus Capital Slide 1'
    },
    {
      src: '/images/pages/home/slider/slide2.jpg',
      alt: t('home.slider.slide2_alt') || 'Agronexus Capital Slide 2'
    },
    {
      src: '/images/pages/home/slider/slide3.jpg',
      alt: t('home.slider.slide3_alt') || 'Agronexus Capital Slide 3'
    },
  ];

  return (
    <div className="relative w-full h-[40vh] md:h-[80vh]">
      <Swiper
        modules={[Pagination, EffectFade, Autoplay]}
        effect="fade"
        pagination={{
          clickable: true,
          renderBullet: (index, className) => {
            return `<span class="${className}"></span>`;
          },
          verticalClass: 'swiper-pagination-vertical',
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        speed={1000}
        className="h-full w-full"
      >
        {sliderImages.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                sizes="(max-width: 768px) 100vw, 100vw"
                priority={index === 0}
                className="object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* Custom CSS cho pagination dọc bên phải */}
      <style jsx global>{`
        .swiper-pagination {
          position: absolute;
          left: 95% !important;
          top: 45% !important;
          display: flex;
          flex-direction: column;
          gap: 10px;
          width: 20px !important;
        }
        
        .swiper-pagination-bullet {
          width:13px;
          height: 13px;
          background: transparent;
          border: 2px solid #fff;
          box-shadow: 0 0 10px 0 #45454580;
        }
        
        .swiper-pagination-bullet-active {
          background: #fff;
        }
      `}</style>
    </div>
  );
});

HomeSlider.displayName = 'HomeSlider';

export default HomeSlider;
