// app/api/posts/route.js
import { NextResponse } from 'next/server';
import dbConnect from '@/utils/connectDb';
import Post from '@/models/Post';

// Handle GET request to /api/posts
export async function GET(request) {
  await dbConnect();

  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page')) || 1;
  const limit = parseInt(searchParams.get('limit')) || 10;
  const sortBy = parseInt(searchParams.get('sortBy')) || 'createdAt';
  const sortOrder = parseInt(searchParams.get('sortOrder')) || 'desc';

  try {
    const posts = await Post.find().sort({ [sortBy]: sortOrder }) // Sorting
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
    const count = await Post.countDocuments();

    return NextResponse.json({
      success: true,
      data: posts,
      total: count,
      pages: Math.ceil(count / limit),
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

// Handle POST request to /api/posts
export async function POST(request) {
  await dbConnect();

  try {
    const body = await request.json();
    const post = await Post.create(body);
    return NextResponse.json({ success: true, data: post }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
