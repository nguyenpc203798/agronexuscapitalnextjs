'use client';

import { motion } from 'framer-motion';
import { memo } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import LazyImage from '@/components/LazyImage';
import Link from 'next/link';
import { useNewsFilters } from '@/hooks/useNewsFilters';
import { fadeInUp , staggerChildren } from '@/lib/animations';

const FeaturedNews = memo(() => {
  const { t, currentLocale } = useLanguage();
  const { latestNews, isLoading } = useNewsFilters();
  
  // Lấy 3 tin mới nhất làm tin nổi bật
  const featuredNews = latestNews.slice(0, 3);

  return (
    <section className="py-12 bg-backgroundprimary dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <motion.div 
          key={`featured-news-container-${currentLocale}`}
          initial="hidden"
          animate="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerChildren}
          className="space-y-8"
        >
          <motion.div variants={fadeInUp} className="mb-8">
            <h2 className="text-center dark:text-white">{t('news.featured.title')}</h2>
            <p className="text-center max-w-2xl mx-auto dark:text-gray-300">{t('news.featured.description')}</p>
          </motion.div>

          {isLoading ? (
            <motion.div variants={fadeInUp} className="flex justify-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1a3d0a] dark:border-[#8cbb78]"></div>
            </motion.div>
          ) : (
            <motion.div 
              key={`featured-news-grid-${currentLocale}`}
              variants={staggerChildren}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {featuredNews.map((news) => (
                <motion.div 
                  key={`${news.id}-${currentLocale}`}
                  variants={fadeInUp}
                  className="bg-background dark:bg-gray-800 rounded-[2rem] overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group"
                >
                  <Link href={`/news/${news.slug}`} className="block h-52 overflow-hidden">
                    <LazyImage
                      src={news.image}
                      alt={news.title}
                      width={600}
                      height={400}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>
                  <div className="p-6">
                    <div className="flex flex-wrap justify-between items-center mb-4">
                      <span className="text-sm text-[#5a5a3a] dark:text-gray-400">{news.date}</span>
                      <Link href={`/news?category=${news.category}`}>
                        <span className="text-xs uppercase tracking-wider bg-[#e7ece5] dark:bg-gray-700 px-2 py-1 rounded-full text-[#1a3d0a] dark:text-gray-200 font-medium">
                          {news.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                        </span>
                      </Link>
                    </div>
                    <Link href={`/news/${news.slug}`}>
                      <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white line-clamp-2 group-hover:text-[#1a3d0a] dark:group-hover:text-[#8cbb78] transition-colors duration-300">
                        {news.title}
                      </h3>
                    </Link>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm line-clamp-3">
                      {news.excerpt}
                    </p>
                    <div className="flex justify-end">
                      <Link 
                        href={`/news/${news.slug}`}
                        className="text-[#1a3d0a] dark:text-[#8cbb78] font-medium text-sm hover:underline flex items-center gap-1"
                      >
                        {t('news.featured.read_more')}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
});

FeaturedNews.displayName = 'FeaturedNews';

export default FeaturedNews; 