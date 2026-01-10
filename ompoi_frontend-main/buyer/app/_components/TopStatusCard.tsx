import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import React from "react";

function TopStatusCard({
  title,
  data,
  icon,
}: {
  title: string;
  data: string;
  icon: React.ReactNode;
}) {
  return (
    <Card className="p-1 gap-1 outline-dashed outline outline-green-300/90">
      <CardHeader className="flex justify-between items-center-safe px-2">
        <div>
          <CardDescription className="text-xs">{title}</CardDescription>
          <h1 className="font-bold text-lg">{data}</h1>
        </div>
        <span>{icon}</span>
      </CardHeader>
    </Card>
  );
}

export default TopStatusCard;
