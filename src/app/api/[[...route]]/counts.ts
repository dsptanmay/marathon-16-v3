import { Hono } from "hono";

import { db } from "@/db";
import { masterTable } from "@/db/schema";
import { eq, count, isNotNull } from "drizzle-orm";

export const countHandler = new Hono()
  .get("/registrations", async (c) => {
    const boysCount = await db
      .select({ count: count() })
      .from(masterTable)
      .where(eq(masterTable.category, "boys"))
      .then((result) => result[0].count);

    const girlsCount = await db
      .select({ count: count() })
      .from(masterTable)
      .where(eq(masterTable.category, "girls"))
      .then((result) => result[0].count);

    const walkathonCount = await db
      .select({ count: count() })
      .from(masterTable)
      .where(eq(masterTable.category, "walkathon"))
      .then((result) => result[0].count);

    const finishedCount = await db
      .select({ count: count() })
      .from(masterTable)
      .where(isNotNull(masterTable.crossTime))
      .then((result) => result[0].count);

    return c.json(
      {
        categories: {
          boys: boysCount,
          girls: girlsCount,
          walkathon: walkathonCount,
        },
        finished: finishedCount,
      },
      200
    );
  })
  .get("/all", async (c) => {
    const totalCount = await db
      .select({ count: count() })
      .from(masterTable)
      .then((result) => result[0].count);
    return c.json({ count: totalCount }, 200);
  });
