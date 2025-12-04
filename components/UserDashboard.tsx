import React from 'react';
import { User } from '../types';
import OrderHistory from './OrderHistory';
import ProfileEditor from './ProfileEditor';
import { ShoppingBag, User as UserIcon } from 'lucide-react';

interface UserDashboardProps {
  user: User;
  currentTab: 'ORDERS' | 'PROFILE';
  onUpdateUser: (user: User) => void;
  onTabChange: (tab: 'ORDERS' | 'PROFILE') => void;
}

const UserDashboard: React.FC<UserDashboardProps> = ({ user, currentTab, onUpdateUser, onTabChange }) => {
  return (
    <div className="max-w-[1920px] mx-auto px-6 sm:px-12 py-32 animate-fade-in">
       <div className="flex flex-col md:flex-row gap-16">
         
         {/* Dashboard Sidebar - Sticky */}
         <div className="w-full md:w-72 flex-shrink-0">
           <div className="sticky top-32 space-y-8">
             
             {/* Profile Card */}
             <div className="text-center p-8 bg-white shadow-sm border border-gray-100">
                <div className="w-24 h-24 mx-auto rounded-full bg-timeless-cream border-2 border-timeless-gold p-1 mb-4">
                   <div className="w-full h-full rounded-full overflow-hidden bg-gray-200">
                     {user.profileImage ? (
                       <img src={user.profileImage} alt="Profile" className="w-full h-full object-cover" />
                     ) : (
                       <div className="w-full h-full flex items-center justify-center bg-timeless-dark text-white text-3xl font-display">
                         {user.name.charAt(0)}
                       </div>
                     )}
                   </div>
                </div>
                <h3 className="font-display text-xl text-timeless-dark mb-1">{user.name}</h3>
                <p className="font-serif italic text-xs text-gray-500">{user.email}</p>
             </div>

             {/* Navigation */}
             <div className="space-y-1">
               <button 
                 onClick={() => onTabChange('ORDERS')}
                 className={`w-full flex items-center px-6 py-4 text-xs font-bold uppercase tracking-[0.15em] transition-all duration-300 border-l-2 ${
                   currentTab === 'ORDERS' 
                     ? 'border-timeless-gold bg-white text-timeless-dark shadow-sm' 
                     : 'border-transparent text-gray-400 hover:text-timeless-dark hover:bg-white/50'
                 }`}
               >
                 <ShoppingBag size={14} className="mr-3" /> My Orders
               </button>
               <button 
                 onClick={() => onTabChange('PROFILE')}
                 className={`w-full flex items-center px-6 py-4 text-xs font-bold uppercase tracking-[0.15em] transition-all duration-300 border-l-2 ${
                   currentTab === 'PROFILE' 
                     ? 'border-timeless-gold bg-white text-timeless-dark shadow-sm' 
                     : 'border-transparent text-gray-400 hover:text-timeless-dark hover:bg-white/50'
                 }`}
               >
                 <UserIcon size={14} className="mr-3" /> Account Details
               </button>
             </div>
           </div>
         </div>

         {/* Content Area */}
         <div className="flex-1 min-h-[600px] border-l border-gray-100 md:pl-16">
           {currentTab === 'ORDERS' && <OrderHistory userId={user.id} />}
           {currentTab === 'PROFILE' && <ProfileEditor user={user} onUpdate={onUpdateUser} />}
         </div>
       </div>
    </div>
  );
};

export default UserDashboard;