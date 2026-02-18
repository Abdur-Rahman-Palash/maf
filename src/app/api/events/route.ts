import { NextRequest, NextResponse } from 'next/server';
import { eventManager, Event } from '@/lib/crudOperations';

export async function GET() {
  try {
    const events = eventManager.readAll();
    return NextResponse.json({ success: true, data: events });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch events' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const newEvent = eventManager.create(body);
    return NextResponse.json({ success: true, data: newEvent });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to create event' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;
    const updatedEvent = eventManager.update(id, updateData);
    
    if (!updatedEvent) {
      return NextResponse.json({ success: false, error: 'Event not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, data: updatedEvent });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update event' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ success: false, error: 'Event ID required' }, { status: 400 });
    }
    
    const deleted = eventManager.delete(id);
    
    if (!deleted) {
      return NextResponse.json({ success: false, error: 'Event not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, message: 'Event deleted successfully' });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to delete event' }, { status: 500 });
  }
}
