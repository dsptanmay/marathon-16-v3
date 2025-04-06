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
    <div className="p-4 flex flex-col">
      <QRScanner onScanAction={handleScan} fps={15} />

      {scanStatus && (
        <Card
          className={`${
            scanStatus.success
              ? "bg-emerald-600 text-green-100"
              : "bg-rose-500 text-red-100"
          } mt-2 p-2 text-center`}
        >
          {scanStatus.message}
        </Card>
      )}
    </div>
  );
}
