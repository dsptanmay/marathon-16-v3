CREATE TYPE "public"."category" AS ENUM('girls', 'boys', 'walkathon');--> statement-breakpoint
CREATE TABLE "master" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"unique_code" text NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"phone_no" text NOT NULL,
	"usn" text,
	"category" "category" NOT NULL,
	"crossTime" timestamp with time zone DEFAULT now(),
	"isSitian" boolean DEFAULT false
);
