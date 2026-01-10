import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

function FilterCard() {
  return (
    <Card>
      <CardHeader className="flex justify-between gap-4 border-b">
        <CardTitle className="font-bold">Filter suppliers</CardTitle>
        <CardAction className="text-sm">Reset</CardAction>
      </CardHeader>
      <CardContent>
        <div>
          <div className="flex flex-col gap-3 mt-2">
            <div className="flex gap-2">
              <Checkbox />
              <Label>Primo Supplier (28)</Label>
            </div>
            <div className="flex gap-2">
              <Checkbox />
              <Label>Benin (45)</Label>
            </div>
            <div className="flex gap-2">
              <Checkbox />
              <Label>Ghana (38)</Label>
            </div>
            <div className="flex gap-2">
              <Checkbox />
              <Label>Cote d&apos;lvoire (32)</Label>
            </div>
            <div className="flex gap-2">
              <Checkbox />
              <Label>Tanzania (24)</Label>
            </div>
            <div className="flex gap-2">
              <Checkbox />
              <Label>RBS Certified (56)</Label>
            </div>
          </div>
          <div className="flex flex-col gap-3 mt-2">
            <h1 className="font-bold text-sm">Nut Count Range</h1>
            <div className="flex flex-col gap-3 pl-2">
              <div className="flex gap-2">
                <Checkbox />
                <Label>180-185/kg (67)</Label>
              </div>
              <div className="flex gap-2">
                <Checkbox />
                <Label>185-195/kg (52)</Label>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3 mt-2">
            <h1 className="font-bold text-sm">More</h1>
            <div className="flex flex-col gap-3 pl-2">
              <div className="flex gap-2">
                <Checkbox />
                <Label>High Rated (110)</Label>
              </div>
              <div className="flex gap-2">
                <Checkbox />
                <Label>Ouick Delivery (85)</Label>
              </div>
              <div className="flex gap-2">
                <Checkbox />
                <Label>India Stock (67)</Label>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default FilterCard;
