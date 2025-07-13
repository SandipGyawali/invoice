CREATE TABLE "product_category" (
	"id" serial PRIMARY KEY NOT NULL,
	"tenant_id" varchar,
	"product_name" text,
	"status" "status" DEFAULT '1',
	"status_ftr" varchar(50) DEFAULT ''
);
--> statement-breakpoint
CREATE TABLE "product_unit" (
	"id" serial PRIMARY KEY NOT NULL,
	"tenant_id" varchar,
	"name" varchar(12) DEFAULT '',
	"status" "status" DEFAULT '1',
	"status_ftr" varchar(50) DEFAULT ''
);
--> statement-breakpoint
CREATE TABLE "products" (
	"id" serial PRIMARY KEY NOT NULL,
	"tenant_id" varchar,
	"p_catId" integer NOT NULL,
	"p_name" text NOT NULL,
	"p_unit" integer NOT NULL,
	"p_price" numeric NOT NULL,
	"s_price" numeric NOT NULL,
	"p_description" text DEFAULT '',
	"provider_name" text DEFAULT '',
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "product_category" ADD CONSTRAINT "product_category_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_unit" ADD CONSTRAINT "product_unit_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_p_catId_product_category_id_fk" FOREIGN KEY ("p_catId") REFERENCES "public"."product_category"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_p_unit_product_unit_id_fk" FOREIGN KEY ("p_unit") REFERENCES "public"."product_unit"("id") ON DELETE no action ON UPDATE no action;