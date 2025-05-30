"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import LazyImage from "@/components/LazyImage";
import { useLanguage } from "@/context/LanguageContext";
import { fadeInUp, staggerChildren } from "@/lib/animations";

// Component hiển thị phần tiêu đề có đường thẳng ở hai bên
const SectionTitle = ({ title }: { title: string }) => {
  return (
    <div className="relative mb-[6rem]">
      <div className="flex items-center">
        <div className="hidden md:flex space-x-8 mr-4">
          <div className="w-7 h-7 bg-[#E8F3EC] rounded-full"></div>
          <div className="w-7 h-7 bg-[#D2E8D9] rounded-full"></div>
          <div className="w-7 h-7 bg-[#BBDCC7] rounded-full"></div>
          <div className="w-7 h-7 bg-[#A5D1B4] rounded-full"></div>
          <div className="w-7 h-7 bg-[#8EC5A1] rounded-full"></div>
        </div>
        <div className="hidden md:block border-[1px] border-primary flex-grow"></div>
        <div className="hidden md:flex space-x-8 ml-4">
          <div className="w-7 h-7 bg-[#8EC5A1] rounded-full"></div>
          <div className="w-7 h-7 bg-[#A5D1B4] rounded-full"></div>
          <div className="w-7 h-7 bg-[#BBDCC7] rounded-full"></div>
          <div className="w-7 h-7 bg-[#D2E8D9] rounded-full"></div>
          <div className="w-7 h-7 bg-[#E8F3EC] rounded-full"></div>
        </div>
      </div>
      <h2 className="bg-background  w-[20rem] lg:w-auto top-[-27px] lg:top-[-40px] bg-b p-0 lg:p-5 absolute left-1/2 transform -translate-x-1/2 text-center mb-0 lg:mb-[2rem] z-10">
        {title}
      </h2>
    </div>
  );
};

