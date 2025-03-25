import React from "react";

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center justify-between p-4 bg-gray-100 w-full">
        <div className="text-lg font-semibold">Marathon 16.0</div>
        <div className="w-10 h-10 bg-blue-500 rounded-full"></div> {/* Logo */}
      </header>

      <main className="flex-1 overflow-y-auto w-full">{children}</main>

      <footer className="flex items-center justify-between p-4 bg-gray-100 w-full">
        <div className="text-sm">Team Pathfinder</div>
        <div className="text-sm">AY 2024-25</div>
      </footer>
    </div>
  );
}
