CREATE TYPE "public"."priority_enum" AS ENUM('medium', 'high', 'low');--> statement-breakpoint
ALTER TABLE "tasks" ADD COLUMN "priority" "priority_enum" DEFAULT 'low';--> statement-breakpoint
ALTER TABLE "tasks" DROP COLUMN "start_date";