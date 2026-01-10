import { Button } from '@/components/ui/button';
import { IconSettings } from '@tabler/icons-react';


function WelcomeHeader() {
  return (
    <div className="flex items-center w-full justify-between py-5 flex-wrap">
      <div>
        <h1 className="font-extrabold text-3xl text-gray-50">Welcome back, Buyer!</h1>
        <p className="text-md my-1 font-medium text-gray-50">
          Here&apos;s what&apos;s happening with your cashew sourcing today
        </p>
      </div>
    </div>
  );
}

export default WelcomeHeader;
