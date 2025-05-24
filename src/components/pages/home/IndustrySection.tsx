'use client';

import { memo, useRef } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import Image from 'next/image';
import { fadeInUp, staggerChildren } from '@/lib/animations';

// Component hiển thị phần tiêu đề có đường thẳng ở hai bên
const SectionTitle = ({ title, id }: { title: string, id: string }) => {
  return (
    <div id={id} className="relative mb-[3rem]">
      <div className="flex items-center">
        <div className="flex space-x-8 mr-4">
          <div className="w-7 h-7 bg-[#E8F3EC] rounded-full"></div>
          <div className="w-7 h-7 bg-[#D2E8D9] rounded-full"></div>
          <div className="w-7 h-7 bg-[#BBDCC7] rounded-full"></div>
          <div className="w-7 h-7 bg-[#A5D1B4] rounded-full"></div>
          <div className="w-7 h-7 bg-[#8EC5A1] rounded-full"></div>
        </div>
        <div className="border-[1px] border-[#1e6c39] flex-grow"></div>
        <div className="flex space-x-8 ml-4">
          <div className="w-7 h-7 bg-[#8EC5A1] rounded-full"></div>
          <div className="w-7 h-7 bg-[#A5D1B4] rounded-full"></div>
          <div className="w-7 h-7 bg-[#BBDCC7] rounded-full"></div>
          <div className="w-7 h-7 bg-[#D2E8D9] rounded-full"></div>
          <div className="w-7 h-7 bg-[#E8F3EC] rounded-full"></div>
        </div>
      </div>
      <h2 className="w-[18rem] lg:w-auto top-[-12px] lg:top-[-31px] bg-white p-0 lg:p-5 absolute left-1/2 transform -translate-x-1/2 text-[3rem] text-center mb-0 lg:mb-[2rem] z-10">
        {title}
      </h2>
    </div>
  );
};

