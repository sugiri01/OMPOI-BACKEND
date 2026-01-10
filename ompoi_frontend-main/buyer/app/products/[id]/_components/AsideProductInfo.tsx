import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IconStarFilled } from "@tabler/icons-react";
import Image from "next/image";

function AsideProductInfo() {
  return (
    <Card className="bg-gray-50 gap-3">
      <CardHeader className="flex justify-between items-center-safe">
        <CardTitle>Global Cashew Traders</CardTitle>
        <div className="flex gap-1 items-center-safe text-xs font-bold text-green-700 bg-green-100 py-1 px-2 rounded-full outline outline-green-200">
          <IconStarFilled size="11" className="text-green-700 " />{" "}
          <div>4.8</div>
        </div>
      </CardHeader>
      <CardContent className="border-b pb-4">
        <CardDescription className="text-xs">
          A premium supplier with a track record of quality and timely delivery
          for RCN W320. Operating since 2017.
        </CardDescription>
        <div className="flex gap-2 mt-4">
          <div className="h-30 rounded-md w-[30%] relative">
            <Image
              src="/images/product/product-img1.jpg"
              alt="cashew image"
              fill
              className="object-cover rounded-md"
            />
          </div>
          <div className="h-30 rounded-md w-[30%] relative">
            <Image
              src="/images/product/product-img2.webp"
              alt="cashew image"
              fill
              className="object-cover rounded-md"
            />
          </div>
          <div className="h-30 rounded-md w-[30%] relative">
            <Image
              src="/images/product/product-img3.webp"
              alt="cashew image"
              fill
              className="object-cover rounded-md"
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="grid grid-flow-col gap-4 grid-cols-1 grid-rows-2">
          <div className="flex gap-1 items-center-safe text-xs text-gray-700 bg-white/90 py-1 px-2 rounded-full outline outline-gray-200">
            <p className="text-center">80 MT Available</p>
          </div>
          <div className="flex gap-1 items-center-safe text-xs text-gray-700 bg-white/90 py-1 px-2 rounded-full outline outline-gray-200">
            <p className="text-center">Full Documentation</p>
          </div>
          <div className="flex gap-1 items-center-safe text-xs text-gray-700 bg-white/90 py-1 px-2 rounded-full outline outline-gray-200">
            <p className="text-center">Quick Shipment</p>
          </div>
          <div className="flex gap-1 items-center-safe text-xs text-gray-700 bg-white/90 py-1 px-2 rounded-full outline outline-gray-200">
            <p className="text-center">Benin Origin</p>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

export default AsideProductInfo;
