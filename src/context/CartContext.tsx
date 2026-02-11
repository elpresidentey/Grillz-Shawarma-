import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { MenuItem } from '../types/menu';
import config from '../config';

export interface CartItem extends MenuItem {
  quantity: number;
  customizations?: string[];
  specialInstructions?: string;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: { item: MenuItem; quantity: number; customizations?: string[]; specialInstructions?: string } }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_CART' };

const initialState: CartState = {
  items: [],
  isOpen: false,
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { item, quantity, customizations, specialInstructions } = action.payload;
      const existingItemIndex = state.items.findIndex(cartItem => cartItem.id === item.id);
      
      let newItems: CartItem[];
      
      if (existingItemIndex >= 0) {
        newItems = [...state.items];
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity: newItems[existingItemIndex].quantity + quantity
        };
      } else {
        const newItem: CartItem = {
          ...item,
          quantity,
          customizations,
          specialInstructions
        };
        newItems = [...state.items, newItem];
      }
      
      return {
        ...state,
        items: newItems
      };
    }
    
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };
      
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: Math.max(0, action.payload.quantity) }
            : item
        ).filter(item => item.quantity > 0)
      };
      
    case 'CLEAR_CART':
      return {
        ...state,
        items: []
      };
      
    case 'TOGGLE_CART':
      return {
        ...state,
        isOpen: !state.isOpen
      };
      
    default:
      return state;
  }
};

// Save to localStorage
const saveCartToStorage = (items: CartItem[]) => {
  try {
    localStorage.setItem('lagos-shawarma-cart', JSON.stringify(items));
  } catch (error) {
    console.error('Failed to save cart to localStorage:', error);
  }
};

// Load from localStorage
const loadCartFromStorage = (): CartItem[] => {
  try {
    const savedCart = localStorage.getItem('lagos-shawarma-cart');
    return savedCart ? JSON.parse(savedCart) : [];
  } catch (error) {
    console.error('Failed to load cart from localStorage:', error);
    return [];
  }
};

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
} | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    ...initialState,
    items: loadCartFromStorage()
  });

  // Save to localStorage whenever cart changes
  useEffect(() => {
    saveCartToStorage(state.items);
  }, [state.items]);

  const value = {
    state,
    dispatch
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// Helper functions
export const useCartHelpers = () => {
  const { state, dispatch } = useCart();

  const addToCart = (item: MenuItem, quantity: number = 1, customizations: string[] = [], specialInstructions: string = '') => {
    dispatch({
      type: 'ADD_ITEM',
      payload: { item, quantity, customizations, specialInstructions }
    });
  };

  const removeFromCart = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const toggleCart = () => {
    dispatch({ type: 'TOGGLE_CART' });
  };

  const getCartItemCount = (): number => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  };

  const getCartTotal = (): number => {
    return state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartSubtotal = (): number => {
    return getCartTotal();
  };

  const getCartTax = (): number => {
    return Math.round(getCartSubtotal() * config.taxRate);
  };

  const getCartTotalWithTax = (): number => {
    return getCartSubtotal() + getCartTax();
  };

  const getDeliveryFee = (): number => {
    return getCartSubtotal() >= config.freeDeliveryThreshold ? 0 : config.deliveryFee;
  };

  const getFinalTotal = (): number => {
    return getCartTotalWithTax() + getDeliveryFee();
  };

  return {
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleCart,
    getCartItemCount,
    getCartTotal,
    getCartSubtotal,
    getCartTax,
    getCartTotalWithTax,
    getDeliveryFee,
    getFinalTotal
  };
};
