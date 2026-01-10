"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ProductCatalogHeader } from "./_components/ProductCatalogHeader";
import { ProductCatalogForm } from "./_components/ProductCatalogForm";
import { ProductCatalogSummary } from "./_components/ProductCatalogSummary";
import { ProductCatalogFooter } from "./_components/ProductCatalogFooter";


export default function ProductCatalogPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    productName: "",
    detailedDescription: "",
    primaryOrigin: "",
    qualityGrade: "",
    targetPrice: "",
    minimumOrderQty: "",
    availableStock: "",
    leadTime: "",
    stockLocation: "",
    certifications: "",
    packaging: "",
  });

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isFormValid = () => {
    return (
      formData.productName.trim() !== "" &&
      formData.primaryOrigin.trim() !== "" &&
      formData.qualityGrade.trim() !== "" &&
      Number(formData.targetPrice) > 0 &&
      Number(formData.minimumOrderQty) > 0 &&
      Number(formData.availableStock) > 0 &&
      Number(formData.leadTime) > 0 &&
      formData.stockLocation.trim() !== "" &&
      formData.certifications.trim() !== "" &&
      formData.packaging.trim() !== ""
    );
  };

  const handleSubmit = () => {
    if (!isFormValid()) return;
    console.log("Product Catalog Saved", formData);
    router.push("/register/documents");
  };

  const certificationOptions = ["RBS Certified", "FSSAI Licensed", "ISO 9001", "Organic Certified", "Fair Trade"];
  const packagingOptions = ["Jute Bags (50kg)", "PP Bags (25kg)", "Vacuum Packed", "Bulk Container"];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <ProductCatalogHeader />
      <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-3 gap-6">
        <ProductCatalogForm
        formData={formData}
        handleChange={handleChange}
        certificationOptions={certificationOptions}
        packagingOptions={packagingOptions}
      />
        <ProductCatalogSummary formData={formData} />
      </div>
      <ProductCatalogFooter {...{ handleSubmit, isFormValid }} />
    </div>
  );
}
