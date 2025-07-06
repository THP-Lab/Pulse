'use client';

import Image from 'next/image';

interface ThemeIconProps {
  icon: string;
  name: string;
  size?: number;
  className?: string;
}

export const ThemeIcon = ({ 
  icon, 
  name, 
  size = 64, 
  className = "" 
}: ThemeIconProps) => {
  const isImageUrl = (icon: string) => {
    return icon.startsWith('/') || icon.startsWith('http');
  };

  if (isImageUrl(icon)) {
    return (
      <Image
        src={icon}
        alt={name}
        width={size}
        height={size}
        className={`object-contain ${className}`}
      />
    );
  }

  return (
    <span 
      className={`inline-block ${className}`}
      style={{ fontSize: `${size}px` }}
    >
      {icon}
    </span>
  );
};