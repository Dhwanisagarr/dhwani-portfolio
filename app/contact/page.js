import ContactSection from '../../components/ContactSection';
import Footer from '../../components/Footer';

export const metadata = {
  title: 'Contact & Connect — Dhwani Sagar',
  description: 'Get in touch with Dhwani Sagar for project opportunities, product design inquiries, and software development.',
};

export default function ContactPage() {
  return (
    <div className="subpage-wrapper">
      <div className="subpage-header">
        <div className="container">
          <span className="eyebrow">COMMUNICATION CHANNEL</span>
          <h1 className="subpage-title font-mono">Contact</h1>
          <p className="subpage-lead">
            Open for product opportunities, design collaborations, and technical discussions.
          </p>
        </div>
      </div>

      <ContactSection />
      <Footer />
    </div>
  );
}
