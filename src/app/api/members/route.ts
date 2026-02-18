import { NextRequest, NextResponse } from 'next/server';
import { memberManager, Member } from '@/lib/crudOperations';

export async function GET() {
  try {
    const members = memberManager.readAll();
    return NextResponse.json({ success: true, data: members });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch members' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const newMember = memberManager.create(body);
    return NextResponse.json({ success: true, data: newMember });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to create member' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;
    const updatedMember = memberManager.update(id, updateData);
    
    if (!updatedMember) {
      return NextResponse.json({ success: false, error: 'Member not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, data: updatedMember });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update member' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ success: false, error: 'Member ID required' }, { status: 400 });
    }
    
    const deleted = memberManager.delete(id);
    
    if (!deleted) {
      return NextResponse.json({ success: false, error: 'Member not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, message: 'Member deleted successfully' });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to delete member' }, { status: 500 });
  }
}
