import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Adjust this import based on your setup
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'your-secret-key'; // Store your secret key in a .env file for security

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Validation: Ensure both email and password are provided
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // Check if user exists and if the password is valid
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 });
    }

    // Ensure the user has verified their email before logging in
    if (!user.emailVerified) {
      return NextResponse.json({ error: 'Please verify your email before logging in.' }, { status: 403 });
    }

    // Generate a JWT token (with user id and email)
    const token = jwt.sign({ id: user.id, email: user.email }, SECRET, { expiresIn: '1h' });

    // Return success response with the JWT token
    return NextResponse.json({ message: 'Login successful', token });
    
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
