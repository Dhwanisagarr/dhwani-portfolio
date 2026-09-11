import { NextResponse } from 'next/server';

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

    // Process contact submission (e.g. logging or preparing for email integration)
    console.log('[Contact Submission Received]:', { name, email, subject, message, date: new Date().toISOString() });

    return NextResponse.json(
      { success: true, message: 'Message received successfully!' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process message submission.' },
      { status: 500 }
    );
  }
}
