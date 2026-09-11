import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') || 'projects';

  const validTypes = ['projects', 'blogs', 'books', 'epigraphs', 'guest-notes', 'certifications'];
  if (!validTypes.includes(type)) {
    return NextResponse.json({ error: 'Invalid content type requested.' }, { status: 400 });
  }

  try {
    const filePath = path.join(process.cwd(), 'data', `${type}.json`);
    const data = await fs.readFile(filePath, 'utf8');
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { type, item } = body;

    const validTypes = ['projects', 'blogs', 'books', 'epigraphs', 'certifications'];
    if (!validTypes.includes(type) || !item) {
      return NextResponse.json({ error: 'Valid type and item payload required.' }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), 'data', `${type}.json`);
    let items = [];
    try {
      const data = await fs.readFile(filePath, 'utf8');
      items = JSON.parse(data);
    } catch (e) {
      items = [];
    }

    item.id = item.id || `${type.substring(0, 4)}-${Date.now()}`;
    items.unshift(item);

    await fs.writeFile(filePath, JSON.stringify(items, null, 2), 'utf8');

    return NextResponse.json({ success: true, item }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update CMS data store.' }, { status: 500 });
  }
}
