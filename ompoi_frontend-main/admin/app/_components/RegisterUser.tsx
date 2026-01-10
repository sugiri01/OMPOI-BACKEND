import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { IconX } from '@tabler/icons-react';
import clsx from 'clsx';

function RegisterUser({
  isCreateUserClicked,
  setIsCreateUserClicked,
}: {
  isCreateUserClicked: boolean;
  setIsCreateUserClicked: (value: boolean) => void;
}) {
  const handleCreateUser = () => {
    setIsCreateUserClicked(false);
    alert('User Created Successfully!');
  };
  return (
    <div
      className={clsx(
        'absolute top-0 bottom-0 left-0 right-0 backdrop-blur-xs bg-black/50 flex justify-center-safe items-center-safe',
        isCreateUserClicked ? 'block' : 'hidden',
      )}
    >
      <Card className="min-w-4/6 py-4 lg:min-w-2/6">
        <CardHeader className="flex flex-row justify-between items-center-safe border-b [.border-b]:pb-4">
          <CardTitle className="text-xl font-bold">Settings</CardTitle>
          <Button
            variant="ghost"
            className="hover:cursor-pointer"
            onClick={() => setIsCreateUserClicked(false)}
          >
            <IconX className="text-gray-700" />
          </Button>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col items-start gap-2">
            <Label className="font-bold text-gray-900 text-[0.95rem]">Full Name</Label>
            <Input
              placeholder="Enter full name"
              className="bg-green-50 focus-visible:ring-green-50 focus-visible:border-green-400"
            ></Input>
          </div>

          <div className="flex flex-col items-start gap-2">
            <Label className="font-bold text-gray-900 text-[0.95rem]">Email Address</Label>
            <Input
              placeholder="user@example.com"
              className="bg-green-50 focus-visible:ring-green-50 focus-visible:border-green-400"
            ></Input>
          </div>

          <div className="flex flex-col items-start gap-2">
            <Label className="font-bold text-gray-900 text-[0.95rem]">Role</Label>
            <Select defaultValue="select">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select role..." />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="select">Select role...</SelectItem>
                  <SelectItem value="buyer">Buyer</SelectItem>
                  <SelectItem value="seller">Seller</SelectItem>
                  <SelectItem value="agent">QC Agent</SelectItem>
                  <SelectItem value="admin">Agent</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col items-start gap-2">
            <Label className="font-bold text-gray-900 text-[0.95rem]">Phone Number</Label>
            <Input
              placeholder="+1 234 567 8900"
              className="bg-green-50 focus-visible:ring-green-50 focus-visible:border-green-400"
            ></Input>
          </div>
        </CardContent>
        <CardFooter className="border-t flex justify-end-safe">
          <div className="flex gap-2 items-center-safe">
            <Button
              variant="outline"
              className="font-bold bg-white hover:cursor-pointer"
              onClick={() => setIsCreateUserClicked(false)}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              className="bg-green-600 hover:bg-green-700 font-bold hover:cursor-pointer"
              onClick={handleCreateUser}
            >
              Create User
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default RegisterUser;
