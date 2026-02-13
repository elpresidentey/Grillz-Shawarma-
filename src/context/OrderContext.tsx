import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  customizations?: string[];
  specialInstructions?: string;
}

export interface Order {
  id: string;
  date: string;
  total: number;
  status: 'completed' | 'delivered' | 'cancelled';
  items: OrderItem[];
  deliveryTime: string;
  paymentMethod?: string;
  customer: {
    name: string;
    phone: string;
    address: string;
  };
  rating?: number;
  isFavorite?: boolean;
  timestamp?: number;
}

interface OrderState {
  orders: Order[];
}

type OrderAction =
  | { type: 'ADD_ORDER'; payload: Order }
  | { type: 'REMOVE_ORDER'; payload: string }
  | { type: 'LOAD_ORDERS'; payload: Order[] }
  | { type: 'UPDATE_ORDER_RATING'; payload: { id: string; rating: number } }
  | { type: 'TOGGLE_FAVORITE'; payload: string }
  | { type: 'CLEAR_ORDERS' };

const initialState: OrderState = {
  orders: [],
};

const orderReducer = (state: OrderState, action: OrderAction): OrderState => {
  switch (action.type) {
    case 'ADD_ORDER': {
      const newOrder: Order = {
        ...action.payload,
        timestamp: Date.now()
      };
      return {
        ...state,
        orders: [newOrder, ...state.orders]
      };
    }

    case 'REMOVE_ORDER': {
      return {
        ...state,
        orders: state.orders.filter(order => order.id !== action.payload)
      };
    }

    case 'LOAD_ORDERS': {
      return {
        ...state,
        orders: action.payload
      };
    }

    case 'UPDATE_ORDER_RATING': {
      return {
        ...state,
        orders: state.orders.map(order =>
          order.id === action.payload.id
            ? { ...order, rating: action.payload.rating }
            : order
        )
      };
    }

    case 'TOGGLE_FAVORITE': {
      return {
        ...state,
        orders: state.orders.map(order =>
          order.id === action.payload
            ? { ...order, isFavorite: !order.isFavorite }
            : order
        )
      };
    }

    case 'CLEAR_ORDERS': {
      return {
        ...state,
        orders: []
      };
    }

    default:
      return state;
  }
};

// Save to localStorage
const saveOrdersToStorage = (orders: Order[]) => {
  try {
    localStorage.setItem('grillz-orders', JSON.stringify(orders));
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Failed to save orders to localStorage:', error);
    }
  }
};

// Load from localStorage
const loadOrdersFromStorage = (): Order[] => {
  try {
    const savedOrders = localStorage.getItem('grillz-orders');
    return savedOrders ? JSON.parse(savedOrders) : [];
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Failed to load orders from localStorage:', error);
    }
    return [];
  }
};

const OrderContext = createContext<{
  state: OrderState;
  dispatch: React.Dispatch<OrderAction>;
} | undefined>(undefined);

export const OrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(orderReducer, initialState);

  // Load orders on mount
  useEffect(() => {
    const loadedOrders = loadOrdersFromStorage();
    if (loadedOrders.length > 0) {
      dispatch({ type: 'LOAD_ORDERS', payload: loadedOrders });
    }
  }, []);

  // Save to localStorage whenever orders change
  useEffect(() => {
    saveOrdersToStorage(state.orders);
  }, [state.orders]);

  const value = {
    state,
    dispatch
  };

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};

// Helper hooks
export const useOrderHelpers = () => {
  const { state, dispatch } = useOrders();

  const addOrder = (order: Omit<Order, 'timestamp'>) => {
    dispatch({
      type: 'ADD_ORDER',
      payload: order as Order
    });
  };

  const removeOrder = (orderId: string) => {
    dispatch({ type: 'REMOVE_ORDER', payload: orderId });
  };

  const updateRating = (orderId: string, rating: number) => {
    dispatch({
      type: 'UPDATE_ORDER_RATING',
      payload: { id: orderId, rating }
    });
  };

  const toggleFavorite = (orderId: string) => {
    dispatch({ type: 'TOGGLE_FAVORITE', payload: orderId });
  };

  const getOrderHistory = (): Order[] => {
    return [...state.orders].sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
  };

  const getOrderById = (orderId: string): Order | undefined => {
    return state.orders.find(order => order.id === orderId);
  };

  const getTotalOrders = (): number => {
    return state.orders.length;
  };

  const getTotalSpent = (): number => {
    return state.orders.reduce((total, order) => total + order.total, 0);
  };

  return {
    addOrder,
    removeOrder,
    updateRating,
    toggleFavorite,
    getOrderHistory,
    getOrderById,
    getTotalOrders,
    getTotalSpent
  };
};
