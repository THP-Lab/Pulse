export interface Question {
    id: string;
    category: string;
    question: string;
    
    rdfTriple: {
      subject: string;
      predicate: string;
      object: string;
    };
    communityStats?: {
      like: number;
      dislike: number;
      totalVotes: number;
    };
  }
  
  export interface UserVote {
    questionId: string;
    vote: "like" | "dislike";
    timestamp: Date;
  }
  
  export interface QuestionnaireData {
    questions: Question[];
  }