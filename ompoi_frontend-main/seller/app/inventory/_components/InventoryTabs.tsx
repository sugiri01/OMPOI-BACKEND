"use client";

import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import InventoryTable from "./InventoryTable";
import { Product } from "@/lib/types/product";
import { Input } from "@/components/ui/input";
import { IconSettings } from "@tabler/icons-react";

interface InventoryTabsProps {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  setSelectedProduct: React.Dispatch<React.SetStateAction<Product | null>>;
  setIsUpdateDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function InventoryTabs({
  activeTab,
  setActiveTab,
  setSelectedProduct,
  setIsUpdateDialogOpen,
}: InventoryTabsProps) {
  const tabs = ["All", "Low-stock", "Out-of-stock"];

  return (
   <Tabs value={activeTab} onValueChange={setActiveTab} className="mx-16">
      <div className="flex items-center justify-between bg-white shadow-sm p-4 rounded-xl border">
        <div className="flex items-center w-1/2">
          <div className="relative w-full">
            <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 3a7.5 7.5 0 006.15 13.65z"
                />
              </svg>
            </span>
            <Input
              type="text"
              placeholder="Search products by name, grade, or origin..."
              className="pl-10 w-full bg-gray-50 border-none focus:ring-0 text-gray-700"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <TabsList className="flex gap-3 bg-transparent border-none p-0 h-auto">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className="px-4 py-2 rounded-lg font-semibold text-sm transition-all
                           data-[state=active]:bg-green-100 data-[state=active]:text-green-700
                           hover:bg-gray-100"
              >
                {tab.replace("-", " ")}
              </TabsTrigger>
            ))}
          </TabsList>

          <Button
            variant="outline"
            className="flex items-center rounded-lg text-gray-700 font-semibold border-gray-200 hover:bg-gray-50"
          >
            <IconSettings className="w-4 h-4 mr-2 text-gray-500" />
            Settings
          </Button>
        </div>
      </div>

      {tabs.map((tab) => (
        <TabsContent key={tab} value={tab} className="mt-4">
          <InventoryTable
            filter={tab}
            setSelectedProduct={setSelectedProduct}
            setIsUpdateDialogOpen={setIsUpdateDialogOpen}
          />
        </TabsContent>
      ))}
    </Tabs>
  );
}
