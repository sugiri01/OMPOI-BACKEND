"use client";

import { useState, useEffect } from "react";
import Center from "@/components/Center";
import { Button } from "@/components/ui/button";
import { IconSearch } from "@tabler/icons-react";
import TopCard from "./_components/TopCard";
import FilterCard from "./_components/FilterCard";
import TopInfoMenu from "./_components/TopInfoMenu";
import ProductCard from "./_components/ProductCard";
import { configApi, Product } from "@/lib/api";

function Page() {
  const [filters, setFilters] = useState({
    origins: [] as string[],
    is_primo: false,
    certifications: [] as string[],
    nut_counts: [] as string[],
    min_rating: null as number | null,
  });

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const params: any = { status: 'active' };

        if (filters.origins.length > 0) params.origins = filters.origins;
        if (filters.is_primo) params.is_primo = true;
        if (filters.certifications.length > 0) params.certifications = filters.certifications;
        if (filters.nut_counts.length > 0) params.nut_counts = filters.nut_counts;
        if (filters.min_rating !== null) params.min_rating = filters.min_rating;

        const data = await configApi.getProducts(params);
        console.log("Fetched products:", data);
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setError(error instanceof Error ? error.message : "Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filters]);

  const handleReset = () => {
    setFilters({
      origins: [],
      is_primo: false,
      certifications: [],
      nut_counts: [],
      min_rating: null,
    });
  };

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
              <FilterCard
                filters={filters}
                onFilterChange={setFilters}
                onReset={handleReset}
              />
            </section>
            {/* container for right section */}
            <section className="flex flex-col gap-4.5 flex-5 max-lg:mt-4.5">
              <div>
                <TopInfoMenu />
              </div>

              <div className="flex flex-col gap-2">
                {loading ? (
                  <p className="text-center text-gray-500">Loading products...</p>
                ) : error ? (
                  <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    <span className="font-medium">Error:</span> {error}
                  </div>
                ) : products.length === 0 ? (
                  <p className="text-center text-gray-500">No products found matching your filters.</p>
                ) : (
                  products.map((product) => (
                    <ProductCard
                      key={product.id}
                      id={product.id}
                      itemName={product.name}
                      quantity={product.specifications_json?.quantity || 0}
                      origin={product.origin}
                      traderName={`Supplier ${product.seller_id.substring(0, 8)}`}
                      price={product.price_per_kg * 1000}
                      orderDate=""
                      ExpectedDelivery=""
                      port={product.stock_location}
                      status="Active"
                      quality={product.specification_details?.nut_count || "Premium"}
                    />
                  ))
                )}
              </div>
            </section>
          </div>
        </div>
      </Center>
    </div>
  );
}

export default Page;
