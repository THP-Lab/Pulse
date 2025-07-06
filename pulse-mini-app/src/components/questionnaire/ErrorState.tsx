import React from "react";
import { Button } from "@/components/ui/Button";

interface ErrorStateProps {
  onRetry: () => void;
}

const ErrorState: React.FC<ErrorStateProps> = ({ onRetry }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-100">
      <div className="text-center max-w-md mx-auto p-8">
        <div className="text-6xl mb-4">😵</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops! Something went wrong</h2>
        <p className="text-gray-600 mb-6">Unable to load questions. Please try again.</p>
        <Button onClick={onRetry} className="px-8 py-3">
          Try Again
        </Button>
      </div>
    </div>
  );
};

export default ErrorState;