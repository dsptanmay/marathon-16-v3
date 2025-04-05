import Footer from "@/components/footer";
import Header from "@/components/header";
import React from "react";

function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col items-center w-full">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export default AdminLayout;
