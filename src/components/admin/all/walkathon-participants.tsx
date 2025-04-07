"use client";
import { Button } from "@/components/ui/button";
import useGetWalkathonParticipants from "@/hooks/all/use-get-walkathon";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import React from "react";

function GetAllWalkathonParticipantsButton() {
  const { error, refetch } = useGetWalkathonParticipants();

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
    doc.text("All Walkathon Participants", pageWidth / 2, 20, {
      align: "center",
    });
    autoTable(doc, {
      head: [["Unique Code", "Name", "Email", "Phone Number", "Time Crossed"]],
      body: bodyValues,
      theme: "striped",
      startY: 30,
    });
    doc.save("All_Participants-SIT.pdf");
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
        All Walkathon Participants
      </Button>
    </div>
  );
}

export default GetAllWalkathonParticipantsButton;
