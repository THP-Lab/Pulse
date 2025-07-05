export interface Question {
  id:string;
  question: string;
  category: string;
<<<<<<< HEAD
  communityStats?: CommunityVoteStats;
=======
>>>>>>> 6f8a7b4 (feat: Initial commit - Pulsy application with interactive question cards and swipe functionality)
}

export interface UserVote {
  questionId: string;
  vote: 'like' | 'dislike';
  timestamp: Date;
}

<<<<<<< HEAD
export interface CommunityVoteStats {
  like: number;
  dislike: number;
  totalVotes: number;
}

=======
>>>>>>> 6f8a7b4 (feat: Initial commit - Pulsy application with interactive question cards and swipe functionality)
export interface AppData {
  questions: Question[];
} 