"use client";
import { Button } from "@/components/ui/button";
import { useGetTop10WalkathonMales } from "@/hooks/top/use-get-top-10-walkathon-males";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import React from "react";

function Top10WalkathonMales() {
  const { error, refetch } = useGetTop10WalkathonMales();

  const generatePDF = async (
    data: {
      unique_code: string;
      name: string;
      email: string;
      phone_no: string;
      time_crossed: string | null;
    }[]
  ) => {
    const bodyValues = data.map(
      ({ unique_code, name, email, phone_no, time_crossed }) => [
        unique_code,
        name,
        email,
        phone_no,
        time_crossed ? new Date(time_crossed).toLocaleString() : null,
      ]
    );

    const doc = new jsPDF({ orientation: "portrait" });
    const pageWidth = doc.internal.pageSize.getWidth();

    doc.setFontSize(16);
    doc.text("Top 10 Participants - Walkathon - Males", pageWidth / 2, 20, {
      align: "center",
    });
    autoTable(doc, {
      head: [["Unique Code", "Name", "Email", "Phone Number", "Time Crossed"]],
      body: bodyValues,
      theme: "striped",
      startY: 30,
    });
    doc.save("Top3-Walkathon-Males.pdf");
  };

  const handleSubmit = async () => {
    await refetch()
      .then((result) => {
        if (result.status === "success" && result.data) {
          return generatePDF(result.data);
        }
        if (result.status === "error") console.error(error);
      })
      .catch((err) => {
        console.error("Failed in fetching or generating PDF: ", err);
      });
  };

  return (
    <div>
      <Button
        className="text-base py-6 w-full"
        variant="noShadow"
        onClick={handleSubmit}
      >
        Top 10 Walkathon - Males
      </Button>
    </div>
  );
}

export default Top10WalkathonMales;
