'use client';

import { motion } from 'framer-motion';
import { memo, useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import Link from 'next/link';
import LazyImage from '@/components/LazyImage';
import { useNewsFilters } from '@/hooks/useNewsFilters';
import { useRouter, useSearchParams } from 'next/navigation';
import { fadeInUp , staggerChildren } from '@/lib/animations';

const NewsCategories = memo(() => {
  const { t, currentLocale } = useLanguage();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Lấy các params từ URL nếu có
  const categoryParam = searchParams.get('category') || '';
  const tagParam = searchParams.get('tag') || '';
  const searchParam = searchParams.get('search') || '';
  
  const {
    categories,
    tags,
    latestNews,
    handleSearch,
    isLoading
  } = useNewsFilters({
    initialCategory: categoryParam,
    initialTag: tagParam,
    initialSearchTerm: searchParam
  });

  // Cập nhật search term từ URL param khi component mount
  useEffect(() => {
    if (searchParam) {
      setSearchTerm(searchParam);
    } else {
      setSearchTerm('');
    }
  }, [searchParam]);

  // Lắng nghe sự kiện popstate để cập nhật state khi URL thay đổi
  useEffect(() => {
    const handlePopState = () => {
      // Đọc lại các query param từ URL
      const url = new URL(window.location.href);
      // Chỉ lấy và sử dụng param search, vì category và tag được xử lý tự động qua hook useNewsFilters
      const search = url.searchParams.get('search') || '';
      
      // Cập nhật search term nếu cần
      if (search !== searchTerm) {
        setSearchTerm(search);
      }
    };

    // Đăng ký sự kiện popstate
    window.addEventListener('popstate', handlePopState);
    
    // Hủy đăng ký khi component unmount
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [searchTerm]);

  // Xử lý tìm kiếm khi nhấn Enter
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch(searchTerm);
      updateUrlWithSearch(searchTerm);
    }
  };

  // Xử lý tìm kiếm khi click vào icon tìm kiếm
  const handleSearchClick = () => {
    handleSearch(searchTerm);
    updateUrlWithSearch(searchTerm);
  };

  // Cập nhật URL với từ khóa tìm kiếm mà không tải lại trang
  const updateUrlWithSearch = (term: string) => {
    if (term) {
      // Cập nhật URL với tham số tìm kiếm
      router.replace(`/news?search=${encodeURIComponent(term)}`);
    } else {
      // Nếu không có từ khóa, về lại trang gốc
      router.replace('/news');
    }
  };

  // Xử lý khi click vào danh mục
  const handleCategoryClick = (categorySlug: string) => {
    // Reset search term nếu đang có
    if (searchTerm) {
      setSearchTerm('');
    }
    
    // Nếu click vào category đang active, hủy bỏ lọc
    if (categoryParam === categorySlug) {
      router.replace('/news');
    } else {
      // Cập nhật URL với danh mục đã chọn
      router.replace(`/news?category=${categorySlug}`);
    }
  };

  // Xử lý khi click vào tag
  const handleTagClick = (tag: string) => {
    const formattedTag = tag.toLowerCase().replace(/\s+/g, '-');
    
    // Reset search term nếu đang có
    if (searchTerm) {
      setSearchTerm('');
    }
    
    // Nếu click vào tag đang active, hủy bỏ lọc
    if (tagParam === formattedTag) {
      router.replace('/news');
    } else {
      // Cập nhật URL với tag đã chọn
      router.replace(`/news?tag=${formattedTag}`);
    }
  };

  const renderLoadingSpinner = () => (
    <div className="flex justify-center py-8">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#1a3d0a] dark:border-[#8cbb78]"></div>
    </div>
  );

  // Thêm ngay sau khi lấy categories từ useNewsFilters
  // useEffect(() => {
  //   console.log('Categories trong NewsCategories:', categories);
  // }, [categories]);

  return (
    <motion.div
      key={`news-categories-${currentLocale}`}
      initial="hidden"
      animate="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={staggerChildren}
      className="space-y-10"
    >
      {/* Khối tìm kiếm */}
      <motion.div 
        key={`news-search-${currentLocale}`}
        variants={fadeInUp}
        className="bg-white dark:bg-gray-800 rounded-[2rem] shadow-md p-6"
      >
        <h3 className="text-xl font-bold mb-4 text-[#1a3d0a] dark:text-[#8cbb78]">{t('news.search.title')}</h3>
        <div className="relative">
          <input
            type="text"
            placeholder={t('news.search.placeholder')}
            className="w-full py-3 px-4 pr-10 rounded-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1a3d0a] dark:focus:ring-[#8cbb78] focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button 
            className="absolute right-4 top-1/2 transform -translate-y-1/2"
            onClick={handleSearchClick}
            aria-label="Search"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </motion.div>

      {/* Khối danh mục */}
      <motion.div 
        key={`news-category-list-${currentLocale}`}
        variants={fadeInUp}
        className="bg-white dark:bg-gray-800 rounded-[2rem] shadow-md p-6"
      >
        <h3 className="text-xl font-bold mb-4 text-[#1a3d0a] dark:text-[#8cbb78]">{t('news.categories.title')}</h3>
        {isLoading ? renderLoadingSpinner() : (
          <ul className="space-y-3">
            {categories.map((category) => (
              <li key={`${category.slug}-${currentLocale}`}>
                <button 
                  onClick={() => handleCategoryClick(category.slug)}
                  className={`w-full flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700 hover:text-[#1a3d0a] dark:hover:text-[#8cbb78] transition-colors duration-300 ${
                    categoryParam === category.slug ? 'text-[#1a3d0a] dark:text-[#8cbb78] font-medium' : 'dark:text-gray-300'
                  }`}
                >
                  <span>{category.name}</span>
                  <span className="bg-[#e7ece5] dark:bg-gray-700 text-[#1a3d0a] dark:text-gray-200 text-xs px-2 py-1 rounded-full">
                    {category.count}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </motion.div>

      {/* Khối tin mới nhất */}
      <motion.div 
        key={`news-latest-${currentLocale}`}
        variants={fadeInUp}
        className="bg-white dark:bg-gray-800 rounded-[2rem] shadow-md p-6"
      >
        <h3 className="text-xl font-bold mb-4 text-[#1a3d0a] dark:text-[#8cbb78]">{t('news.latest_news.title')}</h3>
        {isLoading ? renderLoadingSpinner() : (
          <div className="space-y-4">
            {latestNews.map((news) => (
              <Link 
                href={`/news/${news.slug}`}
                key={`latest-${news.id}-${currentLocale}`}
                className="flex gap-3 group"
              >
                <div className="w-20 h-20 flex-shrink-0 rounded-[1rem] overflow-hidden">
                  <LazyImage
                    src={news.image}
                    alt={news.title}
                    width={100}
                    height={100}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div>
                  <p className="text-xs text-[#5a5a3a] dark:text-gray-400 mb-1">{news.date}</p>
                  <h4 className="text-sm font-semibold leading-tight dark:text-gray-200 group-hover:text-[#1a3d0a] dark:group-hover:text-[#8cbb78] transition-colors duration-300">
                    {news.title}
                  </h4>
                </div>
              </Link>
            ))}
          </div>
        )}
      </motion.div>

      {/* Khối thẻ tag */}
      <motion.div 
        key={`news-tags-${currentLocale}`}
        variants={fadeInUp}
        className="bg-white dark:bg-gray-800 rounded-[2rem] shadow-md p-6"
      >
        <h3 className="text-xl font-bold mb-4 text-[#1a3d0a] dark:text-[#8cbb78]">{t('news.tags.title')}</h3>
        {isLoading ? renderLoadingSpinner() : (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <button 
                key={`${tag}-${currentLocale}-${index}`}
                onClick={() => handleTagClick(tag)} 
                className={`px-3 py-1 rounded-full text-sm transition-colors duration-300 ${
                  tagParam === tag.toLowerCase().replace(/\s+/g, '-')
                    ? 'bg-[#1a3d0a] dark:bg-[#2c5b18] text-white'
                    : 'bg-[#e7ece5] dark:bg-gray-700 text-[#1a3d0a] dark:text-gray-200 hover:bg-[#1a3d0a] hover:text-white dark:hover:bg-[#2c5b18]'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
});

NewsCategories.displayName = 'NewsCategories';

export default NewsCategories; 