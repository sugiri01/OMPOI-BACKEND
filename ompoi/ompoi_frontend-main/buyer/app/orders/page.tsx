"use client";

import { useState } from "react";
import TopHeader from "./_components/TopHeader";
import Center from "@/components/Center";
import OrderCard from "./_components/OrderCard";
import { mockOrders } from "../_data/mockOrders";
import { mock } from "node:test";

function Page() {
  const [orders, setOrders] = useState(mockOrders);

  function filterOrders(filter: string) {
    if (filter === "All") {
      setOrders(mockOrders);
    } else {
        setOrders(mockOrders.filter((order) => order.status === filter));
    }
  }

  return (
    <div>
        <div className="bg-white">
            <Center>
                <TopHeader filterOrders={filterOrders} />
            </Center>
        </div>
      <Center>
        <div className="mt-5 flex flex-col gap-4.5 w-full">
          {orders.map((order) => (
            <OrderCard {...order} key={order.id} />
          ))}
        </div>
      </Center>
    </div>
  );
}

export default Page;
