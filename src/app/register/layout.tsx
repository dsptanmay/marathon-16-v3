import Header from "@/components/header";
import Footer from "@/components/footer";

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-bg">
      <Header />
      <main className="flex-1 p-6">{children}</main>
      <Footer />
    </div>
  );
}
