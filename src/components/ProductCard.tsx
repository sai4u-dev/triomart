import React from 'react';
import { Plus, ShoppingCart } from 'lucide-react';
import { Product, useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  size?: 'small' | 'large';
}

const ProductCard: React.FC<ProductCardProps> = ({ product, size = 'large' }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className={`bg-white rounded-xl shadow-md overflow-hidden group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
      size === 'small' ? 'w-48 flex-shrink-0' : 'w-full'
    }`}>
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className={`w-full object-cover group-hover:scale-110 transition-transform duration-500 ${
            size === 'small' ? 'h-32' : 'h-48'
          }`}
        />
        <div className="absolute top-2 right-2 bg-emerald-600 text-white px-2 py-1 rounded-full text-xs font-medium">
          {product.category === 'fruits' ? '🍎' : '🥕'} {product.category}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className={`font-semibold text-gray-800 mb-2 ${size === 'small' ? 'text-sm' : 'text-lg'}`}>
          {product.name}
        </h3>
        <p className={`text-gray-600 mb-3 line-clamp-2 ${size === 'small' ? 'text-xs' : 'text-sm'}`}>
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <span className={`font-bold text-emerald-600 ${size === 'small' ? 'text-lg' : 'text-xl'}`}>
            ${product.price}
          </span>
          <button
            onClick={handleAddToCart}
            className="bg-emerald-600 hover:bg-emerald-700 text-white p-2 rounded-lg transition-colors duration-200 flex items-center space-x-1 group"
          >
            <Plus className="h-4 w-4 group-hover:rotate-90 transition-transform duration-200" />
            <ShoppingCart className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;