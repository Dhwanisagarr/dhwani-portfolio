import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const dataPath = path.join(process.cwd(), 'data', 'contact-messages.json');

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required fields.' },
        { status: 400 }
      );
    }

    let messages = [];
    try {
      const fileData = await fs.readFile(dataPath, 'utf8');
      messages = JSON.parse(fileData);
    } catch (e) {
      messages = [];
    }

    const newMessage = {
      id: `msg-${Date.now()}`,
      name: name.trim(),
      email: email.trim(),
      subject: (subject || 'General Inquiry').trim(),
      message: message.trim(),
      date: new Date().toISOString(),
      read: false
    };

    // Prepend new messages so newest appears first
    messages.unshift(newMessage);

    await fs.writeFile(dataPath, JSON.stringify(messages, null, 2), 'utf8');

    return NextResponse.json(
      { success: true, message: 'Message received successfully!', item: newMessage },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process message submission.' },
      { status: 500 }
    );
  }
}
