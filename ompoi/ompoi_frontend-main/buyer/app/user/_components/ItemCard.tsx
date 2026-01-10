"use client";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockOrders } from '../../_data/mockOrders';
import OrderItem from './OrderItem';
import { useRouter } from 'next/navigation';


function ItemCard({ title }: { title: string }) {
  const router = useRouter();
  return (
    <Card>
      <CardHeader className="border-b flex flex-col">
        <CardTitle className='text-lg'>{ title }</CardTitle>
      </CardHeader>
      <CardContent>
        { mockOrders.map((order) => (
          <OrderItem {...order} key={order.id} />
        )) 
      }
      </CardContent>
      <CardFooter>
        <Button variant="default" className='bg-green-500 w-full hover:bg-green-600 hover:cursor-pointer' onClick={() => router.push("/orders")}>View All Orders</Button>
      </CardFooter>
    </Card>
  );
}

export default ItemCard;
