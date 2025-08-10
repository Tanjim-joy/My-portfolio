import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ResponsiveNav = () => {
  const [activeSection, setActiveSection] = useState('about');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size and update state
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Initial check
    checkScreenSize();
    
    // Add event listener
    window.addEventListener('resize', checkScreenSize);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
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
        padding: '0 clamp(1rem, 4vw, 2rem)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 'clamp(60px, 10vh, 80px)'
      }}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            fontSize: 'clamp(1.2rem, 4vw, 1.8rem)',
            fontWeight: 'bold',
            background: 'linear-gradient(90deg, #a855f7, #ec4899)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '0.5px'
          }}
        >
          Tangimul Haque
        </motion.div>

        {/* Desktop Navigation - hidden on mobile */}
        <div style={{
          display: isMobile ? 'none' : 'flex',
          gap: 'clamp(1rem, 3vw, 2.5rem)'
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
                fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
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

        {/* Mobile Menu Button - hidden on desktop */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          style={{
            display: isMobile ? 'block' : 'none',
            color: 'white',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '8px'
          }}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </motion.button>
      </div>

      {/* Mobile Menu - only shown on mobile when isMenuOpen is true */}
      {isMobile && isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            background: 'rgba(15, 23, 42, 0.95)',
            backdropFilter: 'blur(20px)',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            position: 'absolute',
            top: 'clamp(60px, 10vh, 80px)',
            width: '100%',
            zIndex: 999,
            borderTop: '1px solid rgba(139, 92, 246, 0.3)'
          }}
        >
          {navItems.map((item) => (
            <motion.button
              key={item}
              onClick={() => {
                scrollToSection(item);
                setIsMenuOpen(false);
              }}
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

export default ResponsiveNav;