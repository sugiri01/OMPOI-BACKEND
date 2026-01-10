
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from '@/components/ui/navigation-menu';
import Link from 'next/link';


function NavBar() {
  return (
    <NavigationMenu className="bg-card w-full fixed top-0 left-0 right-0 z-10 max-w-screen list-none py-3 shadow-lg shadow-gray-500/10">
        <div className="flex justify-between mx-auto w-[87%]">
          <NavigationMenuItem className="text-lg font-extrabold text-gray-800">
            <span className="bg-green-500 inline-block py-1 px-2.5 text-white font-extrabold rounded-md">
              OP
            </span>{' '}
            OMPOI - Cashew Sourcing
          </NavigationMenuItem>
          <div className="flex justify-around gap-5 font-semibold text-gray-900 items-center text-[1rem]">
            <NavigationMenuItem><Link href="/user">Dashboard</Link></NavigationMenuItem>
            <NavigationMenuItem><Link href="/orders">Orders</Link></NavigationMenuItem>
            <NavigationMenuItem><Link href="/help">Help</Link></NavigationMenuItem>
            <NavigationMenuItem>Account</NavigationMenuItem>
          </div>
        </div>
      </NavigationMenu>
  )
}

export default NavBar;