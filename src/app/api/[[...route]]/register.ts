import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { db } from "@/db";
import { InsertParticipantSchema, masterTable } from "@/db/schema";

const registerHandler = new Hono()
  .post(
    "/boys",
    zValidator("json", InsertParticipantSchema.omit({ category: true })),
    async (c) => {
      const body = c.req.valid("json");
      const res = await db
        .insert(masterTable)
        .values({
          name: body.name,
          phone_no: body.phone_no,
          email: body.email,
          unique_code: body.unique_code,
          usn: body.usn,
          isSitian: body.isSitian,
          category: "boys",
        })
        .returning();
      if (res.length === 0)
        return c.json({ error: "Unable to register participant" }, 400);

      return c.json({ data: res[0] }, 201);
    }
  )
  .post(
    "/girls",
    zValidator("json", InsertParticipantSchema.omit({ category: true })),
    async (c) => {
      const body = c.req.valid("json");

      const res = await db
        .insert(masterTable)
        .values({
          name: body.name,
          phone_no: body.phone_no,
          email: body.email,
          unique_code: body.unique_code,
          usn: body.usn,
          isSitian: body.isSitian,
          category: "girls",
        })
        .returning();
      if (res.length === 0)
        return c.json({ error: "Unable to register participant" }, 400);

      return c.json({ data: res[0] }, 201);
    }
  )
  .post(
    "/walkathon",
    zValidator(
      "json",
      InsertParticipantSchema.omit({
        category: true,
        usn: true,
        isSitian: true,
      })
    ),
    async (c) => {
      const body = c.req.valid("json");

      const res = await db
        .insert(masterTable)
        .values({ ...body, category: "walkathon", usn: null, isSitian: null })
        .returning();

      if (res.length === 0)
        return c.json({ error: "Unable to register participant" }, 400);

      return c.json({ data: res[0] }, 201);
    }
  );

export default registerHandler;
