CREATE TABLE "search_cache" (
	"id" text PRIMARY KEY NOT NULL,
	"query_key" varchar(512) NOT NULL,
	"data" jsonb,
	"expires_at" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX "uq_search_cache_query_key" ON "search_cache" USING btree ("query_key");--> statement-breakpoint
CREATE INDEX "ix_search_cache_expires_at" ON "search_cache" USING btree ("expires_at");