"use client";

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { IconChartHistogram, IconInvoice, IconMessageCircleUser, IconSearch } from '@tabler/icons-react';
import Link from 'next/link';

function ActionCard() {
  return (
    <Card>
      <CardHeader className="border-b flex flex-col">
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-flow-row grid-cols-2 grid-rows-2 text-center gap-4 font-bold text-sm">
        <div className='outline rounded-md py-2.5 hover:bg-green-50 hover:outline-green-500 hover:outline'><Link href="/products" className='flex justify-center items-center-safe gap-1'><IconSearch size="17" /> <div>Find Suppliers</div></Link></div>
        <div className='outline rounded-md py-2.5 hover:bg-green-50 hover:outline-green-500 hover:outline'><Link href="/orders" className='flex justify-center items-center-safe gap-1'><IconChartHistogram size="17" /> <div>Track Orders</div></Link></div>
        <div className='outline rounded-md py-2.5 hover:bg-green-50 hover:outline-green-500 hover:outline'><Link href="/help" className='flex justify-center items-center-safe gap-1'><IconMessageCircleUser size="17" /><div>Get Support</div></Link></div>
        <div className='outline rounded-md hover:bg-green-50 hover:outline-green-500 hover:outline'><Button variant="default" onClick={() => alert("Coming Soon!")} className='flex justify-center items-center-safe gap-1 bg-white w-full h-full text-black font-bold hover:bg-green-50 hover:cursor-pointer'><IconInvoice size="17" /><div>Download Invoice</div></Button></div>
      </CardContent>
    </Card>
  )
}

export default ActionCard