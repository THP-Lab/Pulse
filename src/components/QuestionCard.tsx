import React, { useState, useRef, useEffect } from "react";
import type { Question } from "../types/index";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button"

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

  const cardStyle = {
    transform: `translate(${dragOffset.x}px, ${dragOffset.y}px) rotate(${dragOffset.x * 0.1}deg)`,
    cursor: isDragging ? "grabbing" : "grab",
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-[50vh] p-2 gap-2">
      <Card
        ref={cardRef}
        className="w-full max-w-md min-h-[350px] flex flex-col"
        style={cardStyle}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <CardContent className="flex-1 flex items-center justify-center">
          <h2 className="text-xl font-semibold text-center">{question.question}</h2>
        </CardContent>
      </Card>
      
      <div className="flex justify-between gap-4 w-full max-w-md">
        <Button
          variant="destructive"
          size="lg"
          className="flex-1"
          onClick={() => onVote("dislike")}
        >
          NO
        </Button>
        <Button
          variant="success"
          size="lg"
          className="flex-1"
          onClick={() => onVote("like")}
        >
          YES
        </Button>
      </div>
    </div>
  );
};

export default QuestionCard; 