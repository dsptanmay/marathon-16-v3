import Footer from "@/components/footer";
import Header from "@/components/header";

export default function ScannerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
