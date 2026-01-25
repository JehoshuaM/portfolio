'use client';

import { useState, useEffect } from 'react';
import { Github, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

const ModrinthIcon = ({ className }: { className?: string }) => (
    <svg
        role="img"
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
    >
        <title>Modrinth</title>
        <path d="M12.252.004a11.78 11.768 0 0 0-8.92 3.73 11 10.999 0 0 0-2.17 3.11 11.37 11.359 0 0 0-1.16 5.169c0 1.42.17 2.5.6 3.77.24.759.77 1.899 1.17 2.529a12.3 12.298 0 0 0 8.85 5.639c.44.05 2.54.07 2.76.02.2-.04.22.1-.26-1.7l-.36-1.37-1.01-.06a8.5 8.489 0 0 1-5.18-1.8 5.34 5.34 0 0 1-1.3-1.26c0-.05.34-.28.74-.5a37.572 37.545 0 0 1 2.88-1.629c.03 0 .5.45 1.06.98l1 .97 2.07-.43 2.06-.43 1.47-1.47c.8-.8 1.48-1.5 1.48-1.52 0-.09-.42-1.63-.46-1.7-.04-.06-.2-.03-1.02.18-.53.13-1.2.3-1.45.4l-.48.15-.53.53-.53.53-.93.1-.93.07-.52-.5a2.7 2.7 0 0 1-.96-1.7l-.13-.6.43-.57c.68-.9.68-.9 1.46-1.1.4-.1.65-.2.83-.33.13-.099.65-.579 1.14-1.069l.9-.9-.7-.7-.7-.7-1.95.54c-1.07.3-1.96.53-1.97.53-.03 0-2.23 2.48-2.63 2.97l-.29.35.28 1.03c.16.56.3 1.16.31 1.34l.03.3-.34.23c-.37.23-2.22 1.3-2.84 1.63-.36.2-.37.2-.44.1-.08-.1-.23-.6-.32-1.03-.18-.86-.17-2.75.02-3.73a8.84 8.839 0 0 1 7.9-6.93c.43-.03.77-.08.78-.1.06-.17.5-2.999.47-3.039-.01-.02-.1-.02-.2-.03Zm3.68.67c-.2 0-.3.1-.37.38-.06.23-.46 2.42-.46 2.52 0 .04.1.11.22.16a8.51 8.499 0 0 1 2.99 2 8.38 8.379 0 0 1 2.16 3.449 6.9 6.9 0 0 1 .4 2.8c0 1.07 0 1.27-.1 1.73a9.37 9.369 0 0 1-1.76 3.769c-.32.4-.98 1.06-1.37 1.38-.38.32-1.54 1.1-1.7 1.14-.1.03-.1.06-.07.26.03.18.64 2.56.7 2.78l.06.06a12.07 12.058 0 0 0 7.27-9.4c.13-.77.13-2.58 0-3.4a11.96 11.948 0 0 0-5.73-8.578c-.7-.42-2.05-1.06-2.25-1.06Z" />
    </svg>
);

export function ProjectCard({ project, index }: { project: any, index: number }) {
    const [iconUrl, setIconUrl] = useState<string | null>(null);

    useEffect(() => {
        if (project.modrinth) {
            fetch(`https://api.modrinth.com/v2/project/${project.modrinth}`)
                .then(res => res.json())
                .then(data => {
                    if (data.icon_url) {
                        setIconUrl(data.icon_url);
                    }
                })
                .catch(err => console.error('Failed to fetch Modrinth icon:', err));
        }
    }, [project.modrinth]);

    return (
        <motion.div
            key={project.title}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`${project.featured ? 'md:col-span-2 lg:col-span-1' : ''}`}
        >
            <Card
                className="relative bg-card-gradient border border-purple-900/30 shadow-card hover:shadow-purple-lg hover-lift transition-all duration-500 overflow-hidden border-glow h-full"
            >
                <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-purple-500/10 to-transparent" />

                <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                        <div className="bg-purple-600/20 rounded-xl overflow-hidden">
                            {iconUrl ? (
                                <img src={iconUrl} alt={project.title} className="h-16 w-16 object-cover" />
                            ) : (
                                <div className="p-3">
                                    <project.icon className="h-8 w-8 text-purple-400" />
                                </div>
                            )}
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
                    <div className="flex flex-col sm:flex-row gap-3">
                        {project.repo && (
                            <a href={project.repo} target="_blank" rel="noopener noreferrer">
                                <Button variant="outline" size="sm" className="text-purple-300 hover:bg-purple-600/10 transition-all duration-300 w-full sm:w-auto">
                                    <Github className="mr-2 h-4 w-4" />
                                    View Repository
                                    <ExternalLink className="ml-2 h-4 w-4" />
                                </Button>
                            </a>
                        )}
                        {project.modrinth && (
                            <a href={`https://modrinth.com/project/${project.modrinth}`} target="_blank" rel="noopener noreferrer">
                                <Button variant="outline" size="sm" className="text-green-300 hover:bg-green-600/10 transition-all duration-300 border-green-500/30 hover:border-green-500/50 w-full sm:w-auto">
                                    <ModrinthIcon className="mr-2 h-4 w-4" />
                                    View on Modrinth
                                    <ExternalLink className="ml-2 h-4 w-4" />
                                </Button>
                            </a>
                        )}
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-2 mb-6">
                        {project.tech.map((tech: string) => (
                            <Badge key={tech} variant="outline" className="border-purple-700 text-purple-300">
                                {tech}
                            </Badge>
                        ))}
                    </div>
                    <div className="flex justify-between text-center">
                        {Object.entries(project.stats).map(([key, value]) => (
                            <div key={key}>
                                <div className="text-xl font-bold text-purple-400">{value as string}</div>
                                <div className="text-xs text-gray-500 capitalize">{key}</div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
