import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemHeader,
  ItemTitle,
} from "@/components/ui/item";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { IconPointFilled } from "@tabler/icons-react";

function PaymentOptionsCard() {
  return (
    <Card className="gap-4">
      <CardHeader className="border-b flex justify-between items-center-safe">
        <CardTitle>Payment Terms</CardTitle>
        <CardDescription className="flex gap-1 text-xs text-gray-500 items-center-safe">
          <p>Select an option</p>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <RadioGroup defaultValue="30Adv">
          <div className="flex items-center gap-x-3 bg-white outline outline-gray-200 rounded-md py-4 has-[button[data-state=checked]]:bg-gray-50 has-[button[data-state=checked]]:outline-green-500 has-[button[data-state=checked]]:outline-2 hover:bg-gray-50 hover:outline-green-500 hover:outline-2 px-4">
            <RadioGroupItem value="30Adv" id="30Adv" className="peer data-[state=checked]:border-green-600 border-2 transition-all" />
            <Label htmlFor="30Adv" className="flex flex-col items-start w-full gap-1">
              <div className="flex gap-1 justify-between w-full">
                <h1 className="font-bold">30% Advance Payment</h1>
                <p className="text-sm text-gray-600">Recommended</p>
              </div>
              <p className="text-xs text-gray-600">
              Matches contract terms (max 190/kg)
            </p>
            </Label>
          </div>

          <div className="flex items-center gap-x-3 bg-white outline outline-gray-200 rounded-md py-4 has-[button[data-state=checked]]:bg-gray-50 has-[button[data-state=checked]]:outline-green-500 has-[button[data-state=checked]]:outline-2 hover:bg-gray-50 hover:outline-green-500 hover:outline-2 px-4">
            <RadioGroupItem value="50Adv" id="50Adv" className="peer data-[state=checked]:border-green-600 border-2 transition-all" />
            <Label htmlFor="50Adv" className="flex flex-col items-start w-full gap-1">
              <div className="flex gap-1 justify-between w-full">
                <h1 className="font-bold">50% Advance Payment</h1>
                <p className="text-sm text-gray-600">Faster Processing</p>
              </div>
              <p className="text-xs text-gray-600">
              Well within tolerance (max 8.0%)
            </p>
            </Label>
          </div>
          
          <div className="flex items-center gap-x-3 bg-white outline outline-gray-200 rounded-md py-4 has-[button[data-state=checked]]:bg-gray-50 has-[button[data-state=checked]]:outline-green-500 has-[button[data-state=checked]]:outline-2 hover:bg-gray-50 hover:outline-green-500 hover:outline-2 px-4">
            <RadioGroupItem value="full" id="full" className="peer data-[state=checked]:border-green-600 border-2 transition-all" />
            <Label htmlFor="full" className="flex flex-col items-start w-full gap-1">
              <div className="flex gap-1 justify-between w-full">
                <h1 className="font-bold">100% Cash & Carry</h1>
                <p className="text-sm text-gray-600">Best Discount</p>
              </div>
              <p className="text-xs text-gray-600">
              Low defect rate (max 5.0%)
            </p>
            </Label>
          </div>

          <div className="flex items-center gap-x-3 bg-white outline outline-gray-200 rounded-md py-4 has-[button[data-state=checked]]:bg-gray-50 has-[button[data-state=checked]]:outline-green-500 has-[button[data-state=checked]]:outline-2 hover:bg-gray-50 hover:outline-green-500 hover:outline-2 px-4">
            <RadioGroupItem value="lc" id="lc" className="peer data-[state=checked]:border-green-600 border-2 transition-all" />
            <Label htmlFor="lc" className="flex flex-col items-start w-full gap-1">
              <div className="flex gap-1 justify-between w-full">
                <h1 className="font-bold">Letter of Credit (LC)</h1>
              </div>
              <p className="text-xs text-gray-600">
              Guaranteed top-tier quality
            </p>
            </Label>
          </div>
          </RadioGroup>
      </CardContent>
    </Card>
  );
}

export default PaymentOptionsCard;
