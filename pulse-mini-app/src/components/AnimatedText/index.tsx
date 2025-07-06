'use client';

import { useEffect, useState } from 'react';

interface AnimatedTextProps {
  className?: string;
}

const TEXT_ANIMATIONS = [
  {
    title: "Select a Theme",
    subtitle: "Choose one of the topics below to get started"
  },
  {
    title: "Pick Your Topic", 
    subtitle: "What are you curious about today?"
  },
  {
    title: "Theme Explorer",
    subtitle: "Explore and interact with five quick questions per theme"
  },
  {
    title: "Topic Dashboard",
    subtitle: "Select a domain to answer its 5 focused questions"
  },
  {
    title: "Interest Selector",
    subtitle: "Tell us what you care about: NFT, AI, Gaming, Identity or DeFi"
  }
];

const TEXT_CHANGE_INTERVAL_MS = 2500;

export const AnimatedText = ({ className = "" }: AnimatedTextProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % TEXT_ANIMATIONS.length);
        setIsVisible(true);
      }, 300);
    }, TEXT_CHANGE_INTERVAL_MS);

    return () => clearInterval(interval);
  }, []);

  const currentText = TEXT_ANIMATIONS[currentIndex];

  return (
    <div className={`text-center ${className}`}>
      <div className="h-16 flex flex-col justify-center">
        <div className={`transition-opacity duration-300 ease-in-out ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}>
          <h2 className="text-lg font-semibold text-gray-800 mb-1 leading-tight">
            {currentText.title}
          </h2>
          <p className="text-gray-600 text-sm leading-tight">
            {currentText.subtitle}
          </p>
        </div>
      </div>
    </div>
  );
};