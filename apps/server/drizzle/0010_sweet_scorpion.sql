ALTER TABLE "permissions" ADD COLUMN "description" text;--> statement-breakpoint
ALTER TABLE "permissions" ADD COLUMN "status" "status" DEFAULT '1';--> statement-breakpoint
ALTER TABLE "permissions" ADD COLUMN "status_ftr" varchar(50) DEFAULT '';