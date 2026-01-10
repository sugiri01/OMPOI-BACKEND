"use client";

import { useState } from "react";
import Center from "@/components/Center";
import { IconCheck, IconPointFilled } from "@tabler/icons-react";
import Supplier from "./pages/Supplier";
import { Button } from "@/components/ui/button";
import ContractTerms from "./pages/ContractTerms";
import Payment from "./pages/Payment";
import { useRouter } from "next/navigation";
import clsx from "clsx";

function Page() {
  const router = useRouter();
  const [step, setStep] = useState<number>(1);
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = () => {
    alert("Payment confirmed! Your order has been place successfully");
    router.push("/user");
  };

  return (
    <div className="mt-15">
      <Center>
        <div className="flex justify-between items-center-safe gap-5 py-4">
          <p className="text-[0.87rem] text-gray-600">
            Mumbai {"->"} Mangalore
          </p>
          <div className="flex gap-3 items-center-safe">
            <p className={clsx("rounded-full text-xs text-gray-600 py-1 px-2 outline flex flex-row items-center-safe gap-1", step === 1 && "bg-green-100 text-green-800 font-bold outline-green-200", step > 1 && "bg-gray-100")}>
              <IconCheck size="12" className={clsx(step > 1 ? "block" : "hidden")}/>
              1. Select Supplier
            </p>
            <p className={clsx("rounded-full text-xs text-gray-600 py-1 px-2 outline flex flex-row items-center-safe gap-1", step === 2 && "bg-green-100 text-green-800 font-bold outline-green-200", step > 2 && "bg-gray-100", step < 2 && "bg-white")}>
              <IconCheck size="12" className={clsx(step > 2 ? "block" : "hidden")}/>
              2. Contract Terms
            </p>
            <p className={clsx("rounded-full text-xs text-gray-600 py-1 px-2 outline", step === 3 ? "bg-green-100 text-green-800 font-bold outline-green-200" : "bg-white")}>
              3. Payment
            </p>
          </div>
        </div>
      </Center>
      <div className="bg-green-50 py-2 border-b border-b-green-200 sticky top-15 z-10">
        <Center className="flex justify-end-safe">
          <p className="flex gap-1 items-center-safe text-xs bg-white/90 py-1 px-2 rounded-md outline outline-green-200 text-green-800 font-bold">
            AI Savings Alert <IconPointFilled size="12" /> Save $8.2K on price
            per kg
          </p>
        </Center>
      </div>

      <Center>
        {step === 1 && <Supplier />}
        {step === 2 && <ContractTerms isChecked={ isChecked } setIsChecked={ setIsChecked } />}
        {step === 3 && <Payment />}
      </Center>

      <footer className="fixed bottom-0 left-0 right-0 bg-white py-4 flex flex-col items-center-safe">
        <Center>
          {step === 1 && (
            <div className="flex justify-between">
              <div className="flex flex-col">
                <p className="text-xs text-gray-600">
                  Total Order Value (Taxes Extra)
                </p>
                <h1 className="font-black text-lg">$1,170,000</h1>
              </div>
              <div>
                <Button
                  variant="default"
                  className="bg-green-500 font-bold hover:bg-green-600 hover:cursor-pointer"
                  onClick={nextStep}
                >
                  Continue to Contract Terms
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="flex justify-between">
              <div className="flex flex-col">
                <p className="text-xs text-gray-600">Advance Amount Due Now</p>
                <h1 className="font-black text-lg text-green-500">$351,000</h1>
              </div>
              <div className="flex flex-row gap-2">
                <Button
                  variant="outline"
                  className="bg-white font-bold hover:cursor-pointer"
                  onClick={prevStep}
                >
                  Back to Selection
                </Button>
                <Button
                  variant="default"
                  className="bg-green-500 font-bold hover:bg-green-600 hover:cursor-pointer"
                  onClick={nextStep}
                  disabled={!isChecked}
                >
                  Continue to Payment
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="flex justify-between">
              <div className="flex flex-col">
                <p className="text-xs text-gray-600">Amount Due Now</p>
                <h1 className="font-black text-lg text-green-500">$362,700</h1>
              </div>
              <div className="flex flex-row gap-2">
                <Button
                  variant="outline"
                  className="bg-white font-bold hover:cursor-pointer"
                  onClick={prevStep}
                >
                  Back to Contract
                </Button>
                <Button
                  variant="default"
                  className="bg-green-500 font-bold hover:bg-green-600 hover:cursor-pointer"
                  onClick={handleSubmit}
                >
                  Confirm & Pay $362,700
                </Button>
              </div>
            </div>
          )}
        </Center>
      </footer>
    </div>
  );
}

export default Page;
