import { Metadata } from "next";
import { generateSeoMetadata } from "@/lib/seo";
import NewsDetail from "@/components/pages/news/NewsDetail";
import { NewsItem } from '@/hooks/useNewsFilters';

// Hàm tải dữ liệu tin tức
async function getNewsData() {
  try {
    // Sử dụng cả hai tệp dữ liệu
    const [viData, enData] = await Promise.all([
      import('@/data/news_vi.json').then(module => module.default),
      import('@/data/news_en.json').then(module => module.default)
    ]);
    
    // Trả về cả hai bộ dữ liệu
    return {
      vi: viData,
      en: enData,
      // Mặc định là tiếng Việt (client-side sẽ lựa chọn ngôn ngữ phù hợp)
      default: viData
    };
  } catch (error) {
    console.error('Lỗi khi tải dữ liệu tin tức:', error);
    return {
      vi: [],
      en: [],
      default: []
    };
  }
}

// Tạo metadata cho trang
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = params;
  const allNewsData = await getNewsData();
  
  // Tìm tin tức trong cả hai ngôn ngữ
  const viNews = allNewsData.vi.find((item: NewsItem) => item.slug === slug);
  const enNews = allNewsData.en.find((item: NewsItem) => item.slug === slug);
  const news = viNews || enNews; // Ưu tiên tiếng Việt
  
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
  const allNewsData = await getNewsData();
  
  // Tìm tin tức trong cả hai ngôn ngữ
  const viNews = allNewsData.vi.find((item: NewsItem) => item.slug === params.slug);
  const enNews = allNewsData.en.find((item: NewsItem) => item.slug === params.slug);
  
  // Client component NewsDetail sẽ tự chọn ngôn ngữ phù hợp qua useLanguage hook
  // Ở đây chúng ta chỉ gửi dữ liệu cho cả hai ngôn ngữ
  const news = viNews || enNews || null;
  let relatedNews: NewsItem[] = [];
  
  if (news) {
    // Lấy tin tức liên quan từ dataset tương ứng
    const dataSource = viNews ? allNewsData.vi : allNewsData.en;
    
    relatedNews = dataSource
      .filter((item: NewsItem) =>
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
  // Để tạo trang tĩnh, chúng ta phải sử dụng cả hai bộ dữ liệu
  const viData = await import('@/data/news_vi.json').then(module => module.default);
  const enData = await import('@/data/news_en.json').then(module => module.default);
  
  // Kết hợp và lọc để có các slug duy nhất
  const allSlugs = new Set([
    ...viData.map((news: NewsItem) => news.slug),
    ...enData.map((news: NewsItem) => news.slug)
  ]);
  
  return Array.from(allSlugs).map(slug => ({
    slug,
  }));
}