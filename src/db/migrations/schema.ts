import {
  pgTable,
  unique,
  uuid,
  text,
  timestamp,
  boolean,
  pgEnum,
} from "drizzle-orm/pg-core";

export const category = pgEnum("category", [
  "girls",
  "boys",
  "walkathon_m",
  "walkathon_f",
]);

export const master = pgTable(
  "master",
  {
    id: uuid().defaultRandom().primaryKey().notNull(),
    uniqueCode: text("unique_code").notNull(),
    name: text().notNull(),
    email: text().notNull(),
    phoneNo: text("phone_no").notNull(),
    usn: text(),
    category: category().notNull(),
    crossTime: timestamp({ withTimezone: true, mode: "string" }),
    isSitian: boolean().default(false),
  },
  (table) => [unique("master_unique_code_unique").on(table.uniqueCode)]
);
