import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
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

function Settings({
  isSettingsClicked,
  setIsSettingsClicked,
}: {
  isSettingsClicked: boolean;
  setIsSettingsClicked: (value: boolean | ((prev: boolean) => boolean)) => void;
}) {
  const handleSaveSetting = () => {
    setIsSettingsClicked(false);
    alert('Setting Saved');
  };
  return (
    <div
      className={clsx(
        'absolute top-0 bottom-0 left-0 right-0 backdrop-blur-xs bg-black/50 flex justify-center-safe items-center-safe',
        isSettingsClicked ? 'block' : 'hidden',
      )}
    >
      <Card className="min-w-4/6 py-4 lg:min-w-2/6">
        <CardHeader className="flex flex-row justify-between items-center-safe border-b [.border-b]:pb-4">
          <CardTitle className="text-xl font-bold">Settings</CardTitle>
          <Button
            variant="ghost"
            className="hover:cursor-pointer"
            onClick={() => setIsSettingsClicked(false)}
          >
            <IconX className="text-gray-700" />
          </Button>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col items-start gap-2">
            <Label className="font-bold text-gray-900 text-[0.95rem]">
              Notification Preferences
            </Label>
            <Select defaultValue="all_notifications">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All Notifications" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all_notifications">All Notifications</SelectItem>
                  <SelectItem value="imp">Important Only</SelectItem>
                  <SelectItem value="none">None</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col items-start gap-2">
            <Label className="font-bold text-gray-900 text-[0.95rem]">Theme</Label>
            <Select defaultValue="light">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Light Mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="light">Light Mode</SelectItem>
                  <SelectItem value="dark">Dark Mode</SelectItem>
                  <SelectItem value="auto">Auto</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col items-start gap-2">
            <Label className="font-bold text-gray-900 text-[0.95rem]">Language</Label>
            <Select defaultValue="en">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="English" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="sp">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter className="border-t flex justify-end-safe">
          <div className="flex gap-2 items-center-safe">
            <Button
              variant="outline"
              className="font-bold bg-white hover:cursor-pointer"
              onClick={() => setIsSettingsClicked(false)}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              className="bg-green-600 hover:bg-green-700 font-bold hover:cursor-pointer"
              onClick={handleSaveSetting}
            >
              Save Settings
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Settings;
