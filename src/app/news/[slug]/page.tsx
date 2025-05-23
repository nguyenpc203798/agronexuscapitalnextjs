import { Metadata } from "next";
import { generateSeoMetadata } from "@/lib/seo";
import NewsDetail from "@/components/pages/news/NewsDetail";
import newsData from "@/data/news.json";
import { NewsItem } from '@/hooks/useNewsFilters';

// Tạo metadata cho trang
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = params;
  const news = newsData.find(item => item.slug === slug);

  if (!news) {
    return generateSeoMetadata({
      title: "Tin tức không tồn tại",
      description: "Tin tức bạn đang tìm kiếm không tồn tại hoặc đã được chuyển sang địa chỉ khác.",
      canonical: `/news`,
    });
  }
  
  return generateSeoMetadata({
    title: news.title,
    description: news.excerpt,
    keywords: [news.category, ...news.tags, "tin tức", "tantai"],
    canonical: `/news/${slug}`,
  });
}

export default async function NewsDetailPage({ params }: { params: { slug: string } }) {
  const news = (newsData as NewsItem[]).find(item => item.slug === params.slug) || null;
  let relatedNews: NewsItem[] = [];
  if (news) {
    relatedNews = (newsData as NewsItem[])
      .filter(item =>
        item.id !== news.id && (
          item.category === news.category ||
          item.tags.some(tag => news.tags.includes(tag))
        )
      )
      .slice(0, 3);
  }
  return <NewsDetail news={news} relatedNews={relatedNews} />;
}

export async function generateStaticParams() {
  return newsData.map((news) => ({
    slug: news.slug,
  }));
}