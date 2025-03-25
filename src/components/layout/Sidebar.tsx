
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calendar, 
  Scissors, 
  Users, 
  ShoppingBag, 
  BarChart2, 
  Settings,
  Menu,
  X,
  UserCircle,
  Package
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const sidebarItems = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Appointments', path: '/appointments', icon: Calendar },
  { name: 'Services', path: '/services', icon: Scissors },
  { name: 'Employees', path: '/employees', icon: Users },
  { name: 'Customers', path: '/customers', icon: UserCircle },
  { name: 'Inventory', path: '/inventory', icon: Package },
  { name: 'Sales & Reports', path: '/sales', icon: BarChart2 },
  { name: 'Settings', path: '/settings', icon: Settings, position: 'bottom' }
];

const Sidebar = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <AnimatePresence initial={false}>
      <motion.div
        className={cn(
          "fixed left-0 top-0 h-full bg-sidebar z-30 shadow-xl flex flex-col transition-all duration-300",
          isCollapsed ? "w-[70px]" : "w-[250px]"
        )}
        animate={{ width: isCollapsed ? 70 : 250 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {/* Sidebar Header */}
        <div className="p-4 flex items-center justify-between border-b border-sidebar-border">
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-sidebar-foreground font-semibold text-xl"
            >
              BeautySalon
            </motion.div>
          )}
          <button 
            onClick={toggleSidebar}
            className="p-1 rounded-md text-sidebar-foreground hover:bg-sidebar-accent"
          >
            {isCollapsed ? <Menu size={20} /> : <X size={20} />}
          </button>
        </div>

        {/* Sidebar Navigation */}
        <div className="flex-1 overflow-y-auto py-4 flex flex-col justify-between">
          <div className="space-y-1 px-2">
            {sidebarItems.filter(item => item.position !== 'bottom').map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "sidebar-item",
                  location.pathname === item.path 
                    ? "sidebar-item-active" 
                    : "sidebar-item-inactive"
                )}
              >
                <item.icon className="h-5 w-5" />
                {!isCollapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {item.name}
                  </motion.span>
                )}
              </Link>
            ))}
          </div>

          <div className="mt-auto space-y-1 px-2">
            {sidebarItems.filter(item => item.position === 'bottom').map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "sidebar-item",
                  location.pathname === item.path 
                    ? "sidebar-item-active" 
                    : "sidebar-item-inactive"
                )}
              >
                <item.icon className="h-5 w-5" />
                {!isCollapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {item.name}
                  </motion.span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Sidebar;
