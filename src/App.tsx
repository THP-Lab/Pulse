import { useState, useEffect } from "react";
import type { AppData, Question, UserVote } from "./types/index";
import QuestionCard from "./components/QuestionCard";
import ProgressBar from "./components/ProgressBar";
import { Button } from "@/components/ui/button"
import "./App.css";

function App() {
  const [data, setData] = useState<AppData | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [_, setUserVotes] = useState<UserVote[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/questions.json')
      .then(response => response.json())
      .then((data: AppData) => {
        setData(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error loading questions:', error);
        setIsLoading(false);
      });
  }, []);

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
    if (!data) return;
    
    if (currentQuestionIndex < data.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // End of questions
      alert('You have completed all the questions!');
      setCurrentQuestionIndex(0);
    }
  };

  const getCurrentQuestion = (): Question | null => {
    if (!data) return null;
    return data.questions[currentQuestionIndex] || null;
  };

  const resetGame = () => {
    setCurrentQuestionIndex(0);
    setUserVotes([]);
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
    );
  }

  const currentQuestion = getCurrentQuestion();
  if (!currentQuestion) {
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
    </div>
  );
}

export default App;
