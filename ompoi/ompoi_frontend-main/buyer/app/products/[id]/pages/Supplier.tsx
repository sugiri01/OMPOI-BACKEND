"use client";

import Center from "@/components/Center";
import AsideCard from "../_components/AsideCard";
import ProductSpecificationCard from "../_components/ProductSpecificationCard";
import DeliveryCard from "../_components/DeliveryCard";
import PaymentOptionsCard from "../_components/PaymentOptionsCard";
import QualityControlCard from "../_components/QualityControlCard";

function Supplier() {
  return (
        <div className="flex gap-6 justify-between mt-6 w-full relative pb-20">
          <aside className="flex-2 sticky overflow-scroll h-1/2 top-20">
            <AsideCard />
          </aside>

          <main className="flex-3 flex flex-col gap-4">
            <ProductSpecificationCard />
            <DeliveryCard />
            <PaymentOptionsCard />
            <QualityControlCard />
          </main>
        </div>
  )
}

export default Supplier