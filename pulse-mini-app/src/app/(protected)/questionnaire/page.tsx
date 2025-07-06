'use client';

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from 'next/navigation';
import type { QuestionnaireData, Question, UserVote } from "@/types/questionnaire";
import QuestionCard from "@/components/questionnaire/QuestionCard";
import ProgressBar from "@/components/questionnaire/ProgressBar";
import ErrorState from "@/components/questionnaire/ErrorState";
import ResultsView from "@/components/questionnaire/ResultsView";
import LoadingSpinner from "@/components/questionnaire/LoadingSpinner";
import { Page } from '@/components/PageLayout';
import { Button, TopBar } from '@worldcoin/mini-apps-ui-kit-react';

export default function QuestionnairePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const themeFilter = searchParams.get('theme');
  
  const [data, setData] = useState<QuestionnaireData | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userVotes, setUserVotes] = useState<UserVote[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showResults, setShowResults] = useState(false);
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);

  useEffect(() => {
    fetch('/questions.json')
      .then(response => response.json())
      .then((data: QuestionnaireData) => {
        setData(data);
        setIsLoading(false);
        selectRandomQuestions(data.questions);
      })
      .catch(error => {
        console.error('Error loading questions:', error);
        setIsLoading(false);
      });
  }, []);

  const selectRandomQuestions = (questions: Question[]) => {
    let filteredQuestions = questions;
    
    if (themeFilter) {
      filteredQuestions = questions.filter(q => 
        q.category.toLowerCase().includes(themeFilter.toLowerCase()) ||
        q.question.toLowerCase().includes(themeFilter.toLowerCase())
      );
    }
    
    const shuffled = [...filteredQuestions].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 5);
    setSelectedQuestions(selected);
  };

  const handleVote = (vote: 'like' | 'dislike') => {
    if (!data) return;

    const currentQuestion = getCurrentQuestion();
    if (!currentQuestion) return;

    const newVote: UserVote = {
      questionId: currentQuestion.id,
      vote,
      timestamp: new Date()
    };

    setUserVotes(prev => [...prev, newVote]);
    nextQuestion();
  };

  const handleSwipe = (direction: 'left' | 'right') => {
    const vote = direction === 'right' ? 'like' : 'dislike';
    handleVote(vote);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < selectedQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const getCurrentQuestion = (): Question | null => {
    return selectedQuestions[currentQuestionIndex] || null;
  };

  const resetGame = () => {
    setCurrentQuestionIndex(0);
    setUserVotes([]);
    setShowResults(false);
    if (data) {
      selectRandomQuestions(data.questions);
    }
  };

  const getVoteForQuestion = (questionId: string) => {
    return userVotes.find(vote => vote.questionId === questionId);
  };

  const getVoteStats = () => {
    const totalVotes = userVotes.length;
    const likeCount = userVotes.filter(v => v.vote === 'like').length;
    const dislikeCount = userVotes.filter(v => v.vote === 'dislike').length;

    return {
      like: totalVotes > 0 ? Math.round((likeCount / totalVotes) * 100) : 0,
      dislike: totalVotes > 0 ? Math.round((dislikeCount / totalVotes) * 100) : 0
    };
  };

  const loadQuestions = () => {
    setIsLoading(true);
    fetch('/questions.json')
      .then(response => response.json())
      .then((data: QuestionnaireData) => {
        setData(data);
        setIsLoading(false);
        selectRandomQuestions(data.questions);
      })
      .catch(error => {
        console.error('Error loading questions:', error);
        setIsLoading(false);
      });
  };

  const handleGoBack = () => {
    router.push('/YourPulse');
  };

  const handleGoToCommunity = () => {
    router.push('/pulseCommunity');
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!data) {
    return <ErrorState onRetry={loadQuestions} />;
  }

  if (showResults) {
    return (
      <ResultsView
        voteStats={getVoteStats()}
        selectedQuestions={selectedQuestions}
        getVoteForQuestion={getVoteForQuestion}
        onRestart={resetGame}
      />
    );
  }

  const currentQuestion = getCurrentQuestion();
  if (!currentQuestion) {
    return <ErrorState onRetry={resetGame} />;
  }

  return (
    <>
      
      
      <Page.Main className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Pulse</h1>
            <p className="text-lg text-gray-600">
              {themeFilter ? `${themeFilter} Pulse Survey` : 'Get a Pulse for the ecosystem'}
            </p>
          </header>


          <div className="flex gap-4 justify-center mb-6">
            <Button
              onClick={handleGoBack}
              variant="secondary"
              size="sm"
            >
              ← Back to Your Pulse
            </Button>
            <Button
              onClick={handleGoToCommunity}
              variant="secondary"
              size="sm"
            >
              Community Pulse
            </Button>
          </div>

          <main className="max-w-2xl mx-auto">
            <div className="mb-6">
              <ProgressBar current={currentQuestionIndex + 1} total={5} />
            </div>

            <QuestionCard 
              question={currentQuestion} 
              onVote={handleVote}
              onSwipe={handleSwipe}
            />
          </main>

          <footer className="text-center mt-8">
            <p className="text-sm text-gray-500">Swipe the card to give your pulse</p>
          </footer>
        </div>
      </Page.Main>
    </>
  );
}