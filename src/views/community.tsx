import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import useCommunityController from "../controllers/useCommunityController";
import { Question, CreateQuestionRequest } from "../models/Question";
import SymptomMultiSelect from "../components/SymptomMultiSelect";
import { symptomOptions } from "../data/question";

const QuestionCard: React.FC<{ 
  question: Question; 
  onLike: (questionId: string) => void;
  onDislike: (questionId: string) => void;
  onClick: (question: Question) => void;
}> = ({ question, onLike, onDislike, onClick }) => {
  return (
    <div 
      className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200 cursor-pointer"
      onClick={() => onClick(question)}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <img
            src={question.author.avatar || "/avatar.webp"}
            alt={question.author.name}
            className="w-8 h-8 rounded-full object-cover border border-gray-200"
          />
          <div>
            <p className="font-medium text-gray-800 text-xs">{question.author.name}</p>
            <p className="text-gray-400 text-xs">
              {new Date(question.createdAt).toLocaleDateString("vi-VN", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {question.isResolved && (
            <span className="bg-green-50 text-green-600 text-xs px-2 py-1 rounded-full border border-green-200">
              Đã giải quyết
            </span>
          )}
          <span className="text-gray-400 text-xs">{question.views} lượt xem</span>
        </div>
      </div>

      <h3 className="text-base font-semibold text-gray-900 mb-2 line-clamp-1">
        {question.title}
      </h3>

      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
        {question.content}
      </p>

      <div className="flex items-center justify-between text-xs">
        <div className="flex flex-wrap gap-2">
          {question.tags.map((tag) => (
            <span
              key={tag}
              className="bg-indigo-50 text-indigo-600 px-2 py-1 rounded-full border border-indigo-100"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex items-center gap-3 text-gray-500">
          <span>{question.commentCount} bình luận</span>
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onLike(question._id);
              }}
              className="flex items-center gap-1 hover:text-green-600 transition-colors text-xs"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
              </svg>
              {question.likes}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDislike(question._id);
              }}
              className="flex items-center gap-1 hover:text-red-600 transition-colors text-xs"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M18 9.5a1.5 1.5 0 11-3 0v-6a1.5 1.5 0 013 0v6zM14 9.667v-5.43a2 2 0 00-1.106-1.79l-.05-.025A4 4 0 0011.057 2H5.64a2 2 0 00-1.962 1.608l-1.2 6A2 2 0 004.44 12H8v4a2 2 0 002 2 1 1 0 001-1v-.667a4 4 0 01.8-2.4l1.4-1.866a4 4 0 00.8-2.4z" />
              </svg>
              {question.dislikes}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Sidebar filter component
const SidebarFilter: React.FC<{
  onFilterChange: (filters: any) => void;
  currentFilters: any;
}> = ({ onFilterChange, currentFilters }) => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>(currentFilters.symptoms || []);
  const [resolvedFilter, setResolvedFilter] = useState<string>(currentFilters.resolved || 'all');
  const [dateFilter, setDateFilter] = useState<string>(currentFilters.date || 'all');

  const handleSymptomChange = (symptoms: string[]) => {
    setSelectedSymptoms(symptoms);
    onFilterChange({ ...currentFilters, symptoms });
  };

  const handleResolvedChange = (value: string) => {
    setResolvedFilter(value);
    onFilterChange({ ...currentFilters, resolved: value });
  };

  const handleDateChange = (value: string) => {
    setDateFilter(value);
    onFilterChange({ ...currentFilters, date: value });
  };

  const clearAllFilters = () => {
    setSelectedSymptoms([]);
    setResolvedFilter('all');
    setDateFilter('all');
    onFilterChange({ symptoms: [], resolved: 'all', date: 'all' });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">Bộ lọc</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={clearAllFilters}
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            Xóa tất cả
          </button>
          <button className="lg:hidden text-gray-500 hover:text-gray-700">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Symptom Filter */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Triệu chứng
        </label>
        <SymptomMultiSelect
          options={symptomOptions}
          value={selectedSymptoms}
          onChange={handleSymptomChange}
          placeholder="Chọn triệu chứng..."
        />
      </div>

      {/* Resolved Filter */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Trạng thái
        </label>
        <select
          value={resolvedFilter}
          onChange={(e) => handleResolvedChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
        >
          <option value="all">Tất cả</option>
          <option value="resolved">Đã giải quyết</option>
          <option value="unresolved">Chưa giải quyết</option>
        </select>
      </div>

      {/* Date Filter */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Thời gian
        </label>
        <select
          value={dateFilter}
          onChange={(e) => handleDateChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
        >
          <option value="all">Tất cả</option>
          <option value="today">Hôm nay</option>
          <option value="week">Tuần này</option>
          <option value="month">Tháng này</option>
          <option value="year">Năm nay</option>
        </select>
      </div>
    </div>
  );
};

const CreateQuestionModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (question: CreateQuestionRequest) => Promise<boolean>;
}> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState<CreateQuestionRequest>({
    title: "",
    content: "",
    tags: [],
  });
  const [tagInput, setTagInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [selectedVideos, setSelectedVideos] = useState<File[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) return;

    setLoading(true);
    const success = await onSubmit(formData);
    if (success) {
      setFormData({ title: "", content: "", tags: [] });
      setTagInput("");
      setSelectedImages([]);
      setSelectedVideos([]);
      onClose();
    }
    setLoading(false);
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (files.length) setSelectedImages(prev => [...prev, ...files]);
    e.currentTarget.value = "";
  };

  const handleVideoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (files.length) setSelectedVideos(prev => [...prev, ...files]);
    e.currentTarget.value = "";
  };

  const removeImageAt = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  const removeVideoAt = (index: number) => {
    setSelectedVideos(prev => prev.filter((_, i) => i !== index));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900">Đặt câu hỏi mới</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tiêu đề câu hỏi *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
              placeholder="Nhập tiêu đề câu hỏi..."
              required
            />
          </div>

          {/* Attachments toolbar */}
          <div className="flex items-center gap-3">
            <input id="question-images-input" type="file" accept="image/*" multiple className="hidden" onChange={handleImageSelect} />
            <label htmlFor="question-images-input" className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 cursor-pointer">
              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-6 3 4 2-3 3 5z" clipRule="evenodd" />
              </svg>
              Thêm hình ảnh
            </label>

            <input id="question-videos-input" type="file" accept="video/*" multiple className="hidden" onChange={handleVideoSelect} />
            <label htmlFor="question-videos-input" className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 cursor-pointer">
              <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.2 7.4A1 1 0 008 8v4a1 1 0 001.6.8l3-2a1 1 0 000-1.6l-3-2z" clipRule="evenodd" />
              </svg>
              Thêm video
            </label>
          </div>

          {(selectedImages.length > 0 || selectedVideos.length > 0) && (
            <div className="space-y-3">
              {selectedImages.length > 0 && (
                <div>
                  <div className="text-sm font-medium text-gray-700 mb-2">Hình đã chọn</div>
                  <div className="flex flex-wrap gap-3">
                    {selectedImages.map((file, idx) => (
                      <div key={`${file.name}-${idx}`} className="relative">
                        <img src={URL.createObjectURL(file)} alt={file.name} className="w-20 h-20 object-cover rounded-md border" />
                        <button type="button" onClick={() => removeImageAt(idx)} className="absolute -top-2 -right-2 bg-white border rounded-full p-1 shadow hover:bg-gray-50" title="Xóa">×</button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {selectedVideos.length > 0 && (
                <div>
                  <div className="text-sm font-medium text-gray-700 mb-2">Video đã chọn</div>
                  <div className="flex flex-wrap gap-3">
                    {selectedVideos.map((file, idx) => (
                      <div key={`${file.name}-${idx}`} className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded border">
                        <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.2 7.4A1 1 0 008 8v4a1 1 0 001.6.8l3-2a1 1 0 000-1.6l-3-2z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm text-gray-700 truncate max-w-[180px]">{file.name}</span>
                        <button type="button" onClick={() => removeVideoAt(idx)} className="ml-1 text-gray-500 hover:text-gray-700" title="Xóa">×</button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nội dung câu hỏi *
            </label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              rows={8}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              placeholder="Mô tả chi tiết câu hỏi của bạn..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Thẻ tag
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Thêm tag..."
              />
              <button
                type="button"
                onClick={addTag}
                className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Thêm
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                >
                  #{tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="text-blue-500 hover:text-blue-700 text-lg font-bold"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={loading || !formData.title.trim() || !formData.content.trim()}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
            >
              {loading ? "Đang đăng..." : "Đăng câu hỏi"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const FacebookStylePostCreator: React.FC<{
  onCreatePost: () => void;
}> = ({ onCreatePost }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-6">
      <div className="flex items-center gap-4">
        <img
          src="/avatar.webp"
          alt="User avatar"
          className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
        />
        <div 
          className="flex-1 bg-gray-100 rounded-full px-6 py-3 cursor-pointer hover:bg-gray-200 transition-colors"
          onClick={onCreatePost}
        >
          <p className="text-gray-500 text-lg">bạn đang thắc mắc gì thế?</p>
        </div>
      </div>
      
    </div>
  );
};

const FilterBar: React.FC<{
  onFilter: (filters: any) => void;
  onClear: () => void;
}> = ({ onFilter, onClear }) => {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [showResolved, setShowResolved] = useState<boolean | undefined>(undefined);

  const handleFilter = () => {
    onFilter({
      search: search.trim() || undefined,
      sortBy,
      isResolved: showResolved,
    });
  };

  const handleClear = () => {
    setSearch("");
    setSortBy("newest");
    setShowResolved(undefined);
    onClear();
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleFilter()}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Tìm kiếm câu hỏi..."
          />
        </div>
        
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="newest">Mới nhất</option>
          <option value="oldest">Cũ nhất</option>
          <option value="most_liked">Nhiều like nhất</option>
          <option value="most_views">Nhiều xem nhất</option>
        </select>

        <select
          value={showResolved === undefined ? "all" : showResolved ? "resolved" : "unresolved"}
          onChange={(e) => {
            const value = e.target.value;
            setShowResolved(value === "all" ? undefined : value === "resolved");
          }}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="all">Tất cả</option>
          <option value="unresolved">Chưa giải quyết</option>
          <option value="resolved">Đã giải quyết</option>
        </select>

        <div className="flex gap-2">
          <button
            onClick={handleFilter}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Lọc
          </button>
          <button
            onClick={handleClear}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            Xóa
          </button>
        </div>
      </div>
      
    </div>
  );
};

const Pagination: React.FC<{
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  itemsPerPage: number;
}> = ({ currentPage, totalPages, onPageChange, totalItems, itemsPerPage }) => {
  if (totalPages <= 1) return null;

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  // Generate page numbers to show
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show pages around current page
      let start = Math.max(1, currentPage - 2);
      let end = Math.min(totalPages, start + maxVisiblePages - 1);
      
      // Adjust start if we're near the end
      if (end === totalPages) {
        start = Math.max(1, end - maxVisiblePages + 1);
      }
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }
    
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="mt-8">
      {/* Info text */}
      <div className="text-center text-sm text-gray-600 mb-4">
        Hiển thị {startItem}-{endItem} trong tổng số {totalItems} câu hỏi
      </div>
      
      {/* Pagination controls */}
      <div className="flex items-center justify-center space-x-1">
        {/* First page */}
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          title="Trang đầu"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 9H17a1 1 0 110 2h-5.586l4.293 4.293a1 1 0 010 1.414zM5 3a1 1 0 011-1h1a1 1 0 011 1v14a1 1 0 01-1 1H6a1 1 0 01-1-1V3z" clipRule="evenodd" />
          </svg>
        </button>

        {/* Previous page */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          title="Trang trước"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </button>

        {/* Page numbers */}
        {pageNumbers.map((page, index) => {
          // Add ellipsis if there's a gap
          const showEllipsisBefore = index === 0 && page > 1;
          const showEllipsisAfter = index === pageNumbers.length - 1 && page < totalPages;
          
          return (
            <React.Fragment key={page}>
              {showEllipsisBefore && (
                <span className="px-3 py-2 text-sm text-gray-500">...</span>
              )}
              <button
                onClick={() => onPageChange(page)}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  page === currentPage
                    ? "bg-blue-600 text-white border border-blue-600"
                    : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 hover:border-gray-400"
                }`}
              >
                {page}
              </button>
              {showEllipsisAfter && (
                <span className="px-3 py-2 text-sm text-gray-500">...</span>
              )}
            </React.Fragment>
          );
        })}

        {/* Next page */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          title="Trang sau"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </button>

        {/* Last page */}
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          title="Trang cuối"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 15.707a1 1 0 001.414 0l5-5a1 1 0 000-1.414l-5-5a1 1 0 00-1.414 1.414L8.586 10l-4.293 4.293a1 1 0 000 1.414zM14 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {/* Page info */}
      <div className="text-center text-xs text-gray-500 mt-2">
        Trang {currentPage} / {totalPages}
      </div>
    </div>
  );
};

const CommunityView: React.FC = () => {
  const navigate = useNavigate();
  const {
    questions,
    totalQuestions,
    currentPage,
    totalPages,
    indexOfFirstQuestion,
    indexOfLastQuestion,
    loading,
    error,
    questionsPerPage,
    showCreateModal,
    communityFilters,
    handleCreatePostClick,
    handleCloseModal,
    handleQuestionSubmit,
    handleLike,
    handleDislike,
    handleFiltersChange,
    handlePageChange,
  } = useCommunityController();

  const handleQuestionClick = (question: Question) => {
    navigate(`/community/question/${question._id}`);
  };

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-6 py-8 pt-24">
        <div className="mb-8">
          <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-blue-200/40 rounded-full blur-2xl" />
            <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-indigo-200/40 rounded-full blur-2xl" />
            <div className="relative p-6 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M18 10c0 3.866-3.582 7-8 7a8.86 8.86 0 01-2.707-.414L2 18l1.5-4A7.82 7.82 0 012 10c0-3.866 3.582-7 8-7s8 3.134 8 7z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">Cộng đồng thảo luận</h1>
                  <p className="mt-2 text-gray-600 max-w-2xl">Nơi mọi người đặt câu hỏi, chia sẻ kinh nghiệm chăm sóc sức khỏe và cùng nhau tìm lời giải.</p>
                  
                </div>
              </div>
              
            </div>
          </div>
        </div>

                {/* Main Content with Sidebar and Notes */}
        <div className="flex flex-col lg:flex-row gap-6 mt-8">
          {/* Left Sidebar */}
          <div className="w-full lg:w-80 flex-shrink-0 space-y-6">
            <SidebarFilter 
              onFilterChange={handleFiltersChange}
              currentFilters={communityFilters}
            />
            
            {/* Notes Container - Mobile */}
            <div className="lg:hidden">
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-center gap-2 mb-4">
                  <svg className="w-5 h-5 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <h3 className="font-semibold text-gray-900">Lưu ý</h3>
                </div>
                
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p>Mô tả chi tiết triệu chứng và thời gian xuất hiện</p>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p>Chia sẻ các phương pháp đã thử và kết quả</p>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p>Đính kèm hình ảnh nếu có thể để dễ chẩn đoán</p>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p>Ghi rõ tiền sử bệnh và thuốc đang sử dụng</p>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p>Chọn đúng triệu chứng để nhận tư vấn chính xác</p>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-amber-700 font-medium">Lưu ý: Thông tin chỉ mang tính tham khảo, không thay thế tư vấn y tế chuyên nghiệp</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Facebook Style Post Creator */}
            <FacebookStylePostCreator onCreatePost={handleCreatePostClick} />

            {/* Create Question Modal */}
            <CreateQuestionModal
              isOpen={showCreateModal}
              onClose={handleCloseModal}
              onSubmit={handleQuestionSubmit}
            />

            {loading && (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="bg-white rounded-lg border border-gray-200 p-4 animate-pulse"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                      <div>
                        <div className="h-3 bg-gray-200 rounded w-24 mb-1"></div>
                        <div className="h-2 bg-gray-200 rounded w-16"></div>
                      </div>
                    </div>
                    <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-full mb-1"></div>
                    <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                  </div>
                ))}
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 mb-6">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
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
                <div className="space-y-4">
                  {questions.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="text-gray-400 text-6xl mb-4">❓</div>
                      <h3 className="text-xl font-semibold text-gray-600 mb-2">
                        Chưa có câu hỏi nào
                      </h3>
                      <p className="text-gray-500">
                        Hãy trở thành người đầu tiên đặt câu hỏi trong cộng đồng
                      </p>
                    </div>
                  ) : (
                    questions.map((question) => (
                      <QuestionCard
                        key={question._id}
                        question={question}
                        onLike={handleLike}
                        onDislike={handleDislike}
                        onClick={handleQuestionClick}
                      />
                    ))
                  )}
                </div>

                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  totalItems={totalQuestions}
                  itemsPerPage={questionsPerPage}
                />
              </>
            )}
          </div>

          {/* Notes Container - Desktop */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center gap-2 mb-4">
                <svg className="w-5 h-5 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <h3 className="font-semibold text-gray-900">Lưu ý</h3>
              </div>
              
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Mô tả chi tiết triệu chứng và thời gian xuất hiện</p>
                </div>
                
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Chia sẻ các phương pháp đã thử và kết quả</p>
                </div>
                
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Đính kèm hình ảnh nếu có thể để dễ chẩn đoán</p>
                </div>
                
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Ghi rõ tiền sử bệnh và thuốc đang sử dụng</p>
                </div>
                
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Chọn đúng triệu chứng để nhận tư vấn chính xác</p>
                </div>
                
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-amber-700 font-medium">Lưu ý: Thông tin chỉ mang tính tham khảo, không thay thế tư vấn y tế chuyên nghiệp</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CommunityView;
