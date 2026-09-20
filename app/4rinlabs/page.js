import FourRinLabsClient from '../../components/FourRinLabsClient';

export const metadata = {
  title: '4RinLabs — Four Friends. One Creative Playground.',
  description: '4RinLabs was started by four friends as a creative agency designing and building websites, landing pages, e-commerce, and digital experiences.',
  openGraph: {
    title: '4RinLabs — Four Friends. One Creative Playground.',
    description: '4RinLabs was started by four friends as a creative agency designing and building websites, landing pages, e-commerce, and digital experiences.',
    images: [
      {
        url: '/images/projects/4rinlabs-preview.png',
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function FourRinLabsPage() {
  return <FourRinLabsClient />;
}
