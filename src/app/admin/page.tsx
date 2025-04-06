import GetAllBoysParticipantsButton from "@/components/admin/all/boys-participants";
import GetAllGirlsParticipantsButton from "@/components/admin/all/girls-participants";
import GetAllSITParticipantsButton from "@/components/admin/all/sit-participants";
import GetAllWalkathonParticipantsButton from "@/components/admin/all/walkathon-participants";
import Top20BoysButton from "@/components/admin/top/boys-20";
import Top20GirlsButton from "@/components/admin/top/girls-20";
import Top3WalkathonFemales from "@/components/admin/top/walkathon-3-females";
import Top3WalkathonMales from "@/components/admin/top/walkathon-3-males";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

function AdminPage() {
  return (
    <div className="flex flex-col p-6 space-y-5 h-full w-full">
      <Card className="bg-bg">
        <CardHeader className="text-center">
          <CardTitle>Top Participants</CardTitle>
          <CardDescription>Fetch details of top participants</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col space-y-5">
          <Top20BoysButton />
          <Top20GirlsButton />
          <Top3WalkathonMales />
          <Top3WalkathonFemales />
        </CardContent>
      </Card>
      <Card className="bg-bg">
        <CardHeader className="text-center">
          <CardTitle>All Participants</CardTitle>
          <CardDescription>Fetch details of all participants</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col space-y-5">
          <GetAllBoysParticipantsButton />
          <GetAllGirlsParticipantsButton />
          <GetAllSITParticipantsButton />
          <GetAllWalkathonParticipantsButton />
        </CardContent>
      </Card>
    </div>
  );
}

export default AdminPage;
