"use client";
import React from "react";
import { Phone, Mail, MessageCircle, Lightbulb } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function VerificationSupport() {
  return (
    <>
      <Alert className="bg-green-50 border-green-200 mb-6">
        <AlertDescription className="text-green-800 text-sm">
          <div className="flex gap-2">
            <Lightbulb className="w-5 h-5 text-green-600 flex-shrink-0" />
            <div>
              <strong className="text-teal-700">Fast Track Status</strong>
              <p className="mt-2 text-xs leading-relaxed text-teal-800">
                Complete documents = Priority processing!
              </p>
            </div>
          </div>
        </AlertDescription>
      </Alert>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-start gap-2 mb-4">
          <Phone className="w-5 h-5 text-pink-600 flex-shrink-0 mt-0.5" />
          <h4 className="font-semibold text-sm">Verification Support</h4>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Have questions about your verification?
        </p>

        <div className="space-y-3">
          <div className="text-sm">
            <strong className="block mb-2">Contact Us:</strong>
            <div className="space-y-2 text-gray-700">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-500" />
                <span>
                  <a
                    href="verify@ompoi.com"
                    className="text-green-700 font-medium hover:underline"
                  >
                    verify@ompoi.com
                  </a>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-pink-500" />
                <span>+91-461-2321023</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-green-500" />
                <span className="text-gray-500">
                  Live Chat (9 AM - 6 PM IST)
                </span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t">
            <a
              href="#"
              className="text-sm text-green-600 font-medium hover:underline flex items-center gap-1"
            >
              💡 View Verification FAQ →
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
