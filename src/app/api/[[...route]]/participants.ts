import { Hono } from "hono";
import { db } from "@/db";
import { masterTable } from "@/db/schema";
import { eq, or, sql } from "drizzle-orm";

const participantsHandler = new Hono()
  .get("/all/boys", async (c) => {
  const res = await db
  .select({
    unique_code: masterTable.unique_code,
    name: sql<string>`TRIM(${masterTable.name})`,
    email: sql<string>`TRIM(${masterTable.email})`,
    phone_no: sql<string>`TRIM(${masterTable.phone_no})`,
    time_crossed: masterTable.crossTime,
  })
  .from(masterTable)
  .where(eq(masterTable.category, "boys"))
  .orderBy(sql`TRIM(${masterTable.name})`);

    
    if (res.length === 0) return c.json({ error: "No records found!" }, 404);
    return c.json({ data: res }, 200);
  })
  .get("/all/girls", async (c) => {
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
      .orderBy(masterTable.name);
    if (res.length === 0) return c.json({ error: "No records found!" }, 404);
    return c.json({ data: res }, 200);
  })
  .get("/all/walkathon", async (c) => {
    const res = await db
      .select({
        unique_code: masterTable.unique_code,
        name: masterTable.name,
        email: masterTable.email,
        phone_no: masterTable.phone_no,
        time_crossed: masterTable.crossTime,
      })
      .from(masterTable)
      .where(
        or(
          eq(masterTable.category, "walkathon_f"),
          eq(masterTable.category, "walkathon_m")
        )
      )
      .orderBy(masterTable.name);
    if (res.length === 0) return c.json({ error: "No records found!" }, 404);
    return c.json({ data: res }, 200);
  })
  .get("/all/sit", async (c) => {
    const res = await db
      .select({
        unique_code: masterTable.unique_code,
        name: masterTable.name,
        usn: masterTable.usn,
        phone_no: masterTable.phone_no,
        time_crossed: masterTable.crossTime,
      })
      .from(masterTable)
      .where(eq(masterTable.isSitian, true))
      .orderBy(masterTable.name);

    if (res.length === 0) return c.json({ error: "No records found!" }, 404);
    return c.json({ data: res }, 200);
  })
  .get("/all", async (c) => {
      const res = await db
          .select({
            unique_code: masterTable.unique_code,
            name: masterTable.name,
            email: masterTable.email,
            phone_no: masterTable.phone_no,
            time_crossed: masterTable.time_crossed,
          })
          .from(masterTable)
          .orderBy(masterTable.name);
      if (res.length === 0) 
        return c.json({ error: "No records found!" }, 404);
      return c.json({ data: res }, 200);
    };
  )
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
  .get("/top10/walkathon_males", async (c) => {
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
      .limit(10);

    if (res.length === 0) return c.json({ error: "No records found!" }, 404);
    return c.json({ data: res }, 200);
  })
  .get("/top10/walkathon_females", async (c) => {
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
      .limit(10);

    if (res.length === 0) return c.json({ error: "No records found!" }, 404);
    return c.json({ data: res }, 200);
  });

export default participantsHandler;
