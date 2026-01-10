import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function TopCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <Card className="min-w-[20%] flex-1 shadow-lg shadow-gray-500/10">
      <CardHeader className="flex flex-col justify-between gap-4 items-center-safe md:flex-col lg:flex-row">
        <CardTitle className="text-center">{title}</CardTitle>
        <CardDescription className="text-xs text-gray-500 text-center">
          {description}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}

export default TopCard;
