import Footer from "@/components/footer";
import Header from "@/components/header";
import React from "react";

function GetCertificateLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default GetCertificateLayout;
