import ProjectsSection from '../../components/ProjectsSection';
import Footer from '../../components/Footer';

export const metadata = {
  title: 'Projects & Case Studies — Dhwani Sagar',
  description: 'Curated projects exploring product thinking, UX design, and full-stack development by Dhwani Sagar.',
};

export default function ProjectsPage() {
  return (
    <div className="subpage-wrapper">
      <div className="subpage-header">
        <div className="container">
          <span className="eyebrow">PORTFOLIO ARCHIVE</span>
          <h1 className="subpage-title font-mono">Projects & Case Studies</h1>
          <p className="subpage-lead">
            Curated systems, applications, and experiments exploring product design, user analytics, and full-stack code.
          </p>
        </div>
      </div>

      <ProjectsSection />
      <Footer />
    </div>
  );
}
