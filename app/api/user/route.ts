import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { email } = body; // Extracting the email from the request body
  const existingUser = await db.user.findFirst({
    where: {
      email // Using the extracted email in the query
    }
  });
  
  const response = NextResponse.json(
    { success: true, data: existingUser },
    { status: 200, headers: { "content-type": "application/json" } }
  );

  return response
}