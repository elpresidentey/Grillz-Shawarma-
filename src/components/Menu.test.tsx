import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CartProvider } from '../context/CartContext';
import { ToastProvider } from '../components/Toast';
import Menu from '../components/Menu';
import { menuData } from '../data/menuData';

// Mock the useToast hook
jest.mock('../components/Toast', () => ({
  useToast: () => ({
    addToast: jest.fn(),
  }),
}));

// Mock the useCartHelpers hook
jest.mock('../context/CartContext', () => ({
  useCartHelpers: () => ({
    addToCart: jest.fn(),
    getCartItemCount: jest.fn(() => 0),
    getCartTotal: jest.fn(() => 0),
  }),
}));

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

  test('adds item to cart when add to cart button is clicked', async () => {
    renderMenu();
    
    // Find and click add to cart button
    const addToCartButtons = screen.getAllByText('Add to Cart');
    if (addToCartButtons.length > 0) {
      fireEvent.click(addToCartButtons[0]);
      
      // Wait for toast notification (mocked)
      await waitFor(() => {
        expect(screen.getByText('Item Added to Cart!')).toBeInTheDocument();
      });
    }
  });

  test('opens customization modal when customize button is clicked', async () => {
    renderMenu();
    
    // Find and click customize button
    const customizeButtons = screen.getAllByText('Customize');
    if (customizeButtons.length > 0) {
      fireEvent.click(customizeButtons[0]);
      
      // Check if modal opens
      await waitFor(() => {
        expect(screen.getByText(/Customize/)).toBeInTheDocument();
      });
    }
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
    
    // Check if combo items are displayed
    const comboItems = menuData.find(cat => cat.id === 'combos')?.items || [];
    comboItems.forEach(item => {
      expect(screen.getByText(item.name)).toBeInTheDocument();
      expect(screen.getByText('Order Combo Deal')).toBeInTheDocument();
    });
  });
});
