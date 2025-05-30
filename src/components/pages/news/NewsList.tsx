'use client';

import { motion } from 'framer-motion';
import { memo, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import LazyImage from '@/components/LazyImage';
import Link from 'next/link';
import { useNewsFilters } from '@/hooks/useNewsFilters';
import { useSearchParams } from 'next/navigation';
import { fadeInUp , staggerChildren } from '@/lib/animations';

type NewsListProps = {
  initialCategory?: string;
  initialTag?: string;
  initialSearchTerm?: string;
};

const NewsList = memo(({
  initialCategory = '',
  initialTag = '',
  initialSearchTerm = ''
}: NewsListProps) => {
  const { t, currentLocale } = useLanguage();
  const searchParams = useSearchParams();
  
  // Lấy các params từ URL nếu có
  const categoryParam = searchParams.get('category') || initialCategory;
  const tagParam = searchParams.get('tag') || initialTag;
  const searchParam = searchParams.get('search') || initialSearchTerm;
  
  const {
    currentPage,
    totalPages,
    paginatedNews,
    handlePageChange,
    isLoading,
    setCurrentPage
  } = useNewsFilters({
    initialCategory: categoryParam,
    initialTag: tagParam,
    initialSearchTerm: searchParam
  });

  // Lắng nghe sự kiện popstate để cập nhật state khi URL thay đổi
  useEffect(() => {
    const handlePopState = () => {
      // Reset trang về 1 khi URL thay đổi để tránh hiển thị trang trống
      setCurrentPage(1);
    };

    // Đăng ký sự kiện popstate
    window.addEventListener('popstate', handlePopState);
    
    // Hủy đăng ký khi component unmount
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [setCurrentPage]);
  

  // Render nút phân trang
  const renderPagination = () => {
    if (totalPages <= 1) return null;

    return (
      <motion.div variants={fadeInUp} className="flex justify-center gap-2 mt-8">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i + 1)}
            className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
              currentPage === i + 1
                ? 'bg-[#1a3d0a] text-white dark:bg-[#8cbb78] dark:text-gray-900'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </motion.div>
    );
  };

  return (
    <section id="news-list" className="pb-12">
      <motion.div
        key={`news-list-${currentLocale}-${categoryParam}-${tagParam}-${searchParam}-${currentPage}`}
        initial="hidden"
        animate="visible"
        viewport={{ once: false, amount: 0.1 }}
        variants={staggerChildren}
        className="space-y-8"
      >
        <motion.div variants={fadeInUp} className="mb-8">
          <h2 className="dark:text-white">{t('news.news_list.title')}</h2>
          <div className="w-20 h-1 bg-[#1a3d0a] dark:bg-[#8cbb78]"></div>
        </motion.div>

        {isLoading ? (
          <motion.div variants={fadeInUp} className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1a3d0a] dark:border-[#8cbb78]"></div>
          </motion.div>
        ) : paginatedNews.length > 0 ? (
          <motion.div 
            key={`news-items-${currentLocale}-${categoryParam}-${tagParam}-${searchParam}-${currentPage}`}
            variants={staggerChildren} 
            className="space-y-8"
          >
            {paginatedNews.map((news) => (
              <motion.div 
                key={`${news.id}-${currentLocale}`}
                variants={fadeInUp}
                className="group flex flex-col md:flex-row gap-6 bg-white dark:bg-gray-800 rounded-[2rem] overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 p-4"
              >
                <div className="w-full md:w-1/3 h-60 md:h-auto overflow-hidden rounded-[2rem]">
                  <Link href={`/news/${news.slug}`}>
                    <LazyImage
                      src={news.image}
                      alt={news.title}
                      width={600}
                      height={400}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>
                </div>
                
                <div className="w-full md:w-2/3">
                  <div className="flex flex-wrap gap-2 items-center mb-3">
                    <span className="text-sm text-[#5a5a3a] dark:text-gray-400">{news.date}</span>
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        // Đặt URL không có các bộ lọc khác
                        window.history.replaceState({}, '', `/news?category=${news.category}`);
                        // Kích hoạt sự kiện popstate để cập nhật state
                        window.dispatchEvent(new Event('popstate'));
                      }}
                      className="text-xs uppercase tracking-wider bg-[#e7ece5] dark:bg-gray-700 px-2 py-1 rounded-full text-[#1a3d0a] dark:text-gray-200 font-medium"
                    >
                      {news.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </button>
                  </div>
                  
                  <Link href={`/news/${news.slug}`}>
                    <h3 className="text-xl md:text-2xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-[#1a3d0a] dark:group-hover:text-[#8cbb78] transition-colors duration-300">
                      {news.title}
                    </h3>
                  </Link>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {news.excerpt}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {news.tags.map((tag, idx) => (
                      <button 
                        key={idx}
                        onClick={(e) => {
                          e.preventDefault();
                          // Đặt URL không có các bộ lọc khác
                          window.history.replaceState({}, '', `/news?tag=${tag.toLowerCase().replace(/\s+/g, '-')}`);
                          // Kích hoạt sự kiện popstate để cập nhật state
                          window.dispatchEvent(new Event('popstate'));
                        }}
                        className="text-xs bg-gray-100 dark:bg-gray-700 hover:bg-[#e7ece5] dark:hover:bg-gray-600 px-2 py-1 rounded-full text-gray-600 dark:text-gray-300 hover:text-[#1a3d0a] dark:hover:text-white transition-colors duration-300"
                      >
                        #{tag}
                      </button>
                    ))}
                  </div>
                  
                  <Link 
                    href={`/news/${news.slug}`}
                    className="inline-block bg-[#1a3d0a] dark:bg-[#2c5b18] text-white px-5 py-2 rounded-full hover:bg-[#2c5b18] dark:hover:bg-[#3d7a23] transition-colors duration-300"
                  >
                    {t('news.news_list.read_more')}
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div variants={fadeInUp} className="text-center py-16">
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              {t('news.news_list.no_results')}
            </p>
          </motion.div>
        )}
        
        {/* Phân trang */}
        {renderPagination()}
      </motion.div>
    </section>
  );
});

NewsList.displayName = 'NewsList';

export default NewsList; 