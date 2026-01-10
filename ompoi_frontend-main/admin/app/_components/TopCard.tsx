import React from 'react';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

function TopCard({
  title,
  icon,
  data,
  info,
  statusColor,
}: {
  title: string;
  icon: React.ReactNode;
  data: string;
  info: string;
  statusColor: string;
}) {
  return (
    <Card className="flex-1 bg-card min-w-60 gap-2.5 py-4 hover:shadow-md hover:transition-all hover:relative hover:bottom-0.5">
      <CardHeader className="flex justify-between items-center">
        <CardTitle className="text-sm font-normal text-gray-500">{title}</CardTitle>
        <span>{icon}</span>
      </CardHeader>
      <CardContent>
        <h1 className="font-bold text-3xl text-gray-800">{data}</h1>
      </CardContent>
      <CardFooter>
        <p
          className={`text-[0.9rem] bg-${statusColor}-100 text-${statusColor}-800 font-bold rounded-md px-2 py-0`}
        >
          {info}
        </p>
      </CardFooter>
    </Card>
  );
}

export default TopCard;
