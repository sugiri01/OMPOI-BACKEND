import Center from "@/components/Center";
import React from "react";
import WelcomeHeader from "./_components/WelcomeHeader";
import TopCard from "./_components/TopCard";
import OrderItem from "./_components/OrderItem";
import ItemCard from "./_components/ItemCard";
import ActivityCard from "./_components/ActivityCard";
import ActionCard from "./_components/ActionCard";

function Page() {
  return (
    <div>
      <div className="relative pt-15">
        <div className="bg-green-500 py-5.5">
          <Center>
            <WelcomeHeader />
          </Center>
        </div>
        <Center>
          <div className="flex flex-wrap gap-4.5 justify-between relative -top-10">
            <TopCard
              title="Total Orders"
              data="24"
              info="12% from last month"
            />
            <TopCard
              title="Active Orders"
              data="8"
              info="3 in transit"
            />
            <TopCard
              title="Total Spent"
              data="$8.4M"
              info="18% from last month"
            />
            <TopCard
              title="Avg. Savings"
              data="8.5%"
              info="Per order"
            />
          </div>
        </Center>
      </div>
      <Center>
        {/* flex container for remaining body */}
        <div className="flex flex-nowrap gap-4.5 mt-4.5 md:flex-wrap mid-w-[20%] max-lg:block">
          {/* container for left section */}
          <section className="flex flex-col gap-4.5 flex-5">
            <ItemCard title="Recent Orders" />
          </section>

          {/* container for right section */}
          <section className="flex flex-col gap-4.5 flex-2 max-lg:mt-4.5">
            <ActivityCard />
            <ActionCard />
          </section>
        </div>
      </Center>
    </div>
  );
}

export default Page;
