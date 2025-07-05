export interface Question {
  id:string;
  question: string;
  category: string;
  communityStats?: CommunityVoteStats;
}

export interface UserVote {
  questionId: string;
  vote: 'like' | 'dislike';
  timestamp: Date;
}

export interface CommunityVoteStats {
  like: number;
  dislike: number;
  totalVotes: number;
}

export interface AppData {
  questions: Question[];
} 