"use client";

import React from "react";
import Link from "next/link";

interface DashboardHeaderProps {
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DashboardHeader({
  isMenuOpen,
  setIsMenuOpen,
}: DashboardHeaderProps) {
  return (
    <header className="bg-white border-b px-4 md:px-8 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center text-white text-xl font-bold">
          O
        </div>
        <span className="hidden md:block font-semibold text-gray-800 text-lg">
          OMPOI Seller Platform
        </span>
      </div>

      <nav className="hidden md:flex items-center gap-8 ml-auto">
        <Link
          href="/dashboard"
          className="text-green-600 font-medium hover:text-green-700"
        >
          Dashboard
        </Link>
        <Link href="/orders" className="text-gray-700 hover:text-green-700">
          Orders
        </Link>
        <Link href="/inventory" className="text-gray-700 hover:text-green-700">
          Inventory
        </Link>
        <Link href="/reports" className="text-gray-700 hover:text-green-700">
          Reports
        </Link>
        <Link href="/help" className="text-gray-700 hover:text-green-700">
          Help
        </Link>

        <div className="w-9 h-9 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
          OM
        </div>
      </nav>

      <div className="md:hidden ml-auto">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-gray-700 focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>
      </div>

      {isMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white shadow-md border-t md:hidden flex flex-col px-4 py-3 gap-2 z-50">
          <Link href="/dashboard" className="text-green-600 font-medium">
            Dashboard
          </Link>
          <Link href="/orders" className="text-gray-700 hover:text-green-700">
            Orders
          </Link>
          <Link
            href="/inventory"
            className="text-gray-700 hover:text-green-700"
          >
            Inventory
          </Link>
          <Link href="/reports" className="text-gray-700 hover:text-green-700">
            Reports
          </Link>
          <Link href="/help" className="text-gray-700 hover:text-green-700">
            Help
          </Link>
        </div>
      )}
    </header>
  );
}
