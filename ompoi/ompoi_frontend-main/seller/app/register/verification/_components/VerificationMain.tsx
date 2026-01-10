"use client";
import React from "react";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export function VerificationMain() {
  const router = useRouter();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-10 flex flex-col justify-between h-full min-h-[580px]">
      <div>
        <div className="flex justify-center mb-6">
          <div className="text-6xl">⏳</div>
        </div>

        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Verification In Progress
        </h2>

        <p className="text-center text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto">
          Thank you for submitting all your registration details and documents.
          Our team is now verifying your business credentials.
          <br />
          This process typically takes{" "}
          <strong>2 to 3 business days</strong>. You will be notified via email
          once your status changes.
        </p>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-10">
          <h3 className="text-blue-900 font-semibold mb-4 text-lg">
            Next Steps:
          </h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>
                We will check your <strong>business entity</strong> against
                government records.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>
                We will verify your <strong>bank account</strong> details (via
                micro-deposit, if required).
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>
                We will review the <strong>quality</strong> of your uploaded
                documents.
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-auto pt-4">
        <button
          onClick={() => router.push("/register/documents")}
          className="px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
        >
          Review Documents
        </button>

        <button
          onClick={() => router.push("/dashboard")}
          className="px-6 py-3 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors flex items-center gap-2"
        >
          Go to Dashboard
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
