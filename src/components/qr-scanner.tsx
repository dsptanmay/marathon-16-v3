"use client";

import { useState, useEffect, useRef } from "react";
import {
  Html5Qrcode,
  Html5QrcodeScannerState,
  Html5QrcodeResult,
} from "html5-qrcode";
import { Html5QrcodeError } from "html5-qrcode/esm/core";
import { Button } from "@/components/ui/button";

interface QRScannerProps {
  onScanAction: (data: string) => Promise<void>;
  fps?: number;
}

export default function QRScanner({ onScanAction, fps = 15 }: QRScannerProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [permissionState, setPermissionState] = useState<
    "prompt" | "granted" | "denied" | "unavailable"
  >("prompt");
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const scannerId = "qr-scanner-element";

  useEffect(() => {
    // Initialize scanner on mount
    if (containerRef.current && !scannerRef.current) {
      scannerRef.current = new Html5Qrcode(scannerId);
    }

    // Check for camera permissions
    checkCameraPermission();

    // Cleanup on unmount
    return () => {
      if (
        scannerRef.current &&
        scannerRef.current.getState() === Html5QrcodeScannerState.SCANNING
      ) {
        scannerRef.current
          .stop()
          .catch((error) => console.error("Error stopping scanner:", error));
      }
      if (scannerRef.current) {
        scannerRef.current.clear();
        scannerRef.current = null;
      }
    };
  }, []);

  // Check camera permission status
  const checkCameraPermission = async () => {
    try {
      // Check if permissions API is available
      if (navigator.permissions) {
        const result = await navigator.permissions.query({
          name: "camera" as PermissionName,
        });
        setPermissionState(result.state as "prompt" | "granted" | "denied");

        // Listen for permission changes
        result.addEventListener("change", () => {
          setPermissionState(result.state as "prompt" | "granted" | "denied");
        });
      } else {
        setPermissionState("unavailable");
      }
    } catch (err) {
      console.log("Permission API not supported");
      console.error(err);
      setPermissionState("unavailable");
    }
  };

  // Request camera access explicitly
  const requestCameraAccess = async () => {
    try {
      setError(null);

      // Try to get user media to trigger permission prompt
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });

      // If successful, clean up the stream
      stream.getTracks().forEach((track) => track.stop());

      // Update permission state
      setPermissionState("granted");

      // Start scanner after permissions granted
      startScanner();
    } catch (err) {
      console.error("Camera access denied:", err);
      setError(
        "Camera permission denied. Please allow camera access and try again."
      );
      setPermissionState("denied");
    }
  };

  // Validate the 6-character code format
  const isValidQRFormat = (data: string): boolean => {
    const regex = /^\d{5}[a-zA-Z]$/;
    return regex.test(data);
  };

  const startScanner = async () => {
    if (!scannerRef.current) return;
    setError(null);

    try {
      const qrCodeSuccessCallback = async (
        decodedText: string,
        result: Html5QrcodeResult
      ) => {
        console.log(result);
        if (isValidQRFormat(decodedText)) {
          try {
            await onScanAction(decodedText).then(() => {
              stopScanner();
            });
          } catch (err) {
            console.error("Error processing scan:", err);
            setError(
              err instanceof Error ? err.message : "Error processing scan"
            );
          }
        } else {
          setError(
            "Invalid QR code format. Expected 5 digits followed by a letter."
          );
        }
      };

      const qrCodeErrorCallback = (
        errorMessage: string,
        error: Html5QrcodeError
      ) => {
        console.error(errorMessage, error.type);
      };

      const config = {
        fps,
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0,
        formatsToSupport: [0, 1, 2, 3, 4, 5, 6, 7],
      };

      await scannerRef.current.start(
        { facingMode: "environment" },
        config,
        qrCodeSuccessCallback,
        qrCodeErrorCallback
      );

      setIsScanning(true);
    } catch (error) {
      console.error("Error starting scanner:", error);
      setError("Could not start camera. Please check permissions.");

      // If we get an error starting the scanner, check if it's a permission issue
      if (permissionState !== "granted") {
        setPermissionState("denied");
      }
    }
  };

  const stopScanner = async () => {
    if (
      scannerRef.current &&
      scannerRef.current.getState() === Html5QrcodeScannerState.SCANNING
    ) {
      await scannerRef.current.stop();
      setIsScanning(false);
    }
  };

  const toggleScanner = () => {
    // If permission is denied or unavailable, request permission first
    if (
      permissionState === "denied" ||
      permissionState === "prompt" ||
      permissionState === "unavailable"
    ) {
      requestCameraAccess();
    } else {
      // If already granted, toggle scanner
      if (isScanning) {
        stopScanner();
      } else {
        startScanner();
      }
    }
  };

  return (
    <div className="flex flex-col items-center space-y-5 h-full">
      <div className="bg-background p-4 rounded-base border-border border-2 flex flex-col items-center justify-center w-full">
        <h1 className="text-base font-bold">Participant Scanner</h1>
      </div>

      <div ref={containerRef} className="w-full max-w-md">
        <div
          id={scannerId}
          className="relative aspect-square rounded-base overflow-hidden"
        />
      </div>

      {error && (
        <div className="mb-2 p-2 bg-rose-500 text-red-100 rounded-base w-full max-w-md text-center">
          {error}
        </div>
      )}

      <Button
        onClick={toggleScanner}
        className="px-6 py-6 text-base font-bold w-full"
        variant={"noShadow"}
      >
        {isScanning
          ? "Stop Scanner"
          : permissionState === "denied"
          ? "Grant Camera Permission"
          : "Start Scanner"}
      </Button>
    </div>
  );
}
