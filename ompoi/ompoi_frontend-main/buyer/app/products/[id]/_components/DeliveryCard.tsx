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

function DeliveryCard() {
  return (
    <Card className="gap-4">
      <CardHeader className="border-b flex justify-between items-center-safe">
        <CardTitle>Delivery Location</CardTitle>
        <CardDescription className="flex gap-1 text-xs text-gray-500 items-center-safe">
          <p>Select your nearest port</p>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup defaultValue="comfortable" className="grid grid-cols-2 grid-rows-1 gap-4">
          <div className="flex items-center gap-3 bg-white outline outline-gray-200 rounded-md py-4 has-[button[data-state=checked]]:bg-gray-50 has-[button[data-state=checked]]:outline-green-500 has-[button[data-state=checked]]:outline-2 hover:bg-gray-50 hover:outline-green-500 hover:outline-2">
            <RadioGroupItem value="ka" id="r1" className="peer data-[state=checked]:border-green-600 border-2 transition-all hidden" />
            <Label htmlFor="r1" className="flex flex-col gap-1 w-full">
              <h1 className="font-bold text-base">Mangalore Port (kA)</h1>
              <p className="text-xs text-gray-600">Estimated Arrival: 15 Days</p>
            </Label>
          </div>
          <div className="flex items-center gap-3 bg-white outline outline-gray-200 rounded-md py-4 has-[button[data-state=checked]]:bg-gray-50 has-[button[data-state=checked]]:outline-green-500 has-[button[data-state=checked]]:outline-2 hover:bg-gray-50 hover:outline-green-500 hover:outline-2">
            <RadioGroupItem value="tn" id="r2" className="peer data-[state=checked]:border-green-600 border-2 transition-all hidden" />
            <Label htmlFor="r2" className="flex flex-col gap-1 w-full">
              <h1 className="font-bold text-base">Tuticorin Port (TN)</h1>
              <p className="text-xs text-gray-600">Estimated Arrival: 18 Days</p>
            </Label>
          </div>
        </RadioGroup>
      </CardContent>
      <CardFooter>
        <CardDescription className="text-xs text-gray-500">
          * Shipment will be delivered via container freight to the selected
          port.
        </CardDescription>
      </CardFooter>
    </Card>
  );
}

export default DeliveryCard;
