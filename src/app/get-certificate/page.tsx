"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { useGetName } from "@/hooks/use-get-name";

import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

import React, { useEffect, useState } from "react";

function GetCertificatePage() {
  const [code, setCode] = useState("");
  const [certBytes, setCertBytes] = useState<ArrayBuffer>();

  const { isLoading, status, error, refetch } = useGetName(code);

  useEffect(() => {
    const fetchCertificate = async () => {
      const certBuffer = await fetch("https://i.imgur.com/T7AMnkD.png").then(
        (img) => img.arrayBuffer()
      );
      setCertBytes(certBuffer);
    };

    fetchCertificate();
  }, []);

  const generatePDF = async (name: string) => {
    const doc = await PDFDocument.create();
    const page = doc.addPage([3508, 2481]);
    const font = await doc.embedFont(StandardFonts.TimesRomanBoldItalic);
    const fontSize = 100;
    page.setFont(font);

    const textWidth = font.widthOfTextAtSize(name, fontSize);
    const { width } = page.getSize();

    const certImage = await doc.embedPng(certBytes!);

    page.drawImage(certImage, { x: 0, y: 0, height: 2481, width: 3508 });

    page.drawText(name, {
      x: (width - textWidth) / 2,
      y: 1275,
      size: fontSize,
      color: rgb(0, 0, 0),
      font,
    });

    const pdfBytes = await doc.save();
    return pdfBytes;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { data } = await refetch();
    if (status === "error") {
      console.error(error);
      return;
    }
    if (status === "success") {
      const pdf = await generatePDF(data!);
      const blob = new Blob([pdf], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Certificate_Of_Participation-${data}.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);
    }
  };
  return (
    <div className="p-6 w-full lg:max-w-lg">
      <Card className="bg-bg min-w-full">
        <CardHeader className="text-center">
          <CardTitle>Get Your Certificate</CardTitle>
          <CardDescription>Enter your Unique Code below</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col space-y-5" onSubmit={handleSubmit}>
            <Input
              placeholder="12345A"
              onChange={(e) => setCode(e.target.value)}
            />
            <Button
              type="submit"
              className="w-full text-base py-5"
              variant={"noShadow"}
            >
              {isLoading ? "Fetching Certificate..." : "Get Certificate"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default GetCertificatePage;
