import "server-only";

import { neon } from "@neondatabase/serverless";

const query = neon(process.env.DATABASE_URL as string);

export function sql<Row = Record<string, unknown>>(
  strings: TemplateStringsArray,
  ...params: unknown[]
): Promise<Row[]> {
  return query(strings, ...params) as Promise<Row[]>;
}
