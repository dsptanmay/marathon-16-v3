"use client";
import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Html5Qrcode, Html5QrcodeResult } from "html5-qrcode";

import { updateParticipantCrossTime } from "@/actions/qrActions";

const ScannerPage = () => {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const [qrCodeElement, setQrCodeElement] = useState<any>();
  const [scanning, setScanning] = useState<boolean>(false);
  const [scannedCode, setScannedCode] = useState<string>("");

  useEffect(() => {
    setQrCodeElement(new Html5Qrcode("qr-reader"));
  }, []);

  const onScanSuccess = async (
    decodedText: string,
    decodedResult: Html5QrcodeResult
  ) => {
    const uniqueCode = decodedResult.result.text;

    try {
      updateParticipantCrossTime(uniqueCode);
      setScannedCode(uniqueCode);
      stopCamera();
    } catch (error) {
      console.error(error);
    }
  };

  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const onScanFailure = (err: any) => {
    console.error(err);
  };

  const startCamera = () => {
    qrCodeElement.start(
      { facingMode: "environment" },
      {
        fps: 15,
      },
      onScanSuccess,
      onScanFailure
    );
    setScanning(true);
  };

  const stopCamera = async () => {
    await qrCodeElement.stop();
    setScanning(false);
  };
  return (
    <div className="flex flex-col p-4 w-full space-y-3">
      <h1 className="text-3xl font-bold py-4 text-center w-full bg-background rounded-base border-2 border-border">
        Admin QR Scanner
      </h1>
      <div
        id="qr-reader"
        className="border border-border rounded-base w-full"
      ></div>
      {scanning ? (
        <Button
          className="text-xl py-6"
          variant={"noShadow"}
          onClick={() => {
            stopCamera();
          }}
        >
          Stop Camera
        </Button>
      ) : (
        <Button
          className="text-xl py-6"
          variant={"noShadow"}
          onClick={() => {
            startCamera();
          }}
        >
          Start Camera
        </Button>
      )}
      {scannedCode ? (
        <div className="w-full rounded-base p-3 bg-background border-border border-2 flex items-center justify-center">
          {scannedCode} scanned successfully!
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ScannerPage;
