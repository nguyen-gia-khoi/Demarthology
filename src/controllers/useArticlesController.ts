import { useEffect, useState } from "react";
import { Article } from "../models/Article";
import { apiService } from "../utils/api";

export interface Tag {
  _id: string;
  name: string;
}

export interface ArticleDetail extends Article {
  id: string;
}

function useArticlesController() {
  // Articles state
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [displayedArticles, setDisplayedArticles] = useState<Article[]>([]);
  
  // Tags state
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  // Filter state
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [searchTerm, setSearchTerm] = useState("");
  
  // UI state
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedArticle, setSelectedArticle] = useState<ArticleDetail | null>(null);
  const [articleDetailLoading, setArticleDetailLoading] = useState(false);
  
  // Pagination
  const articlesPerPage = 5;
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);

  // Helper function để lấy tên tag từ ID
  const getTagName = (tagId: string): string => {
    const tag = tags.find(t => t._id === tagId);
    return tag ? tag.name : tagId;
  };

  // Helper function để lấy tên tags từ array ID
  const getTagNames = (tagIds: string[]): string[] => {
    return tagIds.map(tagId => getTagName(tagId));
  };

  // Search logic
  const filterArticlesBySearch = (articles: Article[], searchTerm: string): Article[] => {
    if (!searchTerm.trim()) return articles;
    
    return articles.filter((article) =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.tags.some(tag => getTagName(tag).toLowerCase().includes(searchTerm.toLowerCase()))
    );
  };

  // Date filter logic
  const filterByDateRange = (articles: Article[], startDate: string, endDate: string): Article[] => {
    if (!startDate && !endDate) {
      return articles;
    }

    return articles.filter((article) => {
      const articleDate = new Date(article.date);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;

      if (start && end) {
        return articleDate >= start && articleDate <= end;
      } else if (start) {
        return articleDate >= start;
      } else if (end) {
        return articleDate <= end;
      }

      return true;
    });
  };

  // Apply all filters
  const applyFilters = () => {
    let filtered = [...articles];
    
    // Apply search filter
    filtered = filterArticlesBySearch(filtered, searchTerm);
    
    // Apply date filter
    filtered = filterByDateRange(filtered, dateRange.start, dateRange.end);
    
    setFilteredArticles(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  };

  // Update displayed articles based on pagination
  const updateDisplayedArticles = () => {
    const start = indexOfFirstArticle;
    const end = indexOfLastArticle;
    setDisplayedArticles(filteredArticles.slice(start, end));
  };

  // API calls
  const fetchTags = async () => {
    try {
      const data = await apiService.get<Tag[]>('/api/tags');
      setTags(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching tags:", err);
    }
  };

  const fetchArticles = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log("Fetching articles from API URL:", process.env.REACT_APP_API_URL);
      const data = await apiService.get<Article[]>('/api/papers');
      const articlesData = Array.isArray(data) ? data : [];
      setArticles(articlesData);
      setFilteredArticles(articlesData);
    } catch (err) {
      setError(
        `Không thể tải danh sách bài báo: ${
          err instanceof Error ? err.message : "Unknown error"
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  // Lấy chi tiết bài báo theo ID
  const fetchArticleDetail = async (articleId: string) => {
    try {
      setArticleDetailLoading(true);
      const data = await apiService.get<ArticleDetail>(`/api/paper/${articleId}`);
      setSelectedArticle(data);
    } catch (err) {
      setError(
        `Không thể tải chi tiết bài báo: ${
          err instanceof Error ? err.message : "Unknown error"
        }`
      );
    } finally {
      setArticleDetailLoading(false);
    }
  };

  // Lọc theo tag bằng API
  const fetchArticlesByTag = async (tagIds: string[]) => {
    try {
      setLoading(true);
      setError(null);
  
      if (tagIds.length === 0) {
        // Nếu không có tag nào được chọn, lấy tất cả bài báo
        setFilteredArticles(articles);
        setCurrentPage(1);
        return;
      }
  
      // Gọi API cho từng tag và gộp kết quả
      const requests = tagIds.map((tagId) =>
        apiService.get<Article[]>(`/api/papers-by-tag?tag=${encodeURIComponent(tagId)}`)
      );
  
      const allData = await Promise.all(requests);
  
      // Gộp kết quả từ nhiều tag
      const mergedData = allData.flat();
  
      setFilteredArticles(mergedData);
      setCurrentPage(1); // Reset về trang đầu khi filter
    } catch (err) {
      setError(
        `Không thể lọc bài báo theo tag: ${
          err instanceof Error ? err.message : "Unknown error"
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  // Event handlers
  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  const handleTagChange = (tagIds: string[]) => {
    setSelectedTags(tagIds);
    fetchArticlesByTag(tagIds);
  };

  const handleDateRangeChange = (range: { start: string; end: string }) => {
    setDateRange(range);
  };

  const handleApplyFilters = (tagIds: string[], range: { start: string; end: string }) => {
    setSelectedTags(tagIds);
    setDateRange(range);
    
    // Nếu có tag, gọi API trước
    if (tagIds.length > 0) {
      fetchArticlesByTag(tagIds).then(() => {
        // Sau khi có kết quả từ API, áp dụng date filter
        const dateFiltered = filterByDateRange(filteredArticles, range.start, range.end);
        setFilteredArticles(dateFiltered);
      });
    } else {
      // Chỉ có date filter, lọc từ articles gốc
      const dateFiltered = filterByDateRange(articles, range.start, range.end);
      setFilteredArticles(dateFiltered);
    }
    
    setCurrentPage(1);
  };

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const openArticleDetail = (articleId: string) => {
    fetchArticleDetail(articleId);
  };

  const closeArticleDetail = () => {
    setSelectedArticle(null);
  };
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearFilters = () => {
    setSelectedTags([]);
    setDateRange({ start: "", end: "" });
    setSearchTerm("");
    setFilteredArticles(articles);
    setCurrentPage(1);
  };

  // Effects
  useEffect(() => {
    fetchTags();
    fetchArticles();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [searchTerm, dateRange, articles]);

  useEffect(() => {
    updateDisplayedArticles();
  }, [filteredArticles, currentPage]);

  return {
    // Data
    articles: displayedArticles,
    allArticles: articles,
    filteredArticles,
    totalArticles: filteredArticles.length,
    tags,
    selectedTags,
    dateRange,
    selectedArticle,
    searchTerm,
    sidebarOpen,
    
    // Pagination
    currentPage,
    totalPages,
    articlesPerPage,
    indexOfFirstArticle,
    indexOfLastArticle,
    
    // Loading and error states
    loading,
    error,
    articleDetailLoading,
    
    // Helper functions
    getTagName,
    getTagNames,
    
    // Event handlers
    handleSearchChange,
    handleTagChange,
    handleDateRangeChange,
    handleApplyFilters,
    handleSidebarToggle,
    openArticleDetail,
    closeArticleDetail,
    handlePageChange,
    clearFilters,
    
    // Actions
    refetch: fetchArticles,
  };
}

export default useArticlesController;