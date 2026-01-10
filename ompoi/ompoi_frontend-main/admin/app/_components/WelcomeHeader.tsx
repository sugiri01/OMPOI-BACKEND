'use client';

import { Button } from '@/components/ui/button';
import { IconSettings } from '@tabler/icons-react';
import RegisterUser from './RegisterUser';
import { useState } from 'react';

function WelcomeHeader() {
  const [isCreateUserClicked, setIsCreateUserClicked] = useState<boolean>(false);
  return (
    <>
      <div className="flex items-center w-full justify-between py-5 flex-wrap">
        <div>
          <h1 className="font-extrabold text-3xl text-gray-800">Admin Dashboard</h1>
          <p className="text-sm text-gray-600 my-1 font-medium">
            Overview of Operations & IT Management
          </p>
        </div>
        <div className="flex gap-4">
          <Button
            variant="outline"
            className="bg-white text-[0.92rem] rounded-md px-3 py-2 font-bold outline"
          >
            <IconSettings />
            IT Settings
          </Button>
          <Button
            variant="default"
            className="bg-green-500 hover:bg-green-600 text-white text-[0.92rem] rounded-md px-3 py-2 font-bold hover:cursor-pointer"
            onClick={() => setIsCreateUserClicked((prev) => !prev)}
          >
            + Create New User
          </Button>
        </div>
      </div>
      <RegisterUser
        isCreateUserClicked={isCreateUserClicked}
        setIsCreateUserClicked={setIsCreateUserClicked}
      />
    </>
  );
}

export default WelcomeHeader;
