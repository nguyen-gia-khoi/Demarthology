import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import useQuestionDetailController from "../controllers/useQuestionDetailController";
import { Comment, CreateCommentRequest } from "../models/Question";

const CommentCard: React.FC<{
  comment: Comment;
  onLike: (commentId: string) => void;
  onDislike: (commentId: string) => void;
  onReply: (commentId: string) => void;
  onMarkAsAnswer?: (commentId: string) => void;
  isAuthor?: boolean;
  level?: number;
}> = ({ comment, onLike, onDislike, onReply, onMarkAsAnswer, isAuthor = false, level = 0 }) => {
  return (
    <div className={`${level > 0 ? 'ml-8 border-l-2 border-gray-200 pl-4' : ''}`}>
      <div className={`bg-white rounded-xl border border-gray-200 p-6 ${comment.isAnswer ? 'border-green-500 bg-green-50' : ''}`}>
        {comment.isAnswer && (
          <div className="flex items-center gap-2 mb-3">
            <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-green-700 font-semibold text-sm">Câu trả lời được chấp nhận</span>
          </div>
        )}

        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <img
              src={comment.author.avatar || "/avatar.webp"}
              alt={comment.author.name}
              className="w-8 h-8 rounded-full object-cover border-2 border-gray-200"
            />
            <div>
              <p className="font-semibold text-gray-800 text-sm">{comment.author.name}</p>
              <p className="text-gray-500 text-xs">
                {new Date(comment.createdAt).toLocaleDateString("vi-VN", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
          
          {isAuthor && level === 0 && !comment.isAnswer && onMarkAsAnswer && (
            <button
              onClick={() => onMarkAsAnswer(comment._id)}
              className="text-sm text-green-600 hover:text-green-800 font-medium"
            >
              Chọn làm câu trả lời
            </button>
          )}
        </div>

        <div className="mb-4">
          <p className="text-gray-700 whitespace-pre-wrap">{comment.content}</p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => onLike(comment._id)}
                className="flex items-center gap-1 text-sm text-gray-500 hover:text-green-600 transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                </svg>
                {comment.likes}
              </button>
              <button
                onClick={() => onDislike(comment._id)}
                className="flex items-center gap-1 text-sm text-gray-500 hover:text-red-600 transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M18 9.5a1.5 1.5 0 11-3 0v-6a1.5 1.5 0 013 0v6zM14 9.667v-5.43a2 2 0 00-1.106-1.79l-.05-.025A4 4 0 0011.057 2H5.64a2 2 0 00-1.962 1.608l-1.2 6A2 2 0 004.44 12H8v4a2 2 0 002 2 1 1 0 001-1v-.667a4 4 0 01.8-2.4l1.4-1.866a4 4 0 00.8-2.4z" />
                </svg>
                {comment.dislikes}
              </button>
            </div>
            
            {level === 0 && (
              <button
                onClick={() => onReply(comment._id)}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Trả lời
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-4 space-y-4">
          {comment.replies.map((reply) => (
            <CommentCard
              key={reply._id}
              comment={reply}
              onLike={onLike}
              onDislike={onDislike}
              onReply={onReply}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const CreateCommentForm: React.FC<{
  onSubmit: (comment: CreateCommentRequest) => Promise<boolean>;
  onCancel: () => void;
  questionId: string;
  parentId?: string;
  placeholder?: string;
}> = ({ onSubmit, onCancel, questionId, parentId, placeholder = "Viết bình luận của bạn..." }) => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setLoading(true);
    const success = await onSubmit({
      questionId,
      content: content.trim(),
      parentId,
    });
    
    if (success) {
      setContent("");
      onCancel();
    }
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder={placeholder}
            required
          />
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading || !content.trim()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Đang gửi..." : parentId ? "Trả lời" : "Bình luận"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
};

const QuestionDetailView: React.FC = () => {
  const { questionId } = useParams<{ questionId: string }>();
  const navigate = useNavigate();
  
  const {
    question,
    comments,
    loading,
    error,
    commentsLoading,
    commentsError,
    showCommentForm,
    replyToComment,
    isQuestionAuthor,
    handleQuestionLike,
    handleCommentLike,
    handleCommentDislike,
    handleReply,
    handleMarkAsAnswer,
    handleToggleCommentForm,
    handleCancelComment,
    handleCancelReply,
    handleCommentSubmit,
  } = useQuestionDetailController(questionId || "");

  if (!questionId) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Không tìm thấy câu hỏi</h2>
          <button
            onClick={() => navigate('/community')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Quay về cộng đồng
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-6 py-8 pt-24">
        {/* Back button */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/community')}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Quay về cộng đồng
          </button>
        </div>

        {loading && (
          <div className="bg-white rounded-xl border border-gray-200 p-6 animate-pulse">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
              <div>
                <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-24"></div>
              </div>
            </div>
            <div className="h-8 bg-gray-200 rounded w-full mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
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

        {question && (
          <>
            {/* Question */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <img
                    src={question.author.avatar || "/avatar.webp"}
                    alt={question.author.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                  />
                  <div>
                    <p className="font-semibold text-gray-800">{question.author.name}</p>
                    <p className="text-gray-500 text-sm">
                      {new Date(question.createdAt).toLocaleDateString("vi-VN", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  {question.isResolved && (
                    <span className="bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full">
                      Đã giải quyết
                    </span>
                  )}
                  <span className="text-gray-500 text-sm">{question.views} lượt xem</span>
                </div>
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-6">
                {question.title}
              </h1>

              <div className="mb-6">
                <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                  {question.content}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {question.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center gap-4">
                  <span className="text-gray-500">{question.commentCount} bình luận</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleQuestionLike(true)}
                      className="flex items-center gap-1 px-3 py-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                      </svg>
                      {question.likes}
                    </button>
                    <button
                      onClick={() => handleQuestionLike(false)}
                      className="flex items-center gap-1 px-3 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M18 9.5a1.5 1.5 0 11-3 0v-6a1.5 1.5 0 013 0v6zM14 9.667v-5.43a2 2 0 00-1.106-1.79l-.05-.025A4 4 0 0011.057 2H5.64a2 2 0 00-1.962 1.608l-1.2 6A2 2 0 004.44 12H8v4a2 2 0 002 2 1 1 0 001-1v-.667a4 4 0 01.8-2.4l1.4-1.866a4 4 0 00.8-2.4z" />
                      </svg>
                      {question.dislikes}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Comments Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Bình luận ({comments.length})
                </h2>
                <button
                  onClick={handleToggleCommentForm}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {showCommentForm ? "Hủy" : "Thêm bình luận"}
                </button>
              </div>

              {/* Comment Form */}
              {showCommentForm && (
                <div className="mb-6">
                  <CreateCommentForm
                    onSubmit={handleCommentSubmit}
                    onCancel={handleCancelComment}
                    questionId={questionId}
                  />
                </div>
              )}

              {/* Reply Form */}
              {replyToComment && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Trả lời bình luận</h3>
                  <CreateCommentForm
                    onSubmit={handleCommentSubmit}
                    onCancel={handleCancelReply}
                    questionId={questionId}
                    parentId={replyToComment}
                    placeholder="Viết câu trả lời của bạn..."
                  />
                </div>
              )}

              {commentsError && (
                <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 mb-6">
                  {commentsError}
                </div>
              )}

              {/* Comments List */}
              <div className="space-y-6">
                {comments.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-gray-400 text-5xl mb-4">💬</div>
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">
                      Chưa có bình luận nào
                    </h3>
                    <p className="text-gray-500">
                      Hãy trở thành người đầu tiên bình luận về câu hỏi này
                    </p>
                  </div>
                ) : (
                  comments.map((comment) => (
                    <CommentCard
                      key={comment._id}
                      comment={comment}
                      onLike={handleCommentLike}
                      onDislike={handleCommentDislike}
                      onReply={handleReply}
                      onMarkAsAnswer={isQuestionAuthor ? handleMarkAsAnswer : undefined}
                      isAuthor={isQuestionAuthor}
                    />
                  ))
                )}
              </div>

              {commentsLoading && (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="text-gray-500 mt-2">Đang tải bình luận...</p>
                </div>
              )}
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default QuestionDetailView;
