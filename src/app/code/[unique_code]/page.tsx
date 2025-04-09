"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import QRCode from "qrcode";
import { isValidCode } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
        <CardTitle className="text-xl">Successfully Registered!</CardTitle>
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
      <CardFooter>
        <Link
          href={"https://chat.whatsapp.com/HbRkLUMA0qw1t3IaBLGYAm"}
          className="w-full h-full flex items-center justify-center"
        >
          <Button
            className="bg-emerald-600 text-emerald-100 w-full text-base py-8 font-bold flex flex-row sm:flex-col"
            variant={"noShadow"}
          >
            <h1>WhatsApp Group</h1>
            <h2 className="text-sm font-base">Follow for more updates</h2>
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
