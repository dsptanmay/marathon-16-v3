"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { fetchImageAsBase64 } from "@/lib/utils";

import { useGetName } from "@/hooks/use-get-name";

import jsPDF from "jspdf";

import React, { useState } from "react";

interface CertificateConfig {
  certificateImageUrl: string;
  name: string;
  fontFamily?: string;
  fontSize?: number;
  fontColor?: [number, number, number];
  fontStyle?: "normal" | "bold" | "italic" | "bolditalic";
}

function GetCertificatePage() {
  const [code, setCode] = useState("");
  const { isLoading, status, error, refetch } = useGetName(code);

  const generateCertificatePDF = async (
    config: CertificateConfig
  ): Promise<void> => {
    const {
      certificateImageUrl,
      name,
      fontFamily = "times",
      fontSize = 100,
      fontColor = [0, 0, 0], // Black
      fontStyle = "bolditalic",
    } = config;

    // Convert to mm (assuming 72 DPI)
    const width = 3508 * 0.3528;
    const height = 2481 * 0.3528;

    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: [width, height],
    });

    try {
      const imageBase64 = await fetchImageAsBase64(certificateImageUrl);

      doc.addImage(imageBase64, "PNG", 0, 0, width, height);

      doc.setFont(fontFamily, fontStyle);
      doc.setFontSize(fontSize);
      doc.setTextColor(fontColor[0], fontColor[1], fontColor[2]);

      const yPositionFromTop = height - 1275 * 0.3528;

      const textWidth = doc.getTextWidth(name);
      const xPosition = (width - textWidth) / 2;

      doc.text(name, xPosition, yPositionFromTop);

      const fileName = `Certificate_of_Participation-${name.replace(
        /\s+/g,
        "_"
      )}.pdf`;
      doc.save(fileName);

      return Promise.resolve();
    } catch (error) {
      console.error("Error generating certificate:", error);
      return Promise.reject(error);
    }
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await refetch()
      .then((res) => {
        if (res.status === "success" && res.data) {
          return generateCertificatePDF({
            certificateImageUrl: "https://i.imgur.com/T7AMnkD.png",
            name: res.data,
          });
        } else if (res.status === "error") console.error(res.error);
      })
      .catch((err) => {
        console.error(
          "Error during refetching or certificate generation:",
          err
        );
      });
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
              disabled={isLoading}
            >
              {isLoading ? "Fetching Certificate..." : "Get Certificate"}
            </Button>
          </form>
        </CardContent>
        {status === "error" && error && (
          <CardFooter className="text-rose-600 text-center flex flex-col items-center justify-center">
            {error.message}
          </CardFooter>
        )}
      </Card>
    </div>
  );
}

export default GetCertificatePage;
