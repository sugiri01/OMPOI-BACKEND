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


function NavBar() {
  return (
    <NavigationMenu className="bg-card w-full fixed top-0 left-0 right-0 z-10 max-w-screen list-none py-3 shadow-lg shadow-gray-500/10">
        <div className="flex justify-between mx-auto w-[87%]">
          <NavigationMenuItem className="text-lg font-extrabold text-gray-800">
            <span className="bg-green-500 inline-block py-1 px-2.5 text-white font-extrabold rounded-md">
              O
            </span>{' '}
            OMPOI Seller Platform
          </NavigationMenuItem>
          <div className="flex justify-around gap-5 font-semibold text-gray-900 items-center text-[1rem]">
            <NavigationMenuItem>Dashboard</NavigationMenuItem>
            <NavigationMenuItem>Orders</NavigationMenuItem>
            <NavigationMenuItem>Inventory</NavigationMenuItem>
            <NavigationMenuItem>Reports</NavigationMenuItem>
            <NavigationMenuItem>Help</NavigationMenuItem>
            <NavigationMenuItem>Account</NavigationMenuItem>
          </div>
        </div>
      </NavigationMenu>
  )
}

export default NavBar;

