import { NextRequest, NextResponse } from 'next/server';

// Mock promo data - in a real app, this would come from your database
const activePromos = [
  {
    promoCode: "PROMO10",
    title: "10% Off All Services",
    description: "Save 10% on all our digital marketing and AI services",
    discountPercentage: 10,
    expiryDate: "2025-12-31",
    minimumOrderAmount: 500,
    isActive: true
  }
];

export async function GET(request: NextRequest) {
  try {
    // Check for API key in headers
    const apiKey = request.headers.get('x-api-key') || request.headers.get('authorization');
    
    // For now, we'll allow requests without API key for the frontend
    // In production, you might want to add proper authentication
    
    // Find active promo
    const activePromo = activePromos.find(promo => promo.isActive);
    
    if (!activePromo) {
      return NextResponse.json({ 
        success: true, 
        promoCode: null,
        message: "No active promotions at this time" 
      });
    }

    // Check if promo is still valid
    const currentDate = new Date();
    const expiryDate = new Date(activePromo.expiryDate);
    
    if (currentDate > expiryDate) {
      return NextResponse.json({ 
        success: true, 
        promoCode: null,
        message: "Promotion has expired" 
      });
    }

    return NextResponse.json({
      success: true,
      promoCode: activePromo.promoCode,
      title: activePromo.title,
      description: activePromo.description,
      discountPercentage: activePromo.discountPercentage,
      expiryDate: activePromo.expiryDate,
      minimumOrderAmount: activePromo.minimumOrderAmount
    });

  } catch (error) {
    console.error('Error fetching promo code:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch promo code',
        promoCode: null 
      },
      { status: 500 }
    );
  }
}