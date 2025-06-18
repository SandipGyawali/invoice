CREATE TYPE "public"."status" AS ENUM('1', '0');--> statement-breakpoint
ALTER TABLE "roles" ADD COLUMN "status" "status" DEFAULT '1';--> statement-breakpoint
ALTER TABLE "roles" ADD COLUMN "status_ftr" varchar(50) DEFAULT '';