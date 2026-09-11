import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import WorkEduSection from '../components/WorkEduSection';
import ProjectsSection from '../components/ProjectsSection';
import ToolsSection from '../components/ToolsSection';
import ContactSection from '../components/ContactSection';
import ExploreMoreSection from '../components/ExploreMoreSection';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <WorkEduSection />
      <ProjectsSection />
      <ToolsSection />
      <ContactSection />
      <ExploreMoreSection />
      <Footer />
    </>
  );
}
