import { Button } from '@/components/ui/button';

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Label } from '@radix-ui/react-label';

import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemHeader,
  ItemMedia,
  ItemTitle,
} from '@/components/ui/item';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { IconChartInfographic, IconClipboardText, IconFileDescription, IconTrendingUp } from '@tabler/icons-react';

function page() {
  return (
    <div>
      <div className="mx-auto w-[87%]">
        <div className="flex items-center w-full justify-between py-5 flex-wrap">
          <div>
            <h1 className="font-extrabold text-3xl text-gray-800">Inspection Reports</h1>
            <p className="text-sm text-gray-600 my-1 font-medium">
              Generate and download quality inspection reports
            </p>
          </div>
          <div className="flex gap-4">
            <Button
              variant="outline"
              className="bg-white text-[0.92rem] rounded-md px-3 py-2 font-bold outline"
            >
              <span><IconChartInfographic /></span>Analytics
            </Button>
            <Button
              variant="default"
              className="bg-green-500 hover:bg-green-600 text-white text-[0.92rem] rounded-md px-3 py-2 font-bold"
            >
              <span><IconFileDescription /></span> Generate Report
            </Button>
          </div>
        </div>

        {/* center div */}
        <div className="flex flex-nowrap gap-4.5 mt-4.5 md:flex-wrap mid-w-[20%] max-lg:block">
          {/* left section */}
          <section className="flex flex-col gap-4.5 flex-5">
            <Card className="flex-1 bg-card">
              <CardHeader className="flex justify-between items-center-safe border-b">
                <CardTitle className="font-bold">Recent Reports</CardTitle>
                <CardAction>
                  <Button variant="link">View All</Button>
                </CardAction>
              </CardHeader>
              <CardContent>
                <div className="border p-3 rounded-md hover:border hover:border-green-500">
                  <div className="flex justify-between items-center-safe border-b mb-2 pb-4">
                    <div>
                      <h1 className="font-bold text-gray-800 mb-2.5 text-[1.05rem]">
                        Report: INS-2025-001
                      </h1>
                      <p className="text-xs text-gray-500">
                        RCN W320 • Guinea Origin • M/S RMT Nuts
                      </p>
                    </div>
                    <p className="text-[0.9rem] bg-green-100 text-green-800 font-bold rounded-md px-2 py-0.5">
                      Generated
                    </p>
                  </div>
                  <div className="grid grid-flow-row grid-cols-3 grid-rows-2 text-sm border-b pb-3 mb-2">
                    <p className="text-gray-500">Date Generated</p>
                    <p className="text-gray-500">Format</p>
                    <p className="text-gray-500">Size</p>
                    <p className="font-bold">Oct 15, 2025</p>
                    <p className="font-bold">PDF</p>
                    <p className="font-bold">2.4 MB</p>
                  </div>
                  <div className="flex justify-end-safe gap-2">
                    <Button variant="default" className="bg-green-600 text-white hover:bg-green-700 hover:cursor-pointer">
                      Download PDF
                    </Button>
                    <Button variant="outline">Email Report</Button>
                    <Button variant="outline">Preview</Button>
                  </div>
                </div>

                <div className="border p-3 rounded-md mt-3 hover:border hover:border-green-500">
                  <div className="flex justify-between items-center-safe border-b mb-2 pb-4">
                    <div>
                      <h1 className="font-bold text-gray-800 mb-2.5 text-[1.05rem]">
                        Report: INS-2024-999
                      </h1>
                      <p className="text-xs text-gray-500">
                        RCN W240 • Ghana Origin • African Traders
                      </p>
                    </div>
                    <p className="text-[0.9rem] bg-green-100 text-green-800 font-bold rounded-md px-2 py-0.5">
                      Generated
                    </p>
                  </div>
                  <div className="grid grid-flow-row grid-cols-3 grid-rows-2 text-sm border-b pb-3 mb-2">
                    <p className="text-gray-500">Date Generated</p>
                    <p className="text-gray-500">Format</p>
                    <p className="text-gray-500">Size</p>
                    <p className="font-bold">Oct 12, 2025</p>
                    <p className="font-bold">PDF</p>
                    <p className="font-bold">2.1 MB</p>
                  </div>
                  <div className="flex justify-end-safe gap-2">
                    <Button variant="default" className="bg-green-600 text-white hover:bg-green-700 hover:cursor-pointer">
                      Download PDF
                    </Button>
                    <Button variant="outline">Email Report</Button>
                    <Button variant="outline">Preview</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="flex-1 bg-card">
              <CardHeader className="flex justify-between items-center-safe border-b">
                <CardTitle className="font-bold">Monthly Summary</CardTitle>
                <CardAction>
                  <Button variant="link">View All</Button>
                </CardAction>
              </CardHeader>
              <CardContent>
                <div className="w-full h-72 rounded-md flex justify-center items-center-safe bg-green-50 gap-2">
                  <IconChartInfographic />
                  <p className="text-gray-500 pt-1">Chart: Inspections by Month</p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* right section */}
          <section className="flex flex-col gap-4.5 flex-2 max-lg:mt-4.5">
            <Card>
              <CardHeader className="border-b flex flex-col">
                <CardTitle>Report Templates</CardTitle>
              </CardHeader>
              <CardContent>
                <Item variant="outline" className="mb-3 hover:border hover:border-green-500">
                  <ItemHeader className="flex justify-start gap-4">
                    <span>
                      <IconClipboardText />
                    </span>
                    <div>
                      <ItemTitle className="font-bold text-[0.95rem]">Standard PSI</ItemTitle>
                      <ItemDescription>Pre-shipment Inspection</ItemDescription>
                    </div>
                  </ItemHeader>
                </Item>
                <Item variant="outline" className="mb-3 hover:border hover:border-green-500">
                  <ItemHeader className="flex justify-start gap-4">
                    <span>
                      <IconChartInfographic />
                    </span>
                    <div>
                      <ItemTitle className="font-bold text-[0.95rem]">Quality Summary</ItemTitle>
                      <ItemDescription>Monthly overview </ItemDescription>
                    </div>
                  </ItemHeader>
                </Item>
                <Item variant="outline" className='hover:border hover:border-green-500'>
                  <ItemHeader className="flex justify-start gap-4">
                    <span>
                      <IconTrendingUp />
                    </span>
                    <div>
                      <ItemTitle className="font-bold text-[0.95rem]">Trend Analysis</ItemTitle>
                      <ItemDescription>Performance metrics</ItemDescription>
                    </div>
                  </ItemHeader>
                </Item>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="border-b flex flex-col">
                <CardTitle>Export Options</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                <div>
                  <Label className="font-bold text-sm mb-2">Format</Label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Formats</SelectLabel>
                        <SelectItem value="apple" defaultChecked>
                          PDF Report
                        </SelectItem>
                        <SelectItem value="banana">Excel SpreadSheet</SelectItem>
                        <SelectItem value="blueberry">CSV Data</SelectItem>
                        <SelectItem value="grapes">JSON Export</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="font-bold text-sm mb-2">Date Range</Label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Formats</SelectLabel>
                        <SelectItem value="apple" defaultChecked>
                          Last 7 Days
                        </SelectItem>
                        <SelectItem value="banana">Last 30 days</SelectItem>
                        <SelectItem value="blueberry">Last 90 days</SelectItem>
                        <SelectItem value="grapes">Custom Range</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Button variant="default" className="bg-green-600 text-white w-full font-bold hover:bg-green-700 hover:cursor-pointer">
                    Export Reports
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
}

export default page;
