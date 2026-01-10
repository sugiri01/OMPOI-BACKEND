"use client";
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { IconPhone, IconMail, IconClock } from "@tabler/icons-react";
import { IconAlertTriangle } from '@tabler/icons-react';

export default function RegistrationStatus({ formData, progress, registrationDate }: any) {
  return (
    <div>
    <Card className="shadow-sm top-6 mb-6">
      <CardHeader className="pt-1 border-b mt">
        <CardTitle className="text-xl font-bold">Your Registration Status</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3 mb-4 mt">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Registration Date</span>
            <span className="text-sm text-gray-600">
              {registrationDate ?? "Not registered"}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Primary Contact</span>
            <span className="text-sm text-gray-500">
              {formData.primaryContact || "Pending"}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Total Steps</span>
            <span className="text-sm text-gray-600">5</span>
          </div>

          <div className="pt-4 border-t">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Completion</span>
              <span className="text-sm font-bold">{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-teal-600 h-2 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
        </CardContent>
        </Card>
        
        <Alert className="bg-yellow-50 border-yellow-200 my-6">
          <AlertDescription className="text-yellow-800 text-sm">
            <div className="flex gap-2">
              <span className="text-yellow-600 font-bold"><IconAlertTriangle stroke={2} className="w-5 h-5"/></span>
              <div>
                <strong>Important:</strong>
                <p className="mt-1">
                  Complete all 5 steps to submit your profile for review. Incomplete profiles
                  will not be verified or activated.
                </p>
              </div>
            </div>
          </AlertDescription>
        </Alert>

         <Card>
              <CardHeader className="flex items-center">
                <IconPhone className="w-5 h-5 text-pink-600" />
                  <p className="font-semibold">Need Help?</p>
              </CardHeader>
              <CardContent className="text-sm text-gray-700">
                  <p>Support: <a href="" className="font-medium text-green-600">+91-461-2321023</a></p>
                  <p>Email: <a href="" className="font-medium text-green-600">seller@ompoi.com</a></p>
                  <p>Working Hours: <span className="font-medium">Mon-Sat, 9 AM - 6 PM IST</span> </p>
              </CardContent>
          </Card>
    </div>
  );
}
