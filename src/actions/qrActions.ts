"use server";

import { masterTable } from "@/db/schema";
import { db } from "@/db";
import { eq } from "drizzle-orm";

export async function updateParticipantCrossTime(
  uniqueCode: string
): Promise<void> {
  try {
    // Validate the QR code format
    const isValidQrFormat = /^\d{5}[a-zA-Z]$/.test(uniqueCode);
    if (!isValidQrFormat) {
      throw new Error(
        "Invalid QR code format. Expected 5 digits followed by a letter."
      );
    }

    const now = new Date();
    const result = await db
      .update(masterTable)
      .set({ crossTime: now })
      .where(eq(masterTable.unique_code, uniqueCode))
      .returning({ id: masterTable.id, uniqueCode: masterTable.unique_code });

    if (result.length === 0) {
      throw new Error(`Participant with code ${uniqueCode} not found`);
    }

    console.log(
      `Updated crossTime for participant ${uniqueCode} at ${now.toISOString()}`
    );
  } catch (error) {
    console.error("Error updating participant:", error);
    throw error;
  }
}
