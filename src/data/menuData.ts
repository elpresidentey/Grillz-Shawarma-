import { MenuCategory } from '../types/menu';

export const menuData: MenuCategory[] = [
  {
    id: 'combos',
    name: 'Combo Deals',
    description: 'Amazing value combos for hungry customers',
    items: [
      {
        id: 'couple-combo',
        name: 'Couple Combo',
        description: '2 shawarmas + 2 drinks + fries for 2 people',
        price: 3500,
        category: 'combos',
        isPopular: true
      },
      {
        id: 'family-feast',
        name: 'Family Feast',
        description: '4 shawarmas + 4 drinks + large fries for 4 people',
        price: 6500,
        category: 'combos',
        isPopular: true
      },
      {
        id: 'office-lunch',
        name: 'Office Lunch Special',
        description: '5 shawarmas + 5 drinks + sides for 5 people',
        price: 8000,
        category: 'combos'
      },
      {
        id: 'student-pack',
        name: 'Student Pack',
        description: '1 shawarma + 1 drink + small fries',
        price: 2000,
        category: 'combos'
      }
    ]
  },
  {
    id: 'shawarma',
    name: 'Shawarma Varieties',
    description: 'Authentic shawarma made with fresh ingredients and traditional recipes',
    items: [
      {
        id: 'classic-chicken',
        name: 'Classic Chicken Shawarma',
        description: 'Tender chicken marinated in special spices, wrapped in warm pita with vegetables and sauce',
        price: 1800,
        category: 'shawarma',
        isPopular: true
      },
      {
        id: 'beef-shawarma',
        name: 'Beef Shawarma',
        description: 'Juicy beef strips marinated in Arabic spices, served with tahini sauce',
        price: 2200,
        category: 'shawarma'
      },
      {
        id: 'mixed-shawarma',
        name: 'Mixed Shawarma',
        description: 'Perfect combination of chicken and beef shawarma with extra toppings',
        price: 2500,
        category: 'shawarma',
        isPopular: true
      },
      {
        id: 'vegetarian-shawarma',
        name: 'Vegetarian Shawarma',
        description: 'Fresh vegetables, falafel, and hummus wrapped in warm pita bread',
        price: 1500,
        category: 'shawarma',
        isVegetarian: true
      },
      {
        id: 'lagos-fire',
        name: 'Spicy "Lagos Fire" Shawarma',
        description: 'For the brave! Extra spicy shawarma with habanero and special Lagos spices',
        price: 2000,
        category: 'shawarma',
        isSpicy: true,
        isPopular: true
      }
    ]
  },
  {
    id: 'grills',
    name: 'Grill Items',
    description: 'Perfectly grilled meats and vegetables with authentic Nigerian flavors',
    items: [
      {
        id: 'grilled-wings',
        name: 'Grilled Chicken Wings (6pcs)',
        description: 'Marinated chicken wings grilled to perfection, served with dipping sauce',
        price: 2800,
        category: 'grills',
        isPopular: true
      },
      {
        id: 'suya-platter',
        name: 'Suya Platter',
        description: 'Traditional Nigerian suya with spices and sides',
        price: 3200,
        category: 'grills',
        isSpicy: true
      },
      {
        id: 'grilled-fish',
        name: 'Grilled Fish',
        description: 'Fresh tilapia grilled to perfection with Nigerian spices',
        price: 2500,
        category: 'grills'
      },
      {
        id: 'mixed-grill',
        name: 'Mixed Grill Platter',
        description: 'Assorted grilled meats and vegetables perfect for sharing',
        price: 4500,
        category: 'grills',
        isPopular: true
      },
      {
        id: 'grilled-corn',
        name: 'Grilled Corn on Cob',
        description: 'Sweet corn grilled and seasoned with Nigerian spices',
        price: 500,
        category: 'grills'
      }
    ]
  },
  {
    id: 'sides',
    name: 'Sides & Extras',
    description: 'Perfect accompaniments to complete your meal',
    items: [
      {
        id: 'french-fries',
        name: 'French Fries (Large)',
        description: 'Crispy golden fries seasoned to perfection',
        price: 800,
        category: 'sides',
        isPopular: true
      },
      {
        id: 'plantain',
        name: 'Fried Plantain',
        description: 'Sweet ripe plantains fried to golden perfection',
        price: 600,
        category: 'sides'
      },
      {
        id: 'coleslaw',
        name: 'Coleslaw',
        description: 'Fresh and creamy coleslaw with a hint of spice',
        price: 400,
        category: 'sides'
      },
      {
        id: 'jollof-rice',
        name: 'Jollof Rice',
        description: 'Authentic Nigerian jollof rice with vegetables',
        price: 700,
        category: 'sides',
        isPopular: true
      },
      {
        id: 'salad',
        name: 'Garden Salad',
        description: 'Mixed greens with our special dressing',
        price: 500,
        category: 'sides',
        isVegetarian: true
      }
    ]
  },
  {
    id: 'beverages',
    name: 'Beverages',
    description: 'Refreshing drinks to complement your meal',
    items: [
      {
        id: 'soft-drinks',
        name: 'Soft Drinks (Coke, Fanta, etc.)',
        description: 'Assorted carbonated soft drinks',
        price: 400,
        category: 'beverages',
        isPopular: true
      },
      {
        id: 'fresh-juice',
        name: 'Fresh Juice',
        description: 'Freshly squeezed fruit juices',
        price: 600,
        category: 'beverages'
      },
      {
        id: 'bottled-water',
        name: 'Bottled Water',
        description: 'Pure bottled water',
        price: 300,
        category: 'beverages'
      },
      {
        id: 'local-drinks',
        name: 'Local Drinks (Zobo, Kunu)',
        description: 'Traditional Nigerian drinks',
        price: 400,
        category: 'beverages'
      }
    ]
  }
];
