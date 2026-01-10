'use client';

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

import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemHeader,
  ItemMedia,
  ItemTitle,
} from '@/components/ui/item';

import ListItem from './_components/ListItem';
import { AdminTasksList } from './_components/ListItem';
import { StyleClass } from './_components/ListItem';
import {
  IconAlertTriangle,
  IconAlertTriangleFilled,
  IconChartInfographic,
  IconCheckbox,
  IconClipboardText,
  IconClipboardTextFilled,
  IconFileTypeDoc,
  IconHourglass,
  IconHourglassFilled,
  IconSettings,
  IconSquareCheckFilled,
} from '@tabler/icons-react';
import { useRouter } from 'next/navigation';

const users: Array<AdminTasksList> = [
  {
    key: 1,
    title: '#U00128: John Doe',
    info: 'Role: Seller | Last Login: 5 mins ago',
    status: 'Active',
    controlBtn: 'Manage',
  },
  {
    key: 2,
    title: '#U00055: Jane Smith',
    info: 'Role: Buyer | Last Login: 2 days ago',
    status: 'Active',
    controlBtn: 'Manage',
  },
  {
    key: 3,
    title: '#U00340: Tech Tester',
    info: 'Role: QC Agent | Status: Account Locked',
    status: 'Locked',
    controlBtn: 'Unlock',
  },
  {
    key: 4,
    title: '#U00401: New User',
    info: 'Role: Buyer | Status: Email Verification Pending',
    status: 'Pending',
    controlBtn: 'Verify',
  },
];

const usersStyle: Array<StyleClass> = [
  { statusColor: 'text-green-800', bgStatus: 'bg-green-100', border: 'border-b' },
  { statusColor: 'text-green-800', bgStatus: 'bg-green-100', border: 'border-b' },
  { statusColor: 'text-red-800', bgStatus: 'bg-red-100', border: 'border-b' },
  { statusColor: 'text-orange-800', bgStatus: 'bg-orange-100', border: '' },
];

const operations: Array<AdminTasksList> = [
  {
    key: 1,
    title: '#ORD-9012: Cashew Lot 42',
    info: 'Action: QC Report Approval | Seller: East Africa Traders',
    status: 'Pending QC',
    controlBtn: 'Review',
  },
  {
    key: 2,
    title: '#TXN-1002: $15,000 Payment',
    info: 'Action: High Value Transaction Approval | Buyer: Global Nuts Inc.',
    status: 'Hold',
    controlBtn: 'Approve',
  },
  {
    key: 3,
    title: '#RPT-0048: User Profile Change',
    info: 'Action: Name Change Verification | User: #U00321',
    status: 'Verification',
    controlBtn: 'Verify',
  },
];

const operationsStyle: Array<StyleClass> = [
  { statusColor: 'text-orange-800', bgStatus: 'bg-orange-100', border: 'border-b' },
  { statusColor: 'text-red-800', bgStatus: 'bg-red-100', border: 'border-b' },
  { statusColor: 'text-blue-800', bgStatus: 'bg-blue-100', border: '' },
];

