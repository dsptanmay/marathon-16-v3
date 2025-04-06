"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import QRCode from "qrcode";
import { isValidCode } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function UniqueCodePage() {
  const params = useParams();
  const { unique_code } = params;
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");

  useEffect(() => {
    QRCode.toDataURL(unique_code as string)
      .then((url) => {
        setQrCodeUrl(url);
      })
      .catch((err) => {
        console.error("Failed to generate QR code:", err);
      });
  }, [unique_code]);
  if (!isValidCode(unique_code as string))
    return (
      <Card className="bg-rose-500">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Incorrect Code</CardTitle>
          <CardDescription className="text-base">
            Code does not match required format!
          </CardDescription>
        </CardHeader>
      </Card>
    );
  return (
    <Card className="drop-shadow-md">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">{unique_code}</CardTitle>
        <CardDescription className="text-base">
          QR for Unique Code {unique_code}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {qrCodeUrl.length !== 0 ? (
          <Image
            src={qrCodeUrl}
            alt={`QR for ${unique_code}`}
            width={100}
            height={100}
            className="flex flex-col items-center justify-center w-full border-border border-2 rounded-base"
          />
        ) : undefined}
      </CardContent>
    </Card>
  );
}
