import { useState, useEffect } from "react";
import { Question, Comment, CreateQuestionRequest, CreateCommentRequest } from "../models/Question";
import { mockQuestions, getQuestionsWithPagination, getTotalQuestionsCount } from "../data/question";

export interface QuestionFilters {
  search?: string;
  tags?: string[];
  isResolved?: boolean;
  sortBy?: 'newest' | 'oldest' | 'most_liked' | 'most_views';
  symptoms?: string[];
  resolved?: 'all' | 'resolved' | 'unresolved';
  date?: 'all' | 'today' | 'week' | 'month' | 'year';
}

function useCommunityController() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [filteredQuestions, setFilteredQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<QuestionFilters>({});
  const [questionsPerPage, setQuestionsPerPage] = useState(10);
  
  // UI state management
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [communityFilters, setCommunityFilters] = useState({
    symptoms: [],
    resolved: 'all',
    date: 'all'
  });

  // Tính toán câu hỏi cho trang hiện tại
  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = filteredQuestions.slice(indexOfFirstQuestion, indexOfLastQuestion);
  const totalPages = Math.ceil(filteredQuestions.length / questionsPerPage);

  // Fetch all questions
  const fetchQuestions = async () => {
    try {
      setLoading(true);
      setError(null);

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Use dummy data instead of API
      const data = mockQuestions;
      setQuestions(data);
      setFilteredQuestions(data);

      // TODO: Replace with actual API call when backend is ready
      // const response = await fetch('/api/community/questions', {
      //   method: 'GET',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Accept': 'application/json',
      //   },
      // });

      // if (!response.ok) {
      //   throw new Error(`HTTP error! ${response.status}`);
      // }

      // const data = await response.json();
      // setQuestions(Array.isArray(data) ? data : []);
      // setFilteredQuestions(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(
        `Không thể tải danh sách câu hỏi: ${
          err instanceof Error ? err.message : "Unknown error"
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  // Create new question
  const createQuestion = async (questionData: CreateQuestionRequest): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Create new question with dummy data
      const newQuestion: Question = {
        _id: `q${Date.now()}`,
        title: questionData.title,
        content: questionData.content,
        author: {
          _id: "current_user",
          name: "Người dùng hiện tại",
          avatar: "/avatar.webp"
        },
        tags: questionData.tags,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        commentCount: 0,
        isResolved: false,
        likes: 0,
        dislikes: 0,
        views: 1
      };

      setQuestions(prev => [newQuestion, ...prev]);
      setFilteredQuestions(prev => [newQuestion, ...prev]);

      // TODO: Replace with actual API call when backend is ready
      // const response = await fetch('/api/community/questions', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Accept': 'application/json',
      //   },
      //   body: JSON.stringify(questionData),
      // });

      // if (!response.ok) {
      //   throw new Error(`HTTP error! ${response.status}`);
      // }

      // const newQuestion = await response.json();
      // setQuestions(prev => [newQuestion, ...prev]);
      // setFilteredQuestions(prev => [newQuestion, ...prev]);
      return true;
    } catch (err) {
      setError(
        `Không thể tạo câu hỏi: ${
          err instanceof Error ? err.message : "Unknown error"
        }`
      );
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Apply filters
  const applyFilters = (newFilters: QuestionFilters) => {
    setFilters(newFilters);
    let filtered = [...questions];

    // Search filter
    if (newFilters.search) {
      const searchLower = newFilters.search.toLowerCase();
      filtered = filtered.filter(q => 
        q.title.toLowerCase().includes(searchLower) ||
        q.content.toLowerCase().includes(searchLower)
      );
    }

    // Tags filter
    if (newFilters.tags && newFilters.tags.length > 0) {
      filtered = filtered.filter(q =>
        q.tags.some(tag => newFilters.tags!.includes(tag))
      );
    }

    // Legacy resolved filter
    if (newFilters.isResolved !== undefined) {
      filtered = filtered.filter(q => q.isResolved === newFilters.isResolved);
    }

    // Symptoms filter
    if (newFilters.symptoms && newFilters.symptoms.length > 0) {
      filtered = filtered.filter(q => 
        q.tags.some(tag => newFilters.symptoms!.includes(tag))
      );
    }

    // Resolved filter
    if (newFilters.resolved && newFilters.resolved !== 'all') {
      filtered = filtered.filter(q => {
        if (newFilters.resolved === 'resolved') return q.isResolved;
        if (newFilters.resolved === 'unresolved') return !q.isResolved;
        return true;
      });
    }

    // Date filter
    if (newFilters.date && newFilters.date !== 'all') {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
      const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
      const yearAgo = new Date(today.getTime() - 365 * 24 * 60 * 60 * 1000);

      filtered = filtered.filter(q => {
        const questionDate = new Date(q.createdAt);
        switch (newFilters.date) {
          case 'today':
            return questionDate >= today;
          case 'week':
            return questionDate >= weekAgo;
          case 'month':
            return questionDate >= monthAgo;
          case 'year':
            return questionDate >= yearAgo;
          default:
            return true;
        }
      });
    }

    // Sort
    switch (newFilters.sortBy) {
      case 'oldest':
        filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      case 'most_liked':
        filtered.sort((a, b) => b.likes - a.likes);
        break;
      case 'most_views':
        filtered.sort((a, b) => b.views - a.views);
        break;
      case 'newest':
      default:
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
    }

    setFilteredQuestions(filtered);
    setCurrentPage(1);
  };

  // Clear filters
  const clearFilters = () => {
    setFilters({});
    setFilteredQuestions(questions);
    setCurrentPage(1);
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Like/dislike question
  const toggleQuestionLike = async (questionId: string, isLike: boolean): Promise<boolean> => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));

      // Update like/dislike locally
      setQuestions(prev => prev.map(q => {
        if (q._id === questionId) {
          return {
            ...q,
            likes: isLike ? q.likes + 1 : q.likes,
            dislikes: !isLike ? q.dislikes + 1 : q.dislikes
          };
        }
        return q;
      }));
      
      setFilteredQuestions(prev => prev.map(q => {
        if (q._id === questionId) {
          return {
            ...q,
            likes: isLike ? q.likes + 1 : q.likes,
            dislikes: !isLike ? q.dislikes + 1 : q.dislikes
          };
        }
        return q;
      }));

      // TODO: Replace with actual API call when backend is ready
      // const response = await fetch(`/api/community/questions/${questionId}/${isLike ? 'like' : 'dislike'}`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      // });

      // if (!response.ok) {
      //   throw new Error(`HTTP error! ${response.status}`);
      // }

      // const updatedQuestion = await response.json();
      
      // // Update questions in state
      // setQuestions(prev => prev.map(q => 
      //   q._id === questionId ? updatedQuestion : q
      // ));
      // setFilteredQuestions(prev => prev.map(q => 
      //   q._id === questionId ? updatedQuestion : q
      // ));

      return true;
    } catch (err) {
      console.error('Error toggling like:', err);
      return false;
    }
  };

  // Load initial data
  useEffect(() => {
    fetchQuestions();
  }, []);

  // UI event handlers
  const handleCreatePostClick = () => {
    setShowCreateModal(true);
  };

  const handleCloseModal = () => {
    setShowCreateModal(false);
  };

  const handleQuestionSubmit = async (questionData: CreateQuestionRequest): Promise<boolean> => {
    const success = await createQuestion(questionData);
    if (success) {
      setShowCreateModal(false);
    }
    return success;
  };

  const handleLike = (questionId: string) => {
    toggleQuestionLike(questionId, true);
  };

  const handleDislike = (questionId: string) => {
    toggleQuestionLike(questionId, false);
  };

  const handleFiltersChange = (newFilters: any) => {
    setCommunityFilters(newFilters);
    applyFilters(newFilters);
  };

  return {
    // Questions data
    questions: currentQuestions,
    allQuestions: questions,
    filteredQuestions,
    totalQuestions: filteredQuestions.length,
    
    // Pagination
    currentPage,
    totalPages,
    questionsPerPage,
    indexOfFirstQuestion,
    indexOfLastQuestion,
    
    // Loading and error states
    loading,
    error,
    
    // Filters
    filters,
    communityFilters,
    
    // UI State
    showCreateModal,
    
    // Actions
    fetchQuestions,
    createQuestion,
    applyFilters,
    clearFilters,
    handlePageChange,
    toggleQuestionLike,
    setQuestionsPerPage,
    
    // UI Handlers
    handleCreatePostClick,
    handleCloseModal,
    handleQuestionSubmit,
    handleLike,
    handleDislike,
    handleFiltersChange,
    
    // Utility
    refetch: fetchQuestions,
  };
}

export default useCommunityController;
