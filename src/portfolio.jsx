import React, { useState, useEffect, useRef } from 'react';
import {
  Database, User, Briefcase, Code, GraduationCap, Mail, Phone,
  MapPin, Github, Linkedin, Calendar, Award, MessageSquare,
  ArrowRight, CheckCircle, Sparkles, Star, Trophy
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import profileImage from './assets/2.png';
import emailjs from '@emailjs/browser';

// --- Utility: Experience duration ---
const startDate = new Date(2023, 3, 11); // April 11, 2023
const today = new Date();
const yearsOfExperience = ((today - startDate) / (1000 * 60 * 60 * 24 * 365.25)).toFixed(1);

// --- Skills & Data ---
const skills = [
  { name: 'HTML5', level: 95, category: 'Frontend' },
  { name: 'CSS3', level: 95, category: 'Frontend' },
  { name: 'Bootstrap', level: 95, category: 'Frontend' },
  { name: 'JavaScript', level: 80, category: 'Frontend' },
  { name: 'jQuery', level: 80, category: 'Frontend' },
  { name: 'React', level: 50, category: 'Frontend' },
  { name: 'PHP', level: 85, category: 'Backend' },
  { name: 'Node.js', level: 70, category: 'Backend' },
  { name: 'C#', level: 90, category: 'Backend' },
  { name: 'ASP.NET Core', level: 85, category: 'Backend' },
  { name: 'MySQL / SQL', level: 90, category: 'Database' },
  { name: 'Git', level: 88, category: 'DevOps' },
  { name: 'System Design', level: 78, category: 'Architecture' },
  { name: 'Requirements Eng.', level: 98, category: 'Process' },
];

const experiences = [
  {
    title: 'Deputy Assistant Director',
    company: 'WALTON Hi-Tech Industries PLC',
    period: '2023 – Present',
    description: 'Leading the Manufacturing Automations team in developing robust, scalable web applications that drive operational efficiency and digital transformation.',
    achievements: [
      'Developed desktop apps for label printing using C#, .NET, WPF',
      'Built enterprise web apps with ASP.NET Core & C#',
      'Led cross-functional teams on complex industrial automation projects',
      'Designed workflow automation systems for large-scale manufacturing',
      'Optimized data-intensive apps for performance & security'
    ],
    type: 'leadership'
  },
  {
    title: 'Web Application Developer',
    company: 'WALTON Hi-Tech Industries PLC',
    period: '2022 – 2023',
    description: 'Developed business-critical web applications supporting manufacturing operations.',
    achievements: [
      'Implemented solutions using PHP, C#, .NET, and relational databases',
      'Led internal API integration projects',
      'Improved system performance by 40% via optimization & DB tuning'
    ],
    type: 'development'
  }
];

const education = [
  {
    degree: 'BSc in Computer Science & Engineering',
    institution: 'City University Bangladesh',
    period: '2018 – 2022',
    grade: 'CGPA: 2.95/4.00',
    type: 'undergraduate'
  },
  {
    degree: 'Diploma in Telecommunication Engineering',
    institution: 'Institute of Information Technology Bogura',
    period: '2011 – 2015',
    grade: 'CGPA: 3.06/4.00',
    type: 'Diploma'
  },
  {
    degree: 'Web Application Development (ASP.NET)',
    institution: 'IsDB-BISEW IT Scholarship Program',
    period: '2021',
    grade: 'Completed',
    type: 'Certification'
  }
];

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('about');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const formRef = useRef();

  // --- Resize handling ---
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // --- Mouse parallax background ---
  useEffect(() => {
    const handleMouseMove = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // --- Active section detection on scroll ---
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'experience', 'education', 'skills', 'contact'];
      const scrollPos = window.scrollY + 100;
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && scrollPos >= el.offsetTop && scrollPos < el.offsetTop + el.offsetHeight) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        'service_9813qpj',
        'template_w58csw3',
        formRef.current,
        'mO3ekIk2blRx-9J8d' // ⚠️ In production, use .env
      )
      .then(() => {
        alert('Message sent successfully!');
        formRef.current.reset();
      })
      .catch((err) => {
        console.error('Failed to send:', err);
        alert('Failed to send. Please try again.');
      });
  };

  // --- Reusable Section Header ---
  const SectionHeader = ({ title }) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      style={{ textAlign: 'center', marginBottom: '3rem' }}
    >
      <h2 style={{
        fontSize: 'clamp(1.8rem, 6vw, 2.8rem)',
        fontWeight: '800',
        background: 'linear-gradient(90deg, #a855f7, #ec4899)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}>{title}</h2>
      <div style={{
        width: '60px',
        height: '3px',
        background: 'linear-gradient(90deg, #a855f7, #ec4899)',
        margin: '0.75rem auto',
        borderRadius: '2px'
      }}></div>
    </motion.div>
  );

  // --- Card Wrapper ---
  const Card = ({ children, className = '' }) => (
    <div
      style={{
        background: 'rgba(30, 41, 59, 0.6)',
        backdropFilter: 'blur(20px)',
        borderRadius: '1.5rem',
        padding: '2rem',
        border: '1px solid rgba(139, 92, 246, 0.3)',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
      }}
      className={className}
    >
      {children}
    </div>
  );

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 25%, #3730a3 50%, #0f172a 100%)',
      color: 'white',
      fontFamily: "'Inter', sans-serif",
      overflowX: 'hidden'
    }}>
      {/* Animated Background */}
      <div style={{
        position: 'fixed',
        top: mousePosition.y / 50,
        left: mousePosition.x / 50,
        width: 'clamp(100px, 20vw, 200px)',
        height: 'clamp(100px, 20vw, 200px)',
        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 0
      }} />
      <div style={{
        position: 'fixed',
        bottom: mousePosition.y / 40,
        right: mousePosition.x / 40,
        width: 'clamp(80px, 15vw, 150px)',
        height: 'clamp(80px, 15vw, 150px)',
        background: 'radial-gradient(circle, rgba(236, 72, 153, 0.1) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 0
      }} />

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
              fontSize: '1.5rem',
              fontWeight: '800',
              background: 'linear-gradient(90deg, #a855f7, #ec4899)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Tanjim
          </motion.div>

          {/* Desktop Nav */}
          <div style={{ display: isMobile ? 'none' : 'flex', gap: '2rem' }}>
            {['about', 'experience', 'education', 'skills', 'contact'].map((item) => (
              <motion.button
                key={item}
                onClick={() => scrollToSection(item)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: activeSection === item ? '#a855f7' : '#cbd5e1',
                  fontWeight: activeSection === item ? '600' : '400',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  textTransform: 'capitalize',
                  paddingBottom: '4px'
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
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            style={{ display: isMobile ? 'block' : 'none', background: 'none', border: 'none', color: 'white' }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </motion.button>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMobile && isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              style={{
                background: 'rgba(15, 23, 42, 0.98)',
                padding: '1rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                position: 'absolute',
                top: '80px',
                width: '100%',
                borderTop: '1px solid rgba(139, 92, 246, 0.3)'
              }}
            >
              {['about', 'experience', 'education', 'skills', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    scrollToSection(item);
                    setIsMenuOpen(false);
                  }}
                  style={{
                    padding: '1rem',
                    background: activeSection === item ? 'rgba(139, 92, 246, 0.2)' : 'transparent',
                    border: 'none',
                    color: activeSection === item ? '#a855f7' : '#cbd5e1',
                    textAlign: 'left',
                    borderRadius: '6px',
                    fontSize: '1.1rem'
                  }}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero */}
      <section style={{ paddingTop: '120px', paddingBottom: '6rem', paddingInline: '2rem' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: '4rem',
            alignItems: 'center'
          }}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <Sparkles color="#a855f7" />
                <span style={{
                  background: 'linear-gradient(90deg, #a855f7, #ec4899)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: '700'
                }}>Manufacturing Technology</span>
              </div>
              <h1 style={{
                fontSize: 'clamp(2rem, 8vw, 3.2rem)',
                fontWeight: '900',
                lineHeight: 1.1,
                marginBottom: '1.5rem'
              }}>
                Deputy Assistant <br />
                <span style={{
                  background: 'linear-gradient(90deg, #a855f7, #ec4899)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>Director</span>
              </h1>
              <p style={{ color: '#cbd5e1', lineHeight: 1.7, marginBottom: '2rem' }}>
                Building robust, scalable web applications that drive operational efficiency and digital transformation in manufacturing.
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <motion.button
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection('contact')}
                  style={{
                    padding: '0.875rem 2rem',
                    background: 'linear-gradient(90deg, #7c3aed, #db2777)',
                    borderRadius: '0.75rem',
                    fontWeight: '600',
                    border: 'none',
                    color: 'white',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  Get In Touch <ArrowRight size={18} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection('experience')}
                  style={{
                    padding: '0.875rem 2rem',
                    border: '2px solid rgba(139, 92, 246, 0.5)',
                    borderRadius: '0.75rem',
                    fontWeight: '600',
                    background: 'transparent',
                    color: 'white',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  View Experience <Briefcase size={18} />
                </motion.button>
              </div>
            </motion.div>

            {/* Profile Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ justifySelf: 'center' }}
            >
              <div style={{ position: 'relative', width: '280px', height: '280px', margin: '0 auto' }}>
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
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8), rgba(15, 23, 42, 0.8))',
                  borderRadius: '50%',
                  border: '3px solid rgba(139, 92, 246, 0.4)',
                  backdropFilter: 'blur(10px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden'
                }}>
                  <img
                    src={profileImage}
                    alt="Tanjim - Deputy Assistant Director at WALTON"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" style={{ padding: '6rem 2rem' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <SectionHeader title="About Me" />
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: '2.5rem'
          }}>
            <Card>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <Briefcase color="#a855f7" size={28} />
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  background: 'linear-gradient(90deg, #a855f7, #ec4899)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>Professional Journey</h3>
              </div>
              <p style={{ color: '#cbd5e1', lineHeight: 1.8, marginBottom: '2rem' }}>
                I am currently serving as Deputy Assistant Director in the Manufacturing Automations team at WALTON Hi-Tech Industries PLC.
                With {yearsOfExperience} years of professional experience, I specialize in developing robust, scalable, and business-critical applications that drive operational efficiency.
              </p>
            </Card>
            <Card>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <Star color="#a855f7" size={28} />
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  background: 'linear-gradient(90deg, #a855f7, #ec4899)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>Core Expertise</h3>
              </div>
              <div style={{ display: 'grid', gap: '1.25rem' }}>
                {[
                  'System Architecture & Scalable Design',
                  'Manufacturing Process Optimization',
                  'Full Stack Web Development (C#, PHP, React)',
                  'Multilingual Support (Bangla/English)',
                  'Technical Troubleshooting & Debugging',
                  'Stakeholder Requirement Translation',
                  'Real-time Reporting & Analytics'
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <CheckCircle color="#10b981" size={20} style={{ marginTop: '0.25rem' }} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" style={{ padding: '6rem 2rem', background: 'rgba(15, 23, 42, 0.2)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <SectionHeader title="Work Experience" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {experiences.map((exp, i) => (
              <Card key={i} style={{ position: 'relative' }}>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '6px',
                  height: '100%',
                  background: exp.type === 'leadership' 
                    ? 'linear-gradient(to bottom, #a855f7, #ec4899)' 
                    : 'linear-gradient(to bottom, #3b82f6, #1d4ed8)',
                  borderRadius: '1.5rem 0 0 1.5rem'
                }}></div>
                <h3 style={{ color: '#a855f7', fontSize: '1.4rem', marginBottom: '0.5rem' }}>{exp.title}</h3>
                <p style={{ color: '#cbd5e1', marginBottom: '0.5rem' }}>{exp.company}</p>
                <div style={{
                  background: 'rgba(124, 58, 237, 0.2)',
                  display: 'inline-block',
                  padding: '0.375rem 1rem',
                  borderRadius: '9999px',
                  marginBottom: '1.5rem',
                  fontSize: '0.9rem'
                }}>{exp.period}</div>
                <p style={{ color: '#cbd5e1', marginBottom: '1.5rem' }}>{exp.description}</p>
                <div>
                  <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                    <Star size={18} color="#a855f7" /> Key Achievements
                  </h4>
                  <ul style={{ paddingLeft: '1.5rem' }}>
                    {exp.achievements.map((ach, j) => (
                      <li key={j} style={{ marginBottom: '0.75rem', color: '#cbd5e1' }}>{ach}</li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Education */}
      <section id="education" style={{ padding: '6rem 2rem', background: 'rgba(15, 25, 48, 0.2)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <SectionHeader title="Education" />
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
            gap: '2rem'
          }}>
            {education.map((edu, i) => (
              <Card key={i} style={{ position: 'relative' }}>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '6px',
                  height: '100%',
                  background: edu.type === 'undergraduate'
                    ? 'linear-gradient(to bottom, #a855f7, #ec4899)'
                    : 'linear-gradient(to bottom, #3b82f6, #1d4ed8)',
                  borderRadius: '1.5rem 0 0 1.5rem'
                }}></div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  <GraduationCap size={24} />
                  <h3 style={{ color: '#a855f7', fontSize: '1.2rem' }}>{edu.degree}</h3>
                </div>
                <p style={{ color: '#cbd5e1', marginBottom: '0.5rem' }}>{edu.institution}</p>
                <div style={{
                  background: 'rgba(124, 58, 237, 0.2)',
                  display: 'inline-block',
                  padding: '0.375rem 1rem',
                  borderRadius: '9999px',
                  marginBottom: '1rem',
                  fontSize: '0.9rem'
                }}>{edu.period}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(15, 23, 42, 0.5)', padding: '0.75rem 1rem', borderRadius: '1rem' }}>
                  <Trophy color="#10b981" size={18} />
                  <span style={{ color: '#10b981', fontWeight: '600' }}>{edu.grade}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" style={{ padding: '6rem 2rem', background: 'rgba(15, 25, 48, 0.2)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <SectionHeader title="Technical Skills" />
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
            gap: '1.75rem'
          }}>
            {skills.map((skill, i) => (
              <Card key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <div>
                    <h3 style={{ fontWeight: '600', marginBottom: '0.25rem' }}>{skill.name}</h3>
                    <span style={{
                      fontSize: '0.8rem',
                      color: '#a855f7',
                      background: 'rgba(139, 92, 246, 0.2)',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '9999px'
                    }}>{skill.category}</span>
                  </div>
                  <span style={{ color: '#a855f7', fontWeight: '700' }}>{skill.level}%</span>
                </div>
                <div style={{
                  width: '100%',
                  height: '8px',
                  background: 'rgba(15, 23, 42, 0.5)',
                  borderRadius: '9999px',
                  overflow: 'hidden'
                }}>
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 }}
                    style={{
                      height: '100%',
                      background: 'linear-gradient(90deg, #7c3aed, #db2777)',
                      borderRadius: '9999px'
                    }}
                  />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" style={{ padding: '6rem 2rem', background: 'rgba(15, 23, 42, 0.2)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <SectionHeader title="Get In Touch" />
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: '3rem'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {[
                { icon: Mail, title: 'Email', value: 'tanjimjoy@gmail.com', link: 'mailto:tanjimjoy@gmail.com' },
                { icon: Phone, title: 'Phone', value: '+880 1838 120302', link: 'tel:+8801838120302' },
                { icon: MapPin, title: 'Location', value: 'Gazipur, Bangladesh' }
              ].map((item, i) => (
                <a key={i} href={item.link} style={{ display: 'flex', gap: '1.25rem', textDecoration: 'none', color: 'inherit' }}>
                  <div style={{
                    background: 'rgba(124, 58, 237, 0.2)',
                    width: '56px',
                    height: '56px',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <item.icon size={24} color="#a855f7" />
                  </div>
                  <div>
                    <h3 style={{ fontWeight: '600', marginBottom: '0.25rem' }}>{item.title}</h3>
                    <p style={{ color: '#cbd5e1' }}>{item.value}</p>
                  </div>
                </a>
              ))}

              <div>
                <h3 style={{ fontWeight: '600', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <MessageSquare size={20} color="#a855f7" /> Connect With Me
                </h3>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  {[
                    { icon: Github, color: '#7c3aed', url: 'https://github.com/Tanjim-joy' },
                    { icon: Linkedin, color: '#3b82f6', url: 'https://www.linkedin.com/in/tangimul/' },
                    { icon: MessageSquare, color: '#25D366', url: 'https://wa.me/8801838120302' }
                  ].map((s, i) => (
                    <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" style={{
                      background: `rgba(${parseInt(s.color.slice(1, 3), 16)}, ${parseInt(s.color.slice(3, 5), 16)}, ${parseInt(s.color.slice(5, 7), 16)}, 0.2)`,
                      width: '50px',
                      height: '50px',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: `1px solid ${s.color}40`
                    }}>
                      <s.icon size={22} color={s.color} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <Card>
              <form ref={formRef} onSubmit={handleEmailSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    style={{
                      width: '100%',
                      padding: '0.875rem 1.25rem',
                      background: 'rgba(15, 23, 42, 0.6)',
                      border: '1px solid rgba(139, 92, 246, 0.4)',
                      borderRadius: '12px',
                      color: 'white'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    style={{
                      width: '100%',
                      padding: '0.875rem 1.25rem',
                      background: 'rgba(15, 23, 42, 0.6)',
                      border: '1px solid rgba(139, 92, 246, 0.4)',
                      borderRadius: '12px',
                      color: 'white'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Message</label>
                  <textarea
                    name="message"
                    required
                    rows="4"
                    style={{
                      width: '100%',
                      padding: '0.875rem 1.25rem',
                      background: 'rgba(15, 23, 42, 0.6)',
                      border: '1px solid rgba(139, 92, 246, 0.4)',
                      borderRadius: '12px',
                      color: 'white',
                      resize: 'vertical'
                    }}
                  ></textarea>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  style={{
                    padding: '0.875rem',
                    background: 'linear-gradient(90deg, #7c3aed, #db2777)',
                    borderRadius: '12px',
                    fontWeight: '600',
                    border: 'none',
                    color: 'white',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                  }}
                >
                  Send Message <ArrowRight size={18} />
                </motion.button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '3rem 2rem', borderTop: '1px solid rgba(139, 92, 246, 0.3)', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
          <Code size={20} color="#a855f7" />
          <span style={{
            fontWeight: '700',
            background: 'linear-gradient(90deg, #a855f7, #ec4899)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>Tanjim</span>
        </div>
        <p style={{ color: '#94a3b8' }}>
          © 2026 Tanjim. All rights reserved. Crafted with precision and passion.
        </p>
      </footer>

      {/* Global Styles */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.05); }
        }
        * { box-sizing: border-box; }
        body { margin: 0; font-family: 'Inter', sans-serif; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #1e293b; }
        ::-webkit-scrollbar-thumb { background: #7c3aed; border-radius: 20px; }
      `}</style>
    </div>
  );
};

export default Portfolio;