// Component hiển thị phân ngành
const SubIndustryGrid = ({ items, title }: { items: Array<{name: string, image: string}>, title?: string }) => {
  return (
    <motion.div 
      className="p-4 rounded-[3rem] mb-4"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={staggerChildren}
    >
      {title && (
        <motion.h2 
          className="text-center text-[3rem] mb-[2rem]"
          variants={fadeInUp}
        >
          Phân ngành
        </motion.h2>
      )}
      
      <motion.div 
        className="grid grid-cols-2 p-4 md:grid-cols-3 gap-8"
        variants={staggerChildren}
      >
        {items.map((item, index) => (
          <motion.div 
            key={index} 
            className="text-center"
            variants={fadeInUp}
            custom={index * 0.1}
          >
            <Image
              src={item.image}
              alt={item.name}
              width={400}
              height={400}
              className="w-full aspect-square md:aspect-[unset] h-[unset] md:h-[18rem] object-cover rounded-[2rem] mb-4"
            />
            <p className="mb-4">{item.name}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

const Separator = () => (
  <section className="bg-[#364a3d] py-[3rem]"></section>
);

// Component hiển thị thông tin chi tiết của từng ngành
const IndustrySection = memo(() => {
  const { t } = useLanguage();
  
  // Dữ liệu ngành nông nghiệp
  const agricultureSubIndustries = [
    { name: 'Hạt khô', image: '/images/4nganhhang/nongnghiep/hatkho.jpg' },
    { name: 'Tinh bột', image: '/images/4nganhhang/nongnghiep/tinhbot.jpg' },
    { name: 'Cao su', image: '/images/4nganhhang/nongnghiep/caosu.jpg' },
    { name: 'Nông sản tươi', image: '/images/4nganhhang/nongnghiep/nongsantuoi.jpg' },
    { name: 'Vật tư nông nghiệp', image: '/images/4nganhhang/nongnghiep/vattunn.jpg' },
    { name: 'Rừng và dược liệu', image: '/images/4nganhhang/nongnghiep/rungvaduoclieu.jpg' }
  ];
  
  // Dữ liệu ngành năng lượng
  const energySubIndustries = [
    { name: 'Xăng dầu', image: '/images/4nganhhang/nangluong/xangdau.jpg' },
    { name: 'Trạm sạc điện', image: '/images/4nganhhang/nangluong/tramsac.jpg' },
    { name: 'Điện gió', image: '/images/4nganhhang/nangluong/diengio.jpg' },
    { name: 'Điện mặt trời', image: '/images/4nganhhang/nangluong/nangluongtaitao.jpg' },
    { name: 'Năng lượng sinh khối', image: '/images/4nganhhang/nangluong/sinhkhoi.jpg' }
  ];
  
  // Dữ liệu ngành khoáng sản
  const mineralSubIndustries = [
    { name: 'Đá xây dựng', image: '/images/4nganhhang/khoangsan/dathachanh.jpg' },
    { name: 'Cát xây dựng', image: '/images/4nganhhang/khoangsan/cat.jpg' },
    { name: 'Gạch ốp lát', image: '/images/4nganhhang/khoangsan/gachoplat.jpg' }
  ];
  
  // Dữ liệu ngành thủy sản
  const aquacultureImages = [
    { name: 'Thủy sản 1', image: '/images/4nganhhang/thuysan/ca1.jpg' },
    { name: 'Thủy sản 2', image: '/images/4nganhhang/thuysan/ca2.jpg' },
    { name: 'Thủy sản 3', image: '/images/4nganhhang/thuysan/ca3.jpg' }
  ];

  return (
    <>
      {/* Phần Nông nghiệp */}
      <section id="nongsan" className="py-16">
        <div className="container">
          <SectionTitle title="Nông nghiệp" id="nongsan" />
          
          <motion.div 
            className="bg-white p-4 rounded-[3rem] mb-16 shadow-xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerChildren}
          >
            <div className="flex flex-col md:flex-row">
              <motion.div 
                className="relative md:w-1/2 p-[3rem] lg:p-[6rem]"
                variants={fadeInUp}
              >
                <h2 className="text-[2.8rem]">
                  Định hướng đầu tư
                </h2>
                <p className="mb-[2rem] text-justify">
                  Ứng dụng công nghệ cao từ vùng trồng đến chế biến sâu
                  hướng đến thị trường toàn cầu.
                </p>
                <h2 className="text-[2.8rem]">
                  Phân ngành
                </h2>
                <ul className="text-[16px] list-disc list-inside text-left mb-3">
                  <li>Nông sản hạt khô</li>
                  <li>Nông sản chế biến (Tinh bột, cao su)</li>
                  <li>Vật tư nông nghiệp</li>
                  <li>Nông sản tươi</li>
                  <li>Rừng và dược liệu</li>
                </ul>
              </motion.div>
              <motion.div 
                className="md:w-1/2 p-4"
                variants={fadeInUp}
              >
                <Image 
                  src="/images/4nganhhang/nncncao.jpg"
                  alt="Nông nghiệp công nghệ cao"
                  width={800}
                  height={600}
                  className="w-full h-full rounded-[2rem]"
                />
              </motion.div>
            </div>
          </motion.div>
          
          <SubIndustryGrid items={agricultureSubIndustries} title="Phân ngành" />
          
          <motion.div 
            className="bg-white p-8 rounded-[3rem] shadow-xl mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerChildren}
          >
            <motion.h2 
              className="text-center text-[3rem] mb-[3rem] mt-[2rem]"
              variants={fadeInUp}
            >
              Đề án đầu tư
            </motion.h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              <motion.div 
                className="block lg:hidden w-full lg:col-span-1 xl:col-span-2 px-[1rem] rounded-[2rem]"
                variants={fadeInUp}
              >
                <h3 className="font-[500] text-center mb-4">Tổng kho nông sản thông minh</h3>
              </motion.div>
              
              <motion.div 
                className="relative w-full lg:col-span-2 xl:col-span-3"
                variants={fadeInUp}
              >
                <Image 
                  src="/images/4nganhhang/duan/tongkhonongsan.jpg"
                  alt="Tổng kho nông sản thông minh"
                  width={1200}
                  height={800}
                  className="w-full h-[30rem] object-cover rounded-[2rem]"
                />
                <p className="absolute top-[27rem] right-[5rem] text-white text-lg">Ảnh tham khảo</p>
              </motion.div>
              
              <motion.div 
                className="w-full lg:col-span-1 xl:col-span-2 p-[1rem] lg:p-[3rem] rounded-[2rem]"
                variants={fadeInUp}
              >
                <h3 className="font-[500] hidden lg:block mb-4">Tổng kho nông sản thông minh</h3>
                <p className="text-justify">
                  Tổng kho thông minh là hệ thống kho lưu trữ sử dụng công nghệ cao như tự động hóa, AI và IoT để tối ưu hóa
                  việc quản lý, phân phối và theo dõi hàng hóa. Tổng kho thông minh có khả năng tự động hóa quy trình nhập,
                  xuất và kiểm tra hàng hóa, giúp giảm thiểu sai sót và tăng cường hiệu quả vận hành, đồng thời giảm chi phí
                  và thời gian lưu kho.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
      
      <Separator />
      
      {/* Năng lượng */}
      <section id="nangluong" className="py-16">
        <div className="container">
          <SectionTitle title="Năng lượng" id="nangluong" />
          
          <motion.div 
            className="bg-white p-4 rounded-[3rem] mb-16 shadow-xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerChildren}
          >
            <div className="flex flex-col md:flex-row">
              <motion.div 
                className="relative md:w-1/2 p-[3rem] lg:p-[6rem]"
                variants={fadeInUp}
              >
                <h2 className="text-[2.8rem]">
                  Định hướng đầu tư
                </h2>
                <p className="mb-[2rem] text-justify">
                  Việt Nam đang dịch chuyển từ nguồn năng lượng truyền thống sang điện mặt trời, điện gió, sinh khối, đảm
                  bảo nguồn năng lượng bền vững, giảm phát thải và thúc đẩy tăng trưởng xanh.
                </p>
                <h2 className="text-[2.8rem]">
                  Phân ngành
                </h2>
                <ul className="text-[16px] list-disc list-inside text-justify">
                  <li>Xăng dầu & Trạm sạc điện</li>
                  <li>Năng lượng tái tạo</li>
                </ul>
              </motion.div>
              <motion.div 
                className="md:w-1/2 p-4"
                variants={fadeInUp}
              >
                <Image 
                  src="/images/4nganhhang/nangluong.jpg"
                  alt="Năng lượng"
                  width={800}
                  height={600}
                  className="w-full h-full rounded-[2rem]"
                />
              </motion.div>
            </div>
          </motion.div>
          
          <SubIndustryGrid items={energySubIndustries} title="Phân ngành" />
        </div>
      </section>
      
      <Separator />
      
      {/* Khoáng sản */}
      <section id="khoangsan" className="py-16">
        <div className="container">
          <SectionTitle title="Khoáng sản" id="khoangsan" />
          
          <motion.div 
            className="bg-white p-4 rounded-[3rem] mb-16 shadow-xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerChildren}
          >
            <div className="flex flex-col md:flex-row">
              <motion.div 
                className="relative md:w-1/2 p-[3rem] lg:p-[6rem]"
                variants={fadeInUp}
              >
                <h2 className="text-[2.8rem]">
                  Định hướng đầu tư
                </h2>
                <p className="mb-[2rem] text-justify">
                  Ngành khoáng sản (đá ốp lát, đá xây dựng, cát, kim loại,...) có tiềm năng lớn nhờ trữ lượng dồi dào và
                  chất lượng cao tại Việt Nam. Việc ứng dụng công nghệ cao trong khai thác và chế biến giúp nâng giá trị tài
                  nguyên, tối ưu hiệu suất và giảm tác động môi trường.
                </p>
              </motion.div>
              <motion.div 
                className="md:w-1/2 p-4"
                variants={fadeInUp}
              >
                <Image 
                  src="/images/4nganhhang/khoangsan.jpg"
                  alt="Khoáng sản"
                  width={800}
                  height={600}
                  className="w-full h-full rounded-[2rem]"
                />
              </motion.div>
            </div>
          </motion.div>
          
          <SubIndustryGrid items={mineralSubIndustries} title="Phân ngành" />
        </div>
      </section>
      
      <Separator />
      
      {/* Thủy sản */}
      <section id="thuysan" className="py-16">
        <div className="container">
          <SectionTitle title="Thủy sản" id="thuysan" />
          
          <motion.div 
            className="bg-white p-4 rounded-[3rem] mb-16 shadow-xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerChildren}
          >
            <div className="flex flex-col md:flex-row">
              <motion.div 
                className="relative md:w-1/2 p-[3rem] lg:p-[6rem]"
                variants={fadeInUp}
              >
                <h2 className="text-[2.8rem]">
                  Định hướng đầu tư
                </h2>
                <p className="mb-[2rem] text-justify">
                  Ngành thủy sản là lĩnh vực xuất khẩu chiến lược của Việt Nam, với tiềm năng lớn từ lợi thế tự nhiên.
                  Việc ứng dụng công nghệ cao trong nuôi trồng và chế biến đang mở ra hướng phát triển bền vững, nâng cao
                  giá trị và khả năng cạnh tranh toàn cầu.
                </p>
              </motion.div>
              <motion.div 
                className="md:w-1/2 p-4"
                variants={fadeInUp}
              >
                <Image 
                  src="/images/4nganhhang/thuysan.jpg"
                  alt="Thủy sản"
                  width={800}
                  height={600}
                  className="w-full h-full rounded-[2rem]"
                />
              </motion.div>
            </div>
          </motion.div>
          
          <SubIndustryGrid items={aquacultureImages} />
        </div>
      </section>
    </>
  );
});

IndustrySection.displayName = 'IndustrySection';

export default IndustrySection; 