import React from "react";

function AdminPage() {
  return (
    <div className="flex flex-col p-6 justify-evenly flex-1 max-w-md">
      <div className="bg-bg p-5 rounded-base border-2 border-border flex flex-col">
        <h1 className="text-center text-xl font-bold">
          Participant Statistics
        </h1>
      </div>
      <div className="bg-bg p-5 rounded-base border-2 border-border flex flex-col">
        <h1 className="text-center text-xl font-bold">
          Total Crossed Participants
        </h1>
      </div>
    </div>
  );
}

export default AdminPage;
