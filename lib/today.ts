import "server-only";

import { cookies } from "next/headers";
import { TIME_ZONE_COOKIE, todayInTimeZone } from "@/utils/timezone";

export async function getToday(): Promise<string> {
  const cookieStore = await cookies();
  return todayInTimeZone(cookieStore.get(TIME_ZONE_COOKIE)?.value);
}
