"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function DocumentsFooter({ handleSubmit, isFormValid }: any) {
  const router = useRouter();

  return (
    <div className="border-t bg-white py-4 px-8 mt-auto">
      <div className="max-w-7xl mx-auto flex justify-between">
        <Button variant="outline" onClick={() => router.back()}>
          ← Previous
        </Button>

        <Button
          disabled={!isFormValid}
          onClick={handleSubmit}
          className="bg-green-600 hover:bg-green-700"
        >
          Submit for Verification →
        </Button>
      </div>
    </div>
  );
}
