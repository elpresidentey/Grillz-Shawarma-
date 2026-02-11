import React, { useState, useEffect } from 'react';
import { MenuItem } from '../types/menu';
import { menuData } from '../data/menuData';

interface SearchFilters {
  category: string;
  priceRange: [number, number];
  isSpicy?: boolean;
  isVegetarian?: boolean;
  isPopular?: boolean;
}

interface SearchResults {
  items: MenuItem[];
  totalCount: number;
  hasResults: boolean;
}

const useProductSearch = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filters, setFilters] = useState<SearchFilters>({
    category: '',
    priceRange: [0, 10000],
    isSpicy: false,
    isVegetarian: false,
    isPopular: false
  });
  const [results, setResults] = useState<SearchResults>({
    items: [],
    totalCount: 0,
    hasResults: false
  });
  const [isSearching, setIsSearching] = useState<boolean>(false);

  // Search function
  const performSearch = (term: string, searchFilters: SearchFilters) => {
    setIsSearching(true);
    
    setTimeout(() => {
      let filteredItems: MenuItem[] = [];
      
      menuData.forEach(category => {
        category.items.forEach(item => {
          let matchesSearch = true;
          let matchesFilters = true;

          // Search term matching
          if (term) {
            const searchLower = term.toLowerCase();
            matchesSearch = 
              item.name.toLowerCase().includes(searchLower) ||
              item.description.toLowerCase().includes(searchLower) ||
              item.category.toLowerCase().includes(searchLower);
          }

          // Filter matching
          if (searchFilters.category && item.category !== searchFilters.category) {
            matchesFilters = false;
          }
          if (searchFilters.priceRange[1] > 0 && (item.price < searchFilters.priceRange[0] || item.price > searchFilters.priceRange[1])) {
            matchesFilters = false;
          }
          if (searchFilters.isSpicy && !item.isSpicy) {
            matchesFilters = false;
          }
          if (searchFilters.isVegetarian && !item.isVegetarian) {
            matchesFilters = false;
          }
          if (searchFilters.isPopular && !item.isPopular) {
            matchesFilters = false;
          }

          if (matchesSearch && matchesFilters) {
            filteredItems.push(item);
          }
        });
      });

      setResults({
        items: filteredItems,
        totalCount: filteredItems.length,
        hasResults: filteredItems.length > 0
      });
      setIsSearching(false);
    }, 300); // Simulate search delay
  };

  // Clear search
  const clearSearch = () => {
    setSearchTerm('');
    setResults({
      items: [],
      totalCount: 0,
      hasResults: false
    });
    setFilters({
      category: '',
      priceRange: [0, 10000],
      isSpicy: false,
      isVegetarian: false,
      isPopular: false
    });
  };

  return {
    searchTerm,
    setSearchTerm,
    filters,
    setFilters,
    results,
    isSearching,
    performSearch,
    clearSearch
  };
};

export default useProductSearch;
