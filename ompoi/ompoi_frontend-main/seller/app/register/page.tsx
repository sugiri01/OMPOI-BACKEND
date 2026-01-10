"use client";

import React, { useEffect, useMemo, useState } from "react";
import { RegistrationHeader } from "./_components/RegistrationHeader";
import RegistrationProgress from "./_components/RegistrationProgress";
import RegistrationForm from "./_components/RegistrationForm";
import RegistrationStatus from "./_components/RegistrationStatus";
import RegistrationFooter from "./_components/RegistrationFooter";
import { useRouter } from "next/navigation";

type FormData = {
  companyName: string;
  businessType: string;
  country: string;
  website: string;
  primaryContact: string;
  businessPhone: string;
  businessEmail: string;
  panTaxId: string;
  gstNumber: string;
  isExporter: string;
  msmeNumber: string;
  fssaiNumber: string;
  spiceRegistration: string;
};

const initialFormData: FormData = {
  companyName: "",
  businessType: "",
  country: "",
  website: "",
  primaryContact: "",
  businessPhone: "",
  businessEmail: "",
  panTaxId: "",
  gstNumber: "",
  isExporter: "",
  msmeNumber: "",
  fssaiNumber: "",
  spiceRegistration: "",
};

const COUNTRIES = [
  "India",
  "United States",
  "United Kingdom",
  "Australia",
  "Singapore",
  "United Arab Emirates",
  "Japan",
  "China",
  "Others",
];

