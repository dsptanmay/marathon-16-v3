import Header from "@/components/header";
import Footer from "@/components/footer";

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
