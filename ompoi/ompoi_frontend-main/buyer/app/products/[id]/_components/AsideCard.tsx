import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AsideProductInfo from "./AsideProductInfo";
import OrderSummary from "./OrderSummary";

function AsideCard() {
  return (
    <Card className="py-4">
      <CardContent className="flex flex-col gap-4">
        <AsideProductInfo />
        <OrderSummary />
      </CardContent>
    </Card>
  );
}

export default AsideCard;
