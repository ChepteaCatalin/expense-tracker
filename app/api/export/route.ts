import { NextResponse, type NextRequest } from "next/server";
import { getUserDataExport } from "@/data/export";
import { UnauthorizedError } from "@/utils/error";

export async function GET(request: NextRequest) {
  let data: Awaited<ReturnType<typeof getUserDataExport>>;

  try {
    data = await getUserDataExport();
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }
    return NextResponse.json(
      { error: "Failed to export data" },
      { status: 500 },
    );
  }

  const date = data.exportedAt.slice(0, 10);

  return new NextResponse(JSON.stringify(data, null, 2), {
    headers: {
      "Content-Type": "application/json",
      "Content-Disposition": `attachment; filename="expense-tracker-export-${date}.json"`,
      "Cache-Control": "no-store",
    },
  });
}
