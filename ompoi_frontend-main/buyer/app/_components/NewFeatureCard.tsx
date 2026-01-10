import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"


function NewFeatureCard({ title, desc }: { title: string, desc: string }) {
  return (
    <Card className="gap-1 py-3 min-w-1/3">
        <CardContent className="px-4 flex flex-col gap-1">
            <CardTitle className="text-base">{ title }</CardTitle>
            <CardDescription className="text-xs">{ desc }</CardDescription>
        </CardContent>
    </Card>
  )
}

export default NewFeatureCard