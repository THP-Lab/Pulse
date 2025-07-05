import React from 'react';
import { Progress } from "@/components/ui/progress";

interface ProgressBarProps {
  current: number;
  total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  return (
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
    </div>
  );
};

export default ProgressBar; 