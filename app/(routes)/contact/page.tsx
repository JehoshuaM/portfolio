'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";

export default function Contact() {

    const [isVisible, setIsVisible] = useState(false);
    const [important, setImportant] = useState(false);
    useEffect(() => {
        setIsVisible(true);
    }, []);


    const [sending, setSending] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget as HTMLFormElement;
        setSending(true);

        const fd = new FormData(e.currentTarget);
        const first = (fd.get("firstName") || "").toString().trim();
        const last = (fd.get("lastName") || "").toString().trim();
        const email = (fd.get("email") || "").toString().trim();
        const reason = (fd.get("reason") || "").toString().trim();
        const important = fd.get("important") ? "Yes" : "No";

        if (!first || !email || !reason) {
            alert("Please fill in First name, Email and Reason.");
            setSending(false);
            return;
        }

        const templateParams = {
            first,
            last,
            email,
            reason,
            important: important ? "Yes" : "No",
        };

        emailjs
            .send(
                "service_cgnn07b",
                "template_j3ui4si",
                templateParams,
                "juH562-nZxUk7MoMc"
            )
            .then(
                () => {
                    alert("Message sent successfully! 💜");
                    form.reset();
                    setSending(false);
                },
                (err) => {
                    console.error(err);
                    alert("Oops! Something went wrong. Try again.");
                    setSending(false);
                }
            );
    };
    return (
        <div className="min-h-screen bg-gradient-dark relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none opacity-60 z-0" style={{ backgroundImage: `url("data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Ccircle cx='1' cy='1' r='1' fill='%23a855f7' fill-opacity='0.32'/%3E%3C/svg%3E")`, backgroundSize: '20px 20px', backgroundRepeat: 'repeat' }} />
            <div className="absolute inset-0 pointer-events-none z-0" style={{ background: 'radial-gradient(60% 40% at 80% 50%, rgba(124,58,237,0.25), transparent 70%), radial-gradient(40% 30% at 15% 25%, rgba(168,85,247,0.18), transparent 60%)', WebkitMaskImage: 'radial-gradient(80% 65% at 50% 35%, black, transparent)', maskImage: 'radial-gradient(80% 65% at 50% 35%, black, transparent)' }} />
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl animate-pulse-slow" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-violet-600/15 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
                <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-float" />
            </div>
            <div className="relative z-10">

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
                <section id="contact" className="py-32 relative">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                        <div className={`transition-all duration-1000 ${isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-10'}`}>
                            <div className="text-center mb-16">
                                <h2 className="text-5xl md:text-6xl font-bold mb-4 text-gradient-alt">Contact Me</h2>
                                <p className="text-gray-400 text-lg"></p>
                            </div>
                            <Card className="bg-card-gradient border border-purple-900/30 shadow-card hover:shadow-card-hover transition-all duration-300">
                                <CardContent className="p-8">
                                    <form
                                        onSubmit={handleSubmit}
                                        className="space-y-6"
                                    >
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <label className="flex flex-col text-sm">
                                                <span className="text-gray-300 mb-2">First Name *</span>
                                                <input
                                                    name="firstName"
                                                    type="text"
                                                    required
                                                    className="px-3 py-2 rounded-md bg-transparent border border-purple-700/40 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                                    placeholder="First name"
                                                />
                                            </label>

                                            <label className="flex flex-col text-sm">
                                                <span className="text-gray-300 mb-2">Last Name</span>
                                                <input
                                                    name="lastName"
                                                    type="text"
                                                    className="px-3 py-2 rounded-md bg-transparent border border-purple-700/40 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                                    placeholder="Last name"
                                                />
                                            </label>
                                        </div>

                                        <label className="flex flex-col text-sm">
                                            <span className="text-gray-300 mb-2">Email *</span>
                                            <input
                                                name="email"
                                                type="email"
                                                required
                                                className="w-full px-3 py-2 rounded-md bg-transparent border border-purple-700/40 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                                placeholder="you@example.com"
                                            />
                                        </label>

                                        <label className="flex flex-col text-sm">
                                            <span className="text-gray-300 mb-2">Reason for contacting *</span>
                                            <textarea
                                                name="reason"
                                                required
                                                rows={5}
                                                className="w-full px-3 py-2 rounded-md bg-transparent border border-purple-700/40 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                                placeholder="Please describe your reason for reaching out..."
                                            />
                                        </label>
                                        <div className="flex items-center gap-2">
                                            <Checkbox
                                                id="important"
                                                checked={important}
                                                onCheckedChange={(checked) => setImportant(checked === true)}
                                                className="accent-purple-600 w-5 h-5"
                                            />
                                            <label htmlFor="important" className="text-sm text-gray-300 cursor-pointer select-none">
                                                Mark this as important
                                            </label>
                                        </div>
                                        <div className="flex items-center justify-between gap-4">
                                            <Button
                                                size="default"
                                                type="submit"
                                                className="relative bg-gradient-to-b from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-purple hover:shadow-purple-lg transition-all duration-300 group"
                                            >
                                                Send Message
                                                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                            </Button>
                                            <p className="text-xs text-gray-400">This will open your email client to send the message to jehoshua.dev@gmail.com</p>
                                        </div>
                                    </form>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}