import Center from "@/components/Center";

function Footer() {
  return (
    <footer className="mt-6 border-t">
      <Center className="w-[94%] lg:w-[67%]">
        <div className="grid grid-cols-2 grid-rows-2 gap-4 py-4 lg:grid-cols-4 lg:grid-rows-1">
          <div className="flex flex-col gap-2.5">
            <h1 className="font-bold">About OMPOI</h1>
            <p className="text-xs text-gray-800">
              The world&apos;s largest cashew sourcing platform. Secure,
              reliable, and quality assured.
            </p>
            <div className="flex flex-row gap-4 text-sm">
              <p className="text-black bg-gray-100 px-2 py-0.5 rounded-full outline text-[0.77rem]">
                Privacy
              </p>
              <p className="text-black bg-gray-100 px-2 py-0.5 rounded-full outline text-[0.77rem]">
                Terms
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            <h1 className="font-bold">Popular Origins</h1>
            <div>
              <p className="text-xs text-gray-800">Benin RCN W320</p>
              <p className="text-xs text-gray-800">Ghana Premium</p>
              <p className="text-xs text-gray-800">Tanzania W240</p>
              <p className="text-xs text-gray-800">Côte d&apos;Ivoire W320</p>
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            <h1 className="font-bold">Top Suppliers</h1>
            <div>
              <p className="text-xs text-gray-800">OMPOI Cashew Exports</p>
              <p className="text-xs text-gray-800">Global Traders</p>
              <p className="text-xs text-gray-800">Kerala Premium</p>
              <p className="text-xs text-gray-800">African Cashew Traders</p>
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            <h1 className="font-bold">Help & Support</h1>
            <div>
              <p className="text-xs text-gray-800">Manage Orders</p>
              <p className="text-xs text-gray-800">Track Shipment</p>
              <p className="text-xs text-gray-800">Payment & Refunds</p>
              <p className="text-xs text-gray-800">Customer Care</p>
            </div>
          </div>
        </div>

        <p className="text-xs text-gray-800 border-t py-2.5">
          &copy; 2025 OMPOI. Premium cashew sourcing platform.
        </p>
      </Center>
    </footer>
  );
}

export default Footer;
