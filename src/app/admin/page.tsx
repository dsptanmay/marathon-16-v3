import GetAllBoysParticipantsButton from "@/components/admin/all/boys-participants";
import GetAllGirlsParticipantsButton from "@/components/admin/all/girls-participants";
import GetAllSITParticipantsButton from "@/components/admin/all/sit-participants";
import GetAllWalkathonParticipantsButton from "@/components/admin/all/walkathon-participants";
import GetAllParticipantsButton from "@/components/admin/all/all-participants";
import Top20BoysButton from "@/components/admin/top/boys-20";
import Top20GirlsButton from "@/components/admin/top/girls-20";
import Top10WalkathonFemales from "@/components/admin/top/walkathon-10-females";
import Top10WalkathonMales from "@/components/admin/top/walkathon-10-males";

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
    <div className="flex flex-col p-6 gap-y-5 h-full">
      <Card className="bg-background">
        <CardHeader className="text-center">
          <CardTitle>Top Participants</CardTitle>
          <CardDescription>Fetch details of top participants</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col space-y-5">
          <Top20BoysButton />
          <Top20GirlsButton />
          <Top10WalkathonMales />
          <Top10WalkathonFemales />
        </CardContent>
      </Card>
      <Card className="bg-background">
        <CardHeader className="text-center">
          <CardTitle>All Participants</CardTitle>
          <CardDescription>Fetch details of all participants</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col space-y-5">
          <GetAllBoysParticipantsButton />
          <GetAllGirlsParticipantsButton />
          <GetAllSITParticipantsButton />
          <GetAllWalkathonParticipantsButton />
          <GetAllParticipantsButton />
        </CardContent>
      </Card>
    </div>
  );
}

export default AdminPage;
