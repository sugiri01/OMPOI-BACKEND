'use client';

import { useState } from "react";
import FilterButton from "./FilterButton";

type TopHeaderProps = {
  filterOrders: (filter: string) => void;
};

const filters = ['All', 'Pending Payment', 'Processing', 'Shipped', 'Delivered'];

function TopHeader({ filterOrders }: TopHeaderProps) {
  const [filter, setFilter] = useState<string>('All');

  return (
    <div className="flex items-center w-full justify-between py-5 flex-wrap mt-15">
      <div>
        <h1 className="font-extrabold text-2xl text-gray-800">My Orders</h1>
      </div>
      <div className="flex gap-4">
        {filters.map((name) => (
          <FilterButton
            key={name}
            name={name}
            setFilter={(filterName: string) => {
              setFilter(filterName);
              filterOrders(filterName);
            }}
            isPressed={filter === name}
          />
        ))}
      </div>
    </div>
  )
}

export default TopHeader