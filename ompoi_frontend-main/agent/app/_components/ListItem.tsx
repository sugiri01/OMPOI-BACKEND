'use client';

import { Button } from '@/components/ui/button';

export type AdminTasksList = {
    key: number;
    title: string;
    info: string;
    status: string;
    controlBtn: string;
};

export type StyleClass = {
    statusColor: string;
    bgStatus: string;
    border: string;
};

export type ListAndStyle = AdminTasksList & StyleClass;

function ListItem(props: ListAndStyle) {
  return (
    <li className={ `flex justify-between items-center-safe ${props.border} pb-3` } >
        <div className='flex flex-col gap-2'>
            <h1 className='font-bold'>{ props.title }</h1>
            <p className='text-sm text-gray-600'>{ props.info}</p>
        </div>
        <div className='flex gap-3 justify-between items-center-safe'>
            <p className={`flex-2 rounded-md py-1 px-2 text-xs text-center font-bold ${props.bgStatus} ${props.statusColor}`}>{ props.status }</p>
            <Button className='bg-green-50 text-gray-700 font-bold flex-1'>{ props.controlBtn }</Button>
        </div>
    </li>
  )
}

export default ListItem;