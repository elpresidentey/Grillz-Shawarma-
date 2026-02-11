# 📸 Replace All Images with Your Uploaded Photos

## 🎯 Quick Setup Guide

### Step 1: Run the Setup Script
```bash
# For Windows
setup-images.bat

# Or manually:
mkdir public\images
```

### Step 2: Copy Your Images
Place your uploaded images in `public\images\` with these **exact names**:

## 🍔 Required Images & Names

### Combo Deals
- `couple-combo.jpg` ← Your combo deal photo
- `family-feast.jpg` ← Your family combo photo  
- `office-lunch.jpg` ← Your office lunch photo

### Shawarma Varieties
- `classic-chicken-shawarma.jpg` ← Your chicken shawarma
- `spicy-lagos-fire.jpg` ← Your spicy shawarma
- `beef-shawarma.jpg` ← Your beef shawarma
- `mixed-shawarma.jpg` ← Your mixed shawarma
- `vegetarian-shawarma.jpg` ← Your vegetarian shawarma

### Grilled Items
- `grilled-chicken.jpg` ← Your grilled chicken
- `grilled-beef.jpg` ← Your grilled beef
- `grilled-mixed.jpg` ← Your grilled mixed

### Sides & Drinks
- `jollof-rice.jpg` ← Your jollof rice
- `fries.jpg` ← Your fries
- `soft-drink.jpg` ← Your soft drinks
- `chicken-wings.jpg` ← Your chicken wings
- `moi-moi.jpg` ← Your moi moi

### Default
- `default-food.jpg` ← Your default food image

## 📁 Directory Structure
```
lagos-shawarma-app/
├── public/
│   └── images/
│       ├── couple-combo.jpg ← Your photo here
│       ├── family-feast.jpg ← Your photo here
│       ├── office-lunch.jpg ← Your photo here
│       ├── classic-chicken-shawarma.jpg ← Your photo here
│       ├── spicy-lagos-fire.jpg ← Your photo here
│       ├── beef-shawarma.jpg ← Your photo here
│       ├── mixed-shawarma.jpg ← Your photo here
│       ├── vegetarian-shawarma.jpg ← Your photo here
│       ├── grilled-chicken.jpg ← Your photo here
│       ├── grilled-beef.jpg ← Your photo here
│       ├── grilled-mixed.jpg ← Your photo here
│       ├── jollof-rice.jpg ← Your photo here
│       ├── fries.jpg ← Your photo here
│       ├── soft-drink.jpg ← Your photo here
│       ├── chicken-wings.jpg ← Your photo here
│       ├── moi-moi.jpg ← Your photo here
│       └── default-food.jpg ← Your photo here
```

## 🔧 What's Already Set Up

✅ **CustomImage component** is configured to use your images  
✅ **Error handling** will show fallbacks if images are missing  
✅ **Proper sizing** - Images will fit perfectly (400x200px)  
✅ **Consistent styling** - Professional appearance  

## 🚀 After Placing Your Images

1. **Restart the development server:**
   ```bash
   npm start
   ```

2. **Your images will appear automatically:**
   - Menu items will show your food photos
   - Combo deals will display your custom images
   - All categories will use your uploaded photos

## 📋 Image Specifications

- **Format:** JPEG (.jpg)
- **Recommended Size:** 400x200px (width x height)
- **File Size:** Under 100KB each for fast loading
- **Quality:** High quality, web-optimized

## 🎯 Visual Impact

Once your images are placed:
- ✅ **Professional appearance** with your actual food photos
- ✅ **Brand consistency** throughout the app
- ✅ **Better user experience** with realistic food presentation
- ✅ **Complete visual transformation** of your app

## 📞 Need Help?

If images don't appear:
1. **Check file names** - Must match exactly (case-sensitive)
2. **Verify location** - Must be in `public\images\`
3. **Check format** - Must be .jpg files
4. **Restart server** - Run `npm start` again

**🎉 Your Lagos Shawarma & Grills app will showcase your beautiful food photography!** 🍔✨
