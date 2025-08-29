import React, { useState, useMemo } from 'react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';

interface ProductsProps {
  category: 'fruits' | 'vegetables' | 'all';
}

const Products: React.FC<ProductsProps> = ({ category: initialCategory }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const getCategoryTitle = () => {
    switch (selectedCategory) {
      case 'fruits':
        return 'Fresh Fruits';
      case 'vegetables':
        return 'Fresh Vegetables';
      default:
        return 'All Products';
    }
  };

  const getCategoryIcon = () => {
    switch (selectedCategory) {
      case 'fruits':
        return '🍎';
      case 'vegetables':
        return '🥕';
      default:
        return '🛒';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center space-x-3">
            <span className="text-5xl">{getCategoryIcon()}</span>
            <span>{getCategoryTitle()}</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our premium selection of fresh, organic produce sourced directly from local farms
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <CategoryFilter selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
          </div>
        </div>

        {/* Results Info */}
        <div className="flex justify-between items-center mb-6">
          <div>
            {searchTerm && (
              <p className="text-gray-600">
                Showing {filteredProducts.length} results for "{searchTerm}"
              </p>
            )}
          </div>
          <div className="text-sm text-gray-500">
            {filteredProducts.length} products found
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-12">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold text-gray-600 mb-2">No products found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Additional Info Section */}
        <div className="bg-gradient-to-r from-emerald-600 to-green-700 text-white rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Fresh Guarantee</h2>
          <p className="text-emerald-100 max-w-2xl mx-auto">
            We guarantee the freshness of all our products. If you're not 100% satisfied with your purchase, 
            we'll provide a full refund or replacement within 24 hours.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Products;