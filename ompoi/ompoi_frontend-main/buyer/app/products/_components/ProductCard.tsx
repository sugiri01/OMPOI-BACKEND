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
import { Order } from "@/lib/types/order";
import { IconClipboardText, IconClipboardTextFilled, IconPointFilled, IconStarFilled } from "@tabler/icons-react";
import Link from "next/link";

function ProductCard(order: Order) {
  return (
    <Link href={`/products/${order.id}`}>
      <Card className="gap-3 hover:border-green-500 hover:border hover:cursor-pointer">
        <CardHeader className="flex justify-between gap-3">
          <div className="flex flex-col gap-2">
            <CardTitle className="flex flex-row gap-1 items-center-safe">{order.traderName} <span><IconClipboardTextFilled size="17" /></span></CardTitle>
            <div className="flex items-center-safe gap-1">
              <CardDescription>Premium Supplier</CardDescription>
              <div>
                <IconPointFilled size="14" className="text-gray-500 pt-0.5" />
              </div>
              <CardDescription>{order.origin}</CardDescription>
            </div>
          </div>
          <div className="outline outline-amber-200 bg-amber-100 rounded-md px-2 py-1">
            <CardDescription className="text-orange-800 text-xs">
              Best Price Today
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex justify-start gap-6 items-center-safe">
          <div className="flex gap-2 items-center-safe">
            <p className="rounded-full bg-gray-200 text-xs text-black py-1 px-2 outline">
              RBS Certified
            </p>
            <p className="rounded-full bg-gray-200 text-xs text-black py-1 px-2 outline">
              Tuticorin Stock
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <div className="font-bold text-sm flex">
              <p>190/kg</p>
              <div>
                <IconPointFilled size="14" className="text-gray-500 pt-0.5" />
              </div>
              <p>49 LBS</p>
            </div>
            <div className="flex text-xs text-gray-600 gap-1 items-center-safe">
              <p>Lead Time: 15 days</p>
              <div>
                <IconPointFilled size="14" className="text-gray-500 pt-0.5" />
              </div>
              <p>Available: {order.quantity} MT</p>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex gap-1 items-center-safe text-sm font-bold text-green-500 bg-green-100 py-1 px-2 rounded-full outline outline-green-200 w-fit">
              <IconStarFilled size="15" className="text-green-500 " /> 4.8
              <span className="text-gray-500 pl-1">245</span>
            </div>
            <p className="text-xs text-gray-600">
              From <span className="line-through text-gray-400">$0.20</span>{" "}
              <span className="font-bold">$7.80</span> per kg
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between gap-3 items-center-safe">
          <CardDescription className="rounded-full bg-gray-200 text-xs text-black py-1 px-2 outline flex gap-0.5">
            Multi-currency payment{" "}
            <IconPointFilled size="14" className="text-gray-500 pt-0.5" /> 30%
            advance, 70% on delivery
          </CardDescription>
          <Button className="bg-green-500 text-white hover:bg-green-600 hover:cursor-pointer">
            Buy Now
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}

export default ProductCard;
