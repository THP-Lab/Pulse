import React from "react";
import { Button } from "@/components/ui/button";
import type { Question, UserVote } from "../types/index";

interface VoteStats {
  like: number;
  dislike: number;
  idk: number;
}

interface ResultsViewProps {
  voteStats: VoteStats;
  selectedQuestions: Question[];
  getVoteForQuestion: (questionId: string) => UserVote | undefined;
  onRestart: () => void;
}

const ResultsView: React.FC<ResultsViewProps> = ({ 
  voteStats, 
  selectedQuestions, 
  getVoteForQuestion, 
  onRestart 
}) => {
  return (
    <div className="min-h-screen from-green-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Pulsy</h1>
          <p className="text-lg text-gray-600">Your Results</p>
        </header>

        <div className="max-w-4xl mx-auto">
          {/* Vote Summary */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Overall Results</h2>
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">{voteStats.like}%</div>
                <div className="text-sm font-medium text-gray-600 uppercase tracking-wide">Yes</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-red-600 mb-2">{voteStats.dislike}%</div>
                <div className="text-sm font-medium text-gray-600 uppercase tracking-wide">No</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-600 mb-2">{voteStats.idk}%</div>
                <div className="text-sm font-medium text-gray-600 uppercase tracking-wide">IDK</div>
              </div>
            </div>
          </div>

          {/* Question Review */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Your Answers</h3>
            <div className="space-y-4">
              {selectedQuestions.map((question, index) => {
                const vote = getVoteForQuestion(question.id);
                const voteLabel = vote?.vote === "like" ? "Yes" : vote?.vote === "dislike" ? "No" : "IDK";
                const voteColor =
                  vote?.vote === "like"
                    ? "bg-green-100 text-green-800"
                    : vote?.vote === "dislike"
                      ? "bg-red-100 text-red-800"
                      : "bg-gray-100 text-gray-800";

                return (
                  <div key={question.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-500 mb-1">Question {index + 1}</div>
                        <p className="text-gray-800">{question.question}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${voteColor}`}>
                        {voteLabel}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Restart Button */}
          <div className="text-center">
            <Button onClick={onRestart} size="lg" className="px-8 py-3 text-lg">
              Start New Quiz
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsView;
