
import React, { useState } from 'react';
import { PageTransition } from '@/utils/transitions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Package, 
  Search, 
  PlusCircle, 
  Filter, 
  AlertTriangle,
  ShoppingBag,
  Calendar,
  DollarSign
} from 'lucide-react';
import { inventoryData } from '@/utils/mockData';

const InventoryPage: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Get low stock items
  const lowStockItems = inventoryData.filter(item => item.stock <= item.minStock);
  
  // Filter inventory based on category and search term
  const filteredInventory = inventoryData.filter(item => {
    const matchesCategory = filter === 'all' || item.category.toLowerCase() === filter.toLowerCase();
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  
  // Get unique categories for filter
  const categories = ['all', ...new Set(inventoryData.map(item => item.category.toLowerCase()))];

  // Get stock status color
  const getStockStatusColor = (stock: number, minStock: number) => {
    if (stock <= minStock) return 'bg-danger-100 text-danger-700';
    if (stock <= minStock + 3) return 'bg-warning-100 text-warning-700';
    return 'bg-success-100 text-success-700';
  };

  return (
    <PageTransition>
      <div className="animate-stagger space-y-6">
        {/* Header actions */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 animate-slide-up">
          <div>
            <h1 className="text-2xl font-semibold text-salon-800">Inventory</h1>
            <p className="text-salon-500 mt-1">Manage salon products and supplies</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-salon-400" />
              </div>
              <input
                type="text"
                placeholder="Search inventory..."
                className="py-2 pl-10 pr-4 w-64 bg-salon-50 rounded-md text-sm text-salon-800 focus:outline-none focus:ring-2 focus:ring-accent-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Button className="bg-accent-600 hover:bg-accent-700 text-white">
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </div>
        </div>
        
        {/* Alert for low stock items */}
        {lowStockItems.length > 0 && (
          <div className="bg-warning-50 border border-warning-200 rounded-lg p-4 flex items-start gap-4 animate-slide-up" style={{ animationDelay: '0.05s' }}>
            <div className="flex-shrink-0 p-1 bg-warning-100 rounded-full">
              <AlertTriangle className="h-5 w-5 text-warning-600" />
            </div>
            <div>
              <h3 className="font-medium text-warning-800">Low Stock Alert</h3>
              <p className="text-sm text-warning-700 mt-1">
                {lowStockItems.length} {lowStockItems.length === 1 ? 'item' : 'items'} in your inventory {lowStockItems.length === 1 ? 'is' : 'are'} running low. Please restock soon.
              </p>
            </div>
          </div>
        )}
        
        {/* Category filter */}
        <div className="flex items-center gap-3 overflow-x-auto pb-2 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center text-sm text-salon-500">
            <Filter className="h-4 w-4 mr-2" />
            Filter:
          </div>
          
          {categories.map((category, index) => (
            <button
              key={index}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors whitespace-nowrap ${
                filter === category 
                  ? 'bg-accent-100 text-accent-700 font-medium' 
                  : 'bg-salon-50 text-salon-600 hover:bg-salon-100'
              }`}
              onClick={() => setFilter(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
        
        {/* Inventory table */}
        <Card className="shadow-card overflow-hidden animate-slide-up" style={{ animationDelay: '0.15s' }}>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium text-salon-800 flex items-center gap-2">
              <Package className="h-5 w-5 text-accent-500" />
              Inventory List
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-salon-200">
                    <th className="py-3 px-4 text-left font-medium text-salon-500">Product</th>
                    <th className="py-3 px-4 text-left font-medium text-salon-500">Category</th>
                    <th className="py-3 px-4 text-left font-medium text-salon-500">Stock</th>
                    <th className="py-3 px-4 text-left font-medium text-salon-500">Price</th>
                    <th className="py-3 px-4 text-left font-medium text-salon-500">Supplier</th>
                    <th className="py-3 px-4 text-left font-medium text-salon-500">Last Restocked</th>
                    <th className="py-3 px-4 text-left font-medium text-salon-500">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-salon-100">
                  {filteredInventory.map(item => (
                    <tr key={item.id} className="hover:bg-salon-50">
                      <td className="py-3 px-4">
                        <div className="font-medium text-salon-800">{item.name}</div>
                      </td>
                      <td className="py-3 px-4 text-salon-800">{item.category}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <span className={`inline-flex px-2 py-1 text-xs rounded-full ${getStockStatusColor(item.stock, item.minStock)}`}>
                            {item.stock} in stock
                          </span>
                          <span className="text-xs text-salon-500">Min: {item.minStock}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-salon-800">${item.sellingPrice}</div>
                        <div className="text-xs text-salon-500">Cost: ${item.costPrice}</div>
                      </td>
                      <td className="py-3 px-4 text-salon-800">{item.supplier}</td>
                      <td className="py-3 px-4 text-salon-800">{item.lastRestocked}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <button className="p-1 text-salon-500 hover:text-accent-600 rounded-md hover:bg-salon-100">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                              />
                            </svg>
                          </button>
                          <button className="p-1 text-salon-500 hover:text-success-600 rounded-md hover:bg-salon-100">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
        
        {/* Inventory Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          {/* Low Stock */}
          <Card className="shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-salon-800 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-warning-500" />
                Low Stock Items
              </CardTitle>
            </CardHeader>
            <CardContent>
              {lowStockItems.length > 0 ? (
                <ul className="space-y-3">
                  {lowStockItems.map(item => (
                    <li key={item.id} className="flex items-center justify-between p-3 bg-salon-50 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-salon-800">{item.name}</p>
                        <div className="flex items-center text-xs text-salon-500 mt-1">
                          <span>{item.category}</span>
                          <span className="mx-1">•</span>
                          <span>Min: {item.minStock}</span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-danger-100 text-danger-700">
                          {item.stock} left
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-salon-500 text-sm py-4 text-center">
                  No low stock items at this time
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Category Summary */}
          <Card className="shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-salon-800 flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-accent-500" />
                Category Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {categories.filter(cat => cat !== 'all').map((category, index) => {
                  const categoryItems = inventoryData.filter(
                    item => item.category.toLowerCase() === category
                  );
                  const totalStock = categoryItems.reduce((sum, item) => sum + item.stock, 0);
                  
                  return (
                    <li key={index} className="flex items-center justify-between p-3 bg-salon-50 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-salon-800">
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </p>
                        <div className="flex items-center text-xs text-salon-500 mt-1">
                          <span>{categoryItems.length} products</span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-accent-100 text-accent-700">
                          {totalStock} units
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </CardContent>
          </Card>
          
          {/* Inventory Value */}
          <Card className="shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-salon-800 flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-success-500" />
                Inventory Value
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-salon-50 rounded-lg">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-white rounded-md shadow-subtle">
                    <p className="text-xs font-medium text-salon-500">Total Cost Value</p>
                    <p className="text-xl font-semibold text-salon-800 mt-1">
                      ${inventoryData.reduce((sum, item) => sum + (item.costPrice * item.stock), 0).toFixed(2)}
                    </p>
                  </div>
                  
                  <div className="p-3 bg-white rounded-md shadow-subtle">
                    <p className="text-xs font-medium text-salon-500">Total Retail Value</p>
                    <p className="text-xl font-semibold text-success-600 mt-1">
                      ${inventoryData.reduce((sum, item) => sum + (item.sellingPrice * item.stock), 0).toFixed(2)}
                    </p>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-white rounded-md shadow-subtle">
                  <p className="text-xs font-medium text-salon-500">Potential Profit</p>
                  <p className="text-xl font-semibold text-accent-600 mt-1">
                    ${(
                      inventoryData.reduce((sum, item) => sum + (item.sellingPrice * item.stock), 0) - 
                      inventoryData.reduce((sum, item) => sum + (item.costPrice * item.stock), 0)
                    ).toFixed(2)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageTransition>
  );
};

export default InventoryPage;
