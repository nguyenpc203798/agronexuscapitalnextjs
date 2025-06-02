'use client';

import { memo, useEffect, useState, Suspense } from 'react';
import PageHero from '@/components/ui/PageHero';
import NewsList from './NewsList';
import NewsCategories from './NewsCategories';
import FeaturedNews from './FeaturedNews';
import MainLayout from '@/layouts/MainLayout';
import { useSearchParams } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';

// Loading fallback component
const Loading = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#1a3d0a]"></div>
  </div>
);

const NewsPageContent = memo(() => {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const [pageTitle, setPageTitle] = useState('');
  const [pageDescription, setPageDescription] = useState('');
  
  // Lấy các params từ URL nếu có
  const categoryParam = searchParams.get('category') || '';
  const tagParam = searchParams.get('tag') || '';
  const searchParam = searchParams.get('search') || '';

  // Cập nhật tiêu đề và mô tả trang dựa vào params
  useEffect(() => {
    if (categoryParam) {
      const categoryName = categoryParam
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      setPageTitle(`${t('news.category')}: ${categoryName}`);
      setPageDescription(`${t('news.category_description')} ${categoryName}`);
    } else if (tagParam) {
      const tagName = tagParam
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      setPageTitle(`${t('news.tag')}: ${tagName}`);
      setPageDescription(`${t('news.tag_description')} ${tagName}`);
    } else if (searchParam) {
      setPageTitle(`${t('news.search_results')}: ${searchParam}`);
      setPageDescription(t('news.search_description'));
    } else {
      // Để trống để sử dụng i18nKey
      setPageTitle('');
      setPageDescription('');
    }
  }, [categoryParam, tagParam, searchParam, t]);

  // Hiển thị FeaturedNews chỉ khi ở trang tin tức chính (không có bộ lọc)
  const showFeaturedNews = !categoryParam && !tagParam && !searchParam;

  return (
    <MainLayout>
      <div className="min-h-screen overflow-hidden dark:bg-gray-900">
        <PageHero 
          variant="simple"
          title={pageTitle}
          description={pageDescription}
          i18nKey={
            !pageTitle && !pageDescription
              ? { title: 'news.title', description: 'news.description' } 
              : undefined
          }
        />
        {showFeaturedNews && <FeaturedNews />}
        <div className="container mx-auto px-4 py-10 flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-3/4">
            <NewsList 
              initialCategory={categoryParam}
              initialTag={tagParam}
              initialSearchTerm={searchParam}
            />
          </div>
          <div className="w-full lg:w-1/4">
            <NewsCategories />
          </div>
        </div>
      </div>
    </MainLayout>
  );
});

// Wrapper component that adds Suspense
const NewsPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <NewsPageContent />
    </Suspense>
  );
};

NewsPageContent.displayName = 'NewsPageContent';
NewsPage.displayName = 'NewsPage';

export default NewsPage; 