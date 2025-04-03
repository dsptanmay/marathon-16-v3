import {
  pgTable,
  text,
  boolean,
  timestamp,
  uuid,
  pgEnum,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const categoryEnum = pgEnum("category", ["girls", "boys", "walkathon"]);

export const masterTable = pgTable("master", {
  id: uuid("id").primaryKey().defaultRandom(),
  unique_code: text("unique_code").notNull().unique(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone_no: text("phone_no").notNull(),
  usn: text("usn"),
  category: categoryEnum("category").notNull(),
  crossTime: timestamp("crossTime", { withTimezone: true }),
  isSitian: boolean("isSitian").default(false),
});

export const InsertParticipantSchema = createInsertSchema(masterTable).omit({
  id: true,
  crossTime: true,
});
