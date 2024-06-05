import './navbar.css';
import { NavLink, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
function NavBar() {
  const [text, setText1] = useState('Welcome to Tool Mec - Get upto 50% off');
  useEffect(() => {
    const intervalId = setInterval(() => {
      setText1(prevText =>
        prevText === 'Welcome to Tool Mec - Get upto 50% off'
          ? 'Pan India Free Shipping'
          : 'Welcome to Tool Mec - Get upto 50% off'
      );
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="shadow-md clearfix navbar">
      <div className="thirdcolor-bg">
        <div className="container mx-auto text-white text-xs py-1 text-center">
          <motion.p
            key={text} // Add a key based on the text value
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.8 }}
          >
            {text}
          </motion.p>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
