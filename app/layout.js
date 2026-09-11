import './globals.css';
import GlobalNav from '../components/GlobalNav';
import CursorDotTrail from '../components/CursorDotTrail';
import ThemeString from '../components/ThemeString';
import BloopPreloader from '../components/BloopPreloader';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata = {
  title: 'Dhwani Sagar — Personal Portfolio',
  description: 'Portfolio of Dhwani Sagar — Product Thinking, User Experience Design, and Software Technology.',
  keywords: ['Dhwani Sagar', 'Product Design', 'Software Engineer', 'Portfolio', 'Full Stack Developer', 'India'],
  authors: [{ name: 'Dhwani Sagar' }],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('theme');
                  var theme = saved ? saved : 'dark';
                  document.documentElement.setAttribute('data-theme', theme);
                  document.body ? document.body.setAttribute('data-theme', theme) : null;
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body>
        <BloopPreloader mainTitle="DHWANI SAGAR" subTitle="SOFTWARE ARCHITECTURE & PRODUCT DESIGN" />
        <CursorDotTrail />
        <ThemeString />
        <GlobalNav />
        <main>{children}</main>
      </body>
    </html>
  );
}
