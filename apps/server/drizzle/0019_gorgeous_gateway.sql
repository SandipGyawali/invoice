CREATE TABLE "clients" (
	"id" serial PRIMARY KEY NOT NULL,
	"tenant_id" varchar(36),
	"first_name" text,
	"last_name" text,
	"phone" varchar(20),
	"email" varchar(255) NOT NULL,
	"gender" varchar(10) DEFAULT 'Male',
	"dob" date,
	"address" text,
	"address2" text,
	"city" text,
	"state" text,
	"zip" varchar(20),
	"country" text,
	"vat_id" varchar(50),
	"tax_id" varchar(50),
	"status" "status" DEFAULT '1',
	"status_ftr" varchar(50) DEFAULT '',
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone,
	CONSTRAINT "clients_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "clients" ADD CONSTRAINT "clients_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;