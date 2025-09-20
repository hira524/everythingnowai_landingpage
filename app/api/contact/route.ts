import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
  smsConsent: boolean;
  marketingConsent: boolean;
}

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const formData: ContactFormData = await request.json();
    
    // Validate required fields
    if (!formData.name || !formData.email || !formData.message) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Name, email, and message are required' 
        },
        { status: 400 }
      );
    }

    // Email configuration using environment variables
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_FROM,
        pass: process.env.MAIL_PASS,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.MAIL_FROM,
      to: 'info@everythingainow.com', // Your business email
      subject: `New Contact Form Submission from ${formData.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0072FF;">New Contact Form Submission</h2>
          
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${formData.name}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            ${formData.phone ? `<p><strong>Phone:</strong> ${formData.phone}</p>` : ''}
            <p><strong>SMS Consent:</strong> ${formData.smsConsent ? 'Yes' : 'No'}</p>
            <p><strong>Marketing Consent:</strong> ${formData.marketingConsent ? 'Yes' : 'No'}</p>
          </div>
          
          <div style="margin: 20px 0;">
            <h3>Message:</h3>
            <p style="background: #fff; padding: 15px; border-left: 4px solid #0072FF; margin: 10px 0;">
              ${formData.message.replace(/\n/g, '<br>')}
            </p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666;">
            <p>This email was sent from the Everything AI contact form on ${new Date().toLocaleString()}.</p>
          </div>
        </div>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // If GoHighLevel integration is needed, you can add it here
    // using the GHL_API_KEY and locationID from environment variables
    if (process.env.GHL_API_KEY && process.env.locationID) {
      try {
        const ghlResponse = await fetch('https://rest.gohighlevel.com/v1/contacts/', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.GHL_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstName: formData.name.split(' ')[0],
            lastName: formData.name.split(' ').slice(1).join(' ') || '',
            email: formData.email,
            phone: formData.phone || '',
            locationId: process.env.locationID,
            customFields: [
              {
                key: 'message',
                value: formData.message
              },
              {
                key: 'sms_consent',
                value: formData.smsConsent.toString()
              },
              {
                key: 'marketing_consent',
                value: formData.marketingConsent.toString()
              }
            ]
          }),
        });

        if (!ghlResponse.ok) {
          console.warn('GHL API error:', await ghlResponse.text());
        } else {
          console.log('Contact added to GHL successfully');
        }
      } catch (ghlError) {
        console.warn('GHL integration error:', ghlError);
        // Don't fail the whole request if GHL fails
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Your message has been sent successfully! We will get back to you soon.'
    });

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to send message. Please try again later.' 
      },
      { status: 500 }
    );
  }
}