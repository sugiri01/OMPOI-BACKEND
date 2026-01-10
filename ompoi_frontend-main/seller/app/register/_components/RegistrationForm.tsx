"use client";
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandItem,
} from "@/components/ui/command";
import { IconClipboardText } from '@tabler/icons-react';

export default function RegistrationForm({
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
}: any) {
  return (
    <Card className="shadow-sm gap-4">
      <CardHeader className="flex items-center justify-between py-2 border-b">
        <CardTitle className="text-2xl font-bold">Seller Registration Details</CardTitle>
        <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
          Step 1 of 5
        </span>
      </CardHeader>

      <CardContent className="space-y-8">
        {/* Business Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Business Information</h3>
          <div className="space-y-4">
            <div>
              <Label>Company / Business Name <span className="text-red-600">*</span></Label>
              <Input
                value={formData.companyName}
                onChange={(e) => updateField("companyName", e.target.value)}
                placeholder="Your registered company name"
                className="mt-2 bg-gray-100"
              />
              {errors.companyName && <p className="text-red-600 text-sm mt-1">{errors.companyName}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Type of Business <span className="text-red-600">*</span></Label>
                <Select
                  onValueChange={handleBusinessTypeChange}
                  value={formData.businessType}
                >
                  <SelectTrigger className="mt-2 bg-gray-100">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="proprietorship">Sole Proprietorship</SelectItem>
                    <SelectItem value="partnership">Partnership</SelectItem>
                    <SelectItem value="llp">LLP</SelectItem>
                    <SelectItem value="private">Private Limited</SelectItem>
                    <SelectItem value="public">Public Limited</SelectItem>
                  </SelectContent>
                </Select>
                {errors.businessType && <p className="text-red-600 text-sm mt-1">{errors.businessType}</p>}
              </div>

              <div>
                <Label>Country of Registration <span className="text-red-600">*</span></Label>
                <Popover open={isCountryOpen} onOpenChange={setIsCountryOpen}>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-between mt-2 bg-gray-100">
                      {formData.country || "Select country"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[300px] p-0">
                    <Command>
                      <CommandInput
                        placeholder="Search country..."
                        value={countryQuery}
                        onValueChange={setCountryQuery}
                        className="h-10"
                        autoFocus
                      />
                      <CommandList>
                        <CommandEmpty>No country found.</CommandEmpty>
                        {filteredCountries.map((c: string) => (
                          <CommandItem key={c} onSelect={() => handleCountrySelect(c)}>
                            {c}
                          </CommandItem>
                        ))}
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                {errors.country && <p className="text-red-600 text-sm mt-1">{errors.country}</p>}
              </div>
            </div>

            <div>
                      <Label htmlFor="website">
                        Company Website / Profile Link <span className="text-red-600">*</span>
                      </Label>
                      <Input
                        id="website"
                        name="website"
                        required
                        value={formData.website}
                        onChange={(e) => updateField("website", e.target.value)}
                        placeholder="e.g., https://www.yourcompany.com"
                        className="mt-2 bg-gray-100"
                      />
                      {errors.website && (
                        <p className="text-red-600 text-sm mt-1">{errors.website}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/*Contact Information*/}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Contact Information</h3>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="primaryContact">
                          Primary Contact Name <span className="text-red-600">*</span>
                        </Label>
                        <Input
                          id="primaryContact"
                          name="primaryContact"
                          required
                          value={formData.primaryContact}
                          onChange={(e) => updateField("primaryContact", e.target.value)}
                          placeholder="Full name of the person"
                          className="mt-2 bg-gray-100"
                        />
                        {errors.primaryContact && (
                          <p className="text-red-600 text-sm mt-1">{errors.primaryContact}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="businessPhone">
                          Business Phone Number <span className="text-red-600">*</span>
                        </Label>
                        <Input
                          id="businessPhone"
                          name="businessPhone"
                          required
                          value={formData.businessPhone}
                          onChange={(e) => handlePhoneChange(e.target.value)}
                          placeholder="+91-XXXXX-XXXXX"
                          className="mt-2 bg-gray-100"
                        />
                        {errors.businessPhone && (
                          <p className="text-red-600 text-sm mt-1">{errors.businessPhone}</p>
                        )}
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="businessEmail">
                        Business Email <span className="text-red-600">*</span>
                      </Label>
                      <Input
                        id="businessEmail"
                        name="businessEmail"
                        required
                        type="email"
                        value={formData.businessEmail}
                        onChange={(e) => updateField("businessEmail", e.target.value)}
                        placeholder="contact@yourcompany.com"
                        className="mt-2 bg-gray-100"
                      />
                      {errors.businessEmail && (
                        <p className="text-red-600 text-sm mt-1">{errors.businessEmail}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/*Tax & Statutory Details*/}
                <div className="pb-6 border-b">
                  <h3 className="text-lg font-semibold mb-4">Tax & Statutory Details</h3>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="panTaxId">
                          PAN / Tax ID <span className="text-red-600">*</span>
                        </Label>
                        <Input
                          id="panTaxId"
                          name="panTaxId"
                          required
                          value={formData.panTaxId}
                          onChange={(e) => updateField("panTaxId", e.target.value)}
                          placeholder="e.g., ABCDE1234F"
                          className="mt-2 bg-gray-100"
                        />
                        {errors.panTaxId && (
                          <p className="text-red-600 text-sm mt-1">{errors.panTaxId}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="gstNumber">
                          GST Number <span className="text-red-600">*</span>
                        </Label>
                        <Input
                          id="gstNumber"
                          name="gstNumber"
                          required
                          value={formData.gstNumber}
                          onChange={(e) => updateField("gstNumber", e.target.value)}
                          placeholder="e.g., 22AAAAA0000A1Z5"
                          className="mt-2 bg-gray-100"
                        />
                        {errors.gstNumber && (
                          <p className="text-red-600 text-sm mt-1">{errors.gstNumber}</p>
                        )}
                      </div>
                    </div>

                    <div className="mt-2" >
                      <Label htmlFor="isExporter">
                        Are you a registered Exporter? <span className="text-red-600">*</span>
                      </Label>
                      <Select
                        onValueChange={(v) => updateField("isExporter", v)}
                        value={formData.isExporter}
                        name="isExporter"
                        required
                        
                      >
                        <SelectTrigger aria-label="Registered Exporter" className="bg-gray-100">
                          <SelectValue placeholder="Select option" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yes">Yes</SelectItem>
                          <SelectItem value="no">No</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.isExporter && (
                        <p className="text-red-600 text-sm mt-1">{errors.isExporter}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="msmeNumber">MSME / Udyam Number</Label>
                      <Input
                        id="msmeNumber"
                        name="msmeNumber"
                        value={formData.msmeNumber}
                        onChange={(e) => updateField("msmeNumber", e.target.value)}
                        placeholder="UDYAM-XX-00-0000000"
                        className="mt-2 bg-gray-100"
                      />
                    </div>

                    <div>
                      <Label htmlFor="fssaiNumber">FSSAI License Number</Label>
                      <Input
                        id="fssaiNumber"
                        name="fssaiNumber"
                        value={formData.fssaiNumber}
                        onChange={(e) => updateField("fssaiNumber", e.target.value)}
                        placeholder="12345678901234 (if applicable)"
                        className="mt-2 bg-gray-100"
                      />
                    </div>

                    <div>
                      <Label htmlFor="spiceRegistration">SPICE Board Registration</Label>
                      <Input
                        id="spiceRegistration"
                        name="spiceRegistration"
                        value={formData.spiceRegistration}
                        onChange={(e) => updateField("spiceRegistration", e.target.value)}
                        placeholder="Registration number (if applicable)"
                        className="mt-2 bg-gray-100"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-2 text-gray-500">
                  <IconClipboardText stroke={2} />
                  <small >Fields marked with <span className="text-red-600">*</span> are required. Ensure all tax documents are valid and up-to-date for quick verification.</small>
                </div>

              </CardContent>
            </Card>
  );
}
