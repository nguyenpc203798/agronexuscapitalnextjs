'use client';

import { memo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import LazyImage from "@/components/LazyImage";
import { useLanguage } from "@/context/LanguageContext";
import { fadeInUp } from "@/lib/animations";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar, Users, Folder } from "lucide-react";

// Interface cho tin tức
interface NewsItem {
  id: number;
  image: string;
  date: string;
  title: string;
  category: string;
  tags: string[];
  excerpt: string;
  slug: string;
  author: string;
  status: string;
  content_preview: string;
}

const NewsSection = memo(() => {
  const { t, currentLocale } = useLanguage();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Tải dữ liệu tin tức khi component được mount
  useEffect(() => {
    const loadNews = async () => {
      setIsLoading(true);
      try {
        let newsData;
        
        if (currentLocale === 'en') {
          console.log("Đang tải dữ liệu tin tức tiếng Anh...");
          const response = await fetch(`/data/news_en.json`);
          newsData = await response.json();
        } else {
          console.log("Đang tải dữ liệu tin tức tiếng Việt...");
          const response = await fetch(`/data/news_vi.json`);
          newsData = await response.json();
        }
        
        console.log(`Đã tải tin tức cho ngôn ngữ: ${currentLocale}`, newsData);
        setNews(newsData.slice(0, 4)); // Lấy 4 tin đầu tiên
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu tin tức:', error);
      } finally {
        setIsLoading(false);
      }
    };

    // Gọi hàm tải tin tức
    loadNews();
  }, [currentLocale]);

  return (
    <section id="news" className="py-0 mb-[10rem]">
      <div className="container">
        <motion.div
          key={`news-section-title-${currentLocale}`}
          className="text-center"
          initial="hidden"
          animate="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInUp}
        >
          <h1 className="text-[3rem] mt-[3rem] mb-[5rem]">
            {t("home.industry_section.news_section.title")}
          </h1>
        </motion.div>

        {isLoading ? (
          <motion.div 
            key={`news-section-loading-${currentLocale}`} 
            variants={fadeInUp} 
            className="flex justify-center py-20"
          >
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1a3d0a] dark:border-[#8cbb78]"></div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {news.length > 0 && (
              <motion.div
                key={`news-main-${currentLocale}`}
                initial="hidden"
                animate="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={fadeInUp}
              >
                <div>
                  <a href={`/news/${news[0].slug}`}>
                    <LazyImage
                      src={news[0].image}
                      alt={news[0].title}
                      width={800}
                      height={600}
                      className="object-cover rounded-[20px] h-[30rem] w-full shadow-md"
                    />
                  </a>
                  <div className="relative bg-background shadow-md rounded-[20px] z-10 -mt-[100px] p-[30px]">
                    <ul className="mb-5">
                      <li className="inline-block text-[15px] text-[#afafaf] font-light mr-5">
                        <Calendar className="inline text-primary mr-2 h-4 w-4" />{" "}
                        {news[0].date}
                      </li>
                      <li className="inline-block text-[15px] text-[#afafaf] font-light mr-5">
                        <Users className="inline text-primary mr-2 h-4 w-4" />{" "}
                        {news[0].author}
                      </li>
                      <li className="inline-block text-[15px] text-[#afafaf] font-light">
                        <Folder className="inline text-primary mr-2 h-4 w-4" />{" "}
                        {news[0].category}
                      </li>
                    </ul>
                    <a href={`/news/${news[0].slug}`}>
                      <h4 className="text-[20px] font-bold my-5">
                        {news[0].title}
                      </h4>
                    </a>
                    <p className="mb-4">{news[0].excerpt}</p>
                  </div>
                </div>
              </motion.div>
            )}

            <motion.div
              key={`news-list-${currentLocale}`}
              className="lg:ml-[30px]"
              initial="hidden"
              animate="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={fadeInUp}
            >
              <ul>
                {news.slice(1).map((item) => (
                  <li key={`news-item-${item.id}-${currentLocale}`} className="flex flex-col md:flex-row w-full mb-[30px] md:border-t md:border-gray-200 md:pt-[30px]">
                    <div className="md:mr-[45px] md:w-[70%]">
                      <span className="text-[15px] text-[#afafaf] font-light">
                        <Calendar className="inline text-primary mr-2 h-4 w-4" />{" "}
                        {item.date}
                      </span>
                      <a href={`/news/${item.slug}`}>
                        <h4 className="text-[20px] font-bold my-5 text-justify">
                          {item.title}
                        </h4>
                      </a>
                      <details>
                        <summary className="cursor-pointer">
                          {currentLocale === 'en' ? 'Read more' : 'Xem thêm'}
                        </summary>
                        <p className="text-justify">{item.excerpt}</p>
                      </details>
                    </div>
                    <div className="md:w-[30%] mt-4 md:mt-0">
                      <a href={`/news/${item.slug}`}>
                        <LazyImage
                          src={item.image}
                          alt={item.title}
                          width={250}
                          height={144}
                          className="w-full md:w-[250px] h-[15rem] md:h-[9rem] object-cover rounded-[20px]"
                        />
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        )}

        <div className="w-full flex justify-center mt-14">
          <Link href="/news">
            <Button className="px-10 py-5 text-lg">
              {t("home.industry_section.news_section.more_news")}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
});

NewsSection.displayName = "NewsSection";

export default NewsSection; 