"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import fakeLogo from "../../public/fake-logo.svg";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

function HomePage() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col items-center w-full">
      <header className="bg-bg border-border border-b-2 text-mtext py-4 px-6 flex w-full flex-col sm:flex-row justify-between items-center gap-4">
        <Link href="/" className="text-3xl font-heading">
          Marathon 16.0
        </Link>
        <div className="h-11 w-24 relative">
          <Image
            src={fakeLogo}
            alt="Sponsor Logo"
            fill
            className="object-contain"
          />
        </div>
      </header>
      <div className="grow flex flex-col justify-evenly lg:py-5 sm:py-2 px-10 w-full lg:max-w-lg">
        <div>
          <Card className="shadow-none bg-bg mb-0">
            <CardHeader>
              <CardTitle>Registrations</CardTitle>
              <CardDescription>Register for the marathon</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-y-6">
              <Button
                variant={"noShadow"}
                className="py-8 font-base text-base"
                onClick={() => {
                  router.push("/register/boys");
                }}
              >
                Boys Marathon
              </Button>
              <Button
                variant={"noShadow"}
                className="py-8 font-base text-base"
                onClick={() => {
                  router.push("/register/girls");
                }}
              >
                Girls Marathon
              </Button>
              <Button
                variant={"noShadow"}
                className="py-8 font-base text-base"
                onClick={() => {
                  router.push("/register/walkathon");
                }}
              >
                Walkathon
              </Button>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card className="shadow-none bg-bg">
            <CardHeader>
              <CardTitle>Certificate</CardTitle>
              <CardDescription>Download the Certificate</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col">
              <Button
                variant={"noShadow"}
                className="py-8 font-base text-base"
                onClick={() => {
                  // router.push("/get-certificate");
                  toast.success("Test");
                }}
              >
                Get Certificate
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      <footer className="w-full bg-bg border-t-2 border-border py-4 px-6 flex flex-col sm:flex-row justify-between items-center mt-auto gap-2">
        <div className="text-center sm:text-right font-bold">
          Team Pathfinder
        </div>
        <div className="text-center sm:text-left">AY 2024-25</div>
      </footer>
    </div>
  );
}

export default HomePage;
