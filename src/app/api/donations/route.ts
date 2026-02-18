import { NextRequest, NextResponse } from 'next/server';
import { donationManager, Donation } from '@/lib/crudOperations';

export async function GET() {
  try {
    const donations = donationManager.readAll();
    return NextResponse.json({ success: true, data: donations });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch donations' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const newDonation = donationManager.create(body);
    return NextResponse.json({ success: true, data: newDonation });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to create donation' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;
    const updatedDonation = donationManager.update(id, updateData);
    
    if (!updatedDonation) {
      return NextResponse.json({ success: false, error: 'Donation not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, data: updatedDonation });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update donation' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ success: false, error: 'Donation ID required' }, { status: 400 });
    }
    
    const deleted = donationManager.delete(id);
    
    if (!deleted) {
      return NextResponse.json({ success: false, error: 'Donation not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, message: 'Donation deleted successfully' });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to delete donation' }, { status: 500 });
  }
}
