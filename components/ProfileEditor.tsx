import React, { useState, useRef } from 'react';
import { User } from '../types';
import { updateUser } from '../services/authService';
import { Camera, Save, Loader2, User as UserIcon, Mail, Edit2 } from 'lucide-react';

interface ProfileEditorProps {
  user: User;
  onUpdate: (user: User) => void;
}

const ProfileEditor: React.FC<ProfileEditorProps> = ({ user, onUpdate }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        onUpdate({ ...user, profileImage: base64String });
        updateUser({ ...user, profileImage: base64String });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const updatedUser = { ...user, name, email };
      await updateUser(updatedUser);
      onUpdate(updatedUser);
      setMessage('Profile updated successfully.');
    } catch (error) {
      setMessage('Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl animate-fade-in">
       <div className="flex items-end justify-between border-b border-timeless-dark pb-6 mb-12">
          <h2 className="font-display text-3xl text-timeless-dark">Account Settings</h2>
          <span className="font-mono text-xs text-gray-500">PERSONAL DETAILS</span>
       </div>

       <div className="flex flex-col md:flex-row gap-16 items-start">
         
         {/* Photo Section */}
         <div className="w-full md:w-auto flex flex-col items-center">
            <div className="relative w-40 h-40 mb-6 group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
              <div className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-xl bg-gray-100">
                {user.profileImage ? (
                  <img src={user.profileImage} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-timeless-dark text-white text-4xl font-display">
                    {user.name.charAt(0)}
                  </div>
                )}
              </div>
              <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-[2px]">
                <Camera className="text-white" size={24} />
              </div>
            </div>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*"
              onChange={handleImageUpload}
            />
            <button 
              type="button" 
              onClick={() => fileInputRef.current?.click()}
              className="text-[10px] uppercase font-bold tracking-[0.2em] text-gray-400 hover:text-timeless-gold transition-colors"
            >
              Update Photo
            </button>
         </div>

         {/* Form Section */}
         <form onSubmit={handleSubmit} className="flex-1 w-full space-y-10">
            {message && (
              <div className={`p-4 text-xs text-center font-bold uppercase tracking-wider ${message.includes('Success') ? 'bg-green-50 text-green-800 border border-green-100' : 'bg-red-50 text-red-800 border border-red-100'}`}>
                {message}
              </div>
            )}

            <div className="group">
              <label className="block text-[10px] uppercase font-bold tracking-[0.2em] text-gray-400 mb-2 group-focus-within:text-timeless-gold transition-colors">
                Full Name
              </label>
              <div className="relative">
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-transparent border-b border-gray-300 py-3 text-lg font-serif text-timeless-dark focus:outline-none focus:border-timeless-gold transition-all"
                  placeholder="Enter your name"
                />
                <Edit2 size={14} className="absolute right-0 top-4 text-gray-300" />
              </div>
            </div>

            <div className="group">
              <label className="block text-[10px] uppercase font-bold tracking-[0.2em] text-gray-400 mb-2 group-focus-within:text-timeless-gold transition-colors">
                Email Address
              </label>
              <div className="relative">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-b border-gray-300 py-3 text-lg font-serif text-timeless-dark focus:outline-none focus:border-timeless-gold transition-all"
                  placeholder="Enter your email"
                />
                <Mail size={14} className="absolute right-0 top-4 text-gray-300" />
              </div>
            </div>

            <div className="pt-8">
              <button 
                type="submit" 
                disabled={loading}
                className="px-10 py-4 bg-timeless-dark text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-timeless-gold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? <Loader2 size={16} className="animate-spin" /> : <><Save size={16} className="mr-3" /> Save Changes</>}
              </button>
            </div>
         </form>
       </div>
    </div>
  );
};

export default ProfileEditor;