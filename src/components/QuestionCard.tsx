import React, { useState, useRef, useEffect } from "react";
import type { Question } from "../types/index";
import { Button } from "@/components/ui/button";

interface QuestionCardProps {
  question: Question;
  onVote: (vote: "like" | "dislike" | "idk") => void;
  onSwipe: (direction: "left" | "right") => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  onVote,
  onSwipe,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [isAnimating, setIsAnimating] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setStartPos({ x: touch.clientX, y: touch.clientY });
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    const deltaX = touch.clientX - startPos.x;
    const deltaY = touch.clientY - startPos.y;
    setDragOffset({ x: deltaX, y: deltaY });
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    if (Math.abs(dragOffset.x) > 100) {
      const direction = dragOffset.x > 0 ? "right" : "left";
      onSwipe(direction);
    }
    setDragOffset({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setStartPos({ x: e.clientX, y: e.clientY });
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startPos.x;
    const deltaY = e.clientY - startPos.y;
    setDragOffset({ x: deltaX, y: deltaY });
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);

    if (Math.abs(dragOffset.x) > 100) {
      const direction = dragOffset.x > 0 ? "right" : "left";
      onSwipe(direction);
    }
    setDragOffset({ x: 0, y: 0 });
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
        setDragOffset({ x: 0, y: 0 });
      }
    };

    document.addEventListener("mouseup", handleGlobalMouseUp);
    return () => document.removeEventListener("mouseup", handleGlobalMouseUp);
  }, [isDragging]);

  const handleVote = (vote: "like" | "dislike" | "idk") => {
    setIsAnimating(true);
    setTimeout(() => {
      onVote(vote);
      setIsAnimating(false);
    }, 200);
  };

  const cardStyle = {
    transform: `translate(${dragOffset.x}px, ${dragOffset.y}px) rotate(${dragOffset.x * 0.1}deg)`,
    cursor: isDragging ? "grabbing" : "grab",
  };

  return (
    <div className={`transition-transform duration-200 ${isAnimating ? "scale-95" : "scale-100"}`}>
      <div 
        className="bg-white rounded-2xl shadow-lg p-8 mb-8"
        style={cardStyle}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <div className="text-center mb-8">
          <p className="text-xl text-gray-800 leading-relaxed">{question.question}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => handleVote("dislike")}
            variant="outline"
            size="lg"
            className="flex-1 py-4 text-lg border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
          >
            👎 No
          </Button>
          <Button
            onClick={() => handleVote("idk")}
            variant="outline"
            size="lg"
            className="flex-1 py-4 text-lg border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300"
          >
            🤷 IDK
          </Button>
          <Button
            onClick={() => handleVote("like")}
            variant="outline"
            size="lg"
            className="flex-1 py-4 text-lg border-green-200 text-green-600 hover:bg-green-50 hover:border-green-300"
          >
            👍 Yes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard; 