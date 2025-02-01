// layout.tsx or _layout.tsx in the app folder
import React from "react";
import "./globals.css";
import Header from "./header/page";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
