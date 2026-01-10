'use client';

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

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

import { Button } from '@/components/ui/button';
import {
  IconChartInfographic,
  IconCheckbox,
  IconForklift,
  IconHourglass,
  IconSearch,
  IconX,
  IconXboxX,
} from '@tabler/icons-react';
import { useRouter } from 'next/navigation';

function Page() {
  const router = useRouter();

  return (
    <div>
      <div className="mx-auto w-[87%]">
        <div className="flex items-center w-full justify-between py-5 flex-wrap">
          <div>
            <h1 className="font-extrabold text-3xl text-gray-800">All Inspections</h1>
            <p className="text-sm text-gray-600 my-1 font-medium">
              View and manage all quality inspections
            </p>
          </div>
          <div className="flex gap-4">
            <Button
              variant="outline"
              className="bg-white text-[0.92rem] rounded-md px-3 py-2 font-bold outline"
            >
              <span>
                <IconForklift />
              </span>
              Export
            </Button>
            <Button
              variant="outline"
              className="bg-white text-[0.92rem] rounded-md px-3 py-2 font-bold outline"
            >
              <span>
                <IconSearch />
              </span>
              Filter
            </Button>
            <Button
              variant="default"
              className="bg-green-500 hover:bg-green-600 text-white text-[0.92rem] rounded-md px-3 py-2 font-bold hover:cursor-pointer"
              onClick={() => router.push('/generate_inspection')}
            >
              + New Inspection
            </Button>
          </div>
        </div>

        {/* top cards */}
        <div className="flex flex-wrap gap-4.5 justify-between">
          <Card className="flex-1 bg-card min-w-60 gap-2 hover:shadow-md hover:transition-all hover:relative hover:bottom-0.5">
            <CardHeader className="flex justify-between items-center">
              <span>
                <IconChartInfographic />
              </span>
            </CardHeader>
            <CardContent>
              <h1 className="font-bold text-3xl text-gray-800">156</h1>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-gray-600">Total Inspections</p>
            </CardFooter>
          </Card>
          <Card className="flex-1 bg-card min-w-60 gap-2 hover:shadow-md hover:transition-all hover:relative hover:bottom-0.5">
            <CardHeader className="flex justify-between items-center">
              <span>
                <IconHourglass />
              </span>
            </CardHeader>
            <CardContent>
              <h1 className="font-bold text-3xl text-gray-800">3</h1>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-gray-600">Pending</p>
            </CardFooter>
          </Card>
          <Card className="flex-1 bg-card min-w-60 gap-2 hover:shadow-md hover:transition-all hover:relative hover:bottom-0.5">
            <CardHeader className="flex justify-between items-center">
              <span>
                <IconCheckbox />
              </span>
            </CardHeader>
            <CardContent>
              <h1 className="font-bold text-3xl text-gray-800">149</h1>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-gray-600">Completed</p>
            </CardFooter>
          </Card>
          <Card className="flex-1 bg-card min-w-60 gap-2 hover:shadow-md hover:transition-all hover:relative hover:bottom-0.5">
            <CardHeader className="flex justify-between items-center">
              <span>
                <IconXboxX />
              </span>
            </CardHeader>
            <CardContent>
              <h1 className="font-bold text-3xl text-gray-800">4</h1>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-gray-600">Failed</p>
            </CardFooter>
          </Card>
        </div>

        <div className="mt-5">
          <Card>
            <CardHeader className="border-b flex justify-between items-center-safe">
              <CardTitle className="font-bold text-lg">Recent Inspections</CardTitle>
              <div className="flex gap-2">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="allStatus">All Status</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="inProgress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="failed">Failed</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>

                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="This Month" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="thisMonth">This Month</SelectItem>
                      <SelectItem value="7d">Last 7 days</SelectItem>
                      <SelectItem value="30d">Last 30 days</SelectItem>
                      <SelectItem value="90d">Last 90 days</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>

            <CardContent>
              <div className="text-sm font-bold">
                <div className="grid grid-cols-10 gap-4 border-b pb-2 mb-3 bg-blue-50 items-center-safe px-2 pt-2">
                  <p>Inspection ID</p>
                  <p className="col-span-2">B/L Number</p>
                  <p>Seller → Buyer</p>
                  <p>Origin</p>
                  <p>Date</p>
                  <p className="col-span-2">Status</p>
                  <p>Result </p>
                  <p>Actions</p>
                </div>

                <div className="grid grid-cols-10 gap-4 border-b pb-2 mb-3 items-center-safe px-2">
                  <p className="font-extrabold">INS-2025-001</p>
                  <p className="col-span-2">MEDUCN08830b</p>
                  <p>RMT Nuts {'->'} Shree Balaji</p>
                  <p>Guinea</p>
                  <p>Oct 15, 2025</p>
                  <p className="col-span-2 text-[0.9rem] w-fit bg-orange-100 text-orange-800 font-bold rounded-full outline outline-orange-200 px-2 py-0.5">
                    Pending
                  </p>
                  <p>-</p>
                  <div className="flex justify-center">
                    <Button variant="outline" className="w-fit font-bold">
                      Open
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-10 gap-4 border-b pb-2 mb-3 items-center-safe px-2">
                  <p className="font-extrabold">INS-2025-002</p>
                  <p className="col-span-2">BENIN-W320-5678</p>
                  <p>Global Cashew {'->'} Premium</p>
                  <p>Benin</p>
                  <p>Oct 14, 2025</p>
                  <p className="col-span-2 text-[0.9rem] w-fit bg-blue-100 text-blue-800 font-bold rounded-full outline outline-blue-200 px-2 py-0.5">
                    In Progress
                  </p>
                  <p>-</p>
                  <div className="flex justify-center">
                    <Button variant="outline" className="w-fit font-bold">
                      Open
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-10 gap-4 border-b pb-2 mb-3 items-center-safe px-2">
                  <p className="font-extrabold">INS-2025-000</p>
                  <p className="col-span-2">TANZANIA-8901</p>
                  <p>Tanzania supp {'->'} Mumbai</p>
                  <p>Tanzania</p>
                  <p>Oct 13, 2025</p>
                  <p className="col-span-2 text-[0.9rem] w-fit bg-green-100 text-green-800 font-bold rounded-full outline outline-green-300 px-2 py-0.5">
                    Completed
                  </p>
                  <p className="text-xs w-fit bg-green-100 text-green-800 font-bold rounded-md outline outline-green-200 px-2.5 py-1">
                    Pass
                  </p>
                  <div className="flex justify-center">
                    <Button variant="outline" className="w-fit font-bold">
                      View
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-10 gap-4 border-b pb-2 mb-3 items-center-safe px-2">
                  <p className="font-extrabold">INS-2025-999</p>
                  <p className="col-span-2">GHANA-W240-3421</p>
                  <p>African Traders {'->'} Kerala</p>
                  <p>Ghanaa</p>
                  <p>Oct 12, 2025</p>
                  <p className="col-span-2 text-[0.9rem] w-fit bg-green-100 text-green-800 font-bold rounded-full outline outline-green-300 px-2 py-0.5">
                    Completed
                  </p>
                  <p className="text-xs w-fit bg-green-100 text-green-800 font-bold rounded-md outline outline-green-200 px-2.5 py-1">
                    Pass
                  </p>
                  <div className="flex justify-center">
                    <Button variant="outline" className="w-fit font-bold">
                      View
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-10 gap-4 border-b pb-2 mb-3 items-center-safe px-2">
                  <p className="font-extrabold">INS-2025-998</p>
                  <p className="col-span-2">IVOIRE-W320-2109</p>
                  <p>West African {'->'} OMPOI</p>
                  <p>Cote d&apos;Ivoire</p>
                  <p>Oct 10, 2025</p>
                  <p className="col-span-2 text-[0.9rem] w-fit bg-green-100 text-green-800 font-bold rounded-full outline outline-green-300 px-2 py-0.5">
                    Completed
                  </p>
                  <p className="text-xs w-fit bg-green-100 text-green-800 font-bold rounded-md outline outline-green-200 px-2.5 py-1">
                    Pass
                  </p>
                  <div className="flex justify-center">
                    <Button variant="outline" className="w-fit font-bold">
                      View
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-10 gap-4 items-center-safe px-2">
                  <p className="font-extrabold">INS-2025-997</p>
                  <p className="col-span-2">BENIN-W180-7834</p>
                  <p>Premium Cashew {'->'} Global</p>
                  <p>Benin</p>
                  <p>Oct 08, 2025</p>
                  <p className="col-span-2 text-[0.9rem] w-fit bg-red-100 text-red-800 font-bold rounded-full outline outline-red-300 px-2 py-0.5">
                    Failed
                  </p>
                  <p className="text-xs w-fit bg-red-100 text-red-800 font-bold rounded-md outline outline-red-200 px-2.5 py-1">
                    Fail
                  </p>
                  <div className="flex justify-center">
                    <Button variant="outline" className="w-fit font-bold">
                      Open
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Page;
