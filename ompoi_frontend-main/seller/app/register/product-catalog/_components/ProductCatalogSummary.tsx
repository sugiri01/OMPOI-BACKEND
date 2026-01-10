"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { IconLock, IconNotes, IconSparkles } from "@tabler/icons-react";

interface ProductCatalogSummaryProps {
  formData: {
    productName?: string;
    minimumOrderQty?: string | number;
  };
}

export function ProductCatalogSummary({ formData }: ProductCatalogSummaryProps) {
  return (
    <div>
    <Card className="shadow-sm rounded-xl border border-gray-100">
      <CardHeader className="pb-2 border-b">
        <CardTitle className="text-lg font-bold text-gray-900">
          Catalog Summary
        </CardTitle>
      </CardHeader>

      <CardContent className="text-sm text-gray-700">
        <div className="flex justify-between py-3">
          <span>Products Listed</span>
          <span className="text-gray-600 font-medium">
            1
          </span>
        </div>

        <div className="flex justify-between py-3 border-b pb-6">
          <span>Primary Commodity</span>
          <span className="text-gray-700 font-medium">
            {formData.productName?.trim() || "-"}
          </span>
        </div>

        <div className="flex justify-between py-3">
          <span>Min Order Qty</span>
          <span className="text-gray-700 font-medium">
            {formData.minimumOrderQty
              ? `${formData.minimumOrderQty} MT`
              : "-"}
          </span>
        </div>
      </CardContent>
    </Card>

      <Alert className="bg-green-50 border-green-300 my-6">
          <AlertDescription className="text-green-800 text-sm">
            <div className="flex gap-2">
              <span className="text-yellow-600 font-bold"><IconSparkles stroke={2} className="w-5 h-5"/></span>
              <div>
                <strong>Pro Tip:</strong>
                <p className="mt-1">
                  A detailed description and quality certifications dramatically increase your chances of securing a buyer. Be specific!
                </p>
              </div>
            </div>
          </AlertDescription>
        </Alert>

      <Card className="text-sm mt-4 mb-4 p-4">
        <CardTitle className="flex items-center gap-2 mb-1 pt-2">
              <IconNotes className="w-4 h-4 text-blue-500" />
              <p className="font-semibold">Listing Policy</p>
        </CardTitle>
        <CardContent className="text-gray-600">
              <p>All listed products are subject to review by the OMPOI quality team. Misrepresentation may lead to profile suspension.</p>
        </CardContent>
      </Card>
    </div>
  );
}
