import ProjectsPageClient from '../../components/ProjectsPageClient';
import Footer from '../../components/Footer';

export const metadata = {
  title: 'Projects & Case Studies — Dhwani Sagar',
  description: 'Curated projects exploring product thinking, UX design, and full-stack development by Dhwani Sagar.',
};

export default function ProjectsPage() {
  return (
    <div className="p-page-wrapper">
      <ProjectsPageClient />
      <Footer />
    </div>
  );
}
