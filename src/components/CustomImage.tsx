import React, { useEffect, useMemo, useState } from 'react';

interface CustomImageProps {
  imageName: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}

// Master list of confirmed available images
const AVAILABLE_IMAGES: Record<string, boolean> = {
  'couple-combo.jpg': true,
  'family-feast.jpg': true,
  'office-lunch.jpg': true,
  'classic-chicken-shawarma.jpg': true,
  'beef-shawarma.jpg': true,
  'mixed-shawarma.jpg': true,
  'vegetarian-shawarma.jpg': true,
  'spicy-lagos-fire.jpg': true,
  'grilled-chicken.jpg': true,
  'default-food.jpg': true
};

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
  const mapped = imageFileMap[normalized] ?? ['default-food.jpg'];
  const filteredMapped = mapped.filter(img => AVAILABLE_IMAGES[img]);
  const withDefault = filteredMapped.length > 0 ? filteredMapped : ['default-food.jpg'];
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
    const next = sourceIndex + 1;
    if (next < sources.length) {
      setSourceIndex(next);
    }
    // If all sources fail, we fallback to default-food.jpg which should always exist
  };

  // Always show an image tag, even with fallback default
  const finalSrc = sources[Math.min(sourceIndex, sources.length - 1)] || '/images/default-food.jpg';

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
