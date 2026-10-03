import React, { useState, useEffect, useRef } from 'react';
import {
  Database, User, Briefcase, Code, GraduationCap, Mail, Phone,
  MapPin, Github, Twitter, MessageCircle, Linkedin, Calendar,
  Award, MessageSquare, ArrowRight, CheckCircle, Sparkles, Star,
  BookOpen, Trophy, Moon, Sun, Download, Copy, ArrowUp, X, GitBranch,
  GitCommit, GitPullRequest, Activity, TrendingUp, Flame, BarChart3
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import profileImage from './assets/2.png';
import emailjs from '@emailjs/browser';

// Constants
const careerStartDate = new Date(2016, 1, 1);    // Site Engineer at Fair & Appropriate Technology
const startdate = new Date(2023, 2, 1);          // Software Engineer apprenticeship at WALTON
const presentDate = new Date();
const yearsSinceStart = presentDate - startdate;
const careerMs = presentDate - careerStartDate;
const diffInDays = yearsSinceStart / (1000 * 60 * 60 * 24);
const careerDays = careerMs / (1000 * 60 * 60 * 24);
const years = (diffInDays / 365.25).toFixed(1);
const careerYears = Math.floor(careerDays / 365.25);
const currentYear = new Date().getFullYear();

const Portfolio = () => {
  // State Management
  const [activeSection, setActiveSection] = useState('about');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [formStatus, setFormStatus] = useState('idle');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeProjectFilter, setActiveProjectFilter] = useState('all');
  const [activeSkillCategory, setActiveSkillCategory] = useState('All Skills');
  const [activeGitHubTab, setActiveGitHubTab] = useState('streak');
  const [githubImageErrors, setGithubImageErrors] = useState({});
  const [githubProfileData, setGithubProfileData] = useState(null);
  const [githubRepoData, setGithubRepoData] = useState(null);
  
  
  // Refs
  const formRef = useRef(null);

  // Scroll Progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30});

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  

  // Screen Size Detection
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) {
        setIsMenuOpen(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Loading State Simulation
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Scroll Progress & Back to Top
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 600);
      
      // Active Section Detection
      const sections = ['about', 'experience', 'education', 'skills', 'github', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 150;
      
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
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Dark Mode Persistence
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
      document.documentElement.classList.toggle('light-mode', savedTheme === 'light');
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
    document.documentElement.classList.toggle('light-mode', !newMode);
  };

  // Smooth Scroll
  const scrollToSection = (sectionId) => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }  
    
    setTimeout(() => {
      const element = document.getElementById(sectionId);       
      if (element) {
        const headerOffset = 90; 
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = Math.max(elementPosition - headerOffset, 0);
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    }, 100);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Copy Email Handler
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('tanjimjoy@gmail.com');
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  // Form Submission
  const handleEmailSubmit = (e) => {
    e.preventDefault();
    setFormStatus('sending');
    
    const form = e.target;
    emailjs
      .sendForm('service_9813qpj', 'template_w58csw3', form, 'mO3ekIk2blRx-9J8d')
      .then(
        (result) => {
          console.log('Email sent successfully:', result.text);
          setFormStatus('success');
          form.reset();
          setTimeout(() => setFormStatus('idle'), 3000);
        },
        (error) => {
          console.error('Error sending email:', error.text);
          setFormStatus('error');
          setTimeout(() => setFormStatus('idle'), 3000);
        }
      );
  };
  
  // Data Arrays
  const skills = [
    { name: 'HTML5', level: 95, category: 'Frontend' },
    { name: 'CSS3', level: 95, category: 'Frontend' },
    { name: 'Bootstrap', level: 95, category: 'Frontend' },
    { name: 'JavaScript', level: 80, category: 'Frontend' },
    { name: 'jQuery', level: 80, category: 'Frontend' },
    { name: 'React', level: 75, category: 'Frontend' },
    { name: 'Redux', level: 70, category: 'Frontend' },
    { name: 'AJAX', level: 85, category: 'Frontend' },
    { name: 'JSON', level: 85, category: 'Frontend' },
    { name: 'PHP', level: 85, category: 'Backend' },
    { name: 'Node.js', level: 70, category: 'Backend' },
    { name: 'Express', level: 70, category: 'Backend' },
    { name: 'C#', level: 95, category: 'Backend' },
    { name: 'WPF', level: 88, category: 'Backend' },
    { name: 'ASP.NET Core', level: 85, category: 'Backend' },
    { name: 'Golang', level: 50, category: 'Backend'},
    { name: 'API Development', level: 85, category: 'Backend' },
    { name: 'MySQL', level: 90, category: 'Database' },
    { name: 'SQL', level: 90, category: 'Database' },
    { name: 'Database Optimization', level: 75, category: 'Database' },
    { name: 'Indexing & Query Optimization', level: 85, category: 'Database' },
    { name: 'Git', level: 88, category: 'DevOps' },
    { name: 'Docker', level: 88, category: 'DevOps' },
    { name: 'CI/CD (GitHub Actions)', level: 70, category: 'DevOps' },
    { name: 'Container Orchestration (Docker Compose)', level: 85, category: 'DevOps' },
    { name: 'System Design & Architecture', level: 82, category: 'Architecture' },
    { name: 'Clean Architecture', level: 80, category: 'Architecture' },
    { name: 'SOLID Principles', level: 90, category: 'Architecture' },
    { name: 'Design Patterns', level: 85, category: 'Architecture' },
    { name: 'Scalable System Design', level: 75, category: 'Architecture' },
    { name: 'Requirements Engineering', level: 95, category: 'Process' },
    { name: 'Agile / Scrum', level: 75, category: 'Process' },
    { name: 'Code Review', level: 90, category: 'Process' },
    { name: 'Technical Documentation', level: 85, category: 'Process' },
    { name: 'Problem Solving', level: 50, category: 'Process' },
    { name: 'Unit Testing', level: 75, category: 'Testing' },
    { name: 'Integration Testing', level: 70, category: 'Testing' },    
    { name: 'Postman', level: 90, category: 'Testing' },
    { name: 'Microwave Link Configuration', level: 85, category: 'Telecom' },
    { name: 'Antenna Installation & Alignment', level: 82, category: 'Telecom' },
    { name: 'Link Commissioning & Testing', level: 80, category: 'Telecom' },
    { name: 'RF Troubleshooting', level: 78, category: 'Telecom' },
  ];

  const projects = [
    {
      title: 'Coaching Center Management System',
      description: 'A comprehensive web application for managing coaching center operations including student enrollment, course management, attendance tracking, and performance analytics.',
      technologies: ['ASP.NET Core 8', 'C#', 'Bootstrap', 'MySQL'],
      features: ['Student enrollment', 'Attendance tracking', 'Fee collection', 'Performance analytics', 'Role-based access'],
      liveLink: 'https://tanjims.bsite.net/Identity/Account/Login',
      type: 'enterprise',
      image: '/Features-of-coaching-class-software.jpg'
    },
    {
      title: 'Inventory Management System',
      description: 'A robust inventory management solution for tracking stock levels, managing suppliers, and generating comprehensive business reports.',
      technologies: ['ASP.NET Core 8', 'C#', 'MySQL', 'RESTful API'],
      features: ['Real-time tracking', 'Supplier management', 'Stock alerts', 'Purchase orders', 'Reports'],
      liveLink: 'https://inventorysys.bsite.net/Identity/Account/Login',
      type: 'business',
      image: '/inventory-management-system-services-870.jpg'
    },
    {
      title: 'GPS Fleet Tracking & Geofence Management System',
      description: 'A real-time fleet tracking solution built with React and MySQL, featuring geofence alerts, route visualization, and integrated reporting.',
      technologies: ['React', 'Vite', 'MySQL', 'RESTful API'],
      features: ['Live GPS tracking', 'Geofence alerts', 'Route history', 'Driver management', 'Telegram notifications'],
      liveLink: 'https://github.com/Tanjim-joy/GPS-Tracker-',
      type: 'business',
      image: '/Gps_track.webp'
    }
  ];

  const experiences = [
    {
      title: 'Senior Deputy Assistant Director',
      company: 'WALTON Hi-Tech Industries PLC',
      period: 'Oct 2026 - Present',
      duration: 'Promoted 1 Oct 2026',
      badge: 'Promoted on 1 October 2026',
      employmentType: 'Full-time',
      workMode: 'On-site',
      location: 'Gazipur District, Dhaka, Bangladesh',
      skills: ['Software Development', 'Node.js', 'C#', 'ASP.NET Core', 'Team Leadership'],
      description: 'Promoted to Senior Deputy Assistant Director on 1 October 2026. Leading the Manufacturing Automations team in developing robust, scalable web applications that drive operational efficiency and digital transformation in manufacturing processes.',
      achievements: [
        'Developed desktop applications for label printing and packing using C#, .NET, and WPF, streamlining production and logistics operations',
        'Designed and implemented enterprise-level web applications using ASP.NET Core and C#',
        'Led cross-functional teams to deliver complex projects on time and within budget',
        'Designed automation systems optimizing business workflows in large-scale industrial environments',
        'Built and maintained large-scale, data-intensive web applications with focus on performance and security',
        'Engaged directly with stakeholders to gather and translate business requirements into system designs',
      ],
      type: 'leadership',
    },
    {
      title: 'Deputy Assistant Director',
      company: 'WALTON Hi-Tech Industries PLC',
      period: 'Dec 2024 - Oct 2026',
      duration: '1 yr 11 mos',
      employmentType: 'Full-time',
      workMode: 'On-site',
      location: 'Gazipur District, Dhaka, Bangladesh',
      skills: ['Software Development', 'Node.js', 'C#', '.NET'],
      description: 'Served as Deputy Assistant Director within the Manufacturing Automations team, delivering business-critical applications and automation solutions for manufacturing operations.',
      achievements: [
        'Implemented enterprise-level solutions using PHP, C# & .NET and database technologies',
        'Led API development projects integrating multiple internal systems',
        'Improved system performance by 40% through code optimization and database tuning',
        'Reduced deployment time by 60% through Docker-based environments',
        'Designed reusable modules reducing future development effort by 30%',
        'Maintained and enhanced existing applications, ensuring high availability and performance in a production environment',
      ],
      type: 'leadership',
    },
    {
      title: 'Senior Principal Officer',
      company: 'WALTON Hi-Tech Industries PLC',
      period: 'Sep 2023 - Dec 2024',
      duration: '1 yr 4 mos',
      employmentType: 'Full-time',
      workMode: 'On-site',
      location: 'Gazipur, Dhaka, Bangladesh',
      skills: ['Software Development', 'Node.js', 'C#', 'MySQL'],
      description: 'Worked as Senior Principal Officer building and maintaining manufacturing web applications, translating production requirements into reliable software deliverables.',
      achievements: [
        'Developed and maintained production web applications serving manufacturing operations',
        'Collaborated with production teams to gather, clarify, and prioritize business requirements',
        'Wrote efficient SQL queries and tuned database schemas for reporting workloads',
        'Participated in code reviews and enforced coding standards across the team',
        'Resolved production defects and provided technical support to end users',
      ],
      type: 'leadership',
    },
    {
      title: 'Principal Officer',
      company: 'WALTON Hi-Tech Industries PLC',
      period: 'Sep 2023 - Mar 2024',
      duration: '7 mos',
      employmentType: 'Full-time',
      location: 'Gazipur District, Dhaka, Bangladesh',
      skills: ['Software Development', 'C#', 'Database'],
      description: 'Joined WALTON as Principal Officer, moving from field engineering into software development for manufacturing operations.',
      achievements: [
        'Transitioned from telecom field engineering into enterprise software development',
        'Gained hands-on experience building desktop and web applications for manufacturing',
        'Worked within an agile team environment with regular deliverables and reviews',
        'Documented technical designs and development workflows',
      ],
      type: 'development',
    },
    {
      title: 'Software Engineer',
      subtitle: 'Apprenticeship',
      company: 'WALTON Hi-Tech Industries PLC',
      period: 'Mar 2023 - Sep 2023',
      duration: '7 mos',
      employmentType: 'Apprenticeship',
      location: 'Gazipur District, Dhaka, Bangladesh',
      skills: ['C#', '.NET', 'SQL', 'Software Development'],
      description: 'Started the software career as a Software Engineer apprentice at WALTON Hi-Tech Industries PLC, learning enterprise application development in a manufacturing environment.',
      achievements: [
        'Completed an apprenticeship program in enterprise software development',
        'Built foundational applications using C# and .NET',
        'Learned SQL and relational database fundamentals for application data',
        'Worked under senior developers on live manufacturing projects',
      ],
      type: 'development',
    },
    {
      title: 'Site Engineer',
      company: 'Fair and Appropriate Technology Ltd.',
      period: 'Feb 2016 - Mar 2017',
      duration: '1 yr 2 mos',
      location: 'Bashati Dream House # 3, A 2 (2nd Floor), Road # 20, Gulshan-01, Dhaka',
      skills: ['Communication', 'Teamwork', 'Microwave Links'],
      description: 'Worked as a Site Engineer responsible for microwave link configuration, installation and commissioning of telecommunications infrastructure at field locations.',
      achievements: [
        'Configured microwave link equipment and established new point-to-point connectivity between sites',
        'Installed microwave antennas, feeders, and associated hardware at field locations',
        'Commissioned newly installed links by verifying signal strength, alignment, and end-to-end connectivity',
        'Diagnosed and troubleshot link degradation, hardware faults, and performance issues to restore service quality',
        'Documented link configuration, test results, and commissioning reports for project handover',
      ],
      type: 'field',
    },
  ];

  // Accent theming per experience type
  const experienceTheme = {
    leadership: {
      accent: 'linear-gradient(to bottom, #a855f7, #ec4899)',
      title: '#a855f7',
      chipBg: isDarkMode ? 'rgba(124, 58, 237, 0.2)' : 'rgba(124, 58, 237, 0.1)',
      chipText: '#c084fc',
      chipBorder: isDarkMode ? 'rgba(139, 92, 246, 0.3)' : 'rgba(124, 58, 237, 0.2)'
    },
    development: {
      accent: 'linear-gradient(to bottom, #3b82f6, #1d4ed8)',
      title: '#3b82f6',
      chipBg: isDarkMode ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.1)',
      chipText: '#93c5fd',
      chipBorder: isDarkMode ? 'rgba(59, 130, 246, 0.3)' : 'rgba(59, 130, 246, 0.2)'
    },
    field: {
      accent: 'linear-gradient(to bottom, #10b981, #34d399)',
      title: '#10b981',
      chipBg: isDarkMode ? 'rgba(16, 185, 129, 0.2)' : 'rgba(16, 185, 129, 0.1)',
      chipText: '#6ee7b7',
      chipBorder: isDarkMode ? 'rgba(16, 185, 129, 0.3)' : 'rgba(16, 185, 129, 0.2)'
    }
  };

  const education = [
    {
      degree: 'Bachelor of Science in Computer Science & Engineering',
      institution: 'City University Bangladesh',
      period: '2018 - 2022',
      type: 'Undergraduate',
    },
    {
      degree: 'Diploma in Telecommunication Engineering',
      institution: 'Institute of Information Technology Bogura',
      period: '2011 - 2015',
      type: 'Diploma',
    },
    {
      degree: 'Secondary School Certificate (Electrical)',
      institution: 'Technical Secondary School & College Chapainawabganj',
      period: '2010',
      type: 'SSC',
    },
    {
      degree: 'Web Application Development Using ASP.NET',
      institution: 'IsDB-BISEW IT Scholarship Program',
      period: '2021',
      type: 'Certification',
    },
  ];

  const navItems = ['about', 'experience', 'education', 'skills', 'github', 'projects', 'contact'];
  const projectFilters = ['all', 'enterprise', 'business'];

  // GitHub Stats URLs
  const githubUsername = 'Tanjim-joy';
  const githubStatsTheme = isDarkMode ? 'tokyonight' : 'swift';
  
  const githubImages = {
    streak: `https://github-readme-streak-stats.herokuapp.com/?user=${githubUsername}&theme=${isDarkMode ? 'tokyonight' : 'swift'}&hide_border=true&border_radius=12&ring=a855f7&fire=ec4899&currStreakLabel=a855f7`,
    stats: `https://github-readme-stats.vercel.app/api?username=${githubUsername}&show_icons=true&theme=${githubStatsTheme}&hide_border=true&border_radius=12&icon_color=a855f7&title_color=a855f7&ring_color=ec4899`,
    languages: `https://github-readme-stats.vercel.app/api/top-langs/?username=${githubUsername}&layout=compact&theme=${githubStatsTheme}&hide_border=true&border_radius=12&title_color=a855f7&text_color=${isDarkMode ? 'cbd5e1' : '475569'}&langs_count=8`,
    trophy: `https://github-profile-trophy.vercel.app/?username=${githubUsername}&theme=algolia&no-frame=true&no-bg=true&margin-w=8&margin-h=8&column=4`,
    contribution: `https://ghchart.rshah.org/a855f7/${githubUsername}`,
    activity: `https://github-readme-activity-graph.vercel.app/graph?username=${githubUsername}&theme=${isDarkMode ? 'tokyo-night' : 'minimal'}&hide_border=true&area=true&bg_color=00000000&color=a855f7&line=ec4899&point=ec4899&area_color=a855f7`
  };

  const githubTabs = [
    { id: 'streak', label: 'Streak Stats', icon: Flame },
    { id: 'stats', label: 'Profile Stats', icon: BarChart3 },
    { id: 'languages', label: 'Top Languages', icon: Code },
    { id: 'activity', label: 'Activity Graph', icon: Activity },
    { id: 'trophy', label: 'Trophies', icon: Trophy }
  ];

  useEffect(() => {
    let cancelled = false;

    const fetchGithubMetrics = async () => {
      try {
        const [profileResponse, reposResponse] = await Promise.all([
          fetch(`https://api.github.com/users/${githubUsername}`, {
            headers: { Accept: 'application/vnd.github+json' }
          }),
          fetch(`https://api.github.com/users/${githubUsername}/repos?per_page=100&sort=updated`, {
            headers: { Accept: 'application/vnd.github+json' }
          })
        ]);

        if (!profileResponse.ok || !reposResponse.ok) {
          throw new Error('GitHub metrics request failed');
        }

        const profile = await profileResponse.json();
        const repos = await reposResponse.json();

        const languageCounts = repos.reduce((acc, repo) => {
          if (repo.language) {
            acc[repo.language] = (acc[repo.language] || 0) + 1;
          }
          return acc;
        }, {});

        const topLanguages = Object.entries(languageCounts)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 3)
          .map(([name]) => name);

        const totalStars = repos.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0);
        const latestPush = repos.find((repo) => repo.pushed_at)?.pushed_at || profile.updated_at;
        const daysSinceActivity = latestPush
          ? Math.max(1, Math.min(365, Math.floor((Date.now() - new Date(latestPush)) / 86400000)))
          : 1;

        if (!cancelled) {
          setGithubProfileData({
            publicRepos: profile.public_repos ?? 0,
            followers: profile.followers ?? 0,
            following: profile.following ?? 0,
            totalStars,
            joinedAt: profile.created_at ?? null,
            updatedAt: profile.updated_at ?? null,
            bio: profile.bio ?? 'Open Source Contributor'
          });
          setGithubRepoData({
            topLanguages,
            latestPush,
            daysSinceActivity
          });
        }
      } catch {
        if (!cancelled) {
          setGithubProfileData(null);
          setGithubRepoData(null);
        }
      }
    };

    fetchGithubMetrics();

    return () => {
      cancelled = true;
    };
  }, [githubUsername]);
  
  // Filter Projects
  const filteredProjects = activeProjectFilter === 'all' 
  ? projects 
  : projects.filter(p => p.type === activeProjectFilter);

  // Filter Skills
  const filteredSkills = activeSkillCategory === 'All Skills'
  ? skills
  : skills.filter(s => s.category === activeSkillCategory);

  const githubSummaryStats = [
    {
      title: 'Current Streak',
      value: githubRepoData ? `${githubRepoData.daysSinceActivity}d` : 'Active',
      description: 'Recent coding activity',
      icon: Flame,
      color: '#ec4899',
      gradient: 'linear-gradient(135deg, rgba(236, 72, 153, 0.15), rgba(236, 72, 153, 0.05))'
    },
    {
      title: 'Total Contributions',
      value: githubProfileData ? `${githubProfileData.publicRepos}` : '0',
      description: 'Public repositories & stars',
      icon: GitCommit,
      color: '#a855f7',
      gradient: 'linear-gradient(135deg, rgba(168, 85, 247, 0.15), rgba(168, 85, 247, 0.05))'
    },
    {
      title: 'Top Languages',
      value: githubRepoData?.topLanguages?.[0] || 'JS',
      description: 'Most active languages on GitHub',
      icon: Code,
      color: '#3b82f6',
      gradient: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(59, 130, 246, 0.05))'
    },
    {
      title: 'Achievements',
      value: githubProfileData ? `${githubProfileData.followers}` : '0',
      description: 'Followers and milestones',
      icon: Trophy,
      color: '#f59e0b',
      gradient: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(245, 158, 11, 0.05))'
    }
  ];

  const githubFallbackItems = (() => {
    if (activeGitHubTab === 'stats') {
      return [
        { label: 'Public Repos', value: githubProfileData?.publicRepos ?? 0 },
        { label: 'Followers', value: githubProfileData?.followers ?? 0 },
        { label: 'Following', value: githubProfileData?.following ?? 0 },
        { label: 'Stars', value: githubProfileData?.totalStars ?? 0 }
      ];
    }

    if (activeGitHubTab === 'languages') {
      const languages = githubRepoData?.topLanguages?.length ? githubRepoData.topLanguages : ['JavaScript'];
      return [
        { label: 'Top Language', value: languages[0] },
        { label: 'Languages', value: languages.slice(0, 3).join(' • ') },
        { label: 'Repos', value: githubProfileData?.publicRepos ?? 0 },
        { label: 'Last Activity', value: githubRepoData?.daysSinceActivity ? `${githubRepoData.daysSinceActivity}d ago` : 'Recent' }
      ];
    }

    return [
      { label: 'Repos', value: githubProfileData?.publicRepos ?? 0 },
      { label: 'Followers', value: githubProfileData?.followers ?? 0 },
      { label: 'Stars', value: githubProfileData?.totalStars ?? 0 },
      { label: 'Top Lang', value: githubRepoData?.topLanguages?.[0] || 'JavaScript' }
    ];
  })();

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  const cardHover = {
    y: -8,
    boxShadow: '0 25px 50px -12px rgba(124, 58, 237, 0.4)',
    borderColor: 'rgba(168, 85, 247, 0.6)',
    transition: { type: 'spring', stiffness: 300, damping: 20 }
  };

  // Loading Skeleton
  if (isLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: isDarkMode 
          ? 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 25%, #3730a3 50%, #0f172a 100%)'
          : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 25%, #cbd5e1 50%, #f8fafc 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          style={{
            width: 'clamp(3rem, 8vw, 4rem)',
            height: 'clamp(3rem, 8vw, 4rem)',
            border: '4px solid rgba(139, 92, 246, 0.3)',
            borderTopColor: '#a855f7',
            borderRadius: '50%'
          }}
        />
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: isDarkMode
        ? 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 25%, #3730a3 50%, #0f172a 100%)'
        : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 25%, #cbd5e1 50%, #f8fafc 100%)',
      color: isDarkMode ? 'white' : '#1e293b',
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      overflowX: 'hidden',
      transition: 'background 0.3s ease, color 0.3s ease'
    }}>
      
      {/* Skip Link for Accessibility */}
      <a
        href="#main-content"
        className="skip-link"
        style={{
          position: 'absolute',
          left: '-9999px',
          top: '0',
          background: '#a855f7',
          color: 'white',
          padding: '1rem 2rem',
          zIndex: 10001,
          borderRadius: '0 0 8px 8px',
          fontWeight: 600
        }}
        onFocus={(e) => e.target.style.left = '0'}
        onBlur={(e) => e.target.style.left = '-9999px'}
      >
        Skip to main content
      </a>

      {/* Animated Background Elements */}
      <motion.div
        animate={{
          x: mousePosition.x / 30,
          y: mousePosition.y / 30,
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 'clamp(200px, 40vw, 400px)',
          height: 'clamp(200px, 40vw, 400px)',
          background: `radial-gradient(circle, ${isDarkMode ? 'rgba(139, 92, 246, 0.15)' : 'rgba(124, 58, 237, 0.1)'} 0%, transparent 70%)`,
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 0,
          filter: 'blur(40px)'
        }}
      />
      <motion.div
        animate={{
          x: -mousePosition.x / 40,
          y: -mousePosition.y / 40,
          scale: [1.1, 1, 1.1]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        style={{
          position: 'fixed',
          bottom: 0,
          right: 0,
          width: 'clamp(150px, 30vw, 300px)',
          height: 'clamp(150px, 30vw, 300px)',
          background: `radial-gradient(circle, ${isDarkMode ? 'rgba(236, 72, 153, 0.15)' : 'rgba(219, 39, 119, 0.1)'} 0%, transparent 70%)`,
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 0,
          filter: 'blur(40px)'
        }}
      />

      {/* Scroll Progress Bar */}
      <motion.div
        style={{
          scaleX,
          height: '3px',
          background: 'linear-gradient(90deg, #a855f7, #ec4899)',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1001,
          transformOrigin: '0%',
          boxShadow: '0 2px 10px rgba(168, 85, 247, 0.3)'
        }}
      />

      {/* Navigation */}
      <nav style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        background: isDarkMode ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        zIndex: 1000,
        borderBottom: `1px solid ${isDarkMode ? 'rgba(139, 92, 246, 0.3)' : 'rgba(124, 58, 237, 0.2)'}`,
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)'
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
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            onClick={() => scrollToSection('about')}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
            aria-label="Go to home section"
          >
            <Code style={{ 
              color: '#a855f7', 
              width: 'clamp(1.5rem, 4vw, 2rem)',
              height: 'clamp(1.5rem, 4vw, 2rem)'
            }} />
            <span style={{
              fontSize: 'clamp(1.2rem, 4vw, 1.8rem)',
              fontWeight: 'bold',
              background: 'linear-gradient(90deg, #a855f7, #ec4899)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '0.5px'
            }}>
              Tangimul
            </span>
          </motion.button>

          {/* Desktop Navigation */}
          <div style={{ display: isMobile ? 'none' : 'flex', gap: 'clamp(0.5rem, 2vw, 1.5rem)', alignItems: 'center' }}>
            {navItems.map((item) => (
              
              <motion.button
                key={item}
                onClick={() => scrollToSection(item)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  position: 'relative',
                  background: 'transparent',
                  border: 'none',
                  padding: '0.5rem 0.25rem',
                  color: activeSection === item 
                    ? '#a855f7' 
                    : (isDarkMode ? '#cbd5e1' : '#475569'),
                  fontWeight: activeSection === item ? '600' : '400',
                  fontSize: 'clamp(0.85rem, 2vw, 1rem)',
                  cursor: 'pointer',
                  textTransform: 'capitalize'
                }}
                aria-current={activeSection === item ? 'page' : undefined}
              >
                {item}
                {activeSection === item && (
             
                  <motion.div
                    layoutId="active-pill"
                    style={{
                      position: 'absolute',
                      bottom: '-4px',
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
            
            {/* Dark Mode Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleDarkMode}
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              style={{
                background: isDarkMode ? 'rgba(139, 92, 246, 0.2)' : 'rgba(124, 58, 237, 0.1)',
                border: `1px solid ${isDarkMode ? 'rgba(139, 92, 246, 0.4)' : 'rgba(124, 58, 237, 0.3)'}`,
                borderRadius: '50%',
                width: '2.5rem',
                height: '2.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: isDarkMode ? '#a855f7' : '#7c3aed'
              }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isDarkMode ? (
                  <motion.div
                    key="moon"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon size={18} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="sun"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sun size={18} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            style={{
              display: isMobile ? 'flex' : 'none',
              color: isDarkMode ? 'white' : '#1e293b',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '0.5rem',
              touchAction: 'manipulation',
              zIndex: 1002
            }}
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                >
                  <X size={28} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                >
                  <svg width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        <AnimatePresence>
          {isMobile && isMenuOpen && (
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeMenu}
              style={{
                position: 'fixed',
                inset: 0,
                top: 'clamp(60px, 10vh, 80px)',
                background: 'rgba(0, 0, 0, 0.2)',
                zIndex: 998,
                pointerEvents: 'none'
              }}
            />
          )}
        </AnimatePresence>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobile && isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                background: isDarkMode ? 'rgba(15, 23, 42, 0.98)' : 'rgba(255, 255, 255, 0.98)',
                backdropFilter: 'blur(20px)',
                padding: '1rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.25rem',
                position: 'absolute',
                top: '100%',
                width: '100%',
                zIndex: 999,
                borderTop: `1px solid ${isDarkMode ? 'rgba(139, 92, 246, 0.3)' : 'rgba(124, 58, 237, 0.2)'}`,
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)'
              }}
            >
              {navItems.map((item) => (
                <motion.button
                  key={item}
                  onClick={() => { scrollToSection(item); setIsMenuOpen(false); }}                  
                  whileHover={{ x: 8 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    padding: '1rem 1.25rem',
                    background: activeSection === item
                      ? (isDarkMode ? 'rgba(139, 92, 246, 0.2)' : 'rgba(124, 58, 237, 0.1)')
                      : 'transparent',
                    border: 'none',
                    color: activeSection === item ? '#a855f7' : (isDarkMode ? '#cbd5e1' : '#475569'),
                    textTransform: 'capitalize',
                    fontSize: '1.05rem',
                    textAlign: 'left',
                    cursor: 'pointer',
                    borderRadius: '0.75rem',
                    fontWeight: activeSection === item ? '600' : '400',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem'
                  }}
                >
                  <span style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: activeSection === item ? '#a855f7' : 'transparent'
                  }} />
                  {item}
                </motion.button>
              ))}
              
              {/* Mobile Dark Mode Toggle */}
              <motion.button
                whileHover={{ x: 8 }}
                onClick={() => { toggleDarkMode(); setIsMenuOpen(false); }}
                style={{
                  padding: '1rem 1.25rem',
                  background: 'transparent',
                  border: 'none',
                  color: isDarkMode ? '#cbd5e1' : '#475569',
                  textTransform: 'capitalize',
                  fontSize: '1.05rem',
                  textAlign: 'left',
                  cursor: 'pointer',
                  borderRadius: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem'
                }}
              >
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'transparent' }} />
                {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content */}
      <main id="main-content">
        
        {/* Hero Section */}
        <section style={{
          padding: 'clamp(5rem, 20vh, 12rem) clamp(1rem, 4vw, 2rem) clamp(4rem, 10vh, 8rem)',
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
              gap: 'clamp(2rem, 6vw, 4rem)',
              alignItems: 'center'
            }} className="hero-grid">
              
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              >
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    marginBottom: '1.5rem',
                    padding: '0.5rem 1rem',
                    background: isDarkMode ? 'rgba(139, 92, 246, 0.15)' : 'rgba(124, 58, 237, 0.1)',
                    borderRadius: '9999px',
                    border: `1px solid ${isDarkMode ? 'rgba(139, 92, 246, 0.3)' : 'rgba(124, 58, 237, 0.2)'}`
                  }}
                >
                  <Sparkles style={{ color: '#a855f7', width: 18, height: 18 }} />
                  <span style={{
                    background: 'linear-gradient(90deg, #a855f7, #ec4899)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontWeight: 700,
                    fontSize: 'clamp(0.85rem, 2.5vw, 1rem)'
                  }}>
                    Manufacturing Technology Expert
                  </span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  style={{
                    fontSize: 'clamp(2rem, 7vw, 4rem)',
                    fontWeight: 800,
                    marginBottom: '1.5rem',
                    lineHeight: 1.1,
                    letterSpacing: '-0.03em'
                  }}
                >
                  <span style={{ display: 'block', color: isDarkMode ? 'white' : '#1e293b' }}>
                    Senior Deputy 
                  </span>
                  <span style={{
                    display: 'block',
                    background: 'linear-gradient(90deg, #a855f7, #ec4899)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    marginTop: '0.25rem',
                    backgroundSize: '200% 200%',
                    animation: 'gradientShift 3s ease infinite'
                  }}>
                    Assistant Director
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  style={{
                    fontSize: 'clamp(1rem, 2.8vw, 1.3rem)',
                    color: isDarkMode ? '#cbd5e1' : '#475569',
                    marginBottom: 'clamp(2rem, 5vw, 3rem)',
                    lineHeight: 1.7,
                    maxWidth: '95%'
                  }}
                >
                  Building robust, scalable web applications that drive operational efficiency 
                  and digital transformation in manufacturing processes.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 'clamp(0.75rem, 2vw, 1.25rem)'
                  }}
                >
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => scrollToSection('contact')}
                    style={{
                      padding: 'clamp(0.75rem, 2vw, 1rem) clamp(1.5rem, 3vw, 2.5rem)',
                      background: 'linear-gradient(90deg, #7c3aed, #db2777)',
                      borderRadius: '1rem',
                      fontWeight: 600,
                      border: 'none',
                      color: 'white',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      boxShadow: '0 10px 30px rgba(124, 58, 237, 0.4)',
                      fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)',
                      minHeight: 48
                    }}
                    aria-label="Get in touch via contact form"
                  >
                    Get In Touch
                    <ArrowRight style={{ width: 20, height: 20 }} />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => scrollToSection('experience')}
                    style={{
                      padding: 'clamp(0.75rem, 2vw, 1rem) clamp(1.5rem, 3vw, 2.5rem)',
                      border: `2px solid ${isDarkMode ? 'rgba(139, 92, 246, 0.5)' : 'rgba(124, 58, 237, 0.4)'}`,
                      borderRadius: '1rem',
                      fontWeight: 600,
                      background: isDarkMode ? 'rgba(139, 92, 246, 0.1)' : 'rgba(124, 58, 237, 0.05)',
                      color: isDarkMode ? 'white' : '#1e293b',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)',
                      minHeight: 48
                    }}
                  >
                    View Experience
                    <Briefcase style={{ width: 20, height: 20 }} />
                  </motion.button>
                </motion.div>

                {/* Quick Stats */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  style={{
                    display: 'flex',
                    gap: '2rem',
                    marginTop: '2.5rem',
                    flexWrap: 'wrap'
                  }}
                >
                  {[
                    { label: 'Years Experience', value: `${careerYears}+` },
                    { label: 'Software & Automation', value: `${years}+` },
                    { label: 'Projects Delivered', value: '15+' },
                    { label: 'Technologies', value: '20+' }
                  ].map((stat, i) => (
                    <div key={i}>
                      <div style={{
                        fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                        fontWeight: 800,
                        background: 'linear-gradient(90deg, #a855f7, #ec4899)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                      }}>
                        {stat.value}
                      </div>
                      <div style={{
                        fontSize: '0.9rem',
                        color: isDarkMode ? '#94a3b8' : '#64748b'
                      }}>
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </motion.div>
              </motion.div>

              {/* Profile Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                style={{
                  position: 'relative',
                  justifySelf: 'center',
                  width: '100%',
                  maxWidth: 'clamp(280px, 55vw, 450px)'
                }}
              >
                <div style={{ position: 'relative', width: '100%', aspectRatio: '1/1' }}>
                  {/* Glow Effect */}
                  <motion.div
                    animate={{ 
                      scale: [1, 1.05, 1],
                      opacity: [0.4, 0.6, 0.4]
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(90deg, #7c3aed, #db2777)',
                      borderRadius: '50%',
                      filter: 'blur(50px)',
                      opacity: 0.5
                    }}
                  />

                  {/* Image Container */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                    style={{
                      position: 'absolute',
                      inset: '10px',
                      background: isDarkMode
                        ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.9), rgba(15, 23, 42, 0.9))'
                        : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(241, 245, 249, 0.95))',
                      borderRadius: '50%',
                      border: `3px solid ${isDarkMode ? 'rgba(139, 92, 246, 0.5)' : 'rgba(124, 58, 237, 0.4)'}`,
                      backdropFilter: 'blur(20px)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)',
                      overflow: 'hidden'
                    }}
                  >
                    <img
                      src={profileImage}
                      alt="Tanjimul Haque - Profile"
                      loading="eager"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: '50%'
                      }}
                    />
                  </motion.div>

                  {/* Floating Icons */}
                  {[
                    { icon: Code, color: '#ec4899', top: '8%', right: '8%', delay: 0 },
                    { icon: Database, color: '#a855f7', bottom: '12%', left: '10%', delay: 0.5 },
                    { icon: Briefcase, color: '#3b82f6', top: '60%', right: '5%', delay: 1 },
                    { icon: Award, color: '#10b981', bottom: '5%', left: '5%', delay: 1.5 }
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      animate={{ 
                        y: [0, -12, 0],
                        rotate: [0, item.icon === Code ? 5 : -5, 0]
                      }}
                      transition={{
                        duration: 4 + i,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: item.delay
                      }}
                      style={{
                        position: 'absolute',
                        top: item.top,
                        right: item.right,
                        bottom: item.bottom,
                        left: item.left,
                        background: isDarkMode 
                          ? `rgba(${parseInt(item.color.slice(1,3), 16)}, ${parseInt(item.color.slice(3,5), 16)}, ${parseInt(item.color.slice(5,7), 16)}, 0.15)`
                          : `rgba(${parseInt(item.color.slice(1,3), 16)}, ${parseInt(item.color.slice(3,5), 16)}, ${parseInt(item.color.slice(5,7), 16)}, 0.1)`,
                        borderRadius: '50%',
                        width: 'clamp(35px, 8vw, 45px)',
                        height: 'clamp(35px, 8vw, 45px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: `1px solid ${item.color}40`,
                        boxShadow: `0 4px 20px ${item.color}30`
                      }}
                    >
                      <item.icon style={{ color: item.color, width: 18, height: 18 }} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" style={{
          padding: 'clamp(4rem, 12vh, 8rem) clamp(1rem, 4vw, 2rem)',
          position: 'relative'
        }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: '-100px' }}
              style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 8vw, 5rem)' }}
            >
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                style={{
                  display: 'inline-block',
                  padding: '0.5rem 1.25rem',
                  background: isDarkMode ? 'rgba(139, 92, 246, 0.15)' : 'rgba(124, 58, 237, 0.1)',
                  borderRadius: '9999px',
                  color: '#a855f7',
                  fontWeight: 600,
                  fontSize: 'clamp(0.85rem, 2.5vw, 1rem)',
                  marginBottom: '1.5rem',
                  border: `1px solid ${isDarkMode ? 'rgba(139, 92, 246, 0.3)' : 'rgba(124, 58, 237, 0.2)'}`
                }}
              >
                👋 About Me
              </motion.span>
              <h2 style={{
                fontSize: 'clamp(1.8rem, 6vw, 3.5rem)',
                fontWeight: 800,
                marginBottom: '1.5rem',
                background: 'linear-gradient(90deg, #a855f7, #ec4899)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundSize: '200% 200%',
                animation: 'gradientShift 3s ease infinite'
              }}>
                Turning Ideas Into Digital Reality
              </h2>
              <div style={{
                width: '5rem',
                height: '4px',
                background: 'linear-gradient(90deg, #a855f7, #ec4899)',
                margin: '0 auto',
                borderRadius: '2px'
              }} />
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-100px' }}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: 'clamp(1.5rem, 4vw, 3rem)'
              }}
            >
              {/* Professional Journey Card */}
              <motion.div
                variants={itemVariants}
                whileHover={cardHover}
                style={{
                  background: isDarkMode ? 'rgba(30, 41, 59, 0.5)' : 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '1.5rem',
                  padding: 'clamp(1.75rem, 4vw, 2.5rem)',
                  border: `1px solid ${isDarkMode ? 'rgba(139, 92, 246, 0.3)' : 'rgba(124, 58, 237, 0.2)'}`,
                  boxShadow: isDarkMode 
                    ? '0 10px 40px rgba(0, 0, 0, 0.3)' 
                    : '0 10px 40px rgba(0, 0, 0, 0.08)',
                  transition: 'all 0.3s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                  <div style={{
                    background: 'rgba(139, 92, 246, 0.15)',
                    padding: '0.875rem',
                    borderRadius: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Briefcase style={{ color: '#a855f7', width: 24, height: 24 }} />
                  </div>
                  <h3 style={{
                    fontSize: 'clamp(1.3rem, 3.5vw, 1.8rem)',
                    fontWeight: 700,
                    color: isDarkMode ? 'white' : '#1e293b'
                  }}>
                    Professional Journey
                  </h3>
                </div>

                <p style={{
                  color: isDarkMode ? '#cbd5e1' : '#475569',
                  marginBottom: '2rem',
                  lineHeight: 1.8,
                  fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)',
                  textAlign: 'justify'
                }}>
                  I am currently serving as <strong style={{ color: '#a855f7' }}>Senior Deputy Assistant Director</strong> in the 
                  Manufacturing Automations team at <strong>WALTON Hi-Tech Industries PLC</strong> — a promotion I received on 1 October 2026. 
                  My journey at WALTON began in March 2023 as a <strong>Software Engineer apprentice</strong> and has grown through 
                  Principal Officer, Senior Principal Officer, Deputy Assistant Director and now Senior Deputy Assistant Director. 
                  With <strong style={{ color: '#ec4899' }}>{years}+ years</strong> of hands-on software and automation experience — 
                  on top of an earlier career as a Site Engineer handling microwave link configuration, installation and commissioning — 
                  I specialize in developing robust, scalable, and business-critical web and desktop applications 
                  that drive operational efficiency and digital transformation in manufacturing processes.
                </p>

                {/* Quick Stats Grid */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                  gap: '1rem'
                }}>
                  {[
                    { icon: Award, label: 'Experience', value: `${careerYears}+ Years`, color: '#a855f7' },
                    { icon: Code, label: 'Focus', value: 'Web & Desktop Apps', color: '#ec4899' },
                    { icon: Briefcase, label: 'Role', value: 'Sr. Deputy Asst. Director', color: '#3b82f6' },
                    { icon: Calendar, label: 'Industry', value: 'Manufacturing', color: '#10b981' },               
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.03 }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        padding: '1rem',
                        background: isDarkMode ? 'rgba(15, 23, 42, 0.6)' : 'rgba(241, 245, 249, 0.8)',
                        borderRadius: '1rem',
                        border: `1px solid ${isDarkMode ? 'rgba(139, 92, 246, 0.2)' : 'rgba(124, 58, 237, 0.15)'}`
                      }}
                    >
                      <div style={{
                        background: `${item.color}15`,
                        padding: '0.625rem',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <item.icon style={{ color: item.color, width: 18, height: 18 }} />
                      </div>
                      <div>
                        <p style={{ fontWeight: 600, color: item.color, marginBottom: '0.125rem', fontSize: '0.8rem' }}>
                          {item.label}
                        </p>
                        <p style={{ color: isDarkMode ? '#cbd5e1' : '#475569', fontSize: '0.9rem', fontWeight: 500 }}>
                          {item.value}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Core Expertise Card */}
              <motion.div
                variants={itemVariants}
                whileHover={cardHover}
                style={{
                  background: isDarkMode ? 'rgba(30, 41, 59, 0.5)' : 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '1.5rem',
                  padding: 'clamp(1.75rem, 4vw, 2.5rem)',
                  border: `1px solid ${isDarkMode ? 'rgba(139, 92, 246, 0.3)' : 'rgba(124, 58, 237, 0.2)'}`,
                  boxShadow: isDarkMode 
                    ? '0 10px 40px rgba(0, 0, 0, 0.3)' 
                    : '0 10px 40px rgba(0, 0, 0, 0.08)',
                  transition: 'all 0.3s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                  <div style={{
                    background: 'rgba(236, 72, 153, 0.15)',
                    padding: '0.875rem',
                    borderRadius: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Star style={{ color: '#ec4899', width: 24, height: 24 }} />
                  </div>
                  <h3 style={{
                    fontSize: 'clamp(1.3rem, 3.5vw, 1.8rem)',
                    fontWeight: 700,
                    color: isDarkMode ? 'white' : '#1e293b'
                  }}>
                    Core Expertise
                  </h3>
                </div>

                <div style={{ display: 'grid', gap: '1.25rem' }}>
                  {[
                    { title: 'System Architecture', desc: 'Scalable enterprise application design' },
                    { title: 'Process Optimization', desc: 'Digital manufacturing workflow solutions' },
                    { title: 'Full Stack Development', desc: 'End-to-end modern web applications' },
                    { title: 'Stakeholder Management', desc: 'Technical-business requirement bridging' },                    
                    { title: 'Agile Methodologies', desc: 'Scrum, Kanban, and Lean practices' },
                    { title: 'Data-Driven Insights', desc: 'Analytics for manufacturing performance' },
                    // { title: 'Telecom & RF Engineering', desc: 'Microwave link configuration, installation & commissioning' },
                    { title: 'Testing Strategies', desc: 'Comprehensive test planning and execution' }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ x: 4 }}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '1rem',
                        padding: '1rem',
                        background: isDarkMode ? 'rgba(15, 23, 42, 0.6)' : 'rgba(241, 245, 249, 0.8)',
                        borderRadius: '1rem',
                        border: `1px solid ${isDarkMode ? 'rgba(139, 92, 246, 0.2)' : 'rgba(124, 58, 237, 0.15)'}`
                      }}
                    >
                      <CheckCircle style={{
                        color: '#10b981',
                        width: 20,
                        height: 20,
                        flexShrink: 0,
                        marginTop: '0.25rem'
                      }} />
                      <div>
                        <h4 style={{
                          fontWeight: 600,
                          color: isDarkMode ? 'white' : '#1e293b',
                          marginBottom: '0.25rem',
                          fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)'
                        }}>
                          {item.title}
                        </h4>
                        <p style={{
                          color: isDarkMode ? '#94a3b8' : '#64748b',
                          fontSize: 'clamp(0.85rem, 2vw, 0.95rem)'
                        }}>
                          {item.desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* CTA Button */}
                <motion.a
                  href="/TANGIMUL HAQUE .pdf"
                  download
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    marginTop: '2rem',
                    padding: '0.875rem 1.75rem',
                    background: 'linear-gradient(90deg, #7c3aed, #db2777)',
                    borderRadius: '1rem',
                    color: 'white',
                    textDecoration: 'none',
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    boxShadow: '0 8px 25px rgba(124, 58, 237, 0.35)',
                    minHeight: 48
                  }}
                >
                  <Download style={{ width: 18, height: 18 }} />
                  Download Resume
                </motion.a>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" style={{
          padding: 'clamp(4rem, 12vh, 8rem) clamp(1rem, 4vw, 2rem)',
          background: isDarkMode ? 'rgba(15, 23, 42, 0.4)' : 'rgba(241, 245, 249, 0.5)',
          position: 'relative'
        }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: '-100px' }}
              style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 8vw, 5rem)' }}
            >
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                style={{
                  display: 'inline-block',
                  padding: '0.5rem 1.25rem',
                  background: isDarkMode ? 'rgba(59, 130, 246, 0.15)' : 'rgba(59, 130, 246, 0.1)',
                  borderRadius: '9999px',
                  color: '#3b82f6',
                  fontWeight: 600,
                  fontSize: 'clamp(0.85rem, 2.5vw, 1rem)',
                  marginBottom: '1.5rem',
                  border: `1px solid ${isDarkMode ? 'rgba(59, 130, 246, 0.3)' : 'rgba(59, 130, 246, 0.2)'}`
                }}
              >
                💼 Work Experience
              </motion.span>
              <h2 style={{
                fontSize: 'clamp(1.8rem, 6vw, 3.5rem)',
                fontWeight: 800,
                marginBottom: '1.5rem',
                background: 'linear-gradient(90deg, #3b82f6, #60a5fa)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundSize: '200% 200%',
                animation: 'gradientShift 3s ease infinite'
              }}>
                Professional Journey
              </h2>
              <div style={{
                width: '5rem',
                height: '4px',
                background: 'linear-gradient(90deg, #3b82f6, #60a5fa)',
                margin: '0 auto',
                borderRadius: '2px'
              }} />
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-100px' }}
              style={{
                display: 'grid',
                gap: 'clamp(1.5rem, 4vw, 2.5rem)',
                gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))'
              }}
            >
              {experiences.map((exp, index) => {
                const theme = experienceTheme[exp.type] || experienceTheme.development;
                return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={cardHover}
                  style={{
                    background: isDarkMode ? 'rgba(30, 41, 59, 0.5)' : 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '1.5rem',
                    padding: 'clamp(1.75rem, 4vw, 2.5rem)',
                    border: `1px solid ${theme.chipBorder}`,
                    boxShadow: isDarkMode 
                      ? '0 10px 40px rgba(0, 0, 0, 0.3)' 
                      : '0 10px 40px rgba(0, 0, 0, 0.08)',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {/* Side Accent Bar */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '4px',
                    height: '100%',
                    background: theme.accent,
                    borderRadius: '1.5rem 0 0 1.5rem'
                  }} />

                  {/* Promotion Badge */}
                  {exp.badge && (
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      marginBottom: '1.25rem',
                      padding: '0.5rem 1.25rem 0.5rem 0.5rem',
                      borderRadius: '9999px',
                      background: isDarkMode ? 'rgba(245, 158, 11, 0.15)' : 'rgba(245, 158, 11, 0.1)',
                      border: `1px solid ${isDarkMode ? 'rgba(245, 158, 11, 0.35)' : 'rgba(245, 158, 11, 0.3)'}`,
                      color: isDarkMode ? '#fcd34d' : '#b45309',
                      fontWeight: 600,
                      fontSize: 'clamp(0.75rem, 2vw, 0.85rem)'
                    }}>
                      <span style={{
                        background: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
                        color: '#78350f',
                        borderRadius: '50%',
                        width: '22px',
                        height: '22px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        <Award style={{ width: 14, height: 14 }} />
                      </span>
                      {exp.badge}
                    </div>
                  )}

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem', paddingLeft: '1rem' }}>
                    <div>
                      <h3 style={{
                        fontSize: 'clamp(1.3rem, 3.5vw, 1.8rem)',
                        fontWeight: 700,
                        color: theme.title,
                        marginBottom: '0.5rem'
                      }}>
                        {exp.title}
                        {exp.subtitle && (
                          <span style={{
                            display: 'inline-block',
                            marginLeft: '0.75rem',
                            padding: '0.25rem 0.75rem',
                            borderRadius: '9999px',
                            background: theme.chipBg,
                            border: `1px solid ${theme.chipBorder}`,
                            color: theme.chipText,
                            fontSize: 'clamp(0.7rem, 1.8vw, 0.8rem)',
                            fontWeight: 600,
                            verticalAlign: 'middle'
                          }}>
                            {exp.subtitle}
                          </span>
                        )}
                      </h3>
                      <p style={{
                        fontSize: 'clamp(1rem, 2.8vw, 1.25rem)',
                        color: isDarkMode ? '#cbd5e1' : '#475569',
                        fontWeight: 500
                      }}>
                        {exp.company}
                      </p>
                      <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        gap: '0.5rem',
                        marginTop: '0.6rem',
                        fontSize: 'clamp(0.8rem, 2.2vw, 0.9rem)',
                        color: isDarkMode ? '#94a3b8' : '#64748b'
                      }}>
                        {exp.location && (
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                            <MapPin style={{ width: 15, height: 15, flexShrink: 0, color: theme.title }} />
                            {exp.location}
                          </span>
                        )}
                        {exp.workMode && (
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                            <MapPin style={{ width: 15, height: 15, flexShrink: 0, color: theme.title, opacity: 0.6 }} />
                            {exp.workMode}
                          </span>
                        )}
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        background: theme.chipBg,
                        padding: '0.5rem 1.25rem',
                        borderRadius: '9999px',
                        color: theme.chipText,
                        fontWeight: 600,
                        border: `1px solid ${theme.chipBorder}`,
                        fontSize: 'clamp(0.85rem, 2vw, 1rem)'
                      }}>
                        <Calendar style={{ width: 15, height: 15 }} />
                        {exp.period}
                      </span>
                      {exp.duration && (
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          background: isDarkMode ? 'rgba(15, 23, 42, 0.6)' : 'rgba(241, 245, 249, 0.9)',
                          padding: '0.5rem 1rem',
                          borderRadius: '9999px',
                          color: isDarkMode ? '#94a3b8' : '#64748b',
                          fontWeight: 500,
                          border: `1px solid ${isDarkMode ? 'rgba(139, 92, 246, 0.2)' : 'rgba(124, 58, 237, 0.15)'}`,
                          fontSize: 'clamp(0.8rem, 2vw, 0.9rem)'
                        }}>
                          {exp.duration}
                        </span>
                      )}
                      {exp.employmentType && (
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          background: isDarkMode ? 'rgba(15, 23, 42, 0.6)' : 'rgba(241, 245, 249, 0.9)',
                          padding: '0.5rem 1rem',
                          borderRadius: '9999px',
                          color: isDarkMode ? '#94a3b8' : '#64748b',
                          fontWeight: 500,
                          border: `1px solid ${isDarkMode ? 'rgba(139, 92, 246, 0.2)' : 'rgba(124, 58, 237, 0.15)'}`,
                          fontSize: 'clamp(0.8rem, 2vw, 0.9rem)'
                        }}>
                          {exp.employmentType}
                        </span>
                      )}
                    </div>
                  </div>

                  <p style={{
                    color: isDarkMode ? '#cbd5e1' : '#475569',
                    marginBottom: '2rem',
                    lineHeight: 1.8,
                    fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)',
                    paddingLeft: '1rem'
                  }}>
                    {exp.description}
                  </p>

                  {exp.skills && (
                    <div style={{ marginBottom: '1.5rem', paddingLeft: '1rem' }}>
                      <h4 style={{
                        color: isDarkMode ? '#94a3b8' : '#64748b',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        marginBottom: '0.6rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em'
                      }}>
                        Skills
                      </h4>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                        {exp.skills.map((skill, i) => (
                          <span key={i} style={{
                            background: theme.chipBg,
                            border: `1px solid ${theme.chipBorder}`,
                            color: theme.chipText,
                            padding: '0.3rem 0.75rem',
                            borderRadius: '0.5rem',
                            fontSize: '0.78rem',
                            fontWeight: 500
                          }}>
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <h4 style={{
                    fontWeight: 600,
                    fontSize: 'clamp(1.05rem, 2.8vw, 1.25rem)',
                    marginBottom: '1.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    paddingLeft: '1rem',
                    color: isDarkMode ? 'white' : '#1e293b'
                  }}>
                    <Star style={{ color: '#fbbf24', width: 20, height: 20 }} />
                    {exp.type === 'field' ? 'Key Responsibilities' : 'Key Achievements'}
                  </h4>

                  <ul style={{ display: 'grid', gap: '0.875rem', paddingLeft: '1rem' }}>
                    {exp.achievements.map((achievement, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '1rem',
                          padding: '0.875rem 1rem',
                          background: isDarkMode ? 'rgba(15, 23, 42, 0.6)' : 'rgba(241, 245, 249, 0.8)',
                          borderRadius: '0.875rem',
                          border: `1px solid ${isDarkMode ? 'rgba(139, 92, 246, 0.2)' : 'rgba(124, 58, 237, 0.15)'}`
                        }}
                      >
                        <div style={{
                          background: 'linear-gradient(90deg, #a855f7, #ec4899)',
                          width: 6,
                          height: 6,
                          borderRadius: '50%',
                          marginTop: '0.625rem',
                          flexShrink: 0
                        }} />
                        <span style={{
                          color: isDarkMode ? '#cbd5e1' : '#475569',
                          lineHeight: 1.6,
                          fontSize: 'clamp(0.9rem, 2.5vw, 1rem)'
                        }}>
                          {achievement}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" style={{
          padding: 'clamp(4rem, 12vh, 8rem) clamp(1rem, 4vw, 2rem)',
          background: isDarkMode ? 'rgba(15, 25, 48, 0.4)' : 'rgba(248, 250, 252, 0.5)',
          position: 'relative'
        }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: '-100px' }}
              style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 8vw, 5rem)' }}
            >
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                style={{
                  display: 'inline-block',
                  padding: '0.5rem 1.25rem',
                  background: isDarkMode ? 'rgba(16, 185, 129, 0.15)' : 'rgba(16, 185, 129, 0.1)',
                  borderRadius: '9999px',
                  color: '#10b981',
                  fontWeight: 600,
                  fontSize: 'clamp(0.85rem, 2.5vw, 1rem)',
                  marginBottom: '1.5rem',
                  border: `1px solid ${isDarkMode ? 'rgba(16, 185, 129, 0.3)' : 'rgba(16, 185, 129, 0.2)'}`
                }}
              >
                🎓 Education
              </motion.span>
              <h2 style={{
                fontSize: 'clamp(1.8rem, 6vw, 3.5rem)',
                fontWeight: 800,
                marginBottom: '1.5rem',
                background: 'linear-gradient(90deg, #10b981, #34d399)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundSize: '200% 200%',
                animation: 'gradientShift 3s ease infinite'
              }}>
                Academic Background
              </h2>
              <div style={{
                width: '5rem',
                height: '4px',
                background: 'linear-gradient(90deg, #10b981, #34d399)',
                margin: '0 auto',
                borderRadius: '2px'
              }} />
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-100px' }}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                gap: 'clamp(1.5rem, 4vw, 2.5rem)'
              }}
            >
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={cardHover}
                  style={{
                    background: isDarkMode ? 'rgba(30, 41, 59, 0.5)' : 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '1.5rem',
                    padding: 'clamp(1.75rem, 4vw, 2.5rem)',
                    border: `1px solid ${isDarkMode ? 'rgba(139, 92, 246, 0.3)' : 'rgba(124, 58, 237, 0.2)'}`,
                    boxShadow: isDarkMode 
                      ? '0 10px 40px rgba(0, 0, 0, 0.3)' 
                      : '0 10px 40px rgba(0, 0, 0, 0.08)',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '4px',
                    height: '100%',
                    background: edu.type === 'undergraduate'
                      ? 'linear-gradient(to bottom, #a855f7, #ec4899)'
                      : 'linear-gradient(to bottom, #10b981, #34d399)',
                    borderRadius: '1.5rem 0 0 1.5rem'
                  }} />

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                      <div style={{
                        background: 'rgba(16, 185, 129, 0.15)',
                        padding: '0.75rem',
                        borderRadius: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        <GraduationCap style={{ color: '#10b981', width: 22, height: 22 }} />
                      </div>
                      <div>
                        <h3 style={{
                          fontSize: 'clamp(1.1rem, 3vw, 1.4rem)',
                          fontWeight: 700,
                          color: isDarkMode ? 'white' : '#1e293b',
                          marginBottom: '0.35rem',
                          lineHeight: 1.4
                        }}>
                          {edu.degree}
                        </h3>
                        <p style={{
                          fontSize: 'clamp(0.95rem, 2.8vw, 1.15rem)',
                          color: isDarkMode ? '#94a3b8' : '#64748b',
                          fontWeight: 400
                        }}>
                          {edu.institution}
                        </p>
                      </div>
                    </div>
                    <div style={{
                      display: 'inline-flex',
                      background: isDarkMode ? 'rgba(16, 185, 129, 0.2)' : 'rgba(16, 185, 129, 0.1)',
                      padding: '0.5rem 1.25rem',
                      borderRadius: '9999px',
                      color: '#6ee7b7',
                      fontWeight: 600,
                      border: `1px solid ${isDarkMode ? 'rgba(16, 185, 129, 0.3)' : 'rgba(16, 185, 129, 0.2)'}`,
                      fontSize: 'clamp(0.85rem, 2vw, 1rem)'
                    }}>
                      {edu.period}
                    </div>
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '1rem',
                    background: isDarkMode ? 'rgba(15, 23, 42, 0.6)' : 'rgba(241, 245, 249, 0.8)',
                    borderRadius: '1rem',
                    border: `1px solid ${isDarkMode ? 'rgba(139, 92, 246, 0.2)' : 'rgba(124, 58, 237, 0.15)'}`
                  }}>
                    <Trophy style={{ color: '#fbbf24', width: 20, height: 20 }} />
                    <span style={{
                      color: isDarkMode ? '#cbd5e1' : '#475569',
                      fontWeight: 500,
                      fontSize: 'clamp(0.9rem, 2.5vw, 1rem)'
                    }}>
                      {edu.type === 'Certification' ? '✓ Completed' : '✓ Graduated'}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" style={{
          padding: 'clamp(4rem, 12vh, 8rem) clamp(1rem, 4vw, 2rem)',
          background: isDarkMode ? 'rgba(15, 25, 48, 0.4)' : 'rgba(248, 250, 252, 0.5)',
          position: 'relative'
        }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: '-100px' }}
              style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 8vw, 5rem)' }}
            >
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                viewport={{ once: true }}
                style={{
                  display: 'inline-block',
                  padding: '0.5rem 1.25rem',
                  background: isDarkMode ? 'rgba(245, 158, 11, 0.15)' : 'rgba(245, 158, 11, 0.1)',
                  borderRadius: '9999px',
                  color: '#f59e0b',
                  fontWeight: 600,
                  fontSize: 'clamp(0.85rem, 2.5vw, 1rem)',
                  marginBottom: '1.5rem',
                  border: `1px solid ${isDarkMode ? 'rgba(245, 158, 11, 0.3)' : 'rgba(245, 158, 11, 0.2)'}`
                }}
              >
                ⚡ Technical Skills 
              </motion.span>
              <h2 style={{
                fontSize: 'clamp(1.8rem, 6vw, 3.5rem)',
                fontWeight: 800,
                marginBottom: '1.5rem',
                background: 'linear-gradient(90deg, #f59e0b, #fbbf24)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundSize: '200% 200%',
                animation: 'gradientShift 3s ease infinite'
              }}>
                Technologies & Tools
              </h2>
              <div style={{
                width: '5rem',
                height: '4px',
                background: 'linear-gradient(90deg, #f59e0b, #fbbf24)',
                margin: '0 auto',
                borderRadius: '2px'
              }} />
            </motion.div>

            {/* Category Filter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              viewport={{ once: true }}
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '0.75rem',
                marginBottom: '2.5rem',
                flexWrap: 'wrap'
              }}
            >
              {['All Skills','Frontend', 'Backend', 'Database', 'DevOps', 'Architecture', 'Process', 'Testing', 'Telecom'].map((cat) => (
                <motion.button
                  key={cat}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveSkillCategory(cat)}
                  style={{
                    padding: '0.5rem 1.25rem',
                    background: activeSkillCategory === cat
                      ? 'linear-gradient(90deg, #f59e0b, #fbbf24)'
                      : 'transparent',
                    border: `2px solid ${activeSkillCategory === cat
                      ? '#f59e0b'
                      : (isDarkMode ? 'rgba(139, 92, 246, 0.4)' : 'rgba(124, 58, 237, 0.3)')}`,
                    borderRadius: '9999px',
                    color: activeSkillCategory === cat ? 'white' : (isDarkMode ? '#cbd5e1' : '#475569'),
                    fontSize: 'clamp(0.8rem, 2vw, 0.95rem)',
                    fontWeight: activeSkillCategory === cat ? 600 : 500,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {cat}
                </motion.button>
              ))}
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              transition={{ delay: 0.8 }}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: 'clamp(1.25rem, 3vw, 2rem)'
              }}
            >
              {filteredSkills.map((skill, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -5, scale: 1.02 }}
                  style={{
                    background: isDarkMode ? 'rgba(30, 41, 59, 0.5)' : 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '1.25rem',
                    padding: 'clamp(1.25rem, 3vw, 1.75rem)',
                    border: `1px solid ${isDarkMode ? 'rgba(139, 92, 246, 0.3)' : 'rgba(124, 58, 237, 0.2)'}`,
                    boxShadow: isDarkMode 
                      ? '0 10px 30px rgba(0, 0, 0, 0.25)' 
                      : '0 10px 30px rgba(0, 0, 0, 0.06)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <div>
                      <h3 style={{
                        fontWeight: 600,
                        fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
                        color: isDarkMode ? 'white' : '#1e293b',
                        marginBottom: '0.35rem'
                      }}>
                        {skill.name}
                      </h3>
                      <span style={{
                        fontSize: 'clamp(0.75rem, 2vw, 0.85rem)',
                        color: '#a855f7',
                        fontWeight: 500,
                        background: isDarkMode ? 'rgba(139, 92, 246, 0.2)' : 'rgba(124, 58, 237, 0.1)',
                        padding: '0.25rem 0.875rem',
                        borderRadius: '9999px',
                        border: `1px solid ${isDarkMode ? 'rgba(139, 92, 246, 0.3)' : 'rgba(124, 58, 237, 0.2)'}`
                      }}>
                        {skill.category}
                      </span>
                    </div>
                    <span style={{
                      color: '#a855f7',
                      fontWeight: 700,
                      fontSize: 'clamp(1rem, 2.5vw, 1.2rem)'
                    }}>
                      {skill.level}%
                    </span>
                  </div>

                  <div style={{
                    width: '100%',
                    background: isDarkMode ? 'rgba(15, 23, 42, 0.6)' : 'rgba(241, 245, 249, 0.9)',
                    borderRadius: '9999px',
                    height: '10px',
                    border: `1px solid ${isDarkMode ? 'rgba(139, 92, 246, 0.2)' : 'rgba(124, 58, 237, 0.15)'}`,
                    overflow: 'hidden'
                  }}>
                    <motion.div
                      style={{
                        background: 'linear-gradient(90deg, #7c3aed, #db2777)',
                        height: '100%',
                        borderRadius: '9999px',
                        position: 'relative'
                      }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, ease: 'easeOut', delay: index * 0.05 }}
                    >
                      {/* Shine Effect */}
                      <motion.div
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                          transform: 'translateX(-100%)'
                        }}
                        animate={{ transform: ['translateX(-100%)', 'translateX(100%)'] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear', delay: index * 0.1 + 1.5 }}
                      />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
              
              {filteredSkills.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{
                    textAlign: 'center',
                    padding: '3rem',
                    color: isDarkMode ? '#cbd5e1' : '#475569',
                    fontSize: '1.1rem'
                  }}
                >
                  <Code style={{ width: 48, height: 48, margin: '0 auto 1rem', opacity: 0.5 }} />
                  <p>এই ক্যাটাগরিতে কোনো স্কিল পাওয়া যায়নি।</p>
                  <p style={{ fontSize: '0.9rem', opacity: 0.7 }}>সব স্কিল দেখতে "All Skills" সিলেক্ট করুন।</p>
                </motion.div>
              )}
            </motion.div>
          </div>
        </section>

        {/* GitHub Analysis Section - NEW */}
        <section id="github" style={{
          padding: 'clamp(4rem, 12vh, 8rem) clamp(1rem, 4vw, 2rem)',
          background: isDarkMode ? 'rgba(15, 23, 42, 0.4)' : 'rgba(241, 245, 249, 0.5)',
          position: 'relative'
        }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: '-100px' }}
              style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 8vw, 5rem)' }}
            >
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                style={{
                  display: 'inline-block',
                  padding: '0.5rem 1.25rem',
                  background: isDarkMode ? 'rgba(139, 92, 246, 0.15)' : 'rgba(124, 58, 237, 0.1)',
                  borderRadius: '9999px',
                  color: '#a855f7',
                  fontWeight: 600,
                  fontSize: 'clamp(0.85rem, 2.5vw, 1rem)',
                  marginBottom: '1.5rem',
                  border: `1px solid ${isDarkMode ? 'rgba(139, 92, 246, 0.3)' : 'rgba(124, 58, 237, 0.2)'}`
                }}
              >
                🐙 GitHub Analytics
              </motion.span>
              <h2 style={{
                fontSize: 'clamp(1.8rem, 6vw, 3.5rem)',
                fontWeight: 800,
                marginBottom: '1.5rem',
                background: 'linear-gradient(90deg, #a855f7, #ec4899)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundSize: '200% 200%',
                animation: 'gradientShift 3s ease infinite'
              }}>
                My Coding Journey
              </h2>
              <p style={{
                color: isDarkMode ? '#cbd5e1' : '#475569',
                fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)',
                maxWidth: '700px',
                margin: '0 auto 1.5rem',
                lineHeight: 1.7
              }}>
                A real-time snapshot of my open-source contributions, coding consistency, and the technologies I work with every day.
              </p>
              <div style={{
                width: '5rem',
                height: '4px',
                background: 'linear-gradient(90deg, #a855f7, #ec4899)',
                margin: '0 auto',
                borderRadius: '2px'
              }} />
            </motion.div>

            {/* GitHub Profile Header Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: '-50px' }}
              style={{
                background: isDarkMode ? 'rgba(30, 41, 59, 0.5)' : 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(20px)',
                borderRadius: '1.5rem',
                padding: 'clamp(1.5rem, 3vw, 2rem)',
                border: `1px solid ${isDarkMode ? 'rgba(139, 92, 246, 0.3)' : 'rgba(124, 58, 237, 0.2)'}`,
                boxShadow: isDarkMode 
                  ? '0 10px 40px rgba(0, 0, 0, 0.3)' 
                  : '0 10px 40px rgba(0, 0, 0, 0.08)',
                marginBottom: 'clamp(1.5rem, 4vw, 2.5rem)',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1.5rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  style={{
                    width: 'clamp(56px, 10vw, 72px)',
                    height: 'clamp(56px, 10vw, 72px)',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #7c3aed, #db2777)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 8px 25px rgba(124, 58, 237, 0.4)',
                    flexShrink: 0
                  }}
                >
                  <Github style={{ color: 'white', width: 'clamp(28px, 5vw, 36px)', height: 'clamp(28px, 5vw, 36px)' }} />
                </motion.div>
                <div>
                  <h3 style={{
                    fontSize: 'clamp(1.15rem, 3vw, 1.5rem)',
                    fontWeight: 700,
                    color: isDarkMode ? 'white' : '#1e293b',
                    marginBottom: '0.25rem'
                  }}>
                    @{githubUsername}
                  </h3>
                  <p style={{
                    color: isDarkMode ? '#94a3b8' : '#64748b',
                    fontSize: 'clamp(0.85rem, 2vw, 0.95rem)'
                  }}>
                    Open Source Contributor • Building with passion
                  </p>
                </div>
              </div>

              <motion.a
                href={`https://github.com/${githubUsername}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.625rem',
                  padding: '0.75rem 1.5rem',
                  background: 'linear-gradient(90deg, #7c3aed, #db2777)',
                  borderRadius: '1rem',
                  color: 'white',
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                  boxShadow: '0 8px 25px rgba(124, 58, 237, 0.35)',
                  minHeight: 48
                }}
              >
                <Github style={{ width: 18, height: 18 }} />
                Visit Profile
                <ArrowRight style={{ width: 16, height: 16 }} />
              </motion.a>
            </motion.div>

            {/* Tab Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '0.5rem',
                marginBottom: 'clamp(1.5rem, 4vw, 2.5rem)',
                flexWrap: 'wrap',
                padding: '0.5rem',
                background: isDarkMode ? 'rgba(30, 41, 59, 0.4)' : 'rgba(255, 255, 255, 0.6)',
                backdropFilter: 'blur(20px)',
                borderRadius: '1.25rem',
                border: `1px solid ${isDarkMode ? 'rgba(139, 92, 246, 0.2)' : 'rgba(124, 58, 237, 0.15)'}`,
                maxWidth: '900px',
                margin: '0 auto clamp(1.5rem, 4vw, 2.5rem)'
              }}
            >
              {githubTabs.map((tab) => {
                const TabIcon = tab.icon;
                const isActive = activeGitHubTab === tab.id;
                return (
                  <motion.button
                    key={tab.id}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setActiveGitHubTab(tab.id)}
                    style={{
                      position: 'relative',
                      padding: '0.75rem 1.25rem',
                      background: isActive
                        ? 'linear-gradient(90deg, #7c3aed, #db2777)'
                        : 'transparent',
                      border: 'none',
                      borderRadius: '0.875rem',
                      color: isActive ? 'white' : (isDarkMode ? '#cbd5e1' : '#475569'),
                      fontWeight: isActive ? 600 : 500,
                      fontSize: 'clamp(0.8rem, 2vw, 0.95rem)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      transition: 'all 0.2s ease',
                      minHeight: 44
                    }}
                  >
                    <TabIcon style={{ width: 16, height: 16 }} />
                    {tab.label}
                  </motion.button>
                );
              })}
            </motion.div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeGitHubTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                style={{
                  background: isDarkMode ? 'rgba(30, 41, 59, 0.5)' : 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '1.5rem',
                  padding: 'clamp(1.5rem, 4vw, 2.5rem)',
                  border: `1px solid ${isDarkMode ? 'rgba(139, 92, 246, 0.3)' : 'rgba(124, 58, 237, 0.2)'}`,
                  boxShadow: isDarkMode 
                    ? '0 10px 40px rgba(0, 0, 0, 0.3)' 
                    : '0 10px 40px rgba(0, 0, 0, 0.08)',
                  marginBottom: 'clamp(1.5rem, 4vw, 2.5rem)'
                }}
              >
                {/* Tab Header */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.875rem',
                  marginBottom: '1.5rem',
                  paddingBottom: '1.25rem',
                  borderBottom: `1px solid ${isDarkMode ? 'rgba(139, 92, 246, 0.2)' : 'rgba(124, 58, 237, 0.15)'}`
                }}>
                  <div style={{
                    background: 'rgba(139, 92, 246, 0.15)',
                    padding: '0.75rem',
                    borderRadius: '0.875rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {(() => {
                      const ActiveIcon = githubTabs.find(t => t.id === activeGitHubTab)?.icon || Activity;
                      return <ActiveIcon style={{ color: '#a855f7', width: 22, height: 22 }} />;
                    })()}
                  </div>
                  <div>
                    <h3 style={{
                      fontSize: 'clamp(1.1rem, 3vw, 1.4rem)',
                      fontWeight: 700,
                      color: isDarkMode ? 'white' : '#1e293b',
                      marginBottom: '0.25rem'
                    }}>
                      {githubTabs.find(t => t.id === activeGitHubTab)?.label}
                    </h3>
                    <p style={{
                      color: isDarkMode ? '#94a3b8' : '#64748b',
                      fontSize: 'clamp(0.8rem, 2vw, 0.9rem)'
                    }}>
                      {activeGitHubTab === 'streak' && 'Track my daily coding consistency and current streak'}
                      {activeGitHubTab === 'stats' && 'Overall GitHub profile statistics and contributions'}
                      {activeGitHubTab === 'languages' && 'Most frequently used programming languages'}
                      {activeGitHubTab === 'activity' && 'Visual representation of my coding activity over time'}
                      {activeGitHubTab === 'trophy' && 'Achievements and milestones earned on GitHub'}
                    </p>
                  </div>
                </div>

                {/* Image Container */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  minHeight: '200px',
                  padding: 'clamp(1rem, 3vw, 2rem)',
                  background: isDarkMode ? 'rgba(15, 23, 42, 0.4)' : 'rgba(248, 250, 252, 0.6)',
                  borderRadius: '1rem',
                  border: `1px dashed ${isDarkMode ? 'rgba(139, 92, 246, 0.3)' : 'rgba(124, 58, 237, 0.2)'}`
                }}>
                  {githubImageErrors[activeGitHubTab] ? (
                    <div style={{
                      textAlign: 'center',
                      padding: 'clamp(1rem, 3vw, 2rem)',
                      color: isDarkMode ? '#cbd5e1' : '#475569',
                      width: '100%'
                    }}>
                      <div style={{ width: '100%', maxWidth: '720px', margin: '0 auto' }}>
                        {/* <div style={{
                          display: 'flex',
                          justifyContent: 'flex-end',
                          marginBottom: '1rem'
                        }}>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setGithubImageErrors(prev => ({ ...prev, [activeGitHubTab]: false }))}
                            style={{
                              padding: '0.625rem 1.25rem',
                              background: 'linear-gradient(90deg, #7c3aed, #db2777)',
                              border: 'none',
                              borderRadius: '0.75rem',
                              color: 'white',
                              fontWeight: 600,
                              cursor: 'pointer',
                              fontSize: '0.9rem'
                            }}
                          >
                            Retry
                          </motion.button>
                        </div> */}

                        <div style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                          gap: '1rem'
                        }}>
                          {githubFallbackItems.map((item) => (
                            <div key={item.label} style={{
                              padding: '1rem',
                              borderRadius: '0.875rem',
                              background: isDarkMode ? 'rgba(15, 23, 42, 0.6)' : 'rgba(248, 250, 252, 0.9)',
                              border: `1px solid ${isDarkMode ? 'rgba(139, 92, 246, 0.25)' : 'rgba(124, 58, 237, 0.2)'}`,
                              boxShadow: isDarkMode ? '0 10px 20px rgba(0, 0, 0, 0.15)' : '0 10px 20px rgba(0, 0, 0, 0.05)'
                            }}>
                              <p style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.7, marginBottom: '0.35rem' }}>{item.label}</p>
                              <p style={{ fontSize: '1.15rem', fontWeight: 700, color: isDarkMode ? 'white' : '#1e293b' }}>{item.value}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <motion.img
                      key={activeGitHubTab}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4 }}
                      src={githubImages[activeGitHubTab]}
                      alt={`GitHub ${activeGitHubTab} statistics for ${githubUsername}`}
                      style={{
                        maxWidth: '100%',
                        height: 'auto',
                        borderRadius: '0.75rem'
                      }}
                      onError={() => setGithubImageErrors(prev => ({ ...prev, [activeGitHubTab]: true }))}
                    />
                  )}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Quick Stats Grid - Always Visible */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-50px' }}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: 'clamp(1rem, 3vw, 1.5rem)'
              }}
            >
              {githubSummaryStats.map((stat, index) => {
                const StatIcon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ y: -5, scale: 1.02 }}
                    style={{
                      background: isDarkMode ? 'rgba(30, 41, 59, 0.5)' : 'rgba(255, 255, 255, 0.8)',
                      backdropFilter: 'blur(20px)',
                      borderRadius: '1.25rem',
                      padding: 'clamp(1.25rem, 3vw, 1.75rem)',
                      border: `1px solid ${isDarkMode ? 'rgba(139, 92, 246, 0.3)' : 'rgba(124, 58, 237, 0.2)'}`,
                      boxShadow: isDarkMode 
                        ? '0 10px 30px rgba(0, 0, 0, 0.25)' 
                        : '0 10px 30px rgba(0, 0, 0, 0.06)',
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  >
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      width: '100px',
                      height: '100px',
                      background: stat.gradient,
                      borderRadius: '50%',
                      transform: 'translate(30%, -30%)',
                      filter: 'blur(20px)'
                    }} />
                    <div style={{ position: 'relative', zIndex: 1 }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '1rem'
                      }}>
                        <div style={{
                          background: `${stat.color}15`,
                          padding: '0.75rem',
                          borderRadius: '0.875rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: `1px solid ${stat.color}30`
                        }}>
                          <StatIcon style={{ color: stat.color, width: 22, height: 22 }} />
                        </div>
                        <span style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)' }}>{stat.value}</span>
                      </div>
                      <h4 style={{
                        fontWeight: 700,
                        fontSize: 'clamp(1rem, 2.5vw, 1.15rem)',
                        color: isDarkMode ? 'white' : '#1e293b',
                        marginBottom: '0.375rem'
                      }}>
                        {stat.title}
                      </h4>
                      <p style={{
                        color: isDarkMode ? '#94a3b8' : '#64748b',
                        fontSize: 'clamp(0.8rem, 2vw, 0.9rem)',
                        lineHeight: 1.5
                      }}>
                        {stat.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Contribution Graph - Full Width */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true, margin: '-50px' }}
              style={{
                marginTop: 'clamp(1.5rem, 4vw, 2.5rem)',
                background: isDarkMode ? 'rgba(30, 41, 59, 0.5)' : 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(20px)',
                borderRadius: '1.5rem',
                padding: 'clamp(1.5rem, 4vw, 2.5rem)',
                border: `1px solid ${isDarkMode ? 'rgba(139, 92, 246, 0.3)' : 'rgba(124, 58, 237, 0.2)'}`,
                boxShadow: isDarkMode 
                  ? '0 10px 40px rgba(0, 0, 0, 0.3)' 
                  : '0 10px 40px rgba(0, 0, 0, 0.08)',
                overflow: 'hidden'
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.875rem',
                marginBottom: '1.5rem'
              }}>
                <div style={{
                  background: 'rgba(139, 92, 246, 0.15)',
                  padding: '0.75rem',
                  borderRadius: '0.875rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <TrendingUp style={{ color: '#a855f7', width: 22, height: 22 }} />
                </div>
                <div>
                  <h3 style={{
                    fontSize: 'clamp(1.1rem, 3vw, 1.4rem)',
                    fontWeight: 700,
                    color: isDarkMode ? 'white' : '#1e293b',
                    marginBottom: '0.25rem'
                  }}>
                    Yearly Contribution Graph
                  </h3>
                  <p style={{
                    color: isDarkMode ? '#94a3b8' : '#64748b',
                    fontSize: 'clamp(0.8rem, 2vw, 0.9rem)'
                  }}>
                    My coding activity visualized across the year
                  </p>
                </div>
              </div>

              <div style={{
                background: isDarkMode ? 'rgba(15, 23, 42, 0.4)' : 'rgba(248, 250, 252, 0.6)',
                borderRadius: '1rem',
                padding: 'clamp(0.75rem, 2vw, 1.5rem)',
                border: `1px solid ${isDarkMode ? 'rgba(139, 92, 246, 0.2)' : 'rgba(124, 58, 237, 0.15)'}`,
                overflowX: 'auto'
              }}>
                <img
                  src={githubImages.contribution}
                  alt="GitHub contribution chart"
                  style={{
                    width: '100%',
                    minWidth: '600px',
                    height: 'auto',
                    display: 'block',
                    borderRadius: '0.5rem'
                  }}
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" style={{
          padding: 'clamp(4rem, 12vh, 8rem) clamp(1rem, 4vw, 2rem)',
          background: isDarkMode ? 'rgba(15, 23, 42, 0.4)' : 'rgba(241, 245, 249, 0.5)',
          position: 'relative'
        }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: '-100px' }}
              style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 8vw, 5rem)' }}
            >
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                style={{
                  display: 'inline-block',
                  padding: '0.5rem 1.25rem',
                  background: isDarkMode ? 'rgba(236, 72, 153, 0.15)' : 'rgba(236, 72, 153, 0.1)',
                  borderRadius: '9999px',
                  color: '#ec4899',
                  fontWeight: 600,
                  fontSize: 'clamp(0.85rem, 2.5vw, 1rem)',
                  marginBottom: '1.5rem',
                  border: `1px solid ${isDarkMode ? 'rgba(236, 72, 153, 0.3)' : 'rgba(236, 72, 153, 0.2)'}`
                }}
              >
                🚀 Featured Projects
              </motion.span>
              <h2 style={{
                fontSize: 'clamp(1.8rem, 6vw, 3.5rem)',
                fontWeight: 800,
                marginBottom: '1.5rem',
                background: 'linear-gradient(90deg, #ec4899, #f472b6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundSize: '200% 200%',
                animation: 'gradientShift 3s ease infinite'
              }}>
                What I've Built
              </h2>
              <div style={{
                width: '5rem',
                height: '4px',
                background: 'linear-gradient(90deg, #ec4899, #f472b6)',
                margin: '0 auto',
                borderRadius: '2px'
              }} />
            </motion.div>

            {/* Project Filter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '0.75rem',
                marginBottom: '2.5rem',
                flexWrap: 'wrap'
              }}
            >
              {projectFilters.map((filter) => (
                <motion.button
                  key={filter}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveProjectFilter(filter)}
                  style={{
                    padding: '0.625rem 1.5rem',
                    background: activeProjectFilter === filter
                      ? 'linear-gradient(90deg, #7c3aed, #db2777)'
                      : (isDarkMode ? 'rgba(139, 92, 246, 0.15)' : 'rgba(124, 58, 237, 0.1)'),
                    border: activeProjectFilter === filter
                      ? 'none'
                      : `2px solid ${isDarkMode ? 'rgba(139, 92, 246, 0.4)' : 'rgba(124, 58, 237, 0.3)'}`,
                    borderRadius: '9999px',
                    color: activeProjectFilter === filter ? 'white' : (isDarkMode ? '#cbd5e1' : '#475569'),
                    fontSize: 'clamp(0.85rem, 2.5vw, 1rem)',
                    fontWeight: activeProjectFilter === filter ? 600 : 500,
                    cursor: 'pointer',
                    textTransform: 'capitalize',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {filter === 'all' ? 'All Projects' : filter}
                </motion.button>
              ))}
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              transition={{ delay: 0.8 }}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                gap: 'clamp(1.5rem, 4vw, 2.5rem)'
              }}
            >
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project) => (
                  <motion.div
                    key={project.title}
                    layout
                    variants={itemVariants}
                    whileHover={cardHover}
                    style={{
                      background: isDarkMode ? 'rgba(30, 41, 59, 0.5)' : 'rgba(255, 255, 255, 0.8)',
                      backdropFilter: 'blur(20px)',
                      borderRadius: '1.5rem',
                      padding: 'clamp(1.5rem, 4vw, 2rem)',
                      border: `1px solid ${isDarkMode ? 'rgba(139, 92, 246, 0.3)' : 'rgba(124, 58, 237, 0.2)'}`,
                      boxShadow: isDarkMode 
                        ? '0 10px 40px rgba(0, 0, 0, 0.3)' 
                        : '0 10px 40px rgba(0, 0, 0, 0.08)',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'all 0.3s ease',
                      overflow: 'hidden'
                    }}
                  >
                    <div style={{
                      width: '100%',
                      aspectRatio: '16/9',
                      borderRadius: '1rem',
                      marginBottom: '1.5rem',
                      position: 'relative',
                      overflow: 'hidden',
                      background: isDarkMode ? '#111827' : '#f8fafc',
                      border: `1px solid ${project.type === 'enterprise' ? 'rgba(124, 58, 237, 0.3)' : 'rgba(219, 39, 119, 0.3)'}`
                    }}>
                      <img
                        src={project.image}
                        alt={`${project.title} screenshot`}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          display: 'block'
                        }}
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(180deg, rgba(0,0,0,0.12), rgba(0,0,0,0.4))',
                        pointerEvents: 'none'
                      }} />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                      <span style={{
                        padding: '0.375rem 1rem',
                        background: project.type === 'enterprise'
                          ? (isDarkMode ? 'rgba(124, 58, 237, 0.2)' : 'rgba(124, 58, 237, 0.1)')
                          : (isDarkMode ? 'rgba(219, 39, 119, 0.2)' : 'rgba(219, 39, 119, 0.1)'),
                        borderRadius: '9999px',
                        color: project.type === 'enterprise' ? '#a855f7' : '#ec4899',
                        fontWeight: 600,
                        fontSize: '0.8rem',
                        border: `1px solid ${project.type === 'enterprise' ? 'rgba(124, 58, 237, 0.3)' : 'rgba(219, 39, 119, 0.3)'}`
                      }}>
                        {project.type === 'enterprise' ? '🏢 Enterprise' : '💼 Business'}
                      </span>
                    </div>

                    <h3 style={{
                      fontSize: 'clamp(1.25rem, 3.5vw, 1.6rem)',
                      fontWeight: 700,
                      color: isDarkMode ? 'white' : '#1e293b',
                      marginBottom: '0.875rem'
                    }}>
                      {project.title}
                    </h3>

                    <p style={{
                      color: isDarkMode ? '#cbd5e1' : '#475569',
                      marginBottom: '1.25rem',
                      lineHeight: 1.7,
                      fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
                      flex: 1
                    }}>
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div style={{ marginBottom: '1.25rem' }}>
                      <h4 style={{
                        color: isDarkMode ? '#94a3b8' : '#64748b',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        marginBottom: '0.75rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}>
                        Technologies
                      </h4>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {project.technologies.map((tech, i) => (
                          <span
                            key={i}
                            style={{
                              background: isDarkMode ? 'rgba(139, 92, 246, 0.15)' : 'rgba(124, 58, 237, 0.1)',
                              padding: '0.375rem 0.875rem',
                              borderRadius: '0.5rem',
                              color: isDarkMode ? '#cbd5e1' : '#475569',
                              fontSize: '0.8rem',
                              border: `1px solid ${isDarkMode ? 'rgba(139, 92, 246, 0.2)' : 'rgba(124, 58, 237, 0.15)'}`
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Features */}
                    <details style={{ marginBottom: '1.5rem' }}>
                      <summary style={{
                        cursor: 'pointer',
                        color: '#a855f7',
                        fontWeight: 500,
                        fontSize: '0.9rem',
                        marginBottom: '0.5rem',
                        listStyle: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}>
                        <ArrowRight style={{ width: 16, height: 16, transition: 'transform 0.2s' }} />
                        Key Features
                      </summary>
                      <ul style={{
                        paddingLeft: '1.75rem',
                        color: isDarkMode ? '#cbd5e1' : '#475569',
                        marginTop: '0.5rem',
                        fontSize: '0.9rem'
                      }}>
                        {project.features.map((feature, i) => (
                          <li key={i} style={{ marginBottom: '0.375rem', lineHeight: 1.5 }}>{feature}</li>
                        ))}
                      </ul>
                    </details>

                    {/* Action Button */}
                    <motion.a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        padding: '0.875rem 1.5rem',
                        background: 'linear-gradient(90deg, #7c3aed, #db2777)',
                        borderRadius: '1rem',
                        color: 'white',
                        textDecoration: 'none',
                        fontWeight: 600,
                        fontSize: '0.95rem',
                        marginTop: 'auto',
                        boxShadow: '0 8px 25px rgba(124, 58, 237, 0.35)',
                        minHeight: 48
                      }}
                    >
                      View Live Project
                      <ArrowRight style={{ width: 18, height: 18 }} />
                    </motion.a>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {filteredProjects.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{
                    textAlign: 'center',
                    padding: '3rem',
                    color: isDarkMode ? '#cbd5e1' : '#475569',
                    fontSize: '1.1rem'
                  }}
                >
                  <Code style={{ width: 48, height: 48, margin: '0 auto 1rem', opacity: 0.5 }} />
                  <p>No projects found for the selected filter.</p>
                  <p style={{ fontSize: '0.9rem', opacity: 0.7 }}>Try selecting "All Projects" to see all available projects.</p>
                </motion.div>
              )}
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" style={{
          padding: 'clamp(4rem, 12vh, 8rem) clamp(1rem, 4vw, 2rem)',
          background: isDarkMode ? 'rgba(15, 23, 42, 0.4)' : 'rgba(241, 245, 249, 0.5)',
          position: 'relative'
        }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: '-100px' }}
              style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 8vw, 5rem)' }}
            >
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                style={{
                  display: 'inline-block',
                  padding: '0.5rem 1.25rem',
                  background: isDarkMode ? 'rgba(34, 197, 94, 0.15)' : 'rgba(34, 197, 94, 0.1)',
                  borderRadius: '9999px',
                  color: '#22c55e',
                  fontWeight: 600,
                  fontSize: 'clamp(0.85rem, 2.5vw, 1rem)',
                  marginBottom: '1.5rem',
                  border: `1px solid ${isDarkMode ? 'rgba(34, 197, 94, 0.3)' : 'rgba(34, 197, 94, 0.2)'}`
                }}
              >
                📬 Get In Touch
              </motion.span>
              <h2 style={{
                fontSize: 'clamp(1.8rem, 6vw, 3.5rem)',
                fontWeight: 800,
                marginBottom: '1.5rem',
                background: 'linear-gradient(90deg, #22c55e, #4ade80)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundSize: '200% 200%',
                animation: 'gradientShift 3s ease infinite'
              }}>
                Let's Work Together
              </h2>
              <div style={{
                width: '5rem',
                height: '4px',
                background: 'linear-gradient(90deg, #22c55e, #4ade80)',
                margin: '0 auto',
                borderRadius: '2px'
              }} />
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-100px' }}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: 'clamp(2rem, 5vw, 4rem)'
              }}
            >
              {/* Contact Info */}
              <motion.div variants={itemVariants} style={{ display: 'grid', gap: 'clamp(1.5rem, 4vw, 2.5rem)' }}>
                {[
                  { icon: Mail, title: 'Email', value: 'tanjimjoy@gmail.com', link: 'mailto:tanjimjoy@gmail.com', color: '#a855f7' },
                  { icon: Phone, title: 'Phone', value: '+880 1838 120302', link: 'tel:+8801838120302', color: '#ec4899' },
                  { icon: MapPin, title: 'Location', value: 'Gazipur, Bangladesh', link: '#', color: '#3b82f6' }
                ].map((item, index) => (
                  <motion.a
                    key={index}
                    href={item.link}
                    whileHover={{ x: 8 }}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '1.25rem',
                      textDecoration: 'none',
                      padding: '1.25rem',
                      background: isDarkMode ? 'rgba(30, 41, 59, 0.5)' : 'rgba(255, 255, 255, 0.8)',
                      borderRadius: '1.25rem',
                      border: `1px solid ${isDarkMode ? 'rgba(139, 92, 246, 0.3)' : 'rgba(124, 58, 237, 0.2)'}`,
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = item.color;
                      e.currentTarget.style.boxShadow = `0 8px 25px ${item.color}20`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = isDarkMode ? 'rgba(139, 92, 246, 0.3)' : 'rgba(124, 58, 237, 0.2)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div style={{
                      background: `${item.color}15`,
                      padding: '0.875rem',
                      borderRadius: '1rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <item.icon style={{ color: item.color, width: 22, height: 22 }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <h3 style={{
                        fontSize: 'clamp(1rem, 2.5vw, 1.15rem)',
                        fontWeight: 600,
                        marginBottom: '0.25rem',
                        color: isDarkMode ? 'white' : '#1e293b'
                      }}>
                        {item.title}
                      </h3>
                      <p style={{ color: isDarkMode ? '#cbd5e1' : '#475569', fontSize: 'clamp(0.9rem, 2.5vw, 1rem)' }}>
                        {item.value}
                      </p>
                    </div>
                    {item.title === 'Email' && (
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => { e.preventDefault(); copyEmail(); }}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                          padding: '0.5rem',
                          color: copiedEmail ? '#10b981' : (isDarkMode ? '#94a3b8' : '#64748b'),
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                        aria-label="Copy email address"
                      >
                        {copiedEmail ? <CheckCircle size={18} /> : <Copy size={18} />}
                      </motion.button>
                    )}
                  </motion.a>
                ))}

                {/* Social Links */}
                <div style={{ paddingTop: '1rem' }}>
                  <h3 style={{
                    fontSize: 'clamp(1rem, 2.5vw, 1.15rem)',
                    fontWeight: 600,
                    marginBottom: '1.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    color: isDarkMode ? 'white' : '#1e293b'
                  }}>
                    <MessageCircle style={{ color: '#22c55e', width: 20, height: 20 }} />
                    Connect With Me
                  </h3>
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    {[
                      { icon: Github, color: '#7c3aed', hoverColor: '#9333ea', link: 'https://github.com/Tanjim-joy', label: 'GitHub' },
                      { icon: Linkedin, color: '#3b82f6', hoverColor: '#60a5fa', link: 'https://www.linkedin.com/in/tangimul/', label: 'LinkedIn' },
                      { icon: MessageCircle, color: '#22c55e', hoverColor: '#4ade80', link: 'https://wa.me/8801838120302', label: 'WhatsApp' }
                    ].map((social, i) => (
                      <motion.a
                        key={i}
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1, y: -3 }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                          background: `${social.color}15`,
                          padding: '0.875rem',
                          borderRadius: '1rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: `1px solid ${social.color}40`,
                          transition: 'all 0.2s ease',
                          minHeight: 48,
                          minWidth: 48
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = `${social.color}25`;
                          e.currentTarget.style.borderColor = social.hoverColor;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = `${social.color}15`;
                          e.currentTarget.style.borderColor = `${social.color}40`;
                        }}
                        aria-label={social.label}
                      >
                        <social.icon style={{ color: social.color, width: 22, height: 22 }} />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                variants={itemVariants}
                style={{
                  background: isDarkMode ? 'rgba(30, 41, 59, 0.5)' : 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '1.5rem',
                  padding: 'clamp(1.75rem, 4vw, 2.5rem)',
                  border: `1px solid ${isDarkMode ? 'rgba(139, 92, 246, 0.3)' : 'rgba(124, 58, 237, 0.2)'}`,
                  boxShadow: isDarkMode 
                    ? '0 10px 40px rgba(0, 0, 0, 0.3)' 
                    : '0 10px 40px rgba(0, 0, 0, 0.08)'
                }}
              >
                <form ref={formRef} onSubmit={handleEmailSubmit} style={{ display: 'grid', gap: '1.5rem' }}>
                  <div>
                    <label style={{
                      display: 'block',
                      color: isDarkMode ? '#cbd5e1' : '#475569',
                      marginBottom: '0.625rem',
                      fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
                      fontWeight: 500
                    }}>
                      Name <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      autoComplete="name"
                      style={{
                        width: '100%',
                        background: isDarkMode ? 'rgba(15, 23, 42, 0.6)' : 'rgba(241, 245, 249, 0.9)',
                        border: `1px solid ${isDarkMode ? 'rgba(139, 92, 246, 0.4)' : 'rgba(124, 58, 237, 0.3)'}`,
                        borderRadius: '1rem',
                        padding: 'clamp(0.875rem, 2vw, 1.125rem) clamp(1.25rem, 3vw, 1.5rem)',
                        color: isDarkMode ? 'white' : '#1e293b',
                        fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)',
                        outline: 'none',
                        transition: 'all 0.2s ease',
                        minHeight: 48
                      }}
                      placeholder="Enter your name"
                      onFocus={(e) => {
                        e.target.style.borderColor = '#a855f7';
                        e.target.style.boxShadow = '0 0 0 3px rgba(168, 85, 247, 0.15)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = isDarkMode ? 'rgba(139, 92, 246, 0.4)' : 'rgba(124, 58, 237, 0.3)';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>

                  <div>
                    <label style={{
                      display: 'block',
                      color: isDarkMode ? '#cbd5e1' : '#475569',
                      marginBottom: '0.625rem',
                      fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
                      fontWeight: 500
                    }}>
                      Email <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      autoComplete="email"
                      style={{
                        width: '100%',
                        background: isDarkMode ? 'rgba(15, 23, 42, 0.6)' : 'rgba(241, 245, 249, 0.9)',
                        border: `1px solid ${isDarkMode ? 'rgba(139, 92, 246, 0.4)' : 'rgba(124, 58, 237, 0.3)'}`,
                        borderRadius: '1rem',
                        padding: 'clamp(0.875rem, 2vw, 1.125rem) clamp(1.25rem, 3vw, 1.5rem)',
                        color: isDarkMode ? 'white' : '#1e293b',
                        fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)',
                        outline: 'none',
                        transition: 'all 0.2s ease',
                        minHeight: 48
                      }}
                      placeholder="your.email@example.com"
                      onFocus={(e) => {
                        e.target.style.borderColor = '#a855f7';
                        e.target.style.boxShadow = '0 0 0 3px rgba(168, 85, 247, 0.15)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = isDarkMode ? 'rgba(139, 92, 246, 0.4)' : 'rgba(124, 58, 237, 0.3)';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>

                  <div>
                    <label style={{
                      display: 'block',
                      color: isDarkMode ? '#cbd5e1' : '#475569',
                      marginBottom: '0.625rem',
                      fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
                      fontWeight: 500
                    }}>
                      Message <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    <textarea
                      rows={5}
                      name="message"
                      required
                      style={{
                        width: '100%',
                        background: isDarkMode ? 'rgba(15, 23, 42, 0.6)' : 'rgba(241, 245, 249, 0.9)',
                        border: `1px solid ${isDarkMode ? 'rgba(139, 92, 246, 0.4)' : 'rgba(124, 58, 237, 0.3)'}`,
                        borderRadius: '1rem',
                        padding: 'clamp(0.875rem, 2vw, 1.125rem) clamp(1.25rem, 3vw, 1.5rem)',
                        color: isDarkMode ? 'white' : '#1e293b',
                        fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)',
                        outline: 'none',
                        resize: 'vertical',
                        minHeight: 140,
                        transition: 'all 0.2s ease'
                      }}
                      placeholder="Your message here..."
                      onFocus={(e) => {
                        e.target.style.borderColor = '#a855f7';
                        e.target.style.boxShadow = '0 0 0 3px rgba(168, 85, 247, 0.15)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = isDarkMode ? 'rgba(139, 92, 246, 0.4)' : 'rgba(124, 58, 237, 0.3)';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={formStatus === 'sending'}
                    style={{
                      width: '100%',
                      background: formStatus === 'sending' 
                        ? 'linear-gradient(90deg, #6b7280, #9ca3af)' 
                        : 'linear-gradient(90deg, #7c3aed, #db2777)',
                      padding: 'clamp(0.875rem, 2vw, 1.125rem)',
                      borderRadius: '1rem',
                      fontWeight: 600,
                      border: 'none',
                      color: 'white',
                      cursor: formStatus === 'sending' ? 'not-allowed' : 'pointer',
                      fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)',
                      boxShadow: '0 10px 30px rgba(124, 58, 237, 0.35)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.75rem',
                      minHeight: 52,
                      transition: 'all 0.2s ease',
                      opacity: formStatus === 'sending' ? 0.7 : 1
                    }}
                  >
                    {formStatus === 'sending' ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          style={{
                            width: 20,
                            height: 20,
                            border: '2px solid rgba(255,255,255,0.3)',
                            borderTopColor: 'white',
                            borderRadius: '50%'
                          }}
                        />
                        Sending...
                      </>
                    ) : formStatus === 'success' ? (
                      <>
                        <CheckCircle style={{ width: 20, height: 20 }} />
                        Message Sent! ✓
                      </>
                    ) : formStatus === 'error' ? (
                      <>
                        <X style={{ width: 20, height: 20 }} />
                        Try Again
                      </>
                    ) : (
                      <>
                        Send Message
                        <ArrowRight style={{ width: 20, height: 20 }} />
                      </>
                    )}
                  </motion.button>

                  {/* Form Status Message */}
                  <AnimatePresence>
                    {(formStatus === 'success' || formStatus === 'error') && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        style={{
                          padding: '0.875rem 1.25rem',
                          borderRadius: '0.875rem',
                          background: formStatus === 'success' 
                            ? (isDarkMode ? 'rgba(16, 185, 129, 0.15)' : 'rgba(16, 185, 129, 0.1)')
                            : (isDarkMode ? 'rgba(239, 68, 68, 0.15)' : 'rgba(239, 68, 68, 0.1)'),
                          border: `1px solid ${formStatus === 'success' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
                          color: formStatus === 'success' ? '#6ee7b7' : '#fca5a5',
                          fontSize: '0.9rem',
                          textAlign: 'center'
                        }}
                      >
                        {formStatus === 'success' 
                          ? '🎉 Thank you! Your message has been sent successfully.' 
                          : '⚠️ Something went wrong. Please try again or contact me directly.'}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </motion.div>
            </motion.div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer style={{
        padding: 'clamp(2.5rem, 8vh, 4rem) clamp(1rem, 4vw, 2rem)',
        borderTop: `1px solid ${isDarkMode ? 'rgba(139, 92, 246, 0.3)' : 'rgba(124, 58, 237, 0.2)'}`,
        background: isDarkMode ? 'rgba(15, 23, 42, 0.6)' : 'rgba(248, 250, 252, 0.8)',
        backdropFilter: 'blur(20px)',
        position: 'relative'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1
        }}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginBottom: '1.5rem',
              cursor: 'pointer'
            }}
            onClick={() => scrollToSection('about')}
          >
            <Code style={{ color: '#a855f7', width: 24, height: 24 }} />
            <span style={{
              fontSize: 'clamp(1.1rem, 3vw, 1.4rem)',
              fontWeight: 700,
              background: 'linear-gradient(90deg, #a855f7, #ec4899)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Tangimul Haque
            </span>
          </motion.div>
          
          <p style={{
            color: isDarkMode ? '#94a3b8' : '#64748b',
            fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
            maxWidth: '90%',
            margin: '0 auto 1.5rem',
            lineHeight: 1.6
          }}>
            © {currentYear} Tangimul Haque. All rights reserved. 
            <br style={{ display: isMobile ? 'block' : 'none' }} />
            Crafted with precision and passion for digital innovation.
          </p>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1.5rem',
            flexWrap: 'wrap'
          }}>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            whileHover={{ scale: 1.1, y: -3 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{
              position: 'fixed',
              bottom: 'clamp(1.5rem, 4vh, 2.5rem)',
              right: 'clamp(1.5rem, 4vw, 2.5rem)',
              zIndex: 1000,
              background: 'linear-gradient(90deg, #7c3aed, #db2777)',
              padding: '0.875rem',
              borderRadius: '50%',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              boxShadow: '0 8px 30px rgba(124, 58, 237, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 52,
              height: 52,
              minHeight: 48,
              minWidth: 48
            }}
            aria-label="Back to top"
          >
            <ArrowUp style={{ width: 24, height: 24 }} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Global Styles & Animations */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.05); }
        }
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        html {
          scroll-behavior: smooth;
          scroll-padding-top: 100px;
        }
        
        body {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        /* Custom Scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: ${isDarkMode ? '#1e293b' : '#f1f5f9'};
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #7c3aed, #db2777);
          border-radius: 4px;
          border: 2px solid ${isDarkMode ? '#1e293b' : '#f1f5f9'};
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #6d28d9, #be185d);
        }
        
        /* Firefox Scrollbar */
        * {
          scrollbar-width: thin;
          scrollbar-color: #7c3aed ${isDarkMode ? '#1e293b' : '#f1f5f9'};
        }
        
        /* Focus Styles for Accessibility */
        button:focus-visible,
        a:focus-visible,
        input:focus-visible,
        textarea:focus-visible {
          outline: 2px solid #a855f7;
          outline-offset: 2px;
        }
        
        /* Skip Link */
        .skip-link:focus {
          left: 0 !important;
        }
        
        /* Details/Summary Arrow Animation */
        details summary::-webkit-details-marker {
          display: none;
        }
        
        details[open] summary svg {
          transform: rotate(90deg);
        }
        
        /* Mobile Optimizations */
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            text-align: center;
          }
          
          .hero-grid > div:first-child {
            order: 2;
          }
          
          .hero-grid > div:last-child {
            order: 1;
            max-width: 320px;
            margin: 0 auto;
          }
          
          input, textarea, button {
            min-height: 48px !important;
            font-size: 16px !important;
          }
        }
        
        /* Reduced Motion Preference */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        }
        
        /* Light Mode Overrides */
        .light-mode {
          color-scheme: light;
        }
        
        .light-mode input,
        .light-mode textarea {
          color: #1e293b !important;
        }
        
        .light-mode input::placeholder,
        .light-mode textarea::placeholder {
          color: #94a3b8 !important;
        }
      `}</style>
    </div>
  );
};

export default Portfolio;
