import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemHeader,
  ItemTitle,
} from '@/components/ui/item';
import { Order } from '@/lib/types/order';
import { IconPointFilled } from '@tabler/icons-react';
import { getStatusClasses } from '../../_data/mockOrders';
import Link from 'next/link';



function OrderItem(order: Order) {
  return (
                  <Link href="/orders">
                  <Item variant="outline" className='mb-3 hover:border hover:border-green-500 hover:bg-green-50'>
                    <ItemHeader className='flex justify-between'>
                      <ItemTitle className='font-bold'>{ order.id }</ItemTitle>
                      <ItemDescription className={`${ getStatusClasses(order.status) } py-1 px-1.5 outline rounded-sm text-xs`}>{ order.status }</ItemDescription>
                    </ItemHeader>
                    <ItemContent>
                      <div className='flex items-center-safe gap-x-0.5'>
                        <ItemDescription className='font-bold'>{ order.itemName }</ItemDescription>
                        <IconPointFilled size="12" color="#6c7a91" />
                        <ItemDescription className='font-bold'>{ order.quantity }</ItemDescription>
                        <IconPointFilled size="12" color="#6c7a91" />
                        <ItemDescription className='font-bold'>{ order.origin }</ItemDescription>
                      </div>
                      <div className='flex items-center-safe gap-x-0.5'>
                        <ItemDescription>{ order.traderName }</ItemDescription>
                        <IconPointFilled size="12" color="#6c7a91" />
                        <ItemDescription>{ order.price }</ItemDescription>
                      </div>
                      <div className='flex items-center-safe gap-x-0.5'>
                        <ItemDescription>{ order.ExpectedDelivery }</ItemDescription>
                        <IconPointFilled size="12" color="#6c7a91" />
                        <ItemDescription>{ order.port }</ItemDescription>
                      </div>
                    </ItemContent>
                  </Item>
                  </Link>
  )
}

export default OrderItem