import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const dataPath = path.join(process.cwd(), 'data', 'guest-notes.json');

export async function GET() {
  try {
    const fileData = await fs.readFile(dataPath, 'utf8');
    const notes = JSON.parse(fileData);
    return NextResponse.json(notes);
  } catch (error) {
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, role, message } = body;

    if (!name || !message) {
      return NextResponse.json(
        { error: 'Name and message are required.' },
        { status: 400 }
      );
    }

    let notes = [];
    try {
      const fileData = await fs.readFile(dataPath, 'utf8');
      notes = JSON.parse(fileData);
    } catch (e) {
      notes = [];
    }

    const newNote = {
      id: `gn-${Date.now()}`,
      name,
      role: role || 'Visitor',
      date: new Date().toISOString().split('T')[0],
      message
    };

    notes.unshift(newNote);

    await fs.writeFile(dataPath, JSON.stringify(notes, null, 2), 'utf8');

    return NextResponse.json({ success: true, note: newNote }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to save guest note.' },
      { status: 500 }
    );
  }
}
