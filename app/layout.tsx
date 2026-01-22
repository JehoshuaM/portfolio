import './globals.css';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import localFont from 'next/font/local';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-poppins',
});

const horizon = localFont({
  src: '../public/assets/horizon_font/Horizon-Font/Horizon.woff2',
  variable: '--font-heading',
  display: 'swap',
});

const minecraftFont = localFont({
  src: '../public/assets/minecraft-font/minecraft-five-bold.ttf',
  variable: '--font-minecraft',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'FabledRuns | Portfolio',
  description: 'Portfolio of FabledRuns, a 15-year-old developer specializing in Java, Next.js, and Minecraft plugin development.',
  keywords: 'FabledRuns, Young Developer, Java Developer, JavaScript Developer, Next.js, Minecraft Plugins, Teen Developer, Portfolio, Web Development, Programming, Software Development, Full Stack Developer',
  authors: [{ name: 'FabledRuns' }],
  creator: 'FabledRuns',
  publisher: 'FabledRuns',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://fabledruns.netlify.app'),
  alternates: {
    canonical: 'https://fabledruns.netlify.app',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://fabledruns.netlify.app',
    title: 'FabledRuns | Portfolio',
    description: 'Portfolio of FabledRuns, a 15-year-old developer specializing in Java, Next.js, and Minecraft plugin development.',
    siteName: 'FabledRuns Portfolio',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'FabledRuns - Young Developer Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FabledRuns | Portfolio',
    description: 'Portfolio of FabledRuns, a 15-year-old developer specializing in Java, Next.js, and Minecraft plugin development.',
    creator: '@fabledruns',
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
    <html lang="en" className={`${poppins.variable} ${horizon.variable} ${minecraftFont.variable} scroll-smooth`}>
      <head>
        <link rel="canonical" href="https://fabledruns.netlify.app" />
        <meta name="geo.region" content="IND" />
        <meta name="geo.placename" content="India" />
        <meta name="ICBM" content="39.8283, -98.5795" />
        <meta name="DC.title" content="FabledRuns - Portfolio" />
        <meta name="DC.creator" content="FabledRuns" />
        <meta name="DC.subject" content="Web Development, Programming, Java, JavaScript, Minecraft Plugins" />
        <meta name="DC.description" content="Portfolio of FabledRuns, a 15-year-old developer specializing in Java, Next.js, and Minecraft plugin development." />
        <meta name="DC.publisher" content="FabledRuns" />
        <meta name="DC.contributor" content="FabledRuns" />
        <meta name="DC.date" content="2025-01-27" />
        <meta name="DC.type" content="Text" />
        <meta name="DC.format" content="text/html" />
        <meta name="DC.identifier" content="https://fabledruns.netlify.app" />
        <meta name="DC.language" content="en" />
        <meta name="DC.coverage" content="World" />
        <meta name="DC.rights" content="Copyright 2025 FabledRuns" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "FabledRuns",
              "url": "https://fabledruns.netlify.app",
              "image": "https://fabledruns.netlify.app/pfp.jpg",
              "sameAs": [
                "https://github.com/FabledRuns",
                "https://discord.com/users/herobrinetg"
              ],
              "jobTitle": "Software Developer",
              "worksFor": {
                "@type": "Organization",
                "name": "Freelance"
              },
              "knowsAbout": [
                "Java Programming",
                "JavaScript Development",
                "Next.js",
                "Minecraft Plugin Development",
                "Web Development",
                "Software Engineering"
              ],
              "description": "Portfolio of FabledRuns, a 15-year-old developer specializing in Java, Next.js, and Minecraft plugin development.",
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
      <body className={`${poppins.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}