import BooksClient from '../../components/BooksClient';

export const metadata = {
  title: 'Books & Reading Shelf — Dhwani Sagar',
  description: 'A personal collection of books, notes, and ideas that shape how Dhwani Sagar thinks, designs, and builds.',
  openGraph: {
    title: 'Books & Reading Shelf — Dhwani Sagar',
    description: 'A personal collection of books, notes, and ideas that shape how Dhwani Sagar thinks, designs, and builds.',
  },
};

export default function BooksPage() {
  return <BooksClient />;
}
