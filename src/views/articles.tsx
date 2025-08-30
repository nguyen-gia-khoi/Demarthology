
import React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import useArticlesController from "../controllers/useArticlesController";
import { Article } from "../models/Article";

const ArticleCard: React.FC<{ 
  article: Article; 
  onViewDetail: (articleId: string) => void;
  getTagName: (tagId: string) => string;
}> = ({ article, onViewDetail, getTagName }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer" onClick={() => onViewDetail(article._id)}>
      <div className="flex flex-col md:flex-row h-full">
        <div className="md:w-1/3 flex-shrink-0 bg-gray-100 flex items-center justify-center">
          <img
            src={article.mainImage}
            alt={article.title}
            className="w-full h-48 md:h-64 object-cover"
          />
        </div>
        <div className="md:w-2/3 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <img
                src={article.authorImage}
                alt={article.author}
                className="w-10 h-10 rounded-full object-cover border-2 border-gray-200 flex-shrink-0"
              />
              <div className="min-w-0">
                <p className="font-semibold text-gray-800 text-sm truncate">
                  {article.author}
                </p>
                <p className="text-gray-500 text-xs">
                  {new Date(article.date).toLocaleDateString("vi-VN", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>

            <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
              {article.title}
            </h3>

            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {article.content.substring(0, 120)}...
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-1">
              {article.tags.slice(0, 2).map((tagId) => (
                <span
                  key={tagId}
                  className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full"
                >
                  #{getTagName(tagId)}
                </span>
              ))}
              {article.tags.length > 2 && (
                <span className="text-xs text-gray-500">+{article.tags.length - 2}</span>
              )}
            </div>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              Xem chi tiết →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/** Article Detail Modal */
const ArticleDetailModal: React.FC<{
  article: any;
  isOpen: boolean;
  onClose: () => void;
  loading: boolean;
  getTagName: (tagId: string) => string;
}> = ({ article, isOpen, onClose, loading, getTagName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Đang tải chi tiết bài báo...</p>
          </div>
        ) : article ? (
          <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Chi tiết bài báo</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
              >
                ×
              </button>
            </div>

            {/* Article Content */}
            <div className="space-y-6">
              {/* Main Image */}
              <div className="w-full h-64 bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={article.mainImage}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Title */}
              <h1 className="text-3xl font-bold text-gray-900 leading-tight">
                {article.title}
              </h1>

              {/* Author Info */}
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <img
                  src={article.authorImage}
                  alt={article.author}
                  className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {article.author}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {article.authorDescription}
                  </p>
                  <p className="text-gray-500 text-xs mt-1">
                    {new Date(article.date).toLocaleDateString("vi-VN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit"
                    })}
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {article.content}
                </p>
              </div>

              {/* Tags */}
              {article.tags && article.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200">
                  <span className="text-sm font-medium text-gray-700">Tags:</span>
                  {article.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                    >
                      #{getTagName(tag)}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="p-8 text-center">
            <p className="text-gray-600">Không tìm thấy thông tin bài báo</p>
          </div>
        )}
      </div>
    </div>
  );
};

/** Search Bar Component */
const SearchBar: React.FC<{
  searchTerm: string;
  onSearchChange: (term: string) => void;
}> = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="relative mb-6">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg
          className="h-5 w-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Tìm kiếm bài báo..."
        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
};

/** Sidebar Filter Component */
const SidebarFilter: React.FC<{
  tags: Array<{ _id: string; name: string }>;
  selectedTags: string[];
  dateRange: { start: string; end: string };
  onTagChange: (tags: string[]) => void;
  onDateRangeChange: (range: { start: string; end: string }) => void;
  onClearFilters: () => void;
  isOpen: boolean;
  onToggle: () => void;
}> = ({
  tags,
  selectedTags,
  dateRange,
  onTagChange,
  onDateRangeChange,
  onClearFilters,
  isOpen,
  onToggle,
}) => {
  const [tempSelectedTags, setTempSelectedTags] = React.useState<string[]>(selectedTags);
  const [tempDateRange, setTempDateRange] = React.useState(dateRange);

  React.useEffect(() => {
    setTempSelectedTags(selectedTags);
    setTempDateRange(dateRange);
  }, [selectedTags, dateRange]);

  const handleApplyFilters = () => {
    onTagChange(tempSelectedTags);
    onDateRangeChange(tempDateRange);
  };

  const handleClearFilters = () => {
    setTempSelectedTags([]);
    setTempDateRange({ start: "", end: "" });
    onClearFilters();
  };

  const toggleTag = (tagId: string) => {
    if (tempSelectedTags.includes(tagId)) {
      setTempSelectedTags(tempSelectedTags.filter((t) => t !== tagId));
    } else {
      setTempSelectedTags([...tempSelectedTags, tagId]);
    }
  };

  return (
    <>
      {/* Mobile Filter Toggle Button */}
      <button
        onClick={onToggle}
        className="lg:hidden mb-4 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
        </svg>
        {isOpen ? "Ẩn bộ lọc" : "Hiển thị bộ lọc"}
      </button>

      {/* Sidebar Filter */}
      <div className={`lg:block ${isOpen ? 'block' : 'hidden'} lg:w-80 lg:mr-8 lg:flex-shrink-0`}>
        <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-24">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Bộ lọc</h3>
            <button
              onClick={handleClearFilters}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              Xóa tất cả
            </button>
          </div>

          {/* Date Range Filter */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Thời gian tạo</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Từ ngày</label>
                <input
                  type="date"
                  value={tempDateRange.start}
                  onChange={(e) => setTempDateRange({ ...tempDateRange, start: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Đến ngày</label>
                <input
                  type="date"
                  value={tempDateRange.end}
                  onChange={(e) => setTempDateRange({ ...tempDateRange, end: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Tags Filter */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Chủ đề</h4>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {tags.map((tag) => (
                <label
                  key={tag._id}
                  className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded-md"
                >
                  <input
                    type="checkbox"
                    checked={tempSelectedTags.includes(tag._id)}
                    onChange={() => toggleTag(tag._id)}
                    className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700">{tag.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Apply Button */}
          <button
            onClick={handleApplyFilters}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
          >
            Áp dụng bộ lọc
          </button>

          {/* Active Filters Summary */}
          {(tempSelectedTags.length > 0 || tempDateRange.start || tempDateRange.end) && (
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <h5 className="text-xs font-medium text-gray-700 mb-2">Bộ lọc đang áp dụng:</h5>
              <div className="space-y-1">
                {tempSelectedTags.length > 0 && (
                  <div className="text-xs text-gray-600">
                    Chủ đề: {tempSelectedTags.length} đã chọn
                  </div>
                )}
                {tempDateRange.start && (
                  <div className="text-xs text-gray-600">
                    Từ: {new Date(tempDateRange.start).toLocaleDateString('vi-VN')}
                  </div>
                )}
                {tempDateRange.end && (
                  <div className="text-xs text-gray-600">
                    Đến: {new Date(tempDateRange.end).toLocaleDateString('vi-VN')}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const Pagination: React.FC<{
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}> = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center space-x-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Trước
      </button>

      {getPageNumbers().map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === "number" && onPageChange(page)}
          disabled={page === "..."}
          className={`px-3 py-2 text-sm font-medium rounded-md ${
            page === currentPage
              ? "bg-blue-600 text-white"
              : page === "..."
              ? "text-gray-400 cursor-default"
              : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Sau
      </button>
    </div>
  );
};

const ArticlesView: React.FC = () => {
  const {
    // Data
    articles,
    totalArticles,
    tags,
    selectedTags,
    dateRange,
    selectedArticle,
    searchTerm,
    sidebarOpen,
    
    // Pagination
    currentPage,
    totalPages,
    indexOfFirstArticle,
    indexOfLastArticle,
    
    // Loading and error states
    loading,
    error,
    articleDetailLoading,
    
    // Helper functions
    getTagName,
    
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
  } = useArticlesController();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-6 py-8 pt-24">
        <div className="mb-8">
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
              <div className="relative animate-float">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg animate-glow">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-bounce"></div>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold gradient-text">
                Bài Báo
              </h1>
            </div>
            
            <p className="text-lg lg:text-xl text-gray-600 mb-3 font-medium animate-fade-in">
              📰 Cập nhật những bài báo mới nhất về da liễu
            </p>
            
            {!loading && !error && totalArticles > 0 && (
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-full text-sm font-medium text-green-700 shadow-sm animate-fade-in hover:shadow-md transition-all duration-300">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
                <span>
                  Hiển thị <span className="font-bold text-blue-600">{indexOfFirstArticle + 1}</span>-
                  <span className="font-bold text-blue-600">{Math.min(indexOfLastArticle, totalArticles)}</span> 
                  trong tổng số <span className="font-bold text-purple-600">{totalArticles}</span> bài báo
                </span>
                <div className="flex items-center gap-1">
                  <span className="text-xs animate-bounce">📊</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Search Bar */}
        <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />

        <div className="flex flex-col lg:flex-row">
          {/* Sidebar Filter */}
          <SidebarFilter
            tags={tags}
            selectedTags={selectedTags}
            dateRange={dateRange}
            onTagChange={handleTagChange}
            onDateRangeChange={handleDateRangeChange}
            onClearFilters={clearFilters}
            isOpen={sidebarOpen}
            onToggle={handleSidebarToggle}
          />

          {/* Main Content */}
          <div className="flex-1">
            {loading && (
              <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="bg-white rounded-xl border border-gray-200 p-6 animate-pulse"
                  >
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/3 h-48 bg-gray-200 rounded-lg mb-4 md:mb-0"></div>
                      <div className="md:w-2/3 md:pl-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                          <div>
                            <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                            <div className="h-3 bg-gray-200 rounded w-48"></div>
                          </div>
                        </div>
                        <div className="h-6 bg-gray-200 rounded w-full mb-3"></div>
                        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 mb-6">
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {error}
                </div>
              </div>
            )}

            {!loading && !error && (
              <>
                <div className="space-y-6">
                  {articles.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="text-gray-400 text-6xl mb-4">📰</div>
                      <h3 className="text-xl font-semibold text-gray-600 mb-2">
                        {searchTerm || selectedTags.length > 0 || dateRange.start || dateRange.end
                          ? "Không tìm thấy bài báo nào"
                          : "Chưa có bài báo nào"}
                      </h3>
                      <p className="text-gray-500">
                        {searchTerm || selectedTags.length > 0 || dateRange.start || dateRange.end
                          ? "Hãy thử thay đổi từ khóa tìm kiếm hoặc bộ lọc"
                          : "Hãy quay lại sau để xem những bài báo mới nhất"}
                      </p>
                    </div>
                  ) : (
                    articles.map((article) => (
                      <ArticleCard 
                        key={article._id} 
                        article={article} 
                        onViewDetail={openArticleDetail}
                        getTagName={getTagName}
                      />
                    ))
                  )}
                </div>

                {totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </main>

      {/* Article Detail Modal */}
      <ArticleDetailModal
        article={selectedArticle}
        isOpen={!!selectedArticle}
        onClose={closeArticleDetail}
        loading={articleDetailLoading}
        getTagName={getTagName}
      />

      <Footer />
    </div>
  );
};

export default ArticlesView;