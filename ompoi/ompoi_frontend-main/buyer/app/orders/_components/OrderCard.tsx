import { getStatusClasses } from '@/app/_data/mockOrders';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Order } from '@/lib/types/order';
import { IconPointFilled } from '@tabler/icons-react';

function OrderCard(order: Order) {
    return (
        <div>
            <Card className='gap-4'>
                <CardHeader className="border-b flex justify-between border-b-gray-200">
                    <div className='flex flex-col gap-1.5 items-start'>
                        <CardTitle className='text-lg'>#{ order.id }</CardTitle>
                        <CardDescription className='text-xs text-gray-500'>Placed on { order.orderDate }</CardDescription>
                    </div>
                    <CardDescription className={`${ getStatusClasses(order.status) } py-1 px-1.5 outline rounded-sm text-xs`}>{ order.status }</CardDescription>
                </CardHeader>
                <CardContent className="border-b border-b-gray-200 pb-4">
                    <div className='flex gap-8 justify-between'>
                        <div className='flex flex-col gap-1.5 sm:flex-1 lg:flex-2'>
                            <p className='font-bold text-[0.72rem] text-gray-600'>PRODUCT DETAILS</p>
                            <p className='font-bold text-[0.9rem] text-gray-900 flex items-center gap-0.5'>{order.itemName} <IconPointFilled size="12" color="#6c7a91" /> {order.quantity} MT</p>
                            <p className='text-[0.74rem] text-gray-600 flex items-center gap-0.5'>{ order.origin } <IconPointFilled size="10" color="#6c7a91" /> { order.quality }</p>
                            <p className='text-[0.74rem] text-gray-600'>{ order.traderName }</p>
                        </div>
                        <div className='flex flex-col gap-1.5 flex-1'>
                            <p className='font-bold text-[0.72rem] text-gray-600'>DELIVERY</p>
                            <p className='font-bold text-[0.9rem] text-gray-900 flex items-center gap-0.5'>{order.port}</p>
                            <p className='text-[0.74rem] text-gray-600 flex items-center gap-0.5'>Expected: { order.ExpectedDelivery }</p>
                            <p className='text-[0.74rem] text-gray-600'>Lead Time: 15 days</p>
                        </div>
                        <div className='flex flex-col gap-1.5 flex-1'>
                            <p className='font-bold text-[0.72rem] text-gray-600'>PAYMENT</p>
                            <p className='font-bold text-[0.9rem] text-gray-900 flex items-center gap-0.5'>${order.price}</p>
                            <p className='text-[0.74rem] text-gray-600 flex items-center gap-0.5'>30% Advance Paid</p>
                            <p className='text-[0.74rem] text-gray-600'>info about fulfillment</p>
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <div className='flex items-center-safe justify-start gap-2 w-[30%]'>
                    <div><Button variant="default" className='bg-green-500 text-sm font-bold w-full hover:bg-green-600'>Track Shipment</Button></div>
                    <div><Button variant="outline" className='text-sm w-full font-bold bg-white'>View Invoice</Button></div>
                    <div><Button variant="outline" className='text-sm w-full font-bold bg-white'>Contact Supplier</Button></div>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}

export default OrderCard;