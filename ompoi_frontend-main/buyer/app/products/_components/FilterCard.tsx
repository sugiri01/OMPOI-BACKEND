import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface FilterCardProps {
  filters: {
    origins: string[];
    is_primo: boolean;
    certifications: string[];
    nut_counts: string[];
    min_rating: number | null;
  };
  onFilterChange: (filters: any) => void;
  onReset: () => void;
}

function FilterCard({ filters, onFilterChange, onReset }: FilterCardProps) {
  const toggleOrigin = (origin: string) => {
    const newOrigins = filters.origins.includes(origin)
      ? filters.origins.filter(o => o !== origin)
      : [...filters.origins, origin];
    onFilterChange({ ...filters, origins: newOrigins });
  };

  const toggleCertification = (cert: string) => {
    const newCerts = filters.certifications.includes(cert)
      ? filters.certifications.filter(c => c !== cert)
      : [...filters.certifications, cert];
    onFilterChange({ ...filters, certifications: newCerts });
  };

  const toggleNutCount = (count: string) => {
    const newCounts = filters.nut_counts.includes(count)
      ? filters.nut_counts.filter(c => c !== count)
      : [...filters.nut_counts, count];
    onFilterChange({ ...filters, nut_counts: newCounts });
  };

  return (
    <Card>
      <CardHeader className="flex justify-between gap-4 border-b">
        <CardTitle className="font-bold">Filter suppliers</CardTitle>
        <CardAction className="text-sm cursor-pointer" onClick={onReset}>Reset</CardAction>
      </CardHeader>
      <CardContent>
        <div>
          <div className="flex flex-col gap-3 mt-2">
            <div className="flex gap-2">
              <Checkbox
                checked={filters.is_primo}
                onCheckedChange={() => onFilterChange({ ...filters, is_primo: !filters.is_primo })}
              />
              <Label>Primo Supplier</Label>
            </div>
            <div className="flex gap-2">
              <Checkbox
                checked={filters.origins.includes("Benin")}
                onCheckedChange={() => toggleOrigin("Benin")}
              />
              <Label>Benin</Label>
            </div>
            <div className="flex gap-2">
              <Checkbox
                checked={filters.origins.includes("Ghana")}
                onCheckedChange={() => toggleOrigin("Ghana")}
              />
              <Label>Ghana</Label>
            </div>
            <div className="flex gap-2">
              <Checkbox
                checked={filters.origins.includes("Côte d'Ivoire")}
                onCheckedChange={() => toggleOrigin("Côte d'Ivoire")}
              />
              <Label>Cote d&apos;Ivoire</Label>
            </div>
            <div className="flex gap-2">
              <Checkbox
                checked={filters.origins.includes("Tanzania")}
                onCheckedChange={() => toggleOrigin("Tanzania")}
              />
              <Label>Tanzania</Label>
            </div>
            <div className="flex gap-2">
              <Checkbox
                checked={filters.certifications.includes("RBS Certified")}
                onCheckedChange={() => toggleCertification("RBS Certified")}
              />
              <Label>RBS Certified</Label>
            </div>
          </div>
          <div className="flex flex-col gap-3 mt-2">
            <h1 className="font-bold text-sm">Nut Count Range</h1>
            <div className="flex flex-col gap-3 pl-2">
              <div className="flex gap-2">
                <Checkbox
                  checked={filters.nut_counts.includes("180-185")}
                  onCheckedChange={() => toggleNutCount("180-185")}
                />
                <Label>180-185/kg</Label>
              </div>
              <div className="flex gap-2">
                <Checkbox
                  checked={filters.nut_counts.includes("185-195")}
                  onCheckedChange={() => toggleNutCount("185-195")}
                />
                <Label>185-195/kg</Label>
              </div>
              <div className="flex gap-2">
                <Checkbox
                  checked={filters.nut_counts.includes("190")}
                  onCheckedChange={() => toggleNutCount("190")}
                />
                <Label>190/kg</Label>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3 mt-2">
            <h1 className="font-bold text-sm">More</h1>
            <div className="flex flex-col gap-3 pl-2">
              <div className="flex gap-2">
                <Checkbox
                  checked={filters.min_rating !== null && filters.min_rating >= 4.5}
                  onCheckedChange={(checked) => onFilterChange({ ...filters, min_rating: checked ? 4.5 : null })}
                />
                <Label>High Rated (4.5+)</Label>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default FilterCard;
