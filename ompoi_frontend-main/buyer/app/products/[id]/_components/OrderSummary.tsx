import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function OrderSummary() {
  return (
    <Card className="bg-gray-50 gap-3">
      <CardHeader className="flex justify-between items-center-safe">
        <CardTitle className="text-gray-600">Order Breakdown</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex justify-between items-center-safe border-b pb-1">
          <CardDescription className="font-bold text-[0.79rem]">Quantity</CardDescription>
          <CardDescription className="font-bold text-[0.84rem] text-black/90">190 MT</CardDescription>
        </div>
        <div className="flex justify-between items-center-safe border-b pb-1">
          <CardDescription className="font-bold text-[0.79rem]">Price per kg</CardDescription>
          <CardDescription className="font-bold text-[0.84rem] text-green-700">$7.80</CardDescription>
        </div>
        <div className="flex justify-between items-center-safe border-b pb-1">
          <CardDescription className="font-bold text-[0.79rem]">Total Order Value</CardDescription>
          <CardDescription className="font-bold text-[0.84rem] text-green-700">$1,170,000</CardDescription>
        </div>
        <div className="flex justify-between items-center-safe border-b pb-1">
          <CardDescription className="font-bold text-[0.79rem]">Estimated Delivery</CardDescription>
          <CardDescription className="font-bold text-[0.84rem] text-black/90">15 Days (Mangalore Port)</CardDescription>
        </div>
        <div className="flex justify-between items-center-safe border-b pb-1">
          <CardDescription className="font-bold text-[0.79rem]">Sourcing Fee (1%)</CardDescription>
          <CardDescription className="font-bold text-[0.84rem] text-black/90">$11,700</CardDescription>
        </div>
        </CardContent>
    </Card>

  )
}

export default OrderSummary