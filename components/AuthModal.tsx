import React, { useState } from 'react';
import { X, ArrowRight, Loader2 } from 'lucide-react';
import { loginUser, registerUser } from '../services/authService';
import { User } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: User) => void;
}

type AuthMode = 'LOGIN' | 'SIGNUP';

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [mode, setMode] = useState<AuthMode>('LOGIN');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let user: User;
      if (mode === 'LOGIN') {
        user = await loginUser(email, password);
      } else {
        if (!name) throw new Error("Name is required.");
        user = await registerUser(name, email, password);
      }
      onLoginSuccess(user);
      onClose();
    } catch (err: any) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-timeless-dark/80 backdrop-blur-md transition-opacity duration-500"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-md bg-white border border-gray-100 shadow-2xl overflow-hidden animate-slide-up">
        
        {/* Decorative Top Line */}
        <div className="h-1 w-full bg-timeless-gold"></div>

        {/* Header */}
        <div className="relative p-10 pb-2 text-center">
           <button onClick={onClose} className="absolute right-4 top-4 text-gray-400 hover:text-timeless-dark transition-colors">
             <X size={20} strokeWidth={1.5} />
           </button>
           <h2 className="font-display text-4xl text-timeless-dark mb-3 tracking-wide">
             1985<span className="text-timeless-gold">.</span>
           </h2>
           <p className="font-serif italic text-gray-500 text-lg">
             {mode === 'LOGIN' ? 'Welcome back, member.' : 'Begin your legacy.'}
           </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-10 space-y-8">
          {error && (
            <div className="p-4 bg-red-50 border-l-2 border-red-500 text-red-700 text-xs text-center font-bold tracking-wide">
              {error}
            </div>
          )}

          {mode === 'SIGNUP' && (
            <div className="group">
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-transparent border-b border-gray-300 py-2 text-sm focus:outline-none focus:border-timeless-gold transition-colors placeholder-transparent peer"
                placeholder="Name"
                id="name"
              />
              <label htmlFor="name" className="absolute text-[10px] uppercase font-bold tracking-widest text-gray-400 -mt-12 transition-all peer-placeholder-shown:-mt-8 peer-placeholder-shown:text-gray-300 peer-focus:-mt-12 peer-focus:text-timeless-gold">Full Name</label>
            </div>
          )}

          <div className="group relative">
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent border-b border-gray-300 py-2 text-sm focus:outline-none focus:border-timeless-gold transition-colors placeholder-transparent peer"
              placeholder="Email"
              id="email"
            />
            <label htmlFor="email" className="absolute top-0 left-0 text-[10px] uppercase font-bold tracking-widest text-gray-400 -mt-5 transition-all peer-placeholder-shown:mt-2 peer-placeholder-shown:text-gray-300 peer-focus:-mt-5 peer-focus:text-timeless-gold">Email Address</label>
          </div>

          <div className="group relative">
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent border-b border-gray-300 py-2 text-sm focus:outline-none focus:border-timeless-gold transition-colors placeholder-transparent peer"
              placeholder="Password"
              id="password"
            />
            <label htmlFor="password" className="absolute top-0 left-0 text-[10px] uppercase font-bold tracking-widest text-gray-400 -mt-5 transition-all peer-placeholder-shown:mt-2 peer-placeholder-shown:text-gray-300 peer-focus:-mt-5 peer-focus:text-timeless-gold">Password</label>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-timeless-dark text-white py-5 text-xs font-bold uppercase tracking-[0.25em] hover:bg-timeless-gold transition-colors duration-500 flex items-center justify-center space-x-2 disabled:opacity-70"
          >
            {loading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <>
                <span>{mode === 'LOGIN' ? 'Sign In' : 'Register'}</span>
                <ArrowRight size={14} />
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="bg-gray-50 p-6 text-center border-t border-gray-100">
          <button 
            onClick={() => {
              setMode(mode === 'LOGIN' ? 'SIGNUP' : 'LOGIN');
              setError('');
            }}
            className="text-xs font-bold text-gray-400 uppercase tracking-widest hover:text-timeless-gold transition-colors"
          >
            {mode === 'LOGIN' ? "Create an account" : "Back to Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;