export default function Home() {
  const router = useRouter();
  return (
    <div>
      <div className="mx-auto w-[87%]">
        <div className="flex items-center w-full justify-between py-5 flex-wrap">
          <div>
            <h1 className="font-extrabold text-3xl text-gray-800">
              Welcome back, Agent Ramachandra! 👋
            </h1>
            <p className="text-sm text-gray-600 my-1 font-medium">
              Tuesday, October 15, 2025 • Tuticorin Port, Tamil Nadu
            </p>
          </div>
          <div className="flex gap-4">
            <Button
              variant="outline"
              className="bg-white text-[0.92rem] rounded-md px-3 py-2 font-bold outline hover:cursor-pointer"
              onClick={() => router.push('/reports')}
            >
              <span className="relative bottom-0.5">
                <IconChartInfographic />
              </span>
              View Reports
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
                <IconSquareCheckFilled className="text-green-400 bg-green-50" />
              </span>
            </CardHeader>
            <CardContent>
              <h1 className="font-bold text-3xl text-gray-800">24</h1>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-gray-600">Inspections This Month</p>
            </CardFooter>
          </Card>
          <Card className="flex-1 bg-card min-w-60 gap-2 hover:shadow-md hover:transition-all hover:relative hover:bottom-0.5">
            <CardHeader className="flex justify-between items-center">
              <span>
                <IconHourglass className="text-gray-600 bg-green-50" />
              </span>
            </CardHeader>
            <CardContent>
              <h1 className="font-bold text-3xl text-gray-800">3</h1>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-gray-600">Pending Inspections</p>
            </CardFooter>
          </Card>
          <Card className="flex-1 bg-card min-w-60 gap-2 hover:shadow-md hover:transition-all hover:relative hover:bottom-0.5">
            <CardHeader className="flex justify-between items-center">
              <span>
                <IconClipboardTextFilled className="text-gray-600 bg-green-50" />
              </span>
            </CardHeader>
            <CardContent>
              <h1 className="font-bold text-3xl text-gray-800">95.8%</h1>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-gray-600">Average Pass Rate</p>
            </CardFooter>
          </Card>
          <Card className="flex-1 bg-card min-w-60 gap-2 hover:shadow-md hover:transition-all hover:relative hover:bottom-0.5">
            <CardHeader className="flex justify-between items-center">
              <span>
                <IconAlertTriangleFilled className="text-yellow-500 bg-green-50" />
              </span>
            </CardHeader>
            <CardContent>
              <h1 className="font-bold text-3xl text-gray-800">1</h1>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-gray-600">Failed Inspections</p>
            </CardFooter>
          </Card>
        </div>

        {/* flex container for remaining body */}
        <div className="flex flex-nowrap gap-4.5 mt-4.5 md:flex-wrap mid-w-[20%] max-lg:block">
          {/* container for left section */}
          <section className="flex flex-col gap-4.5 flex-5">
            <Card className="flex-1 bg-card">
              <CardHeader className="flex justify-between items-center-safe border-b">
                <CardTitle className="font-bold">Pending Inspections</CardTitle>
                <CardAction>
                  <Button variant="link">View All</Button>
                </CardAction>
              </CardHeader>
              <CardContent>
                <div className="border p-3 rounded-md hover:border hover:border-green-500">
                  <div className="flex justify-between items-center-safe border-b mb-2 pb-4">
                    <div>
                      <h1 className="font-bold text-gray-800 mb-2.5 text-[1.05rem]">
                        INS-2025-001
                      </h1>
                      <p className="text-xs text-gray-500">
                        B/L:MEDUCN08830b . M/S RMT Nuts -{'>'} M/S Shree Balaji Cashew
                      </p>
                    </div>
                    <p className="text-[0.9rem] bg-orange-100 text-orange-800 font-bold rounded-md px-2 py-0.5">
                      Pending
                    </p>
                  </div>
                  <div className="grid grid-flow-row grid-cols-3 grid-rows-2 text-sm">
                    <p className="text-gray-500">Origin</p>
                    <p className="text-gray-500">Quantity</p>
                    <p className="text-gray-500">Scheduled</p>
                    <p className="font-bold">Guinea</p>
                    <p className="font-bold">4x40&apos;Containers</p>
                    <p className="font-bold">Oct 15, 2025</p>
                  </div>
                </div>

                <div className="border p-3 rounded-md mt-3 hover:border hover:border-green-500">
                  <div className="flex justify-between items-center-safe border-b mb-2 pb-4">
                    <div>
                      <h1 className="font-bold text-gray-800 mb-2.5 text-[1.05rem]">
                        INS-2025-002
                      </h1>
                      <p className="text-xs text-gray-500">
                        B/L:BENIN-W320-5678 . Global Cashew Traders -{'>'} Premium Processors
                      </p>
                    </div>
                    <p className="text-[0.9rem] bg-blue-100 text-blue-800 font-bold rounded-md px-2 py-0.5">
                      In Progress
                    </p>
                  </div>
                  <div className="grid grid-flow-row grid-cols-3 grid-rows-2 text-sm">
                    <p className="text-gray-500">Origin</p>
                    <p className="text-gray-500">Quantity</p>
                    <p className="text-gray-500">Started</p>
                    <p className="font-bold">Benin</p>
                    <p className="font-bold">150 MT</p>
                    <p className="font-bold">Oct 14, 2025</p>
                  </div>
                </div>

                <div className="border p-3 rounded-md mt-3 hover:border hover:border-green-500">
                  <div className="flex justify-between items-center-safe border-b mb-2 pb-4">
                    <div>
                      <h1 className="font-bold text-gray-800 mb-2.5 text-[1.05rem]">
                        INS-2025-003
                      </h1>
                      <p className="text-xs text-gray-500">
                        B/L:GHANA-W240-3421 . African Traders -{'>'} Kerala Premium
                      </p>
                    </div>
                    <p className="text-[0.9rem] bg-orange-100 text-orange-800 font-bold rounded-md px-2 py-0.5">
                      Pending
                    </p>
                  </div>
                  <div className="grid grid-flow-row grid-cols-3 grid-rows-2 text-sm">
                    <p className="text-gray-500">Origin</p>
                    <p className="text-gray-500">Quantity</p>
                    <p className="text-gray-500">Scheduled</p>
                    <p className="font-bold">Ghana</p>
                    <p className="font-bold">100 MT</p>
                    <p className="font-bold">Oct 16, 2025</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="flex-1 bg-card ">
              <CardHeader className="flex justify-between items-center-safe border-b">
                <CardTitle className="font-bold">Recent Completed Inspections</CardTitle>
                <CardAction>
                  <Button variant="link">View All</Button>
                </CardAction>
              </CardHeader>
              <CardContent>
                <div className="border p-3 rounded-md mt-3 hover:border hover:border-green-500">
                  <div className="flex justify-between items-center-safe border-b mb-2 pb-4">
                    <div>
                      <h1 className="font-bold text-gray-800 mb-2.5 text-[1.05rem]">
                        INS-2025-000
                      </h1>
                      <p className="text-xs text-gray-500">
                        B/L:TANZANIA-W320-8901 . Tanzania Suppliers -{'>'} Mumbai Port
                      </p>
                    </div>
                    <p className="text-[0.9rem] bg-green-100 text-green-800 font-bold rounded-md px-2 py-0.5">
                      Passed
                    </p>
                  </div>
                  <div className="grid grid-flow-row grid-cols-3 grid-rows-2 text-sm">
                    <p className="text-gray-500">Count</p>
                    <p className="text-gray-500">Outturn</p>
                    <p className="text-gray-500">Completed</p>
                    <p className="font-bold">190/kg</p>
                    <p className="font-bold">48.5 LBS</p>
                    <p className="font-bold">Oct 13, 2025</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* container for right section */}
          <section className="flex flex-col gap-4.5 flex-2 max-lg:mt-4.5">
            <Card>
              <CardHeader className="border-b [.border-b]:pb-3">
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <Item variant="outline" className="mb-3 hover:border hover:border-green-500">
                  <ItemHeader className="flex justify-start gap-4">
                    <span>
                      <IconClipboardText />
                    </span>
                    <div>
                      <ItemTitle className="font-bold text-[0.95rem]">New Inspection</ItemTitle>
                      <ItemDescription>Start PSI Inspection</ItemDescription>
                    </div>
                  </ItemHeader>
                </Item>
                <Item variant="outline" className="mb-3 hover:border hover:border-green-500">
                  <ItemHeader className="flex justify-start gap-4">
                    <span>
                      <IconChartInfographic />
                    </span>
                    <div>
                      <ItemTitle className="font-bold text-[0.95rem]">View All</ItemTitle>
                      <ItemDescription>All Inspections</ItemDescription>
                    </div>
                  </ItemHeader>
                </Item>
                <Item variant="outline" className="mb-3 hover:border hover:border-green-500">
                  <ItemHeader className="flex justify-start gap-4">
                    <span>
                      <IconFileTypeDoc />
                    </span>
                    <div>
                      <ItemTitle className="font-bold text-[0.95rem]">Generate Report</ItemTitle>
                      <ItemDescription>Download PDF</ItemDescription>
                    </div>
                  </ItemHeader>
                </Item>
                <Item variant="outline" className='hover:border hover:border-green-500'>
                  <ItemHeader className="flex justify-start gap-4">
                    <span>
                      <IconSettings />
                    </span>
                    <div>
                      <ItemTitle className="font-bold text-[0.95rem]">Settings</ItemTitle>
                      <ItemDescription>Preferences</ItemDescription>
                    </div>
                  </ItemHeader>
                </Item>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="border-b [.border-b]:pb-3">
                <CardTitle>Today&apos;s Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="m-2 px-4 py-4.5 bg-blue-50 border rounded-md flex flex-col gap-2">
                  <div className="flex justify-between border-b pb-2">
                    <p className="text-sm font-bold text-gray-500">Location</p>
                    <p className="text-gray-800 text-[0.96rem] font-bold">Tuticorin Port</p>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <p className="text-sm font-bold text-gray-500">Pending</p>
                    <p className="font-semibold text-[0.96rem] text-orange-700">3 inspections</p>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <p className="text-sm font-bold text-gray-500">Time Slot</p>
                    <p className="font-semibold text-[0.96rem] text-gray-800">9:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
}
