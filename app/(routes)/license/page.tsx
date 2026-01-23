'use client';

import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function License() {
    const cursorDotRef = useRef<HTMLDivElement>(null);
    const cursorOutlineRef = useRef<HTMLDivElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState(false);
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

    return (
        <div className="min-h-screen bg-gradient-dark relative overflow-hidden">
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
                <div
                    ref={cursorDotRef}
                    className="cursor-dot fixed w-2 h-2 bg-purple-500 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
                />
                <div
                    ref={cursorOutlineRef}
                    className="cursor-dot fixed w-8 h-8 border-2 border-purple-400/50 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2"
                />
                <nav className="fixed top-0 w-full z-50 bg-black/40 backdrop-blur-xl border-b border-purple-900/30 shadow-purple">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <div className="flex justify-between items-center h-20">
                            <div className="flex items-center gap-3">

                                <div className="text-1xl font-bold text-gradient">
                                    <h4>Jehoshua</h4>
                                </div>
                            </div>
                            <div className="hidden md:flex items-center space-x-8">
                                <Link href="/" className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors">
                                    <ArrowLeft className="w-5 h-5" />
                                    <span>Back to Portfolio</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </nav>
                <section id="about" className="py-32 relative">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                        <div className={`transition-all duration-1000 ${isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-10'}`}>
                            <div className="text-center mb-16">
                                <h2 className="text-5xl md:text-6xl font-bold mb-4 text-gradient-alt">MIT LICENSE</h2>
                                <p className="text-gray-400 text-lg"></p>
                            </div>
                            <Card className="bg-card-gradient border border-purple-900/30 shadow-card hover:shadow-card-hover transition-all duration-300">
                                <CardContent className="p-8">
                                    <p className="text-lg text-gray-300 leading-relaxed mb-6 font-bold">MIT License</p>
                                    <p className="text-lg text-gray-300 leading-relaxed mb-6">Copyright (c) 2025 Jehoshua </p>
                                    <p className="text-lg text-gray-300 leading-relaxed mb-6">
                                        Permission is hereby granted, free of charge, to any person obtaining a copy
                                        of this software and associated documentation files (the "Software"), to deal
                                        in the Software without restriction, including without limitation the rights
                                        to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
                                        copies of the Software, and to permit persons to whom the Software is
                                        furnished to do so, subject to the following conditions:
                                    </p>
                                    <p className="text-lg text-gray-300 leading-relaxed mb-6">
                                        The above copyright notice and this permission notice shall be included in all
                                        copies or substantial portions of the Software.
                                    </p>
                                    <p className="text-lg text-gray-300 leading-relaxed">
                                        THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
                                        IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
                                        FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
                                        AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
                                        LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
                                        OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
                                        SOFTWARE.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}