import React, { useState, useEffect, use } from 'react';
import { Database, User, Briefcase, Code, GraduationCap, Mail, Phone, MapPin, Github, Linkedin, Calendar, Award, MessageSquare, ArrowRight, CheckCircle, Sparkles, Star, BookOpen, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';
import profileImage from './assets/2.png'; // Adjust the path as necessary

const startdate = new Date(2023, 3, 11);
const presentDate = new Date();
const diffInMs = presentDate - startdate;
const diffInDays = diffInMs / (1000 * 60 * 60 * 24 * 365.25);
const years = diffInDays.toFixed(1);



const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('about');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size on mount and resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const contaninerStyle = {
    display : 'grid', 
    gridTemplateColumns: isMobile ? 'repeat(auto-fit, minmax(350px, 1fr))'  : 'repeat(auto-fit, minmax(650px, 1fr))' , 
  }

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'experience', 'education', 'skills', 'contact'];
      const scrollPosition = window.scrollY + 100;
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const skills = [
    { name: 'HTML5', level: 95, category: 'Frontend' },
    { name: 'CSS3', level: 95, category: 'Frontend' },
    { name: 'Bootstrap', level: 95, category: 'Frontend' },
    { name: 'JavaScript', level: 80, category: 'Frontend' },
    { name: 'jQuery', level: 80, category: 'Frontend' },
    { name: 'React', level: 50, category: 'Frontend' },
    { name: 'Redux', level: 50, category: 'Frontend' },
    { name: 'AJAX', level: 85, category: 'Frontend' },
    { name: 'JSON', level: 85, category: 'Frontend' },
    { name: 'PHP', level: 85, category: 'Backend' },
    { name: 'Node.js', level: 70, category: 'Backend' },
    { name: 'Express', level: 70, category: 'Backend' },
    { name: 'C#', level: 90, category: 'Backend' },
    { name: 'ASP.NET Core', level: 85, category: 'Backend' },
    { name: 'API Development', level: 85, category: 'Backend' },
    { name: 'MySQL', level: 90, category: 'Database' },
    { name: 'SQL', level: 90, category: 'Database' },
    { name: 'Git', level: 88, category: 'DevOps' },
    { name: 'Docker', level: 25, category: 'DevOps' },
    { name: 'System Design & Architecture', level: 82, category: 'Architecture' },
    { name: 'Requirements Engineering', level: 90, category: 'Process' },
  ];

  const experiences = [
    {
      title: 'Deputy Assistant Director',
      company: 'WALTON Hi-Tech Industries PLC',
      period: 'Present',
      description: 'Leading the Manufacturing Automations team in developing robust, scalable web applications that drive operational efficiency and digital transformation in manufacturing processes.',
      achievements: [
        'Developed desktop applications for label printing and packing using C#, .NET, and WPF, streamlining production and logistics operations',
        'Designed and implemented enterprise-level web applications using ASP.NET Core and C#',
        'Led cross-functional teams to deliver complex projects on time and within budget',
        'Designed automation systems optimizing business workflows in large-scale industrial environments',
        'Built and maintained large-scale, data-intensive web applications with focus on performance and security',
        'Engaged directly with stakeholders to gather and translate business requirements into system designs'
      ],
      type: 'leadership'
    },
    {
      title: 'Web Application Developer',
      company: 'WALTON Hi-Tech Industries PLC',
      period: '2022 - Present',
      description: 'Developed business-critical web applications supporting manufacturing operations with focus on scalability and efficiency.',
      achievements: [
        'Implemented enterprise-level solutions using PHP, C# & .NET and database technologies',
        'Led API development projects integrating multiple internal systems',
        'Improved system performance by 40% through code optimization and database tuning'
      ],
      type: 'development'
    }
  ];

  const education = [
    {
      degree: 'Bachelor of Science in Computer Science & Engineering',
      institution: 'City University Bangladesh',
      period: '2018 - 2022',
      grade: 'CGPA: 2.97/4.00',
      type: 'undergraduate'
    },
    {
      degree: 'Diploma in Telecommunication Engineering',
      institution: 'Institute of Information Technology Bogura',
      period: '2011 - 2015',
      grade: 'CGPA: 3.06/4.00',
      type: 'Diploma'
    },
    {
      degree: 'General Secondary Certificate (Electrical)',
      institution: 'Technical Secondary School & College Chapainawabganj',
      period: '2010',
      grade: 'GPA: 3.82/5.00',
      type: 'SSC'
    },
    {
      degree: 'Web Application Development Using ASP.NET',
      institution: 'IsDB-BISEW IT Scholarship Program',
      period: '2021',
      grade: 'Completed',
      type: 'Certification'
    }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 25%, #3730a3 50%, #0f172a 100%)',
      color: 'white',
      fontFamily: "'Inter', sans-serif",
      overflowX: 'hidden'
    }}>
      {/* Animated Background Elements */}
      <div
        style={{
          position: 'fixed',
          top: mousePosition.y / 50,
          left: mousePosition.x / 50,
          width: 'clamp(100px, 20vw, 200px)',
          height: 'clamp(100px, 20vw, 200px)',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />
      <div
        style={{
          position: 'fixed',
          bottom: mousePosition.y / 40,
          right: mousePosition.x / 40,
          width: 'clamp(80px, 15vw, 150px)',
          height: 'clamp(80px, 15vw, 150px)',
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      {/* Navigation */}
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

          {/* Desktop Navigation */}
          <div style={{
            display: 'flex',
            gap: 'clamp(1rem, 3vw, 2.5rem)'
          }} className="desktop-nav">
            {['about', 'experience', 'education', 'skills', 'contact'].map((item) => (
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

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            style={{
              display: 'none',
              color: 'white',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer'
            }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="mobile-nav"
          >
            <svg width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
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
              zIndex: 999
            }}
          >
            {['about', 'experience', 'education', 'skills', 'contact'].map((item) => (
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
                  cursor: 'pointer'
                }}
              >
                {item}
              </motion.button>
            ))}
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section style={{
        padding: 'clamp(4rem, 15vh, 10rem) clamp(1rem, 4vw, 2rem) clamp(4rem, 10vh, 8rem)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'clamp(1rem, 5vw, 4rem)',
            alignItems: 'center'
          }} className="hero-grid">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '1.5rem'
              }}>
                <Sparkles style={{
                  color: '#a855f7',
                  width: 'clamp(1.5rem, 5vw, 2rem)',
                  height: 'clamp(1.5rem, 5vw, 2rem)'
                }} />
                <span style={{
                  background: 'linear-gradient(90deg, #a855f7, #ec4899)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: '800',
                  fontSize: 'clamp(0.9rem, 3vw, 1.1rem)'
                }}>
                  Manufacturing Technology
                </span>
              </div>

              <h1 style={{
                fontSize: 'clamp(1.8rem, 6vw, 3.5rem)',
                fontWeight: 'bold',
                marginBottom: '1.5rem',
                lineHeight: '1.1',
                letterSpacing: '-0.02em'
              }}>
                <span style={{ display: 'block' }}>Deputy Assistant</span>
                <span style={{
                  display: 'block',
                  background: 'linear-gradient(90deg, #a855f7, #ec4899)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginTop: '0.25rem'
                }}>
                  Director
                </span>
              </h1>

              <p style={{
                fontSize: 'clamp(0.9rem, 2.5vw, 1.25rem)',
                color: '#cbd5e1',
                marginBottom: 'clamp(1.5rem, 4vw, 2.5rem)',
                lineHeight: '1.7',
                maxWidth: '90%'
              }}>
                Building robust, scalable web applications that drive operational efficiency and digital transformation in manufacturing processes.
              </p>

              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 'clamp(0.75rem, 2vw, 1.25rem)'
              }}>
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection('contact')}
                  style={{
                    padding: 'clamp(0.5rem, 2vw, 0.875rem) clamp(1rem, 3vw, 2.25rem)',
                    background: 'linear-gradient(90deg, #7c3aed, #db2777)',
                    borderRadius: '0.75rem',
                    fontWeight: '600',
                    border: 'none',
                    color: 'white',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    boxShadow: '0 10px 25px rgba(124, 58, 237, 0.3)',
                    fontSize: 'clamp(0.9rem, 2.5vw, 1rem)'
                  }}
                >
                  Get In Touch
                  <ArrowRight style={{ width: 'clamp(1rem, 3vw, 1.25rem)', height: 'clamp(1rem, 3vw, 1.25rem)' }} />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection('experience')}
                  style={{
                    padding: 'clamp(0.5rem, 2vw, 0.875rem) clamp(1rem, 3vw, 2.25rem)',
                    border: '2px solid rgba(139, 92, 246, 0.5)',
                    borderRadius: '0.75rem',
                    fontWeight: '600',
                    background: 'rgba(139, 92, 246, 0.1)',
                    color: 'white',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    fontSize: 'clamp(0.9rem, 2.5vw, 1rem)'
                  }}
                >
                  View Experience
                  <Briefcase style={{ width: 'clamp(1rem, 3vw, 1.25rem)', height: 'clamp(1rem, 3vw, 1.25rem)' }} />
                </motion.button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              style={{
                position: 'relative',
                justifySelf: 'center',
                width: '100%',
                maxWidth: 'clamp(250px, 50vw, 400px)'
              }}
            >
              <div style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '1/1'
              }}>
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(90deg, #7c3aed, #db2777)',
                  borderRadius: '50%',
                  filter: 'blur(40px)',
                  opacity: 0.4,
                  animation: 'pulse 3s infinite alternate'
                }}></div>

                <div style={{
                  position: 'absolute',
                  inset: '8px',
                  background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8), rgba(15, 23, 42, 0.8))',
                  borderRadius: '50%',
                  border: '3px solid rgba(139, 92, 246, 0.4)',
                  backdropFilter: 'blur(20px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
                  overflow: 'hidden'
                }}>
                  <img
                    src={profileImage}
                    alt="Profile"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: '50%'
                    }}
                  />
                </div>

                <motion.div
                  animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  style={{
                    position: 'absolute',
                    top: '10%',
                    right: '10%',
                    background: 'rgba(236, 72, 153, 0.2)',
                    borderRadius: '50%',
                    width: 'clamp(30px, 8vw, 40px)',
                    height: 'clamp(30px, 8vw, 40px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid rgba(236, 72, 153, 0.3)'
                  }}
                >
                  <Code style={{ color: '#ec4899', width: 'clamp(16px, 4vw, 20px)', height: 'clamp(16px, 4vw, 20px)' }} />
                </motion.div>

                <motion.div
                  animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                  style={{
                    position: 'absolute',
                    bottom: '15%',
                    left: '15%',
                    background: 'rgba(139, 92, 246, 0.2)',
                    borderRadius: '50%',
                    width: 'clamp(20px, 6vw, 30px)',
                    height: 'clamp(20px, 6vw, 30px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid rgba(139, 92, 246, 0.3)'
                  }}
                >
                  <Database style={{ color: '#a855f7', width: 'clamp(12px, 3vw, 16px)', height: 'clamp(12px, 3vw, 16px)' }} />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" style={{
        padding: 'clamp(3rem, 10vh, 6rem) clamp(1rem, 4vw, 2rem)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1
        }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 6vw, 4rem)' }}
          >
            <h2 style={{
              fontSize: 'clamp(1.5rem, 5vw, 3rem)',
              fontWeight: 'bold',
              marginBottom: '1.5rem',
              background: 'linear-gradient(90deg, #a855f7, #ec4899)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>About Me</h2>
            <div style={{
              width: '6rem',
              height: '3px',
              background: 'linear-gradient(90deg, #a855f7, #ec4899)',
              margin: '0 auto',
              borderRadius: '2px'
            }}></div>
          </motion.div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'clamp(1.5rem, 4vw, 3rem)'
          }} className="about-grid">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              style={{
                background: 'rgba(30, 41, 59, 0.6)',
                backdropFilter: 'blur(20px)',
                borderRadius: '1.5rem',
                padding: 'clamp(1.5rem, 4vw, 2.5rem)',
                border: '1px solid rgba(139, 92, 246, 0.3)',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '2rem'
              }}>
                <Briefcase style={{
                  color: '#a855f7',
                  width: 'clamp(1.5rem, 5vw, 2rem)',
                  height: 'clamp(1.5rem, 5vw, 2rem)'
                }} />
                <h3 style={{
                  fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
                  fontWeight: 'bold',
                  background: 'linear-gradient(90deg, #a855f7, #ec4899)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>Professional Journey</h3>
              </div>

              <p style={{
                color: '#cbd5e1',
                marginBottom: '2rem',
                lineHeight: '1.8',
                fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)',
                textAlign: 'justify'
              }}>
                I am currently serving as Deputy Assistant Director in the Manufacturing Automations team at WALTON Hi-Tech Industries PLC, within the WALTON ICT Department. With {years} years of professional experience, 
                I specialize in developing robust, scalable, and business-critical web and desktop applications that drive operational efficiency and digital transformation in manufacturing processes. 
                I have hands-on experience designing end-to-end solutions—requirements collection, system design, implementation, testing, and deployment—focused on real business impact and operational reliability.
              </p>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: 'clamp(1rem, 3vw, 2rem)'
              }}>
                {[
                  { icon: <Award />, label: 'Experience', value: `${years} Years` },
                  { icon: <Code />, label: 'Specialization', value: 'Web Applications' },
                  { icon: <Briefcase />, label: 'Current Role', value: 'Deputy Assistant Director' },
                  { icon: <Calendar />, label: 'Industry', value: 'Manufacturing Tech' }
                ].map((item, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '1rem',
                    background: 'rgba(15, 23, 42, 0.5)',
                    borderRadius: '1rem',
                    border: '1px solid rgba(139, 92, 246, 0.2)'
                  }}>
                    <div style={{
                      background: 'rgba(139, 92, 246, 0.2)',
                      padding: '0.75rem',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {item.icon}
                    </div>
                    <div>
                      <p style={{
                        fontWeight: '600',
                        color: '#a855f7',
                        marginBottom: '0.25rem',
                        fontSize: 'clamp(0.8rem, 2.5vw, 1rem)'
                      }}>{item.label}</p>
                      <p style={{
                        color: '#cbd5e1',
                        fontSize: 'clamp(0.7rem, 2vw, 0.9rem)'
                      }}>{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              style={{
                background: 'rgba(30, 41, 59, 0.6)',
                backdropFilter: 'blur(20px)',
                borderRadius: '1.5rem',
                padding: 'clamp(1.5rem, 4vw, 2.5rem)',
                border: '1px solid rgba(139, 92, 246, 0.3)',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '2rem'
              }}>
                <Star style={{
                  color: '#a855f7',
                  width: 'clamp(1.5rem, 5vw, 2rem)',
                  height: 'clamp(1.5rem, 5vw, 2rem)'
                }} />
                <h3 style={{
                  fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
                  fontWeight: 'bold',
                  background: 'linear-gradient(90deg, #a855f7, #ec4899)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>Core Expertise</h3>
              </div>

              <div style={{ display: 'grid', gap: '1.5rem' }}>
                {[
                  { title: 'System Architecture', desc: 'Designing scalable, maintainable systems for enterprise applications' },
                  { title: 'Process Optimization', desc: 'Streamlining manufacturing workflows through digital solutions' },
                  { title: 'Full Stack Development', desc: 'Building end-to-end web applications with modern technologies' },
                  { title: 'Stakeholder Management', desc: 'Bridging technical and business requirements effectively' }
                ].map((item, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '1rem',
                    padding: '1rem',
                    background: 'rgba(15, 23, 42, 0.5)',
                    borderRadius: '1rem',
                    border: '1px solid rgba(139, 92, 246, 0.2)'
                  }}>
                    <CheckCircle style={{
                      color: '#10b981',
                      width: 'clamp(1.2rem, 3vw, 1.5rem)',
                      height: 'clamp(1.2rem, 3vw, 1.5rem)',
                      flexShrink: 0,
                      marginTop: '0.25rem'
                    }} />
                    <div>
                      <h4 style={{
                        fontWeight: '600',
                        color: 'white',
                        marginBottom: '0.25rem',
                        fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)'
                      }}>{item.title}</h4>
                      <p style={{
                        color: '#cbd5e1',
                        fontSize: 'clamp(0.8rem, 2vw, 0.95rem)'
                      }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" style={{
        padding: 'clamp(3rem, 10vh, 6rem) clamp(1rem, 4vw, 2rem)',
        background: 'rgba(15, 23, 42, 0.3)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1
        }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 6vw, 4rem)' }}
          >
            <h2 style={{
              fontSize: 'clamp(1.5rem, 5vw, 3rem)',
              fontWeight: 'bold',
              marginBottom: '1.5rem',
              background: 'linear-gradient(90deg, #a855f7, #ec4899)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>Work Experience</h2>
            <div style={{
              width: '6rem',
              height: '3px',
              background: 'linear-gradient(90deg, #a855f7, #ec4899)',
              margin: '0 auto',
              borderRadius: '2px'
            }}></div>
          </motion.div>

          <div style={{ display: 'grid', gap: 'clamp(1.5rem, 4vw, 2.5rem)' }}>
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                style={{
                  background: 'rgba(30, 41, 59, 0.6)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '1.5rem',
                  padding: 'clamp(1.5rem, 4vw, 2.5rem)',
                  border: '1px solid rgba(139, 92, 246, 0.3)',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '5px',
                  height: '100%',
                  background: exp.type === 'leadership' ?
                    'linear-gradient(to bottom, #a855f7, #ec4899)' :
                    'linear-gradient(to bottom, #3b82f6, #1d4ed8)',
                  borderRadius: '1.5rem 0 0 1.5rem'
                }}></div>

                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  marginBottom: '2rem'
                }} className="experience-header">
                  <div>
                    <h3 style={{
                      fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
                      fontWeight: 'bold',
                      color: '#a855f7',
                      marginBottom: '0.5rem'
                    }}>{exp.title}</h3>
                    <p style={{
                      fontSize: 'clamp(0.9rem, 2.5vw, 1.25rem)',
                      color: '#cbd5e1',
                      fontWeight: '500'
                    }}>{exp.company}</p>
                  </div>
                  <div style={{
                    background: 'rgba(124, 58, 237, 0.2)',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '9999px',
                    color: '#c084fc',
                    fontWeight: '600',
                    border: '1px solid rgba(139, 92, 246, 0.3)',
                    fontSize: 'clamp(0.8rem, 2vw, 1rem)'
                  }}>
                    {exp.period}
                  </div>
                </div>

                <p style={{
                  color: '#cbd5e1',
                  marginBottom: '2rem',
                  lineHeight: '1.8',
                  fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)'
                }}>{exp.description}</p>

                <h4 style={{
                  fontWeight: '600',
                  fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
                  marginBottom: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem'
                }}>
                  <Star style={{
                    color: '#a855f7',
                    width: 'clamp(1.2rem, 3vw, 1.5rem)',
                    height: 'clamp(1.2rem, 3vw, 1.5rem)'
                  }} />
                  Key Achievements
                </h4>

                <ul style={{ display: 'grid', gap: '1rem' }}>
                  {exp.achievements.map((achievement, i) => (
                    <li key={i} style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '1rem',
                      padding: '1rem',
                      background: 'rgba(15, 23, 42, 0.5)',
                      borderRadius: '1rem',
                      border: '1px solid rgba(139, 92, 246, 0.2)'
                    }}>
                      <div style={{
                        background: 'linear-gradient(90deg, #a855f7, #ec4899)',
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        marginTop: '0.75rem',
                        flexShrink: 0
                      }}></div>
                      <span style={{
                        color: '#cbd5e1',
                        lineHeight: '1.6',
                        fontSize: 'clamp(0.85rem, 2.5vw, 1rem)'
                      }}>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" style={{
        padding: 'clamp(3rem, 10vh, 6rem) clamp(1rem, 4vw, 2rem)',
        background: 'rgba(15, 25, 48, 0.3)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1
        }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 6vw, 4rem)' }}
          >
            <h2 style={{
              fontSize: 'clamp(1.5rem, 5vw, 3rem)',
              fontWeight: 'bold',
              marginBottom: '1.5rem',
              background: 'linear-gradient(90deg, #a855f7, #ec4899)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>Education</h2>
            <div style={{
              width: '6rem',
              height: '3px',
              background: 'linear-gradient(90deg, #a855f7, #ec4899)',
              margin: '0 auto',
              borderRadius: '2px'
            }}></div>
          </motion.div>

          <div style={{
            display: 'grid',
            contaninerStyle,
            gap: 'clamp(1.5rem, 4vw, 2rem)'
          }}>
            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                style={{
                  background: 'rgba(30, 41, 59, 0.6)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '1.5rem',
                  padding: 'clamp(1.5rem, 4vw, 2.5rem)',
                  border: '1px solid rgba(139, 92, 246, 0.3)',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '5px',
                  height: '100%',
                  background: edu.type === 'undergraduate' ?
                    'linear-gradient(to bottom, #a855f7, #ec4899)' :
                    'linear-gradient(to bottom, #3b82f6, #1d4ed8)',
                  borderRadius: '1.5rem 0 0 1.5rem'
                }}></div>

                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  marginBottom: '2rem'
                }} className="education-header">
                  <div>
                    <h3 style={{
                      fontSize: 'clamp(1rem, 2.5vw, 1.4rem)',
                      fontWeight: 'bold',
                      color: '#a855f7',
                      marginBottom: '0.4rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem'
                    }}>
                      <GraduationCap style={{
                        width: 'clamp(1.5rem, 5vw, 2rem)',
                        height: 'clamp(1.5rem, 5vw, 2rem)'
                      }} />
                      {edu.degree}
                    </h3>
                    <p style={{
                      fontSize: 'clamp(0.9rem, 2.5vw, 1.25rem)',
                      color: '#cbd5e1',
                      fontWeight: '400'
                    }}>{edu.institution}</p>
                  </div>
                  <div style={{
                    background: 'rgba(124, 58, 237, 0.2)',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '9999px',
                    color: '#c084fc',
                    fontWeight: '600',
                    border: '1px solid rgba(139, 92, 246, 0.3)',
                    fontSize: 'clamp(0.8rem, 2vw, 1rem)'
                  }}>
                    {edu.period}
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '2rem',
                  padding: '1rem',
                  background: 'rgba(15, 23, 42, 0.5)',
                  borderRadius: '1rem',
                  border: '1px solid rgba(139, 92, 246, 0.2)'
                }}>
                  <Trophy style={{
                    color: '#10b981',
                    width: 'clamp(1.2rem, 3vw, 1.5rem)',
                    height: 'clamp(1.2rem, 3vw, 1.5rem)'
                  }} />
                  <span style={{
                    color: '#10b981',
                    fontWeight: '600',
                    fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)'
                  }}>
                    {edu.grade}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" style={{
        padding: 'clamp(3rem, 10vh, 6rem) clamp(1rem, 4vw, 2rem)',
        background: 'rgba(15, 25, 48, 0.3)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1
        }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 6vw, 4rem)' }}
          >
            <h2 style={{
              fontSize: 'clamp(1.5rem, 5vw, 3rem)',
              fontWeight: 'bold',
              marginBottom: '1.5rem',
              background: 'linear-gradient(90deg, #a855f7, #ec4899)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>Technical Skills</h2>
            <div style={{
              width: '6rem',
              height: '3px',
              background: 'linear-gradient(90deg, #a855f7, #ec4899)',
              margin: '0 auto',
              borderRadius: '2px'
            }}></div>
          </motion.div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: 'clamp(1.5rem, 4vw, 2.5rem)'
          }}>
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                style={{
                  background: 'rgba(30, 41, 59, 0.6)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '1.5rem',
                  padding: 'clamp(1.5rem, 4vw, 2rem)',
                  border: '1px solid rgba(139, 92, 246, 0.3)',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '1rem'
                }}>
                  <div>
                    <h3 style={{
                      fontWeight: '600',
                      fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
                      color: 'white',
                      marginBottom: '0.25rem'
                    }}>{skill.name}</h3>
                    <span style={{
                      fontSize: 'clamp(0.7rem, 2vw, 0.85rem)',
                      color: '#a855f7',
                      fontWeight: '500',
                      background: 'rgba(139, 92, 246, 0.2)',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '9999px',
                      border: '1px solid rgba(139, 92, 246, 0.3)'
                    }}>
                      {skill.category}
                    </span>
                  </div>
                  <span style={{
                    color: '#a855f7',
                    fontWeight: 'bold',
                    fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)'
                  }}>{skill.level}%</span>
                </div>

                <div style={{
                  width: '100%',
                  background: 'rgba(15, 23, 42, 0.5)',
                  borderRadius: '9999px',
                  height: '12px',
                  border: '1px solid rgba(139, 92, 246, 0.2)'
                }}>
                  <motion.div
                    style={{
                      background: 'linear-gradient(90deg, #7c3aed, #db2777)',
                      height: '100%',
                      borderRadius: '9999px',
                      transition: 'width 1.5s ease-out'
                    }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                  ></motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" style={{
        padding: 'clamp(3rem, 10vh, 6rem) clamp(1rem, 4vw, 2rem)',
        background: 'rgba(15, 23, 42, 0.3)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1
        }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 6vw, 4rem)' }}
          >
            <h2 style={{
              fontSize: 'clamp(1.5rem, 5vw, 3rem)',
              fontWeight: 'bold',
              marginBottom: '1.5rem',
              background: 'linear-gradient(90deg, #a855f7, #ec4899)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>Get In Touch</h2>
            <div style={{
              width: '6rem',
              height: '3px',
              background: 'linear-gradient(90deg, #a855f7, #ec4899)',
              margin: '0 auto',
              borderRadius: '2px'
            }}></div>
          </motion.div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'clamp(1.5rem, 4vw, 4rem)'
          }} className="contact-grid">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              style={{ display: 'grid', gap: 'clamp(1.5rem, 4vw, 2.5rem)' }}
            >
              {[
                {
                  icon: Mail,
                  title: 'Email',
                  value: 'tanjimjoy@gmail.com',
                  link: 'mailto:tanjimjoy@gmail.com'
                },
                {
                  icon: Phone,
                  title: 'Phone',
                  value: '+880 1838 120302',
                  link: 'tel:+8801838120302'
                },
                {
                  icon: MapPin,
                  title: 'Location',
                  value: 'Gazipur, Bangladesh',
                  link: '#'
                }
              ].map((item, index) => (
                <motion.a
                  key={index}
                  href={item.link}
                  whileHover={{ x: 10 }}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '1.5rem',
                    textDecoration: 'none'
                  }}
                >
                  <div style={{
                    background: 'rgba(124, 58, 237, 0.2)',
                    padding: '1rem',
                    borderRadius: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    border: '1px solid rgba(139, 92, 246, 0.3)'
                  }}>
                    <item.icon style={{
                      color: '#a855f7',
                      width: 'clamp(1.2rem, 3vw, 1.75rem)',
                      height: 'clamp(1.2rem, 3vw, 1.75rem)'
                    }} />
                  </div>
                  <div>
                    <h3 style={{
                      fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
                      fontWeight: '600',
                      marginBottom: '0.25rem',
                      color: 'white'
                    }}>{item.title}</h3>
                    <p style={{
                      color: '#cbd5e1',
                      fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)'
                    }}>{item.value}</p>
                  </div>
                </motion.a>
              ))}

              <div style={{ paddingTop: '2rem' }}>
                <h3 style={{
                  fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
                  fontWeight: '600',
                  marginBottom: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem'
                }}>
                  <MessageSquare style={{ color: '#a855f7', width: 'clamp(1.2rem, 3vw, 1.5rem)', height: 'clamp(1.2rem, 3vw, 1.5rem)' }} />
                  Connect With Me
                </h3>
                <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                  {[
                    { icon: Github, color: '#7c3aed', hoverColor: '#9333ea', link: 'https://github.com/Tanjim-joy' },
                    { icon: Linkedin, color: '#3b82f6', hoverColor: '#60a5fa', link: 'https://linkedin.com/in/tanjim-joy' }
                  ].map((social, i) => (
                    <motion.a
                      key={i}
                      href={social.link}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      style={{
                        background: `rgba(${parseInt(social.color.slice(1,3), 16)}, ${parseInt(social.color.slice(3,5), 16)}, ${parseInt(social.color.slice(5,7), 16)}, 0.2)`,
                        padding: '1rem',
                        borderRadius: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: `1px solid ${social.color}40`
                      }}
                    >
                      <social.icon style={{
                        color: social.color,
                        width: 'clamp(1.2rem, 3vw, 1.75rem)',
                        height: 'clamp(1.2rem, 3vw, 1.75rem)'
                      }} />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              style={{
                background: 'rgba(30, 41, 59, 0.6)',
                backdropFilter: 'blur(20px)',
                borderRadius: '1.5rem',
                padding: 'clamp(1.5rem, 4vw, 3rem)',
                border: '1px solid rgba(139, 92, 246, 0.3)',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
              }}
            >
              <form style={{ display: 'grid', gap: '1.5rem' }}>
                <div>
                  <label style={{
                    display: 'block',
                    color: '#cbd5e1',
                    marginBottom: '0.75rem',
                    fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)',
                    fontWeight: '500'
                  }}>Name</label>
                  <input
                    type="text"
                    style={{
                      width: '100%',
                      background: 'rgba(15, 23, 42, 0.5)',
                      border: '1px solid rgba(139, 92, 246, 0.4)',
                      borderRadius: '1rem',
                      padding: 'clamp(0.75rem, 2vw, 1rem) clamp(1rem, 3vw, 1.5rem)',
                      color: 'white',
                      fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)',
                      outline: 'none'
                    }}
                    placeholder="Enter Your Name"
                    onFocus={(e) => {
                      e.target.style.borderColor = '#a855f7';
                      e.target.style.boxShadow = '0 0 0 3px rgba(168, 85, 247, 0.2)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(139, 92, 246, 0.4)';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>
                <div>
                  <label style={{
                    display: 'block',
                    color: '#cbd5e1',
                    marginBottom: '0.75rem',
                    fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)',
                    fontWeight: '500'
                  }}>Email</label>
                  <input
                    type="email"
                    style={{
                      width: '100%',
                      background: 'rgba(15, 23, 42, 0.5)',
                      border: '1px solid rgba(139, 92, 246, 0.4)',
                      borderRadius: '1rem',
                      padding: 'clamp(0.75rem, 2vw, 1rem) clamp(1rem, 3vw, 1.5rem)',
                      color: 'white',
                      fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)',
                      outline: 'none'
                    }}
                    placeholder="Enter your.email@example.com"
                    onFocus={(e) => {
                      e.target.style.borderColor = '#a855f7';
                      e.target.style.boxShadow = '0 0 0 3px rgba(168, 85, 247, 0.2)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(139, 92, 246, 0.4)';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>
                <div>
                  <label style={{
                    display: 'block',
                    color: '#cbd5e1',
                    marginBottom: '0.75rem',
                    fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)',
                    fontWeight: '500'
                  }}>Message</label>
                  <textarea
                    rows="4"
                    style={{
                      width: '100%',
                      background: 'rgba(15, 23, 42, 0.5)',
                      border: '1px solid rgba(139, 92, 246, 0.4)',
                      borderRadius: '1rem',
                      padding: 'clamp(0.75rem, 2vw, 1rem) clamp(1rem, 3vw, 1.5rem)',
                      color: 'white',
                      fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)',
                      outline: 'none',
                      resize: 'vertical',
                      minHeight: '120px'
                    }}
                    placeholder="Your message here..."
                    onFocus={(e) => {
                      e.target.style.borderColor = '#a855f7';
                      e.target.style.boxShadow = '0 0 0 3px rgba(168, 85, 247, 0.2)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(139, 92, 246, 0.4)';
                      e.target.style.boxShadow = 'none';
                    }}
                  ></textarea>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  style={{
                    width: '100%',
                    background: 'linear-gradient(90deg, #7c3aed, #db2777)',
                    padding: 'clamp(0.75rem, 2vw, 1rem)',
                    borderRadius: '1rem',
                    fontWeight: '600',
                    border: 'none',
                    color: 'white',
                    cursor: 'pointer',
                    fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)',
                    boxShadow: '0 10px 25px rgba(124, 58, 237, 0.3)'
                  }}
                >
                  Send Message
                  <ArrowRight style={{
                    marginLeft: '0.75rem',
                    verticalAlign: 'middle',
                    width: 'clamp(1rem, 3vw, 1.25rem)',
                    height: 'clamp(1rem, 3vw, 1.25rem)'
                  }} />
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: 'clamp(2rem, 8vh, 3.5rem) clamp(1rem, 4vw, 2rem)',
        borderTop: '1px solid rgba(139, 92, 246, 0.3)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '1.5rem'
          }}>
            <Code style={{
              color: '#a855f7',
              width: 'clamp(1.2rem, 3vw, 1.5rem)',
              height: 'clamp(1.2rem, 3vw, 1.5rem)'
            }} />
            <span style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
              fontWeight: 'bold',
              background: 'linear-gradient(90deg, #a855f7, #ec4899)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Tanjim
            </span>
          </div>
          <p style={{
            color: '#94a3b8',
            fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)',
            maxWidth: '90%',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            © 2024 Tanjim. All rights reserved. Crafted with precision and passion for digital innovation.
          </p>
        </div>
      </footer>

      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
          
          @keyframes pulse {
            0% { opacity: 0.3; transform: scale(1); }
            50% { opacity: 0.6; transform: scale(1.1); }
            100% { opacity: 0.3; transform: scale(1); }
          }
          
          * {
            scrollbar-width: thin;
            scrollbar-color: #7c3aed #1e293b;
            box-sizing: border-box;
          }
          
          *::-webkit-scrollbar {
            width: 6px;
          }
          
          *::-webkit-scrollbar-track {
            background: #1e293b;
          }
          
          *::-webkit-scrollbar-thumb {
            background-color: #7c3aed;
            border-radius: 20px;
            border: 2px solid #1e293b;
          }

          .desktop-nav {
            display: flex;
          }

          .mobile-nav {
            display: none;
          }

          @media (max-width: 768px) {
            .desktop-nav {
              display: none;
            }

            .mobile-nav {
              display: block;
            }

            .hero-grid {
              grid-template-columns: 1fr;
              text-align: center;
            }

            .hero-grid > div:first-child {
              order: 2;
            }

            .hero-grid > div:last-child {
              order: 1;
            }

            .experience-header, .education-header {
              flex-direction: column;
              align-items: flex-start;
            }

            .contact-grid {
              grid-template-columns: 1fr;
            }
          }

          @media (max-width: 480px) {
            input, textarea {
              width: 100% !important;
            }

            .hero-grid > div:last-child {
              max-width: 80%;
              margin: 0 auto;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Portfolio;