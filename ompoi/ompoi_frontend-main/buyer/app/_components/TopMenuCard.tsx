"use client";

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
import { useRouter } from "next/navigation";

function TopMenuCard() {
  const router = useRouter();
  return (
    <Card className="bg-gray-50 gap-10 p-2 pt-2.5 justify-between-safe">
      <CardHeader className="flex flex-wrap justify-center-safe gap-4">
        <div className="flex flex-wrap justify-between-safe gap-4">
          <p className="py-1 px-2 rounded-full outline bg-white">
            Product RCN W320
          </p>
          <p className="py-1 px-2 rounded-full outline bg-white">
            Origin Benin
          </p>
          <p className="py-1 px-2 rounded-full outline bg-white">
            Date 13 Oct, 2025
          </p>
          <p className="py-1 px-2 rounded-full outline bg-white">
            Quantity 150 MT
          </p>
        </div>
        <div className="flex flex-wrap justify-between-safe gap-4">
          <Button
            variant="default"
            className="bg-green-600 font-bold hover:bg-green-700 hover:cursor-pointer"
            onClick={() => router.push("/products")}
          >
            Search suppliers
          </Button>
          <Button variant="outline" className="font-bold bg-white">
            Premium suppliers
          </Button>
        </div>
      </CardHeader>
    </Card>
  );
}

export default TopMenuCard;
