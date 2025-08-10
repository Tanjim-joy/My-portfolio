
import React, { useState, useEffect } from 'react';
import { Database } from 'lucide-react';
import { motion } from 'framer-motion';
import { 
  User, Briefcase, Code, GraduationCap, Mail, Phone, MapPin, 
  Github, Linkedin, ExternalLink, Calendar, Award, MessageSquare, 
  ArrowRight, CheckCircle, Sparkles, Star, BookOpen, Trophy
} from 'lucide-react';
import profileImage from './assets/2.png'; // Adjust the path as necessary
import { link } from 'framer-motion/client';

const startdate = new Date(2023, 3, 11);
const presentDate = new Date();

const diffInMs = presentDate - startdate;
const diffInDays = diffInMs / (1000 * 60 * 60 * 24 * 365.25);
const years  = diffInDays.toFixed(1); 



const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('about');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'experience','education', 'skills', 'contact'];
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
    { name: 'PHP', level: 85, category: 'Backend' }, // Merged PHP entries, averaged level
    { name: 'Node.js', level: 70, category: 'Backend' },
    { name: 'Express', level: 70, category: 'Backend' },
    { name: 'C#', level: 90, category: 'Backend' },
    { name: 'ASP.NET Core', level: 85, category: 'Backend' },
    { name: 'API Development', level: 85, category: 'Backend' },
    { name: 'MySQL', level: 90, category: 'Database' },
    { name: 'SQL', level: 90, category: 'Database' },
    { name: 'Git', level: 88, category: 'DevOps' },
    { name: 'Docker', level: 25, category: 'DevOps' }, // Added Docker with basic proficiency
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
        'Implemented enterprise-level solutions using PHP,C# & .NET and database technologies',
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
      degree: 'General Secondary Certificate  (Electrical)',
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

  const achievements = [
    'Digital Transformation Leader',
    'Process Optimization Expert',
    'Enterprise Architecture',
    'Cross-functional Collaboration'
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
          width: '200px',
          height: '200px',
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
          width: '150px',
          height: '150px',
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
          padding: '0 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '80px'
        }}>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            style={{
              fontSize: '1.8rem',
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
          <div style={{ display: 'flex', gap: '2.5rem' }} className="desktop-nav">
            {['about', 'experience', 'education', 'skills', 'contact'].map((item) => (
              <motion.button
                key={item}
                onClick={() => scrollToSection(item)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  position: 'relative',
                  background: 'rgba(15, 23, 42, 0.95)',
                  textTransform: 'capitalize',
                  transition: 'all 0.3s ease',
                  border: 'none',
                  paddingBottom: '4px',
                  color: activeSection === item ? '#a855f7' : '#cbd5e1',
                  fontWeight: activeSection === item ? '600' : '400',
                  letterSpacing: '0.5px'
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
      </nav>

      {/* Hero Section */}
      <section style={{
        paddingTop: '10rem',
        paddingBottom: '8rem',
        paddingLeft: '2rem',
        paddingRight: '2rem',
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
            gridTemplateColumns: '1fr 1fr',
            gap: '4rem',
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
                  width: '2rem', 
                  height: '2rem' 
                }} />
                <span style={{
                  background: 'linear-gradient(90deg, #a855f7, #ec4899)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: '800',
                  fontSize: '1.1rem'
                }}>
                  Manufacturing Technology 
                </span>
              </div>
              
              <h1 style={{
                fontSize: 'clamp(2.5rem, 6vw, 4rem)',
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
                fontSize: '1.25rem',
                color: '#cbd5e1',
                marginBottom: '2.5rem',
                lineHeight: '1.7',
                maxWidth: '500px'
              }}>
                Building robust, scalable web applications that drive operational efficiency and digital transformation in manufacturing processes.
              </p>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem' }}>
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection('contact')}
                  style={{
                    padding: '0.875rem 2.25rem',
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
                    transition: 'all 0.3s ease'
                  }}
                >
                  Get In Touch
                  <ArrowRight style={{ width: '1.25rem', height: '1.25rem' }} />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection('experience')}
                  style={{
                    padding: '0.875rem 2.25rem',
                    border: '2px solid rgba(139, 92, 246, 0.5)',
                    borderRadius: '0.75rem',
                    fontWeight: '600',
                    background: 'rgba(139, 92, 246, 0.1)',
                    color: 'white',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    transition: 'all 0.3s ease',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  View Experience
                  <Briefcase style={{ width: '1.25rem', height: '1.25rem' }} />
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
              }}
            >
      <div
        style={{
          position: 'relative',
          width: 'clamp(400px, 40vw, 300px)',
          height: 'clamp(400px, 40vw, 300px)',
        }}
      >
        {/* Background Gradient Circle */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(90deg, #7c3aed, #db2777)',
            borderRadius: '80%',
            filter: 'blur(40px)',
            opacity: 0.4,
            animation: 'pulse 3s infinite alternate',
            zIndex: 1,
          }}
        ></div>

        {/* Inner Circle with Photo */}
        <div
          style={{
            position: 'absolute',
            inset: '8px',
            background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8), rgba(15, 23, 42, 0.8))',
            borderRadius: '70%',
            border: '3px solid rgba(139, 92, 246, 0.4)',
            backdropFilter: 'blur(20px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2,
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
            overflow: 'hidden', // Ensure the image doesn't overflow the circle
          }}
        >
          <img
            src={profileImage} // Use imported image or URL (e.g., '/images/profile.jpg' if in public)
            alt="Profile"
            style={{
              width: '100%', // Fill the container
              height: '100%', // Fill the container
              objectFit: 'cover', // Ensure the image covers the circle without distortion
              borderRadius: '50%', // Match the circular shape
            }}
          />
        </div>

        {/* Floating Elements */}
        <motion.div
          animate={{
            y: [0, -10, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            position: 'absolute',
            top: '1%',
            right: '1%',
            background: 'rgba(236, 72, 153, 0.2)',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid rgba(236, 72, 153, 0.3)',
          }}
        >
          <Code style={{ color: '#ec4899', width: '40px', height: '20px' }} />
        </motion.div>

        <motion.div
          animate={{
            y: [0, 10, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
          style={{
            position: 'absolute',
            bottom: '15%',
            left: '15%',
            background: 'rgba(139, 92, 246, 0.2)',
            borderRadius: '50%',
            width: '30px',
            height: '30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid rgba(139, 92, 246, 0.3)',
          }}
        >
          <Database style={{ color: '#a855f7', width: '16px', height: '16px' }} />
        </motion.div>
      </div>
    </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" style={{
        padding: '6rem 2rem',
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
            style={{
              textAlign: 'center',
              marginBottom: '4rem'
            }}
          >
            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
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
            gridTemplateColumns: '1fr 1fr',
            gap: '3rem'
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
                padding: '2.5rem',
                border: '1px solid rgba(139, 92, 246, 0.3)',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
                transition: 'all 0.3s ease'
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
                  width: '2rem', 
                  height: '2rem' 
                }} />
                <h3 style={{
                  fontSize: '1.75rem',
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
                fontSize: '1.1rem',
                textAlign: 'justify'
              }}>
                I am currently serving as Deputy Assistant Director in the Manufacturing Automations team at WALTON Hi-Tech Industries PLC, within the WALTON ICT Department. With {years} years of professional experience, 
                I specialize in developing robust, scalable, and business-critical web and desktop applications that drive operational efficiency and digital transformation in manufacturing processes. 
                I have hands-on experience designing end-to-end solutions—requirements collection, system design, implementation, testing, and deployment—focused on real business impact and operational reliability.
              </p>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '2rem'
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
                        marginBottom: '0.25rem'
                      }}>{item.label}</p>
                      <p style={{ color: '#cbd5e1' }}>{item.value}</p>
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
                padding: '2.5rem',
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
                  width: '2rem', 
                  height: '2rem' 
                }} />
                <h3 style={{
                  fontSize: '1.75rem',
                  fontWeight: 'bold',
                  background: 'linear-gradient(90deg, #a855f7, #ec4899)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>Core Expertise</h3>
              </div>
              
              <div style={{
                display: 'grid',
                gap: '1.5rem'
              }}>
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
                      width: '1.5rem', 
                      height: '1.5rem',
                      flexShrink: 0,
                      marginTop: '0.25rem'
                    }} />
                    <div>
                      <h4 style={{
                        fontWeight: '600',
                        color: 'white',
                        marginBottom: '0.25rem'
                      }}>{item.title}</h4>
                      <p style={{ color: '#cbd5e1', fontSize: '0.95rem' }}>{item.desc}</p>
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
        padding: '6rem 2rem',
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
            style={{
              textAlign: 'center',
              marginBottom: '4rem'
            }}
          >
            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
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
          
          <div style={{ 
            display: 'grid',
            gap: '2.5rem'
          }}>
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
                  padding: '2.5rem',
                  border: '1px solid rgba(139, 92, 246, 0.3)',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* Decorative element */}
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
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '2rem'
                }} className="experience-header">
                  <div>
                    <h3 style={{
                      fontSize: '1.75rem',
                      fontWeight: 'bold',
                      color: '#a855f7',
                      marginBottom: '0.5rem'
                    }}>{exp.title}</h3>
                    <p style={{
                      fontSize: '1.25rem',
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
                    border: '1px solid rgba(139, 92, 246, 0.3)'
                  }}>
                    {exp.period}
                  </div>
                </div>
                
                <p style={{
                  color: '#cbd5e1',
                  marginBottom: '2rem',
                  lineHeight: '1.8',
                  fontSize: '1.1rem'
                }}>{exp.description}</p>
                
                <h4 style={{
                  fontWeight: '600',
                  fontSize: '1.25rem',
                  marginBottom: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem'
                }}>
                  <Star style={{ color: '#a855f7', width: '1.5rem', height: '1.5rem' }} />
                  Key Achievements
                </h4>
                
                <ul style={{ 
                  display: 'grid',
                  gap: '1rem'
                }}>
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
                      <span style={{ color: '#cbd5e1', lineHeight: '1.6' }}>{achievement}</span>
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
        padding: '6rem 2rem',
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
            style={{
              textAlign: 'center',
              marginBottom: '4rem',
              
            }}
          >
            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
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
            gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
            gap: '2rem'
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
                  padding: '2.5rem',
                  border: '1px solid rgba(139, 92, 246, 0.3)',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* Decorative element */}
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
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '2rem'
                }} className="education-header">
                  <div>
                    <h3 style={{
                      fontSize: '1.4rem',
                      fontWeight: 'bold',
                      color: '#a855f7',
                      marginBottom: '0.4rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem'
                    }}>
                      <GraduationCap style={{ width: '8rem', height: '4rem' }} />
                      {edu.degree}
                    </h3>
                    <p style={{
                      fontSize: '1.25rem',
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
                    border: '1px solid rgba(139, 92, 246, 0.3)'
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
                    width: '1.5rem', 
                    height: '1.5rem' 
                  }} />
                  <span style={{ color: '#10b981', fontWeight: '600', fontSize: '1.1rem' }}>
                    {edu.grade}
                  </span>
                </div>
                
                {/* <h4 style={{
                  fontWeight: '600',
                  fontSize: '1.25rem',
                  marginBottom: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem'
                }}>
                  <BookOpen style={{ color: '#a855f7', width: '1.5rem', height: '1.5rem' }} />
                  Academic Achievements
                </h4> */}
                
                {/* <ul style={{ 
                  display: 'grid',
                  gap: '1rem'
                }}>
                  {edu.achievements.map((achievement, i) => (
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
                      <span style={{ color: '#cbd5e1', lineHeight: '1.6' }}>{achievement}</span>
                    </li>
                  ))}
                </ul> */}
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* Skills Section */}
      <section id="skills" style={{
        padding: '6rem 2rem',
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
            style={{
              textAlign: 'center',
              marginBottom: '4rem'
            }}
          >
            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
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
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '2.5rem'
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
                  padding: '2rem',
                  border: '1px solid rgba(139, 92, 246, 0.3)',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
                  transition: 'all 0.3s ease'
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
                      fontSize: '1.25rem',
                      color: 'white',
                      marginBottom: '0.25rem'
                    }}>{skill.name}</h3>
                    <span style={{
                      fontSize: '0.85rem',
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
                    fontSize: '1.1rem'
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
        padding: '6rem 2rem',
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
            style={{
              textAlign: 'center',
              marginBottom: '4rem'
            }}
          >
            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
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
            gridTemplateColumns: '1fr 1fr',
            gap: '4rem'
          }} className="contact-grid">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              style={{
                display: 'grid',
                gap: '2.5rem'
              }}
            >
              {[
                { 
                  icon: Mail, 
                  title: 'Email', 
                  value: 'tanjimjoy@gmail.com',
                  link: 'mailto:your.email@company.com'
                },
                { 
                  icon: Phone, 
                  title: 'Phone', 
                  value: '+880 1838 120302',
                  link: 'tel:+880 1838 120 302'
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
                    textDecoration: 'none',
                    transition: 'all 0.3s ease'
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
                      width: '1.75rem', 
                      height: '1.75rem' 
                    }} />
                  </div>
                  <div>
                    <h3 style={{ 
                      fontSize: '1.25rem', 
                      fontWeight: '600', 
                      marginBottom: '0.25rem',
                      color: 'white'
                    }}>{item.title}</h3>
                    <p style={{ 
                      color: '#cbd5e1',
                      fontSize: '1.1rem'
                    }}>{item.value}</p>
                  </div>
                </motion.a>
              ))}
              
              <div style={{ paddingTop: '2rem' }}>
                <h3 style={{ 
                  fontSize: '1rem', 
                  fontWeight: '600', 
                  marginBottom: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem'
                }}>
                  <MessageSquare style={{ color: '#a855f7' }} />
                  Connect With Me
                </h3>
                <div style={{ 
                  display: 'flex', 
                  gap: '1.5rem',
                  flexWrap: 'wrap'
                }}>
                  {[
                    { icon: Github, color: '#7c3aed', hoverColor: '#9333ea'},
                    { icon: Linkedin, color: '#3b82f6', hoverColor: '#60a5fa' }
                  ].map((social, i) => (
                    <motion.a
                      key={i}
                      href="https://github.com/Tanjim-joy"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      style={{
                        background: `rgba(${parseInt(social.color.slice(1,3), 16)}, ${parseInt(social.color.slice(3,5), 16)}, ${parseInt(social.color.slice(5,7), 16)}, 0.2)`,
                        padding: '1rem',
                        borderRadius: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.3s ease',
                        border: `1px solid ${social.color}40`
                      }}
                    >
                      <social.icon style={{ 
                        color: social.color,
                        width: '1.75rem', 
                        height: '1.75rem' 
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
                padding: '3rem',
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
                    fontSize: '1.1rem',
                    fontWeight: '400'
                  }}>Name</label>
                  <input
                    type="text"
                    style={{
                      width: '99%',
                      background: 'rgba(15, 23, 42, 0.5)',
                      border: '1px solid rgba(139, 92, 246, 0.4)',
                      borderRadius: '1rem',
                      padding: '1rem 1.5rem',
                      color: 'white',
                      fontSize: '1.1rem',
                      outline: 'none',
                      transition: 'all 0.3s ease'
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
                    fontSize: '1.1rem',
                    fontWeight: '500'
                  }}>Email</label>
                  <input
                    type="email"
                    style={{
                      width: '99%',
                      background: 'rgba(15, 23, 42, 0.5)',
                      border: '1px solid rgba(139, 92, 246, 0.4)',
                      borderRadius: '1rem',
                      padding: '1rem 1.5rem',
                      color: 'white',
                      fontSize: '1.1rem',
                      outline: 'none',
                      
                      transition: 'all 0.3s ease'
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
                    fontSize: '1.1rem',
                    fontWeight: '500'
                  }}>Message</label>
                  <textarea
                    rows="4"
                    style={{
                      width: '99%',
                      background: 'rgba(15, 23, 42, 0.5)',
                      border: '1px solid rgba(139, 92, 246, 0.4)',
                      borderRadius: '1rem',
                      padding: '1rem 1.5rem',
                      color: 'white',
                      fontSize: '1.1rem',
                      outline: 'none',
                      resize: 'vertical',
                      minHeight: '150px',
                      transition: 'all 0.3s ease'
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
                    padding: '1rem',
                    borderRadius: '1rem',
                    fontWeight: '600',
                    border: 'none',
                    color: 'white',
                    cursor: 'pointer',
                    fontSize: '1.1rem',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 10px 25px rgba(124, 58, 237, 0.3)'
                  }}
                >
                  Send Message
                  <ArrowRight style={{ 
                    marginLeft: '0.75rem', 
                    verticalAlign: 'middle',
                    transition: 'transform 0.3s ease'
                  }} />
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: '3.5rem 2rem',
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
              width: '1.5rem', 
              height: '1.5rem' 
            }} />
            <span style={{
              fontSize: '1.25rem',
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
            fontSize: '1.1rem',
            maxWidth: '600px',
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
        `}
      </style>
    </div>
  );
};

export default Portfolio;
