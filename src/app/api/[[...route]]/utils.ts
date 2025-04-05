import { db } from "@/db";
import { isValidCode } from "@/lib/utils";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";

const utilsHandler = new Hono().get(
  "/crossed",
  zValidator(
    "query",
    z
      .object({ unique_code: z.string().regex(/^\d{5}[A-Z]{1}$/) })
      .refine(({ unique_code }) => {
        return isValidCode(unique_code);
      })
  ),
  async (c) => {
    const { unique_code } = c.req.valid("query");
    const participant = await db.query.masterTable.findFirst({
      where: (record, { eq }) => eq(record.unique_code, unique_code),
    });

    if (!participant) return c.json({ error: "Participant not found!" }, 404);

    if (participant.crossTime === null)
      return c.json(
        { error: "Participant has not crossed finished line!" },
        400
      );

    return c.json({ data: participant.name }, 200);
  }
);

export default utilsHandler;
