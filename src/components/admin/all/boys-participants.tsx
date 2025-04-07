import { Button } from "@/components/ui/button";
import useGetBoysParticipants from "@/hooks/all/use-get-boys";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import React from "react";

function GetAllBoysParticipantsButton() {
  const { error, refetch } = useGetBoysParticipants();

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
    doc.text("All Marathon Participants - Boys", pageWidth / 2, 20, {
      align: "center",
    });
    autoTable(doc, {
      head: [["Unique Code", "Name", "Email", "Phone Number", "Time Crossed"]],
      body: bodyValues,
      theme: "striped",
      startY: 30,
    });
    doc.save("All_Participants-Boys.pdf");
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
        onSubmit={handleSubmit}
      >
        All Participants - Boys
      </Button>
    </div>
  );
}

export default GetAllBoysParticipantsButton;
