"use client";
import React from "react";

export function RegistrationHeader() {
  return (
    <header className="bg-white border-b px-6 py-4 sticky top-0 z-10">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center text-white text-xl font-bold">
            O
          </div>
          <span className="font-bold text-xl">OMPOI Seller Platform</span>
        </div>
        <div className="flex gap-6 text-sm font-semibold">
          <button className="text-gray-700 hover:text-green-600">Support</button>
          <button className="text-gray-700 hover:text-green-600">Logout</button>
        </div>
      </div>
    </header>
  );
}
