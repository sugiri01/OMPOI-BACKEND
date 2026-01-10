import React from 'react'
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
import ListItem, { AdminTasksList, StyleClass } from './ListItem';

function ListCard({title, subTitle, viewBtn, list, style}: {title: string, subTitle: string, viewBtn: string, list: Array<AdminTasksList>, style: Array<StyleClass>}) {
  return (
   <Card className="flex-1 bg-card py-4 gap-3">
              <CardHeader className="flex justify-between items-center-safe border-b [.border-b]:pb-3">
                <CardTitle className='font-bold'>
                  { title } <span className='text-green-600 text-[0.8rem]'>{ subTitle }</span>
                </CardTitle>
                <CardAction>
                  <Button variant="link">{ viewBtn }</Button>
                </CardAction>
              </CardHeader>
              <CardContent>
                <ul>
                  {list.map((item: AdminTasksList, index: number) => (
                    <ListItem key={item.key} title={item.title} info={item.info} status={item.status} controlBtn={item.controlBtn} statusColor={style[index].statusColor} bgStatus={style[index].bgStatus} border={style[index].border} ></ListItem>
                  ))}
                </ul>
              </CardContent>
            </Card>
  )
}

export default ListCard