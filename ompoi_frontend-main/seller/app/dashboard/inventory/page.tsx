"use client";

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Package, 
  AlertTriangle, 
  X, 
  DollarSign,
  Search,
  Settings,
  Upload,
  Download,
  Plus,
  BarChart3,
  Save,
  AlertCircle
} from 'lucide-react';

interface Product {
  id: string;
  name: string;
  grade: string;
  origin: string;
  weight: string;
  packaging: string;
  currentStock: number;
  reserved: number;
  available: number;
  location: string;
  value: string;
  pricePerKg: string;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
  activeOrders: number;
  image: string;
}

const InventoryManagementPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [adjustmentType, setAdjustmentType] = useState<'add' | 'remove' | 'set'>('add');

  const products: Product[] = [
    {
      id: '1',
      name: 'Raw Cashew Nuts - W320 Grade',
      grade: 'W320',
      origin: 'Benin Origin',
      weight: '185/kg',
      packaging: '49 LBS OT',
      currentStock: 650,
      reserved: 150,
      available: 500,
      location: 'Tuticorin',
      value: '$5.07M',
      pricePerKg: '$7.80/kg',
      status: 'in-stock',
      activeOrders: 5,
      image: '🥜'
    },
    {
      id: '2',
      name: 'Raw Cashew Nuts - W240 Grade',
      grade: 'W240',
      origin: 'Ghana Origin',
      weight: '190/kg',
      packaging: '47 LBS OT',
      currentStock: 520,
      reserved: 200,
      available: 320,
      location: 'Mumbai',
      value: '$4.21M',
      pricePerKg: '$8.10/kg',
      status: 'in-stock',
      activeOrders: 3,
      image: '🥜'
    },
    {
      id: '3',
      name: 'Cashew Kernels - W320 White Wholes',
      grade: 'W320',
      origin: 'Processed India',
      weight: '320/lb',
      packaging: 'Premium Grade',
      currentStock: 85,
      reserved: 50,
      available: 35,
      location: 'Kochi',
      value: '$1.06M',
      pricePerKg: '$12.50/kg',
      status: 'low-stock',
      activeOrders: 2,
      image: '🥜'
    },
    {
      id: '4',
      name: 'Raw Cashew Nuts - W320 Grade',
      grade: 'W320',
      origin: 'Tanzania Origin',
      weight: '195/kg',
      packaging: '46 LBS OT',
      currentStock: 380,
      reserved: 100,
      available: 280,
      location: 'Chennai',
      value: '$3.14M',
      pricePerKg: '$8.25/kg',
      status: 'in-stock',
      activeOrders: 2,
      image: '🥜'
    },
    {
      id: '5',
      name: 'Raw Cashew Nuts - W240 Grade',
      grade: 'W240',
      origin: "Cote d'Ivoire",
      weight: '180/kg',
      packaging: '50 LBS OT',
      currentStock: 95,
      reserved: 0,
      available: 95,
      location: 'Tuticorin',
      value: '$755K',
      pricePerKg: '$7.95/kg',
      status: 'low-stock',
      activeOrders: 0,
      image: '🥜'
    }
  ];

  const totalStock = products.reduce((sum, p) => sum + p.currentStock, 0);
  const lowStockCount = products.filter(p => p.status === 'low-stock').length;
  const outOfStockCount = products.filter(p => p.status === 'out-of-stock').length;
  const totalValue = '$14.8M';

  const getStatusBadge = (status: string) => {
    const styles = {
      'in-stock': 'bg-green-100 text-green-700 hover:bg-green-100',
      'low-stock': 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100',
      'out-of-stock': 'bg-red-100 text-red-700 hover:bg-red-100'
    };

    const icons = {
      'in-stock': <Package className="w-3 h-3 mr-1" />,
      'low-stock': <AlertTriangle className="w-3 h-3 mr-1" />,
      'out-of-stock': <X className="w-3 h-3 mr-1" />
    };

    const labels = {
      'in-stock': 'In Stock',
      'low-stock': 'Low Stock',
      'out-of-stock': 'Out of Stock'
    };

    return (
      <Badge className={`${styles[status as keyof typeof styles]} flex items-center`}>
        {icons[status as keyof typeof icons]}
        {labels[status as keyof typeof labels]}
      </Badge>
    );
  };

  const filterProductsByTab = (tab: string) => {
    if (tab === 'all') return products;
    return products.filter(p => p.status === tab);
  };

  const handleUpdateStock = (product: Product) => {
    setSelectedProduct(product);
    setIsUpdateDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/*Header*/}
      <header className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">O</span>
            </div>
            <h1 className="text-xl font-bold">OMPOI Seller Platform</h1>
          </div>
          <nav className="flex items-center space-x-6">
            <span className="text-gray-600 hover:text-gray-900 cursor-pointer"><a href='/dashboard'>Dashboard</a></span>
            <span className="text-gray-600 hover:text-gray-900 cursor-pointer"><a href='/dashboard/orders'>Orders</a></span>
            <span className="text-green-600 font-semibold cursor-pointer"><a href='/dashboard/inventory'>Inventory</a></span>
            <span className="text-gray-600 hover:text-gray-900 cursor-pointer"><a href='/dashboard/reports'>Reports</a></span>
            <span className="text-gray-600 hover:text-gray-900 cursor-pointer"><a href='/dashboard'>Help</a></span>
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold">OM</span>
            </div>
          </nav>
        </div>
      </header>

      {/*Main Content*/}
      <main className="px-6 py-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold">Inventory Management</h2>
          <div className="flex space-x-3">
            <Button variant="outline">
              <Upload className="w-4 h-4 mr-2" />
              Import Stock
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
            <Button className="bg-green-500 hover:bg-green-600 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add Stock
            </Button>
          </div>
        </div>

        {/*Stats Cards*/}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-3xl font-bold mb-1">{totalStock} MT</p>
                  <p className="text-sm text-gray-600">Total Stock Available</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Package className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-3xl font-bold mb-1">{lowStockCount}</p>
                  <p className="text-sm text-gray-600">Low Stock Products</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-3xl font-bold mb-1">{outOfStockCount}</p>
                  <p className="text-sm text-gray-600">Out of Stock</p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <X className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-3xl font-bold mb-1">{totalValue}</p>
                  <p className="text-sm text-gray-600">Total Stock Value</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="relative flex-1 max-w-2xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input 
              placeholder="Search products by name, grade, or origin..."
              className="pl-10 pr-4 py-2"
            />
          </div>
        </div>

        {/*Tabs*/}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex items-center justify-between mb-6">
            <TabsList className="bg-transparent border-b-0 p-0 h-auto">
              <TabsTrigger 
                value="all" 
                className="data-[state=active]:bg-green-100 data-[state=active]:text-green-700 rounded-md px-4 py-2"
              >
                All Stock
              </TabsTrigger>
              <TabsTrigger 
                value="low-stock"
                className="data-[state=active]:bg-green-100 data-[state=active]:text-green-700 rounded-md px-4 py-2"
              >
                Low Stock
              </TabsTrigger>
              <TabsTrigger 
                value="out-of-stock"
                className="data-[state=active]:bg-green-100 data-[state=active]:text-green-700 rounded-md px-4 py-2"
              >
                Out of Stock
              </TabsTrigger>
            </TabsList>
            <Button variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>

          {['all', 'low-stock', 'out-of-stock'].map((tab) => (
            <TabsContent key={tab} value={tab} className="mt-0">
              <div className="space-y-4">
                {filterProductsByTab(tab).map((product) => (
                  <Card key={product.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center text-3xl border-2 border-blue-300">
                            {product.image}
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                              <span className="w-3 h-3 bg-teal-500 rounded-full"></span>
                              <span>{product.origin}</span>
                              <span>•</span>
                              <span>{product.weight}</span>
                              <span>•</span>
                              <span>{product.packaging}</span>
                            </div>
                          </div>
                        </div>
                        {getStatusBadge(product.status)}
                      </div>

                      <div className="grid grid-cols-4 gap-4 mb-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-xs text-gray-500 uppercase mb-1">Current Stock</p>
                          <p className="text-2xl font-bold">{product.currentStock} MT</p>
                          <p className="text-xs text-gray-600 mt-1">At {product.location}</p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-xs text-gray-500 uppercase mb-1">Reserved</p>
                          <p className="text-2xl font-bold">{product.reserved} MT</p>
                          <p className="text-xs text-gray-600 mt-1">
                            {product.activeOrders} active {product.activeOrders === 1 ? 'order' : 'orders'}
                          </p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-xs text-gray-500 uppercase mb-1">Available</p>
                          <p className="text-2xl font-bold text-green-600">{product.available} MT</p>
                          <p className="text-xs text-gray-600 mt-1">
                            {product.status === 'low-stock' ? 'Below threshold' : 'Ready to sell'}
                          </p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-xs text-gray-500 uppercase mb-1">Value</p>
                          <p className="text-2xl font-bold">{product.value}</p>
                          <p className="text-xs text-gray-600 mt-1">@ {product.pricePerKg}</p>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Button 
                          className="bg-green-500 hover:bg-green-600 text-white"
                          onClick={() => handleUpdateStock(product)}
                        >
                          <Save className="w-4 h-4 mr-2" />
                          Update Stock
                        </Button>
                        <Button variant="outline">
                          <BarChart3 className="w-4 h-4 mr-2" />
                          View History
                        </Button>
                        {product.status === 'low-stock' && (
                          <Button variant="outline" className="text-yellow-600 border-yellow-600">
                            <AlertTriangle className="w-4 h-4 mr-2" />
                            Restock Alert
                          </Button>
                        )}
                        {product.status === 'in-stock' && (
                          <Button variant="outline">
                            <Settings className="w-4 h-4 mr-2" />
                            Settings
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </main>

      {/*Update Stock*/}
      <Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Update Stock Level</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div>
              <Label>Product Name</Label>
              <Input 
                value={selectedProduct?.name || ''} 
                disabled 
                className="mt-2"
              />
            </div>

            <div>
              <Label>Current Stock (MT)</Label>
              <Input 
                value={selectedProduct?.currentStock || ''} 
                disabled 
                className="mt-2"
              />
            </div>

            <div>
              <Label>Stock Adjustment Type</Label>
              <div className="flex space-x-2 mt-2">
                <Button
                  variant={adjustmentType === 'add' ? 'default' : 'outline'}
                  onClick={() => setAdjustmentType('add')}
                  className={adjustmentType === 'add' ? 'bg-blue-600' : ''}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Stock
                </Button>
                <Button
                  variant={adjustmentType === 'remove' ? 'default' : 'outline'}
                  onClick={() => setAdjustmentType('remove')}
                  className={adjustmentType === 'remove' ? 'bg-red-600' : ''}
                >
                  <X className="w-4 h-4 mr-2" />
                  Remove Stock
                </Button>
                <Button
                  variant={adjustmentType === 'set' ? 'default' : 'outline'}
                  onClick={() => setAdjustmentType('set')}
                  className={adjustmentType === 'set' ? 'bg-orange-600' : ''}
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Set Total
                </Button>
              </div>
            </div>

            <div>
              <Label>Quantity (MT)</Label>
              <Input 
                placeholder="Enter quantity in MT" 
                type="number"
                className="mt-2"
              />
            </div>

            <div>
              <Label>Location / Warehouse</Label>
              <Select>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tuticorin">Tuticorin</SelectItem>
                  <SelectItem value="mumbai">Mumbai</SelectItem>
                  <SelectItem value="kochi">Kochi</SelectItem>
                  <SelectItem value="chennai">Chennai</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Reason / Notes</Label>
              <Textarea 
                placeholder="Enter reason for stock adjustment (e.g., New shipment arrived, Inventory correction, Quality rejection)"
                className="mt-2 min-h-[80px]"
              />
            </div>

            <Alert className="bg-yellow-50 border-yellow-200">
              <AlertCircle className="h-4 w-4 text-yellow-600" />
              <AlertDescription className="text-yellow-800">
                <strong>Tip:</strong> Stock updates are tracked and audited. Make sure to provide accurate information and relevant notes for record-keeping.
              </AlertDescription>
            </Alert>

            <div className="flex space-x-2 pt-4">
              <Button className="flex-1 bg-green-500 hover:bg-green-600 text-white">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setIsUpdateDialogOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InventoryManagementPage;