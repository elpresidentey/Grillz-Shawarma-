import React, { useState } from 'react';

interface CustomImageProps {
  imageName: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}

// Generate consistent images for each menu item
const getImageUrl = (imageName: string, width: number, height: number): string => {
  // Create a consistent seed from image name for same image every time
  const hash = imageName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const seed = hash % 1000;
  return `https://picsum.photos/${width}/${height}?random=${seed}`;
};

const CustomImage: React.FC<CustomImageProps> = ({ 
  imageName, 
  alt, 
  className = '', 
  width = 400, 
  height = 200 
}) => {
  const [imageError, setImageError] = useState(false);
  const imageUrl = getImageUrl(imageName, width, height);
  
  const handleImageError = () => {
    if (!imageError) {
      setImageError(true);
    }
  };
  
  // Use fallback URL if primary image fails
  const finalSrc = imageError ? `https://picsum.photos/${width}/${height}?random=999` : imageUrl;
  
  return (
    <img
      src={finalSrc}
      alt={alt}
      className={className}
      width={width}
      height={height}
      onError={handleImageError}
      style={{
        objectFit: 'cover',
        backgroundColor: '#f3f4f6'
      }}
    />
  );
};

export default CustomImage;
