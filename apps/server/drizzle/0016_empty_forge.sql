CREATE TYPE "public"."type" AS ENUM('inclusive', 'exclusive');--> statement-breakpoint
CREATE TABLE "tax" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(50) NOT NULL,
	"rate" numeric NOT NULL,
	"type" "type" DEFAULT 'inclusive',
	"applicable_to" json DEFAULT ('[]') NOT NULL,
	"status" "status" DEFAULT '1',
	"status_ftr" varchar(50) DEFAULT ''
);
--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "status" "status" DEFAULT '1';--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "status_ftr" varchar(50) DEFAULT '';