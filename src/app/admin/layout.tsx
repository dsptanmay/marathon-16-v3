import Footer from "@/components/footer";
import Header from "@/components/header";
import React from "react";

function AdminPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col items-center w-full">
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default AdminPageLayout;
