import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";

function OfferCard({
  offer,
  status,
  code,
}: {
  offer: string;
  status: string;
  code: string;
}) {
  return (
    <Card className="gap-0 py-3 min-w-60">
      <CardHeader className="px-4">
        <CardDescription className="font-bold text-green-600 bg-green-50 px-2 py-0.5 w-fit rounded-full outline outline-green-500 text-[0.8rem]">
          {status}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-0.5 px-4">
        <p>{offer}</p>
        <CardDescription className="text-[0.8rem]">
          Use code: {code}
        </CardDescription>
      </CardContent>
    </Card>
  );
}

export default OfferCard;
