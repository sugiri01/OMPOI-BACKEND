import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

function GetAppCard() {
  return (
    <Card className="w-full py-4">
      <CardContent className="flex flex-row justify-between items-center-safe px-4">
        <div className="flex flex-col gap-0.5">
          <CardTitle>Get the OMPOI App</CardTitle>
          <CardDescription className="text-sm">Download for faster sourcing and order tracking</CardDescription>
        </div>
        <div className="flex flex-row gap-4">
            <Button variant="outline" className="bg-card font-bold text-sm hover:cursor-pointer">Android</Button>
            <Button variant="outline" className="bg-card font-bold text-sm hover:cursor-pointer">iOS</Button>
            <Button variant="default" className="bg-green-600 font-bold text-sm hover:bg-green-700 hover:cursor-pointer">Download app</Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default GetAppCard;
