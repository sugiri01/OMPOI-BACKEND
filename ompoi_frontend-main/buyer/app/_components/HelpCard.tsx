import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function HelpCard() {
  return (
    <Card className="py-4">
      <CardHeader className="px-4">
        <CardTitle className="text-lg">
          OMPOI: India&apos;s Leading Online Cashew Sourcing Platform
        </CardTitle>
        <CardDescription>
          We connect buyers with 150+ verified suppliers across 12 countries.
          Source RCN W320, W240, and other premium grades with multi-currency
          payment options and quality assurance.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-4">
        <Accordion
          type="single"
          collapsible
          className="w-full"
          defaultValue="item-1"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger className="font-bold text-base hover:no-underline">
              Why choose OMPOI for Cashew Sourcing?
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance text-gray-600">
              <p>
                Real-time pricing, 24x7 support, flexible payment terms, and
                best-in-market rates. Compare suppliers, check certifications,
                verify stock availability, and more.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger className="font-bold text-base hover:no-underline">
              How to source cashews online on OMPOI?
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance text-gray-600">
              <p>
                Select product & origin → compare suppliers → check stock &
                prices → add quantity details → pay securely → receive shipping
                confirmation & tracking.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger className="font-bold text-base hover:no-underline">
              Exclusive offers on OMPOI
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance text-gray-600">
              <p>
                Harvest season discounts, bulk order benefits, and loyalty
                rewards updated weekly.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger className="font-bold text-base hover:no-underline">
              FAQs related to OMPOI Sourcing
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance text-gray-600">
              <p>
                Browse our comprehensive FAQ section for more information on
                quality standards, shipping, and payment terms.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}

export default HelpCard;
