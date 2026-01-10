import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { IconPointFilled, IconStarFilled } from "@tabler/icons-react";

function PremiumSupplierCard({
  name,
  origin,
  stock,
  quality,
  rating,
  reviews,
}: {
  name: string;
  origin: string;
  stock: string;
  quality: string;
  rating: string;
  reviews: string;
}) {
  return (
    <Card className="gap-3 py-4 min-w-1/2 lg:min-w-1/4">
      <CardContent className="flex flex-col gap-1 px-4">
        <CardTitle>{name}</CardTitle>
        <div className="flex flex-row items-center-safe gap-0.5">
          <CardDescription className="text-xs" >{origin}</CardDescription>
          <IconPointFilled size="10" className="text-gray-600"/>
          <CardDescription className="text-xs" >{stock}</CardDescription>
          <IconPointFilled size="10" className="text-gray-600"/>
          <CardDescription className="text-xs" >{quality}</CardDescription>
        </div>
      </CardContent>
      <CardFooter className="flex flex-row items-center-safe gap-4 px-4">
        <CardDescription className="flex flex-row items-center-safe gap-0.5 bg-gray-100 outline text-black rounded-full px-2 py-0.5 text-xs">
          {rating} <IconStarFilled size="10" className="text-gray-800"/>
        </CardDescription>
        <CardDescription className="text-black bg-gray-100 px-2 py-0.5 rounded-full outline text-xs">{reviews} reviews</CardDescription>
      </CardFooter>
    </Card>
  );
}

export default PremiumSupplierCard;
