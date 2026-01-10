"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function RegistrationFooter({ handleSaveAndContinue, isFormValidForSubmit }: any) {
  const router = useRouter();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="text-sm text-gray-600">
          Need help?{" "}
          <a href="mailto:seller@ompoi.com" className="text-green-600 font-medium hover:underline">
            Contact Support
          </a>{" "}
          • Call:{" "}
          <a href="tel:+914612321023" className="text-green-600 font-medium hover:underline">
            +91-461-2321023
          </a>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" className="px-6 py-2.5 text-sm" onClick={() => router.back()}>
            ← Previous
          </Button>
          <Button
            onClick={handleSaveAndContinue}
            className="px-6 py-2.5 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
            disabled={!isFormValidForSubmit}
          >
            Save & Continue →
          </Button>
        </div>
      </div>
    </div>
  );
}
