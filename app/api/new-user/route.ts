import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, provider, providerAccountId, name, type, image } = body; // Extracting the email from the request body
  const newUser = await db.user.create({
    data: {
      email,
      provider,
      providerAccountId,
      name,
      password: '',
      type,
      image
    }
  })
  
  const response = NextResponse.json(
    { success: true, data: newUser },
    { status: 200, headers: { "content-type": "application/json" } }
  );

  return response
}