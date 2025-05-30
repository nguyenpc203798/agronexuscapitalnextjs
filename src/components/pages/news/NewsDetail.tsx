'use client';

import { memo, Suspense } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import MainLayout from '@/layouts/MainLayout';
import LazyImage from '@/components/LazyImage';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { NewsItem } from '@/hooks/useNewsFilters';
import PageHero from '@/components/ui/PageHero';
import NewsCategories from './NewsCategories';
import { fadeInUp , staggerChildren } from '@/lib/animations';

interface NewsDetailProps {
  news: NewsItem | null;
  relatedNews: NewsItem[];
}

// Loading fallback component
const Loading = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#1a3d0a]"></div>
  </div>
);

const NewsDetailContent = memo(({ news, relatedNews }: NewsDetailProps) => {
  const { t, currentLocale } = useLanguage();

  if (!news) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">{t('news.not_found')}</h2>
        <Link href="/news" className="bg-[#1a3d0a] dark:bg-[#2c5b18] text-white px-6 py-2 rounded-full hover:bg-[#2c5b18] dark:hover:bg-[#3d7a23] transition-colors duration-300">
          {t('news.back_to_news')}
        </Link>
      </div>
    </div>;
  }

  return (
    <MainLayout>
      <div className="min-h-screen overflow-hidden">
        <PageHero 
          backgroundImage="/images/news-banner.jpg"
          title={news.title}
          description={news.excerpt}
        />

        <div className="container mx-auto px-4 py-10 flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-3/4">
            <motion.article
              key={`news-detail-${news.id}-${currentLocale}`}
              initial="hidden"
              animate="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={staggerChildren}
              className="bg-white dark:bg-gray-800 rounded-[2rem] shadow-md p-6 mb-8"
            >
              {/* Metadata */}
              <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-4 mb-6">
                <span className="text-[#5a5a3a] dark:text-gray-400">{news.date}</span>
                <Link href={`/news?category=${news.category}`}>
                  <span className="text-xs uppercase tracking-wider bg-[#e7ece5] dark:bg-gray-700 px-3 py-1 rounded-full text-[#1a3d0a] dark:text-gray-200 font-medium">
                    {news.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </span>
                </Link>
                <span className="text-gray-500 dark:text-gray-400">
                  {t('news.by')} {news.author}
                </span>
              </motion.div>

              {/* Hình ảnh chính */}
              <motion.div variants={fadeInUp} className="mb-8 rounded-[2rem] overflow-hidden">
                <LazyImage
                  src={news.image}
                  alt={news.title}
                  width={1200}
                  height={630}
                  className="w-full h-auto"
                />
              </motion.div>

              {/* Nội dung */}
              <motion.div variants={fadeInUp} className="prose max-w-none dark:prose-invert">
                <p className="text-lg font-medium mb-6 dark:text-white">
                  {news.excerpt}
                </p>
                {/* Giả lập nội dung chi tiết từ content_preview */}
                <p className="mb-4 dark:text-gray-300">
                  {news.content_preview}
                </p>
                <p className="mb-4 dark:text-gray-300">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Sed euismod, nisl eget ultricies ultrices, nunc nisl aliquam nunc, eget aliquet nisl nisl eget nisl. Sed euismod, nisl eget ultricies ultrices, nunc nisl aliquam nunc, eget aliquet nisl nisl eget nisl.
                </p>
                <h3 className="text-xl font-bold mt-8 mb-4 text-[#1a3d0a] dark:text-[#8cbb78]">
                  {t('news.market_overview')}
                </h3>
                <p className="mb-4 dark:text-gray-300">
                  Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Nullam quis risus eget urna mollis ornare vel eu leo. Cras mattis consectetur purus sit amet fermentum.
                </p>
                <p className="mb-4 dark:text-gray-300">
                  Nulla vitae elit libero, a pharetra augue. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec ullamcorper nulla non metus auctor fringilla. Cras mattis consectetur purus sit amet fermentum.
                </p>
              </motion.div>

              {/* Tags */}
              <motion.div variants={fadeInUp} className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <span className="font-medium text-gray-700 dark:text-gray-300">{t('news.tags.title')}:</span>
                {news.tags.map((tag, idx) => (
                  <Link 
                    key={`tag-${idx}-${currentLocale}`} 
                    href={`/news?tag=${tag.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-sm bg-gray-100 dark:bg-gray-700 hover:bg-[#e7ece5] dark:hover:bg-gray-600 px-3 py-1 rounded-full text-gray-600 dark:text-gray-300 hover:text-[#1a3d0a] dark:hover:text-white transition-colors duration-300"
                  >
                    #{tag}
                  </Link>
                ))}
              </motion.div>
            </motion.article>

            {/* Tin tức liên quan */}
            <motion.div
              key={`related-news-${currentLocale}`}
              initial="hidden"
              animate="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={staggerChildren}
              className="space-y-6"
            >
              <motion.div variants={fadeInUp}>
                <h2 className="text-2xl font-bold mb-6 text-[#1a3d0a] dark:text-[#8cbb78]">
                  {t('news.related_news')}
                </h2>
              </motion.div>

              <motion.div variants={staggerChildren} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedNews.map((item) => (
                  <motion.div 
                    key={`related-${item.id}-${currentLocale}`}
                    variants={fadeInUp}
                    className="bg-white dark:bg-gray-800 rounded-[2rem] overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group"
                  >
                    <Link href={`/news/${item.slug}`} className="block h-40 overflow-hidden">
                      <LazyImage
                        src={item.image}
                        alt={item.title}
                        width={400}
                        height={250}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </Link>
                    <div className="p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs text-[#5a5a3a] dark:text-gray-400">{item.date}</span>
                        <span className="text-xs uppercase tracking-wider bg-[#e7ece5] dark:bg-gray-700 px-2 py-1 rounded-full text-[#1a3d0a] dark:text-gray-200 font-medium">
                          {item.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                        </span>
                      </div>
                      <Link href={`/news/${item.slug}`}>
                        <h3 className="text-base font-bold leading-tight group-hover:text-[#1a3d0a] dark:text-white dark:group-hover:text-[#8cbb78] transition-colors duration-300 line-clamp-2">
                          {item.title}
                        </h3>
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
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
const NewsDetail = ({ news, relatedNews }: NewsDetailProps) => {
  return (
    <Suspense fallback={<Loading />}>
      <NewsDetailContent news={news} relatedNews={relatedNews} />
    </Suspense>
  );
};

NewsDetailContent.displayName = 'NewsDetailContent';
NewsDetail.displayName = 'NewsDetail';

export default NewsDetail;