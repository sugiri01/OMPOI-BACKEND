"use client";

import React, { useState } from "react";
import BankHeader from "./_components/BankHeader";
import BankDetailsForm from "./_components/BankDetailsForm";
import BankStatusCard from "./_components/BankStatusCard";
import BankFooter from "./_components/BankFooter";

export default function OMPOIBankDetailsPage() {
  const [formData, setFormData] = useState({
    accountHolderName: "",
    accountNumber: "",
    reenterAccountNumber: "",
    ifscCode: "",
    bankName: "",
    accountType: "",
    bankBranchAddress: "",
  });

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const accountMismatch =
    formData.accountNumber.trim() !== "" &&
    formData.reenterAccountNumber.trim() !== "" &&
    formData.accountNumber !== formData.reenterAccountNumber;

  const isFormValid = () =>
    formData.accountHolderName.trim() !== "" &&
    formData.accountNumber.trim() !== "" &&
    formData.reenterAccountNumber.trim() !== "" &&
    formData.accountNumber === formData.reenterAccountNumber &&
    formData.ifscCode.trim() !== "" &&
    formData.bankName.trim() !== "" &&
    formData.bankBranchAddress.trim() !== "";

  const handleSubmit = () => {
    if (!isFormValid()) return;
    window.location.href = "/register/product-catalog";
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <BankHeader />
      <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-3 gap-6">
        <BankDetailsForm
          formData={formData}
          handleChange={handleChange}
          accountMismatch={accountMismatch}
        />
        <BankStatusCard />
      </div>
      <BankFooter isFormValid={isFormValid} handleSubmit={handleSubmit} />
    </div>
  );
}
