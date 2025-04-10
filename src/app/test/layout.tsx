import Footer from "@/components/footer";
import Header from "@/components/header";
import React from "react";

function TestLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="grow">{children}</main>
      <Footer />
    </div>
  );
}

export default TestLayout;
