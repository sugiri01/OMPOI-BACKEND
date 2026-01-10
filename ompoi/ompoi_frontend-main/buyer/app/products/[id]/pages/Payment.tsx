import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemFooter,
} from "@/components/ui/item";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  IconBuildingBank,
  IconCards,
  IconCreditCard,
  IconPhoneFilled,
  IconSquareCheck,
  IconSquareCheckFilled,
} from "@tabler/icons-react";

function Payment() {
  return (
    <div className="mt-6 pb-20 flex flex-col flex-wrap lg:flex-row gap-4">
      <main className="flex-2">
        <Card>
          <CardHeader className="flex flex-row justify-between border-b">
            <CardTitle>Payment Method</CardTitle>
            <CardDescription>
              Order #ORD-2024-5678 • RCN Benin W320
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <Item
              variant="outline"
              className="bg-blue-50 gap-2 pt-2 pb-2 border-blue-200"
            >
              <ItemContent>
                <h1 className="font-bold text-base">
                  Selected Payment Terms 100% Cash & Carry
                </h1>
                <p className="text-[0.8rem] text-gray-700">
                  Amount Due Now (Advance):{" "}
                  <span className="text-green-600 font-bold">$1,111,500</span>
                </p>
              </ItemContent>
              <ItemDescription className="text-[0.8rem] text-gray-500 font-bold">
                STEP 1/2
              </ItemDescription>
              <ItemFooter>
                <p className="text-[0.8rem] text-gray-700 border-t border-dashed pt-2 w-full">
                  Full payment (100% Cash & Carry) - No remaining balance. Order
                  total includes 5% discount.
                </p>
              </ItemFooter>
            </Item>

            <div className="flex flex-col gap-3 mt-2">
              <h2 className="font-bold text-[0.95rem]">
                Select a payment option for the advance amount
              </h2>
              <div>
                <RadioGroup
                  defaultValue="wire_transfer"
                  className="flex flex-col gap-4"
                >
                  <div className="group flex flex-col gap-2 has-[button[data-state=checked]]:bg-green-50 has-[button[data-state=checked]]:border-green-600 has-[button[data-state=checked]]:grid-rows-2 grid-flow-row justify-start w-full border-2 p-3.5 rounded-md">
                    <div className="flex justify-between items-center-safe gap-2.5">
                      <RadioGroupItem
                        value="wire_transfer"
                        id="r1"
                        className="peer data-[state=checked]:border-green-600 border-2 transition-all"
                      />
                      <Label
                        htmlFor="r1"
                        className="flex flex-row justify-between w-full"
                      >
                        <div className="flex items-center-safe flex-row gap-2">
                          <span>
                            <IconBuildingBank
                              size="23"
                              className="text-gray-800"
                            />
                          </span>
                          <div className="flex flex-col items-start gap-2">
                            <h1 className="font-bold text-[0.95rem]">
                              OMPOI Escrow Wire Transfer
                            </h1>
                            <p className="text-[0.8rem] text-gray-700">
                              Pay directly from your bank account. Secure and
                              fully tracked by OMPOI.
                            </p>
                          </div>
                        </div>
                        <p className="text-[0.75rem] text-green-600 py-1 px-2 bg-green-50 rounded-sm font-bold outline outline-green-200">
                          No Fee
                        </p>
                      </Label>
                    </div>

                    <div className="flex-col gap-y-3 hidden group-has-[div>button[data-state=checked]]:flex w-full bg-amber-50/50 rounded-md px-2 py-6">
                      <p className="text-orange-800 bg-orange-50 text-sm outline outline-orange-300 p-2 rounded-md">
                        Wire transfer instructions will be sent to{" "}
                        <span className="font-bold">your registered email</span>{" "}
                        (user@ompoi.com) upon confirmation. Payment is due
                        within 48 hours.
                      </p>
                      <h5 className="font-bold text-sm">
                        OMPOI Escrow Account Details
                      </h5>
                      <div className="grid grid-cols-2 grid-rows-2 grid-flow-row gap-3">
                        <div className="col-span-2">
                          <Label
                            htmlFor="bene_name"
                            className="font-bold text-sm text-gray-900"
                          >
                            Beneficiary Name
                          </Label>
                          <Input
                            id="bene_name"
                            className="mt-2 bg-white focus-visible:ring-green-100 focus-visible:border-green-500"
                            defaultValue="OMPOI Global Escrow"
                            readOnly
                          ></Input>
                        </div>

                        <div>
                          <Label
                            htmlFor="bank_name"
                            className="font-bold text-sm text-gray-900"
                          >
                            Bank Name
                          </Label>
                          <Input
                            id="bank_name"
                            className="mt-2 bg-white focus-visible:ring-green-100 focus-visible:border-green-500"
                            defaultValue="HDFC Bank, Mumbai"
                            readOnly
                          ></Input>
                        </div>

                        <div>
                          <Label
                            htmlFor="acc_no"
                            className="font-bold text-sm text-gray-900"
                          >
                            Account No. / IBAN
                          </Label>
                          <Input
                            id="acc_no"
                            className="mt-2 bg-white focus-visible:ring-green-100 focus-visible:border-green-500"
                            defaultValue="XXXXXXXXXX3456"
                            readOnly
                          ></Input>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="group flex flex-col gap-2 has-[button[data-state=checked]]:bg-green-50 has-[button[data-state=checked]]:border-green-600 has-[button[data-state=checked]]:grid-rows-2 grid-flow-row justify-start w-full border-2 p-3.5 rounded-md">
                    <div className="flex justify-between items-center-safe gap-2.5">
                      <RadioGroupItem
                        value="platform_credit"
                        id="r2"
                        className="peer data-[state=checked]:border-green-600 border-2 transition-all"
                      />
                      <Label
                        htmlFor="r2"
                        className="flex flex-row justify-between w-full"
                      >
                        <div className="flex items-center-safe flex-row gap-2">
                          <span>
                            <IconCreditCard
                              size="23"
                              className="text-gray-800"
                            />
                          </span>
                          <div className="flex flex-col items-start gap-2">
                            <h1 className="font-bold text-[0.95rem]">
                              OMPOI Platform Credit (Current Balance: $500,000)
                            </h1>
                            <p>
                              Instant payment from your existing OMPOI credit
                              balance.
                            </p>
                          </div>
                        </div>
                        <p className="text-[0.75rem] text-green-600 py-1 px-2 bg-green-50 rounded-sm font-bold outline outline-green-200">
                          Instant
                        </p>
                      </Label>
                    </div>
                    <div className="flex-col gap-y-3 hidden group-has-[div>button[data-state=checked]]:flex w-full bg-amber-50/50 rounded-md px-2 py-6">
                      <div>
                        <Label
                          htmlFor="amt_to_use"
                          className="font-bold text-sm text-gray-900"
                        >
                          Amount to Use
                        </Label>
                        <Input
                          id="amt_to_use"
                          className="mt-2 bg-white focus-visible:ring-green-100 focus-visible:border-green-500"
                          defaultValue="$351,000"
                          readOnly
                        ></Input>
                      </div>
                      <p className="text-orange-800 bg-orange-50 text-sm outline outline-orange-300 p-2 rounded-md">
                        <span className="font-bold">Warning: </span> Ensure your
                        credit balance is sufficient before proceeding.
                      </p>
                    </div>
                  </div>

                  <div className="group flex flex-col gap-2 has-[button[data-state=checked]]:bg-green-50 has-[button[data-state=checked]]:border-green-600 has-[button[data-state=checked]]:grid-rows-2 grid-flow-row justify-start w-full border-2 p-3.5 rounded-md">
                    <div className="flex justify-between items-center-safe gap-2.5">
                      <RadioGroupItem
                        value="credit_or_debit"
                        id="r3"
                        className="peer data-[state=checked]:border-green-600 border-2 transition-all"
                      />
                      <Label
                        htmlFor="r3"
                        className="flex flex-row justify-between w-full"
                      >
                        <div className="flex items-center-safe flex-row gap-2">
                          <span>
                            <IconCards size="23" className="text-gray-800" />
                          </span>
                          <div className="flex flex-col items-start gap-2">
                            <h1 className="font-bold text-[0.95rem]">
                              Credit/Debit Card (via Secure Gateway)
                            </h1>
                            <p className="text-[0.8rem] text-gray-700">
                              Supports Visa, MasterCard, Amex. Transaction fees
                              may apply.
                            </p>
                          </div>
                        </div>
                        <p className="text-[0.75rem] text-green-600 py-1 px-2 bg-green-50 rounded-sm font-bold outline outline-green-200">
                          2% Fee
                        </p>
                      </Label>
                    </div>
                    <div className="grid-cols-2 grid-rows-2 grid-flow-row gap-3 hidden group-has-[div>button[data-state=checked]]:grid w-full bg-amber-50/50 rounded-md px-2 py-6">
                      <div className="col-span-2">
                        <Label
                          htmlFor="card_num"
                          className="font-bold text-sm text-gray-900"
                        >
                          Card Number
                        </Label>
                        <Input
                          id="card_num"
                          className="mt-2 bg-white focus-visible:ring-green-100 focus-visible:border-green-500"
                          placeholder="XXXX XXXX XXXX XXXX"
                        ></Input>
                      </div>

                      <div>
                        <Label
                          htmlFor="expiry"
                          className="font-bold text-sm text-gray-900"
                        >
                          Expiry (MM/YY)
                        </Label>
                        <Input
                          id="expiry"
                          className="mt-2 bg-white focus-visible:ring-green-100 focus-visible:border-green-500"
                          placeholder="01/26"
                        ></Input>
                      </div>

                      <div>
                        <Label
                          htmlFor="cvv"
                          className="font-bold text-sm text-gray-900"
                        >
                          CVV
                        </Label>
                        <Input
                          id="cvv"
                          className="mt-2 bg-white focus-visible:ring-green-100 focus-visible:border-green-500"
                          placeholder="123"
                        ></Input>
                      </div>
                    </div>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <p className="flex flex-row gap-2 items-center-safe bg-green-50/50 px-2 py-2 w-full rounded-md text-[0.8rem] text-gray-700">
              <span>
                <IconSquareCheckFilled size="20" className="text-green-500" />
              </span>
              All transactions are SSL secured and processed through
              OMPOI&apos;s trusted payment partners.
            </p>
          </CardFooter>
        </Card>
      </main>

      <aside className="flex-1 flex flex-col gap-4">
        <Card>
          <CardHeader className="flex flex-row justify-between items-center-safe border-b">
            <CardTitle>Order Summary</CardTitle>
            <CardDescription className="text-green-800 bg-green-50 py-1 px-2 rounded-full outline outline-green-200 font-bold text-[0.8rem]">
              Order #ORD-2024-5678
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            <div className="flex flex-col gap-x-3 [&>div]:border-b [&>div]:border-dashed [&>div]:py-2 [&>div]:items-center-safe">
              <div className="flex flex-row justify-between">
                <p className="text-[0.8rem] text-gray-600">Supplier</p>
                <p className="font-bold text-[0.91rem]">
                  Global Cashew Traders
                </p>
              </div>

              <div className="flex flex-row justify-between">
                <p className="text-[0.8rem] text-gray-600">Product</p>
                <p className="font-bold text-[0.91rem]">RCN W320 • Benin</p>
              </div>

              <div className="flex flex-row justify-between">
                <p className="text-[0.8rem] text-gray-600">Total Order Value</p>
                <p className="font-bold text-[0.91rem]">$1,170,000</p>
              </div>

              <div className="flex flex-row justify-between">
                <p className="text-[0.8rem] text-gray-600">Payment Term</p>
                <p className="font-bold text-[0.91rem]">30% Advance Payment</p>
              </div>
            </div>

            <div className="flex flex-col gap-3 border-b-2 pb-4">
              <div className="flex flex-row justify-between">
                <p className="text-[0.94rem] text-gray-600">Advance Payment (30%)</p>
                <p className="font-bold text-[0.94rem]">$351,000</p>
              </div>

              <div className="flex flex-row justify-between">
                <p className="text-[0.94rem] text-gray-600">Sourcing Fee (1% of total)</p>
                <p className="font-bold text-[0.94rem]">$11,700</p>
              </div>

              <div className="flex flex-row justify-between">
                <p className="text-[0.94rem] text-gray-600">GateWay Fee (2% of advance)</p>
                <p className="font-bold text-[0.94rem]">$0</p>
              </div>
            </div>

             <div className="flex flex-row justify-between">
                <p className="text-base text-gray-600 font-bold">Total Amount Due Now</p>
                <p className="font-bold text-base">$362,700</p>
              </div>
          </CardContent>
          <CardFooter>
            <p className="text-xs text-gray-600">* Final amount may vary based on selected payment method.</p>
          </CardFooter>
        </Card>

        <Card className="gap-1 py-4">
          <CardHeader className="flex flex-row gap-1 items-center-safe">
            <IconPhoneFilled size="16" className="text-gray-800" />
            <CardTitle className="text-sm">Need Help?</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-[0.85rem]">Payment Support: +91-461-2321023</CardDescription>
            <CardDescription className="text-[0.85rem]">Email: payments@ompoi.com</CardDescription>
            <CardDescription className="text-[0.85rem]">Available: Mon-Sat, 9 AM - 6 PM IST</CardDescription>
          </CardContent>
        </Card>
      </aside>
    </div>
  );
}

export default Payment;
