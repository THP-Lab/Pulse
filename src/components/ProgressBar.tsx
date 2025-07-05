import React from 'react';
<<<<<<< HEAD
=======
import './ProgressBar.css';
>>>>>>> 6f8a7b4 (feat: Initial commit - Pulsy application with interactive question cards and swipe functionality)
import { Progress } from "@/components/ui/progress";

interface ProgressBarProps {
  current: number;
  total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  return (
<<<<<<< HEAD
    <div className="w-full max-w-md mx-auto mb-6">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium text-gray-600">
          Question {current} of {total}
        </span>
        <span className="text-sm text-gray-500">
          {Math.round((current / total) * 100)}%
        </span>
      </div>
      <Progress value={(current / total) * 100} className="h-2" />
=======
    <div className="w-full max-w-md mx-auto my-4">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-primary">
          Question {current} of {total}
        </span>
        <span className="text-sm text-muted-foreground">
          {Math.round((current / total) * 100)}%
        </span>
      </div>
      <Progress value={current} max={total} />
>>>>>>> 6f8a7b4 (feat: Initial commit - Pulsy application with interactive question cards and swipe functionality)
    </div>
  );
};

export default ProgressBar; 