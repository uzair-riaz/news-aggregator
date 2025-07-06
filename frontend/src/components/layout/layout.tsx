import React from "react";
import { Outlet } from "react-router-dom";
import Header from "@/components/ui/header";

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-4">
        © {new Date().getFullYear()} My Website. All rights reserved.
      </footer>
    </div>
  );
};

export default Layout;
