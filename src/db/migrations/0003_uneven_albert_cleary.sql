ALTER TABLE "public"."master" ALTER COLUMN "category" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."category";--> statement-breakpoint
CREATE TYPE "public"."category" AS ENUM('girls', 'boys', 'walkathon_m', 'walkathon_g');--> statement-breakpoint
ALTER TABLE "public"."master" ALTER COLUMN "category" SET DATA TYPE "public"."category" USING "category"::"public"."category";