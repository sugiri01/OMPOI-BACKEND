"use client";
import React from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { IconSearch } from "@tabler/icons-react";

export function DocumentsInstructions() {
  return (
    <Alert className="bg-yellow-50 border-yellow-200 mt-4 mx-8 max-w-7xl">
      <AlertDescription className="flex items-center gap-2 text-sm text-yellow-800">
        <IconSearch size={18} />
        Upload clean, readable copies of all **required** documents. Maximum file size is 5MB per file. Accepted formats: PDF, JPG, PNG.
      </AlertDescription>
    </Alert>
  );
}
