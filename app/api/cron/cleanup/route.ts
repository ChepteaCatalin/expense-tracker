import { NextResponse, type NextRequest } from "next/server";
import { deleteExpiredAuthData } from "@/data/cleanup";

// Invoked daily by Vercel Cron (see vercel.json) to enforce the retention
// periods described in the Privacy Policy.
export async function GET(request: NextRequest) {
  const secret = process.env.CRON_SECRET;

  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await deleteExpiredAuthData();
  } catch (error) {
    console.error("Cleanup failed", error);
    return NextResponse.json({ error: "Cleanup failed" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
