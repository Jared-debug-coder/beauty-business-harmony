
import React from 'react';
import { Bell, Search, User } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface HeaderProps {
  sidebarWidth: number;
}

const Header: React.FC<HeaderProps> = ({ sidebarWidth }) => {
  const location = useLocation();
  const pathName = location.pathname;
  const today = format(new Date(), 'EEEE, MMMM do, yyyy');

  // Get the page title based on the current path
  const getPageTitle = () => {
    if (pathName === '/') return 'Dashboard';
    return pathName.substring(1).charAt(0).toUpperCase() + pathName.slice(2);
  };

  return (
    <motion.header 
      className="h-16 bg-white shadow-subtle z-20 fixed top-0 right-0 left-0 ml-[250px] transition-all duration-300 px-6"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.3 }}
      style={{ marginLeft: `${sidebarWidth}px` }}
    >
      <div className="h-full flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-medium text-salon-800">{getPageTitle()}</h1>
          <span className="text-sm text-salon-500">{today}</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-salon-400" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="py-2 pl-10 pr-4 w-64 bg-salon-50 rounded-md text-sm text-salon-800 focus:outline-none focus:ring-2 focus:ring-accent-500"
            />
          </div>
          
          <button className={cn(
            "relative p-2 text-salon-600 hover:text-salon-800 rounded-md hover:bg-salon-100 transition-colors"
          )}>
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-accent-500 rounded-full"></span>
          </button>
          
          <div className="flex items-center space-x-2 pl-2 border-l border-salon-200">
            <div className="h-8 w-8 rounded-full bg-accent-100 flex items-center justify-center text-accent-600">
              <User className="h-5 w-5" />
            </div>
            <div className="text-sm">
              <p className="font-medium text-salon-800">Admin User</p>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
