import React from "react";
import NavBar from "../../components/NavBar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode,
}>) {
  return (
    <>
      <NavBar />

      {children}
    </>
  );
}
