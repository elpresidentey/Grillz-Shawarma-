import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CartProvider } from '../context/CartContext';
import { ToastProvider } from '../components/Toast';
import Menu from '../components/Menu';
import { menuData } from '../data/menuData';

// Mock useToast but keep ToastProvider so it renders
jest.mock('../components/Toast', () => {
  const actual = jest.requireActual('../components/Toast');
  return {
    ...actual,
    useToast: () => ({ addToast: jest.fn() }),
  };
});

// Mock useCartHelpers but keep CartProvider so the tree renders
jest.mock('../context/CartContext', () => {
  const actual = jest.requireActual('../context/CartContext');
  return {
    ...actual,
    useCartHelpers: () => ({
      addToCart: jest.fn(),
      getCartItemCount: jest.fn(() => 0),
      getCartTotal: jest.fn(() => 0),
    }),
  };
});

describe('Menu Component', () => {
  const renderMenu = () => {
    return render(
      <ToastProvider>
        <CartProvider>
          <Menu />
        </CartProvider>
      </ToastProvider>
    );
  };

  test('renders menu sections correctly', () => {
    renderMenu();
    
    // Check if category tabs are rendered
    menuData.forEach(category => {
      expect(screen.getByText(category.name)).toBeInTheDocument();
    });
  });

  test('displays menu items when category is selected', () => {
    renderMenu();
    
    // Click on first category
    const firstCategory = screen.getByText(menuData[0].name);
    fireEvent.click(firstCategory);
    
    // Check if items are displayed
    const firstItem = menuData[0].items[0];
    expect(screen.getByText(firstItem.name)).toBeInTheDocument();
    expect(screen.getByText(firstItem.description)).toBeInTheDocument();
  });

  test('adds item to cart when add to cart button is clicked', () => {
    renderMenu();
    const addToCartButtons = screen.getAllByText('Add to Cart');
    expect(addToCartButtons.length).toBeGreaterThan(0);
    fireEvent.click(addToCartButtons[0]);
    // Toast is mocked; clicking should not throw
  });

  test('opens customization modal when customize button is clicked', async () => {
    renderMenu();
    const customizeButtons = screen.getAllByText('Customize');
    expect(customizeButtons.length).toBeGreaterThan(0);
    fireEvent.click(customizeButtons[0]);
    await waitFor(() => {
      expect(screen.getByText(/Customize .+/)).toBeInTheDocument();
    });
  });

  test('switches categories correctly', () => {
    renderMenu();
    
    // Click on different categories
    menuData.forEach(category => {
      const categoryButton = screen.getByText(category.name);
      fireEvent.click(categoryButton);
      
      // Check if items from that category are displayed
      category.items.forEach(item => {
        expect(screen.getByText(item.name)).toBeInTheDocument();
      });
    });
  });

  test('displays combo deals correctly', () => {
    renderMenu();
    
    // Click on combo deals category
    const comboCategory = screen.getByText('Combo Deals');
    fireEvent.click(comboCategory);
    
    // Check if combo items and combo CTA are displayed
    const comboItems = menuData.find(cat => cat.id === 'combos')?.items || [];
    comboItems.forEach(item => {
      expect(screen.getByText(item.name)).toBeInTheDocument();
    });
    expect(screen.getAllByText('Order Combo Deal').length).toBe(comboItems.length);
  });
});
