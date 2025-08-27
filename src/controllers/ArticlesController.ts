import { useEffect, useState } from "react";
import { Article } from "../models/Article";

export interface Tag {
  _id: string;
  name: string;
}

function useArticlesController() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 5;

  // Tính toán bài báo cho trang hiện tại
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle);
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);

  const fetchTags = async () => {
    try {
      const url = `/api/tags`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! ${response.status}`);
      }

      const data = await response.json();
      setTags(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching tags:", err);
    }
  };

  const fetchArticles = async () => {
    try {
      setLoading(true);
      setError(null);

      const url = `/api/papers`;
      console.log("Fetching from URL (proxy):", url);

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! ${response.status} - ${errorText}`);
      }

      const contentType = response.headers.get("content-type");
      if (!contentType?.includes("application/json")) {
        throw new Error("API returned non-JSON response");
      }

      const data = await response.json();
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
  const fetchArticlesByTag = async (tagIds: string[]) => {
    try {
      setLoading(true);
      setError(null);
  
      if (tagIds.length === 0) {
        setFilteredArticles(articles);
        setCurrentPage(1);
        return;
      }
  
      // Nếu API chỉ nhận 1 tag → gọi nhiều lần và gộp kết quả
      const requests = tagIds.map((tagId) =>
        fetch(`/api/papers-by-tag?tag=${encodeURIComponent(tagId)}`, {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        })
      );
  
      const responses = await Promise.all(requests);
  
      for (const res of responses) {
        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`HTTP error! ${res.status} - ${errorText}`);
        }
      }
  
      const allData = await Promise.all(responses.map((res) => res.json()));
  
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
  

  const handleTagToggle = (tagId: string) => {
    const newSelectedTags = selectedTags.includes(tagId)
      ? selectedTags.filter(id => id !== tagId)
      : [...selectedTags, tagId];
    
    setSelectedTags(newSelectedTags);
    fetchArticlesByTag(newSelectedTags);
  };
  const handleApplyTags = (tags: string[]) => {
    if (tags.length === 0) {
      setSelectedTags([]);
      setFilteredArticles(articles);
      setCurrentPage(1);
    } else {
      setSelectedTags(tags);
      fetchArticlesByTag(tags);  // ✅ gọi API thay vì filter local
    }
  };
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearFilters = () => {
    setSelectedTags([]);
    setFilteredArticles(articles);
    setCurrentPage(1);
  };

  useEffect(() => {
    fetchTags();
    fetchArticles();
  }, []);

  return {
    // Articles data
    articles: currentArticles,
    allArticles: articles,
    filteredArticles,
    totalArticles: filteredArticles.length,
    
    // Tags data
    tags,
    selectedTags,
    handleApplyTags,
    // Pagination
    currentPage,
    totalPages,
    articlesPerPage,
    indexOfFirstArticle,
    indexOfLastArticle,
    
    // Loading and error states
    loading,
    error,
    
    // Actions
    handleTagToggle,
    handlePageChange,
    clearFilters,
    refetch: fetchArticles,
  };
}

export default useArticlesController;
