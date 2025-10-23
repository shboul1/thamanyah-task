import {
  pgTable,
  text,
  jsonb,
  timestamp,
  varchar,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const searchCache = pgTable(
  "search_cache",
  {
    id: text("id").primaryKey(),
    queryKey: varchar("query_key", { length: 512 }).notNull(),
    data: jsonb("data"),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (t) => [
    uniqueIndex("uq_search_cache_query_key").on(t.queryKey),
    index("ix_search_cache_expires_at").on(t.expiresAt),
  ]
);
