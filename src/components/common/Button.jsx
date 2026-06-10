import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyle = "inline-flex items-center justify-center px-6 py-2.5 font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-sm hover:shadow-md";
  
  const variants = {
    primary: "bg-pesantren-green text-white hover:bg-pesantren-darkGreen focus:ring-pesantren-green",
    secondary: "bg-pesantren-red text-white hover:bg-red-700 focus:ring-pesantren-red",
    outline: "border-2 border-pesantren-green text-pesantren-green hover:bg-pesantren-green hover:text-white focus:ring-pesantren-green",
    accent: "bg-pesantren-yellow text-gray-900 hover:bg-yellow-500 focus:ring-pesantren-yellow",
  };

  return (
    <motion.button 
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseStyle} ${variants[variant]} ${className}`} 
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
