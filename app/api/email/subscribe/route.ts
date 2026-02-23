import { NextRequest, NextResponse } from "next/server";

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

    // For now, just return success
    // TODO: Integrate with Vercel Postgres when available
    // TODO: Send confirmation email via Resend

    console.log("New email signup:", { email, role, company });

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
