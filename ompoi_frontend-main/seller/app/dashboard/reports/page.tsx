"use client";

import React, { useState } from "react";
import {
  IconTrendingUp,
  IconPackage,
  IconClock,
  IconCheck,
  IconCalendar,
  IconX,
} from "@tabler/icons-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const navbarItems = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Orders", href: "/dashboard/orders" },
  { name: "Inventory", href: "/dashboard/inventory" },
  { name: "Reports", href: "/dashboard/reports", active: true },
  { name: "Help", href: "#" },
];

const tabs = [
  "Overview",
  "Order Reports",
  "Inventory Reports",
  "Finance Reports",
  "Saved",
];

const ReportsPage = () => {
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [activeTab, setActiveTab] = useState("Overview");

  const [reportType, setReportType] = useState("Finance – Monthly Sales");
  const [format, setFormat] = useState("CSV");
  const [schedule, setSchedule] = useState("Run now");
  const [includeTaxes, setIncludeTaxes] = useState(true);
  const [excludeCancelled, setExcludeCancelled] = useState(false);
  const [topSKUsOnly, setTopSKUsOnly] = useState(false);
  const [includeBuyerDetails, setIncludeBuyerDetails] = useState(false);

  const [reports, setReports] = useState([
    {
      name: "Monthly Sales Summary",
      type: "Finance",
      lastRun: "13 Oct 2025, 18:05",
      owner: "Sudhir",
    },
    {
      name: "Order SLA Compliance",
      type: "Order",
      lastRun: "12 Oct 2025, 11:42",
      owner: "Sumitha",
    },
    {
      name: "Inventory Aging (30/60/90)",
      type: "Inventory",
      lastRun: "10 Oct 2025, 09:12",
      owner: "Ops",
    },
  ]);

  const handleGenerateReport = () => {
    const newReport = {
      name: reportType,
      type: reportType.split(" – ")[0],
      lastRun: new Date().toLocaleString(),
      owner: "You",
    };
    setReports([newReport, ...reports]);
    setShowGenerateModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/*Header*/}
      <header className="bg-white border-b border-gray-200 px-4 py-3 md:px-6 md:py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center text-white font-bold">
              O
            </div>
            <span className="text-xl font-bold">OMPOI Seller Platform</span>
          </div>
          <nav className="flex flex-wrap gap-3 md:gap-6 items-center">
            {navbarItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`${
                  item.active
                    ? "text-green-600 font-semibold"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {item.name}
              </a>
            ))}
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
              OM
            </div>
          </nav>
        </div>
      </header>

      <main className="px-4 py-6 md:px-6 md:py-8 space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <h1 className="text-3xl font-bold">View & Generate Reports</h1>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline">Schedule</Button>
            <Button onClick={() => setShowGenerateModal(true)}>Generate Report</Button>
          </div>
        </div>

        <Card className="bg-blue-50 border-blue-200 flex items-start gap-3">
          <div className="mt-1">
            <IconTrendingUp className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-blue-900 text-sm md:text-base">
            <span className="font-semibold">Tip:</span> Use filters to narrow by
            product, status, buyer, or date. Saved configurations appear under
            the "Saved" tab.
          </p>
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex justify-between items-center">
              <CardTitle className="text-sm text-gray-600">
                THIS MONTH REVENUE
              </CardTitle>
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">💰</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-1">₹ 2.84M</div>
              <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
                <span>▲</span>
                <span>8.1% MoM</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex justify-between items-center">
              <CardTitle className="text-sm text-gray-600">ORDERS COVERED</CardTitle>
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <IconPackage className="w-5 h-5 text-orange-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-1">312</div>
              <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
                <span>▲</span>
                <span>3.4%</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex justify-between items-center">
              <CardTitle className="text-sm text-gray-600">AVG. FULFILLMENT TIME</CardTitle>
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <IconClock className="w-5 h-5 text-yellow-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-1">2.3 days</div>
              <div className="flex items-center gap-1 text-red-600 text-sm font-medium">
                <span>▼</span>
                <span>0.2d</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex justify-between items-center">
              <CardTitle className="text-sm text-gray-600">ON-TIME DELIVERY</CardTitle>
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <IconCheck className="w-5 h-5 text-green-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-1">97.6%</div>
              <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
                <span>▲</span>
                <span>0.6%</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <div className="flex flex-wrap gap-2 md:gap-4 items-center">
            <div className="flex-1 relative">
              <IconTrendingUp className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input placeholder="Search reports, buyers, products..." className="pl-10" />
            </div>

            <div className="flex items-center gap-2">
              <Input placeholder="mm/dd/yyyy" className="w-36" />
              <IconCalendar className="w-5 h-5 text-gray-400" />
            </div>
            <span className="text-gray-500">–</span>
            <div className="flex items-center gap-2">
              <Input placeholder="mm/dd/yyyy" className="w-36" />
              <IconCalendar className="w-5 h-5 text-gray-400" />
            </div>

            <Select>
              <SelectTrigger className="w-36">
                <SelectValue placeholder="All Products" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Products">All Products</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-36">
                <SelectValue placeholder="Any Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Any Status">Any Status</SelectItem>
              </SelectContent>
            </Select>

            <Button className="bg-gray-900 text-white">Save View</Button>
            <Button variant="outline">Reset</Button>
          </div>
        </Card>

        {/*Tabs*/}
        <div className="flex gap-4 border-b border-gray-200 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`pb-2 font-medium ${
                activeTab === tab
                  ? "border-b-2 border-green-500 text-green-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="flex justify-between items-center mb-4">
              <CardTitle className="text-lg font-bold">Revenue & Orders</CardTitle>
              <Button variant="outline" size="sm">
                Export PNG
              </Button>
            </CardHeader>
            <CardContent className="flex items-center justify-center h-64 text-gray-400">
              Chart placeholder (connect to chart lib)
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex justify-between items-center mb-4">
              <CardTitle className="text-lg font-bold">Report Library</CardTitle>
              <Button onClick={handleGenerateReport}>Quick Run</Button>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 text-sm font-semibold">Report Name</th>
                    <th className="text-left py-2 text-sm font-semibold">Type</th>
                    <th className="text-left py-2 text-sm font-semibold">Last Run</th>
                    <th className="text-left py-2 text-sm font-semibold">Owner</th>
                    <th className="text-left py-2 text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.map((report, index) => (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="py-2 text-sm">{report.name}</td>
                      <td className="py-2 text-sm text-gray-600">{report.type}</td>
                      <td className="py-2 text-sm text-gray-600">{report.lastRun}</td>
                      <td className="py-2 text-sm text-gray-600">{report.owner}</td>
                      <td className="py-2 text-sm flex gap-2">
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                        <Button size="sm">Run</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>
      </main>

      {showGenerateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-lg p-6 relative">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              onClick={() => setShowGenerateModal(false)}
            >
              <IconX className="w-6 h-6" />
            </button>

            <CardTitle className="text-2xl mb-4 font-bold">Generate New Report</CardTitle>

            <div className="space-y-4">
              <div>
                <label className="block mb-1 text-sm font-semibold">Report Type</label>
                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Finance – Monthly Sales">Finance – Monthly Sales</SelectItem>
                    <SelectItem value="Order – SLA Compliance">Order – SLA Compliance</SelectItem>
                    <SelectItem value="Inventory – Aging Report">Inventory – Aging Report</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block mb-1 text-sm font-semibold">Period</label>
                <div className="flex gap-2">
                  <Input placeholder="mm/dd/yyyy" className="flex-1" />
                  <IconCalendar className="w-5 h-5 text-gray-400 mt-2" />
                  <span className="text-gray-500 mt-2">–</span>
                  <Input placeholder="mm/dd/yyyy" className="flex-1" />
                  <IconCalendar className="w-5 h-5 text-gray-400 mt-2" />
                </div>
                <p className="text-xs text-gray-500 mt-1">Leave empty for current month.</p>
              </div>

              <div>
                <label className="block mb-1 text-sm font-semibold">Filters</label>
                <div className="space-y-2">
                  <Checkbox
  checked={includeTaxes}
  onCheckedChange={(checked) => setIncludeTaxes(checked === true)}
/>
<Checkbox
  checked={excludeCancelled}
  onCheckedChange={(checked) => setExcludeCancelled(checked === true)}
/>
<Checkbox
  checked={topSKUsOnly}
  onCheckedChange={(checked) => setTopSKUsOnly(checked === true)}
/>
<Checkbox
  checked={includeBuyerDetails}
  onCheckedChange={(checked) => setIncludeBuyerDetails(checked === true)}
/>
                </div>
              </div>

              <div>
                <label className="block mb-1 text-sm font-semibold">Format</label>
                <Select value={format} onValueChange={setFormat}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CSV">CSV</SelectItem>
                    <SelectItem value="PDF">PDF</SelectItem>
                    <SelectItem value="Excel">Excel</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block mb-1 text-sm font-semibold">Schedule</label>
                <Select value={schedule} onValueChange={setSchedule}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Run now">Run now</SelectItem>
                    <SelectItem value="Schedule daily">Schedule daily</SelectItem>
                    <SelectItem value="Schedule weekly">Schedule weekly</SelectItem>
                    <SelectItem value="Schedule monthly">Schedule monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <Button variant="outline" onClick={() => setShowGenerateModal(false)}>
                Cancel
              </Button>
              <Button onClick={handleGenerateReport}>Generate</Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ReportsPage;
