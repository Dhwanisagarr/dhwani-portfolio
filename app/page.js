import ScrollColorController from '../components/ScrollColorController';
import HeroSection from '../components/HeroSection';
import HomeAboutSection from '../components/HomeAboutSection';
import HomeWorkEduSection from '../components/HomeWorkEduSection';
import ProjectsSection from '../components/ProjectsSection';
import ToolsSection from '../components/ToolsSection';
import ContactSection from '../components/ContactSection';
import ExploreMoreSection from '../components/ExploreMoreSection';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <ScrollColorController />
      <HeroSection />
      <HomeAboutSection />
      <HomeWorkEduSection />
      <ProjectsSection />
      <ToolsSection />
      <ContactSection />
      <ExploreMoreSection />
      <Footer />
    </>
  );
}
