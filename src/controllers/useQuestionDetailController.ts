import { useState, useEffect } from "react";
import { Question, Comment, CreateCommentRequest } from "../models/Question";
import { getQuestionById, getCommentsByQuestionId } from "../data/question";

function useQuestionDetailController(questionId: string) {
  const [question, setQuestion] = useState<Question | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [commentsError, setCommentsError] = useState<string | null>(null);
  
  // UI state management
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [replyToComment, setReplyToComment] = useState<string | null>(null);

  // Fetch question details
  const fetchQuestion = async () => {
    try {
      setLoading(true);
      setError(null);

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Use dummy data
      const data = getQuestionById(questionId);
      if (data) {
        // Increment view count
        data.views += 1;
        setQuestion(data);
      } else {
        setError("Không tìm thấy câu hỏi");
      }

      // TODO: Replace with actual API call when backend is ready
      // const response = await fetch(`/api/community/questions/${questionId}`, {
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
      // setQuestion(data);
    } catch (err) {
      setError(
        `Không thể tải câu hỏi: ${
          err instanceof Error ? err.message : "Unknown error"
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  // Fetch comments for the question
  const fetchComments = async () => {
    try {
      setCommentsLoading(true);
      setCommentsError(null);

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));

      // Use dummy data
      const data = getCommentsByQuestionId(questionId);
      setComments(data);

      // TODO: Replace with actual API call when backend is ready
      // const response = await fetch(`/api/community/questions/${questionId}/comments`, {
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
      // setComments(Array.isArray(data) ? data : []);
    } catch (err) {
      setCommentsError(
        `Không thể tải bình luận: ${
          err instanceof Error ? err.message : "Unknown error"
        }`
      );
    } finally {
      setCommentsLoading(false);
    }
  };

  // Create new comment
  const createComment = async (commentData: CreateCommentRequest): Promise<boolean> => {
    try {
      setCommentsLoading(true);
      setCommentsError(null);

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Create new comment with dummy data
      const newComment: Comment = {
        _id: `comment${Date.now()}`,
        questionId: commentData.questionId,
        content: commentData.content,
        author: {
          _id: "current_user",
          name: "Người dùng hiện tại",
          avatar: "/avatar.webp"
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        likes: 0,
        dislikes: 0,
        isAnswer: false,
        parentId: commentData.parentId
      };
      
      // Add new comment to the list
      if (commentData.parentId) {
        // This is a reply, add to parent's replies
        setComments(prev => prev.map(comment => {
          if (comment._id === commentData.parentId) {
            return {
              ...comment,
              replies: [...(comment.replies || []), newComment]
            };
          }
          return comment;
        }));
      } else {
        // This is a top-level comment
        setComments(prev => [newComment, ...prev]);
      }

      // Update question comment count
      if (question) {
        setQuestion(prev => prev ? { ...prev, commentCount: prev.commentCount + 1 } : null);
      }

      // TODO: Replace with actual API call when backend is ready
      // const response = await fetch('/api/community/comments', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Accept': 'application/json',
      //   },
      //   body: JSON.stringify(commentData),
      // });

      // if (!response.ok) {
      //   throw new Error(`HTTP error! ${response.status}`);
      // }

      // const newComment = await response.json();
      
      // // Add new comment to the list
      // if (commentData.parentId) {
      //   // This is a reply, add to parent's replies
      //   setComments(prev => prev.map(comment => {
      //     if (comment._id === commentData.parentId) {
      //       return {
      //         ...comment,
      //         replies: [...(comment.replies || []), newComment]
      //       };
      //     }
      //     return comment;
      //   }));
      // } else {
      //   // This is a top-level comment
      //   setComments(prev => [newComment, ...prev]);
      // }

      // // Update question comment count
      // if (question) {
      //   setQuestion(prev => prev ? { ...prev, commentCount: prev.commentCount + 1 } : null);
      // }

      return true;
    } catch (err) {
      setCommentsError(
        `Không thể tạo bình luận: ${
          err instanceof Error ? err.message : "Unknown error"
        }`
      );
      return false;
    } finally {
      setCommentsLoading(false);
    }
  };

  // Like/dislike question
  const toggleQuestionLike = async (isLike: boolean): Promise<boolean> => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));

      // Update like/dislike locally
      if (question) {
        setQuestion(prev => prev ? {
          ...prev,
          likes: isLike ? prev.likes + 1 : prev.likes,
          dislikes: !isLike ? prev.dislikes + 1 : prev.dislikes
        } : null);
      }

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
      // setQuestion(updatedQuestion);
      return true;
    } catch (err) {
      console.error('Error toggling question like:', err);
      return false;
    }
  };

  // Like/dislike comment
  const toggleCommentLike = async (commentId: string, isLike: boolean): Promise<boolean> => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));

      // Update comment like/dislike locally
      setComments(prev => prev.map(comment => {
        if (comment._id === commentId) {
          return {
            ...comment,
            likes: isLike ? comment.likes + 1 : comment.likes,
            dislikes: !isLike ? comment.dislikes + 1 : comment.dislikes
          };
        }
        // Check if it's a reply
        if (comment.replies) {
          return {
            ...comment,
            replies: comment.replies.map(reply => 
              reply._id === commentId ? {
                ...reply,
                likes: isLike ? reply.likes + 1 : reply.likes,
                dislikes: !isLike ? reply.dislikes + 1 : reply.dislikes
              } : reply
            )
          };
        }
        return comment;
      }));

      // TODO: Replace with actual API call when backend is ready
      // const response = await fetch(`/api/community/comments/${commentId}/${isLike ? 'like' : 'dislike'}`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      // });

      // if (!response.ok) {
      //   throw new Error(`HTTP error! ${response.status}`);
      // }

      // const updatedComment = await response.json();
      
      // // Update comment in the list
      // setComments(prev => prev.map(comment => {
      //   if (comment._id === commentId) {
      //     return updatedComment;
      //   }
      //   // Check if it's a reply
      //   if (comment.replies) {
      //     return {
      //       ...comment,
      //       replies: comment.replies.map(reply => 
      //         reply._id === commentId ? updatedComment : reply
      //       )
      //     };
      //   }
      //   return comment;
      // }));

      return true;
    } catch (err) {
      console.error('Error toggling comment like:', err);
      return false;
    }
  };

  // Mark comment as answer
  const markAsAnswer = async (commentId: string): Promise<boolean> => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));

      // Update comment in the list and unmark other answers
      setComments(prev => prev.map(comment => {
        if (comment._id === commentId) {
          return { ...comment, isAnswer: true };
        }
        return { ...comment, isAnswer: false };
      }));

      // Mark question as resolved
      if (question) {
        setQuestion(prev => prev ? { ...prev, isResolved: true } : null);
      }

      // TODO: Replace with actual API call when backend is ready
      // const response = await fetch(`/api/community/comments/${commentId}/mark-answer`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      // });

      // if (!response.ok) {
      //   throw new Error(`HTTP error! ${response.status}`);
      // }

      // const updatedComment = await response.json();
      
      // // Update comment in the list and unmark other answers
      // setComments(prev => prev.map(comment => {
      //   if (comment._id === commentId) {
      //     return { ...updatedComment, isAnswer: true };
      //   }
      //   return { ...comment, isAnswer: false };
      // }));

      // // Mark question as resolved
      // if (question) {
      //   setQuestion(prev => prev ? { ...prev, isResolved: true } : null);
      // }

      return true;
    } catch (err) {
      console.error('Error marking comment as answer:', err);
      return false;
    }
  };

  // Load initial data
  useEffect(() => {
    if (questionId) {
      fetchQuestion();
      fetchComments();
    }
  }, [questionId]);

  // UI event handlers
  const handleQuestionLike = (isLike: boolean) => {
    toggleQuestionLike(isLike);
  };

  const handleCommentLike = (commentId: string) => {
    toggleCommentLike(commentId, true);
  };

  const handleCommentDislike = (commentId: string) => {
    toggleCommentLike(commentId, false);
  };

  const handleReply = (commentId: string) => {
    setReplyToComment(commentId);
    setShowCommentForm(false);
  };

  const handleMarkAsAnswer = (commentId: string) => {
    markAsAnswer(commentId);
  };

  const handleToggleCommentForm = () => {
    setShowCommentForm(!showCommentForm);
  };

  const handleCancelComment = () => {
    setShowCommentForm(false);
  };

  const handleCancelReply = () => {
    setReplyToComment(null);
  };

  const handleCommentSubmit = async (commentData: CreateCommentRequest): Promise<boolean> => {
    const success = await createComment(commentData);
    if (success) {
      if (commentData.parentId) {
        setReplyToComment(null);
      } else {
        setShowCommentForm(false);
      }
    }
    return success;
  };

  // Check if current user is the question author (you'll need to implement authentication)
  const isQuestionAuthor = true; // TODO: Replace with actual auth check

  return {
    // Question data
    question,
    comments,
    
    // Loading and error states
    loading,
    error,
    commentsLoading,
    commentsError,
    
    // UI State
    showCommentForm,
    replyToComment,
    isQuestionAuthor,
    
    // Actions
    fetchQuestion,
    fetchComments,
    createComment,
    toggleQuestionLike,
    toggleCommentLike,
    markAsAnswer,
    
    // UI Handlers
    handleQuestionLike,
    handleCommentLike,
    handleCommentDislike,
    handleReply,
    handleMarkAsAnswer,
    handleToggleCommentForm,
    handleCancelComment,
    handleCancelReply,
    handleCommentSubmit,
    
    // Utility
    refetch: () => {
      fetchQuestion();
      fetchComments();
    },
  };
}

export default useQuestionDetailController;
