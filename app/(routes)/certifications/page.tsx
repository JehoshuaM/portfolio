'use client';

import { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Award,
  Calendar,
  ExternalLink,
  Star,
  CheckCircle,
  Trophy,
  Medal,
  Zap,
  BookOpen,
  Code2,
  Globe,
  Gamepad2,
  FileText,
  Download
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  skills: string[];
  credentialId?: string;
  verificationUrl?: string;
  pdfPath?: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  category: 'Web Development' | 'Programming' | 'Game Development' | 'Database' | 'Cloud' | 'AI & Machine Learning' | 'Other';
  featured: boolean;
}

export default function CertificationsPage() {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    const certificationData: Certification[] = [
      {
        id: '4',
        title: 'Node.js Intermediate',
        issuer: 'HackerRank',
        date: '2024-07-18',
        description: 'Advanced Node.js concepts including middleware, authentication, database integration, and microservices architecture.',
        skills: ['Node.js', 'MongoDB', 'Authentication', 'Microservices', 'Advanced Express.js'],
        pdfPath: '/data/pdf/Hackerrank Node.js Intermidiate.pdf',
        level: 'Intermediate',
        category: 'Programming',
        featured: true
      },
      {
        id: '1',
        title: 'Java Programming',
        issuer: 'HackerRank',
        date: '2024-04-30',
        description: 'Demonstrated proficiency in Java programming including OOP concepts, data structures, algorithms, and system design.',
        skills: ['Java', 'OOP', 'Data Structures', 'Algorithms', 'System Design'],
        pdfPath: '/data/pdf/Hackerrank Java.pdf',
        level: 'Intermediate',
        category: 'Programming',
        featured: true
      },
      {
        id: '2',
        title: 'JavaScript',
        issuer: 'HackerRank',
        date: '2024-03-02',
        description: 'Advanced JavaScript skills including ES6+, asynchronous programming, promises, and modern JavaScript development.',
        skills: ['JavaScript', 'ES6+', 'Async Programming', 'Promises', 'DOM Manipulation'],
        pdfPath: '/data/pdf/Hackerrank JavaScript.pdf',
        level: 'Intermediate',
        category: 'Web Development',
        featured: true
      },
      {
        id: '5',
        title: 'Cybersecurity Essentials',
        issuer: 'Cisco',
        date: '2024-01-15',
        description: 'Comprehensive understanding of cybersecurity fundamentals, network security, threat detection, and security best practices.',
        skills: ['Network Security', 'Threat Detection', 'Cryptography', 'Security Protocols', 'Risk Management'],
        pdfPath: '/data/pdf/Cisco Cybersecurity.pdf',
        level: 'Intermediate',
        category: 'Other',
        featured: true
      },
      {
        id: '13',
        title: 'AI Literacy',
        issuer: 'IBM',
        date: '2024-03-15',
        description: 'Foundational understanding of AI concepts, ethics, applications, and impact on various industries.',
        skills: ['AI Concepts', 'AI Ethics', 'Machine Learning Basics', 'AI Applications', 'Industry Impact'],
        pdfPath: '/data/pdf/IBM AI Literacy.pdf',
        level: 'Beginner',
        category: 'AI & Machine Learning',
        featured: true
      },
      {
        id: '14',
        title: 'Getting Started with AI',
        issuer: 'IBM',
        date: '2024-03-20',
        description: 'Practical introduction to AI tools, platforms, and development of AI-powered applications.',
        skills: ['AI Tools', 'IBM Watson', 'AI Development', 'Practical AI', 'AI Platforms'],
        pdfPath: '/data/pdf/IBM GS with AI.pdf',
        level: 'Beginner',
        category: 'AI & Machine Learning',
        featured: true
      },

      {
        id: '12',
        title: 'Cloud Services',
        issuer: 'Great Learning',
        date: '2024-01-05',
        description: 'Comprehensive understanding of cloud computing services, deployment models, and cloud architecture patterns.',
        skills: ['Cloud Computing', 'AWS', 'Azure', 'Cloud Architecture', 'DevOps'],
        pdfPath: '/data/pdf/GreatLearning CloudService.pdf',
        level: 'Intermediate',
        category: 'Cloud',
        featured: false
      },
      {
        id: '8',
        title: 'Python Programming',
        issuer: 'Coursera',
        date: '2023-08-15',
        description: 'Comprehensive Python programming skills including data structures, algorithms, libraries, and web development with Python.',
        skills: ['Python', 'Data Structures', 'Algorithms', 'Libraries', 'Web Development'],
        pdfPath: '/data/pdf/Coursera Python.pdf',
        level: 'Intermediate',
        category: 'Programming',
        featured: false
      },
      {
        id: '6',
        title: 'AWS S3 Cloud Storage',
        issuer: 'Coursera',
        date: '2023-11-20',
        description: 'Mastery of AWS S3 services including bucket management, security, versioning, lifecycle policies, and integration.',
        skills: ['AWS S3', 'Cloud Storage', 'Bucket Management', 'Security', 'Data Management'],
        pdfPath: '/data/pdf/Coursera AWS_S3.pdf',
        level: 'Intermediate',
        category: 'Cloud',
        featured: false
      },
      {
        id: '9',
        title: 'Artificial Intelligence Fundamentals',
        issuer: 'Great Learning',
        date: '2024-02-28',
        description: 'Introduction to AI concepts including machine learning, neural networks, NLP, and practical AI applications.',
        skills: ['Machine Learning', 'Neural Networks', 'NLP', 'Deep Learning', 'AI Applications'],
        pdfPath: '/data/pdf/GreatLearning AI.pdf',
        level: 'Beginner',
        category: 'AI & Machine Learning',
        featured: false
      },
      {
        id: '3',
        title: 'Node.js Basic',
        issuer: 'HackerRank',
        date: '2024-06-26',
        description: 'Foundational Node.js skills including server-side JavaScript, NPM, Express.js basics, and REST API development.',
        skills: ['Node.js', 'Express.js', 'NPM', 'REST APIs', 'Backend Development'],
        pdfPath: '/data/pdf/Hackerrank Node.js Basic.pdf',
        level: 'Beginner',
        category: 'Programming',
        featured: false
      },
      {
        id: '10',
        title: 'Arduino & Raspberry Pi',
        issuer: 'Great Learning',
        date: '2023-12-10',
        description: 'Hands-on experience with Arduino and Raspberry Pi for IoT projects, embedded systems, and hardware programming.',
        skills: ['Arduino', 'Raspberry Pi', 'IoT', 'Embedded Systems', 'Hardware Programming'],
        pdfPath: '/data/pdf/GreatLearning ArduinoRasberry.pdf',
        level: 'Intermediate',
        category: 'Other',
        featured: false
      },
      {
        id: '11',
        title: 'C Programming',
        issuer: 'Great Learning',
        date: '2023-07-20',
        description: 'Strong foundation in C programming including pointers, memory management, data structures, and system programming.',
        skills: ['C Programming', 'Pointers', 'Memory Management', 'Data Structures', 'System Programming'],
        pdfPath: '/data/pdf/GreatLearning C.pdf',
        level: 'Intermediate',
        category: 'Programming',
        featured: false
      },
      {
        id: '7',
        title: 'Customer Relationship Management',
        issuer: 'Coursera',
        date: '2023-09-10',
        description: 'Understanding of CRM systems, customer analytics, sales automation, and customer service strategies.',
        skills: ['CRM Systems', 'Customer Analytics', 'Sales Automation', 'Data Analysis', 'Business Strategy'],
        pdfPath: '/data/pdf/Coursera CRM.pdf',
        level: 'Beginner',
        category: 'Other',
        featured: false
      }
    ];

    setCertifications(certificationData);
  }, []);

  const categories = ['All', 'Programming', 'Web Development', 'Cloud', 'AI & Machine Learning', 'Other'];

  const filteredCertifications = selectedCategory === 'All'
    ? certifications
    : certifications.filter(cert => cert.category === selectedCategory);

  const featuredCertifications = certifications.filter(cert => cert.featured);

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'from-purple-800 to-violet-900';
      case 'Intermediate': return 'from-purple-600 to-violet-700';
      case 'Advanced': return 'from-purple-500 to-violet-600';
      case 'Expert': return 'from-purple-400 to-violet-500';
      default: return 'from-purple-900 to-black';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Web Development': return Globe;
      case 'Programming': return Code2;
      case 'Game Development': return Gamepad2;
      case 'Database': return BookOpen;
      case 'Cloud': return Zap;
      case 'AI & Machine Learning': return Zap;
      default: return Award;
    }
  };

  const handleViewPDF = (pdfPath: string) => {
    window.open(pdfPath, '_blank');
  };

  const handleDownloadPDF = (pdfPath: string, title: string) => {
    const link = document.createElement('a');
    link.href = pdfPath;
    link.download = `${title.replace(/\s+/g, '_')}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gradient-dark relative overflow-hidden">
      { }
      <div className="absolute inset-0 pointer-events-none opacity-60 z-0" style={{ backgroundImage: `url("data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Ccircle cx='1' cy='1' r='1' fill='%23a855f7' fill-opacity='0.32'/%3E%3C/svg%3E")`, backgroundSize: '20px 20px', backgroundRepeat: 'repeat' }} />
      <div className="absolute inset-0 pointer-events-none z-0" style={{ background: 'radial-gradient(60% 40% at 80% 50%, rgba(124,58,237,0.25), transparent 70%), radial-gradient(40% 30% at 15% 25%, rgba(168,85,247,0.18), transparent 60%)', WebkitMaskImage: 'radial-gradient(80% 65% at 50% 35%, black, transparent)', maskImage: 'radial-gradient(80% 65% at 50% 35%, black, transparent)' }} />
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-violet-600/15 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-float" />
      </div>

      { }
      <header className="relative z-10 bg-gradient-to-r from-black/20 via-purple-900/20 to-black/20 backdrop-blur-xl border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link href="/" className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors">
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Portfolio</span>
              </Link>
              <div className="flex items-center gap-3">
                <Trophy className="w-8 h-8 text-purple-400 glow" />
                <h1 className="text-3xl font-bold text-gradient">Certifications</h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      { }
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        { }
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          <div className="flex justify-center items-center gap-4 mb-6">
            <Medal className="w-16 h-16 text-purple-400 animate-float glow" />
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gradient glow">Certifications</h2>
          <p className="text-xl text-purple-200/80 max-w-3xl mx-auto leading-relaxed">
            Verified certifications earned through <span className="text-purple-400 font-semibold">dedicated study</span> and
            <span className="text-violet-400 font-semibold"> professional development</span> across the tech world.
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-purple-500 via-black to-violet-500 mx-auto mt-8 animate-gradient"></div>
        </div>

        { }
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          <Card className="bg-gradient-to-br from-black/60 via-purple-900/40 to-violet-800/30 backdrop-blur-xl border border-purple-500/30 hover-lift">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-gradient mb-2">{certifications.length}</div>
              <div className="text-purple-200 text-sm">Total Certifications</div>
              <Award className="w-6 h-6 text-purple-400 mx-auto mt-2" />
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-black/60 via-purple-900/40 to-violet-800/30 backdrop-blur-xl border border-purple-500/30 hover-lift">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-gradient mb-2">{featuredCertifications.length}</div>
              <div className="text-purple-200 text-sm">Featured achievements</div>
              <Star className="w-6 h-6 text-purple-400 mx-auto mt-2" />
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-black/60 via-purple-900/40 to-violet-800/30 backdrop-blur-xl border border-purple-500/30 hover-lift">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-gradient mb-2">{categories.length - 1}</div>
              <div className="text-purple-200 text-sm">Skill Categories</div>
              <Trophy className="w-6 h-6 text-purple-400 mx-auto mt-2" />
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-black/60 via-purple-900/40 to-violet-800/30 backdrop-blur-xl border border-purple-500/30 hover-lift">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-gradient mb-2">2025</div>
              <div className="text-purple-200 text-sm">Latest Achievement</div>
              <CheckCircle className="w-6 h-6 text-purple-400 mx-auto mt-2" />
            </CardContent>
          </Card>
        </div>

        { }
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={`${selectedCategory === category
                ? 'bg-gradient-to-r from-purple-600 to-violet-600 text-white'
                : 'border-purple-500/50 text-purple-300 hover:bg-purple-500/10'
                } transition-all duration-300`}
            >
              {category}
            </Button>
          ))}
        </div>

        { }
        {selectedCategory === 'All' && (
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-gradient mb-8 text-center">Featured Achievements</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredCertifications.map((cert) => {
                const IconComponent = getCategoryIcon(cert.category);
                return (
                  <Card key={cert.id} className="group hover-lift bg-gradient-to-br from-black/60 via-purple-900/40 to-violet-800/30 backdrop-blur-xl border border-purple-500/30 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer"></div>
                    <CardHeader className="relative z-10">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <div className={`p-3 rounded-xl bg-gradient-to-r ${getLevelColor(cert.level)} group-hover:scale-110 transition-all duration-300 glow`}>
                              <IconComponent className="h-6 w-6 text-white" />
                            </div>
                            <Badge className="bg-gradient-to-r from-black to-purple-600 text-white px-3 py-1 text-xs font-bold animate-pulse border border-purple-500/30">
                              <Star className="w-3 h-3 mr-1" />
                              Featured
                            </Badge>
                          </div>
                          <CardTitle className="text-xl text-gradient group-hover:glow transition-all mb-2">
                            {cert.title}
                          </CardTitle>
                          <div className="text-sm text-purple-300 mb-2">{cert.issuer}</div>
                          <div className="flex items-center gap-2 text-xs text-purple-400">
                            <Calendar className="w-3 h-3" />
                            {new Date(cert.date).toLocaleDateString()}
                          </div>
                        </div>
                        {cert.pdfPath && (
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="shrink-0 hover:bg-gradient-to-r hover:from-black/20 hover:to-purple-500/20"
                              onClick={() => handleViewPDF(cert.pdfPath!)}
                              title="View Certificate"
                            >
                              <FileText className="h-4 w-4 text-purple-400" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="shrink-0 hover:bg-gradient-to-r hover:from-black/20 hover:to-purple-500/20"
                              onClick={() => handleDownloadPDF(cert.pdfPath!, cert.title)}
                              title="Download Certificate"
                            >
                              <Download className="h-4 w-4 text-purple-400" />
                            </Button>
                          </div>
                        )}
                      </div>
                      <Badge className={`bg-gradient-to-r ${getLevelColor(cert.level)} text-white px-3 py-1 text-xs font-semibold w-fit`}>
                        {cert.level}
                      </Badge>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        { }
        <div>
          <h3 className="text-3xl font-bold text-gradient mb-8 text-center">
            {selectedCategory === 'All' ? 'All Certifications' : `${selectedCategory} Certifications`}
          </h3>
          <div className="grid gap-8">
            {filteredCertifications.map((cert) => {
              const IconComponent = getCategoryIcon(cert.category);
              return (
                <Card key={cert.id} className="group hover-lift bg-gradient-to-br from-black/60 via-purple-900/40 to-violet-800/30 backdrop-blur-xl border border-purple-500/30 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer"></div>
                  <CardHeader className="relative z-10">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-4">
                          <div className={`p-4 rounded-xl bg-gradient-to-r ${getLevelColor(cert.level)} group-hover:scale-110 transition-all duration-300 glow`}>
                            <IconComponent className="h-8 w-8 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <CardTitle className="text-2xl text-gradient group-hover:glow transition-all">
                                {cert.title}
                              </CardTitle>
                              {cert.featured && (
                                <Badge className="bg-gradient-to-r from-black to-purple-600 text-white px-3 py-1 text-xs font-bold animate-pulse border border-purple-500/30">
                                  <Star className="w-3 h-3 mr-1" />
                                  Featured
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-4 text-sm text-purple-300 mb-3">
                              <span className="font-semibold">{cert.issuer}</span>
                              <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {new Date(cert.date).toLocaleDateString()}
                              </div>
                              {cert.credentialId && (
                                <span className="text-purple-400">ID: {cert.credentialId}</span>
                              )}
                            </div>
                            <div className="flex items-center gap-3">
                              <Badge className={`bg-gradient-to-r ${getLevelColor(cert.level)} text-white px-3 py-1 text-sm font-semibold`}>
                                {cert.level}
                              </Badge>
                              <Badge className="bg-gradient-to-r from-black/50 to-purple-800/50 text-purple-200 border border-purple-500/30 px-3 py-1 text-sm">
                                {cert.category}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                      {cert.pdfPath && (
                        <div className="flex flex-col gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="shrink-0 hover:bg-gradient-to-r hover:from-black/20 hover:to-purple-500/20 hover:scale-110 transition-all"
                            onClick={() => handleViewPDF(cert.pdfPath!)}
                            title="View Certificate"
                          >
                            <FileText className="h-5 w-5 text-purple-400" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="shrink-0 hover:bg-gradient-to-r hover:from-black/20 hover:to-purple-500/20 hover:scale-110 transition-all"
                            onClick={() => handleDownloadPDF(cert.pdfPath!, cert.title)}
                            title="Download Certificate"
                          >
                            <Download className="h-5 w-5 text-purple-400" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <CardDescription className="text-base leading-relaxed text-purple-100/80 mb-6">
                      {cert.description}
                    </CardDescription>
                    <div className="flex flex-wrap gap-2">
                      {cert.skills.map((skill) => (
                        <Badge key={skill} className="bg-gradient-to-r from-black/50 to-purple-800/50 text-purple-200 border border-purple-500/30 hover:bg-gradient-to-r hover:from-purple-700/50 hover:to-black/50 transition-colors text-xs px-3 py-1">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {filteredCertifications.length === 0 && (
          <div className="text-center py-20">
            <Award className="w-24 h-24 text-purple-400/50 mx-auto mb-8 animate-float" />
            <h3 className="text-3xl font-bold text-gradient mb-4">No certifications yet</h3>
            <p className="text-xl text-purple-200/80">
              No certifications found in the "{selectedCategory}" category.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
