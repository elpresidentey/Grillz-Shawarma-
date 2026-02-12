import React, { useEffect, useMemo, useState } from 'react';

interface CustomImageProps {
  imageName: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}

const imageFileMap: Record<string, string[]> = {
  // Combo deals
  'couple-combo': ['couple-combo.jpg'],
  'family-feast': ['family-feast.jpg'],
  'office-lunch': ['office-lunch.jpg'],

  // Shawarma varieties
  'classic-chicken': ['classic-chicken-shawarma.jpg'],
  'beef-shawarma': ['beef-shawarma.jpg'],
  'mixed-shawarma': ['mixed-shawarma.jpg'],
  'vegetarian-shawarma': ['vegetarian-shawarma.jpg'],
  'lagos-fire': ['spicy-lagos-fire.jpg'],

  // Grills
  'grilled-wings': ['chicken-wings.jpg', 'grilled-chicken.jpg'],
  'suya-platter': ['grilled-beef.jpg', 'grilled-chicken.jpg'],
  'grilled-fish': ['grilled-mixed.jpg', 'grilled-chicken.jpg'],
  'mixed-grill': ['grilled-mixed.jpg', 'grilled-chicken.jpg'],

  // Sides & beverages
  'french-fries': ['fries.jpg'],
  'jollof-rice': ['jollof-rice.jpg'],
  'soft-drinks': ['soft-drink.jpg'],

  // Fallbacks for items without a dedicated photo
  'student-pack': ['default-food.jpg'],
  'grilled-corn': ['default-food.jpg'],
  'plantain': ['default-food.jpg'],
  'coleslaw': ['default-food.jpg'],
  'salad': ['default-food.jpg'],
  'fresh-juice': ['default-food.jpg'],
  'bottled-water': ['default-food.jpg'],
  'local-drinks': ['default-food.jpg']
};

const buildImageSources = (imageName: string): string[] => {
  const normalized = imageName.trim();
  const mapped = imageFileMap[normalized] ?? [`${normalized}.jpg`];
  const withDefault = mapped.includes('default-food.jpg')
    ? mapped
    : [...mapped, 'default-food.jpg'];
  return withDefault.map((file) => `/images/${file}`);
};

const CustomImage: React.FC<CustomImageProps> = ({ 
  imageName, 
  alt, 
  className = '', 
  width = 400, 
  height = 200 
}) => {
  const sources = useMemo(() => buildImageSources(imageName), [imageName]);
  const [sourceIndex, setSourceIndex] = useState(0);

  useEffect(() => {
    setSourceIndex(0);
  }, [imageName]);

  const handleImageError = () => {
    setSourceIndex((prev) => Math.min(prev + 1, sources.length - 1));
  };

  const finalSrc = sources[Math.min(sourceIndex, sources.length - 1)];
  
  return (
    <img
      src={finalSrc}
      alt={alt}
      className={className}
      width={width}
      height={height}
      onError={handleImageError}
      loading="lazy"
      style={{
        objectFit: 'cover',
        backgroundColor: '#f3f4f6'
      }}
    />
  );
};

export default CustomImage;
