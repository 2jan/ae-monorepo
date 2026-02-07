CREATE TYPE "public"."request_statuses" AS ENUM('draft', 'toApprove', 'cancelled', 'approved', 'rejected', 'toCompleting', 'completed', 'inProgress');--> statement-breakpoint
CREATE TABLE "city" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(128) NOT NULL,
	"voivodeship" smallint NOT NULL,
	"updatedAt" timestamp,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "request" (
	"id" serial PRIMARY KEY NOT NULL,
	"beneficiaryId" integer NOT NULL,
	"cityFromId" integer NOT NULL,
	"cityToId" integer,
	"dateFrom" date,
	"dateTo" date,
	"status" "request_statuses" DEFAULT 'draft'
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(128) NOT NULL,
	"updatedAt" timestamp,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "request" ADD CONSTRAINT "request_beneficiaryId_user_id_fk" FOREIGN KEY ("beneficiaryId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "request" ADD CONSTRAINT "request_cityFromId_city_id_fk" FOREIGN KEY ("cityFromId") REFERENCES "public"."city"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "request" ADD CONSTRAINT "request_cityToId_city_id_fk" FOREIGN KEY ("cityToId") REFERENCES "public"."city"("id") ON DELETE no action ON UPDATE no action;