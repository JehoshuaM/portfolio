'use client';

import { useState, useEffect } from 'react';
import {
  Github,
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
  Layers,
  Package,
  Calendar,
  Code
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const Wireframe3D = dynamic(() => import('@/components/Wireframe3D').then((mod) => mod.Wireframe3D), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-purple-600/5 animate-pulse rounded-full blur-3xl" />
});

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('home');
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'experience', 'skills', 'projects', 'certifications', 'blog', 'contact'];
      const scrollPosition = window.scrollY + 100;

      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / (totalHeight || 1)) * 100;
      setScrollProgress(progress);

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
      description: 'Building full-stack apps that work',
      level: 75
    },
    {
      name: 'React + Vite',
      icon: Code2,
      description: 'Creating fast and responsive UIs with Vite',
      level: 70
    },
    {
      name: 'Java',
      icon: Terminal,
      description: 'Backend systems and Minecraft plugin development',
      level: 65
    },
    {
      name: 'Python',
      icon: Globe,
      description: 'Python scripts to automate my life',
      level: 60
    }
  ];

  const projects = [
    {
      title: 'Hit Desync HUD',
      description: 'A client-side Fabric mod providing real-time feedback on hit registration. Identifies server-side desync and lag during PvP with a fully customizable HUD editor.',
      tech: ['Java', 'Fabric API'],
      icon: Code,
      featured: true,
      repo: 'https://github.com/fabledruns/hitdesynchud',
      stats: { feedback: 'Real-time', architecture: 'Client-side', version: '1.21.x' }
    }
  ];

  const experiences = [
    {
      company: 'Scythe Client',
      role: 'Developer',
      duration: '2025 - Present',
      link: 'https://scytheclient.com',
      description: 'Developed the official website and contributed to the client GUI. Built a custom rank management system and admin panel using Next.js, Clerk for authentication, and Inngest for background processing.',
      skills: ['Next.js', 'Inngest', 'Clerk', 'MongoDB', 'Java']
    },
    {
      company: 'XylonFFA',
      role: 'Developer',
      duration: '2026 - Present',
      link: 'https://xylon.gg',
      description: 'Designed and developed the official website for XylonFFA, establishing the online platform for the server.',
      skills: ['Next.js', 'React', 'Tailwind CSS']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-dark relative overflow-hidden selection:bg-purple-500/30">
      <div className="noise" />


      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-purple-600 via-violet-500 to-fuchsia-500 z-[100] transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      />



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


      <div className="relative z-10">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-violet-600/15 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-float" />
        </div>

        <div className="absolute top-0 left-0 w-full h-[850px] pointer-events-none z-0 overflow-hidden select-none">
          <div className="w-full h-[850px] -translate-y-[10%] opacity-40">
            <Wireframe3D />
          </div>
        </div>

        <nav className="fixed top-0 w-full z-50 glass border-b border-purple-500/10">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-600/20 rounded-lg">
                  <Terminal className="w-5 h-5 text-purple-400" />
                </div>
                <div className="text-1xl font-bold tracking-tighter text-gradient-alt">
                  <h4>FabledRuns</h4>
                </div>
              </div>
              <div className="hidden md:flex items-center space-x-8">
                {['home', 'about', 'experience', 'skills', 'projects', 'certifications', 'blog', 'contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className={`capitalize text-sm font-medium transition-all duration-300 relative group ${activeSection === item
                      ? 'text-purple-400'
                      : 'text-gray-400 hover:text-purple-300'
                      }`}
                  >
                    {item}
                    <span className={`absolute -bottom-2 left-0 w-full h-0.5 bg-purple-500 transform transition-transform duration-300 ${activeSection === item ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </nav>

        <section id="home" className="min-h-screen flex items-center pt-20 relative overflow-hidden bg-gradient-to-b from-transparent to-purple-900/20">
          <div className="max-w-8xl mx-auto px-6 ml-20 lg:px-8 w-full relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className={`transition-all duration-1000 ${isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-10'}`}>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-600/10 border border-purple-500/20 rounded-full mb-8">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                  <span className="text-purple-300 text-xs font-bold uppercase">Available for work</span>
                </div>

                <h1 className="text-3xl font-bold mb-6">
                  <span className="text-gradient-alt tracking-tight font-[family-name:var(--font-minecraft)]">FabledRuns</span>
                </h1>

                <p className="text-xl text-gray-400 mb-10 leading-relaxed max-w-xl">
                  A 15-year-old <span className="text-white border-b border-purple-500/50">developer</span> making good projects and cool websites through <span className="text-purple-400 font-bold">code</span>.
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
              </div>

              <div className="hidden lg:block relative h-[600px]">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
                  <div className="absolute top-10 right-10 w-48 h-48 bg-purple-600/20 rounded-full blur-[100px] animate-pulse" />
                  <div className="absolute bottom-10 left-10 w-64 h-64 bg-violet-600/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
                </div>
              </div>
            </div>
          </div>
        </section>


        <section id="about" className="py-32 relative">
          <div className="absolute inset-0 bg-purple-gradient opacity-30" />
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-bold mb-4 text-gradient">About Me</h2>
              <p className="text-gray-400 text-lg">A developer passionate about building things that work</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Card className="bg-card-gradient border border-purple-900/30 shadow-card hover:shadow-card-hover transition-all duration-300">
                  <CardContent className="p-8">
                    <p className="text-lg text-gray-300 leading-relaxed mb-6">
                      I'm <span className="text-purple-400 font-semibold">15</span> and have been coding for several years.
                      I started with <span className="text-violet-400 font-semibold">Minecraft plugin development</span>,
                      which gave me a strong foundation in Java.
                    </p>
                    <p className="text-lg text-gray-300 leading-relaxed">
                      Now I build <span className="text-purple-300 font-semibold">web applications</span> and explore new technologies.
                      I enjoy creating clean, functional systems.
                    </p>
                  </CardContent>
                </Card>

                <div className="flex flex-wrap gap-3">
                  <Badge className="bg-purple-600/20 text-purple-300 border border-purple-600/30 px-5 py-2 shadow-purple">
                    <Coffee className="w-4 h-4 mr-2" />
                    Coding for 2+ yrs
                  </Badge>
                  <Badge className="bg-violet-600/20 text-violet-300 border border-violet-600/30 px-5 py-2 shadow-purple">
                    <Zap className="w-4 h-4 mr-2" />
                    Learn Fast
                  </Badge>
                  <Badge className="bg-purple-600/20 text-purple-300 border border-purple-600/30 px-5 py-2 shadow-purple">
                    <Rocket className="w-4 h-4 mr-2" />
                    Creative
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
                  <Card key={stat.label} className="bg-card-gradient border border-purple-900/30 shadow-card hover:shadow-purple-lg hover-lift transition-all duration-300 border-glow">
                    <CardContent className="p-6 text-center">
                      <stat.icon className="w-8 h-8 text-purple-400 mx-auto mb-4" />
                      <div className="text-3xl font-bold text-gradient mb-2">{stat.value}</div>
                      <div className="text-gray-400 text-[10px] uppercase tracking-widest font-bold">{stat.label}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>


        <section id="experience" className="py-32 relative">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-bold mb-4 text-gradient">Experience</h2>
              <p className="text-gray-400 text-lg">Where I've contributed</p>
            </div>

            <div className="max-w-4xl mx-auto relative">
              <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500/50 via-purple-500/20 to-transparent transform -translate-x-1/2 hidden md:block" />

              <div className="space-y-12">
                {experiences.map((exp, index) => (
                  <div key={exp.company} className={`relative flex flex-col md:flex-row gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                    <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-purple-600 rounded-full border-4 border-black transform -translate-x-1/2 mt-8 z-10 hidden md:block" />

                    <div className="w-full md:w-1/2">
                      <Card className="bg-card-gradient border border-purple-900/30 shadow-card hover:shadow-card-hover transition-all duration-300 border-glow group">
                        <CardContent className="p-8">
                          <div className="flex flex-col mb-4">
                            <Badge className="bg-purple-600/20 text-purple-300 border border-purple-600/30 px-3 py-1 mt-2 md:mt-0 w-fit mb-4">
                              {exp.duration}
                            </Badge>
                            <h3 className="text-2xl font-bold text-white mb-1">{exp.role}</h3>
                            <a href={exp.link} target="_blank" rel="noopener noreferrer" className="text-purple-400 font-semibold hover:underline flex items-center gap-1">
                              {exp.company}
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          </div>
                          <p className="text-gray-300 leading-relaxed mb-6">
                            {exp.description}
                          </p>
                          <div className="flex flex-wrap gap-2 text-xs">
                            {exp.skills.map((skill) => (
                              <Badge key={skill} variant="secondary" className="bg-purple-600/10 text-purple-300 border-purple-600/20">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    <div className="hidden md:block md:w-1/2" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="py-32 relative">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-bold mb-4 text-gradient-alt">Technical Skills</h2>
              <p className="text-gray-400 text-sm tracking-[0.2em] font-bold uppercase">Technologies I use</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills.map((skill, index) => (
                <Card
                  key={skill.name}
                  className="bg-card-gradient border border-white/5 shadow-2xl hover-lift transition-all duration-300 group border-glow"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-purple-600/20 rounded-xl group-hover:bg-purple-600/30 transition-colors">
                        <skill.icon
                          className="h-6 w-6 text-purple-400"
                        />
                      </div>
                    </div>
                    <CardTitle className="text-xl text-white mb-2">{skill.name}</CardTitle>
                    <CardDescription className="text-gray-400">{skill.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>


        <section id="projects" className="py-32 relative">
          <div className="absolute inset-0 bg-purple-gradient opacity-30" />
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-bold mb-4 text-gradient-alt">Projects</h2>
              <p className="text-gray-400 text-sm tracking-[0.2em] font-bold uppercase">Selected works and experiments</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <Card
                  key={project.title}
                  className={`relative bg-card-gradient border border-purple-900/30 shadow-card hover:shadow-purple-lg hover-lift transition-all duration-500 overflow-hidden border-glow ${project.featured ? 'md:col-span-2 lg:col-span-1' : ''}`}
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
                    <CardDescription className="text-gray-300 text-base mb-4">
                      {project.description}
                    </CardDescription>
                    {project.repo && (
                      <a href={project.repo} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" size="sm" className="border-purple-600/50 text-purple-300 hover:bg-purple-600/10 hover:border-purple-500 transition-all duration-300">
                          <Github className="mr-2 h-4 w-4" />
                          View Repository
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </Button>
                      </a>
                    )}
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


        <section id="certifications" className="py-32">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-bold mb-4 text-gradient-alt">Certifications</h2>
              <p className="text-gray-400 text-sm tracking-[0.2em] font-bold uppercase">Professional verification of my skills</p>
            </div>

            <Card className="bg-card-gradient border border-purple-900/30 shadow-purple-lg max-w-3xl mx-auto border-glow">
              <CardContent className="p-12 text-center">
                <div className="mb-8">
                  <Trophy className="w-24 h-24 text-purple-400 mx-auto glow" />
                </div>
                <h3 className="text-3xl font-bold text-gradient mb-4">Certifications</h3>
                <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
                  Verified certifications earned through dedicated study and testing.
                </p>
                <Link href="/certifications">
                  <Button size="default" className="relative bg-gradient-to-b from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-purple hover:shadow-purple-lg transition-all duration-300 group">
                    <Award className="mr-2 h-5 w-5" />
                    View Certifications
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </section>


        <section id="blog" className="py-32 relative">
          <div className="absolute inset-0 bg-purple-gradient opacity-30" />
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-bold mb-4 text-gradient-alt">Blog</h2>
              <p className="text-gray-400 text-sm tracking-[0.2em] font-bold uppercase">Insights and development updates</p>
            </div>

            <Card className="bg-card-gradient border border-purple-900/30 shadow-purple-lg max-w-3xl mx-auto border-glow">
              <CardContent className="p-12 text-center">
                <div className="mb-8">
                  <BookOpen className="w-24 h-24 text-purple-400 mx-auto glow" />
                </div>
                <h3 className="text-3xl font-bold text-gradient mb-4">Development Blog</h3>
                <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
                  I write about technical challenges, project updates, and development insights.
                </p>
                <Link href="/blog">
                  <Button size="default" className="relative bg-gradient-to-b from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-purple hover:shadow-purple-lg transition-all duration-300 group">
                    <FileCode className="mr-2 h-5 w-5" />
                    Read Blog
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </section>


        <section id="contact" className="py-32">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-bold mb-4 text-gradient-alt">Contact</h2>
              <p className="text-gray-400 text-sm tracking-[0.2em] font-bold uppercase">Let's work together</p>
            </div>

            <div className="max-w-4xl mx-auto">
              <Card className="bg-card-gradient border border-purple-900/30 shadow-purple-lg">
                <CardContent className="p-12">
                  <div className="grid md:grid-cols-2 gap-8 mb-12">
                    <a href="mailto:jehoshua.dev@gmail.com" className="group">
                      <Card className="bg-purple-600/10 border border-purple-900/30 shadow-card hover:shadow-purple-lg transition-all duration-300">
                        <CardContent className="p-8 text-center">
                          <Mail className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                          <h3 className="font-bold text-white mb-2">Email</h3>
                          <p className="text-sm text-gray-400 font-medium">jehoshua.dev@gmail.com</p>
                        </CardContent>
                      </Card>
                    </a>

                    <a href="https://github.com/FabledRuns" target="_blank" rel="noopener noreferrer" className="group">
                      <Card className="bg-purple-600/10 border border-purple-900/30 shadow-card hover:shadow-purple-lg transition-all duration-300">
                        <CardContent className="p-8 text-center">
                          <Github className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                          <h3 className="font-bold text-white mb-2">GitHub</h3>
                          <p className="text-sm text-gray-400 font-medium">FabledRuns</p>
                        </CardContent>
                      </Card>
                    </a>


                  </div>

                  <div className="text-center">
                    <p className="text-lg text-gray-300 mb-8">
                      Interested in working together or have a question? I'd love to hear from you.
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


        <footer className="py-12 border-t border-purple-900/30 bg-black/40">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center">
              <div className="flex justify-center items-center gap-2 mb-6">
                <Star className="w-5 h-5 text-purple-400 animate-pulse" />
                <p className="text-gray-400">© 2025 FabledRuns. Built with passion and code ❤️.</p>
                <Star className="w-5 h-5 text-purple-400 animate-pulse" style={{ animationDelay: '0.5s' }} />
              </div>

              <div className="flex flex-wrap justify-center gap-6">
                {['home', 'about', 'experience', 'skills', 'projects', 'certifications', 'blog', 'contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className={`relative group text-sm font-medium uppercase tracking-wide transition-all duration-300 ${activeSection === item
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