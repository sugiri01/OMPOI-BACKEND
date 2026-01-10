import Center from "@/components/Center";
import React from "react";
import MainHeader from "./_components/MainHeader";
import TopCard from "./_components/TopCard";
import {
  IconCheckbox,
  IconCoin,
  IconFileTypeDoc,
  IconMail,
  IconMessageCircle,
  IconPackage,
  IconPhone,
  IconShip,
  IconUser,
} from "@tabler/icons-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemHeader,
  ItemTitle,
} from '@/components/ui/item';
import { Button } from "@/components/ui/button";

function Page() {
  return (
    <div>
      <div className="relative pt-15 pb-15">
        <div className="bg-green-500 py-17">
          <Center>
            <MainHeader />
          </Center>
        </div>
        <Center>
          <div className="grid grid-flow-col grid-col-3 grid-rows-2 gap-4.5 relative -top-8 max-sm:grid-cols-1 max-sm:grid-rows-6 md:grid-cols-2 md:grid-rows-3 lg:grid-cols-3 lg:grid-rows-2">
            <TopCard
              title="Order Management"
              description="Learn how to place orders, track shipments, and manage your purchases effectively."
              icon={<IconPackage size="30" />}
            />
            <TopCard
              title="Payment & Billing"
              description="Understand payment terms, invoicing, and available payment methods for your orders."
              icon={<IconCoin size="30" />}
            />
            <TopCard
              title="Shipping & Delivery"
              description="Get information about shipping times, ports, logistics, and delivery processes."
              icon={<IconShip size="30" />}
            />
            <TopCard
              title="Quality Assurance"
              description="Learn about our quality standards, PSI inspections, and quality guarantees."
              icon={<IconCheckbox size="30" />}
            />
            <TopCard
              title="Supplier Information"
              description="Find out how to verify suppliers, check ratings, and communicate with vendors."
              icon={<IconUser size="30" />}
            />
            <TopCard
              title="Documentation"
              description="Access guides on required documents, contracts, certificates, and compliance."
              icon={<IconFileTypeDoc size="30" />}
            />
          </div>

          <div>
            <h1 className="text-center text-2xl font-bold text-gray-800">
              Frequently Asked Questions
            </h1>
            <div className="max-w-5xl mx-auto">
              <Accordion type="single" collapsible className="w-full mt-6 ">
                <AccordionItem value="item-1" className="border-b">
                  <AccordionTrigger className="w-full text-left py-4 px-2 text-gray-700 hover:bg-gray-100 font-bold ">
                    How do I track my order?
                  </AccordionTrigger>
                  <AccordionContent className="px-2 pb-4 text-gray-600">
                    You can track your order by logging into your account and
                    navigating to the &apos;Orders&apos; section. There, you
                    will find real-time updates on your shipment status.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2" className="border-b">
                  <AccordionTrigger className="w-full text-left py-4 px-2 font-bold text-gray-700 hover:bg-gray-100">
                    What payment methods are accepted?
                  </AccordionTrigger>
                  <AccordionContent className="px-2 pb-4 text-gray-600">
                    We accept various payment methods including bank transfers,
                    credit cards, and online payment platforms. Please refer to
                    our Payment & Billing section for more details.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3" className="border-b">
                  <AccordionTrigger className="w-full text-left py-4 px-2 font-bold text-gray-700 hover:bg-gray-100">
                    How can I contact customer support?
                  </AccordionTrigger>
                  <AccordionContent className="px-2 pb-4 text-gray-600">
                    You can reach our customer support team via the
                    &apos;Contact Us&apos; page on our website, or by emailing{" "}
                    <a
                      href="mailto:support@ompoi.com"
                      className="text-blue-600 underline"
                    >
                      support@ompoi.com
                    </a>
                    . We&apos;re available Monday–Friday, 9:00 AM–6:00 PM and
                    aim to respond within 24 hours.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4" className="border-b">
                  <AccordionTrigger className="w-full text-left py-4 px-2 font-bold text-gray-700 hover:bg-gray-100">
                    How long does shipping take?
                  </AccordionTrigger>
                  <AccordionContent className="px-2 pb-4 text-gray-600">
                    Shipping times vary by origin and destination port. Typical
                    lead times are: Benin to Mangalore (15 days), Ghana to
                    Mumbai (18-20 days), Tanzania to Chennai (20-22 days). These
                    are estimates and may vary due to port congestion or customs
                    clearance.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5" className="border-b">
                  <AccordionTrigger className="w-full text-left py-4 px-2 font-bold text-gray-700 hover:bg-gray-100">
                    What is Pre-Shipment Inspection (PSI)?
                  </AccordionTrigger>
                  <AccordionContent className="px-2 pb-4 text-gray-600">
                    PSI is a mandatory quality check performed before shipment.
                    Our certified agents inspect nut count, moisture content,
                    defective nuts, and foreign matter to ensure they meet
                    contract specifications. This service is included in all
                    orders to guarantee quality.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>

          <div className="max-w-5xl mx-auto mt-5 mb-5">
            <Card>
                <CardHeader className="flex flex-col items-center-safe text-center ">
                    <CardTitle className="text-xl font-bold text-gray-800">Still need help? Contact our support team</CardTitle>
                    <CardDescription className="text-gray-600 mt-2">Our team is available Monday to Saturday, 9 AM - 6 PM IST</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-flow-col grid-cols-3 grid-rows-1 gap-4.5 max-md:grid-cols-1 max-md:grid-rows-3">
                    <div>
                    <Item variant="outline" className="flex flex-col gap-2 justify-center items-center-safe">
                        <ItemHeader className="flex flex-col gap-2">
                            <ItemTitle className="text-gray-700"><div><IconPhone size="30"/></div></ItemTitle>
                            <ItemDescription>Phone Support</ItemDescription>
                        </ItemHeader>
                        <ItemContent>
                            <div className="font-bold text-[1rem] text-gray-800">+91-461-2321023</div>
                        </ItemContent>
                    </Item>
                    </div>
                    <div>
                    <Item variant="outline" className="flex flex-col gap-2 justify-center items-center-safe">
                        <ItemHeader className="flex flex-col gap-2">
                            <ItemTitle className="text-gray-700"><div><IconMail size="30"/></div></ItemTitle>
                            <ItemDescription>Email Support</ItemDescription>
                        </ItemHeader>
                        <ItemContent>
                            <div className="font-bold text-[1rem] text-gray-800">support@ompoi.com</div>
                        </ItemContent>
                    </Item>
                    </div>
                    <div>
                    <Item variant="outline" className="flex flex-col gap-2 justify-center items-center-safe">
                        <ItemHeader className="flex flex-col gap-2">
                            <ItemTitle className="text-gray-700"><div><IconMessageCircle size="30"/></div></ItemTitle>
                            <ItemDescription>Live Chat</ItemDescription>
                        </ItemHeader>
                        <ItemContent>
                            <div className="font-bold text-[1rem] text-gray-800">Available Now</div>
                        </ItemContent>
                    </Item>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-center items-center-safe">
                    <Button className="bg-green-500 hover:bg-green-600 text-white font-bold">Start Live Chat</Button>
                </CardFooter>
            </Card>
          </div>
        </Center>
      </div>
    </div>
  );
}

export default Page;
