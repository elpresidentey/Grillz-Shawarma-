@echo off
echo 🍔 Lagos Shawarma & Grills - Image Setup Script
echo ================================================

REM Create the images directory if it doesn't exist
if not exist "public\images" mkdir "public\images"

echo 📁 Created/verified public\images directory

echo.
echo 📸 Required images:
echo    - couple-combo.jpg
echo    - family-feast.jpg
echo    - office-lunch.jpg
echo    - classic-chicken-shawarma.jpg
echo    - spicy-lagos-fire.jpg
echo    - beef-shawarma.jpg
echo    - mixed-shawarma.jpg
echo    - vegetarian-shawarma.jpg
echo    - grilled-chicken.jpg
echo    - grilled-beef.jpg
echo    - grilled-mixed.jpg
echo    - jollof-rice.jpg
echo    - fries.jpg
echo    - soft-drink.jpg
echo    - chicken-wings.jpg
echo    - moi-moi.jpg
echo    - default-food.jpg

echo.
echo 📋 Instructions:
echo 1. Copy your uploaded images to: public\images\
echo 2. Make sure they have these exact names (listed above)
echo 3. Restart your development server: npm start
echo.
echo ✅ Your custom images will then appear in the app!
echo.
pause