export default function RegisterPage() {
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [countryQuery, setCountryQuery] = useState("");
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [registrationDate, setRegistrationDate] = useState<string | null>(null);

  const [successAlert, setSuccessAlert] = useState<string | null>(null);
  const [errorAlert, setErrorAlert] = useState<string | null>(null);

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {}
  );

  useEffect(() => {
    const today = new Date();
    const formatted = today.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    setRegistrationDate(formatted);
  }, []);

  const updateField = (name: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));

    validateField(name, value);
  };

  const validators: Partial<Record<keyof FormData, (v: string) => string | null>> =
    {
      companyName: (v) => (!v.trim() ? "Company name is required" : null),
      businessType: (v) => (!v.trim() ? "Please select business type" : null),
      country: (v) => (!v.trim() ? "Please select country" : null),
      website: (v) =>
        !v.trim()
          ? "Website is required"
          : !/^https?:\/\/.+\..+/.test(v)
          ? "Use a valid url (include http/https)"
          : null,
      primaryContact: (v) => (!v.trim() ? "Primary contact is required" : null),
      businessPhone: (v) => {
        const digits = v.replace(/\D/g, "");
        if (!digits) return "Phone number is required";
        if (!(digits.length === 10 || (digits.length === 12 && digits.startsWith("91"))))
          return "Enter a valid 10-digit mobile (or +91 prefix)";
        return null;
      },
      businessEmail: (v) =>
        !v.trim()
          ? "Business email is required"
          : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
          ? "Enter a valid email"
          : null,
      panTaxId: (v) => (!v.trim() ? "PAN / Tax ID is required" : null),
      gstNumber: (v) => (!v.trim() ? "GST Number is required" : null),
      isExporter: (v) => (!v.trim() ? "Select an option" : null),
    };

   const validateField = (name: keyof FormData, value: string) => {
    const validator = validators[name];
    const msg = validator ? validator(value) : null;
    setErrors((e) => ({ ...e, ...(msg ? { [name]: msg } : { [name]: undefined }) }));
    return !msg;
  };

 const validateAll = () => {
    const required = ["companyName","businessType","country","website",
    "primaryContact","businessPhone","businessEmail","panTaxId",
    "gstNumber","isExporter"] as (keyof FormData)[];

    let ok = true;
    const newErr: any = {};

    required.forEach((k) => {
      const v = formData[k];
      const msg = validators[k]?.(v);
      if (msg) { ok = false; newErr[k] = msg; }
    });

    setErrors(newErr);
    return ok;
  };

  const handlePhoneChange = (raw: string) => {

    let v = raw.replace(/[^\d+]/g, "");
    if (v.startsWith("91") && !v.startsWith("+")) {
      v = "+" + v;
    }
    if (v.startsWith("+91")) {
      v = "+" + v.replace(/[^\d]/g, "").slice(0, 12);
    } else {
      v = v.replace(/[^\d]/g, "").slice(0, 10);
    }

    const digits = v.replace(/[^\d]/g, "");
    let display = v;
    if (v.startsWith("+91")) {
      const d = digits.slice(2);
      if (d.length <= 5) display = `+91-${d}`;
      else display = `+91-${d.slice(0, 5)}-${d.slice(5, 10)}`;
    } else {
      if (digits.length <= 5) display = digits;
      else display = `${digits.slice(0, 5)}-${digits.slice(5, 10)}`;
    }

    updateField("businessPhone", display);
  };

  const handleBusinessTypeChange = (value: string) => {
    updateField("businessType", value);
  };

  const handleCountrySelect = (country: string) => {
    updateField("country", country);
    setIsCountryOpen(false);
    setCountryQuery("");
  };

  const filteredCountries = useMemo(() => {
    if (!countryQuery) return COUNTRIES;
    return COUNTRIES.filter((c) =>
      c.toLowerCase().includes(countryQuery.toLowerCase())
    );
  }, [countryQuery]);

  const progress = useMemo(() => {
    const requiredKeys: (keyof FormData)[] = [
      "companyName",
      "businessType",
      "country",
      "website",
      "primaryContact",
      "businessPhone",
      "businessEmail",
      "panTaxId",
      "gstNumber",
      "isExporter",
    ];
    const filled = requiredKeys.filter((k) => {
      const v = (formData[k] ?? "") as string;
      return v.toString().trim() !== "";
    }).length;
    return Math.round((filled / requiredKeys.length) * 100);
  }, [formData]);

  const handleSaveAndContinue = async () => {
    setSuccessAlert(null);
    setErrorAlert(null);

    if (!validateAll()) {
      setErrorAlert("Some required fields are missing or invalid.");
      return;
    }

    try {
      console.log("Submitting:", formData);

      setSuccessAlert("Registration details saved successfully!");
      router.push("/register/bank-details");
      
    } catch (err) {
      console.error(err);
      setErrorAlert("Unable to save registration. Try again later.");
    }
  };

  const isFormValidForSubmit = useMemo(() => {
    const requiredKeys: (keyof FormData)[] = [
      "companyName",
      "businessType",
      "country",
      "website",
      "primaryContact",
      "businessPhone",
      "businessEmail",
      "panTaxId",
      "gstNumber",
      "isExporter",
    ];
    return requiredKeys.every((k) => {
      const value = (formData[k] ?? "") as string;
      const validator = validators[k];
      if (!validator) return value.toString().trim() !== "";
      const msg = validator(value);
      return !msg;
    });
  }, [formData]);

  return (
   <div className="min-h-screen bg-gray-50">
      <RegistrationHeader />
      <RegistrationProgress progress={progress} />

      <div className="max-w-7xl mx-auto px-6 py-6 pb-20 grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <RegistrationForm
            {...{
              formData,
              errors,
              updateField,
              handleBusinessTypeChange,
              handleCountrySelect,
              handlePhoneChange,
              filteredCountries,
              isCountryOpen,
              setIsCountryOpen,
              countryQuery,
              setCountryQuery,
            }}
          />
        </div>

        <div>
          <RegistrationStatus formData={formData} progress={progress} registrationDate={registrationDate} />
        </div>
      </div>

      <RegistrationFooter handleSaveAndContinue={handleSaveAndContinue} isFormValidForSubmit={isFormValidForSubmit} />
    </div>
  );
}