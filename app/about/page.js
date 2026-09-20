import AboutSection from '../../components/AboutSection';
import WorkEduSection from '../../components/WorkEduSection';
import ExploreMoreSection from '../../components/ExploreMoreSection';
import Footer from '../../components/Footer';

export const metadata = {
  title: 'About — Dhwani Sagar',
  description: 'Learn more about Dhwani Sagar’s background in computer science, product design, and software engineering.',
};

export default function AboutPage() {
  return (
    <div className="subpage-wrapper">
      <AboutSection />
      <WorkEduSection />
      <ExploreMoreSection />
      <Footer />
    </div>
  );
}
