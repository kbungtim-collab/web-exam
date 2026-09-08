import { NextResponse } from "next";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // The Google Apps Script Web App URL should be stored in environment variables
    const scriptUrl = process.env.GOOGLE_SCRIPT_URL;

    if (!scriptUrl) {
      console.error("GOOGLE_SCRIPT_URL is not set");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    // Forward the request to Google Apps Script
    const response = await fetch(scriptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (data.status === "success") {
      return NextResponse.json({ success: true });
    } else {
      throw new Error(data.message || "Failed to submit to Google Sheets");
    }
  } catch (error: any) {
    console.error("Error submitting exam:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
