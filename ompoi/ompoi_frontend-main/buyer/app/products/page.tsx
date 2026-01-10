import Center from "@/components/Center";
import { Button } from "@/components/ui/button";
import { IconSearch } from "@tabler/icons-react";
import TopCard from "./_components/TopCard";
import FilterCard from "./_components/FilterCard";
import TopInfoMenu from "./_components/TopInfoMenu";
import { mockOrders } from "../_data/mockOrders";
import ProductCard from "./_components/ProductCard";


function Page() {
  return (
    <div className="mt-15">
      <Center>
        <p className="py-3 text-sm text-gray-600">
          Cashew Sourcing <span className="text-xs">&gt;</span> RCN W320
          Suppliers
        </p>
        <div className="flex justify-between items-center-safe gap-5 bg-white rounded-lg outline outline-gray-200 shadow-lg shadow-gray-500/10 px-5 py-3">
          <div>
            <p className="text-sm text-gray-500">Product</p>
            <p className="font-bold text-gray-800 text-[0.95rem]">RCN W320</p>
          </div>
          <div className="border-l pl-5">
            <p className="text-sm text-gray-500">Quantity</p>
            <p className="font-bold text-gray-800 text-[0.95rem]">150 MT</p>
          </div>
          <div className="flex justify-between border-l pl-5 gap-10 items-center-safe">
            <div>
              <p className="text-sm text-gray-500">Data of order</p>
              <p className="font-bold text-gray-800 text-[0.95rem]">
                13 Oct, 2025
              </p>
            </div>
            <div className="flex gap-3 items-center-safe">
              <Button
                variant="outline"
                size="sm"
                className="rounded-full text-xs"
              >
                Today
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full text-xs"
              >
                Tomorrow
              </Button>
              <Button
                variant="default"
                className="bg-green-500 hover:bg-green-600"
              >
                <IconSearch size="10" />
                search
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 mt-5 lg:grid-cols-3 xl:grid-cols-5">
          <TopCard title="AI Insights" description="Smart supplier filtering" />
          <TopCard
            title="Get FLAT 10% OFF"
            description="On first bulk order!"
          />
          <TopCard title="Primo" description="Top Rated Suppliers" />
          <TopCard title="FlexiPayment" description="Multi-currency support" />
          <TopCard
            title="Quality Assured"
            description="Agent verified shipments"
          />
        </div>

        <div>
          <div className="flex flex-nowrap gap-4.5 mt-4.5 md:flex-wrap mid-w-[20%] max-lg:block">
            {/* container for left section */}
            <section className="flex flex-col gap-4.5 flex-1">
              <FilterCard />
            </section>
            {/* container for right section */}
            <section className="flex flex-col gap-4.5 flex-5 max-lg:mt-4.5">
              <div>
                <TopInfoMenu />
              </div>

              <div className="flex flex-col gap-2">
                { mockOrders.map((order) => (
                  <ProductCard {...order} key={order.id} />
                ))
              }
              </div>
            </section>
          </div>
        </div>
      </Center>
    </div>
  );
}

export default Page;
