"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function BankFooter({
  isFormValid,
  handleSubmit,
}: {
  isFormValid: () => boolean;
  handleSubmit: () => void;
}) {
  const router = useRouter();
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between">
        <Button variant="outline" onClick={() => router.back()}>
          ← Previous
        </Button>
        <Button
          className="bg-green-600 hover:bg-green-700"
          disabled={!isFormValid()}
          onClick={handleSubmit}
        >
          Save & Continue →
        </Button>
      </div>
    </div>
  );
}
