import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const navbar = () => {
  const [activeSection, setActiveSection] = useState('about');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size on mount and resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
      setIsMenuOpen(false);
    }
  };

  const navItems = ['about', 'experience', 'education', 'skills', 'contact'];

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      width: '100%',
      background: 'rgba(15, 23, 42, 0.95)',
      backdropFilter: 'blur(20px)',
      zIndex: 1000,
      borderBottom: '1px solid rgba(139, 92, 246, 0.3)',
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.3)'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 1rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '70px'
      }}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            background: 'linear-gradient(90deg, #a855f7, #ec4899)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '0.5px'
          }}
        >
          Tangimul Haque
        </motion.div>

        {/* Desktop Navigation - shown on larger screens */}
        <div style={{
          display: isMobile ? 'none' : 'flex',
          gap: '1.5rem'
        }}>
          {navItems.map((item) => (
            <motion.button
              key={item}
              onClick={() => scrollToSection(item)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                position: 'relative',
                background: 'transparent',
                textTransform: 'capitalize',
                border: 'none',
                paddingBottom: '4px',
                color: activeSection === item ? '#a855f7' : '#cbd5e1',
                fontWeight: activeSection === item ? '600' : '400',
                fontSize: '1rem',
                cursor: 'pointer'
              }}
            >
              {item}
              {activeSection === item && (
                <motion.div
                  layoutId="active-pill"
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: 'linear-gradient(90deg, #a855f7, #ec4899)',
                    borderRadius: '1px'
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Mobile Menu Button - shown on smaller screens */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          style={{
            display: isMobile ? 'block' : 'none',
            color: 'white',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '0.5rem'
          }}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </motion.button>
      </div>

      {/* Mobile Menu - shown when menu is open */}
      {isMenuOpen && isMobile && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            background: 'rgba(15, 23, 42, 0.98)',
            backdropFilter: 'blur(20px)',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            position: 'absolute',
            top: '70px',
            width: '100%',
            zIndex: 999,
            borderTop: '1px solid rgba(139, 92, 246, 0.3)'
          }}
        >
          {navItems.map((item) => (
            <motion.button
              key={item}
              onClick={() => scrollToSection(item)}
              whileHover={{ x: 10 }}
              style={{
                padding: '1rem',
                background: activeSection === item ? 'rgba(139, 92, 246, 0.2)' : 'transparent',
                border: 'none',
                color: activeSection === item ? '#a855f7' : '#cbd5e1',
                textTransform: 'capitalize',
                fontSize: '1.1rem',
                textAlign: 'left',
                cursor: 'pointer',
                borderRadius: '4px'
              }}
            >
              {item}
            </motion.button>
          ))}
        </motion.div>
      )}
    </nav>
  );
};

export default navbar;