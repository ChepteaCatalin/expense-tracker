import "server-only";

import { neon, type NeonQueryPromise } from "@neondatabase/serverless";

const query = neon(process.env.DATABASE_URL as string);

export function sql<Row = Record<string, unknown>>(
  strings: TemplateStringsArray,
  ...params: unknown[]
): Promise<Row[]> {
  return query(strings, ...params) as Promise<Row[]>;
}

/**
 * Runs `sql` queries in order, in a single transaction, and returns the rows of
 * the last one. Pass the queries without awaiting them: they only run here.
 *
 * Read committed gives each query a fresh snapshot, so a query that follows a
 * `FOR UPDATE` lock sees everything committed by the writers it waited for.
 */
export async function sqlTransaction<Row>(
  queries: [...Promise<unknown>[], Promise<Row[]>],
): Promise<Row[]> {
  const results = await query.transaction(
    queries as unknown as NeonQueryPromise<false, false>[],
    { isolationLevel: "ReadCommitted" },
  );
  return results[results.length - 1] as Row[];
}
