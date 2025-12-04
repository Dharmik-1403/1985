import React from 'react';
import { FilterState } from '../types';
import { Search } from 'lucide-react';

interface FilterSidebarProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  categories: string[];
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ filters, setFilters, categories }) => {
  
  const handleCategoryChange = (cat: string) => {
    setFilters(prev => ({ ...prev, category: prev.category === cat ? '' : cat }));
  };

  return (
    <div className="sticky top-24 z-30 w-full bg-timeless-cream/95 backdrop-blur-sm border-b border-timeless-gold/20 py-4 mb-8 transition-all duration-300">
      <div className="max-w-[1920px] mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          
          {/* Left: Categories (Horizontal Scroll) */}
          <div className="w-full lg:w-auto overflow-x-auto no-scrollbar">
            <ul className="flex items-center justify-center lg:justify-start gap-8 min-w-max px-2">
              <li 
                className={`cursor-pointer text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 border-b-2 py-2 ${
                  filters.category === '' 
                    ? 'text-timeless-dark border-timeless-gold' 
                    : 'text-gray-400 border-transparent hover:text-timeless-gold'
                }`}
                onClick={() => setFilters(prev => ({ ...prev, category: '' }))}
              >
                View All
              </li>
              {categories.map((cat) => (
                <li 
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`cursor-pointer text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 border-b-2 py-2 ${
                    filters.category === cat 
                      ? 'text-timeless-dark border-timeless-gold' 
                      : 'text-gray-400 border-transparent hover:text-timeless-gold'
                  }`}
                >
                  {cat}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Tools (Search & Price) */}
          <div className="w-full lg:w-auto flex flex-col sm:flex-row items-center justify-center lg:justify-end gap-6 px-2">
            
            {/* Price Slider */}
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400 whitespace-nowrap">
                Max Price: ₹{filters.maxPrice.toLocaleString('en-IN')}
              </span>
              <input 
                type="range" 
                min="1000" 
                max="25000" 
                step="1000" 
                value={filters.maxPrice} 
                onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: Number(e.target.value) }))}
                className="w-full sm:w-32 h-[2px] bg-gray-300 rounded-lg appearance-none cursor-pointer accent-timeless-dark hover:accent-timeless-gold"
              />
            </div>

            {/* Search Bar */}
            <div className="relative w-full sm:w-64 group">
              <input 
                type="text" 
                placeholder="SEARCH COLLECTION..." 
                value={filters.search}
                onChange={(e) => setFilters(prev => ({...prev, search: e.target.value}))}
                className="w-full bg-transparent border-b border-gray-300 py-2 pl-2 pr-8 text-xs font-bold text-timeless-dark placeholder-gray-400 focus:outline-none focus:border-timeless-gold transition-colors uppercase tracking-wider"
              />
              <Search className="absolute right-0 top-2 w-4 h-4 text-gray-400 group-focus-within:text-timeless-gold transition-colors" />
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;