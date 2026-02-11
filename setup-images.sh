#!/bin/bash

# Image Setup Script for Lagos Shawarma App
# This script helps you place your uploaded images in the correct locations

echo "🍔 Lagos Shawarma & Grills - Image Setup Script"
echo "================================================"

# Create the images directory if it doesn't exist
mkdir -p public/images

echo "📁 Created/verified public/images directory"

# List of required images
declare -a images=(
    "couple-combo.jpg"
    "family-feast.jpg"
    "office-lunch.jpg"
    "classic-chicken-shawarma.jpg"
    "spicy-lagos-fire.jpg"
    "beef-shawarma.jpg"
    "mixed-shawarma.jpg"
    "vegetarian-shawarma.jpg"
    "grilled-chicken.jpg"
    "grilled-beef.jpg"
    "grilled-mixed.jpg"
    "jollof-rice.jpg"
    "fries.jpg"
    "soft-drink.jpg"
    "chicken-wings.jpg"
    "moi-moi.jpg"
    "default-food.jpg"
)

echo "📸 Required images:"
for image in "${images[@]}"; do
    echo "   - $image"
done

echo ""
echo "📋 Instructions:"
echo "1. Copy your uploaded images to: public/images/"
echo "2. Make sure they have these exact names:"
for image in "${images[@]}"; do
    echo "   - $image"
done
echo "3. Restart your development server: npm start"
echo ""
echo "✅ Your custom images will then appear in the app!"
