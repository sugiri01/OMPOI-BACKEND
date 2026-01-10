"use client";
import React from "react";
import { VerificationHeader } from "./_components/VerificationHeader";
import { VerificationStatusBanner } from "./_components/VerificationStatusBanner";
import { VerificationMain } from "./_components/VerificationMain";
import { VerificationChecklist } from "./_components/VerificationChecklist";
import { VerificationSupport } from "./_components/VerificationSupport";

export default function OMPOIVerificationPage() {
  return (
    <>
      <VerificationHeader />
      <VerificationStatusBanner />
      <div className="flex-1 px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2">
              <VerificationMain />
            </div>
            <div className="col-span-1">
              <VerificationChecklist />
              <VerificationSupport />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
