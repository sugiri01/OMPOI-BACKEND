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

export default function Home() {
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
                data="150+"
                icon={<IconCircleCheck size="21" className="text-gray-900" />}
              />
              <TopStatusCard
                title="Countries covered"
                data="12+"
                icon={<IconWorld size="21" className="text-gray-900" />}
              />
              <TopStatusCard
                title="MT sourced yearly"
                data="50K+"
                icon={<IconPackage size="21" className="text-gray-900" />}
              />
            </div>
          </div>

          <div className="mt-6">
            <h1 className="font-bold text-[1.15rem] text-gray-950">
              Offers for you
            </h1>
            <div className="mt-2 overflow-auto flex flex-row gap-3">
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
              <OfferCard
                offer="Save $350 on first order"
                status="RCN"
                code="FIRST"
              />
              <OfferCard
                offer="Special rates for bulk buyers"
                status="Premium"
                code="BULKDEAL"
              />
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
              <PremiumSupplierCard
                name="OMPOI Cashew Exports"
                origin="Benin"
                stock="Tuticorin Stock"
                quality="Premium"
                rating="4.8"
                reviews="245"
              />
              <PremiumSupplierCard
                name="Global Traders"
                origin="Ghana"
                stock="Mumbai Stock"
                quality="Verified"
                rating="4.3"
                reviews="189"
              />
              <PremiumSupplierCard
                name="Kerala Premium"
                origin="Côte d'Ivoire"
                stock="Kochi Stock"
                quality="Certified"
                rating="4.6"
                reviews="156"
              />
              <PremiumSupplierCard
                name="Tanzania Suppliers"
                origin="Tanzania"
                stock="Chennai Stock"
                quality="Premium"
                rating="4.5"
                reviews="134"
              />
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
