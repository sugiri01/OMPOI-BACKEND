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

function ItemCard({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <Card>
      <CardHeader className="border-b flex flex-col">
        <CardTitle>{ title }</CardTitle>
      </CardHeader>
      <CardContent className='[&>div]:hover:shadow-sm'>{children}</CardContent>
    </Card>
  );
}

export default ItemCard;
