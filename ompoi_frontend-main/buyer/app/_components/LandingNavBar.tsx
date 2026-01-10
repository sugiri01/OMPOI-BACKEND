import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { IconTriangleInvertedFilled } from "@tabler/icons-react";
import Link from "next/link";

function NavBar() {
  return (
    <NavigationMenu className="bg-gray-50/99 w-full fixed top-0 left-0 right-0 z-10 max-w-screen list-none py-3 shadow-lg shadow-gray-500/10">
      <div className="flex justify-between mx-auto w-[94%] lg:w-[67%] items-center">
        <NavigationMenuItem className="font-extrabold text-gray-800">
          <span className="bg-green-500 inline-block py-1 px-2.5 mr-1 text-white font-black text-sm rounded-md">
            OP
          </span>{" "}
          OMPOI - Cashew Sourcing
        </NavigationMenuItem>
        <div className="flex justify-around gap-5 font-semibold text-gray-600 items-center text-[1rem]">
          <NavigationMenuItem><Link href="/products">Browse Suppliers</Link></NavigationMenuItem>
          <NavigationMenuItem><Link href="">Market Prices</Link></NavigationMenuItem>
          <NavigationMenuItem><Link href="/orders">Orders</Link></NavigationMenuItem>
          <NavigationMenuItem><Link href="/help">Help</Link></NavigationMenuItem>
          <NavigationMenuItem className="px-2 py-0.5 bg-gray-100 rounded-full outline outline-gray-300 text-[0.8rem] text-gray-500 flex items-center-safe gap-1">Account<IconTriangleInvertedFilled size="7" /></NavigationMenuItem>
        </div>
      </div>
    </NavigationMenu>
  );
}

export default NavBar;
