import React, { useState } from 'react';
import { ShoppingBag, Menu, X, Search, User as UserIcon, LogOut } from 'lucide-react';
import { CartItem, User } from '../types';

interface NavbarProps {
  cart: CartItem[];
  toggleCart: () => void;
  user: User | null;
  onAuthClick: () => void;
  onLogout: () => void;
  onNavigate: (view: 'SHOP' | 'ORDERS' | 'PROFILE') => void;
}

const Navbar: React.FC<NavbarProps> = ({ cart, toggleCart, user, onAuthClick, onLogout, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleNavClick = (view: 'SHOP' | 'ORDERS' | 'PROFILE') => {
    onNavigate(view);
    setIsUserMenuOpen(false);
    setIsOpen(false);
    // If shop, scroll to filter bar
    if (view === 'SHOP') {
        setTimeout(() => document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' }), 100);
    }
  };

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-timeless-cream/90 backdrop-blur-md border-b border-timeless-gold/10 transition-all duration-500 shadow-sm">
        <div className="max-w-[1920px] mx-auto px-6 sm:px-12">
          <div className="flex justify-between items-center h-24">
            
            {/* Left: Mobile Menu & Desktop Links */}
            <div className="flex items-center flex-1">
              <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-timeless-dark p-2 -ml-2 hover:text-timeless-gold transition-colors">
                {isOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
              </button>
              
              <div className="hidden md:flex space-x-8 lg:space-x-12">
                <button onClick={() => handleNavClick('SHOP')} className="text-xs uppercase tracking-[0.2em] text-timeless-dark hover:text-timeless-gold transition-colors duration-300 font-bold">Shop</button>
                <button onClick={() => handleNavClick('SHOP')} className="text-xs uppercase tracking-[0.2em] text-timeless-dark hover:text-timeless-gold transition-colors duration-300 font-bold">Collections</button>
                <a href="#" className="text-xs uppercase tracking-[0.2em] text-timeless-dark hover:text-timeless-gold transition-colors duration-300 font-bold">About</a>
              </div>
            </div>

            {/* Center: Logo */}
            <div className="flex-shrink-0 flex items-center justify-center">
              <button onClick={() => handleNavClick('SHOP')} className="font-display text-3xl md:text-5xl tracking-widest text-timeless-dark cursor-pointer hover:opacity-80 transition-opacity">
                1985<span className="text-timeless-gold">.</span>
              </button>
            </div>

            {/* Right: Icons */}
            <div className="flex items-center justify-end flex-1 space-x-6 md:space-x-8">
              
              {/* User Menu */}
              <div className="relative">
                <button 
                  onClick={() => user ? setIsUserMenuOpen(!isUserMenuOpen) : onAuthClick()}
                  className="flex items-center outline-none group"
                >
                   {user?.profileImage ? (
                     <img src={user.profileImage} alt="User" className="w-8 h-8 rounded-full object-cover border-2 border-transparent group-hover:border-timeless-gold transition-all" />
                   ) : (
                     <UserIcon className={`w-5 h-5 text-timeless-dark group-hover:text-timeless-gold transition-colors ${user ? 'fill-timeless-dark/10' : ''}`} strokeWidth={1.5} />
                   )}
                   {user && <span className="hidden lg:block ml-3 text-xs font-bold uppercase tracking-wide text-timeless-dark group-hover:text-timeless-gold transition-colors">{user.name.split(' ')[0]}</span>}
                </button>

                {/* Dropdown for Logged in User */}
                {user && isUserMenuOpen && (
                  <div className="absolute top-full right-0 mt-4 w-56 bg-white shadow-xl border border-gray-100 py-2 animate-fade-in z-50">
                    <div className="px-5 py-3 border-b border-gray-50 bg-gray-50/50">
                      <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Signed in as</p>
                      <p className="text-xs font-serif font-bold truncate text-timeless-dark">{user.email}</p>
                    </div>
                    <button onClick={() => handleNavClick('ORDERS')} className="w-full text-left px-5 py-3 text-xs uppercase tracking-wider hover:bg-gray-50 hover:text-timeless-gold transition-colors">My Orders</button>
                    <button onClick={() => handleNavClick('PROFILE')} className="w-full text-left px-5 py-3 text-xs uppercase tracking-wider hover:bg-gray-50 hover:text-timeless-gold transition-colors">Profile Settings</button>
                    <button 
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        onLogout();
                      }} 
                      className="w-full text-left px-5 py-3 text-xs uppercase tracking-wider text-red-800 hover:bg-red-50 transition-colors flex items-center border-t border-gray-50 mt-1"
                    >
                      <LogOut size={14} className="mr-2" /> Sign Out
                    </button>
                  </div>
                )}
              </div>

              <button onClick={toggleCart} className="relative group">
                <ShoppingBag className="w-5 h-5 text-timeless-dark group-hover:text-timeless-gold transition-colors" strokeWidth={1.5} />
                {totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center w-4 h-4 text-[9px] font-bold text-white bg-timeless-gold rounded-full">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-40 bg-timeless-cream transform transition-transform duration-500 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:hidden pt-32 px-8`}>
        <div className="flex flex-col space-y-8 text-center">
          <button onClick={() => handleNavClick('SHOP')} className="text-2xl font-serif text-timeless-dark hover:text-timeless-gold italic">Shop Collection</button>
          <a href="#" className="text-2xl font-serif text-timeless-dark hover:text-timeless-gold italic">New Arrivals</a>
          <a href="#" className="text-2xl font-serif text-timeless-dark hover:text-timeless-gold italic">Our Story</a>
          <div className="w-12 h-[1px] bg-timeless-gold mx-auto my-4 opacity-50"></div>
          {user ? (
             <>
               <button onClick={() => handleNavClick('ORDERS')} className="text-xl font-serif text-timeless-dark hover:text-timeless-gold italic">My Orders</button>
               <button onClick={() => handleNavClick('PROFILE')} className="text-xl font-serif text-timeless-dark hover:text-timeless-gold italic">Profile</button>
               <button onClick={onLogout} className="text-lg font-serif text-red-800 italic mt-4">Sign Out</button>
             </>
          ) : (
             <button onClick={() => { setIsOpen(false); onAuthClick(); }} className="text-xl font-serif text-timeless-dark italic">Login / Register</button>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;