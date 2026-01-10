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
} from '@/components/ui/item';
import { IconPointFilled } from "@tabler/icons-react";

function ProductSpecificationCard() {
  return (
    <Card className="gap-4">
      <CardHeader className="border-b flex justify-between items-center-safe">
        <CardTitle>Product Specifications</CardTitle>
        <CardDescription className="flex gap-1 text-xs text-gray-500 items-center-safe">
          <p>RCN W320</p>
          <IconPointFilled size="12" className="text-gray-500"/>
          <p>Benin Origin</p>
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-2 grid-rows-2 gap-2">
        <Item variant="outline" className="bg-gray-50 gap-1">
            <ItemHeader>
                <ItemTitle className="text-xs font-bold text-gray-500">NUT COUNT / OT</ItemTitle>
            </ItemHeader>
            <ItemContent>
                <p className="font-bold text-[0.96rem]">185 / kg • 49 LBS</p>
            </ItemContent>
            <ItemFooter>
                <p className="text-xs text-gray-600">Matches contract terms (max 190/kg)</p>
            </ItemFooter>
        </Item>
        <Item variant="outline" className="bg-gray-50 gap-1">
            <ItemHeader>
                <ItemTitle className="text-xs font-bold text-gray-500">MOISTURE CONTENT</ItemTitle>
            </ItemHeader>
            <ItemContent>
                <p className="font-bold text-[0.96rem]">6.5%</p>
            </ItemContent>
            <ItemFooter>
                <p className="text-xs text-gray-600">Well within tolerance (max 8.0%)</p>
            </ItemFooter>
        </Item>
        <Item variant="outline" className="bg-gray-50 gap-1">
            <ItemHeader>
                <ItemTitle className="text-xs font-bold text-gray-500">Defective Nuts</ItemTitle>
            </ItemHeader>
            <ItemContent>
                <p className="font-bold text-[0.96rem]">3.2%</p>
            </ItemContent>
            <ItemFooter>
                <p className="text-xs text-gray-600">Low defect rate (max 5.0%)</p>
            </ItemFooter>
        </Item>
        <Item variant="outline" className="bg-gray-50 gap-1">
            <ItemHeader>
                <ItemTitle className="text-xs font-bold text-gray-500">GRADE</ItemTitle>
            </ItemHeader>
            <ItemContent>
                <p className="font-bold text-[0.96rem]">Premium A+</p>
            </ItemContent>
            <ItemFooter>
                <p className="text-xs text-gray-600">Guaranteed top-tier quality</p>
            </ItemFooter>
        </Item>
      </CardContent>
    </Card>
  );
}

export default ProductSpecificationCard;
