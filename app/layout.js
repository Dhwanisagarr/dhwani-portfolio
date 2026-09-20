import './globals.css';
import GlobalNav from '../components/GlobalNav';
import CursorDotTrail from '../components/CursorDotTrail';
import ZlandLoader from '../components/ZlandLoader';
import { ProjectModalProvider } from '../context/ProjectModalContext';
import { Analytics } from '@vercel/analytics/react';

// TODO: [DEPLOYMENT] Replace 'https://dhwanisagar.com' with your purchased custom domain once live
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://dhwanisagar.com';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#660005',
};

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Dhwani Sagar — Personal Portfolio',
  description: 'Crafting beautiful digital experiences — Product Thinking, User Experience Design, and Software Technology.',
  keywords: ['Dhwani Sagar', 'Product Design', 'Software Engineer', 'Portfolio', 'Full Stack Developer', 'India', '4RinLabs'],
  authors: [{ name: 'Dhwani Sagar' }],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Dhwani Sagar',
    description: 'Crafting beautiful digital experiences',
    url: SITE_URL,
    siteName: 'Dhwani Sagar Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Dhwani Sagar — Personal Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dhwani Sagar',
    description: 'Crafting beautiful digital experiences',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({ children }) {
  // JSON-LD Structured Data for Person & ProfilePage
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: {
      '@type': 'Person',
      name: 'Dhwani Sagar',
      url: SITE_URL,
      image: `${SITE_URL}/dhwani_portrait.jpg`,
      sameAs: [
        'https://github.com/Dhwanisagarr',
        'https://www.linkedin.com/in/dhwanisagar/',
        'https://www.4rinlabs.com/'
      ],
      jobTitle: 'Product Designer & Software Engineer',
      worksFor: {
        '@type': 'Organization',
        name: '4RinLabs'
      },
      description: 'Crafting thoughtful digital experiences at the intersection of product thinking, design, and technology.'
    }
  };

  return (
    <html lang="en" data-theme="dark" style={{ backgroundColor: '#660005' }} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Anton&family=Quicksand:wght@400;600;700&display=swap" rel="stylesheet" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* 
          TODO: [DEPLOYMENT] GOOGLE ANALYTICS / PLAUSIBLE TRACKING CODE PLACEHOLDER
          Uncomment and replace 'G-XXXXXXXXXX' with your Google Analytics Measurement ID once live:
          
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-XXXXXXXXXX');
              `,
            }}
          />
        */}
      </head>
      <body style={{ backgroundColor: '#660005', margin: 0 }}>
        <ZlandLoader />
        <ProjectModalProvider>
          <CursorDotTrail />
          <GlobalNav />
          <main id="main-content">{children}</main>
        </ProjectModalProvider>
        <Analytics />
      </body>
    </html>
  );
}
