'use client';

import { useState, useEffect, useRef, use } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Code2, 
  Globe, 
  Gamepad2,
  ArrowDown,
  User,
  Briefcase,
  Send,
  ChevronRight,
  Star,
  Zap,
  Sparkles,
  Rocket,
  Coffee,
  Heart,
  MessageCircle,
  BookOpen,
  Award,
  Trophy,
  CodeIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export default function Portfolio() {
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [mouseTrail, setMouseTrail] = useState<Array<{x: number, y: number, id: number}>>([]);
  const particlesRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const networkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Add to mouse trail
      const newTrailPoint = {
        x: e.clientX,
        y: e.clientY,
        id: Date.now()
      };
      
      setMouseTrail(prev => {
        const newTrail = [newTrailPoint, ...prev].slice(0, 8);
        return newTrail;
      });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Clean up old trail points
  useEffect(() => {
    const interval = setInterval(() => {
      setMouseTrail(prev => prev.filter(point => Date.now() - point.id < 1000));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setIsVisible(true);
    
    // Optimized particle creation with reduced frequency
    const createParticle = () => {
      if (!particlesRef.current) return;
      
      const particle = document.createElement('div');
      const types = ['particle-1', 'particle-2', 'particle-3'];
      const randomType = types[Math.floor(Math.random() * types.length)];
      
      particle.className = `particle ${randomType}`;
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 20 + 's';
      
      particlesRef.current.appendChild(particle);
      
      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      }, 30000);
    };

    // Reduced particle creation frequency for better performance
    const particleInterval = setInterval(createParticle, 4000);
    
    // Create fewer initial particles
    for (let i = 0; i < 5; i++) {
      setTimeout(createParticle, i * 400);
    }

    // Reduced parallax elements for better performance
    const createParallaxElement = () => {
      if (!parallaxRef.current) return;
      
      const element = document.createElement('div');
      const animations = ['animate-parallax-slow', 'animate-parallax-medium', 'animate-parallax-fast'];
      const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
      const size = Math.random() * 8 + 4;
      const isDark = Math.random() > 0.6;
      
      element.className = `absolute rounded-full ${isDark ? 'bg-black/10' : 'bg-purple-500/5'} ${randomAnimation}`;
      element.style.width = size + 'px';
      element.style.height = size + 'px';
      element.style.left = Math.random() * 100 + '%';
      element.style.top = Math.random() * 100 + '%';
      element.style.animationDelay = Math.random() * 10 + 's';
      
      parallaxRef.current.appendChild(element);
      
      setTimeout(() => {
        if (element.parentNode) {
          element.parentNode.removeChild(element);
        }
      }, 25000);
    };

    const parallaxInterval = setInterval(createParallaxElement, 5000);
    
    // Create fewer initial parallax elements
    for (let i = 0; i < 10; i++) {
      setTimeout(createParallaxElement, i * 500);
    }

    // Create network visualization
    const createNetworkNodes = () => {
      if (!networkRef.current) return;
      
      // Create nodes
      for (let i = 0; i < 15; i++) {
        const node = document.createElement('div');
        node.className = 'absolute w-2 h-2 bg-purple-500/30 rounded-full animate-pulse';
        node.style.left = Math.random() * 100 + '%';
        node.style.top = Math.random() * 100 + '%';
        node.style.animationDelay = Math.random() * 3 + 's';
        networkRef.current.appendChild(node);
      }
      
      // Create connecting lines
      for (let i = 0; i < 8; i++) {
        const line = document.createElement('div');
        line.className = 'absolute bg-gradient-to-r from-transparent via-purple-500/20 to-transparent animate-pulse';
        line.style.width = Math.random() * 200 + 100 + 'px';
        line.style.height = '1px';
        line.style.left = Math.random() * 80 + '%';
        line.style.top = Math.random() * 80 + '%';
        line.style.transform = `rotate(${Math.random() * 360}deg)`;
        line.style.animationDelay = Math.random() * 4 + 's';
        networkRef.current.appendChild(line);
      }
    };

    createNetworkNodes();

    return () => {
      clearInterval(particleInterval);
      clearInterval(parallaxInterval);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'certifications', 'blog', 'contact'];
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

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = sectionId === 'home' ? 0 : element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  const skills = [
    { 
      name: 'Minecraft Plugins', 
      icon: Gamepad2, 
      description: 'Custom server modifications & gameplay features', 
      level: 80,
      color: 'from-purple-600 to-indigo-600'
    },
    { 
      name: 'Web Development', 
      icon: Globe, 
      description: 'Responsive & modern web applications', 
      level: 80,
      color: 'from-violet-600 to-purple-500'
    },
    { 
      name: 'C#', 
      icon: Code2, 
      description: 'Game Development in Unity and Web APIs [Learning]', 
      level: 40,
      color: 'from-violet-500 to-purple-600'
    },
    { 
      name: 'Next.js', 
      icon: Rocket, 
      description: 'Full-stack React applications', 
      level: 60,
      color: 'from-indigo-500 to-purple-600'
    },
    { 
      name: 'Unity', 
      icon: CodeIcon, 
      description: 'Game Development in Unity. [Learning]', 
      level: 50,
      color: 'from-indigo-500 to-purple-600'
    }
  ];

  const projects = [
    {
      title: 'Modern Web Portfolio',
      description: 'Responsive portfolio website with stunning animations, interactive elements, and modern design built with Next.js and Tailwind CSS.',
      tech: ['NextJS', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
      link: 'https://jehoshua.netlify.app/?src=portfolio',
      featured: true,
      stats: { animations: '20+', responsiveness: '100%' }
    },
    {
      title: 'Inkdrop',
      description: 'A live document collaborator tool that allows multiple users to edit and collaborate on a document in real-time.',
      tech: ['NextJS', 'Clerk', 'Liveblocks', 'Tailwind CSS'],
      link: 'https://inkdrop.netlify.app/?src=portfolio',
      featured: true,
      stats: { tools: '10+', responsiveness: '100%' }
    },
    {
      title: 'Aptlyzer',
      description: 'An AI reusme analyzer using puter.js which uses AI to analyze and provide ATS scores and tips for improvement.',
      tech: ['React Router v7', 'Puter.js', 'Tailwind CSS', 'GPT'],
      link: '#',
      featured: false,
      stats: { accuracy: '97%', productivity: '80%' }
    },
    {
      title: 'SpyDat',
      description: 'A hybrid 2D/3D data visualization tool for data science and analytics. Uses three.js and react-three-fiber for 3D rendering and react for 2D rendering. ',
      tech: ['React', 'Three.js', 'TypeScript', 'Tailwind CSS'],
      link: '#',
      featured: false,
      stats: { features: '10+', responsiveness: '100%' }
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-purple-900 relative overflow-hidden">
      {/* Optimized Background */}
      <div className="fixed inset-0 bg-mesh-gradient-dark animate-gradient opacity-60"></div>
      <div className="fixed inset-0 bg-mesh-gradient animate-gradient opacity-40"></div>
      
      {/* Grid Pattern */}
      <div className="fixed inset-0 grid-pattern opacity-20"></div>
      <div className="fixed inset-0 grid-pattern-dark opacity-15"></div>
      
      {/* Noise Texture */}
      <div className="fixed inset-0 noise-texture opacity-50"></div>
      
      {/* Network Visualization Background */}
      <div ref={networkRef} className="fixed inset-0 pointer-events-none z-0"></div>
      
      {/* Parallax Background Elements */}
      <div ref={parallaxRef} className="fixed inset-0 pointer-events-none z-0 parallax-bg"></div>
      
      {/* Floating Particles */}
      <div ref={particlesRef} className="fixed inset-0 pointer-events-none z-0"></div>
      
      {/* Mouse Trail */}
      {mouseTrail.map((point, index) => (
        <div
          key={point.id}
          className="fixed w-3 h-3 bg-gradient-to-r from-purple-500/40 to-violet-500/40 rounded-full pointer-events-none z-40 transition-all duration-300"
          style={{
            left: point.x - 6,
            top: point.y - 6,
            opacity: 1 - (index * 0.15),
            transform: `scale(${1 - (index * 0.1)})`,
          }}
        />
      ))}
      
      {/* Optimized Mouse Follower */}
      <div 
        className="fixed w-6 h-6 bg-gradient-to-r from-purple-500/30 to-black/30 rounded-full pointer-events-none z-50 transition-all duration-200 ease-out blur-sm"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          transform: `scale(${mousePosition.x > 0 ? 1 : 0})`,
        }}
      ></div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-gradient-to-r from-black/20 via-purple-900/20 to-black/20 backdrop-blur-xl border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold text-gradient glow">
              <Sparkles className="inline-block w-6 h-6 mr-2" />
              Jehoshua
            </div>
            <div className="hidden md:flex space-x-8">
              {['home', 'about', 'skills', 'projects', 'certifications', 'blog', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`capitalize transition-all duration-300 relative group ${
                    activeSection === item
                      ? 'text-purple-400 glow'
                      : 'text-muted-foreground hover:text-purple-300'
                  }`}
                >
                  {item}
                  <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-purple-400 to-violet-500 transform origin-left transition-transform duration-300 ${
                    activeSection === item ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}></span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="text-left max-w-4xl">
            <div 
              className={`transition-all duration-1000 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
              style={{ transform: `translateY(${scrollY * 0.15}px)` }}
            >
              <div className="mb-8">
                <div className="flex items-center gap-4">
                  <Star className="w-16 h-16 text-purple-400 animate-spin-slow glow" />
                </div>
              </div>
              <div className="mb-8">
                <span className="text-2xl md:text-3xl text-purple-300 font-medium block mb-4">
                  Hi there! I'm
                </span>
                <div 
                  className="text-5xl md:text-8xl font-bold text-gradient mb-4 glow-strong"
                  style={{ transform: `translateX(${scrollY * 0.05}px)` }}
                >
                  Jehoshua
                </div>
                <div className="text-lg md:text-xl text-purple-200/80 font-medium">
                  Age 15 • Passionate Coder
                </div>
              </div>
            </div>
            <p 
              className={`text-xl md:text-2xl text-purple-200/80 mb-12 leading-relaxed transition-all duration-1000 delay-300 ${isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-10'}`}
              style={{ transform: `translateY(${scrollY * 0.08}px)` }}
            >
              A passionate <span className="text-purple-400 font-semibold">15-year-old developer</span> crafting extraordinary digital experiences with 
              Java, JavaScript, and innovative Minecraft plugins. Transforming <span className="text-violet-400 font-semibold">creative ideas</span> into 
              functional solutions that <span className="text-purple-300 font-semibold">inspire and engage</span>.
            </p>
            <div 
              className={`flex flex-col sm:flex-row gap-6 mb-12 transition-all duration-1000 delay-500 ${isVisible ? 'animate-scale-in' : 'opacity-0 scale-90'}`}
              style={{ transform: `translateX(${scrollY * 0.03}px)` }}
            >
              <Button 
                size="lg" 
                onClick={() => scrollToSection('projects')}
                className="bg-gradient-to-r from-purple-600 via-black to-violet-600 hover:from-purple-500 hover:via-gray-800 hover:to-violet-500 text-white group hover-lift aurora-border px-8 py-4 text-lg font-semibold relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
                <Rocket className="mr-2 h-5 w-5 group-hover:animate-bounce relative z-10" />
                <span className="relative z-10">Explore My Work</span>
                <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform relative z-10" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => scrollToSection('contact')}
                className="border-purple-500/50 text-purple-300 hover:bg-gradient-to-r hover:from-black/20 hover:to-purple-500/10 hover:border-purple-400 hover-lift shimmer-border px-8 py-4 text-lg relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
                <Send className="mr-2 h-5 w-5 relative z-10" />
                <span className="relative z-10">Let's Connect</span>
              </Button>
            </div>
            <div 
              className={`flex gap-8 transition-all duration-1000 delay-700 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
              style={{ transform: `translateY(${scrollY * 0.02}px)` }}
            >
              <a href="https://github.com/HerobrineTG" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 transition-all duration-300 hover:scale-125 hover-glow">
                <Github className="h-8 w-8" />
              </a>
              <a href="https://www.linkedin.com/in/jehoshua-m/" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 transition-all duration-300 hover:scale-125 hover-glow">
                <Linkedin className="h-8 w-8" />
              </a>
              <a href="mailto:jehoshua.dev@gmail.com" className="text-purple-400 hover:text-purple-300 transition-all duration-300 hover:scale-125 hover-glow">
                <Mail className="h-8 w-8" />
              </a>
              <a href="https://discord.com/users/herobrinetg" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 transition-all duration-300 hover:scale-125 hover-glow">
                <MessageCircle className="h-8 w-8" />
              </a>
            </div>
          </div>
        </div>
        <div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-slow"
          style={{ transform: `translateX(-50%) translateY(${scrollY * 0.1}px)` }}
        >
          <ArrowDown className="h-8 w-8 text-purple-400 glow" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gradient-to-b from-transparent via-black/20 to-purple-900/20 relative">
        <div 
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 parallax-element"
          style={{ transform: `translateY(${scrollY * 0.1}px)` }}
        >
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gradient glow">About Me</h2>
            <div className="w-32 h-1 bg-gradient-to-r from-black via-purple-500 to-violet-500 mx-auto animate-gradient"></div>
          </div>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-gradient-to-r from-black via-purple-600 to-violet-600 rounded-full glow">
                  <User className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gradient">Young Innovator</h3>
              </div>
              <p className="text-lg text-purple-100/90 leading-relaxed">
                At just <span className="text-purple-400 font-semibold">15 years old</span>, I've already discovered my passion for creating 
                innovative digital solutions. My journey began with <span className="text-violet-400 font-semibold">Minecraft plugin development</span>, 
                where I learned the fundamentals of Java programming and server architecture.
              </p>
              <p className="text-lg text-purple-100/90 leading-relaxed">
                Since then, I've expanded my expertise to include <span className="text-purple-400 font-semibold">modern web technologies</span> like 
                JavaScript and Next.js. I believe in writing <span className="text-violet-400 font-semibold">clean, efficient code</span> and 
                creating user experiences that are both <span className="text-purple-300 font-semibold">functional and delightful</span>.
              </p>
              <div className="flex flex-wrap gap-3 mt-8">
                <Badge className="bg-gradient-to-r from-black to-purple-600 text-white px-4 py-2 text-sm font-semibold border border-purple-500/30">
                  <Coffee className="w-4 h-4 mr-2" />
                  2+ Years Experience
                </Badge>
                <Badge className="bg-gradient-to-r from-violet-600 to-black text-white px-4 py-2 text-sm font-semibold border border-violet-500/30">
                  <Zap className="w-4 h-4 mr-2" />
                  Self-Taught
                </Badge>
                <Badge className="bg-gradient-to-r from-purple-600 to-gray-800 text-white px-4 py-2 text-sm font-semibold border border-purple-500/30">
                  <Heart className="w-4 h-4 mr-2" />
                  Passionate Learner
                </Badge>
              </div>
            </div>
            <div className="relative">
              <Card className="bg-gradient-to-br from-black/60 via-purple-900/40 to-violet-800/30 backdrop-blur-xl border border-purple-500/30 hover-lift overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer"></div>
                <CardContent className="p-8 relative z-10">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center group">
                      <div className="text-3xl font-bold text-gradient mb-2 group-hover:scale-110 transition-transform">5+</div>
                      <div className="text-purple-200 text-sm">Projects Built</div>
                      <Sparkles className="w-5 h-5 text-purple-400 mx-auto mt-2 animate-pulse" />
                    </div>
                    <div className="text-center group">
                      <div className="text-3xl font-bold text-gradient-dark mb-2 group-hover:scale-110 transition-transform">Daily</div>
                      <div className="text-gray-300 text-sm">Learning</div>
                      <Star className="w-5 h-5 text-gray-400 mx-auto mt-2 animate-spin-slow" />
                    </div>
                    <div className="text-center group">
                      <div className="text-3xl font-bold text-gradient mb-2 group-hover:scale-110 transition-transform">2+</div>
                      <div className="text-purple-200 text-sm">Years Coding</div>
                      <Rocket className="w-5 h-5 text-purple-400 mx-auto mt-2 animate-bounce" />
                    </div>
                    <div className="text-center group">
                      <div className="text-3xl font-bold text-gradient-dark mb-2 group-hover:scale-110 transition-transform">15</div>
                      <div className="text-gray-300 text-sm">Years Old</div>
                      <Zap className="w-5 h-5 text-gray-400 mx-auto mt-2 animate-pulse" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 relative">
        <div 
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 parallax-element"
          style={{ transform: `translateY(${scrollY * 0.05}px)` }}
        >
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gradient glow">Skills & Expertise</h2>
            <div className="w-32 h-1 bg-gradient-to-r from-purple-500 via-black to-violet-500 mx-auto animate-gradient"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <Card key={skill.name} className="group hover-lift bg-gradient-to-br from-black/60 via-purple-900/40 to-violet-800/30 backdrop-blur-xl border border-purple-500/30 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer"></div>
                <CardHeader className="relative meteor-effect z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`p-4 rounded-xl bg-gradient-to-r ${skill.color} group-hover:scale-110 transition-all duration-300 glow`}>
                      <skill.icon className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl text-gradient group-hover:glow transition-all">{skill.name}</CardTitle>
                      <div className="text-sm text-purple-300 font-semibold">{skill.level}% Proficiency</div>
                    </div>
                  </div>
                  <div className="w-full bg-gradient-to-r from-black/50 to-purple-900/50 rounded-full h-3 overflow-hidden">
                    <div 
                      className={`bg-gradient-to-r ${skill.color} h-3 rounded-full transition-all duration-2000 ease-out relative overflow-hidden group-hover:animate-pulse`}
                      style={{ width: `${skill.level}%` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="relative z-10">
                  <p className="text-purple-100/80 leading-relaxed">{skill.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gradient-to-b from-transparent via-black/30 to-purple-900/20 relative">
        <div 
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 parallax-element"
          style={{ transform: `translateY(${scrollY * 0.03}px)` }}
        >
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gradient glow">My Projects</h2>
            <div className="w-32 h-1 bg-gradient-to-r from-purple-500 via-black to-violet-500 mx-auto animate-gradient"></div>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <Card key={project.title} className={`group hover-lift bg-gradient-to-br from-black/60 via-purple-900/40 to-violet-800/30 backdrop-blur-xl border border-purple-500/30 overflow-hidden relative ${project.featured ? 'lg:col-span-1' : ''}`}>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer"></div>
                <CardHeader className="relative meteor-effect z-10">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <CardTitle className="text-2xl text-gradient group-hover:glow transition-all">
                          {project.title}
                        </CardTitle>
                        {project.featured && (
                          <Badge className="bg-gradient-to-r from-black to-purple-600 text-white px-3 py-1 text-xs font-bold animate-pulse border border-purple-500/30">
                            <Star className="w-3 h-3 mr-1" />
                            Featured
                          </Badge>
                        )}
                      </div>
                      <div className="flex gap-4 mb-4">
                        {Object.entries(project.stats).map(([key, value]) => (
                          <div key={key} className="text-center">
                            <div className="text-lg font-bold text-purple-400">{value}</div>
                            <div className="text-xs text-purple-300 capitalize">{key}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="shrink-0 hover:bg-gradient-to-r hover:from-black/20 hover:to-purple-500/20 hover:scale-110 transition-all relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
                      <ExternalLink className="h-5 w-5 text-purple-400 relative z-10" />
                    </Button>
                  </div>
                  <CardDescription className="text-base leading-relaxed text-purple-100/80">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative z-10">
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <Badge key={tech} className="bg-gradient-to-r from-black/50 to-purple-800/50 text-purple-200 border border-purple-500/30 hover:bg-gradient-to-r hover:from-purple-700/50 hover:to-black/50 transition-colors text-xs px-3 py-1">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="py-20 relative">
        <div 
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 parallax-element"
          style={{ transform: `translateY(${scrollY * 0.02}px)` }}
        >
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gradient glow">Certifications</h2>
            <div className="w-32 h-1 bg-gradient-to-r from-purple-500 via-black to-violet-500 mx-auto animate-gradient"></div>
          </div>
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-br from-black/60 via-purple-900/40 to-violet-800/30 backdrop-blur-xl border border-purple-500/30 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer"></div>
              <CardContent className="p-12 relative z-10">
                <div className="text-center mb-12">
                  <div className="flex justify-center items-center gap-4 mb-6">
                    <Trophy className="w-16 h-16 text-purple-400 animate-float glow" />
                  </div>
                  <h3 className="text-3xl font-bold text-gradient mb-6">Professional Achievements</h3>
                  <p className="text-xl text-purple-100/90 leading-relaxed">
                    Explore my <span className="text-purple-400 font-semibold">verified certifications</span> and 
                    <span className="text-violet-400 font-semibold"> professional achievements</span> that demonstrate my 
                    <span className="text-purple-300 font-semibold"> commitment to continuous learning</span> and skill development.
                  </p>
                </div>
                <div className="grid md:grid-cols-3 gap-8 mb-12">
                  <div className="text-center group">
                    <div className="p-6 bg-gradient-to-r from-black via-purple-600 to-violet-600 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg shadow-purple-500/25">
                      <Award className="h-10 w-10 text-white" />
                    </div>
                    <h4 className="font-bold text-xl text-gradient mb-3">Verified Skills</h4>
                    <p className="text-purple-200 text-sm">Industry-recognized certifications</p>
                  </div>
                  <div className="text-center group">
                    <div className="p-6 bg-gradient-to-r from-violet-600 via-black to-purple-600 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg shadow-violet-500/25">
                      <Trophy className="h-10 w-10 text-white" />
                    </div>
                    <h4 className="font-bold text-xl text-gradient mb-3">Achievements</h4>
                    <p className="text-purple-200 text-sm">Professional milestones</p>
                  </div>
                  <div className="text-center group">
                    <div className="p-6 bg-gradient-to-r from-purple-600 via-black to-gray-600 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg shadow-purple-500/25">
                      <Star className="h-10 w-10 text-white" />
                    </div>
                    <h4 className="font-bold text-xl text-gradient mb-3">Excellence</h4>
                    <p className="text-purple-200 text-sm">Commitment to quality</p>
                  </div>
                </div>
                <div className="text-center">
                  <Link href="/certifications">
                    <Button size="lg" className="bg-gradient-to-r from-black via-purple-600 to-violet-600 hover:from-gray-800 hover:via-purple-500 hover:to-violet-500 text-white px-12 py-4 text-lg font-bold hover-lift aurora-border animate-gradient relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
                      <Trophy className="mr-3 h-6 w-6 relative z-10" />
                      <span className="relative z-10">View All Certifications</span>
                      <ChevronRight className="ml-3 h-6 w-6 relative z-10" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-20 bg-gradient-to-b from-transparent via-black/20 to-purple-900/20 relative">
        <div 
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 parallax-element"
          style={{ transform: `translateY(${scrollY * 0.02}px)` }}
        >
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gradient glow">My Blog</h2>
            <div className="w-32 h-1 bg-gradient-to-r from-purple-500 via-black to-violet-500 mx-auto animate-gradient"></div>
          </div>
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-br from-black/60 via-purple-900/40 to-violet-800/30 backdrop-blur-xl border border-purple-500/30 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer"></div>
              <CardContent className="p-12 relative z-10">
                <div className="text-center mb-12">
                  <div className="flex justify-center items-center gap-4 mb-6">
                    <BookOpen className="w-16 h-16 text-purple-400 animate-float glow" />
                  </div>
                  <h3 className="text-3xl font-bold text-gradient mb-6">Developer Insights & Stories</h3>
                  <p className="text-xl text-purple-100/90 leading-relaxed">
                    Dive into my <span className="text-purple-400 font-semibold">coding journey</span>, 
                    <span className="text-violet-400 font-semibold"> technical tutorials</span>, and insights about 
                    <span className="text-purple-300 font-semibold"> modern development practices</span>. Join me as I share 
                    my experiences as a young developer in the tech world.
                  </p>
                </div>
                <div className="grid md:grid-cols-3 gap-8 mb-12">
                  <div className="text-center group">
                    <div className="p-6 bg-gradient-to-r from-black via-purple-600 to-violet-600 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg shadow-purple-500/25">
                      <Code2 className="h-10 w-10 text-white" />
                    </div>
                    <h4 className="font-bold text-xl text-gradient mb-3">Coding Tutorials</h4>
                    <p className="text-purple-200 text-sm">Step-by-step guides and tips</p>
                  </div>
                  <div className="text-center group">
                    <div className="p-6 bg-gradient-to-r from-violet-600 via-black to-purple-600 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg shadow-violet-500/25">
                      <Rocket className="h-10 w-10 text-white" />
                    </div>
                    <h4 className="font-bold text-xl text-gradient mb-3">Project Stories</h4>
                    <p className="text-purple-200 text-sm">Behind-the-scenes development</p>
                  </div>
                  <div className="text-center group">
                    <div className="p-6 bg-gradient-to-r from-purple-600 via-black to-gray-600 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg shadow-purple-500/25">
                      <Zap className="h-10 w-10 text-white" />
                    </div>
                    <h4 className="font-bold text-xl text-gradient mb-3">Tech Insights</h4>
                    <p className="text-purple-200 text-sm">Industry trends and thoughts</p>
                  </div>
                </div>
                <div className="text-center">
                  <Link href="/blog">
                    <Button size="lg" className="bg-gradient-to-r from-black via-purple-600 to-violet-600 hover:from-gray-800 hover:via-purple-500 hover:to-violet-500 text-white px-12 py-4 text-lg font-bold hover-lift aurora-border animate-gradient relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
                      <BookOpen className="mr-3 h-6 w-6 relative z-10" />
                      <span className="relative z-10">Read My Blog</span>
                      <ChevronRight className="ml-3 h-6 w-6 relative z-10" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 relative">
        <div 
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 parallax-element"
          style={{ transform: `translateY(${scrollY * 0.02}px)` }}
        >
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gradient glow">Let's Create Together</h2>
            <div className="w-32 h-1 bg-gradient-to-r from-purple-500 via-black to-violet-500 mx-auto animate-gradient"></div>
          </div>
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-br from-black/60 via-purple-900/40 to-violet-800/30 backdrop-blur-xl border border-purple-500/30 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer"></div>
              <CardContent className="p-12 relative z-10">
                <div className="text-center mb-12">
                  <div className="flex justify-center items-center gap-4 mb-6">
                    <Sparkles className="w-16 h-16 text-purple-400 animate-spin-slow glow" />
                  </div>
                  <p className="text-xl text-purple-100/90 leading-relaxed">
                    Ready to collaborate on your next <span className="text-purple-400 font-semibold">amazing project</span>? 
                    I'm always excited about discussing <span className="text-violet-400 font-semibold">new opportunities</span>, 
                    innovative ideas, and <span className="text-purple-300 font-semibold">creative collaborations</span>.
                  </p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                  <div className="text-center group">
                    <div className="p-6 bg-gradient-to-r from-black via-purple-600 to-violet-600 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg shadow-purple-500/25">
                      <Mail className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="font-bold text-xl text-gradient mb-3">Email</h3>
                    <p className="text-purple-200 text-sm">jehoshua.dev@gmail.com</p>
                  </div>
                  <div className="text-center group">
                    <div className="p-6 bg-gradient-to-r from-violet-600 via-black to-purple-600 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg shadow-violet-500/25">
                      <Github className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="font-bold text-xl text-gradient mb-3">GitHub</h3>
                    <p className="text-purple-200 text-sm">HerobrineTG</p>
                  </div>
                  <div className="text-center group">
                    <div className="p-6 bg-gradient-to-r from-purple-600 via-black to-gray-600 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg shadow-purple-500/25">
                      <MessageCircle className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="font-bold text-xl text-gradient mb-3">Discord</h3>
                    <p className="text-purple-200 text-sm">@herobrinetg</p>
                  </div>
                  <div className="text-center group">
                    <div className="p-6 bg-gradient-to-r from-black via-indigo-600 to-purple-600 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg shadow-indigo-500/25">
                      <Linkedin className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="font-bold text-xl text-gradient mb-3">LinkedIn</h3>
                    <p className="text-purple-200 text-sm">jehoshua-m</p>
                  </div>
                </div>
                <div className="text-center">
                  <Button size="lg" className="bg-gradient-to-r from-black via-purple-600 to-violet-600 hover:from-gray-800 hover:via-purple-500 hover:to-violet-500 text-white px-12 py-4 text-lg font-bold hover-lift aurora-border animate-gradient relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
                    <Send className="mr-3 h-6 w-6 relative z-10" />
                    <span className="relative z-10">Start Our Journey</span>
                    <Sparkles className="ml-3 h-6 w-6 animate-pulse relative z-10" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-purple-500/30 bg-gradient-to-r from-black/40 via-purple-900/20 to-black/40 backdrop-blur-xl relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center items-center gap-3 mb-4">
              <Heart className="w-6 h-6 text-purple-400 animate-pulse" />
              <p className="text-purple-200 text-lg">
                © 2025 Jehoshua. Crafted with <span className="text-purple-400 font-semibold">passion</span> and <span className="text-violet-400 font-semibold">code</span>.
              </p>
              <Heart className="w-6 h-6 text-purple-400 animate-pulse" />
            </div>
            <div className="flex justify-center space-x-6">
              <Star className="w-4 h-4 text-purple-400 animate-pulse" />
              <div className="w-4 h-4 bg-black rounded-full animate-pulse"></div>
              <Star className="w-4 h-4 text-violet-400 animate-pulse" style={{ animationDelay: '0.5s' }} />
              <div className="w-4 h-4 bg-gray-800 rounded-full animate-pulse" style={{ animationDelay: '0.7s' }}></div>
              <Star className="w-4 h-4 text-purple-400 animate-pulse" style={{ animationDelay: '1s' }} />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}