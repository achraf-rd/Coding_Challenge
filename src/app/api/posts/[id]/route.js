// app/api/posts/[id]/route.js
import { NextResponse } from 'next/server';
import dbConnect from '@/utils/connectDb';
import Post from '@/models/Post';

// Handle PUT request to /api/posts/[id]

// Handle GET request to /api/posts/[id]
export async function GET(request,{ params }) {
  await dbConnect();
  
  const { id } = params;

  try {
    const post = await Post.findById(id);
    if (!post) {
      return NextResponse.json({ success: false, error: 'Post not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: post });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

// Handle DELETE request to /api/posts/[id]
export async function DELETE(request, { params }) {
  await dbConnect();

  const { id } = params;

  try {
    const deletedPost = await Post.findByIdAndDelete(id);
    if (!deletedPost) {
      return NextResponse.json({ success: false, error: 'Post not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

// Handle PATCH request to /api/posts/[id]
export async function PATCH(request, { params }) {
  await dbConnect();

  const { id } = params;
  const updates = await request.json();

  try {
    const updatedPost = await Post.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedPost) {
      return NextResponse.json({ success: false, error: 'Post not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: updatedPost });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

