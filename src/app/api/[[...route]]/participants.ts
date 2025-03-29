import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { marathonSchema } from "@/lib/form-schemas";
import { db } from "@/db";
import { masterTable } from "@/db/schema";

export const participantsHandler = new Hono().post(
  "/boys",
  zValidator("json", marathonSchema),
  async (c) => {
    const body = c.req.valid("json");

    await db.insert(masterTable).values({
      name: body.fullName,
      phone_no: body.phoneNumber,
      email: body.emailId,
      unique_code: body.uniqueCode,
      usn: body.usn,
      category: "boys",
    });
  }
);
