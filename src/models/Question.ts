export interface Question {
  _id: string;
  title: string;
  content: string;
  author: {
    _id: string;
    name: string;
    avatar?: string;
  };
  tags: string[];
  createdAt: string;
  updatedAt: string;
  commentCount: number;
  isResolved: boolean;
  likes: number;
  dislikes: number;
  views: number;
}

export interface Comment {
  _id: string;
  questionId: string;
  content: string;
  author: {
    _id: string;
    name: string;
    avatar?: string;
  };
  createdAt: string;
  updatedAt: string;
  likes: number;
  dislikes: number;
  isAnswer: boolean; // Đánh dấu câu trả lời chính thức
  parentId?: string; // Cho phép reply comment
  replies?: Comment[];
}

export interface CreateQuestionRequest {
  title: string;
  content: string;
  tags: string[];
}

export interface CreateCommentRequest {
  questionId: string;
  content: string;
  parentId?: string;
}
