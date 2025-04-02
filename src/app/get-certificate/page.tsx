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
import React, { useState } from "react";

function GetCertificatePage() {
  const [code, setCode] = useState("");
  const [submittedCode, setSubmittedCode] = useState<string | null>(null);

  const { data, isLoading, isError, error, refetch } =
    useGetName(submittedCode);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmittedCode(code);
    console.log(data);
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
