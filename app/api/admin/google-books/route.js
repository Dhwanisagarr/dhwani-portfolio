import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title');
  const author = searchParams.get('author');

  if (!title) {
    return NextResponse.json({ error: 'Title is required' }, { status: 400 });
  }

  try {
    const query = encodeURIComponent(`${title} ${author || ''}`);
    const googleRes = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=1`);
    const data = await googleRes.json();

    if (data.items && data.items.length > 0) {
      const volumeInfo = data.items[0].volumeInfo;
      const coverUrl = volumeInfo.imageLinks?.thumbnail?.replace('http:', 'https:') ||
                        volumeInfo.imageLinks?.smallThumbnail?.replace('http:', 'https:') || null;
      const pages = volumeInfo.pageCount || null;
      const publishedYear = volumeInfo.publishedDate ? volumeInfo.publishedDate.substring(0, 4) : null;

      return NextResponse.json({
        coverUrl,
        pages,
        year: publishedYear,
        title: volumeInfo.title || title,
        author: volumeInfo.authors ? volumeInfo.authors.join(', ') : author
      });
    }

    return NextResponse.json({ coverUrl: null, pages: null, year: null });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch from Google Books API' }, { status: 500 });
  }
}
