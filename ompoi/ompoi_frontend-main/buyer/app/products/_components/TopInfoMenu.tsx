import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function TopInfoMenu() {
  return (
    <Card>
        <CardHeader className="flex justify-between gap-4 items-center-safe">
            <div className="flex gap-3 items-center-safe">
                <CardTitle>45 suppliers found</CardTitle>
                <CardDescription className="rounded-full bg-gray-200 text-xs text-black py-1 px-2 outline">150+ verified suppliers for RCN cashews</CardDescription>
            </div>
            <div className="flex justify-between gap-3 items-center-safe text-sm">
                <h4>Sort by:</h4>
                <div className="flex justify-between gap-3 items-center-safe text-blue-600">
                    <p>Ratings</p>
                    <p>Price</p>
                    <p>Lead Time</p>
                </div>
            </div>
        </CardHeader>
    </Card>
  )
}

export default TopInfoMenu