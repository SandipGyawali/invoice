ALTER TABLE "product_unit" ALTER COLUMN "name" SET DATA TYPE varchar(10);--> statement-breakpoint
ALTER TABLE "product_unit" ALTER COLUMN "name" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "product_unit" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "product_unit" ADD COLUMN "name_plural" varchar(12) DEFAULT '';