import { db } from "@/db";
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
        const digits = unique_code.slice(0, 5);
        const letter = unique_code.slice(5);
        const sum = Array.from(digits).reduce(
          (acc, digit) => acc + Number.parseInt(digit),
          0
        );
        const remainder = sum % 26;
        const expectedLetter = String.fromCharCode(65 + remainder); // 65 is ASCII for 'A'

        return letter === expectedLetter;
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
