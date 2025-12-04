import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import FilterSidebar from './components/FilterSidebar';
import GeminiStylist from './components/GeminiStylist';
import AuthModal from './components/AuthModal';
import UserDashboard from './components/UserDashboard';
import { generateProducts } from './services/productService';
import { Product, CartItem, FilterState, Category, User } from './types';
import { X, ArrowRight, Minus, Plus, ExternalLink, ShoppingBag } from 'lucide-react';

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Auth State
  const [user, setUser] = useState<User | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  
  // Navigation State
  const [view, setView] = useState<'SHOP' | 'ORDERS' | 'PROFILE'>('SHOP');
  
  const [filters, setFilters] = useState<FilterState>({
    category: '',
    minPrice: 0,
    maxPrice: 25000,
    search: '',
    brands: []
  });

  useEffect(() => {
    const loadData = async () => {
      setTimeout(() => {
        const data = generateProducts();
        setProducts(data);
        setLoading(false);
      }, 800);
    };
    loadData();

    // Check for existing session (simulated)
    const storedUser = localStorage.getItem('timeless_current_session');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLoginSuccess = (loggedInUser: User) => {
    setUser(loggedInUser);
    localStorage.setItem('timeless_current_session', JSON.stringify(loggedInUser));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('timeless_current_session');
    setView('SHOP'); // Reset view on logout
  };

  const handleUserUpdate = (updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem('timeless_current_session', JSON.stringify(updatedUser));
  };

  const handleNavigate = (newView: 'SHOP' | 'ORDERS' | 'PROFILE') => {
    if ((newView === 'ORDERS' || newView === 'PROFILE') && !user) {
      setIsAuthOpen(true);
      return;
    }
    setView(newView);
    window.scrollTo(0, 0);
  };

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = filters.category ? product.category === filters.category : true;
      const matchesPrice = product.price <= filters.maxPrice;
      const matchesSearch = product.name.toLowerCase().includes(filters.search.toLowerCase()) || 
                            product.brand.toLowerCase().includes(filters.search.toLowerCase());
      return matchesCategory && matchesPrice && matchesSearch;
    });
  }, [products, filters]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(0, item.quantity + delta) };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const categories = Object.values(Category);

  return (
    <div className="min-h-screen bg-timeless-cream font-sans">
      <Navbar 
        cart={cart} 
        toggleCart={() => setIsCartOpen(true)} 
        user={user}
        onAuthClick={() => setIsAuthOpen(true)}
        onLogout={handleLogout}
        onNavigate={handleNavigate}
      />

      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
        onLoginSuccess={handleLoginSuccess}
      />

      {view === 'SHOP' ? (
        <>
          {/* Hero Section */}
          <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 bg-gray-900">
              <img 
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop" 
                className="w-full h-full object-cover opacity-60"
                alt="Editorial Fashion"
              />
            </div>
            <div className="relative z-10 text-center text-white px-4 animate-slide-up">
              <p className="text-sm md:text-base uppercase tracking-[0.3em] mb-4 text-timeless-gold">Est. 1985</p>
              <h1 className="font-display text-5xl md:text-8xl mb-8 tracking-wide">
                Timeless<span className="text-timeless-gold">.</span>
              </h1>
              <div className="space-y-4">
                <p className="font-serif italic text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto mb-10">
                  "Fashion fades, only style remains the same."
                </p>
                <button 
                  onClick={() => document.getElementById('shop')?.scrollIntoView({behavior: 'smooth'})}
                  className="border border-white px-10 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-timeless-dark transition-all duration-300"
                >
                  Explore Collection
                </button>
              </div>
            </div>
          </section>

          {/* Main Shop Area */}
          <main id="shop" className="max-w-[1920px] mx-auto px-6 sm:px-12 py-12">
            
            {/* Filter Bar (Horizontal) - Replaces the sidebar layout */}
            <FilterSidebar filters={filters} setFilters={setFilters} categories={categories} />

            {/* Product Grid - Full Width */}
            <div className="mt-8">
              <div className="flex justify-between items-end mb-12">
                <h2 className="font-serif text-3xl md:text-4xl text-timeless-dark">
                  {filters.category || 'Latest Arrivals'}
                </h2>
                <span className="text-xs font-mono text-gray-400">{filteredProducts.length} PRODUCTS</span>
              </div>

              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="aspect-[3/4] bg-gray-200 animate-pulse"></div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
                  {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} addToCart={addToCart} />
                  ))}
                  {filteredProducts.length === 0 && (
                    <div className="col-span-full py-32 text-center">
                      <p className="font-serif text-2xl italic text-gray-400">No products found matching your selection.</p>
                      <button 
                          onClick={() => setFilters(prev => ({...prev, category: '', search: '', maxPrice: 25000}))}
                          className="mt-4 text-xs uppercase font-bold tracking-widest text-timeless-dark border-b border-timeless-dark pb-1"
                      >
                        Clear Filters
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </main>
        </>
      ) : (
        /* User Dashboard View */
        user && (
          <UserDashboard 
            user={user} 
            currentTab={view === 'ORDERS' ? 'ORDERS' : 'PROFILE'}
            onUpdateUser={handleUserUpdate}
            onTabChange={(tab) => handleNavigate(tab)}
          />
        )
      )}

      {/* Cart Drawer */}
      <div 
        className={`fixed inset-0 z-[60] transition-opacity duration-300 ${isCartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsCartOpen(false)}></div>
        <div className={`absolute inset-y-0 right-0 max-w-md w-full bg-white shadow-2xl transform transition-transform duration-500 ease-out flex flex-col ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="flex items-center justify-between p-8 border-b border-gray-100">
              <h2 className="font-display text-2xl text-timeless-dark">Shopping Bag</h2>
              <button onClick={() => setIsCartOpen(false)} className="text-gray-400 hover:text-timeless-dark transition-colors">
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-8 space-y-8">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
                   <ShoppingBag size={48} strokeWidth={1} />
                   <p className="font-serif italic text-lg">Your bag is currently empty.</p>
                   <button onClick={() => setIsCartOpen(false)} className="text-xs font-bold uppercase tracking-widest text-timeless-dark underline">Continue Shopping</button>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex gap-6">
                    <div className="w-24 aspect-[3/4] bg-gray-100 flex-shrink-0">
                       <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="font-serif text-lg text-timeless-dark leading-tight pr-4">{item.name}</h4>
                          <button onClick={() => updateQuantity(item.id, -item.quantity)} className="text-gray-300 hover:text-red-500">
                            <X size={16} />
                          </button>
                        </div>
                        <p className="text-xs uppercase tracking-wider text-gray-500 mt-1">{item.brand}</p>
                      </div>
                      
                      <div className="flex justify-between items-end">
                         <div className="flex items-center border border-gray-200">
                           <button onClick={() => updateQuantity(item.id, -1)} className="p-2 hover:bg-gray-50 text-gray-500">
                             <Minus size={12} />
                           </button>
                           <span className="w-8 text-center text-xs font-medium">{item.quantity}</span>
                           <button onClick={() => updateQuantity(item.id, 1)} className="p-2 hover:bg-gray-50 text-gray-500">
                             <Plus size={12} />
                           </button>
                         </div>
                         <span className="font-medium text-timeless-dark">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-8 border-t border-gray-100 bg-gray-50">
                <div className="flex justify-between mb-6 text-timeless-dark">
                  <span className="text-sm uppercase tracking-widest">Subtotal</span>
                  <span className="font-serif text-xl">₹{cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toLocaleString('en-IN')}</span>
                </div>
                <p className="text-xs text-gray-400 mb-6 text-center">Shipping & taxes calculated at checkout.</p>
                <button className="w-full bg-timeless-dark text-white py-4 text-xs font-bold tracking-[0.2em] hover:bg-timeless-gold transition-colors duration-300 uppercase">
                  Proceed to Checkout
                </button>
              </div>
            )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-timeless-dark text-white pt-20 pb-10">
        <div className="max-w-[1920px] mx-auto px-6 sm:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 border-b border-gray-800 pb-16">
          <div className="md:col-span-4">
            <h3 className="font-display text-3xl mb-6 tracking-wide">1985<span className="text-timeless-gold">.</span></h3>
            <p className="text-gray-400 font-serif italic text-lg leading-relaxed max-w-md">
              Curating exclusive fashion since 1985. We believe in quality, heritage, and the timeless elegance of the old money aesthetic.
            </p>
          </div>
          
          <div className="md:col-span-2 md:col-start-7">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-6">Shop</h4>
            <ul className="space-y-4 text-sm text-gray-300">
              <li><button onClick={() => handleNavigate('SHOP')} className="hover:text-timeless-gold transition-colors text-left">New Arrivals</button></li>
              <li><a href="#" className="hover:text-timeless-gold transition-colors">Shoes</a></li>
              <li><a href="#" className="hover:text-timeless-gold transition-colors">Hoodies</a></li>
              <li><a href="#" className="hover:text-timeless-gold transition-colors">Accessories</a></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-6">Support</h4>
            <ul className="space-y-4 text-sm text-gray-300">
              <li><a href="#" className="hover:text-timeless-gold transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-timeless-gold transition-colors">Shipping</a></li>
              <li><a href="#" className="hover:text-timeless-gold transition-colors">Returns</a></li>
              <li><a href="#" className="hover:text-timeless-gold transition-colors">Contact Us</a></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-6">Social</h4>
            <ul className="space-y-4 text-sm text-gray-300">
              <li><a href="#" className="hover:text-timeless-gold transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-timeless-gold transition-colors">Twitter</a></li>
              <li><a href="#" className="hover:text-timeless-gold transition-colors">Pinterest</a></li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-[1920px] mx-auto px-6 sm:px-12 pt-10 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600">
          <p>&copy; 2024 1985-Timeless. All rights reserved.</p>
          <a href="https://gemini.google.com" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-white transition-colors mt-4 md:mt-0">
            Powered by Google Gemini <ExternalLink size={12} className="ml-2" />
          </a>
        </div>
      </footer>

      <GeminiStylist />
    </div>
  );
};

export default App;