// Component hiển thị phân ngành
const SubIndustryGrid = ({
  items,
  title,
}: {
  items: Array<{ name: string; image: string }>;
  title?: string;
}) => {
  const isEnergyIndustry = items.some(
    (item) =>
      item.name === "Xăng dầu" ||
      item.name === "Trạm sạc điện" ||
      item.name === "Điện gió" ||
      item.name === "Điện mặt trời" ||
      item.name === "Năng lượng sinh khối"
  );

  const { t } = useLanguage();

  return (
    <motion.div
      className="md:p-4 rounded-[3rem] mb-4"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={staggerChildren}
    >
      {title && (
        <motion.h2 className="text-center" variants={fadeInUp}>
          {t("home.industry_section.agriculture.sub_industries")}
        </motion.h2>
      )}

      {isEnergyIndustry ? (
        // Layout đặc biệt cho ngành năng lượng
        <>
          <motion.div
            className="grid grid-cols-2 md:p-4 md:grid-cols-2 gap-8"
            variants={staggerChildren}
          >
            {items.slice(0, 2).map((item, index) => (
              <motion.div
                key={index}
                className="text-center"
                variants={fadeInUp}
                custom={index * 0.2}
              >
                <div className="w-full aspect-square md:aspect-[unset] h-[unset] md:h-[18rem] rounded-[2rem] mb-4 overflow-hidden">
                  <LazyImage
                    src={item.image}
                    alt={item.name}
                    width={400}
                    height={400}
                    className="object-cover hover:scale-110 transition-all duration-500"
                  />
                </div>
                <p className="mb-4 text-center">{item.name}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="grid grid-cols-2 md:p-4 md:grid-cols-3 gap-8"
            variants={staggerChildren}
          >
            {items.slice(2).map((item, index) => (
              <motion.div
                key={index + 2}
                className="text-center"
                variants={fadeInUp}
                custom={(index + 2) * 0.2}
              >
                <div className="w-full aspect-square md:aspect-[unset] h-[unset] md:h-[18rem] rounded-[2rem] mb-4 overflow-hidden">
                  <LazyImage
                    src={item.image}
                    alt={item.name}
                    width={400}
                    height={400}
                    className="object-cover hover:scale-110 transition-all duration-500"
                  />
                </div>
                <p className="mb-4 text-center">{item.name}</p>
              </motion.div>
            ))}
          </motion.div>
        </>
      ) : (
        // Layout mặc định cho các ngành khác
        <motion.div
          className="grid grid-cols-2 md:p-4 md:grid-cols-3 gap-8"
          variants={staggerChildren}
        >
          {items.map((item, index) => (
            <motion.div
              key={index}
              className="text-center"
              variants={fadeInUp}
              custom={index * 0.1}
            >
              <div className="w-full aspect-square md:aspect-[unset] h-[unset] md:h-[18rem] rounded-[2rem] mb-4 overflow-hidden">
                <LazyImage
                  src={item.image}
                  alt={item.name}
                  width={400}
                  height={400}
                  className="object-cover hover:scale-110 transition-all duration-500"
                />
              </div>
              <p className="mb-4 text-center">{item.name}</p>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

const Separator = () => <section className="bg-[#364a3d] dark:bg-[#487758] py-[2rem]"></section>;

// Component hiển thị thông tin chi tiết của từng ngành
const IndustrySection = memo(() => {
  // Sử dụng locale để có thể chuyển đổi giữa tiếng Việt và tiếng Anh
  const { t } = useLanguage();

  // Dữ liệu ngành nông nghiệp
  const agricultureSubIndustries = [
    {
      name: t("home.industry_section.agriculture.agriculture_images.dry_grain"),
      image: "/images/category/HighTechAgriculture/DryGrain.jpg",
    },
    {
      name: t("home.industry_section.agriculture.agriculture_images.starch"),
      image: "/images/category/HighTechAgriculture/Starch.jpg",
    },
    {
      name: t("home.industry_section.agriculture.agriculture_images.rubber"),
      image: "/images/category/HighTechAgriculture/Rubber.jpg",
    },
    {
      name: t("home.industry_section.agriculture.agriculture_images.fresh"),
      image: "/images/category/HighTechAgriculture/FreshProduce.jpg",
    },
    {
      name: t("home.industry_section.agriculture.agriculture_images.supplies"),
      image: "/images/category/HighTechAgriculture/AgriculturalSupplies.jpg",
    },
    {
      name: t("home.industry_section.agriculture.agriculture_images.forest"),
      image: "/images/category/HighTechAgriculture/Forest&Resource.jpg",
    },
  ];

  // Dữ liệu ngành năng lượng
  const energySubIndustries = [
    { name: t("home.industry_section.energy.energy_images.petroleum"), image: "/images/category/Energy/Petroleum.jpg" },
    {
      name: t("home.industry_section.energy.energy_images.charging"),
      image: "/images/category/Energy/ChargingStation.jpg",
    },
    { name: t("home.industry_section.energy.energy_images.wind"), image: "/images/category/Energy/WindPower.jpg" },
    { name: t("home.industry_section.energy.energy_images.solar"), image: "/images/category/Energy/SolarPower.jpg" },
    {
      name: t("home.industry_section.energy.energy_images.biomass"),
      image: "/images/category/Energy/Biomass.jpg",
    },
  ];

  // Dữ liệu ngành khoáng sản
  const mineralSubIndustries = [
    { name: t("home.industry_section.minerals.minerals_images.stone"), image: "/images/category/Minerals/Stone.jpg" },
    { name: t("home.industry_section.minerals.minerals_images.sand"), image: "/images/category/Minerals/Sand.jpg" },
    { name: t("home.industry_section.minerals.minerals_images.tile"), image: "/images/category/Minerals/Gach.jpg" },
  ];

  // Dữ liệu ngành thủy sản
  const aquacultureImages = [
    { name: t("home.industry_section.aquaculture.aquaculture_images.seafood1"), image: "/images/category/SeaFood/1.jpg" },
    { name: t("home.industry_section.aquaculture.aquaculture_images.seafood2"), image: "/images/category/SeaFood/2.jpg" },
    { name: t("home.industry_section.aquaculture.aquaculture_images.seafood3"), image: "/images/category/SeaFood/3.jpg" },
  ];

  return (
    <>
      {/* Phần Nông nghiệp */}
      <section id="nongsan" className="py-16">
        <div className="container">
          <SectionTitle title={t("home.industry_section.agriculture.title")} />

          <motion.div
            className="bg-b md:md:p-4 rounded-[3rem] mb-16 md:shadow-xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerChildren}
          >
            <div className="flex flex-col md:flex-row">
              <motion.div
                className="relative md:w-1/2 md:p-[3rem] lg:p-[6rem] mb-12 md:mb-0"
                variants={fadeInUp}
              >
                <h2>{t("home.industry_section.agriculture.investment_direction")}</h2>
                <p className="mb-[2rem] text-justify">
                  {t("home.industry_section.agriculture.investment_content")}
                </p>
                <h2>{t("home.industry_section.agriculture.sub_industries")}</h2>
                <ul className="text-[16px] list-disc list-inside text-left mb-3">
                  <li>{t("home.industry_section.agriculture.sub_industries_list.dry_grain")}</li>
                  <li>{t("home.industry_section.agriculture.sub_industries_list.processed")}</li>
                  <li>{t("home.industry_section.agriculture.sub_industries_list.supplies")}</li>
                  <li>{t("home.industry_section.agriculture.sub_industries_list.fresh")}</li>
                  <li>{t("home.industry_section.agriculture.sub_industries_list.forest")}</li>
                </ul>
              </motion.div>
              <motion.div className="md:w-1/2 md:p-4" variants={fadeInUp}>
                <LazyImage
                  src="/images/category/HighTechAgriculture/Represent.jpg"
                  alt="Nông nghiệp công nghệ cao"
                  width={800}
                  height={600}
                  className="w-full h-full rounded-[2rem]"
                />
              </motion.div>
            </div>
          </motion.div>

          <SubIndustryGrid
            items={agricultureSubIndustries}
            title="Phân ngành"
          />

          <motion.div
            className="bg-b md:p-8 rounded-[3rem] md:shadow-xl mb-[4rem]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerChildren}
          >
            <motion.h2
              className="text-center text-[3rem] mb-[3rem] mt-[2rem]"
              variants={fadeInUp}
            >
              {t("home.industry_section.agriculture.investment_projects")}
            </motion.h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              <motion.div
                className="block lg:hidden w-full lg:col-span-1 xl:col-span-2 px-[1rem] rounded-[2rem]"
                variants={fadeInUp}
              >
                <h3 className="font-[500] text-center mb-4">
                  {t("home.industry_section.agriculture.smart_warehouse.title")}
                </h3>
              </motion.div>

              <motion.div
                className="relative w-full lg:col-span-2 xl:col-span-3"
                variants={fadeInUp}
              >
                <LazyImage
                  src="/images/category/HighTechAgriculture/Warehouse.jpg"
                  alt="Tổng kho nông sản thông minh"
                  width={1200}
                  height={800}
                  className="w-full h-[25rem] object-cover rounded-[2rem]"
                />
                <p className="absolute bottom-[1rem] right-[5rem] text-white text-lg">
                  {t("home.industry_section.agriculture.reference_image")}
                </p>
              </motion.div>

              <motion.div
                className="w-full lg:col-span-1 xl:col-span-2 p-[1rem] lg:p-[3rem] rounded-[2rem]"
                variants={fadeInUp}
              >
                <h3 className="font-[500] hidden lg:block mb-4">
                  {t("home.industry_section.agriculture.smart_warehouse.title")}
                </h3>
                <p className="text-justify">
                  {t("home.industry_section.agriculture.smart_warehouse.description")}
                </p>
              </motion.div>

              <motion.div
                className="block lg:hidden w-full lg:col-span-1 xl:col-span-2 p-[1rem] rounded-[2rem]"
                variants={fadeInUp}
              >
                <h3 className="font-[500] mb-4 text-center">
                  {t("home.industry_section.agriculture.high_tech_farm.title")}
                </h3>
              </motion.div>

              <motion.div
                className="relative block lg:hidden w-full lg:col-span-2 xl:col-span-3"
                variants={fadeInUp}
              >
                <LazyImage
                  src="/images/category/HighTechAgriculture/AgriculturalChain.jpg"
                  alt="Chuỗi nông trại công nghệ cao"
                  width={1200}
                  height={800}
                  className="w-full h-[25rem] object-cover rounded-[2rem]"
                />
                <p className="absolute bottom-[1rem] left-[2rem] text-white text-lg">
                  {t("home.industry_section.agriculture.reference_image")}
                </p>
              </motion.div>

              <motion.div
                className="w-full lg:col-span-1 xl:col-span-2 p-[1rem] lg:p-[3rem] rounded-[2rem]"
                variants={fadeInUp}
              >
                <h3 className="font-[500] hidden lg:block mb-4 text-right">
                  {t("home.industry_section.agriculture.high_tech_farm.title")}
                </h3>
                <p className="text-justify">
                  {t("home.industry_section.agriculture.high_tech_farm.description")}
                </p>
              </motion.div>

              <motion.div
                className="relative hidden lg:block w-full lg:col-span-2 xl:col-span-3"
                variants={fadeInUp}
              >
                <LazyImage
                  src="/images/category/HighTechAgriculture/AgriculturalChain.jpg"
                  alt="Chuỗi nông trại công nghệ cao"
                  width={1200}
                  height={800}
                  className="w-full h-[25rem] object-cover rounded-[2rem]"
                />
                <p className="absolute bottom-[1rem] left-[2rem] text-white text-lg">
                  {t("home.industry_section.agriculture.reference_image")}
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
          <SectionTitle title={t("home.industry_section.energy.title")} />

          <motion.div
            className="bg-b md:p-4 rounded-[3rem] mb-16 md:shadow-xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerChildren}
          >
            <div className="flex flex-col md:flex-row">
              <motion.div
                className="relative md:w-1/2 md:p-[3rem] lg:p-[6rem] mb-12 md:mb-0"
                variants={fadeInUp}
              >
                <h2>{t("home.industry_section.energy.investment_direction")}</h2>
                <p className="mb-[2rem] text-justify">
                  {t("home.industry_section.energy.investment_content")}
                </p>
                <h2>{t("home.industry_section.energy.sub_industries")}</h2>
                <ul className="text-[16px] list-disc list-inside text-justify">
                  <li>{t("home.industry_section.energy.sub_industries_list.petroleum")}</li>
                  <li>{t("home.industry_section.energy.sub_industries_list.renewable")}</li>
                </ul>
              </motion.div>
              <motion.div className="md:w-1/2 md:p-4" variants={fadeInUp}>
                <LazyImage
                  src="/images/category/Energy/Represent.jpg"
                  alt="Năng lượng"
                  width={800}
                  height={600}
                  className="w-full h-full rounded-[2rem]"
                />
              </motion.div>
            </div>
          </motion.div>

          <SubIndustryGrid items={energySubIndustries} title="Phân ngành" />

          <motion.div
            className="bg-b md:p-8 rounded-[3rem] md:shadow-xl mb-[4rem]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerChildren}
          >
            <motion.h2
              className="text-center text-[3rem] mb-[3rem] mt-[2rem]"
              variants={fadeInUp}
            >
              {t("home.industry_section.energy.investment_projects")}
            </motion.h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              <motion.div
                className="block lg:hidden w-full lg:col-span-1 xl:col-span-2 px-[1rem] rounded-[2rem]"
                variants={fadeInUp}
              >
                <h3 className="font-[500] text-center mb-4">
                  Tổng kho nông sản thông minh
                </h3>
              </motion.div>

              <motion.div
                className="relative w-full lg:col-span-2 xl:col-span-3"
                variants={fadeInUp}
              >
                <LazyImage
                  src="/images/category/Energy/Project1.jpg"
                  alt="Tổng kho nông sản thông minh"
                  width={1200}
                  height={800}
                  className="w-full h-[25rem] object-cover rounded-[2rem]"
                />
                <p className="absolute bottom-[1rem] right-[5rem] text-white text-lg">
                  {t("home.industry_section.energy.reference_image")}
                </p>
              </motion.div>

              <motion.div
                className="w-full lg:col-span-1 xl:col-span-2 p-[1rem] lg:p-[3rem] rounded-[2rem]"
                variants={fadeInUp}
              >
                <p className="text-justify">
                  {t("home.industry_section.energy.project1.description")}
                </p>
              </motion.div>

              <motion.div
                className="block lg:hidden w-full lg:col-span-1 xl:col-span-2 p-[1rem] rounded-[2rem]"
                variants={fadeInUp}
              >
                <h3 className="font-[500] mb-4 text-center">
                  Chuỗi nông trại công nghệ cao
                </h3>
              </motion.div>

              <motion.div
                className="relative block lg:hidden w-full lg:col-span-2 xl:col-span-3"
                variants={fadeInUp}
              >
                <LazyImage
                  src="/images/category/Energy/Project2.jpg"
                  alt="Chuỗi nông trại công nghệ cao"
                  width={1200}
                  height={800}
                  className="w-full h-[25rem] object-cover rounded-[2rem]"
                />
                <p className="absolute bottom-[1rem] left-[2rem] text-white text-lg">
                  {t("home.industry_section.energy.reference_image")}
                </p>
              </motion.div>

              <motion.div
                className="w-full lg:col-span-1 xl:col-span-2 p-[1rem] lg:p-[3rem] rounded-[2rem]"
                variants={fadeInUp}
              >
                <p className="text-justify md:text-end">
                  {t("home.industry_section.energy.project2.description")}
                </p>
              </motion.div>

              <motion.div
                className="relative hidden lg:block w-full lg:col-span-2 xl:col-span-3"
                variants={fadeInUp}
              >
                <LazyImage
                  src="/images/category/Energy/Project2.jpg"
                  alt="Chuỗi nông trại công nghệ cao"
                  width={1200}
                  height={800}
                  className="w-full h-[25rem] object-cover rounded-[2rem]"
                />
                <p className="absolute bottom-[1rem] left-[2rem] text-white text-lg">
                  {t("home.industry_section.energy.reference_image")}
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <Separator />

      {/* Khoáng sản */}
      <section id="khoangsan" className="py-16">
        <div className="container">
          <SectionTitle title={t("home.industry_section.minerals.title")} />

          <motion.div
            className="bg-b md:p-4 rounded-[3rem] mb-16 md:shadow-xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerChildren}
          >
            <div className="flex flex-col md:flex-row">
              <motion.div
                className="relative md:w-1/2 md:p-[3rem] lg:p-[6rem]"
                variants={fadeInUp}
              >
                <h2>{t("home.industry_section.minerals.investment_direction")}</h2>
                <p className="mb-[2rem] text-justify">
                  {t("home.industry_section.minerals.investment_content")}
                </p>
              </motion.div>
              <motion.div className="md:w-1/2 md:p-4" variants={fadeInUp}>
                <LazyImage
                  src="/images/category/Minerals/Represent.jpg"
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
            <SectionTitle title={t("home.industry_section.aquaculture.title")} />

          <motion.div
            className="bg-b md:p-4 rounded-[3rem] mb-16 md:shadow-xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerChildren}
          >
            <div className="flex flex-col md:flex-row">
              <motion.div
                className="relative md:w-1/2 md:p-[3rem] lg:p-[6rem]"
                variants={fadeInUp}
              >
                <h2>{t("home.industry_section.aquaculture.investment_direction")}</h2>
                <p className="mb-[2rem] text-justify">
                  {t("home.industry_section.aquaculture.investment_content")}
                </p>
              </motion.div>
              <motion.div className="md:w-1/2 md:p-4" variants={fadeInUp}>
                <LazyImage
                  src="/images/category/Seafood/Represent.jpg"
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

      <Separator />

      {/* Kho cảng và logicstic */}
      <section id="kho-cang-logicstic" className="py-[7rem]">
        <div className="container">
          <SectionTitle
            title={t("home.industry_section.logistics.title")}
          />

          <motion.div
            className="bg-background md:p-4 rounded-[3rem] mb-[4rem] md:shadow-xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerChildren}
          >
            <div className="flex flex-col md:flex-row">
              <motion.div
                className="relative md:w-1/2 md:p-[3rem] lg:p-[6rem]"
                variants={fadeInUp}
              >
                <h2>{t("home.industry_section.logistics.investment_direction")}</h2>
                <p className="mb-[2rem] text-justify">
                  {t("home.industry_section.logistics.investment_content")}
                </p>
                <ul className="mb-[2rem] list-disc pl-6">
                  <li className="mb-2">
                    {t("home.industry_section.logistics.services_list.port")}
                  </li>
                  <li className="mb-2">
                    {t("home.industry_section.logistics.services_list.warehouse")}
                  </li>
                  <li className="mb-2">{t("home.industry_section.logistics.services_list.transport")}</li>
                </ul>
              </motion.div>
              <motion.div className="md:w-1/2 md:p-4" variants={fadeInUp}>
                <LazyImage
                  src="/images/category/Warehouse&Logistics/Represent.jpg"
                  alt="Kho cảng logistics"
                  width={800}
                  height={600}
                  className="w-full h-full rounded-[2rem]"
                />
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            className="bg-background md:p-8 rounded-[3rem] md:shadow-xl mb-[4rem]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerChildren}
          >
            <motion.h2
              className="text-center text-[3rem] mb-[3rem] mt-[2rem]"
              variants={fadeInUp}
            >
              {t("home.industry_section.logistics.investment_projects")}
            </motion.h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              <motion.div
                className="block lg:hidden w-full lg:col-span-1 xl:col-span-2 px-[1rem] rounded-[2rem]"
                variants={fadeInUp}
              >
                <h3 className="font-[500] text-center mb-4">
                  {t("home.industry_section.logistics.port_services.title")}
                </h3>
              </motion.div>

              <motion.div
                className="relative w-full lg:col-span-2 xl:col-span-3"
                variants={fadeInUp}
              >
                <LazyImage
                  src="/images/category/Warehouse&Logistics/International.jpg"
                  alt="Dịch vụ Cảng Quốc tế"
                  width={1200}
                  height={800}
                  className="w-full h-[30rem] object-cover rounded-[2rem]"
                />
                <p className="absolute top-[27rem] right-[5rem] text-white text-lg">
                  {t("home.industry_section.logistics.reference_image")}
                </p>
              </motion.div>

              <motion.div
                className="w-full lg:col-span-1 xl:col-span-2 p-[1rem] lg:p-[3rem] rounded-[2rem]"
                variants={fadeInUp}
              >
                <h3 className="font-[500] hidden lg:block mb-4">
                  {t("home.industry_section.logistics.port_services.title")}
                </h3>
                <p className="text-justify">
                  {t("home.industry_section.logistics.port_services.description")}
                </p>
              </motion.div>

              <motion.div
                className="block lg:hidden w-full lg:col-span-1 xl:col-span-2 p-[1rem] rounded-[2rem]"
                variants={fadeInUp}
              >
                <h3 className="font-[500] mb-4 text-center">
                  {t("home.industry_section.logistics.warehouse_services.title")}
                </h3>
              </motion.div>

              <motion.div
                className="relative block lg:hidden w-full lg:col-span-2 xl:col-span-3"
                variants={fadeInUp}
              >
                <LazyImage
                  src="/images/category/Warehouse&Logistics/Warehouse.jpg"
                  alt="Dịch vụ Tổng kho"
                  width={1200}
                  height={800}
                  className="w-full h-[30rem] object-cover rounded-[2rem]"
                />
                <p className="absolute bottom-[1rem] left-[2rem] text-white text-lg">
                  {t("home.industry_section.logistics.reference_image")}
                </p>
              </motion.div>

              <motion.div
                className="w-full lg:col-span-1 xl:col-span-2 p-[1rem] lg:p-[3rem] rounded-[2rem]"
                variants={fadeInUp}
              >
                <h3 className="font-[500] hidden lg:block mb-4 text-right">
                  {t("home.industry_section.logistics.warehouse_services.title")}
                </h3>
                <p className="text-justify md:text-end">
                  {t("home.industry_section.logistics.warehouse_services.description")}
                </p>
              </motion.div>

              <motion.div
                className="relative hidden lg:block w-full lg:col-span-2 xl:col-span-3"
                variants={fadeInUp}
              >
                <LazyImage
                  src="/images/category/Warehouse&Logistics/Warehouse.jpg"
                  alt="Dịch vụ Tổng kho"
                  width={1200}
                  height={800}
                  className="w-full h-[30rem] object-cover rounded-[2rem]"
                />
                <p className="absolute bottom-[1rem] left-[2rem] text-white text-lg">
                  {t("home.industry_section.logistics.reference_image")}
                </p>
              </motion.div>

              <motion.div
                className="block lg:hidden w-full lg:col-span-1 xl:col-span-2 px-[1rem] rounded-[2rem]"
                variants={fadeInUp}
              >
                <h3 className="font-[500] text-center mb-4">
                  {t("home.industry_section.logistics.transport_services.title")}
                </h3>
              </motion.div>

              <motion.div
                className="relative w-full lg:col-span-2 xl:col-span-3"
                variants={fadeInUp}
              >
                <LazyImage
                  src="/images/category/Warehouse&Logistics/Transport.jpg"
                  alt="Dịch vụ Vận tải"
                  width={1200}
                  height={800}
                  className="w-full h-[30rem] object-cover rounded-[2rem]"
                />
                <p className="absolute top-[27rem] right-[5rem] text-white text-lg">
                  {t("home.industry_section.logistics.reference_image")}
                </p>
              </motion.div>

              <motion.div
                className="w-full lg:col-span-1 xl:col-span-2 p-[1rem] lg:p-[3rem] rounded-[2rem]"
                variants={fadeInUp}
              >
                <h3 className="font-[500] hidden lg:block mb-4">
                  {t("home.industry_section.logistics.transport_services.title")}
                </h3>
                <p className="text-justify">
                  {t("home.industry_section.logistics.transport_services.description")}
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <Separator />


    </>
  );
});

IndustrySection.displayName = "IndustrySection";

export default IndustrySection;
