"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Package, 
  DollarSign, 
  Truck, 
  Star,
  Search,
  Filter,
  Plus,
  Download,
  TrendingUp,
  Bell,
  CheckCircle,
  X,
  MapPin,
  FileText,
  ChevronUp,
  ChevronDown
} from 'lucide-react';

interface Order {
  id: string;
  date: string;
  buyer: string;
  product: string;
  origin: string;
  weight: string;
  packaging: string;
  quantity: string;
  pricePerKg: string;
  totalValue: string;
  status: 'new' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  image: string;
}

const OrdersPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');

  const orders: Order[] = [
    {
      id: '#OMP-20251012-7890',
      date: 'Oct 28, 2025',
      buyer: 'Global Corp',
      product: 'Raw Cashew Nuts - W240 Grade',
      origin: "Cote d'Ivoire",
      weight: '180/kg',
      packaging: '50 LBS OT',
      quantity: '120 MT',
      pricePerKg: '$7.95/kg',
      totalValue: '$954,000',
      status: 'processing',
      image: '🥜'
    },
    {
      id: '#OMP-20251012-7891',
      date: 'Oct 29, 2025',
      buyer: 'TradeLink Inc',
      product: 'Raw Cashew Nuts - W240 Grade',
      origin: 'Ghana Origin',
      weight: '190/kg',
      packaging: '47 LBS OT',
      quantity: '180 MT',
      pricePerKg: '$8.10/kg',
      totalValue: '$1,458,000',
      status: 'new',
      image: '🥜'
    },
    {
      id: '#OMP-20251011-7880',
      date: 'Oct 31, 2025',
      buyer: 'Asia Imports',
      product: 'Raw Cashew Nuts - W240 Grade',
      origin: 'India Origin',
      weight: '200/kg',
      packaging: '45 LBS OT',
      quantity: '150 MT',
      pricePerKg: '$8.00/kg',
      totalValue: '$1,200,000',
      status: 'new',
      image: '🥜'
    },
    {
      id: '#OMP-20251010-7871',
      date: 'Oct 30, 2025',
      buyer: 'EuroTrade Co',
      product: 'Raw Cashew Nuts - W240 Grade',
      origin: 'Nigeria Origin',
      weight: '185/kg',
      packaging: '48 LBS OT',
      quantity: '200 MT',
      pricePerKg: '$8.30/kg',
      totalValue: '$1,660,000',
      status: 'processing',
      image: '🥜'
    },
    {
      id: '#OMP-20251009-7860',
      date: 'Oct 29, 2025',
      buyer: 'AgriHub SA',
      product: 'Raw Cashew Nuts - W240 Grade',
      origin: 'Tanzania Origin',
      weight: '195/kg',
      packaging: '46 LBS OT',
      quantity: '110 MT',
      pricePerKg: '$8.25/kg',
      totalValue: '$907,500',
      status: 'processing',
      image: '🥜'
    },
    {
      id: '#OMP-20251001-7650',
      date: 'Nov 1, 2025',
      buyer: 'North Star Co',
      product: 'Raw Cashew Nuts - W240 Grade',
      origin: "Cote d'Ivoire",
      weight: '180/kg',
      packaging: '50 LBS OT',
      quantity: '95 MT',
      pricePerKg: '$7.95/kg',
      totalValue: '$755,250',
      status: 'shipped',
      image: '🥜'
    },
    {
      id: '#OMP-20250920-5541',
      date: 'Sep 20, 2025',
      buyer: 'AgroFuture Ltd',
      product: 'Raw Cashew Nuts - W320 Grade',
      origin: 'Tanzania Origin',
      weight: '195/kg',
      packaging: '46 LBS OT',
      quantity: '65 MT',
      pricePerKg: '$8.25/kg',
      totalValue: '$536,250',
      status: 'delivered',
      image: '🥜'
    },
    {
      id: '#OMP-20250915-5420',
      date: 'Sep 10, 2025',
      buyer: 'Global Corp',
      product: 'Raw Cashew Nuts - W320 Grade',
      origin: 'Ghana Origin',
      weight: '190/kg',
      packaging: '47 LBS OT',
      quantity: '140 MT',
      pricePerKg: '$8.10/kg',
      totalValue: '$1,134,000',
      status: 'delivered',
      image: '🥜'
    },
    {
      id: '#OMP-20251004-7799',
      date: 'Oct 4, 2025',
      buyer: 'Delta Trade',
      product: 'Raw Cashew Nuts - W240 Grade',
      origin: 'Brazil Origin',
      weight: '220/kg',
      packaging: '60 KG bags',
      quantity: '30 MT',
      pricePerKg: '$12.50/kg',
      totalValue: '$375,000',
      status: 'cancelled',
      image: '🥜'
    }
  ];

  // Status Badge
  const getStatusBadge = (status: string) => {
    const styles = {
      new: 'bg-blue-100 text-blue-700 hover:bg-blue-200',
      processing: 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200',
      shipped: 'bg-purple-100 text-purple-700 hover:bg-purple-200',
      delivered: 'bg-green-100 text-green-700 hover:bg-green-200',
      cancelled: 'bg-red-100 text-red-700 hover:bg-red-200'
    };

    const icons = {
      new: <Bell className="w-3 h-3 mr-1" />,
      processing: <Package className="w-3 h-3 mr-1" />,
      shipped: <Truck className="w-3 h-3 mr-1" />,
      delivered: <CheckCircle className="w-3 h-3 mr-1" />,
      cancelled: <X className="w-3 h-3 mr-1" />
    };

    return (
      <Badge className={`${styles[status as keyof typeof styles]} flex items-center transition duration-200`}>
        {icons[status as keyof typeof icons]}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getAlertForTab = (tab: string) => {
    const alerts = {
      all: null,
      new: (
        <Alert className="bg-blue-50 border-blue-200 mb-4">
          <Bell className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800">
            You have <b>2 new orders</b> awaiting approval.
          </AlertDescription>
        </Alert>
      ),
      processing: (
        <Alert className="bg-yellow-50 border-yellow-200 mb-4">
          <Package className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-800">
            You have <b>3 orders</b> in processing stage.
          </AlertDescription>
        </Alert>
      ),
      shipped: (
        <Alert className="bg-purple-50 border-purple-200 mb-4">
          <Truck className="h-4 w-4 text-purple-600" />
          <AlertDescription className="text-purple-600">
            1 active shipment in progress.
          </AlertDescription>
        </Alert>
      ),
      delivered: (
        <Alert className="bg-green-50 border-green-200 mb-4">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            2 orders successfully delivered.
          </AlertDescription>
        </Alert>
      ),
      cancelled: (
        <Alert className="bg-red-50 border-red-200 mb-4">
          <X className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            1 order recently cancelled.
          </AlertDescription>
        </Alert>
      )
    };
    return alerts[tab as keyof typeof alerts];
  };

  const filterOrdersByTab = (tab: string) => {
    if (tab === 'all') return orders;
    return orders.filter(order => order.status === tab);
  };

  const getOrderCount = (status: string) => {
    if (status === 'all') return orders.length;
    return orders.filter(order => order.status === status).length;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 sm:px-6 md:px-8 py-3 sticky top-0 z-50">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">O</span>
            </div>
            <h1 className="text-xl font-bold">OMPOI Seller Platform</h1>
          </div>

          <nav className="flex flex-wrap items-center justify-end gap-4 md:gap-6 text-sm">
            {['Dashboard','Orders','Inventory','Reports','Help'].map((item) => (
              <span 
                key={item} 
                className={`cursor-pointer px-2 py-1 rounded-md transition duration-200 hover:bg-gray-100 hover:text-green-600 ${
                  item === 'Orders' ? 'text-green-600 font-semibold' : 'text-gray-600'
                }`}
              >
                {item}
              </span>
            ))}
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-semibold">
              OM
            </div>
          </nav>
        </div>
      </header>

      <main className="px-4 sm:px-6 md:px-8 py-6">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-3">
          <h2 className="text-3xl font-bold">Orders</h2>
          <div className="flex flex-wrap gap-3">
            <Button className="bg-green-600 hover:bg-green-700 text-white transition duration-200 flex items-center">
              <Plus className="w-4 h-4 mr-2" /> New Order
            </Button>
            <Button className="bg-green-500 hover:bg-green-600 text-white transition duration-200 flex items-center">
              <Download className="w-4 h-4 mr-2" /> Export Orders
            </Button>
            <Button variant="outline" className="flex items-center">
              <TrendingUp className="w-4 h-4 mr-2" /> View Analytics
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
  <Card className="hover:shadow-lg transition-shadow duration-200">
    <CardContent className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <p className="text-sm text-gray-600 mb-2"><b>TOTAL ORDERS</b></p>
        <p className="text-3xl font-bold mb-1">9</p>
        <p className="text-xs text-gray-500">ALL-TIME TOTAL</p>
      </div>
      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-orange-100 rounded-lg flex items-center justify-center">
        <Package className="w-6 h-6 sm:w-7 sm:h-7 text-orange-600" />
      </div>
    </CardContent>
  </Card>

  <Card className="hover:shadow-lg transition-shadow duration-200">
    <CardContent className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <p className="text-sm text-gray-600 mb-2"><b>TOTAL REVENUE (LAST 30 DAYS)</b></p>
        <p className="text-3xl font-bold mb-1">$4.8M</p>
        <p className="text-xs text-green-600 flex items-center">
          <ChevronUp className="w-3 h-3 mr-1" /> +12.5%
        </p>
      </div>
      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-yellow-100 rounded-lg flex items-center justify-center">
        <DollarSign className="w-6 h-6 sm:w-7 sm:h-7 text-yellow-600" />
      </div>
    </CardContent>
  </Card>

  <Card className="hover:shadow-lg transition-shadow duration-200">
    <CardContent className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <p className="text-sm text-gray-600 mb-2"><b>PENDING SHIPMENTS</b></p>
        <p className="text-3xl font-bold mb-1">5</p>
        <p className="text-xs text-gray-500">NEW + PROCESSING</p>
      </div>
      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-100 rounded-lg flex items-center justify-center">
        <Truck className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" />
      </div>
    </CardContent>
  </Card>

  <Card className="hover:shadow-lg transition-shadow duration-200">
    <CardContent className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <p className="text-sm text-gray-600 mb-2"><b>AVERAGE ORDER VALUE</b></p>
        <p className="text-3xl font-bold mb-1">$854K</p>
        <p className="text-xs text-red-600 flex items-center">
          <ChevronDown className="w-3 h-3 mr-1" /> -4.2%
        </p>
      </div>
      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-green-100 rounded-lg flex items-center justify-center">
        <Star className="w-6 h-6 sm:w-7 sm:h-7 text-yellow-600" />
      </div>
    </CardContent>
  </Card>
</div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-3">
          <div className="relative flex-1 max-w-full md:max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input placeholder="Search by Order ID, Buyer, or Product..." className="pl-10 pr-4 py-2 w-full" />
          </div>
          <Button variant="outline" className="flex items-center text-green-600 border-green-600">
            <Filter className="w-4 h-4 mr-2" /> All Filters
          </Button>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6 flex flex-wrap gap-2 md:gap-4 border-b border-gray-200 rounded-none">
            {['all','new','processing','shipped','delivered','cancelled'].map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className="data-[state=active]:border-b-2 data-[state=active]:border-green-600 data-[state=active]:text-green-600 hover:bg-gray-100 rounded-md transition duration-200"
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)} ({getOrderCount(tab)})
              </TabsTrigger>
            ))}
          </TabsList>

          {['all', 'new', 'processing', 'shipped', 'delivered', 'cancelled'].map((tab) => (
            <TabsContent key={tab} value={tab}>
              {getAlertForTab(tab)}

              <div className="space-y-4">
                {filterOrdersByTab(tab).map(order => (
                  <Card key={order.id} className="hover:shadow-lg transition-shadow duration-200">
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-3">
                        <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
                          <span className="font-semibold text-gray-700">{order.id}</span>
                          <span>•</span>
                          <span>{order.date}</span>
                          <span>•</span>
                          <span>Buyer: {order.buyer}</span>
                        </div>
                        {getStatusBadge(order.status)}
                      </div>

                      {/* Order Info */}
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-3xl">
                            {order.image}
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">{order.product}</h3>
                            <p className="text-gray-600 text-sm">
                              {order.origin} • {order.weight} • {order.packaging}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-wrap md:flex-nowrap items-center gap-6">
                          <div className="text-center">
                            <p className="text-gray-500 text-sm mb-1">Quantity</p>
                            <p className="font-semibold">{order.quantity}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-gray-500 text-sm mb-1">Price</p>
                            <p className="font-semibold">{order.pricePerKg}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-gray-500 text-sm mb-1">Total</p>
                            <p className="font-semibold text-green-600">{order.totalValue}</p>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex flex-wrap gap-2">
                            {order.status === 'new' && (
                              <>
                                <Button className="bg-green-500 hover:bg-green-600 text-white transition duration-200">Approve Order</Button>
                                <Button variant="outline">Cancel</Button>
                              </>
                            )}
                            {order.status === 'processing' && (
                              <>
                                <Button className="bg-green-500 hover:bg-green-600 text-white transition duration-200 flex items-center">
                                  <Truck className="w-4 h-4 mr-2" /> Mark as Shipped
                                </Button>
                                <Button variant="outline">Update Status</Button>
                              </>
                            )}
                            {order.status === 'shipped' && (
                              <>
                                <Button className="bg-green-500 hover:bg-green-600 text-white transition duration-200 flex items-center">
                                  <MapPin className="w-4 h-4 mr-2" /> Track Shipment
                                </Button>
                                <Button variant="outline">Update Status</Button>
                              </>
                            )}
                            {order.status === 'delivered' && (
                              <>
                                <Button className="bg-green-500 hover:bg-green-600 text-white transition duration-200 flex items-center">
                                  <FileText className="w-4 h-4 mr-2" /> Generate Invoice
                                </Button>
                                <Button variant="outline">View Details</Button>
                              </>
                            )}
                            {order.status === 'cancelled' && (
                              <>
                                <Button variant="outline">View Details</Button>
                                <Button variant="outline">Download Report</Button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </main>
    </div>
  );
};

export default OrdersPage;
