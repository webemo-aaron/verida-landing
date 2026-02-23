import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: NextRequest) {
  try {
    const { email, role, company, recaptchaToken } = await request.json();

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Verify reCAPTCHA token
    if (!recaptchaToken) {
      return NextResponse.json(
        { error: "reCAPTCHA validation failed" },
        { status: 400 }
      );
    }

    const recaptchaResponse = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
      }
    );

    const recaptchaData = await recaptchaResponse.json();
    console.log("reCAPTCHA verification response:", recaptchaData);

    // Check if reCAPTCHA verification was successful and score is acceptable
    if (!recaptchaData.success || (recaptchaData.score && recaptchaData.score < 0.5)) {
      console.warn("reCAPTCHA failed or score too low:", {
        success: recaptchaData.success,
        score: recaptchaData.score,
        email,
      });
      return NextResponse.json(
        { error: "Spam detection failed. Please try again." },
        { status: 403 }
      );
    }

    // Initialize Resend with API key at runtime
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Send confirmation email via Resend
    let emailSent = false;
    
    console.log("About to send email with Resend...");
    console.log("API Key exists:", !!process.env.RESEND_API_KEY);
    console.log("API Key prefix:", process.env.RESEND_API_KEY?.substring(0, 10));
    
    try {
      console.log("Calling resend.emails.send...");
      const result = await resend.emails.send({
        from: "Verida <hello@updates.mahoosuc.solutions>",
        to: email,
        subject: "Welcome to Verida Early Access",
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
              <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
                
                <!-- Header -->
                <div style="margin-bottom: 30px;">
                  <h1 style="color: #0a0e1a; font-size: 28px; margin: 0 0 10px 0; font-weight: 600;">Welcome to Verida</h1>
                  <p style="color: #666; margin: 0; font-size: 16px;">Trusted AI Execution for Operations</p>
                </div>

                <!-- Main Content -->
                <div style="margin-bottom: 30px; line-height: 1.6;">
                  <p style="color: #333; margin: 0 0 16px 0;">Hi,</p>
                  <p style="color: #333; margin: 0 0 16px 0;">Thank you for signing up for early access to Verida. We're excited to have you join our community of operations leaders building the future of AI execution.</p>
                  ${role ? `<p style="color: #333; margin: 0 0 16px 0;"><strong>Your role:</strong> ${role}</p>` : ''}
                  ${company ? `<p style="color: #333; margin: 0 0 16px 0;"><strong>Company:</strong> ${company}</p>` : ''}
                  <p style="color: #333; margin: 0 0 16px 0;">We'll reach out shortly with:</p>
                  <ul style="color: #333; margin: 16px 0; padding-left: 20px;">
                    <li>Early access details and login credentials</li>
                    <li>A personalized onboarding session</li>
                    <li>Updates on new features and improvements</li>
                  </ul>
                </div>

                <!-- CTA -->
                <div style="margin-bottom: 30px;">
                  <a href="https://verida-landing.vercel.app" style="display: inline-block; background: #22d3ee; color: #0a0e1a; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: 600;">Visit Verida →</a>
                </div>

                <!-- Benefits -->
                <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
                  <p style="color: #0a0e1a; font-weight: 600; margin: 0 0 12px 0;">Why Verida?</p>
                  <ul style="color: #333; margin: 0; padding-left: 20px; font-size: 14px;">
                    <li>Policy-driven governance built in</li>
                    <li>Real-time verification of every action</li>
                    <li>Immutable audit trails for compliance</li>
                  </ul>
                </div>

                <!-- Footer -->
                <div style="border-top: 1px solid #eee; padding-top: 20px; color: #999; font-size: 12px;">
                  <p style="margin: 0 0 10px 0;">© 2026 Verida, Inc. All rights reserved.</p>
                  <p style="margin: 0;"><a href="https://verida-landing.vercel.app" style="color: #22d3ee; text-decoration: none;">verida-landing.vercel.app</a></p>
                  <p style="margin: 10px 0 0 0; color: #bbb; font-size: 11px;">This email was sent to ${email} because you signed up for early access.</p>
                </div>
              </div>
            </body>
          </html>
        `,
      });
      
      console.log("Resend API response:", JSON.stringify(result, null, 2));
      console.log("Result type:", typeof result);
      console.log("Result keys:", result ? Object.keys(result) : 'null');
      console.log("Email ID from data:", result?.data?.id);
      console.log("Email ID from root:", (result as any)?.id);
      emailSent = true;
    } catch (err: any) {
      console.error("RESEND ERROR - Failed to send email:", err);
      console.error("Error message:", err?.message);
      console.error("Error name:", err?.name);
      console.error("Error statusCode:", err?.statusCode);
      console.error("Full error object:", JSON.stringify(err, Object.getOwnPropertyNames(err), 2));
      // Continue execution - don't fail the whole request
    }

    // TODO: Store in Vercel Postgres when available
    console.log("New email signup:", { email, role, company, emailSent });

    return NextResponse.json(
      {
        success: true,
        message: "Check your email for confirmation",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Email subscription error:", error);
    return NextResponse.json(
      { error: "Failed to process subscription" },
      { status: 500 }
    );
  }
}
