"use client";

import { useEffect, useState } from "react";
import Center from "@/components/Center";
import LandingNavBar from "./_components/LandingNavBar";
import TopMenuCard from "./_components/TopMenuCard";
import TopOrderInfoCard from "./_components/TopOrderInfoCard";
import TopStatusCard from "./_components/TopStatusCard";
import { IconCircleCheck, IconPackage, IconWorld } from "@tabler/icons-react";
import OfferCard from "./_components/OfferCard";
import NewFeatureCard from "./_components/NewFeatureCard";
import PremiumSupplierCard from "./_components/PremiumSupplierCard";
import ReviewCard from "./_components/ReviewCard";
import GetAppCard from "./_components/GetAppCard";
import HelpCard from "./_components/HelpCard";
import Footer from "./_components/Footer";
import { configApi, FeaturedSupplier } from "@/lib/api";

export default function Home() {
  const [activeSuppliers, setActiveSuppliers] = useState<string>("150+");
  const [countriesCovered, setCountriesCovered] = useState<string>("12+");
  const [mtSourced, setMtSourced] = useState<string>("50K+");
  const [suppliers, setSuppliers] = useState<FeaturedSupplier[]>([]);
  const [offers, setOffers] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch stats
        const suppCount = await configApi.getSystemConfig("active_suppliers_count");
        setActiveSuppliers(suppCount.value + "+");

        const countryCount = await configApi.getSystemConfig("countries_covered");
        setCountriesCovered(countryCount.value + "+");

        const mtCount = await configApi.getSystemConfig("mt_sourced_yearly");
        // Format large numbers (e.g., 50000 -> 50K)
        const mtVal = Number(mtCount.value);
        const mtStr = mtVal >= 1000 ? (mtVal / 1000).toFixed(0) + "K+" : mtVal + "+";
        setMtSourced(mtStr);

        // Fetch suppliers
        const fetchedSuppliers = await configApi.getFeaturedSuppliers(4);
        setSuppliers(fetchedSuppliers);

        // Fetch offers
        const fetchedOffers = await configApi.getOffers();
        setOffers(fetchedOffers);

      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <LandingNavBar />
      <div className="mt-12 bg-[url('/images/ompoiBuyerBGI.avif')] bg-cover bg-center bg-no-repeat flex items-center relative">
        <div className="bg-linear-to-b from-green-100 to-white/0 absolute top-0 bottom-0 left-0 right-0"></div>
        <Center className="z-10 w-[94%] lg:w-[67%]">
          <div className="flex justify-between items-center-safe">
            <p className="bg-green-50 text-green-600 text-[0.77rem] font-bold mt-4 py-0.5 px-1.5 rounded-full outline outline-green-200">
              India&apos;s No.1 online agri marketplace platform
            </p>
            <p className="bg-gray-50 text-black text-[0.79rem] py-0.5 px-1.5 rounded-full mt-4 outline">
              Harvest Season Sale • 11–26 Oct
            </p>
          </div>
          <div className="w-full mt-5 mb-5">
            <TopMenuCard />
          </div>
        </Center>
      </div>

      <main>
        <Center className="mt-4 w-[94%] lg:w-[67%]">
          <div className="flex flex-wrap justify-betweeen gap-4">
            <aside className="flex-1">
              <TopOrderInfoCard />
            </aside>
            <div className="flex-1 grid grid-cols-2 grid-rows-2 grid-flow-row gap-3 lg:grid-cols-3">
              <TopStatusCard
                title="Active suppliers"
                data={activeSuppliers}
                icon={<IconCircleCheck size="21" className="text-gray-900" />}
              />
              <TopStatusCard
                title="Countries covered"
                data={countriesCovered}
                icon={<IconWorld size="21" className="text-gray-900" />}
              />
              <TopStatusCard
                title="MT sourced yearly"
                data={mtSourced}
                icon={<IconPackage size="21" className="text-gray-900" />}
              />
            </div>
          </div>

          <div className="mt-6">
            <h1 className="font-bold text-[1.15rem] text-gray-950">
              Offers for you
            </h1>
            <div className="mt-2 overflow-auto flex flex-row gap-3">
              {offers.length > 0 ? (
                offers.map((offer) => (
                  <OfferCard
                    key={offer.id}
                    offer={offer.title}
                    status={offer.product_type || "Premium"}
                    code={offer.code}
                  />
                ))
              ) : (
                // Fallback / Loading Skeletons could go here
                <>
                  <OfferCard
                    offer="Save up to $500 on bulk orders"
                    status="RCN"
                    code="HARVEST50"
                  />
                  <OfferCard
                    offer="Flat $200 discount"
                    status="RCN"
                    code="CASH200"
                  />
                </>
              )}
            </div>
          </div>

          <div className="mt-6">
            <h1 className="font-bold text-[1.15rem] text-gray-950">
              What&apos;s new
            </h1>
            <div className="mt-2 flex flex-row justify-between gap-3">
              <NewFeatureCard
                title="Flexible Payment"
                desc="30% advance, 70% on delivery terms"
              />
              <NewFeatureCard
                title="Multi-currency Support"
                desc="Pay securely in USD, EUR, INR"
              />
              <NewFeatureCard
                title="Quality Assurance"
                desc="Agent verified shipments & certificates"
              />
            </div>
          </div>

          <div className="mt-6">
            <h1 className="font-bold text-[1.15rem] text-gray-950">
              Premium Suppliers
            </h1>
            <div className="mt-2 grid grid-flow-row grid-cols-2 grid-rows-2 gap-3 lg:grid-cols-4 lg:grid-rows-1">
              {suppliers.length > 0 ? (
                suppliers.map((supplier) => (
                  <PremiumSupplierCard
                    key={supplier.id}
                    name={supplier.name}
                    origin={supplier.origin}
                    stock={supplier.stock_location}
                    quality={supplier.quality_badge}
                    rating={supplier.rating.toString()}
                    reviews={supplier.review_count.toString()}
                  />
                ))
              ) : (
                // Fallback if API fails or loading
                <PremiumSupplierCard
                  name="OMPOI Cashew Exports"
                  origin="Benin"
                  stock="Tuticorin Stock"
                  quality="Premium"
                  rating="4.8"
                  reviews="245"
                />
              )}
            </div>
          </div>

          <div className="mt-6">
            <h1 className="font-bold text-[1.15rem] text-gray-950">
              Customer Reviews
            </h1>
            <div className="mt-2 flex flex-row gap-3 justify-between">
              <ReviewCard
                title="Quality Product, Fast Delivery"
                info="RCN W320"
                origin="Benin Origin"
              />
              <ReviewCard
                title="Best Prices & Great Service"
                info="Bulk Order"
                origin="Ghana Origin"
              />
              <ReviewCard
                title="Smooth Payment Process"
                info="150 MT"
                origin="Tanzania"
              />
              <ReviewCard
                title="Reliable Stock Availability"
                info="W320 Grade"
                origin="Côte d'Ivoire"
              />
            </div>
          </div>

          <div className="mt-6">
            <GetAppCard />
          </div>

          <div className="mt-6">
            <HelpCard />
          </div>
        </Center>
      </main>

      <Footer />
    </div>
  );
}
