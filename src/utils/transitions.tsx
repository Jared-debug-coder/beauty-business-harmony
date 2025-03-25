
import { motion } from 'framer-motion';
import React from 'react';

type PageTransitionProps = {
  children: React.ReactNode;
};

// Page transition wrapper
export const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="h-full"
    >
      {children}
    </motion.div>
  );
};

// Card hover animation
export const CardHover: React.FC<PageTransitionProps> = ({ children }) => {
  return (
    <motion.div
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="h-full"
    >
      {children}
    </motion.div>
  );
};

// Staggered list item animation
type StaggeredListProps = {
  children: React.ReactNode;
  delay?: number;
};

export const StaggeredList: React.FC<StaggeredListProps> = ({ 
  children, 
  delay = 0.05 
}) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        visible: { 
          transition: { 
            staggerChildren: delay 
          } 
        },
        hidden: {}
      }}
    >
      {children}
    </motion.div>
  );
};

export const ListItem = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      variants={{
        visible: { 
          opacity: 1, 
          y: 0,
          transition: { duration: 0.4, ease: "easeOut" }
        },
        hidden: { opacity: 0, y: 20 }
      }}
    >
      {children}
    </motion.div>
  );
};

// Modal animation
export const modalVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { duration: 0.2, ease: "easeOut" }
  },
  exit: { 
    opacity: 0, 
    scale: 0.95, 
    transition: { duration: 0.15, ease: "easeIn" }
  }
};

// Fade animations
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } }
};

export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};
