
import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './Sidebar';
import Header from './Header';

const AppLayout: React.FC = () => {
  const [sidebarWidth, setSidebarWidth] = useState(250);
  
  // Update sidebar width when it's collapsed/expanded
  const handleSidebarWidthChange = (width: number) => {
    setSidebarWidth(width);
  };

  return (
    <div className="h-full bg-salon-50">
      <Sidebar onWidthChange={handleSidebarWidthChange} />
      <Header sidebarWidth={sidebarWidth} />
      
      <AnimatePresence mode="wait">
        <main 
          className="pt-24 pb-8 px-6 min-h-screen transition-all duration-300"
          style={{ marginLeft: `${sidebarWidth}px` }}
        >
          <Outlet />
        </main>
      </AnimatePresence>
    </div>
  );
};

export default AppLayout;
