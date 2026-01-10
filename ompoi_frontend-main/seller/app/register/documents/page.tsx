"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DocumentsHeader } from "./_components/DocumentsHeader";
import { DocumentsSummary } from "./_components/DocumentsSummary";
import { DocumentsFooter } from "./_components/DocumentsFooter";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { IconSearch } from "@tabler/icons-react";

export default function OMPOIDocumentsPage() {
  const router = useRouter();
  const [uploads, setUploads] = useState<any>({
    panCard: null,
    gstCertificate: null,
    bankProof: null,
    iecCode: null,
    fssaiLicense: null,
  });
  const [errors, setErrors] = useState<any>({});

  const requiredDocs = ["panCard", "gstCertificate", "bankProof"];
  const isFormValid = requiredDocs.every((doc) => uploads[doc] !== null);
  const uploadedRequiredCount = requiredDocs.filter((d) => uploads[d]).length;
  const uploadProgress = Math.round((uploadedRequiredCount / 3) * 100);

  const handleFileUpload = (name: string, file: File | null) => {
    if (!file) return;
    const maxSize = 5 * 1024 * 1024;
    const validTypes = ["application/pdf", "image/jpeg", "image/png"];

    if (!validTypes.includes(file.type)) {
      setErrors((prev: any) => ({
        ...prev,
        [name]: "Only PDF, JPG, PNG formats allowed.",
      }));
      return;
    }

    if (file.size > maxSize) {
      setErrors((prev: any) => ({
        ...prev,
        [name]: "File size must be less than 5MB.",
      }));
      return;
    }

    setErrors((prev: any) => ({ ...prev, [name]: "" }));
    setUploads((prev: any) => ({ ...prev, [name]: file }));
  };

  const handleSubmit = () => {
    if (!isFormValid) return;
    console.log("Documents Uploaded:", uploads);
    router.push("/register/verification");
  };

  const DocumentRow = ({
    name,
    label,
    description,
    required = false,
  }: {
    name: string;
    label: string;
    description: string;
    required?: boolean;
  }) => (
    <div className="flex justify-between items-start border-b last:border-none py-5 px-6">
      <div className="w-1/2 pr-8">
        <p className="font-semibold text-gray-800">{label}</p>
        <p className="text-sm text-gray-500 mt-1 leading-relaxed">
          {description}
        </p>
      </div>

      <div className="flex items-center gap-4 w-1/2 justify-end">
        <span
          className={`text-xs font-medium px-3 py-1 rounded-full border ${
            required
              ? "bg-yellow-100 text-yellow-800 border-yellow-300"
              : "bg-gray-100 text-gray-700 border-gray-300"
          }`}
        >
          {required ? "Required" : "Optional"}
        </span>

        <label className="cursor-pointer border border-dashed border-gray-300 rounded-md px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 w-56 text-center">
          {uploads[name]
            ? uploads[name].name
            : "Click to Upload or drag & drop"}
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            className="hidden"
            onChange={(e) =>
              handleFileUpload(name, e.target.files?.[0] || null)
            }
          />
        </label>

        <span className="text-xs text-gray-400 min-w-[100px] text-right">
          PDF, JPG, PNG (Max 5MB)
        </span>
      </div>
    </div>
  );

  return (
    <div>
      <DocumentsHeader />

      <main className="max-w-7xl mx-auto w-full px-10 py-8">
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2">
            <Card className="shadow-sm border border-gray-200 w-full overflow-hidden rounded-lg">
              <div className="border-b ">
                <div className="flex items-center justify-between mb-6 pb-2 border-b">
                  <h2 className="text-2xl font-bold text-gray-800 p-4">
                    Verification Documents
                  </h2>
                  <div className="text-sm bg-yellow-100 border border-yellow-200 text-yellow-700 rounded-full px-4 py-1 mr-2 font-medium">
                    Step 4 of 5
                  </div>
                </div>

                <div className="mx-4">
                  <Alert className="bg-yellow-100 border-yellow-300 my-6">
                    <AlertDescription className="text-yellow-800 text-sm">
                      <div className="flex gap-2">
                        <span className="text-yellow-600 font-bold">
                          <IconSearch stroke={2} className="w-5 h-5" />
                        </span>
                        <div>
                          <strong>Upload Instructions:</strong>
                          <p className="mt-1">
                            Upload clean, readable copies of all **Required**
                            documents. Maximum file size is 5MB per file.
                            Accepted formats: PDF, JPG, PNG.
                          </p>
                        </div>
                      </div>
                    </AlertDescription>
                  </Alert>
                </div>
                <DocumentRow
                  name="panCard"
                  label="PAN Card / Tax ID Proof"
                  description="Required for tax verification and business entity identification."
                  required
                />
                <DocumentRow
                  name="gstCertificate"
                  label="GST / VAT Certificate"
                  description="Official registration document for indirect taxation."
                  required
                />
                <DocumentRow
                  name="bankProof"
                  label="Proof of Bank Account"
                  description="Cancelled Cheque or Bank Statement (last 3 months) showing account name and number."
                  required
                />
                <DocumentRow
                  name="iecCode"
                  label="Export-Import Code (IEC)"
                  description="Required if you are a registered exporter (as specified in Step 1)."
                />
                <DocumentRow
                  name="fssaiLicense"
                  label="FSSAI / Other License"
                  description="Food Safety license or any other sector-specific license (if applicable)."
                />
              </div>
            </Card>
          </div>

          <DocumentsSummary
            {...{ uploads, uploadedRequiredCount, uploadProgress }}
          />
        </div>
      </main>

      <DocumentsFooter {...{ handleSubmit, isFormValid }} />
    </div>
  );
}
