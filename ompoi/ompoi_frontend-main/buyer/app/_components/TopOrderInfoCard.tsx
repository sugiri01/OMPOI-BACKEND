import { Button } from "@/components/ui/button";
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
  ItemDescription,
  Item,
  ItemTitle,
  ItemHeader,
  ItemContent,
  ItemActions,
} from "@/components/ui/item";

function TopOrderInfoCard() {
  return (
    <Card className="bg-card gap-0.5 p-1">
      <CardHeader className="px-1.5">
        <Item className="flex flex-row justify-between gap-1 p-1">
          <ItemHeader className="flex flex-col gap-0 text-left items-start basis-2/3">
            <ItemTitle className="font-bold text-[1rem]">
              Bulk orders for processing
            </ItemTitle>
            <ItemDescription className="text-xs text-muted-foreground">
              Source directly from verified exporters
            </ItemDescription>
          </ItemHeader>
          <ItemActions>
            <Button variant="outline" className="bg-gray-50 text-sm font-bold px-2">
              Order now
            </Button>
          </ItemActions>
        </Item>
      </CardHeader>
      <CardContent className="flex gap-2 mb-1.5 px-1.5">
        <p className="text-sm py-0.5 px-2 rounded-full bg-gray-100 outline">
          Nov
        </p>
        <p className="text-sm py-0.5 px-2 rounded-full bg-gray-100 outline">
          Dec
        </p>
        <p className="text-sm py-0.5 px-2 rounded-full bg-green-100 text-green-800 outline">
          Use code: HARVEST
        </p>
      </CardContent>
    </Card>
  );
}

export default TopOrderInfoCard;
