import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { IconPointFilled } from "@tabler/icons-react"


function ReviewCard({ title, info, origin }: { title: string, info: string, origin: string }) {
  return (
    <Card className="py-4 min-w-1/4">
        <CardContent className="px-4 flex flex-col gap-4">
            <CardTitle>{ title }</CardTitle>
            <div className="flex flex-wrap items-center-safe gap-0.5">
                <CardDescription className="text-xs">{ info }</CardDescription>
                <IconPointFilled size="10" className="text-gray-600"/>
                <CardDescription className="text-xs">{ origin }</CardDescription>
            </div>
        </CardContent>
    </Card>
  )
}

export default ReviewCard