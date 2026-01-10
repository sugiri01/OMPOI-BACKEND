"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemTitle,
} from "@/components/ui/item";
import { Label } from "@/components/ui/label";
import { IconPointFilled } from "@tabler/icons-react";
import Link from "next/link";
import React from "react";

function ContractTerms({isChecked, setIsChecked}: {isChecked: boolean, setIsChecked: (isChecked: boolean) => void}) {
  return (
    <div className="mt-6 pb-20 flex flex-col flex-wrap lg:flex-row gap-4">
      <main className="flex-2">
        <Card>
          <CardHeader className="flex flex-row justify-between border-b">
            <CardTitle>Contractual Terms</CardTitle>
            <CardDescription>
              Review and agree to the terms below
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <h1 className="font-bold text-[0.97rem]">1. Quality Parameters</h1>
            <Item variant="outline">
              <ItemContent className="grid grid-cols-2 grid-rows-4 grid-flow-col gap-x-3 [&>div]:border-b [&>div]:border-dashed [&>div]:py-2 [&>div]:items-center-safe">
                <div className="flex flex-row justify-between">
                  <p className="text-[0.8rem] text-gray-600">Product</p>
                  <p className="font-bold text-[0.91rem]">RCN W320 Benin</p>
                </div>

                <div className="flex flex-row justify-between">
                  <p className="text-[0.8rem] text-gray-600">Quantity</p>
                  <p className="font-bold text-[0.91rem]">150 MT</p>
                </div>

                <div className="flex flex-row justify-between">
                  <p className="text-[0.8rem] text-gray-600">Nut Count</p>
                  <p className="font-bold text-[0.91rem]">
                    185/kg (Max 190/kg)
                  </p>
                </div>

                <div className="flex flex-row justify-between">
                  <p className="text-[0.8rem] text-gray-600">
                    Moisture Content
                  </p>
                  <p className="font-bold text-[0.91rem]">6.5% (Max 8.0%)</p>
                </div>

                <div className="flex flex-row justify-between">
                  <p className="text-[0.8rem] text-gray-600">OT/Out-turn</p>
                  <p className="font-bold text-[0.91rem]">49 LBS</p>
                </div>

                <div className="flex flex-row justify-between">
                  <p className="text-[0.8rem] text-gray-600">Defective Nuts</p>
                  <p className="font-bold text-[0.91rem]">3.2% (Max 5.0%)</p>
                </div>

                <div className="flex flex-row justify-between">
                  <p className="text-[0.8rem] text-gray-600">Grade Assurance</p>
                  <p className="font-bold text-[0.91rem]">Premium A+</p>
                </div>

                <div className="flex flex-row justify-between">
                  <p className="text-[0.8rem] text-gray-600">Inspection</p>
                  <p className="font-bold text-[0.91rem]">Mandatory PSI</p>
                </div>
              </ItemContent>
            </Item>

            <h1 className="font-bold text-[0.97rem] mt-2">
              2. Shipping & Logistics
            </h1>
            <Item variant="outline">
              <ItemContent className="grid grid-cols-2 grid-rows-3 grid-flow-col gap-x-3 [&>div]:border-b [&>div]:border-dashed [&>div]:py-2 [&>div]:items-center-safe">
                <div className="flex flex-row justify-between">
                  <p className="text-[0.8rem] text-gray-600">Incoterm</p>
                  <p className="font-bold text-[0.91rem]">
                    CIF (Cost, Insurance & Freight)
                  </p>
                </div>

                <div className="flex flex-row justify-between">
                  <p className="text-[0.8rem] text-gray-600">Origin Port</p>
                  <p className="font-bold text-[0.91rem]">Cotonou, Benin</p>
                </div>

                <div className="flex flex-row justify-between">
                  <p className="text-[0.8rem] text-gray-600">
                    Destination Port
                  </p>
                  <p className="font-bold text-[0.91rem]">Mangalore, India</p>
                </div>

                <div className="flex flex-row justify-between">
                  <p className="text-[0.8rem] text-gray-600">Container Type</p>
                  <p className="font-bold text-[0.91rem]">5 x 20ft (Approx)</p>
                </div>

                <div className="flex flex-row justify-between">
                  <p className="text-[0.8rem] text-gray-600">
                    Estimated Shipment
                  </p>
                  <p className="font-bold text-[0.91rem]">12th Oct 2025</p>
                </div>

                <div className="flex flex-row justify-between">
                  <p className="text-[0.8rem] text-gray-600">Lead Time</p>
                  <p className="font-bold text-[0.91rem]">15 days</p>
                </div>
              </ItemContent>
              <ItemFooter>
                <p className="text-xs text-gray-600">
                  * The lead time is an estimate and may be subject to minor
                  delays due to port congestion or customs.
                </p>
              </ItemFooter>
            </Item>

            <h1 className="font-bold text-[0.97rem] mt-2">3. Payment Terms</h1>
            <Item variant="outline">
              <ItemContent>
                <Item variant="outline" className="bg-blue-50">
                  <ItemContent className="flex flex-row items-center-safe justify-start gap-x-2">
                    <span className="border-2 py-2 px-2 rounded-full w-1"></span>
                    <div>
                      <ItemTitle className="font-bold text-base">
                        100% Cash & Carry
                      </ItemTitle>
                      <ItemDescription className="text-[0.9rem]">
                        Amount Due Now: $1,111,500
                      </ItemDescription>
                    </div>
                  </ItemContent>
                  <ItemDescription className="text-[0.9rem]">
                    Selected Term
                  </ItemDescription>
                </Item>
                <Item variant="outline">
                  <ItemContent className="flex flex-row items-center-safe justify-start gap-x-2">
                    <span className="border-2 py-2 px-2 rounded-full w-1"></span>
                    <div>
                      <ItemTitle className="font-bold text-base">
                        Full Payment (100% Cash & Carry)
                      </ItemTitle>
                      <ItemDescription className="text-[0.9rem]">
                        Amount Due Later: $0 (Paid in full)
                      </ItemDescription>
                    </div>
                  </ItemContent>
                  <ItemDescription className="text-[0.9rem]">
                    Final Payment
                  </ItemDescription>
                </Item>
              </ItemContent>
              <ItemFooter>
                <Link
                  href="#"
                  className="text-blue-800 underline text-[0.8rem]"
                >
                  View complete payment schedule
                </Link>
              </ItemFooter>
            </Item>

            <h1 className="font-bold text-[0.97rem] mt-2">
              4. Cancellation & Dispute Resolution
            </h1>
            <Item variant="outline">
              <ItemContent className="grid grid-cols-1 grid-rows-4 grid-flow-col gap-x-3 [&>div]:border-b [&>div]:border-dashed [&>div]:py-2 [&>div]:items-center-safe">
                <div className="flex flex-row justify-between">
                  <p className="text-[0.8rem] text-gray-600">
                    Cancellation Window
                  </p>
                  <p className="font-bold text-[0.91rem]">
                    Before 13th Oct 07:10 PM IST
                  </p>
                </div>

                <div className="flex flex-row justify-between">
                  <p className="text-[0.8rem] text-gray-600">
                    Cancellation Charge
                  </p>
                  <p className="font-bold text-red-600 text-[0.91rem]">
                    2.5% of Order Value (After Window)
                  </p>
                </div>

                <div className="flex flex-row justify-between">
                  <p className="text-[0.8rem] text-gray-600">Dispute Law</p>
                  <p className="font-bold text-[0.91rem]">
                    Indian Contract Act, 1872
                  </p>
                </div>

                <div className="flex flex-row justify-between">
                  <p className="text-[0.8rem] text-gray-600">Jurisdiction</p>
                  <p className="font-bold text-[0.91rem]">
                    Karnataka High Court, India
                  </p>
                </div>
              </ItemContent>
              <ItemFooter>
                <div className="flex flex-row gap-0.5 items-center-safe">
                  <Link
                    href=""
                    className="text-blue-800 underline text-[0.8rem]"
                  >
                    Read Full Cancellation Policy
                  </Link>
                  <IconPointFilled size="10" className="text-gray-500" />
                  <Link
                    href=""
                    className="text-blue-800 underline text-[0.8rem]"
                  >
                    Read Full Dispute Resolution Terms
                  </Link>
                </div>
              </ItemFooter>
            </Item>

            <h1 className="font-bold text-[0.97rem] mt-2">
              5. Final Agreement
            </h1>
            <Item variant="outline">
              <ItemContent className="text-[0.75rem] text-gray-600 flex flex-col gap-2">
                <p>
                  By proceeding to payment, you confirm that you have read,
                  understood, and agree to the following contract documents:
                </p>
                <ul className="list-disc list-inside">
                  <li>Supply Agreement - Global Cashew Traders (v3.1)</li>
                  <li>Quality Standard Annexure - RCN W320</li>
                  <li>OMPOI Buyer Platform T&C</li>
                </ul>
              </ItemContent>
            </Item>
          </CardContent>
        </Card>
      </main>

      <aside className="flex-1">
        <Card>
          <CardHeader className="flex flex-row justify-between items-center-safe border-b">
            <CardTitle>Order Summary</CardTitle>
            <CardDescription className="text-green-800 bg-green-50 py-1 px-2 rounded-full outline outline-green-200 font-bold text-[0.8rem]">Order #ORD-2024-5678</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 grid-rows-8 grid-flow-col gap-x-3 [&>div]:border-b [&>div]:border-dashed [&>div]:py-2 [&>div]:items-center-safe">
            <div className="flex flex-row justify-between">
              <p className="text-[0.8rem] text-gray-600">Supplier</p>
              <p className="font-bold text-[0.91rem]">Global Cashew Traders</p>
            </div>

            <div className="flex flex-row justify-between">
              <p className="text-[0.8rem] text-gray-600">Product</p>
              <p className="font-bold text-[0.91rem]">RCN W320 • 2025</p>
            </div>

            <div className="flex flex-row justify-between">
              <p className="text-[0.8rem] text-gray-600">Origin</p>
              <p className="font-bold text-[0.91rem]">Benin</p>
            </div>

            <div className="flex flex-row justify-between">
              <p className="text-[0.8rem] text-gray-600">Nut Count / OT</p>
              <p className="font-bold text-[0.91rem]">185/kg • 49 LBS</p>
            </div>

            <div className="flex flex-row justify-between">
              <p className="text-[0.8rem] text-gray-600">Quantity</p>
              <p className="font-bold text-[0.91rem]">150 MT</p>
            </div>

            <div className="flex flex-row justify-between">
              <p className="text-[0.8rem] text-gray-600">Price</p>
              <p className="font-bold text-[0.91rem]">$7.80 / kg</p>
            </div>

            <div className="flex flex-row justify-between">
              <p className="text-[0.8rem] text-gray-600">Total</p>
              <p className="font-bold text-[0.91rem]">
                <span className="line-through text-gray-400">$1,170,000</span>{" "}
                $1,111,500
              </p>
            </div>

            <div className="flex flex-row justify-between">
              <p className="text-[0.8rem] text-gray-600">Delivery</p>
              <p className="font-bold text-[0.91rem]">Mangalore • 15 days</p>
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex items-center gap-3 py-4 px-4 rounded-md outline outline-gray-200">
        <Checkbox id="terms" className="data-[state=checked]:bg-green-600" checked={isChecked} onCheckedChange={(checked) => setIsChecked(!!checked)}/>
        <Label htmlFor="terms">I agree to the terms including payment, delivery, quality, cancellation and dispute resolution.</Label>
      </div>
          </CardFooter>
        </Card>
      </aside>
    </div>
  );
}

export default ContractTerms;
