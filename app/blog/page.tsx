'use client';

import { useState, useEffect } from 'react';
import { 
    ArrowLeft, 
    Plus, 
    Edit, 
    Trash2, 
    Calendar, 
    Lock,
    BookOpen,
    Save,
    X,
    Search,
    Filter,
    Clock,
    Tag,
} from 'lucide-react';
import { useSearchParams } from 'next/navigation'; // Import useSearchParams for Next.js 13+ App Router
import ReactMarkdown from 'react-markdown'; // For rendering Markdown content
import remarkGfm from 'remark-gfm'; // For GitHub Flavored Markdown

// Mock components if not running in a Next.js environment with shadcn/ui
// In a real Next.js project with shadcn/ui, these imports would be correct.
// import { Button } from '@/components/ui/button'; 
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
import React, { ReactNode, MouseEventHandler } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className = '',
  variant = 'default',
  size = 'md',
  disabled = false,
}) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-md transition-all duration-200 ${className} 
      ${variant === 'default' ? 'bg-blue-600 text-white hover:bg-blue-700' : ''}
      ${variant === 'outline' ? 'border border-gray-400 text-gray-300 hover:bg-gray-700' : ''}
      ${variant === 'ghost' ? 'text-gray-300 hover:bg-gray-700' : ''}
      ${size === 'sm' ? 'text-sm px-3 py-1.5' : ''}
      ${size === 'lg' ? 'text-lg px-6 py-3' : ''}
      ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    `}
    disabled={disabled}
  >
    {children}
  </button>
);

// Shared props interface for other components
interface WithChildren {
  children: ReactNode;
  className?: string;
}

const Card: React.FC<WithChildren> = ({ children, className = '' }) => (
  <div className={`rounded-lg shadow-lg ${className}`}>{children}</div>
);

const CardHeader: React.FC<WithChildren> = ({ children, className = '' }) => (
  <div className={`p-6 border-b border-gray-700 ${className}`}>{children}</div>
);

const CardTitle: React.FC<WithChildren> = ({ children, className = '' }) => (
  <h3 className={`text-xl font-semibold text-white ${className}`}>{children}</h3>
);

const CardDescription: React.FC<WithChildren> = ({ children, className = '' }) => (
  <p className={`text-sm text-gray-400 ${className}`}>{children}</p>
);

const CardContent: React.FC<WithChildren> = ({ children, className = '' }) => (
  <div className={`p-6 ${className}`}>{children}</div>
);

const Badge: React.FC<WithChildren> = ({ children, className = '' }) => (
  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-700 text-gray-200 ${className}`}>
    {children}
  </span>
);


import Link from 'next/link'; // Keep Next.js Link for navigation
const rawBlogs: Partial<BlogPost>[] = require('@/data/blogs.json');

interface BlogPost {
    id: string;
    title: string;
    content: string;
    excerpt: string;
    date: string;
    tags: string[];
    published: boolean;
    readTime: number;
    views: number;
    likes: number;
    category: string;
}

