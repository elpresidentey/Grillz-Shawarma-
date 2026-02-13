import React, { useEffect, useMemo, useState } from 'react';

interface CustomImageProps {
  imageName: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}

// Primary image per item; missing files fall back to default-food.jpg or placeholder
const imageFileMap: Record<string, string[]> = {
  // Combo deals
  'couple-combo': ['couple-combo.jpg', 'default-food.jpg'],
  'family-feast': ['family-feast.jpg', 'default-food.jpg'],
  'office-lunch': ['office-lunch.jpg', 'default-food.jpg'],

  // Shawarma varieties
  'classic-chicken': ['classic-chicken-shawarma.jpg', 'default-food.jpg'],
  'beef-shawarma': ['beef-shawarma.jpg', 'default-food.jpg'],
  'mixed-shawarma': ['mixed-shawarma.jpg', 'default-food.jpg'],
  'vegetarian-shawarma': ['vegetarian-shawarma.jpg', 'default-food.jpg'],
  'lagos-fire': ['spicy-lagos-fire.jpg', 'default-food.jpg'],

  // Grills – use available images
  'grilled-wings': ['grilled-chicken.jpg', 'default-food.jpg'],
  'suya-platter': ['grilled-chicken.jpg', 'default-food.jpg'],
  'grilled-fish': ['grilled-chicken.jpg', 'default-food.jpg'],
  'mixed-grill': ['mixed-shawarma.jpg', 'default-food.jpg'],

  // Sides & beverages - all use default
  'french-fries': ['default-food.jpg'],
  'jollof-rice': ['default-food.jpg'],
  'soft-drinks': ['default-food.jpg'],
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
  const [allFailed, setAllFailed] = useState(false);

  useEffect(() => {
    setSourceIndex(0);
    setAllFailed(false);
  }, [imageName]);

  const handleImageError = () => {
    const next = sourceIndex + 1;
    if (next >= sources.length) {
      setAllFailed(true);
    } else {
      setSourceIndex(next);
    }
  };

  if (allFailed) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-100 text-gray-400 ${className}`}
        style={{ minHeight: height }}
        role="img"
        aria-label={alt}
      >
        <span className="text-xs font-medium">Photo</span>
      </div>
    );
  }

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
