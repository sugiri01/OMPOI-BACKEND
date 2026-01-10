'use client';

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ItemDescription } from "@/components/ui/item";
import React from "react";

function TopCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <Card className="flex-1 bg-card min-w-60 gap-4">
      <CardHeader className="flex justify-between items-center">
        <CardTitle className="text-lg font-bold text-gray-700 flex flex-col gap-4">
          <div>{ icon }</div>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ItemDescription>{ description }</ItemDescription>
      </CardContent>
    </Card>
  );
}

export default TopCard;
