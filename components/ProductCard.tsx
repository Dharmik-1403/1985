import React from 'react';
import { Plus } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  addToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, addToCart }) => {
  return (
    <div className="group cursor-pointer">
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-4">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
        />
        
        {/* Badges */}
        {product.isAnime && (
          <span className="absolute top-4 left-4 bg-white/90 backdrop-blur text-timeless-dark text-[10px] uppercase font-bold px-3 py-1 tracking-widest">
            Limited
          </span>
        )}

        {/* Hover Action */}
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
             <button 
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(product);
                }}
                className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 bg-white text-timeless-dark px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-timeless-gold hover:text-white"
             >
               Quick Add
             </button>
        </div>
      </div>

      {/* Details */}
      <div className="text-center">
        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">{product.brand}</h3>
        <h2 className="text-base font-serif text-timeless-dark mb-1 group-hover:text-timeless-gold transition-colors truncate">
          {product.name}
        </h2>
        <p className="text-sm font-medium text-timeless-charcoal">
          ₹{product.price.toLocaleString('en-IN')}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;