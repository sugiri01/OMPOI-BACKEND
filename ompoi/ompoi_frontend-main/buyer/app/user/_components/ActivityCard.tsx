
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Item, ItemDescription, ItemHeader, ItemTitle } from "@/components/ui/item"
import { IconCheckbox, IconCoin, IconNotes, IconPackage } from "@tabler/icons-react"

function ActivityCard() {
  return (
    <Card>
      <CardHeader className="border-b flex flex-col">
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
                  <Item variant="outline">
                    <ItemHeader className='flex justify-start gap-4'>
                    <span><IconPackage /></span>
                    <div>
                      <ItemTitle className='font-bold text-sm'>Order #5678 Shipped</ItemTitle>
                      <ItemDescription className="text-xs">2 hours ago</ItemDescription>
                    </div>
                    </ItemHeader>
                  </Item>
                  <Item variant="outline">
                    <ItemHeader className='flex justify-start gap-4'>
                    <span><IconCoin /></span>
                    <div>
                      <ItemTitle className='font-bold text-sm'>Payment Confirmed</ItemTitle>
                      <ItemDescription className="text-xs">5 hours ago</ItemDescription>
                    </div>
                    </ItemHeader>
                  </Item>
                  <Item variant="outline">
                    <ItemHeader className='flex justify-start gap-4'>
                    <span><IconCheckbox /></span>
                    <div>
                      <ItemTitle className='font-bold text-sm'>Order #4891 Delivered</ItemTitle>
                      <ItemDescription className="text-xs">1 day ago</ItemDescription>
                    </div>
                    </ItemHeader>
                  </Item>
                  <Item variant="outline">
                    <ItemHeader className='flex justify-start gap-4'>
                    <span><IconNotes /></span>
                    <div>
                      <ItemTitle className='font-bold text-sm'>New Quote Received</ItemTitle>
                      <ItemDescription className="text-xs">2 days ago</ItemDescription>
                    </div>
                    </ItemHeader>
                  </Item>
      </CardContent>
    </Card>
  )
}

export default ActivityCard