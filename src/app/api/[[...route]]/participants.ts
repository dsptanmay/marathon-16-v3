import { Hono } from "hono";
import { db } from "@/db";
import { masterTable } from "@/db/schema";
import { eq } from "drizzle-orm";

const participantsHandler = new Hono()
  .get("/top20/boys", async (c) => {
    const res = await db
      .select({
        unique_code: masterTable.unique_code,
        name: masterTable.name,
        email: masterTable.email,
        phone_no: masterTable.phone_no,
        time_crossed: masterTable.crossTime,
      })
      .from(masterTable)
      .where(eq(masterTable.category, "boys"))
      .orderBy(masterTable.crossTime)
      .limit(20);

    if (res.length === 0) return c.json({ error: "No records found!" }, 404);
    return c.json({ data: res }, 200);
  })
  .get("/top20/girls", async (c) => {
    const res = await db
      .select({
        unique_code: masterTable.unique_code,
        name: masterTable.name,
        email: masterTable.email,
        phone_no: masterTable.phone_no,
        time_crossed: masterTable.crossTime,
      })
      .from(masterTable)
      .where(eq(masterTable.category, "girls"))
      .orderBy(masterTable.crossTime)
      .limit(20);
    if (res.length === 0) return c.json({ error: "No records found!" }, 404);
    return c.json({ data: res }, 200);
  })
  .get("/top3/walkathon_males", async (c) => {
    const res = await db
      .select({
        unique_code: masterTable.unique_code,
        name: masterTable.name,
        email: masterTable.email,
        phone_no: masterTable.phone_no,
        time_crossed: masterTable.crossTime,
      })
      .from(masterTable)
      .where(eq(masterTable.category, "walkathon_m"))
      .orderBy(masterTable.crossTime)
      .limit(3);

    if (res.length === 0) return c.json({ error: "No records found!" }, 404);
    return c.json({ data: res }, 200);
  })
  .get("/top3/walkathon_females", async (c) => {
    const res = await db
      .select({
        unique_code: masterTable.unique_code,
        name: masterTable.name,
        email: masterTable.email,
        phone_no: masterTable.phone_no,
        time_crossed: masterTable.crossTime,
      })
      .from(masterTable)
      .where(eq(masterTable.category, "walkathon_f"))
      .orderBy(masterTable.crossTime)
      .limit(3);

    if (res.length === 0) return c.json({ error: "No records found!" }, 404);
    return c.json({ data: res }, 200);
  });

export default participantsHandler;
