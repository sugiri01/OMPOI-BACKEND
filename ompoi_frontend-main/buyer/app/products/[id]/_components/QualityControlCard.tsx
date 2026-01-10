import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import { IconSearch } from "@tabler/icons-react";

function QualityControlCard() {
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center-safe border-b-2 pb-4">
        <CardTitle>Quality Control</CardTitle>
        <CardDescription className="text-xs">
          Guaranteed by OMPOI
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Item variant="outline">
          <ItemContent className="flex flex-row justify-start items-center-safe gap-4">
            <span>
              <IconSearch size="20" />
            </span>
            <div>
              <ItemTitle className="font-bold text-[0.95rem]">Pre-Shipment Inspection (PSI)</ItemTitle>
              <ItemDescription className="text-xs">
                Mandatory quality check before dispatch.
              </ItemDescription>
            </div>
          </ItemContent>
          <aside>
            <p className="text-green-800 bg-green-100 font-bold px-2 py-1 rounded-full outline outline-green-200">Included</p>
          </aside>
        </Item>

        <div className="pt-4">
          <div className="grid grid-cols-4 grid-rows-1 grid-flow-row gap-4 items-center-safe bg-green-50/50 py-2 px-2 font-bold text-gray-500 text-[0.8rem] border-b">
            <p className="col-span-2">PARAMETER</p>
            <p>STANDARD</p>
            <p>VALUE</p>
          </div>
          
          <div className="grid grid-cols-4 grid-rows-1 grid-flow-row gap-4 items-center-safe py-2 px-2 font-bold text-[0.9rem] text-gray-900 border-b">
            <p className="col-span-2">Defective nuts</p>
            <p>Max 5.0%</p>
            <p className="text-green-600">3.2%</p>
          </div>
          
          <div className="grid grid-cols-4 grid-rows-1 grid-flow-row gap-4 items-center-safe py-2 px-2 font-bold text-[0.9rem] text-gray-900 border-b">
            <p className="col-span-2">Moisture Content</p>
            <p>Max 8.0%</p>
            <p className="text-green-600">6.5%</p>
          </div>
          
          <div className="grid grid-cols-4 grid-rows-1 grid-flow-row gap-4 items-center-safe py-2 px-2 font-bold text-[0.9rem] text-gray-900">
            <p className="col-span-2">Foreign matter</p>
            <p>Max 0.2%</p>
            <p className="text-green-600">0.1%</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default QualityControlCard;
