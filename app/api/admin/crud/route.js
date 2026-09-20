import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const VALID_TYPES = ['certifications', 'books', 'epigraphs', 'blogs', 'projects', 'guest-notes', 'contact-messages'];

function getFilePath(type) {
  return path.join(process.cwd(), 'data', `${type}.json`);
}

async function readData(type) {
  try {
    const filePath = getFilePath(type);
    const content = await fs.readFile(filePath, 'utf8');
    return JSON.parse(content);
  } catch (e) {
    return [];
  }
}

async function writeData(type, items) {
  const filePath = getFilePath(type);
  await fs.writeFile(filePath, JSON.stringify(items, null, 2), 'utf8');
}

// Check admin auth helper
function isAuthenticated(request) {
  const adminSession = request.cookies.get('admin_session')?.value;
  return adminSession === 'authenticated';
}

export async function GET(request) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') || 'projects';

  if (!VALID_TYPES.includes(type)) {
    return NextResponse.json({ error: 'Invalid content type' }, { status: 400 });
  }

  const items = await readData(type);
  return NextResponse.json(items, { status: 200 });
}

export async function POST(request) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { type, item } = await request.json();

    if (!VALID_TYPES.includes(type) || !item) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    const items = await readData(type);

    // Generate unique ID if missing
    if (!item.id) {
      const prefix = type.substring(0, 4);
      item.id = `${prefix}-${Date.now()}`;
    }

    // APPEND new entry to the END of the list as requested
    items.push(item);

    await writeData(type, items);
    return NextResponse.json({ success: true, item, items }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create item' }, { status: 500 });
  }
}

export async function PUT(request) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { type, item } = await request.json();

    if (!VALID_TYPES.includes(type) || !item || !item.id) {
      return NextResponse.json({ error: 'Invalid payload or missing item ID' }, { status: 400 });
    }

    let items = await readData(type);
    const index = items.findIndex((i) => String(i.id) === String(item.id));

    if (index === -1) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    items[index] = { ...items[index], ...item };

    await writeData(type, items);
    return NextResponse.json({ success: true, item: items[index], items }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update item' }, { status: 500 });
  }
}

export async function DELETE(request) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const id = searchParams.get('id');

    if (!VALID_TYPES.includes(type) || !id) {
      return NextResponse.json({ error: 'Invalid parameters' }, { status: 400 });
    }

    let items = await readData(type);
    const filtered = items.filter((i) => String(i.id) !== String(id));

    await writeData(type, filtered);
    return NextResponse.json({ success: true, id, items: filtered }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete item' }, { status: 500 });
  }
}
