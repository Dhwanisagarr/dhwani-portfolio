import AboutSection from '../../components/AboutSection';
import WorkEduSection from '../../components/WorkEduSection';
import ToolsSection from '../../components/ToolsSection';
import Footer from '../../components/Footer';

export const metadata = {
  title: 'About — Dhwani Sagar',
  description: 'Learn more about Dhwani Sagar’s background in computer science, product design, and software engineering.',
};

export default function AboutPage() {
  return (
    <div className="subpage-wrapper">
      <div className="subpage-header">
        <div className="container">
          <span className="eyebrow">DHWANI SAGAR</span>
          <h1 className="subpage-title font-mono">About Me</h1>
          <p className="subpage-lead">
            Understanding people, clarifying problems, and shaping thoughtful digital software experiences.
          </p>
        </div>
      </div>

      <AboutSection />
      <WorkEduSection />
      <ToolsSection />
      <Footer />
    </div>
  );
}
