import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: NextRequest) {
  try {
    const { email, role, company } = await request.json();

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
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
          <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #22d3ee; font-size: 24px; margin-bottom: 16px;">Welcome to Verida Early Access</h1>
            <p style="color: #333; line-height: 1.6; margin-bottom: 16px;">
              Thanks for your interest in Verida — Trusted AI Execution for Operations.
            </p>
            <p style="color: #333; line-height: 1.6; margin-bottom: 16px;">
              We've received your signup${role ? ` as a ${role}` : ''}${company ? ` at ${company}` : ''}.
            </p>
            <p style="color: #333; line-height: 1.6; margin-bottom: 16px;">
              We'll be in touch soon with early access details and next steps.
            </p>
            <p style="color: #666; line-height: 1.6; margin-top: 32px; font-size: 14px;">
              <strong>What makes Verida different?</strong><br/>
              Policy-driven governance · Real-time verification · Immutable audit trails
            </p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 32px 0;" />
            <p style="color: #999; font-size: 12px; line-height: 1.5;">
              Verida — Trusted AI Execution for Operations<br/>
              <a href="https://verida-landing.vercel.app" style="color: #22d3ee; text-decoration: none;">verida-landing.vercel.app</a>
            </p>
          </div>
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
