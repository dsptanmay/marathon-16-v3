"use client";

import { useState } from "react";
import QRScanner from "@/components/qr-scanner";
import { updateParticipantCrossTime } from "@/actions/qrActions";
import { Card } from "@/components/ui/card";

export default function ScannerPage() {
  const [scanStatus, setScanStatus] = useState<{
    success?: boolean;
    message?: string;
  } | null>(null);

  const handleScan = async (data: string) => {
    try {
      // Call the server action
      await updateParticipantCrossTime(data);

      // Update UI with success message
      setScanStatus({
        success: true,
        message: `Successfully recorded cross time for ${data}`,
      });

      // Log to console
      console.log("Processed QR code:", data);
    } catch (error) {
      setScanStatus({
        success: false,
        message:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
      console.error("Error processing scan:", error);
    }
  };

  return (
    <div className="flex flex-col p-4">
      <h1 className="text-2xl font-bold mb-4">Participant Scanner</h1>

      <QRScanner onScanAction={handleScan} fps={15} />

      {scanStatus && (
        <Card
          className={`${
            scanStatus.success
              ? "bg-green-200 text-green-800"
              : "bg-rose-500 text-red-800"
          }`}
        >
          {scanStatus.message}
        </Card>
      )}
    </div>
  );
}
