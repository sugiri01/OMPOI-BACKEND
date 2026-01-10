"use client";

import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { IconCamera, IconClipboardText } from "@tabler/icons-react";

export function ProductCatalogForm({
  formData,
  handleChange,
  certificationOptions,
  packagingOptions,
}: any) {
  return (
    
    <Card className="col-span-2 shadow-sm border border-gray-200 rounded-lg bg-white">
      <CardHeader className="flex items-center justify-between px-6 py-2 border-b">
        <CardTitle className="text-xl font-bold text-gray-800">
          Product Catalog Details
        </CardTitle>
        <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
          Step 2 of 5
        </span>
      </CardHeader>

      <CardContent>
        <Alert className="bg-yellow-50 border-yellow-200">
          <AlertDescription className="text-yellow-800 text-sm">
            <div className="flex items-center gap-2 mb-1">
            <IconClipboardText className="w-5 h-5 text-yellow-600" />
            <p className="font-semibold text-yellow-900">List Your Products:</p>
            </div>
            <p>Detail the agricultural or commodity products you wish to sell on the OMPOI platform. You can add more later in the Seller Dashboard.</p>
          </AlertDescription>
        </Alert>
      </CardContent>
      
      <CardContent className="pt space-y-8">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Product Information (Primary Product)
          </h3>

          <div className="space-y-5">
            <div>
              <Label>
                Product Name <span className="text-red-600">*</span>
              </Label>
              <Input
                placeholder="e.g., Raw Cashew Nuts"
                value={formData.productName}
                onChange={(e) => handleChange("productName", e.target.value)}
                className="mt-2 bg-gray-100"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <Label>Detailed Description</Label>
                <Textarea
                  placeholder="Grade, quality, type..."
                  value={formData.detailedDescription}
                  onChange={(e) =>
                    handleChange("detailedDescription", e.target.value)
                  }
                  className="mt-2 resize-none bg-gray-100"
                  rows={3}
                />

                <Label className="mt-4 block">
                  Primary Origin <span className="text-red-600">*</span>
                </Label>
                <Select
                  onValueChange={(v) => handleChange("primaryOrigin", v)}
                  value={formData.primaryOrigin}
                >
                  <SelectTrigger className="mt-2 bg-gray-100">
                    <SelectValue placeholder="Select origin country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="india">India</SelectItem>
                    <SelectItem value="vietnam">Vietnam</SelectItem>
                    <SelectItem value="brazil">Brazil</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>
                  Quality / Grade <span className="text-red-600">*</span>
                </Label>
                <Input
                  placeholder="e.g., W320"
                  value={formData.qualityGrade}
                  onChange={(e) => handleChange("qualityGrade", e.target.value)}
                  className="mt-2 bg-gray-100"
                />
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Pricing & Logistics
          </h3>

          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <Label>
                  Target Price (USD/kg) <span className="text-red-600">*</span>
                </Label>
                <Input
                  type="number"
                  min={1}
                  placeholder="e.g., 7.50"
                  value={formData.targetPrice}
                  onChange={(e) => handleChange("targetPrice", e.target.value)}
                  className="mt-2 bg-gray-100"
                />
              </div>

              <div>
                <Label>
                  Minimum Order Quantity (MT)
                  <span className="text-red-600">*</span>
                </Label>
                <Input
                  type="number"
                  min={1}
                  placeholder="e.g., 20"
                  value={formData.minimumOrderQty}
                  onChange={(e) =>
                    handleChange("minimumOrderQty", e.target.value)
                  }
                  className="mt-2 bg-gray-100"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <Label>
                  Available Stock (MT) <span className="text-red-600">*</span>
                </Label>
                <Input
                  type="number"
                  min={1}
                  placeholder="e.g., 500"
                  value={formData.availableStock}
                  onChange={(e) =>
                    handleChange("availableStock", e.target.value)
                  }
                  className="mt-2 bg-gray-100"
                />
              </div>

              <div>
                <Label>
                  Lead Time (days) <span className="text-red-600">*</span>
                </Label>
                <Input
                  type="number"
                  min={1}
                  placeholder="e.g., 15"
                  value={formData.leadTime}
                  onChange={(e) => handleChange("leadTime", e.target.value)}
                  className="mt-2 bg-gray-100"
                />
              </div>
            </div>

            <div>
              <Label>
                Stock Location <span className="text-red-600">*</span>
              </Label>
              <Input
                placeholder="e.g., Tuticorin Port"
                value={formData.stockLocation}
                onChange={(e) =>
                  handleChange("stockLocation", e.target.value)
                }
                className="mt-2 bg-gray-100"
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Certifications & Packaging
          </h3>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <Label>
                Certifications <span className="text-red-600">*</span>
              </Label>
              <Select
                onValueChange={(v) => handleChange("certifications", v)}
                value={formData.certifications}
              >
                <SelectTrigger className="mt-2 bg-gray-100">
                  <SelectValue placeholder="Select certification" />
                </SelectTrigger>
                <SelectContent>
                  {certificationOptions.map((c: string) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>
                Packaging Options <span className="text-red-600">*</span>
              </Label>
              <Select
                onValueChange={(v) => handleChange("packaging", v)}
                value={formData.packaging}
              >
                <SelectTrigger className="mt-2 bg-gray-100">
                  <SelectValue placeholder="Select packaging" />
                </SelectTrigger>
                <SelectContent>
                  {packagingOptions.map((p: string) => (
                    <SelectItem key={p} value={p}>
                      {p}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div className="border-t pt-4 flex items-start gap-2 mb-1 text-gray-500">
          <IconCamera stroke={2} className="w-4 h-5"/>
          <small>You will be able to upload product photos and full specifications later.</small>
        </div>
      </CardContent>
    </Card>
  );
}
