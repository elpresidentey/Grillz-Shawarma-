import React from 'react';

interface StockImageProps {
  width: number;
  height: number;
  keyword: string;
  alt?: string;
  className?: string;
}

const StockImage: React.FC<StockImageProps> = ({ 
  width, 
  height, 
  keyword, 
  alt = `${keyword} image`, 
  className = '' 
}) => {
  // Use a reliable image service that won't cause connection errors
  const imageUrl = `https://picsum.photos/${width}/${height}?random=${Math.random()}`;
  
  return (
    <img
      src={imageUrl}
      alt={alt}
      className={className}
      width={width}
      height={height}
      onError={(e) => {
        // Fallback to another random image if this one fails
        const target = e.target as HTMLImageElement;
        target.src = `https://picsum.photos/${width}/${height}?random=${Math.random() * 1000}`;
      }}
    />
  );
};

export default StockImage;
