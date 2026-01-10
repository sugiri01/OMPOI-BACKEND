'use client';

import { Button } from '@/components/ui/button';
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
import { useState } from 'react';
import Settings from './Settings';

function NavBar() {
  const [isSettingsClicked, setIsSettingsClicked] = useState<boolean>(false);
  return (
    <>
      <NavigationMenu className="bg-card w-full sticky top-0 max-w-screen list-none py-3">
        <div className="flex justify-between mx-auto w-[87%]">
          <NavigationMenuItem className="text-lg font-extrabold text-gray-800">
            <span className="bg-green-500 inline-block py-1 px-2.5 text-white font-extrabold rounded-md">
              A
            </span>{' '}
            OMPOI Admin
          </NavigationMenuItem>
          <div className="flex justify-around gap-5 font-semibold text-gray-900 items-center text-[1rem]">
            <NavigationMenuItem className="hover:cursor-pointer hover:text-green-600">
              Support
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Button
                variant="link"
                className="text-base font-bold hover:no-underline hover:cursor-pointer hover:text-green-600"
                onClick={() => setIsSettingsClicked((prev) => !prev)}
              >
                Settings
              </Button>
            </NavigationMenuItem>
            <NavigationMenuItem className="bg-green-500 text-[1rem] rounded-full px-1.5 py-[5px] font-bold text-white">
              <span>AD</span>
            </NavigationMenuItem>
          </div>
        </div>
      </NavigationMenu>
      <Settings isSettingsClicked={isSettingsClicked} setIsSettingsClicked={setIsSettingsClicked} />
    </>
  );
}

export default NavBar;
