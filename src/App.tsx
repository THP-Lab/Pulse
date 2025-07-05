import { useState, useEffect } from "react";
import type { AppData, Question, UserVote } from "./types/index";
import QuestionCard from "./components/QuestionCard";
import ProgressBar from "./components/ProgressBar";
<<<<<<< HEAD
import ErrorState from "./components/ErrorState";
import ResultsView from "./components/ResultsView";
import "./App.css";
import LoadingSpinner from "./components/LoadingSpinner";
=======
import { Button } from "@/components/ui/button"
import "./App.css";
>>>>>>> 6f8a7b4 (feat: Initial commit - Pulsy application with interactive question cards and swipe functionality)

function App() {
  const [data, setData] = useState<AppData | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
<<<<<<< HEAD
  const [userVotes, setUserVotes] = useState<UserVote[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showResults, setShowResults] = useState(false);
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);
=======
  const [_, setUserVotes] = useState<UserVote[]>([]);
  const [isLoading, setIsLoading] = useState(true);
>>>>>>> 6f8a7b4 (feat: Initial commit - Pulsy application with interactive question cards and swipe functionality)

  useEffect(() => {
    fetch('/questions.json')
      .then(response => response.json())
      .then((data: AppData) => {
        setData(data);
        setIsLoading(false);
<<<<<<< HEAD
        // Sélectionner 5 questions aléatoires au chargement
        selectRandomQuestions(data.questions);
=======
>>>>>>> 6f8a7b4 (feat: Initial commit - Pulsy application with interactive question cards and swipe functionality)
      })
      .catch(error => {
        console.error('Error loading questions:', error);
        setIsLoading(false);
      });
  }, []);

<<<<<<< HEAD
  const selectRandomQuestions = (questions: Question[]) => {
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 5);
    setSelectedQuestions(selected);
  };

=======
>>>>>>> 6f8a7b4 (feat: Initial commit - Pulsy application with interactive question cards and swipe functionality)
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
<<<<<<< HEAD
    if (currentQuestionIndex < selectedQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Fin des 5 questions - afficher les résultats
      setShowResults(true);
=======
    if (!data) return;
    
    if (currentQuestionIndex < data.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // End of questions
      alert('You have completed all the questions!');
      setCurrentQuestionIndex(0);
>>>>>>> 6f8a7b4 (feat: Initial commit - Pulsy application with interactive question cards and swipe functionality)
    }
  };

  const getCurrentQuestion = (): Question | null => {
<<<<<<< HEAD
    return selectedQuestions[currentQuestionIndex] || null;
=======
    if (!data) return null;
    return data.questions[currentQuestionIndex] || null;
>>>>>>> 6f8a7b4 (feat: Initial commit - Pulsy application with interactive question cards and swipe functionality)
  };

  const resetGame = () => {
    setCurrentQuestionIndex(0);
    setUserVotes([]);
<<<<<<< HEAD
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
      .then((data: AppData) => {
        setData(data);
        setIsLoading(false);
        selectRandomQuestions(data.questions);
      })
      .catch(error => {
        console.error('Error loading questions:', error);
        setIsLoading(false);
      });
  };

  if (isLoading) {
    return <LoadingSpinner/>;
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
=======
  };

  if (isLoading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        <p>Loading questions...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="error">
        <h2>Error</h2>
        <p>Unable to load questions. Please try again.</p>
        <button onClick={() => window.location.reload()}>Reload</button>
      </div>
>>>>>>> 6f8a7b4 (feat: Initial commit - Pulsy application with interactive question cards and swipe functionality)
    );
  }

  const currentQuestion = getCurrentQuestion();
  if (!currentQuestion) {
<<<<<<< HEAD
    return <ErrorState onRetry={resetGame} />;
  }

  return (
    <div className="min-h-screen from-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-800 mb-2">Pulsy</h1>
          <p className="text-lg text-gray-600">Answer referendum questions and see the results!</p>
        </header>

        <main className="max-w-2xl mx-auto">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
              Question {currentQuestionIndex + 1} of 5
            </h2>
            <ProgressBar current={currentQuestionIndex + 1} total={5} />
          </div>

          <QuestionCard 
            question={currentQuestion} 
            onVote={handleVote}
            onSwipe={handleSwipe}
          />
        </main>

        <footer className="text-center mt-8">
          <p className="text-sm text-gray-500">Choose your answer using the buttons above or swipe the card</p>
        </footer>
      </div>
=======
    return (
      <div className="error">
        <h2>No questions available</h2>
        <button onClick={resetGame}>Restart</button>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="text-4xl font-bold mb-2">Pulsy</h1>
        <p className="text-lg text-muted-foreground">Answer referendum questions by swiping!</p>
      </header>

      <main className="app-main w-full flex flex-col items-center">
        <div className="question-section w-full max-w-xl">
          <div className="question-header flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold mb-4">
              Question {currentQuestionIndex + 1} of {data.questions.length}
            </h2>
          </div>
          <ProgressBar current={currentQuestionIndex + 1} total={data.questions.length} />
            <Button variant="secondary" onClick={resetGame}>
              Restart
            </Button>
          <QuestionCard
            question={currentQuestion}
            onVote={handleVote}
            onSwipe={handleSwipe}
          />
        </div>
      </main>

      <footer className="app-footer mt-8">
        <p className="text-sm text-muted-foreground">
          Swipe the card right for "Yes" or left for "No"
        </p>
      </footer>
>>>>>>> 6f8a7b4 (feat: Initial commit - Pulsy application with interactive question cards and swipe functionality)
    </div>
  );
}

export default App;
