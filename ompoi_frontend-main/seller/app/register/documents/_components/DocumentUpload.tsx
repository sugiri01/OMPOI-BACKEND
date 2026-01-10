"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { IconUpload } from "@tabler/icons-react";

export function DocumentUploadItem({
  name,
  label,
  required,
  errors,
  uploads,
  handleFileUpload,
}: any) {
  return (
    <Card className="border-gray-200">
      <CardContent className="pt-4 pb-3">
        <div className="flex justify-between items-start gap-4">
          <div>
            <p className="font-medium text-sm flex gap-2 items-center">
              {label}
              {required && (
                <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded">
                  Required
                </span>
              )}
            </p>

            {errors[name] && (
              <p className="text-xs text-red-600 mt-1">{errors[name]}</p>
            )}

            {uploads[name] && (
              <p className="text-xs text-green-700 mt-1 flex items-center gap-1">
                {uploads[name].name}
              </p>
            )}
          </div>

          <label className="cursor-pointer flex flex-col justify-center items-center w-44 h-20 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-600 hover:bg-green-50 transition">
            <IconUpload size={20} stroke={1.5} className="text-green-700" />
            <span className="text-xs text-gray-600">Upload Document</span>

            <input
              type="file"
              className="hidden"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e: any) =>
                handleFileUpload(name, e.target.files?.[0] || null)
              }
            />
          </label>
        </div>
      </CardContent>
    </Card>
  );
}
