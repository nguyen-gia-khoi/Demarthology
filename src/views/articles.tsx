
import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import useArticlesController from "../controllers/ArticlesController";
import { Article } from "../models/Article";

const ArticleCard: React.FC<{ article: Article }> = ({ article }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="flex flex-col md:flex-row h-full">
        <div className="md:w-1/3 flex-shrink-0 bg-gray-100 flex items-center justify-center">
          <img
            src={article.mainImage}
            alt={article.title}
            className="w-full h-64 md:h-80 object-contain p-2"
          />
        </div>
        <div className="md:w-2/3 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src={article.authorImage}
                alt={article.author}
                className="w-12 h-12 rounded-full object-cover border-2 border-gray-200 flex-shrink-0"
              />
              <div className="min-w-0">
                <p className="font-semibold text-gray-800 text-sm truncate">
                  {article.author}
                </p>
                <p className="text-gray-500 text-xs truncate">
                  {article.authorDescription}
                </p>
              </div>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
              {article.title}
            </h3>

            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
              {article.content}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full"
                >
                  #{tag.slice(0, 8)}
                </span>
              ))}
            </div>
            <span className="text-xs text-gray-500 flex-shrink-0">
              {new Date(article.date).toLocaleDateString("vi-VN", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

/** Dropdown Tag Filter */
const TagFilter: React.FC<{
  tags: Array<{ _id: string; name: string }>;
  selectedTags: string[];
  onApplyFilters: (tags: string[]) => void;
  onClearFilters: () => void;
}> = ({ tags, selectedTags, onApplyFilters, onClearFilters }) => {
  const [open, setOpen] = useState(false);
  const [tempSelected, setTempSelected] = useState<string[]>(selectedTags);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!open) return;
      const target = event.target as Node;
      if (containerRef.current && !containerRef.current.contains(target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const toggleTag = (tagId: string) => {
    if (tempSelected.includes(tagId)) {
      setTempSelected(tempSelected.filter((t) => t !== tagId));
    } else {
      setTempSelected([...tempSelected, tagId]);
    }
  };

  const apply = () => {
    onApplyFilters(tempSelected);
    setOpen(false);
  };

  const clear = () => {
    setTempSelected([]);
    onClearFilters();
  };

  return (
    <div ref={containerRef} className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Lọc theo chủ đề</h3>
        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={apply}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Áp dụng bộ lọc
          </button>
          <button
            onClick={clear}
            disabled={selectedTags.length === 0}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Xóa bộ lọc
          </button>
        </div>
      </div>

      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="w-full px-4 py-2 text-sm border rounded-lg bg-white hover:bg-gray-50 flex justify-between items-center"
        >
          {tempSelected.length > 0
            ? `Đã chọn ${tempSelected.length} chủ đề`
            : "Chọn chủ đề..."}
          <span className="ml-2">{open ? "▲" : "▼"}</span>
        </button>

        {open && (
          <div className="absolute mt-2 w-full bg-white border rounded-lg shadow-lg max-h-64 overflow-y-auto z-10">
            {tags.map((tag) => (
              <label
                key={tag._id}
                className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-50"
              >
                <input
                  type="checkbox"
                  checked={tempSelected.includes(tag._id)}
                  onChange={() => toggleTag(tag._id)}
                  className="mr-2"
                />
                {tag.name}
              </label>
            ))}
          </div>
        )}
      </div>

      {open && (
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={() => setOpen(false)}
            className="px-4 py-2 text-sm rounded-lg border bg-gray-100 hover:bg-gray-200"
          >
            Hủy
          </button>
          <button
            onClick={apply}
            className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            Áp dụng
          </button>
        </div>
      )}
    </div>
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
    articles,
    tags,
    selectedTags,
    currentPage,
    totalPages,
    indexOfFirstArticle,
    indexOfLastArticle,
    totalArticles,
    loading,
    error,
    // handleTagToggle, // cần sửa controller để có handleApplyTags
    handlePageChange,
    clearFilters,
    handleApplyTags,
  } = useArticlesController();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-6 py-8 pt-24">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Bài Báo</h1>
          <p className="text-gray-600">
            Cập nhật những bài báo mới nhất về da liễu
          </p>
          {!loading && !error && totalArticles > 0 && (
            <p className="text-sm text-gray-500 mt-2">
              Hiển thị {indexOfFirstArticle + 1}-
              {Math.min(indexOfLastArticle, totalArticles)} trong tổng số{" "}
              {totalArticles} bài báo
            </p>
          )}
        </div>

        {/* Tag Filter */}
        {!loading && !error && tags.length > 0 && (
          <TagFilter
            tags={tags}
            selectedTags={selectedTags}
            onApplyFilters={handleApplyTags}
            onClearFilters={clearFilters}
          />
        )}

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
                      <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
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
                    {selectedTags.length > 0
                      ? "Không tìm thấy bài báo nào"
                      : "Chưa có bài báo nào"}
                  </h3>
                  <p className="text-gray-500">
                    {selectedTags.length > 0
                      ? "Hãy thử chọn chủ đề khác hoặc xóa bộ lọc"
                      : "Hãy quay lại sau để xem những bài báo mới nhất"}
                  </p>
                </div>
              ) : (
                articles.map((article) => (
                  <ArticleCard key={article._id} article={article} />
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
      </main>
      <Footer />
    </div>
  );
};

export default ArticlesView;
