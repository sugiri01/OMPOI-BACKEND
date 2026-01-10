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

function TopCard({
  title,
  data,
  info,
}: {
  title: string;
  data: string;
  info: string;
}) {
  return (
    <Card className="flex-1 bg-card min-w-60 gap-3">
      <CardHeader className="flex justify-between items-center">
        <CardTitle className="text-sm font-bold text-gray-500">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <h1 className={`font-bold text-3xl text-green-600`}>{data}</h1>
      </CardContent>
      <CardFooter>
        <p
          className={`text-[0.9rem] text-green-600 font-medium`}
        >
          {info}
        </p>
      </CardFooter>
    </Card>
  );
}

export default TopCard;
