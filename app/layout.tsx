import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Jehoshua | Developer Portfolio',
  description: 'Portfolio of Jehoshua, a passionate 15-year-old developer specializing in Java, JavaScript, Next.js, and Minecraft plugin development. Explore innovative projects and creative solutions.',
  keywords: 'Jehoshua, Young Developer, Java Developer, JavaScript Developer, Next.js, Minecraft Plugins, Teen Developer, Portfolio, Web Development, Programming, Software Development, Full Stack Developer',
  authors: [{ name: 'Jehoshua' }],
  creator: 'Jehoshua',
  publisher: 'Jehoshua',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://jehoshua.netlify.app'),
  alternates: {
    canonical: 'https://jehoshua.netlify.app',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://jehoshua.netlify.app',
    title: 'Jehoshua | Developer Portfolio',
    description: 'Portfolio of Jehoshua, a passionate 15-year-old developer specializing in Java, JavaScript, and Minecraft plugin development. Explore innovative projects and creative solutions.',
    siteName: 'Jehoshua Portfolio',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Jehoshua - Developer Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jehoshua | Developer Portfolio',
    description: 'Portfolio of Jehoshua, a passionate 15-year-old developer specializing in Java, JavaScript, and Minecraft plugin development.',
    creator: '@jehoshua',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google9cdb327ad9efc6cc',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <head>
        <link rel="canonical" href="https://jehoshua.netlify.app" />
        <meta name="geo.region" content="IND" />
        <meta name="geo.placename" content="India" />
        <meta name="ICBM" content="39.8283, -98.5795" />
        <meta name="DC.title" content="Jehoshua - Developer Portfolio" />
        <meta name="DC.creator" content="Jehoshua" />
        <meta name="DC.subject" content="Web Development, Programming, Java, JavaScript, Minecraft Plugins" />
        <meta name="DC.description" content="Portfolio of Jehoshua, a passionate 15-year-old developer specializing in Java, JavaScript, and Minecraft plugin development." />
        <meta name="DC.publisher" content="Jehoshua" />
        <meta name="DC.contributor" content="Jehoshua" />
        <meta name="DC.date" content="2025-01-27" />
        <meta name="DC.type" content="Text" />
        <meta name="DC.format" content="text/html" />
        <meta name="DC.identifier" content="https://jehoshua.netlify.app" />
        <meta name="DC.language" content="en" />
        <meta name="DC.coverage" content="World" />
        <meta name="DC.rights" content="Copyright 2025 Jehoshua" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Jehoshua",
              "url": "https://jehoshua.netlify.app",
              "image": "https://jehoshua.netlify.app/og-image.jpg",
              "sameAs": [
                "https://github.com/HerobrineTG",
                "https://www.linkedin.com/in/jehoshua-m/",
                "https://discord.com/users/herobrinetg"
              ],
              "jobTitle": "Web Developer",
              "worksFor": {
                "@type": "Organization",
                "name": "Freelance"
              },
              "knowsAbout": [
                "Java Programming",
                "JavaScript Development",
                "Next.js",
                "Minecraft Plugin Development",
                "Web Development"
              ],
              "description": "A passionate 15-year-old developer specializing in Java, JavaScript, and Minecraft plugin development.",
              "birthDate": "2010",
              "nationality": "Indian",
              "email": "jehoshua.dev@gmail.com",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "IND"
              }
            })
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}