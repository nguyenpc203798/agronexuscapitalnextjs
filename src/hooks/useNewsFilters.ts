import { useState, useEffect, useMemo, useCallback } from 'react';
import { useLanguage } from '@/context/LanguageContext';

export type NewsItem = {
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
};

type UseNewsFiltersProps = {
  initialCategory?: string;
  initialTag?: string;
  initialSearchTerm?: string;
  itemsPerPage?: number;
};

export const useNewsFilters = ({
  initialCategory = '',
  initialTag = '',
  initialSearchTerm = '',
  itemsPerPage = 4
}: UseNewsFiltersProps = {}) => {
  const { currentLocale } = useLanguage();
  const [newsData, setNewsData] = useState<NewsItem[]>([]);
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedTag, setSelectedTag] = useState(initialTag);
  const [currentPage, setCurrentPage] = useState(1);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(initialSearchTerm);
  const [isLoading, setIsLoading] = useState(true);
  const [prevLocale, setPrevLocale] = useState(currentLocale);

  // Theo dõi sự thay đổi của các prop ban đầu từ URL
  useEffect(() => {
    setSelectedCategory(initialCategory);
    setSelectedTag(initialTag);
    setSearchTerm(initialSearchTerm);
    setDebouncedSearchTerm(initialSearchTerm);
  }, [initialCategory, initialTag, initialSearchTerm]);

  // Tải dữ liệu tin tức dựa vào ngôn ngữ
  useEffect(() => {
    const loadNews = async () => {
      setIsLoading(true);
      try {
        // Tạo tham số cacheBuster để tránh caching
        const cacheBuster = new Date().getTime();
        let response;
        
        if (currentLocale === 'en') {
          console.log("Đang tải dữ liệu tin tức tiếng Anh...");
          response = await fetch(`/data/news_en.json?v=${cacheBuster}`);
        } else {
          console.log("Đang tải dữ liệu tin tức tiếng Việt...");
          response = await fetch(`/data/news_vi.json?v=${cacheBuster}`);
        }
        
        const data = await response.json();
        console.log(`Đã tải tin tức cho ngôn ngữ: ${currentLocale}`, data);
        setNewsData(data);

        // Phát hiện sự thay đổi ngôn ngữ để reset các bộ lọc nếu cần
        if (currentLocale !== prevLocale) {
          console.log(`Ngôn ngữ thay đổi từ ${prevLocale} sang ${currentLocale}`);
          setPrevLocale(currentLocale);
          // Reset lại trang về 1 khi thay đổi ngôn ngữ
          setCurrentPage(1);
        }
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu tin tức:', error);
        setNewsData([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadNews();
  }, [currentLocale, prevLocale]);

  // Xử lý debounce cho searchTerm để tránh tìm kiếm liên tục khi gõ
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setCurrentPage(1); // Reset trang khi thay đổi điều kiện tìm kiếm
    }, 300);

    return () => clearTimeout(timerId);
  }, [searchTerm]);

  // Lọc tin tức dựa trên các điều kiện
  const filteredNews = useMemo(() => {
    return newsData.filter((news: NewsItem) => {
      // Lọc theo search term
      const matchesSearch = debouncedSearchTerm
        ? news.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
          news.excerpt.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
        : true;

      // Lọc theo category
      const matchesCategory = selectedCategory
        ? news.category === selectedCategory
        : true;

      // Lọc theo tag
      const matchesTag = selectedTag
        ? news.tags.some(tag => tag.toLowerCase().replace(/\s+/g, '-') === selectedTag)
        : true;

      return matchesSearch && matchesCategory && matchesTag;
    });
  }, [debouncedSearchTerm, selectedCategory, selectedTag, newsData]);

  // Tính toán phân trang
  const totalItems = filteredNews.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  // Lấy tin tức cho trang hiện tại
  const paginatedNews = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredNews.slice(startIndex, endIndex);
  }, [filteredNews, currentPage, itemsPerPage]);

  // Xử lý thay đổi trang
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    // Đảm bảo cuộn sau khi state đã được cập nhật và DOM đã render
    setTimeout(() => {
      const newsListElement = document.getElementById('news-list');
      if (newsListElement) {
        window.scrollTo({ top: newsListElement.offsetTop - 100, behavior: 'smooth' });
      }
    }, 50);
  }, []);

  // Xử lý khi chọn danh mục 
  const handleCategoryChange = useCallback((category: string) => {
    if (category === selectedCategory) {
      setSelectedCategory('');
    } else {
      setSelectedCategory(category);
      setSelectedTag(''); // Reset tag khi chọn category mới
    }
    setCurrentPage(1); // Reset trang
  }, [selectedCategory]);

  // Xử lý khi chọn tag
  const handleTagChange = useCallback((tag: string) => {
    if (tag === selectedTag) {
      setSelectedTag('');
    } else {
      setSelectedTag(tag);
      setSelectedCategory(''); // Reset category khi chọn tag mới  
    }
    setCurrentPage(1); // Reset trang
  }, [selectedTag]);

  // Xử lý khi tìm kiếm
  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term);
    if (term) {
      setSelectedCategory(''); // Reset category khi tìm kiếm
      setSelectedTag(''); // Reset tag khi tìm kiếm
    }
    setCurrentPage(1); // Reset trang
  }, []);

  // Xử lý reset tất cả các bộ lọc
  const resetFilters = useCallback(() => {
    setSelectedCategory('');
    setSelectedTag('');
    setSearchTerm('');
    setDebouncedSearchTerm('');
    setCurrentPage(1);
  }, []);

  // Lấy danh sách các danh mục duy nhất
  const categories = useMemo(() => {
    const categorySet = new Set(newsData.map((news: NewsItem) => news.category));
    return Array.from(categorySet).map(category => {
      const count = newsData.filter((news: NewsItem) => news.category === category).length;
      const displayName = category.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ');
      
      return {
        name: displayName,
        count: count,
        slug: category // Sử dụng trực tiếp category làm slug vì đã ở định dạng chuẩn
      };
    });
  }, [newsData]);

  // Lấy danh sách các tag duy nhất
  const tags = useMemo(() => {
    const tagSet = new Set<string>();
    newsData.forEach((news: NewsItem) => {
      news.tags.forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet);
  }, [newsData]);

  // Lấy tin tức mới nhất
  const latestNews = useMemo(() => {
    return [...newsData]
      .sort((a, b) => {
        const dateA = new Date(a.date.split('/').reverse().join('-'));
        const dateB = new Date(b.date.split('/').reverse().join('-'));
        return dateB.getTime() - dateA.getTime();
      })
      .slice(0, 3);
  }, [newsData]);

  return {
    searchTerm,
    selectedCategory,
    selectedTag,
    currentPage,
    totalPages,
    paginatedNews,
    filteredNews,
    categories,
    tags,
    latestNews,
    handleSearch,
    handleCategoryChange,
    handleTagChange,
    handlePageChange,
    resetFilters,
    isLoading,
    setCurrentPage
  };
}; 