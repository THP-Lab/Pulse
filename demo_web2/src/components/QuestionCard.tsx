import React, { useState, useRef, useEffect } from "react";
import type { Question } from "../types/index";
import { Button } from "@/components/ui/button";

interface QuestionCardProps {
  question: Question;
  onVote: (vote: "like" | "dislike") => void;
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
  const [isAnimatingNo, setIsAnimatingNo] = useState(false);
  const [isAnimatingYes, setIsAnimatingYes] = useState(false);
  const [activeVote, setActiveVote] = useState<"like" | "dislike" | null>(null);
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

  const handleVote = (type: "like" | "dislike") => {
    setActiveVote(type);
    
    if (type === "dislike") {
      setIsAnimatingNo(true);
      setTimeout(() => setIsAnimatingNo(false), 200);
    } else {
      setIsAnimatingYes(true);
      setTimeout(() => setIsAnimatingYes(false), 200);
    }
    
    setTimeout(() => {
      onVote(type);
      setActiveVote(null);
    }, 200);
  };

  const cardStyle = {
    transform: isDragging 
      ? `translate(${dragOffset.x}px, ${dragOffset.y}px)` 
      : "none",
    cursor: isDragging ? "grabbing" : "grab",
    transition: isDragging ? "none" : "transform 0.3s ease",
    minHeight: "400px",
  };

  return (
    <div className="flex flex-col items-center w-full px-4">
      {/* Carte principale */}
      <div 
        ref={cardRef}
        className="bg-white rounded-2xl shadow-lg p-6 md:p-8 w-full max-w-2xl mx-auto flex flex-col"
        style={cardStyle}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <div className="text-center mb-6 mt-6 flex-1 flex flex-col justify-center">
          <div className="inline-block bg-blue-100 text-blue-800 px-3 py-1 md:px-4 md:py-2 rounded-full text-sm font-medium mb-4">
            {question.category}
          </div>
          <p className="text-lg md:text-xl text-gray-800 leading-relaxed flex-1 px-2">
            {question.question}
          </p>
        </div>
      </div>

      {/* Boutons de vote - même largeur que la carte */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center w-full max-w-2xl mt-6">
        <div className={`transition-transform duration-200 ${isAnimatingNo ? "scale-95" : "scale-100"} w-full`}>
          <Button
            onClick={() => handleVote("dislike")}
            variant={activeVote === "dislike" ? "default" : "outline"}
            size="lg"
            className={`w-full py-4 text-lg ${
              activeVote === "dislike" 
                ? "bg-red-500 text-white hover:bg-red-600 border-red-500" 
                : "border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
            }`}
          >
            👎 No
          </Button>
        </div>
    
        <div className={`transition-transform duration-200 ${isAnimatingYes ? "scale-95" : "scale-100"} w-full`}>
          <Button
            onClick={() => handleVote("like")}
            variant={activeVote === "like" ? "default" : "outline"}
            size="lg"
            className={`w-full py-4 text-lg ${
              activeVote === "like" 
                ? "bg-green-500 text-white hover:bg-green-600 border-green-500" 
                : "border-green-200 text-green-600 hover:bg-green-50 hover:border-green-300"
            }`}
          >
            👍 Yes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;