export default function BlogPage() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [authError, setAuthError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedTag, setSelectedTag] = useState('All');
    const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
    const [postToDelete, setPostToDelete] = useState<string | null>(null);
    
    // Form states
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState('');
    const [category, setCategory] = useState('');

    const categories = ['All', 'Web Development', 'Programming', 'Tutorials', 'Personal', 'Tech News', 'Projects'];

    // Get URL search parameters
    const searchParams = useSearchParams();
    const postId = searchParams.get('id'); // This will be the ID if present in /blog?id=<some_id>

    const blogs: BlogPost[] = rawBlogs.map((post) => ({
        id: post.id!,
        title: post.title!,
        content: post.content!,
        excerpt: post.excerpt!,
        date: post.date!,
        tags: post.tags ?? [],
        published: post.published ?? true,
        readTime: post.readTime ?? 1,
        views: post.views ?? 0,
        likes: post.likes ?? 0,
        category: post.category ?? 'Uncategorized'
    }));

    useEffect(() => {
        // Load posts from localStorage
        const savedPosts = localStorage.getItem('blog-posts');
        if (savedPosts) {
            setPosts(JSON.parse(savedPosts));
        } else {
            // If no saved posts, initialize from blogs.json and save to localStorage
            setPosts(blogs);
            localStorage.setItem('blog-posts', JSON.stringify(blogs));
        }
        
        // Check if user is authenticated
        const authStatus = localStorage.getItem('blog-auth');
        if (authStatus === 'true') {
            setIsAuthenticated(true);
        }
    }, []); // Empty dependency array means this runs once on mount

    const handleAuth = () => {
        if (email === 'jehoshua.dev@gmail.com' && password === 'HerobrineTG') {
            setIsAuthenticated(true);
            localStorage.setItem('blog-auth', 'true');
            setShowAuthModal(false);
            setAuthError('');
            setEmail('');
            setPassword('');
        } else {
            setAuthError('Invalid credentials');
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('blog-auth');
    };

    const savePosts = (newPosts: BlogPost[]) => {
        setPosts(newPosts);
        localStorage.setItem('blog-posts', JSON.stringify(newPosts));
    };

    const calculateReadTime = (text: string): number => {
        const wordsPerMinute = 200;
        const wordCount = text.split(/\s+/).filter(word => word.length > 0).length; // More robust word count
        return Math.ceil(wordCount / wordsPerMinute);
    };

    const handleCreatePost = () => {
        if (!title.trim() || !content.trim()) return;

        const newPost: BlogPost = {
            id: Date.now().toString(), // Simple unique ID
            title: title.trim(),
            content: content.trim(),
            excerpt: content.trim().substring(0, 200) + '...',
            date: new Date().toISOString().split('T')[0],
            tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
            published: true,
            readTime: calculateReadTime(content.trim()),
            views: 0,
            likes: 0,
            category: category || 'Personal'
        };

        const newPosts = [newPost, ...posts];
        savePosts(newPosts);
        
        // Reset form
        setTitle('');
        setContent('');
        setTags('');
        setCategory('');
        setShowCreateModal(false);
    };

    const handleEditPost = () => {
        if (!editingPost || !title.trim() || !content.trim()) return;

        const updatedPosts = posts.map(post => 
            post.id === editingPost.id 
                ? {
                    ...post,
                    title: title.trim(),
                    content: content.trim(),
                    excerpt: content.trim().substring(0, 200) + '...',
                    tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
                    readTime: calculateReadTime(content.trim()),
                    category: category || post.category
                  }
                : post
        );

        savePosts(updatedPosts);
        
        // Reset form
        setTitle('');
        setContent('');
        setTags('');
        setCategory('');
        setEditingPost(null);
    };

    const confirmDeletePost = (id: string) => {
        setPostToDelete(id);
        setShowDeleteConfirmModal(true);
    };

    const handleDeleteConfirmed = () => {
        if (postToDelete) {
            const updatedPosts = posts.filter(post => post.id !== postToDelete);
            savePosts(updatedPosts);
            setPostToDelete(null);
            setShowDeleteConfirmModal(false);
        }
    };

    const closeModals = () => {
        setShowCreateModal(false);
        setEditingPost(null);
        setShowDeleteConfirmModal(false); // Close delete confirm modal too
        setPostToDelete(null); // Clear post to delete
        setTitle('');
        setContent('');
        setTags('');
        setCategory('');
    };

    const openEditModal = (post: BlogPost) => {
        setEditingPost(post);
        setTitle(post.title);
        setContent(post.content);
        setTags(post.tags.join(', '));
        setCategory(post.category);
    };

    // Filter posts based on search and category
    const filteredPosts = posts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
        
        const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
        const matchesTag = selectedTag === 'All' || post.tags.includes(selectedTag);
        
        return matchesSearch && matchesCategory && matchesTag;
    });

    // Get all unique tags
    const allTags = Array.from(new Set(posts.flatMap(post => post.tags)));

    // Find the current post if an ID is in the URL
    const currentPost = postId ? posts.find(p => p.id === postId) : null;

    // --- Render Logic ---
    // If postId is present and a post is found, render the single post view
    if (postId && currentPost) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-purple-900 relative overflow-hidden font-inter">
                {/* Custom CSS for gradients and animations */}
                <style jsx global>{`
                    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
                    .font-inter {
                        font-family: 'Inter', sans-serif;
                    }
                    .bg-mesh-gradient-dark {
                        background: radial-gradient(at 20% 80%, rgba(109, 40, 217, 0.3) 0%, transparent 50%),
                                    radial-gradient(at 80% 20%, rgba(76, 29, 149, 0.3) 0%, transparent 50%);
                    }
                    .bg-mesh-gradient {
                        background: radial-gradient(at 70% 30%, rgba(124, 58, 237, 0.2) 0%, transparent 50%),
                                    radial-gradient(at 30% 70%, rgba(168, 85, 247, 0.2) 0%, transparent 50%);
                    }
                    .grid-pattern {
                        background-image: linear-gradient(to right, rgba(128, 0, 128, 0.1) 1px, transparent 1px),
                                          linear-gradient(to bottom, rgba(128, 0, 128, 0.1) 1px, transparent 1px);
                        background-size: 20px 20px;
                    }
                    .noise-texture {
                        background-image: url('data:image/svg+xml;base64,PHN2ZyB2aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGZpbHRlciBpZD0ibm9pc2VGaWx0ZXIiPjxmZVR1cmJ1bGVuY2UgdHlwZT0iZnJhY3RhbE5vaXNlIiBiYXNlRnJlcXVlbmN5PSIwLjciIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJub1N0aXRjaCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNub2lzZUZpbHRlcikiIG9wYWNpdHk9IjAuMDgiLz48L3N2Zz4=');
                        background-size: cover;
                    }
                    .animate-gradient {
                        animation: gradientShift 15s ease infinite alternate;
                    }
                    @keyframes gradientShift {
                        0% { background-position: 0% 50%; }
                        50% { background-position: 100% 50%; }
                        100% { background-position: 0% 50%; }
                    }
                    .text-gradient {
                        background: linear-gradient(to right, #a855f7, #e879f9, #8b5cf6);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                    }
                    .glow {
                        text-shadow: 0 0 8px rgba(168, 85, 247, 0.6), 0 0 15px rgba(168, 85, 247, 0.4);
                    }
                    /* Markdown specific styling */
                    .markdown-content h1, .markdown-content h2, .markdown-content h3, .markdown-content h4, .markdown-content h5, .markdown-content h6 {
                        color: #a855f7; /* Purple for headings */
                        margin-top: 1.5em;
                        margin-bottom: 0.8em;
                        font-weight: 600;
                    }
                    .markdown-content h1 { font-size: 2.5em; }
                    .markdown-content h2 { font-size: 2em; border-bottom: 1px solid rgba(168, 85, 247, 0.3); padding-bottom: 0.3em; }
                    .markdown-content h3 { font-size: 1.75em; }
                    .markdown-content p {
                        margin-bottom: 1em;
                        line-height: 1.7;
                        color: #e0e0e0; /* Light gray for paragraphs */
                    }
                    .markdown-content a {
                        color: #8b5cf6; /* Violet for links */
                        text-decoration: underline;
                    }
                    .markdown-content ul, .markdown-content ol {
                        margin-bottom: 1em;
                        padding-left: 1.5em;
                        color: #e0e0e0;
                    }
                    .markdown-content li {
                        margin-bottom: 0.5em;
                    }
                    .markdown-content code {
                        background-color: rgba(168, 85, 247, 0.2); /* Light purple background for inline code */
                        color: #e879f9; /* Pinkish purple for inline code */
                        padding: 0.2em 0.4em;
                        border-radius: 4px;
                        font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
                    }
                    .markdown-content pre {
                        background-color: rgba(0, 0, 0, 0.6); /* Darker background for code blocks */
                        padding: 1em;
                        border-radius: 8px;
                        overflow-x: auto;
                        margin-bottom: 1em;
                        border: 1px solid rgba(168, 85, 247, 0.3);
                    }
                    .markdown-content pre code {
                        background-color: transparent; /* No background for code inside pre */
                        color: #c792ea; /* Lighter purple for code block text */
                        padding: 0;
                        font-size: 0.9em;
                    }
                    .markdown-content blockquote {
                        border-left: 4px solid #8b5cf6; /* Violet border for blockquotes */
                        padding-left: 1em;
                        margin: 1em 0;
                        color: #a0a0a0; /* Gray for blockquote text */
                        font-style: italic;
                    }
                    .markdown-content table {
                        width: 100%;
                        border-collapse: collapse;
                        margin-bottom: 1em;
                    }
                    .markdown-content th, .markdown-content td {
                        border: 1px solid rgba(168, 85, 247, 0.3);
                        padding: 0.8em;
                        text-align: left;
                        color: #e0e0e0;
                    }
                    .markdown-content th {
                        background-color: rgba(168, 85, 247, 0.1);
                        font-weight: 600;
                    }
                `}</style>

                <div className="fixed inset-0 bg-mesh-gradient-dark animate-gradient opacity-60"></div>
                <div className="fixed inset-0 bg-mesh-gradient animate-gradient opacity-40"></div>
                <div className="fixed inset-0 grid-pattern opacity-20"></div>
                <div className="fixed inset-0 noise-texture opacity-50"></div>

                {/* Header for single post view */}
                <header className="relative z-10 bg-gradient-to-r from-black/20 via-purple-900/20 to-black/20 backdrop-blur-xl border-b border-purple-500/20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-6">
                                <Link href="/blog" className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors">
                                    <ArrowLeft className="w-5 h-5" />
                                    <span>Back to All Posts</span>
                                </Link>
                                <div className="flex items-center gap-3">
                                    <BookOpen className="w-8 h-8 text-purple-400 glow" />
                                    <h1 className="text-3xl font-bold text-gradient">My Blog</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content for Single Post */}
                <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <article className="p-8 rounded-xl border border-purple-500/30 backdrop-blur bg-gradient-to-br from-black/60 via-purple-900/30 to-violet-800/20 shadow-lg">
                        <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-4 glow">
                            {currentPost.title}
                        </h1>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-purple-300 mb-6">
                            <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {new Date(currentPost.date).toLocaleDateString()}
                            </div>
                            <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {currentPost.readTime} min read
                            </div>
                            {currentPost.category && (
                                <Badge className="bg-violet-800/30 border border-violet-600/20 text-violet-200">
                                    {currentPost.category}
                                </Badge>
                            )}
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-8">
                            {currentPost.tags.map(tag => (
                                <Badge key={tag} className="bg-purple-800/30 border border-purple-600/20 text-purple-200">
                                    <Tag className="w-3 h-3 mr-1" /> {tag}
                                </Badge>
                            ))}
                        </div>

                        <div className="markdown-content text-lg text-purple-100/90 leading-relaxed">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {currentPost.content}
                            </ReactMarkdown>
                        </div>
                    </article>
                </main>
            </div>
        );
    }

    // If no postId or post not found, render the list view (original content)
    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-purple-900 relative overflow-hidden font-inter">
            {/* Custom CSS for gradients and animations */}
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
                .font-inter {
                    font-family: 'Inter', sans-serif;
                }
                .bg-mesh-gradient-dark {
                    background: radial-gradient(at 20% 80%, rgba(109, 40, 217, 0.3) 0%, transparent 50%),
                                radial-gradient(at 80% 20%, rgba(76, 29, 149, 0.3) 0%, transparent 50%);
                }
                .bg-mesh-gradient {
                    background: radial-gradient(at 70% 30%, rgba(124, 58, 237, 0.2) 0%, transparent 50%),
                                radial-gradient(at 30% 70%, rgba(168, 85, 247, 0.2) 0%, transparent 50%);
                }
                .grid-pattern {
                    background-image: linear-gradient(to right, rgba(128, 0, 128, 0.1) 1px, transparent 1px),
                                      linear-gradient(to bottom, rgba(128, 0, 128, 0.1) 1px, transparent 1px);
                    background-size: 20px 20px;
                }
                .noise-texture {
                    background-image: url('data:image/svg+xml;base64,PHN2ZyB2aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGZpbHRlciBpZD0ibm9pc2VGaWx0ZXIiPjxmZVR1cmJ1bGVuY2UgdHlwZT0iZnJhY3RhbE5vaXNlIiBiYXNlRnJlcXVlbmN5PSIwLjciIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJub1N0aXRjaCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNub2lzZUZpbHRlcikiIG9wYWNpdHk9IjAuMDgiLz48L3N2Zz4=');
                    background-size: cover;
                }
                .animate-gradient {
                    animation: gradientShift 15s ease infinite alternate;
                }
                @keyframes gradientShift {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                .text-gradient {
                    background: linear-gradient(to right, #a855f7, #e879f9, #8b5cf6);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                .glow {
                    text-shadow: 0 0 8px rgba(168, 85, 247, 0.6), 0 0 15px rgba(168, 85, 247, 0.4);
                }
                .hover-lift:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 10px 20px rgba(168, 85, 247, 0.3);
                }
                .animate-float {
                    animation: float 3s ease-in-out infinite;
                }
                @keyframes float {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                    100% { transform: translateY(0px); }
                }
                /* Markdown specific styling (for single post view) */
                .markdown-content h1, .markdown-content h2, .markdown-content h3, .markdown-content h4, .markdown-content h5, .markdown-content h6 {
                    color: #a855f7; /* Purple for headings */
                    margin-top: 1.5em;
                    margin-bottom: 0.8em;
                    font-weight: 600;
                }
                .markdown-content h1 { font-size: 2.5em; }
                .markdown-content h2 { font-size: 2em; border-bottom: 1px solid rgba(168, 85, 247, 0.3); padding-bottom: 0.3em; }
                .markdown-content h3 { font-size: 1.75em; }
                .markdown-content p {
                    margin-bottom: 1em;
                    line-height: 1.7;
                    color: #e0e0e0; /* Light gray for paragraphs */
                }
                .markdown-content a {
                    color: #8b5cf6; /* Violet for links */
                    text-decoration: underline;
                }
                .markdown-content ul, .markdown-content ol {
                    margin-bottom: 1em;
                    padding-left: 1.5em;
                    color: #e0e0e0;
                }
                .markdown-content li {
                    margin-bottom: 0.5em;
                }
                .markdown-content code {
                    background-color: rgba(168, 85, 247, 0.2); /* Light purple background for inline code */
                    color: #e879f9; /* Pinkish purple for inline code */
                    padding: 0.2em 0.4em;
                    border-radius: 4px;
                    font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
                }
                .markdown-content pre {
                    background-color: rgba(0, 0, 0, 0.6); /* Darker background for code blocks */
                    padding: 1em;
                    border-radius: 8px;
                    overflow-x: auto;
                    margin-bottom: 1em;
                    border: 1px solid rgba(168, 85, 247, 0.3);
                }
                .markdown-content pre code {
                    background-color: transparent; /* No background for code inside pre */
                    color: #c792ea; /* Lighter purple for code block text */
                    padding: 0;
                    font-size: 0.9em;
                }
                .markdown-content blockquote {
                    border-left: 4px solid #8b5cf6; /* Violet border for blockquotes */
                    padding-left: 1em;
                    margin: 1em 0;
                    color: #a0a0a0; /* Gray for blockquote text */
                    font-style: italic;
                }
                .markdown-content table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-bottom: 1em;
                }
                .markdown-content th, .markdown-content td {
                    border: 1px solid rgba(168, 85, 247, 0.3);
                    padding: 0.8em;
                    text-align: left;
                    color: #e0e0e0;
                }
                .markdown-content th {
                    background-color: rgba(168, 85, 247, 0.1);
                    font-weight: 600;
                }
            `}</style>

            {/* Background Effects */}
            <div className="fixed inset-0 bg-mesh-gradient-dark animate-gradient opacity-60"></div>
            <div className="fixed inset-0 bg-mesh-gradient animate-gradient opacity-40"></div>
            <div className="fixed inset-0 grid-pattern opacity-20"></div>
            <div className="fixed inset-0 noise-texture opacity-50"></div>

            {/* Header */}
            <header className="relative z-10 bg-gradient-to-r from-black/20 via-purple-900/20 to-black/20 backdrop-blur-xl border-b border-purple-500/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6">
                            {/* Link back to portfolio (unchanged) */}
                            <Link href="/" className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors">
                                <ArrowLeft className="w-5 h-5" />
                                <span>Back to Portfolio</span>
                            </Link>
                            <div className="flex items-center gap-3">
                                <BookOpen className="w-8 h-8 text-purple-400 glow" />
                                <h1 className="text-3xl font-bold text-gradient">My Blog</h1>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            {isAuthenticated ? (
                                <>
                                    <Button 
                                        onClick={() => setShowCreateModal(true)}
                                        className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white"
                                    >
                                        <Plus className="w-4 h-4 mr-2" />
                                        New Post
                                    </Button>
                                    <Button 
                                        variant="outline" 
                                        onClick={handleLogout}
                                        className="border-purple-500/50 text-purple-300 hover:bg-purple-500/10"
                                    >
                                        Logout
                                    </Button>
                                </>
                            ) : (
                                <Button 
                                    onClick={() => setShowAuthModal(true)}
                                    className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white"
                                >
                                    <Lock className="w-4 h-4 mr-2" />
                                    Admin Login
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content - List View */}
            <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <div className="flex justify-center items-center gap-4 mb-6">
                        <BookOpen className="w-16 h-16 text-purple-400 animate-float glow" />
                    </div>
                    <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gradient glow">Developer Insights</h2>
                    <p className="text-xl text-purple-200/80 max-w-3xl mx-auto leading-relaxed">
                        Welcome to my blog where I share my <span className="text-purple-400 font-semibold">coding journey</span>, 
                        <span className="text-violet-400 font-semibold"> technical insights</span>, and 
                        <span className="text-purple-300 font-semibold"> lessons learned</span> as a young developer.
                    </p>
                    <div className="w-32 h-1 bg-gradient-to-r from-purple-500 via-black to-violet-500 mx-auto mt-8 animate-gradient"></div>
                </div>

                {/* Search and Filters */}
                <div className="mb-12 space-y-6">
                    {/* Search Bar */}
                    <div className="relative max-w-2xl mx-auto">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search posts, tags, or content..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                    </div>

                    {/* Category Filter */}
                    <div className="flex flex-wrap justify-center gap-3">
                        {categories.map((cat) => (
                            <Button
                                key={cat}
                                variant={selectedCategory === cat ? "default" : "outline"}
                                onClick={() => setSelectedCategory(cat)}
                                className={`${
                                    selectedCategory === cat
                                        ? 'bg-gradient-to-r from-purple-600 to-violet-600 text-white'
                                        : 'border-purple-500/50 text-purple-300 hover:bg-purple-500/10'
                                } transition-all duration-300`}
                            >
                                {cat}
                            </Button>
                        ))}
                    </div>

                    {/* Tag Filter */}
                    {allTags.length > 0 && (
                        <div className="flex flex-wrap justify-center gap-2">
                            <Button
                                variant={selectedTag === 'All' ? "default" : "outline"}
                                size="sm"
                                onClick={() => setSelectedTag('All')}
                                className={`${
                                    selectedTag === 'All'
                                        ? 'bg-gradient-to-r from-purple-600 to-violet-600 text-white'
                                        : 'border-purple-500/50 text-purple-300 hover:bg-purple-500/10'
                                } transition-all duration-300`}
                            >
                                All Tags
                            </Button>
                            {allTags.slice(0, 10).map((tag) => (
                                <Button
                                    key={tag}
                                    variant={selectedTag === tag ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setSelectedTag(tag)}
                                    className={`${
                                        selectedTag === tag
                                            ? 'bg-gradient-to-r from-purple-600 to-violet-600 text-white'
                                            : 'border-purple-500/50 text-purple-300 hover:bg-purple-500/10'
                                    } transition-all duration-300`}
                                >
                                    {tag}
                                </Button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Blog Posts List */}
                {filteredPosts.length === 0 ? (
                    <div className="text-center py-20">
                        <BookOpen className="w-24 h-24 text-purple-400/50 mx-auto mb-8 animate-float" />
                        <h2 className="text-4xl font-bold text-gradient mb-6">
                            {posts.length === 0 ? 'No Posts Yet' : 'No Posts Found'}
                        </h2>
                        <p className="text-xl text-purple-200/80 mb-8">
                            {posts.length === 0 
                                ? (isAuthenticated 
                                    ? "Ready to share your first story? Click 'New Post' to get started!" 
                                    : "Check back soon for amazing content about coding, development, and tech insights!"
                                  )
                                : "Try adjusting your search terms or filters to find what you're looking for."
                            }
                        </p>
                        {isAuthenticated && posts.length === 0 && (
                            <Button 
                                onClick={() => setShowCreateModal(true)}
                                size="lg"
                                className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white px-8 py-4"
                            >
                                <Plus className="w-5 h-5 mr-2" />
                                Create Your First Post
                            </Button>
                        )}
                    </div>
                ) : (
                    <div className="space-y-10">
                        {filteredPosts.map(post => (
                            // Link to the same /blog page, but with an 'id' query parameter
                            <Link key={post.id} href={`/blog?id=${post.id}`} className="block group">
                                <div className="p-6 rounded-xl border border-purple-500/30 backdrop-blur bg-gradient-to-br from-black/60 via-purple-900/30 to-violet-800/20 hover-lift transition-transform">
                                    <h2 className="text-2xl font-semibold text-gradient mb-2 group-hover:underline">
                                        {post.title}
                                    </h2>
                                    <div className="flex items-center gap-4 text-sm text-purple-300 mb-2">
                                        <div className="flex items-center gap-1">
                                            <Calendar className="w-4 h-4" />
                                            {new Date(post.date).toLocaleDateString()}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Clock className="w-4 h-4" />
                                            {post.readTime} min read
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {post.tags.map(tag => (
                                            <Badge key={tag} className="bg-purple-800/30 border border-purple-600/20 text-purple-200">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                    <p className="text-purple-100/90 leading-relaxed line-clamp-2">
                                        {post.excerpt || post.content.split('\n').filter(Boolean).slice(0, 2).join(' ')}
                                    </p>
                                    {isAuthenticated && (
                                        <div className="flex gap-2 mt-4 pt-4 border-t border-purple-500/20">
                                            <Button 
                                                onClick={(e: { preventDefault: () => void; }) => { e.preventDefault(); openEditModal(post); }} // Prevent link navigation
                                                size="sm"
                                                className="bg-purple-700/50 hover:bg-purple-700 text-purple-200"
                                            >
                                                <Edit className="w-4 h-4 mr-2" />
                                                Edit
                                            </Button>
                                            <Button 
                                                onClick={(e: { preventDefault: () => void; }) => { e.preventDefault(); confirmDeletePost(post.id); }} // Prevent link navigation
                                                size="sm"
                                                className="bg-red-700/50 hover:bg-red-700 text-red-200"
                                            >
                                                <Trash2 className="w-4 h-4 mr-2" />
                                                Delete
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </main>

            {/* Auth Modal */}
            {showAuthModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <Card className="w-full max-w-md bg-gradient-to-br from-black/80 via-purple-900/60 to-violet-800/40 backdrop-blur-xl border border-purple-500/30">
                        <CardHeader>
                            <CardTitle className="text-2xl text-gradient text-center">Admin Login</CardTitle>
                            <CardDescription className="text-center text-purple-200">
                                Enter your credentials to manage blog posts
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-purple-200 mb-2">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-3 py-2 bg-black/50 border border-purple-500/30 rounded-md text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    placeholder="Enter your email"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-purple-200 mb-2">Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-3 py-2 bg-black/50 border border-purple-500/30 rounded-md text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    placeholder="Enter your password"
                                />
                            </div>
                            {authError && (
                                <p className="text-red-400 text-sm">{authError}</p>
                            )}
                            <div className="flex gap-3 pt-4">
                                <Button 
                                    onClick={handleAuth}
                                    className="flex-1 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white"
                                >
                                    Login
                                </Button>
                                <Button 
                                    variant="outline" 
                                    onClick={() => {
                                        setShowAuthModal(false);
                                        setAuthError('');
                                        setEmail('');
                                        setPassword('');
                                    }}
                                    className="border-purple-500/50 text-purple-300 hover:bg-purple-500/10"
                                >
                                    Cancel
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}

            {/* Create/Edit Post Modal */}
            {(showCreateModal || editingPost) && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-black/80 via-purple-900/60 to-violet-800/40 backdrop-blur-xl border border-purple-500/30">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-2xl text-gradient">
                                    {editingPost ? 'Edit Post' : 'Create New Post'}
                                </CardTitle>
                                <Button variant="ghost" size="sm" onClick={closeModals}>
                                    <X className="w-5 h-5" />
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-purple-200 mb-2">Title</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full px-3 py-2 bg-black/50 border border-purple-500/30 rounded-md text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    placeholder="Enter post title"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-purple-200 mb-2">Category</label>
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-full px-3 py-2 bg-black/50 border border-purple-500/30 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                >
                                    <option value="">Select a category</option>
                                    {categories.slice(1).map((cat) => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-purple-200 mb-2">Content</label>
                                <textarea
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    rows={15}
                                    className="w-full px-3 py-2 bg-black/50 border border-purple-500/30 rounded-md text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                                    placeholder="Write your blog post content here... (Supports Markdown)"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-purple-200 mb-2">Tags</label>
                                <input
                                    type="text"
                                    value={tags}
                                    onChange={(e) => setTags(e.target.value)}
                                    className="w-full px-3 py-2 bg-black/50 border border-purple-500/30 rounded-md text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    placeholder="Enter tags separated by commas (e.g., coding, javascript, tutorial)"
                                />
                            </div>
                            <div className="flex gap-3 pt-4">
                                <Button 
                                    onClick={editingPost ? handleEditPost : handleCreatePost}
                                    className="flex-1 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white"
                                    disabled={!title.trim() || !content.trim()}
                                >
                                    <Save className="w-4 h-4 mr-2" />
                                    {editingPost ? 'Update Post' : 'Create Post'}
                                </Button>
                                <Button 
                                    variant="outline" 
                                    onClick={closeModals}
                                    className="border-purple-500/50 text-purple-300 hover:bg-purple-500/10"
                                >
                                    Cancel
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteConfirmModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <Card className="w-full max-w-sm bg-gradient-to-br from-black/80 via-purple-900/60 to-violet-800/40 backdrop-blur-xl border border-purple-500/30">
                        <CardHeader>
                            <CardTitle className="text-2xl text-gradient text-center">Confirm Deletion</CardTitle>
                            <CardDescription className="text-center text-purple-200">
                                Are you sure you want to delete this post? This action cannot be undone.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex gap-3 pt-4">
                                <Button 
                                    onClick={handleDeleteConfirmed}
                                    className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                                >
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Delete
                                </Button>
                                <Button 
                                    variant="outline" 
                                    onClick={closeModals}
                                    className="border-purple-500/50 text-purple-300 hover:bg-purple-500/10"
                                >
                                    Cancel
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}
