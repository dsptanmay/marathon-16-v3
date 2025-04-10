import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Providers from "@/components/providers";

const font = DM_Sans({
  weight: ["500", "800"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Marathon 16.0",
  description: "Created by Pathfinder Volunteers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font.className} antialiased`}>
        <main>
          <Providers>{children}</Providers>
        </main>
        <Toaster />
      </body>
    </html>
  );
}
