import { NextRequest, NextResponse } from 'next/server';
import { contentManager, Content } from '@/lib/crudOperations';

export async function GET() {
  try {
    const content = contentManager.readAll();
    return NextResponse.json({ success: true, data: content });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch content' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const newContent = contentManager.create(body);
    return NextResponse.json({ success: true, data: newContent });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to create content' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;
    const updatedContent = contentManager.update(id, updateData);
    
    if (!updatedContent) {
      return NextResponse.json({ success: false, error: 'Content not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, data: updatedContent });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update content' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ success: false, error: 'Content ID required' }, { status: 400 });
    }
    
    const deleted = contentManager.delete(id);
    
    if (!deleted) {
      return NextResponse.json({ success: false, error: 'Content not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, message: 'Content deleted successfully' });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to delete content' }, { status: 500 });
  }
}
