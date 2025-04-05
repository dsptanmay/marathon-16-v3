import { Hono } from "hono";

import { db } from "@/db";
import { masterTable } from "@/db/schema";
import { eq, count, isNotNull } from "drizzle-orm";

const countHandler = new Hono()
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

    const walkathonMaleCount = await db
      .select({ count: count() })
      .from(masterTable)
      .where(eq(masterTable.category, "walkathon_m"))
      .then((result) => result[0].count);

    const walkathonFemaleCount = await db
      .select({ count: count() })
      .from(masterTable)
      .where(eq(masterTable.category, "walkathon_f"))
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
          walkathon_m: walkathonMaleCount,
          walkathon_f: walkathonFemaleCount,
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

export default countHandler;
