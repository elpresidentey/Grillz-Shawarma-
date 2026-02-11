# Images Directory

This directory contains custom food images for the Lagos Shawarma & Grills app.

## Image Files
- `couple-combo.jpg` - Couple Combo meal
- `family-feast.jpg` - Family Feast combo
- `office-lunch.jpg` - Office Lunch Special
- `classic-chicken-shawarma.jpg` - Classic Chicken Shawarma
- `spicy-lagos-fire.jpg` - Spicy Lagos Fire Shawarma
- `beef-shawarma.jpg` - Beef Shawarma
- `mixed-shawarma.jpg` - Mixed Shawarma
- `vegetarian-shawarma.jpg` - Vegetarian Shawarma
- `grilled-chicken.jpg` - Grilled Chicken
- `grilled-beef.jpg` - Grilled Beef
- `grilled-mixed.jpg` - Grilled Mixed
- `jollof-rice.jpg` - Jollof Rice
- `fries.jpg` - French Fries
- `soft-drink.jpg` - Soft Drinks
- `chicken-wings.jpg` - Chicken Wings
- `moi-moi.jpg` - Moi Moi
- `default-food.jpg` - Default fallback image

## Usage
Images are referenced by the CustomImage component using the item ID as the key.

Example:
```typescript
<CustomImage imageName="couple-combo" alt="Couple Combo" />
```

## Image Requirements
- Format: JPEG
- Dimensions: 400x200px for menu items
- File size: Under 100KB each
- Quality: High quality, web optimized
- Naming: Use kebab-case for file names
