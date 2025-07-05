export interface Question {
  id:string;
  question: string;
  category: string;
}

export interface UserVote {
  questionId: string;
  vote: 'like' | 'dislike';
  timestamp: Date;
}

export interface AppData {
  questions: Question[];
} 