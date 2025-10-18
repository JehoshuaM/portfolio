'use client';

import { useState, useEffect, useRef, SVGProps, CSSProperties } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Code2, 
  Globe, 
  Gamepad2,
  Briefcase,
  Send,
  Award,
  BookOpen,
  FileCode,
  Rocket,
  Zap,
  Trophy,
  Coffee,
  Terminal,
  Sparkles,
  Star,
  ArrowRight,
  ChevronDown,
  Layers,
  Database,
  Server,
  BotIcon,
  Gamepad2Icon,
  Package,
  Calendar
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('home');
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorOutlineRef = useRef<HTMLDivElement>(null);

  const dotSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
    <circle cx="1" cy="1" r="1" fill="#a855f7" fill-opacity="0.32"/>
  </svg>`;
  const dotDataUrl = `data:image/svg+xml;utf8,${encodeURIComponent(dotSvg)}`;

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      if (cursorDotRef.current) {
        cursorDotRef.current.style.left = `${e.clientX}px`;
        cursorDotRef.current.style.top = `${e.clientY}px`;
      }
      
      if (cursorOutlineRef.current) {
        setTimeout(() => {
          if (cursorOutlineRef.current) {
            cursorOutlineRef.current.style.left = `${e.clientX}px`;
            cursorOutlineRef.current.style.top = `${e.clientY}px`;
          }
        }, 100);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
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
      name: 'Next.js', 
      icon: Layers, 
      description: 'Full-stack React framework for modern web apps', 
      level: 75
    },
    { 
      name: 'React + Vite', 
      icon: Code2, 
      description: 'Fast, reactive frontend projects with Vite bundler', 
      level: 70
    },
    { 
      name: 'Java', 
      icon: Terminal, 
      description: 'Backend development & Minecraft client/plugins', 
      level: 65
    },
    { 
      name: 'Python', 
      icon: Globe, 
      description: 'Scripting, automation, and small tools', 
      level: 60
    },
    { 
      name: 'C++', 
      icon: Gamepad2, 
      description: 'Low-level programming and game logic', 
      level: 55
    },
    { 
      name: 'Unity', 
      icon: Sparkles, 
      description: 'Game development', 
      level: 70
    }
  ];

  const projects = [
    {
      title: 'Custom Minecraft Client',
      description: 'Attempted to build a custom Minecraft client. Didn’t work out, but learned a ton.',
      tech: ['Java', 'Minecraft', 'Mods'],
      icon: Zap,
      featured: true,
      stats: { attempts: '3', success: '0%', lessons: 'Priceless' }
    },
    {
      title: 'Lost Discord Bot',
      description: 'Built a Discord bot with commands and automation, but sadly the code was lost. Still counts as experience!',
      tech: ['Node.js', 'Discord.js', 'MongoDB', 'JavaScript'],
      icon: BotIcon,
      featured: true,
      stats: { servers: '1+', commands: 'Few', status: 'Lost but remembered' }
    },
    {
      title: 'Horizons GP',
      description: 'My racing game made in Unity — fully playable and actually works! High-speed chaos guaranteed. I used MVC but still counts!',
      tech: ['Unity', 'C#', '3D', 'Physics'],
      icon: Gamepad2Icon,
      featured: true,
      stats: { tracks: '1', vehicles: '4+', fun: '100%' }
    },
    {
      title: 'Random Experiments',
      description: 'Random scripts, Linux tinkering, and half-baked ideas. Mostly just chaos.',
      tech: ['Linux', 'Bash', 'Chaos'],
      icon: BookOpen,
      featured: false,
      stats: { experiments: 'Too many', results: 'Mostly nothing', fun: '100%' }
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-dark relative overflow-hidden">
      {/* Subtle dot-grid background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-60 z-0"
        style={{
          backgroundImage: `url("${dotDataUrl}")`,
          backgroundSize: '20px 20px',
          backgroundRepeat: 'repeat'
        }}
      />
      {/* Soft aurora glows, faded at edges */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background:
            'radial-gradient(60% 40% at 80% 50%, rgba(124,58,237,0.25), transparent 70%), radial-gradient(40% 30% at 15% 25%, rgba(168,85,247,0.18), transparent 60%)',
          WebkitMaskImage:
            'radial-gradient(80% 65% at 50% 35%, black, transparent)',
          maskImage:
            'radial-gradient(80% 65% at 50% 35%, black, transparent)'
        }}
      />

      {/* Wrap content so it sits above the background */}
      <div className="relative z-10">
        <div 
          ref={cursorDotRef}
          className="cursor-dot fixed w-2 h-2 bg-purple-500 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
        />
        <div 
          ref={cursorOutlineRef}
          className="cursor-dot fixed w-8 h-8 border-2 border-purple-400/50 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2"
        />

        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-violet-600/15 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-float" />
        </div>

        <nav className="fixed top-0 w-full z-50 bg-black/40 backdrop-blur-xl border-b border-purple-900/30 shadow-purple">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center shadow-purple animate-glow overflow-hidden">
                  <img
                    src="/assets/pfp.jpg"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-1xl font-bold text-gradient">
                  <h4>Jehoshua</h4>
                </div>
              </div>
              <div className="hidden md:flex items-center space-x-8">
                {['home', 'about', 'skills', 'projects', 'certifications', 'blog', 'contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className={`capitalize text-sm font-medium transition-all duration-300 relative group ${ 
                      activeSection === item
                        ? 'text-purple-400'
                        : 'text-gray-400 hover:text-purple-300'
                    }`}
                  >
                    {item}
                    <span className={`absolute -bottom-2 left-0 w-full h-0.5 bg-purple-500 transform transition-transform duration-300 ${
                      activeSection === item ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section id="home" className="min-h-screen flex items-center pt-20 relative">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className={`transition-all duration-1000 ${isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-10'}`}>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600/20 rounded-full mb-8 shadow-purple">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span className="text-purple-300 text-sm font-medium">Full-Stack and Game Developer</span>
                </div>
                
                <h1 className="text-6xl font-bold mb-6">
                  <span className="text-gradient-alt block">Jehoshua</span>
                </h1>
                
                <div className="flex items-center gap-4 mb-8">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-purple-600 to-transparent" />
                  <p className="text-xl text-purple-300 font-light">15-year-old Developer</p>
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-purple-600 to-transparent" />
                </div>
                
                <p className="text-lg text-gray-300 mb-10 leading-relaxed">
                  Crafting digital experiences with passion and precision. 
                  Specialized in <span className="text-purple-400 font-semibold">Java development</span>, 
                  <span className="text-violet-400 font-semibold"> modern web technologies</span>, and 
                  <span className="text-purple-300 font-semibold"> innovative solutions</span>.
                </p>
                
                <div className="flex flex-wrap gap-4 mb-10">
                  <Button 
                    size="default" 
                    onClick={() => scrollToSection('projects')}
                    className="relative bg-gradient-to-b from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-purple hover:shadow-purple-lg transition-all duration-300 group"
                  >
                    <Briefcase className="mr-2 h-5 w-5" />
                    Explore Projects
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="default"
                    onClick={() => scrollToSection('contact')}
                    className="border-purple-600/50 text-purple-300 hover:bg-purple-600/10 hover:border-purple-500 shadow-card hover:shadow-purple transition-all duration-300"
                  >
                    <Send className="mr-2 h-5 w-5" />
                    Let's Connect
                  </Button>
                </div>
                
                <div className="flex gap-6">
                  <a href="https://github.com/JehoshuaM" target="_blank" rel="noopener noreferrer" 
                    className="p-3 bg-purple-600/10 rounded-xl text-gray-400 hover:text-purple-400 hover:bg-purple-600/20 transition-all duration-300 shadow-card hover:shadow-purple">
                    <Github className="h-6 w-6" />
                  </a>
                  <a href="https://www.linkedin.com/in/jehoshua-m/" target="_blank" rel="noopener noreferrer" 
                    className="p-3 bg-purple-600/10 rounded-xl text-gray-400 hover:text-purple-400 hover:bg-purple-600/20 transition-all duration-300 shadow-card hover:shadow-purple">
                    <Linkedin className="h-6 w-6" />
                  </a>
                  <a href="mailto:jehoshua.dev@gmail.com" 
                    className="p-3 bg-purple-600/10 rounded-xl text-gray-400 hover:text-purple-400 hover:bg-purple-600/20 transition-all duration-300 shadow-card hover:shadow-purple">
                    <Mail className="h-6 w-6" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-32 relative">
          <div className="absolute inset-0 bg-purple-gradient opacity-30" />
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-bold mb-4 text-gradient">About Me</h2>
              <p className="text-gray-400 text-lg">Passionate Developer • Creative Thinker • Problem Solver</p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Card className="bg-card-gradient border border-purple-900/30 shadow-card hover:shadow-card-hover transition-all duration-300">
                  <CardContent className="p-8">
                    <p className="text-lg text-gray-300 leading-relaxed mb-6">
                      At <span className="text-purple-400 font-semibold">15 years old</span>, I've already embarked on an exciting journey in the world of programming. 
                      My passion for technology started with <span className="text-violet-400 font-semibold">Minecraft plugin development</span>, 
                      which taught me the fundamentals of Java and software architecture.
                    </p>
                    <p className="text-lg text-gray-300 leading-relaxed">
                      Today, I work with <span className="text-purple-300 font-semibold">modern web technologies</span> and continue to expand my knowledge daily. 
                      I believe in creating solutions that are not just functional, but also beautiful and user-friendly.
                    </p>
                  </CardContent>
                </Card>
                
                <div className="flex flex-wrap gap-3">
                  <Badge className="bg-purple-600/20 text-purple-300 border border-purple-600/30 px-5 py-2 shadow-purple">
                    <Coffee className="w-4 h-4 mr-2" />
                    2+ Years Experience
                  </Badge>
                  <Badge className="bg-violet-600/20 text-violet-300 border border-violet-600/30 px-5 py-2 shadow-purple">
                    <Zap className="w-4 h-4 mr-2" />
                    Quick Learner
                  </Badge>
                  <Badge className="bg-purple-600/20 text-purple-300 border border-purple-600/30 px-5 py-2 shadow-purple">
                    <Rocket className="w-4 h-4 mr-2" />
                    Innovative
                  </Badge>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                {[
                  { label: 'Projects Completed', value: '4+', icon: Package },
                  { label: 'Technologies', value: '17+', icon: Layers },
                  { label: 'Years Coding', value: '2+', icon: Code2 },
                  { label: 'Age', value: '15', icon: Calendar }
                ].map((stat, index) => (
                  <Card key={stat.label} className="bg-card-gradient border border-purple-900/30 shadow-card hover:shadow-purple-lg hover-lift transition-all duration-300">
                    <CardContent className="p-6 text-center">
                      <stat.icon className="w-10 h-10 text-purple-400 mx-auto mb-4 animate-float" style={{ animationDelay: `${index * 0.2}s` }} />
                      <div className="text-3xl font-bold text-gradient mb-2">{stat.value}</div>
                      <div className="text-gray-400 text-sm">{stat.label}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-32 relative">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-bold mb-4 text-gradient">Technical Skills</h2>
              <p className="text-gray-400 text-lg">Technologies I work with daily</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills.map((skill, index) => (
                <Card
                  key={skill.name}
                  className="bg-card-gradient border border-purple-900/30 shadow-card hover:shadow-purple-lg hover-lift transition-all duration-300 group"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-purple-600/20 rounded-xl group-hover:bg-purple-600/30 transition-colors">
                        <skill.icon
                          className="h-6 w-6 text-purple-400 animate-float"
                          style={{ animationDelay: `${index * 0.1}s` }}
                        />
                      </div>
                      <span className="text-2xl font-bold text-purple-400">{skill.level}%</span>
                    </div>
                    <CardTitle className="text-xl text-white mb-2">{skill.name}</CardTitle>
                    <CardDescription className="text-gray-400">{skill.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="w-full bg-purple-900/20 rounded-full h-2 overflow-hidden shadow-inner">
                      <div
                        className="h-full bg-gradient-to-r from-purple-600 to-violet-600 rounded-full shadow-purple transition-all duration-1500 ease-out"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-32 relative">
          <div className="absolute inset-0 bg-purple-gradient opacity-30" />
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-bold mb-4 text-gradient">Featured Projects</h2>
              <p className="text-gray-400 text-lg">Some of my best work</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <Card 
                  key={project.title} 
                  className={`relative bg-card-gradient border border-purple-900/30 shadow-card hover:shadow-purple-lg hover-lift transition-all duration-300 overflow-hidden ${project.featured ? 'md:col-span-2 lg:col-span-1' : ''}`}
                >
                  <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-purple-500/10 to-transparent" />
                  
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-3 bg-purple-600/20 rounded-xl">
                        <project.icon className="h-8 w-8 text-purple-400" />
                      </div>
                      {project.featured && (
                        <Badge className="bg-gradient-to-r from-purple-600 to-violet-600 text-white shadow-purple">
                          Featured
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-2xl text-white mb-3">{project.title}</CardTitle>
                    <CardDescription className="text-gray-300 text-base">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((tech) => (
                        <Badge key={tech} variant="outline" className="border-purple-700 text-purple-300">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex justify-between text-center">
                      {Object.entries(project.stats).map(([key, value]) => (
                        <div key={key}>
                          <div className="text-xl font-bold text-purple-400">{value}</div>
                          <div className="text-xs text-gray-500 capitalize">{key}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Certifications Section */}
        <section id="certifications" className="py-32">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-bold mb-4 text-gradient">Certifications</h2>
              <p className="text-gray-400 text-lg">Professional achievements and recognition</p>
            </div>
            
            <Card className="bg-card-gradient border border-purple-900/30 shadow-purple-lg max-w-3xl mx-auto">
              <CardContent className="p-12 text-center">
                <div className="mb-8">
                  <Trophy className="w-24 h-24 text-purple-400 mx-auto animate-float glow" />
                </div>
                <h3 className="text-3xl font-bold text-gradient mb-4">Professional Achievements</h3>
                <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
                  Explore my verified certifications that demonstrate my commitment to continuous learning and excellence in software development.
                </p>
                <Link href="/certifications">
                  <Button size="default" className="relative bg-gradient-to-b from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-purple hover:shadow-purple-lg transition-all duration-300 group">
                    <Award className="mr-2 h-5 w-5" />
                    View All Certifications
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Blog Section */}
        <section id="blog" className="py-32 relative">
          <div className="absolute inset-0 bg-purple-gradient opacity-30" />
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-bold mb-4 text-gradient">Blog & Insights</h2>
              <p className="text-gray-400 text-lg">Sharing my journey and learnings</p>
            </div>
            
            <Card className="bg-card-gradient border border-purple-900/30 shadow-purple-lg max-w-3xl mx-auto">
              <CardContent className="p-12 text-center">
                <div className="mb-8">
                  <BookOpen className="w-24 h-24 text-purple-400 mx-auto animate-float glow" />
                </div>
                <h3 className="text-3xl font-bold text-gradient mb-4">Developer Stories</h3>
                <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
                  Dive into technical tutorials, project breakdowns, and insights from my development journey as a young programmer.
                </p>
                <Link href="/blog">
                  <Button size="default" className="relative bg-gradient-to-b from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-purple hover:shadow-purple-lg transition-all duration-300 group">
                    <FileCode className="mr-2 h-5 w-5" />
                    Read My Blog
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-32">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-bold mb-4 text-gradient">Get In Touch</h2>
              <p className="text-gray-400 text-lg">Let's create something amazing together</p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <Card className="bg-card-gradient border border-purple-900/30 shadow-purple-lg">
                <CardContent className="p-12">
                  <div className="grid md:grid-cols-3 gap-8 mb-12">
                    <a href="mailto:jehoshua.dev@gmail.com" className="group">
                      <Card className="bg-purple-600/10 border border-purple-900/30 shadow-card hover:shadow-purple-lg hover-lift transition-all duration-300">
                        <CardContent className="p-8 text-center">
                          <Mail className="h-12 w-12 text-purple-400 mx-auto mb-4 group-hover:animate-bounce" />
                          <h3 className="font-bold text-white mb-2">Email</h3>
                          <p className="text-sm text-gray-400">jehoshua.dev@gmail.com</p>
                        </CardContent>
                      </Card>
                    </a>
                    
                    <a href="https://github.com/JehoshuaM" target="_blank" rel="noopener noreferrer" className="group">
                      <Card className="bg-purple-600/10 border border-purple-900/30 shadow-card hover:shadow-purple-lg hover-lift transition-all duration-300">
                        <CardContent className="p-8 text-center">
                          <Github className="h-12 w-12 text-purple-400 mx-auto mb-4 group-hover:animate-bounce" />
                          <h3 className="font-bold text-white mb-2">GitHub</h3>
                          <p className="text-sm text-gray-400">JehoshuaM</p>
                        </CardContent>
                      </Card>
                    </a>
                    
                    <a href="https://www.linkedin.com/in/jehoshua-m/" target="_blank" rel="noopener noreferrer" className="group">
                      <Card className="bg-purple-600/10 border border-purple-900/30 shadow-card hover:shadow-purple-lg hover-lift transition-all duration-300">
                        <CardContent className="p-8 text-center">
                          <Linkedin className="h-12 w-12 text-purple-400 mx-auto mb-4 group-hover:animate-bounce" />
                          <h3 className="font-bold text-white mb-2">LinkedIn</h3>
                          <p className="text-sm text-gray-400">jehoshua-m</p>
                        </CardContent>
                      </Card>
                    </a>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-lg text-gray-300 mb-8">
                      Ready to discuss your next project? I'm always excited about new opportunities and collaborations.
                    </p>
                    <a href="/contact">
                      <Button size="default" className="relative bg-gradient-to-b from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-purple hover:shadow-purple-lg transition-all duration-300 group">
                        <Send className="mr-2 h-5 w-5" />
                        Start a Conversation
                        <Sparkles className="ml-2 h-5 w-5 group-hover:animate-spin" />
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 border-t border-purple-900/30 bg-black/40">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center">
              <div className="flex justify-center items-center gap-2 mb-6">
                <Star className="w-5 h-5 text-purple-400 animate-pulse" />
                <p className="text-gray-400">© 2025 Jehoshua. Built with passion and code ❤️.</p>
                <Star className="w-5 h-5 text-purple-400 animate-pulse" style={{ animationDelay: '0.5s' }} />
              </div>

              <div className="flex flex-wrap justify-center gap-6">
                {['home', 'about', 'skills', 'projects', 'certifications', 'blog', 'contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className={`relative group text-sm font-medium uppercase tracking-wide transition-all duration-300 ${
                      activeSection === item
                        ? 'text-purple-400'
                        : 'text-gray-400 hover:text-purple-300'
                    }`}
                  >
                    {item}
                    <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-gradient-to-r from-purple-400 to-violet-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                  </button>
                ))}
                <Link href={'/license'} className='relative group text-sm font-medium uppercase tracking-wide transition-all duration-300 text-gray-400 hover:text-purple-300'>
                  License
                  <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-gradient-to-r from-purple-400 to-violet-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </Link>
              </div>
            </div>
          </div>
        </footer>

        <style jsx>{`
          @keyframes slideIn {
            from {
              width: 0%;
            }
            to {
              width: var(--width);
            }
          }
        `}</style>
      </div>
    </div>
  );
}