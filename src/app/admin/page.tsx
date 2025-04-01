import { Button } from "@/components/ui/button";
import React from "react";

function AdminPage() {
  return (
    <div className="flex flex-col p-6 justify-evenly flex-1 max-w-md">
      <div className="bg-bg p-5 rounded-base border-2 border-border flex flex-col space-y-3">
        <h1 className="text-center text-xl font-bold">
          Participant Statistics
        </h1>
        <Button variant={"noShadow"} className="text-base p-5">
          Top 20 - Boys
        </Button>
        <Button variant={"noShadow"} className="text-base p-5">
          Top 20 - Girls
        </Button>
        <Button variant={"noShadow"} className="text-base p-5">
          Top 10 - Walkathon
        </Button>
      </div>
      <div className="bg-bg p-5 rounded-base border-2 border-border flex flex-col space-y-5">
        <h1 className="text-center text-xl font-bold">
          Total Crossed Participants
        </h1>
        <Button variant={"noShadow"} className="text-base p-5">
          All Boys Participants
        </Button>
        <Button variant={"noShadow"} className="text-base p-5">
          All Girls Participants
        </Button>
        <Button variant={"noShadow"} className="text-base p-5">
          All Walkathon Participants
        </Button>
        <Button variant={"noShadow"} className="text-base p-5">
          All SIT Participants
        </Button>
      </div>
    </div>
  );
}

export default AdminPage;
