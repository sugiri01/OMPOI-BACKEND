"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { configApi } from "@/lib/api";

function TopMenuCard() {
  const router = useRouter();
  const [products, setProducts] = useState<string[]>([]);
  const [origins, setOrigins] = useState<string[]>([]);

  const [selectedProduct, setSelectedProduct] = useState("RCN W320");
  const [selectedOrigin, setSelectedOrigin] = useState("Benin");
  const [selectedDate, setSelectedDate] = useState("2025-10-13");
  const [selectedQuantity, setSelectedQuantity] = useState("150");
  const [isCustomQuantity, setIsCustomQuantity] = useState(false);

  useEffect(() => {
    const fetchSearchData = async () => {
      try {
        // Fetch all products to get unique names and origins
        const allProducts = await configApi.getProducts({});

        // Extract unique product names
        const uniqueProducts = [...new Set(allProducts.map(p => p.name))];
        setProducts(uniqueProducts);

        // Extract unique origins
        const uniqueOrigins = [...new Set(allProducts.map(p => p.origin))];
        setOrigins(uniqueOrigins);
      } catch (error) {
        console.error("Failed to fetch search data:", error);
      }
    };

    fetchSearchData();
  }, []);

  const handleSearch = () => {
    // Navigate to products page with filters
    const params = new URLSearchParams();
    if (selectedOrigin) params.append('origins', selectedOrigin);
    router.push(`/products?${params.toString()}`);
  };

  const handleQuantityChange = (value: string) => {
    if (value === "custom") {
      setIsCustomQuantity(true);
      setSelectedQuantity("");
    } else {
      setIsCustomQuantity(false);
      setSelectedQuantity(value);
    }
  };

  return (
    <Card className="bg-gray-50 gap-10 p-2 pt-2.5 justify-between-safe">
      <CardHeader className="flex flex-wrap justify-center-safe gap-4">
        <div className="flex flex-wrap justify-between-safe gap-4">
          {/* Product Dropdown */}
          <select
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            className="py-1 px-3 rounded-full outline bg-white text-sm font-medium cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <option value="">Select Product</option>
            {products.map(product => (
              <option key={product} value={product}>{product}</option>
            ))}
          </select>

          {/* Origin Dropdown */}
          <select
            value={selectedOrigin}
            onChange={(e) => setSelectedOrigin(e.target.value)}
            className="py-1 px-3 rounded-full outline bg-white text-sm font-medium cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <option value="">Select Origin</option>
            {origins.map(origin => (
              <option key={origin} value={origin}>{origin}</option>
            ))}
          </select>

          {/* Date Picker */}
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="py-1 px-3 rounded-full outline bg-white text-sm font-medium cursor-pointer"
          />

          {/* Quantity Dropdown with Custom Option */}
          {!isCustomQuantity ? (
            <select
              value={selectedQuantity}
              onChange={(e) => handleQuantityChange(e.target.value)}
              className="py-1 px-3 rounded-full outline bg-white text-sm font-medium cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <option value="50">50 MT</option>
              <option value="100">100 MT</option>
              <option value="150">150 MT</option>
              <option value="200">200 MT</option>
              <option value="250">250 MT</option>
              <option value="custom">Custom...</option>
            </select>
          ) : (
            <div className="flex items-center gap-1">
              <input
                type="number"
                value={selectedQuantity}
                onChange={(e) => setSelectedQuantity(e.target.value)}
                placeholder="Enter MT"
                className="py-1 px-3 rounded-full outline bg-white text-sm font-medium w-24"
              />
              <button
                onClick={() => setIsCustomQuantity(false)}
                className="text-xs text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
          )}
        </div>
        <div className="flex flex-wrap justify-between-safe gap-4">
          <Button
            variant="default"
            className="bg-green-600 font-bold hover:bg-green-700 hover:cursor-pointer"
            onClick={handleSearch}
          >
            Search suppliers
          </Button>
          <Button
            variant="outline"
            className="font-bold bg-white"
            onClick={() => router.push("/products?is_primo=true")}
          >
            Premium suppliers
          </Button>
        </div>
      </CardHeader>
    </Card>
  );
}

export default TopMenuCard;
