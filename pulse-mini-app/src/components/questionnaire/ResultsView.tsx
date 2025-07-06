import React from "react";
import { Button } from "@/components/ui/Button";
import type { Question, UserVote } from "@/types/questionnaire";

interface VoteStats {
  like: number;
  dislike: number;
}

interface ResultsViewProps {
  voteStats: VoteStats;
  selectedQuestions: Question[];
  getVoteForQuestion: (questionId: string) => UserVote | undefined;
  onRestart: () => void;
}

const ResultsView: React.FC<ResultsViewProps> = ({ 
  selectedQuestions, 
  getVoteForQuestion, 
  onRestart 
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 overflow-auto">
      <div className="flex justify-center items-start w-full px-2 py-8">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6">
          <header className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">🎯 Pulse Results</h1>
            <p className="text-lg text-gray-600">Your Web3 Preferences</p>
          </header>

          {/* Question Review */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Your Responses</h3>
            <div className="space-y-6">
              {selectedQuestions.map((question, index) => {
                const vote = getVoteForQuestion(question.id);
                const voteLabel = vote?.vote === "like" ? "Yes" : "Skip";
                const voteColor =
                  vote?.vote === "like"
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800";

                const communityStats = question.communityStats;

                return (
                  <div key={question.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="mb-4">
                      <div className="text-sm font-medium text-gray-500 mb-2">Question {index + 1}</div>
                      <p className="text-gray-800 text-lg">{question.question}</p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* User's Answer */}
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-700 mb-3">Your Response</h4>
                        <div className="flex items-center justify-between">
                          <span className={`px-4 py-2 rounded-full text-sm font-medium ${voteColor}`}>
                            {voteLabel}
                          </span>
                        </div>
                      </div>

                      {/* Community Stats */}
                      {communityStats && (
                        <div className="bg-blue-50 rounded-lg p-4">
                          <h4 className="font-semibold text-gray-700 mb-3">Community Pulse</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-600">Yes</span>
                              <div className="flex items-center gap-2">
                                <div className="w-24 bg-gray-200 rounded-full h-2">
                                  <div 
                                    className="bg-green-500 h-2 rounded-full" 
                                    style={{ width: `${communityStats.like}%` }}
                                  ></div>
                                </div>
                                <span className="text-sm font-medium text-gray-700 w-8">{communityStats.like}%</span>
                              </div>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-600">No/Skip</span>
                              <div className="flex items-center gap-2">
                                <div className="w-24 bg-gray-200 rounded-full h-2">
                                  <div 
                                    className="bg-red-500 h-2 rounded-full" 
                                    style={{ width: `${communityStats.dislike}%` }}
                                  ></div>
                                </div>
                                <span className="text-sm font-medium text-gray-700 w-8">{communityStats.dislike}%</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-xs text-gray-500 mt-2">
                            Total: {communityStats.totalVotes.toLocaleString()} votes
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Restart Button */}
          <div className="text-center">
            <Button onClick={onRestart} size="lg" className="px-8 py-3 text-lg w-full max-w-md">
              Start a New Pulse Journey
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsView;