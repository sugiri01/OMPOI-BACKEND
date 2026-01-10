"use client";
import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { IconChecklist, IconClock, IconStopwatch } from "@tabler/icons-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function DocumentsSummary({
  uploads,
  uploadedRequiredCount,
  uploadProgress,
}: any) {
  return (
    <div>
    <Card className="shadow-sm border border-gray-200 rounded-lg">
      <CardHeader className="border-b">
        <CardTitle className="flex gap-2 items-center text-xl font-bold pt-1">
          Required Documents Checklist
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="mb-4">
          <div className="flex justify-between">
          <p className="text-sm font-medium text-gray-700">
            Required Uploads: 
          </p>
          <span className="font-semibold">3</span>
          </div>
          <div className="flex justify-between border-b pb-2">
          <p className="text-sm text-gray-700">
            Uploaded:{" "}
          </p>
          <span className="font-semibold text-green-600">
              {Object.values(uploads).filter((f) => f !== null).length}
            </span></div>
          <div className="flex justify-between pt-2">
          <p className="text-sm text-gray-700">
            Pending:{" "}
          </p>
          <span className="font-semibold text-red-600">
              {3 - uploadedRequiredCount}
            </span></div>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-green-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${uploadProgress}%` }}
          />
        </div>
      </CardContent>
    </Card>
    
        <Alert className="bg-yellow-100 border-yellow-300 my-6">
          <AlertDescription className="text-yellow-800 text-sm">
            <div className="flex gap-2">
              <span className="text-yellow-600 font-bold"><IconStopwatch stroke={2} className="w-5 h-5"/></span>
              <div>
                <strong>Fast Track Verification:</strong>
                <p className="mt-1">
                  Ensure your document images are clear and correctly named. Low-quality scans will delay your profile activation.
                </p>
              </div>
            </div>
          </AlertDescription>
        </Alert></div>
  );
}
