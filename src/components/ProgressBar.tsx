import React from 'react';
import './ProgressBar.css';
import { Progress } from "@/components/ui/progress";

interface ProgressBarProps {
  current: number;
  total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  return (
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
    </div>
  );
};

export default ProgressBar; 