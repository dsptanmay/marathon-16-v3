import Footer from "@/components/footer";
import Header from "@/components/header";
import React from "react";

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 overflow-y-auto w-full p-7">{children}</main>
      <Footer />
    </div>
  );
}
