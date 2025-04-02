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
import React from "react";

function GetCertificatePage() {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
            <Input placeholder="12345A" />
            <Button
              type="submit"
              className="w-full text-base py-5"
              variant={"noShadow"}
            >
              Get Certificate
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default GetCertificatePage;
