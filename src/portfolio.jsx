import React, { useState, useEffect } from 'react';
import { Database, Briefcase, Code, GraduationCap, Mail, Phone, MapPin, Github, MessageCircle, Linkedin, Calendar, Award, MessageSquare, ArrowRight, CheckCircle, Sparkles, Star, Trophy, User } from 'lucide-react';

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
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = () => {
    alert('Message sent successfully!');
    setFormData({ name: '', email: '', message: '' });
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'experience', 'projects', 'education', 'skills', 'contact'];
      const scrollPosition = window.scrollY + 100;
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && scrollPosition >= element.offsetTop && scrollPosition < element.offsetTop + element.offsetHeight) {
          setActiveSection(section);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const skills = [
    { name: 'HTML5', level: 95, category: 'Frontend' },
    { name: 'CSS3', level: 95, category: 'Frontend' },
    { name: 'JavaScript', level: 80, category: 'Frontend' },
    { name: 'React', level: 50, category: 'Frontend' },
    { name: 'C#', level: 90, category: 'Backend' },
    { name: 'ASP.NET Core', level: 85, category: 'Backend' },
    { name: 'PHP', level: 85, category: 'Backend' },
    { name: 'MySQL', level: 90, category: 'Database' },
    { name: 'Git', level: 88, category: 'DevOps' },
    { name: 'Docker', level: 80, category: 'DevOps' }
  ];

  const projects = [
    {
      title: 'Coaching Center Management System',
      description: 'A comprehensive web application for managing coaching center operations including student enrollment, course management, attendance tracking, and performance analytics.',
      technologies: ['ASP.NET Core 8', 'C#', 'Bootstrap', 'MySQL'],
      features: ['Student enrollment', 'Attendance tracking', 'Fee collection', 'Performance analytics', 'Role-based access'],
      liveLink: 'https://tanjims.bsite.net/Identity/Account/Login',
      type: 'enterprise'
    },
    {
      title: 'Inventory Management System',
      description: 'A robust inventory management solution for tracking stock levels, managing suppliers, and generating comprehensive business reports.',
      technologies: ['ASP.NET Core 8', 'C#', 'MySQL', 'RESTful API'],
      features: ['Real-time tracking', 'Supplier management', 'Stock alerts', 'Purchase orders', 'Reports'],
      liveLink: 'https://inventorysys.bsite.net/Identity/Account/Login',
      type: 'business'
    }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 25%, #3730a3 50%, #0f172a 100%)',
      color: 'white',
      fontFamily: "'Inter', sans-serif"
    }}>
      {/* Background */}
      <div style={{
        position: 'fixed',
        top: mousePosition.y / 50,
        left: mousePosition.x / 50,
        width: '200px',
        height: '200px',
        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none'
      }} />

      {/* Navigation */}
      <nav style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        background: 'rgba(15, 23, 42, 0.95)',
        backdropFilter: 'blur(20px)',
        zIndex: 1000,
        borderBottom: '1px solid rgba(139, 92, 246, 0.3)'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '70px'
        }}>
          <div style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            background: 'linear-gradient(90deg, #a855f7, #ec4899)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Tangimul Haque
          </div>

          <div style={{ display: isMobile ? 'none' : 'flex', gap: '2rem' }}>
            {['about', 'experience', 'projects', 'education', 'skills', 'contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                style={{
                  background: 'transparent',
                  textTransform: 'capitalize',
                  border: 'none',
                  color: activeSection === item ? '#a855f7' : '#cbd5e1',
                  fontWeight: activeSection === item ? '600' : '400',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  position: 'relative',
                  paddingBottom: '4px'
                }}
              >
                {item}
                {activeSection === item && (
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: 'linear-gradient(90deg, #a855f7, #ec4899)'
                  }} />
                )}
              </button>
            ))}
          </div>

          <button
            style={{
              display: isMobile ? 'block' : 'none',
              background: 'transparent',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              fontSize: '1.5rem'
            }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            ☰
          </button>
        </div>

        {isMobile && isMenuOpen && (
          <div style={{
            background: 'rgba(15, 23, 42, 0.98)',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem'
          }}>
            {['about', 'experience', 'projects', 'education', 'skills', 'contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                style={{
                  padding: '1rem',
                  background: activeSection === item ? 'rgba(139, 92, 246, 0.2)' : 'transparent',
                  border: 'none',
                  color: activeSection === item ? '#a855f7' : '#cbd5e1',
                  textTransform: 'capitalize',
                  textAlign: 'left',
                  cursor: 'pointer',
                  borderRadius: '4px'
                }}
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Hero */}
      <section style={{ padding: '10rem 2rem 6rem', textAlign: 'center' }}>
        <Sparkles style={{ color: '#a855f7', width: '2rem', height: '2rem', margin: '0 auto 1rem' }} />
        <h1 style={{
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: 'bold',
          marginBottom: '1rem',
          background: 'linear-gradient(90deg, #a855f7, #ec4899)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Deputy Assistant Director
        </h1>
        <p style={{ fontSize: '1.25rem', color: '#cbd5e1', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
          Building robust web applications for manufacturing automation
        </p>
        <button
          onClick={() => scrollToSection('contact')}
          style={{
            padding: '1rem 2rem',
            background: 'linear-gradient(90deg, #7c3aed, #db2777)',
            border: 'none',
            borderRadius: '0.75rem',
            color: 'white',
            fontWeight: '600',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          Get In Touch
        </button>
      </section>

      {/* About */}
      <section id="about" style={{ padding: '6rem 2rem', background: 'rgba(15, 23, 42, 0.3)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '3rem',
            background: 'linear-gradient(90deg, #a855f7, #ec4899)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>About Me</h2>
          <p style={{ fontSize: '1.1rem', color: '#cbd5e1', lineHeight: '1.8', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
            I am currently serving as Deputy Assistant Director at WALTON Hi-Tech Industries PLC with {years} years of experience in developing business-critical web applications for manufacturing automation.
          </p>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" style={{ padding: '6rem 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '3rem',
            background: 'linear-gradient(90deg, #a855f7, #ec4899)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>Experience</h2>
          <div style={{
            background: 'rgba(30, 41, 59, 0.6)',
            padding: '2rem',
            borderRadius: '1rem',
            border: '1px solid rgba(139, 92, 246, 0.3)'
          }}>
            <h3 style={{ fontSize: '1.5rem', color: '#a855f7', marginBottom: '0.5rem' }}>Deputy Assistant Director</h3>
            <p style={{ color: '#cbd5e1', marginBottom: '1rem' }}>WALTON Hi-Tech Industries PLC • Present</p>
            <p style={{ color: '#cbd5e1', lineHeight: '1.6' }}>
              Leading the Manufacturing Automations team in developing robust web applications for operational efficiency.
            </p>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" style={{ padding: '6rem 2rem', background: 'rgba(15, 23, 42, 0.3)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '3rem',
            background: 'linear-gradient(90deg, #a855f7, #ec4899)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>Projects</h2>
          <div style={{ display: 'grid', gap: '2rem' }}>
            {projects.map((project, index) => (
              <div
                key={index}
                style={{
                  background: 'rgba(30, 41, 59, 0.6)',
                  padding: '2rem',
                  borderRadius: '1rem',
                  border: '1px solid rgba(139, 92, 246, 0.3)'
                }}
              >
                <h3 style={{ fontSize: '1.5rem', color: '#a855f7', marginBottom: '1rem' }}>{project.title}</h3>
                <p style={{ color: '#cbd5e1', marginBottom: '1rem', lineHeight: '1.6' }}>{project.description}</p>
                
                <div style={{ marginBottom: '1rem' }}>
                  <h4 style={{ color: '#c084fc', fontSize: '1rem', marginBottom: '0.5rem' }}>Technologies:</h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {project.technologies.map((tech, i) => (
                      <span key={i} style={{
                        background: 'rgba(139, 92, 246, 0.2)',
                        padding: '0.5rem 1rem',
                        borderRadius: '999px',
                        color: '#c084fc',
                        fontSize: '0.9rem'
                      }}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <h4 style={{ color: '#c084fc', fontSize: '1rem', marginBottom: '0.5rem' }}>Key Features:</h4>
                  <ul style={{ paddingLeft: '1.5rem', color: '#cbd5e1' }}>
                    {project.features.map((feature, i) => (
                      <li key={i} style={{ marginBottom: '0.25rem' }}>{feature}</li>
                    ))}
                  </ul>
                </div>

                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-block',
                    padding: '0.75rem 1.5rem',
                    background: 'linear-gradient(90deg, #7c3aed, #db2777)',
                    borderRadius: '0.5rem',
                    color: 'white',
                    textDecoration: 'none',
                    fontWeight: '600'
                  }}
                >
                  View Live Project →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education */}
      <section id="education" style={{ padding: '6rem 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '3rem',
            background: 'linear-gradient(90deg, #a855f7, #ec4899)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>Education</h2>
          <div style={{
            background: 'rgba(30, 41, 59, 0.6)',
            padding: '2rem',
            borderRadius: '1rem',
            border: '1px solid rgba(139, 92, 246, 0.3)'
          }}>
            <h3 style={{ fontSize: '1.5rem', color: '#a855f7', marginBottom: '0.5rem' }}>
              B.Sc. in Computer Science & Engineering
            </h3>
            <p style={{ color: '#cbd5e1' }}>City University Bangladesh • 2018-2022 • CGPA: 2.95/4.00</p>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" style={{ padding: '6rem 2rem', background: 'rgba(15, 23, 42, 0.3)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '3rem',
            background: 'linear-gradient(90deg, #a855f7, #ec4899)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>Skills</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            {skills.map((skill, index) => (
              <div
                key={index}
                style={{
                  background: 'rgba(30, 41, 59, 0.6)',
                  padding: '1.5rem',
                  borderRadius: '1rem',
                  border: '1px solid rgba(139, 92, 246, 0.3)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontWeight: '600' }}>{skill.name}</span>
                  <span style={{ color: '#a855f7' }}>{skill.level}%</span>
                </div>
                <div style={{
                  width: '100%',
                  background: 'rgba(15, 23, 42, 0.5)',
                  borderRadius: '999px',
                  height: '10px'
                }}>
                  <div style={{
                    width: `${skill.level}%`,
                    background: 'linear-gradient(90deg, #7c3aed, #db2777)',
                    height: '100%',
                    borderRadius: '999px'
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" style={{ padding: '6rem 2rem' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '3rem',
            background: 'linear-gradient(90deg, #a855f7, #ec4899)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>Contact</h2>
          
          <div style={{ display: 'grid', gap: '1.5rem', marginBottom: '2rem' }}>
            <input
              type="text"
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              style={{
                padding: '1rem',
                background: 'rgba(30, 41, 59, 0.6)',
                border: '1px solid rgba(139, 92, 246, 0.3)',
                borderRadius: '0.5rem',
                color: 'white',
                fontSize: '1rem'
              }}
            />
            <input
              type="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              style={{
                padding: '1rem',
                background: 'rgba(30, 41, 59, 0.6)',
                border: '1px solid rgba(139, 92, 246, 0.3)',
                borderRadius: '0.5rem',
                color: 'white',
                fontSize: '1rem'
              }}
            />
            <textarea
              placeholder="Your Message"
              rows="5"
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              style={{
                padding: '1rem',
                background: 'rgba(30, 41, 59, 0.6)',
                border: '1px solid rgba(139, 92, 246, 0.3)',
                borderRadius: '0.5rem',
                color: 'white',
                resize: 'vertical',
                fontSize: '1rem'
              }}
            />
            <button
              onClick={handleSubmit}
              style={{
                padding: '1rem',
                background: 'linear-gradient(90deg, #7c3aed, #db2777)',
                border: 'none',
                borderRadius: '0.5rem',
                color: 'white',
                fontWeight: '600',
                cursor: 'pointer',
                fontSize: '1rem'
              }}
            >
              Send Message
            </button>
          </div>

          <div style={{ textAlign: 'center' }}>
            <p style={{ color: '#cbd5e1', marginBottom: '1rem' }}>📧 tanjimjoy@gmail.com</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
              <a href="https://github.com/Tanjim-joy" target="_blank" rel="noopener noreferrer" style={{ color: '#a855f7' }}>
                <Github />
              </a>
              <a href="https://www.linkedin.com/in/tangimul/" target="_blank" rel="noopener noreferrer" style={{ color: '#a855f7' }}>
                <Linkedin />
              </a>
              <a href="https://wa.me/8801838120302" target="_blank" rel="noopener noreferrer" style={{ color: '#a855f7' }}>
                <MessageCircle />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: '2rem',
        borderTop: '1px solid rgba(139, 92, 246, 0.3)',
        textAlign: 'center',
        color: '#94a3b8'
      }}>
        <p>© 2026 Tangimul Haque. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Portfolio;
