"use client";
import { Button } from "@/components/ui/button";
import useGetAllParticipants from "@/hooks/all/use-get-all";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import React from "react";

function GetAllParticipantsButton() {
  const { error, refetch, isFetching } = useGetAllParticipants();

  const generatePDF = async (
    data: {
      unique_code: string;
      name: string;
      category: "girls" | "boys" | "walkathon_m" | "walkathon_f";
      phone_no: string;
      time_crossed: string | null;
    }[]
  ) => {
    const categoryMapping = {
      boys: "Boys Marathon",
      girls: "Girls Marathon",
      walkathon_f: "Female Walkathon",
      walkathon_m: "Male Walkathon",
    } as const;
    type categoryKey = keyof typeof categoryMapping;
    const bodyValues = data.map(
      ({ unique_code, name, category, phone_no, time_crossed }) => [
        unique_code,
        name,
        categoryMapping[category as categoryKey],
        phone_no,
        time_crossed
          ? new Date(time_crossed).toLocaleString().toUpperCase()
          : null,
      ]
    );
    const doc = new jsPDF({ orientation: "portrait" });
    const pageWidth = doc.internal.pageSize.getWidth();

    doc.setFontSize(16);
    doc.text("All Marathon Participants", pageWidth / 2, 20, {
      align: "center",
    });
    autoTable(doc, {
      head: [
        ["Unique Code", "Name", "Category", "Phone Number", "Time Crossed"],
      ],
      body: bodyValues,
      theme: "striped",
      startY: 30,
    });
    doc.save("All Participants - Marathon.pdf");
  };

  const handleSubmit = async () => {
    await refetch()
      .then((result) => {
        if (result.status === "success" && result.data) {
          return generatePDF(result.data);
        }
        if (result.status === "error" && error) {
          console.error(error);
        }
      })
      .catch((err) => console.error(err));
  };
  return (
    <div>
      <Button
        className="text-base py-6 w-full"
        variant="noShadow"
        onClick={handleSubmit}
      >
        {isFetching ? "Fetching Data..." : "All Participants"}
      </Button>
    </div>
  );
}

export default GetAllParticipantsButton;
