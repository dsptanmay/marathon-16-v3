import React from "react";

function Header() {
  return (
    <header className="flex items-center justify-between p-4 bg-gray-100 w-full drop-shadow-md">
      <div className="text-2xl font-semibold">Marathon 16.0</div>
      <div className="w-10 h-10 bg-blue-500 rounded-full"></div> {/* Logo */}
    </header>
  );
}

export default Header;
