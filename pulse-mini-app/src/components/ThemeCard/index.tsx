'use client';

import { Button } from '@worldcoin/mini-apps-ui-kit-react';
import { clsx } from 'clsx';
import { useState } from 'react';

export interface ThemeCardProps {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  gradient: string;
  isSelected?: boolean;
  onSelect: (themeId: string) => void;
}

export const ThemeCard = ({
  id,
  name,
  description,
  icon,
  color,
  gradient,
  isSelected = false,
  onSelect
}: ThemeCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={clsx(
        'relative overflow-hidden rounded-2xl p-6 cursor-pointer transition-all duration-300',
        'bg-gradient-to-br', gradient,
        'hover:scale-105 hover:shadow-xl',
        {
          'ring-4 ring-white ring-opacity-50 shadow-2xl': isSelected,
          'shadow-lg': !isSelected
        }
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect(id)}
    >
      {isSelected && (
        <div className="absolute inset-0 bg-white bg-opacity-10 backdrop-blur-sm" />
      )}
      
      <div className="relative z-10 flex flex-col items-center text-center text-white">
        <div className="text-4xl mb-3">
          {icon}
        </div>
        
        <h3 className="text-xl font-bold mb-2">
          {name}
        </h3>
        
        <p className="text-sm opacity-90 mb-4 line-clamp-2">
          {description}
        </p>
        
        <div className={clsx(
          'transition-all duration-300',
          isHovered || isSelected ? 'opacity-100' : 'opacity-70'
        )}>
          <Button
            variant={isSelected ? 'primary' : 'secondary'}
            size="sm"
            className={clsx(
              'bg-white bg-opacity-20 hover:bg-opacity-30',
              'border-white border-opacity-30',
              'text-white font-medium'
            )}
          >
            {isSelected ? '✓ Sélectionné' : 'Choisir'}
          </Button>
        </div>
      </div>
      
      {isHovered && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-10 animate-pulse" />
      )}
    </div>
  );
};