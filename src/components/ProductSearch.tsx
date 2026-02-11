import React from 'react';
import useProductSearch from '../hooks/useProductSearch';
import { MenuItem } from '../types/menu';
import { useCartHelpers } from '../context/CartContext';

const ProductSearch: React.FC = () => {
  const {
    searchTerm,
    setSearchTerm,
    filters,
    setFilters,
    results,
    isSearching,
    performSearch,
    clearSearch
  } = useProductSearch();

  const { addToCart } = useCartHelpers();

  const formatPrice = (price: number): string => {
    return `₦${price.toLocaleString()}`;
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(searchTerm, filters);
  };

  const handleFilterChange = (filterType: keyof typeof filters, value: any) => {
    setFilters((prev: any) => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearAllFilters = () => {
    clearSearch();
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <div className="max-w-4xl mx-auto">
        {/* Search Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Merriweather, serif', letterSpacing: '-0.02em' }}>
            Search Menu
          </h2>
          <form onSubmit={handleSearch} className="space-y-4">
            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for shawarma, grills, sides, or drinks..."
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-lg"
                style={{ fontFamily: 'Merriweather, serif' }}
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 p-2 text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Merriweather, serif' }}>
                  Category
                </label>
                <select
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  style={{ fontFamily: 'Merriweather, serif' }}
                >
                  <option value="">All Categories</option>
                  <option value="shawarma">Shawarma</option>
                  <option value="grills">Grills</option>
                  <option value="sides">Sides</option>
                  <option value="beverages">Beverages</option>
                </select>
              </div>

              {/* Price Range Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Merriweather, serif' }}>
                  Price Range
                </label>
                <select
                  value={`${filters.priceRange[0]}-${filters.priceRange[1]}`}
                  onChange={(e) => {
                    const [min, max] = e.target.value.split('-').map(Number);
                    handleFilterChange('priceRange', [min, max]);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  style={{ fontFamily: 'Merriweather, serif' }}
                >
                  <option value="0-10000">All Prices</option>
                  <option value="0-1000">Under ₦1,000</option>
                  <option value="1000-2000">₦1,000 - ₦2,000</option>
                  <option value="2000-3000">₦2,000 - ₦3,000</option>
                  <option value="3000-5000">₦3,000 - ₦5,000</option>
                  <option value="5000-10000">Above ₦5,000</option>
                </select>
              </div>

              {/* Dietary Filters */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Merriweather, serif' }}>
                  Dietary Preferences
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.isSpicy}
                      onChange={(e) => handleFilterChange('isSpicy', e.target.checked)}
                      className="mr-2"
                    />
                    <span className="text-sm" style={{ fontFamily: 'Merriweather, serif' }}>Spicy</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.isVegetarian}
                      onChange={(e) => handleFilterChange('isVegetarian', e.target.checked)}
                      className="mr-2"
                    />
                    <span className="text-sm" style={{ fontFamily: 'Merriweather, serif' }}>Vegetarian</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.isPopular}
                      onChange={(e) => handleFilterChange('isPopular', e.target.checked)}
                      className="mr-2"
                    />
                    <span className="text-sm" style={{ fontFamily: 'Merriweather, serif' }}>Popular Only</span>
                  </label>
                </div>
              </div>

              {/* Clear Filters */}
              <button
                type="button"
                onClick={clearAllFilters}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors"
                style={{ fontFamily: 'Merriweather, serif' }}
              >
                Clear All Filters
              </button>
            </div>
          </form>
        </div>

        {/* Loading State */}
        {isSearching && (
          <div className="text-center py-8">
            <div className="inline-flex items-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
              <span className="ml-3 text-gray-600" style={{ fontFamily: 'Merriweather, serif' }}>Searching...</span>
            </div>
          </div>
        )}

        {/* Search Results */}
        {results.hasResults && (
          <div className="border-t pt-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900" style={{ fontFamily: 'Merriweather, serif' }}>
                Search Results ({results.totalCount} items found)
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.items.map((item: MenuItem) => (
                <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div className="relative">
                    <img
                      src={item.image || 'https://images.unsplash.com/photo-1563054499-93e7b62b4c60?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'}
                      alt={item.name}
                      className="w-full h-48 object-cover"
                    />
                    
                    {/* Badges */}
                    <div className="absolute top-2 left-2 flex flex-wrap gap-2">
                      {item.isPopular && (
                        <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
                          Popular
                        </span>
                      )}
                      {item.isSpicy && (
                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                          Spicy
                        </span>
                      )}
                      {item.isVegetarian && (
                        <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                          Veg
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-4">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2" style={{ fontFamily: 'Merriweather, serif' }}>
                      {item.name}
                    </h4>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2" style={{ fontFamily: 'Merriweather, serif' }}>
                      {item.description}
                    </p>
                    
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-primary-600 font-bold text-lg" style={{ fontFamily: 'Merriweather, serif' }}>
                        {formatPrice(item.price)}
                      </span>
                      <button 
                        onClick={() => addToCart(item, 1)}
                        className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 text-sm"
                        style={{ fontFamily: 'Merriweather, serif' }}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {!isSearching && !results.hasResults && searchTerm && (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-4">
              <div className="text-6xl mb-2">🔍</div>
              <p className="text-lg text-gray-700" style={{ fontFamily: 'Merriweather, serif' }}>
                No products found matching "{searchTerm}"
              </p>
              <p className="text-gray-600" style={{ fontFamily: 'Merriweather, serif' }}>
                Try adjusting your search or filters
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductSearch;
