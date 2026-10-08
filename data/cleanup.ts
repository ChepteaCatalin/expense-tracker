import "server-only";

import { sql } from "@/lib/neon";
import { deleteStaleRateLimits } from "@/lib/rate-limit";

export async function deleteExpiredAuthData() {
  await Promise.all([
    sql`DELETE FROM session WHERE "expiresAt" < now()`,
    sql`DELETE FROM verification WHERE "expiresAt" < now()`,
    deleteStaleRateLimits(),
  ]);
}
