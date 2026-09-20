import GuestNotesClient from '../../components/GuestNotesClient';

export const metadata = {
  title: 'Guest Notes | Dhwani Sagar',
  description: 'Leave a note, thought, or hello on the public community wall for Dhwani Sagar.',
  openGraph: {
    title: 'Guest Notes | Dhwani Sagar',
    description: 'Leave a note, thought, or hello on the public community wall for Dhwani Sagar.',
  },
};

export default function GuestNotesPage() {
  return <GuestNotesClient />;
}
