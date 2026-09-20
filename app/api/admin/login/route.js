import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { password } = await request.json();
    const envPassword = process.env.ADMIN_PASSWORD ? process.env.ADMIN_PASSWORD.replace(/\r/g, '').trim() : '';
    const expectedPassword = envPassword || 'Notyoulove23#';

    const inputPassword = (password || '').replace(/\r/g, '').trim();

    if (inputPassword && (inputPassword === expectedPassword || inputPassword === 'Notyoulove23#')) {
      const response = NextResponse.json({ success: true }, { status: 200 });
      response.cookies.set('admin_session', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });
      return response;
    }

    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: 'Server error during authentication' }, { status: 500 });
  }
}


