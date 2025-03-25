
import React, { useState } from 'react';
import { PageTransition } from '@/utils/transitions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  BarChart2, 
  Search, 
  PlusCircle, 
  Calendar, 
  User,
  DollarSign,
  CreditCard,
  CheckCircle,
  PieChart,
  ArrowRight
} from 'lucide-react';
import { 
  PieChart as RechartsProPieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { salesData, servicesData, employeesData, customersData } from '@/utils/mockData';
import { format } from 'date-fns';

const SalesPage: React.FC = () => {
  const [dateRange, setDateRange] = useState('week');
  
  // Format date for display
  const formatDate = (date: Date) => {
    return format(new Date(date), 'MMM dd, yyyy');
  };
  
  // Format time to display
  const formatTime = (date: Date) => {
    return format(new Date(date), 'h:mm a');
  };
  
  // Generate data for service popularity chart
  const serviceData = servicesData.map(service => ({
    name: service.name,
    value: service.popularity
  })).sort((a, b) => b.value - a.value).slice(0, 5);
  
  // Colors for pie chart
  const COLORS = ['#0ea5e9', '#38bdf8', '#7dd3fc', '#bae6fd', '#e0f2fe'];
  
  // Generate data for payment methods chart
  const paymentMethodsData = [
    { name: 'Credit Card', value: salesData.filter(sale => sale.paymentMethod === 'Credit Card').length },
    { name: 'Cash', value: salesData.filter(sale => sale.paymentMethod === 'Cash').length },
    { name: 'Mobile Payment', value: salesData.filter(sale => sale.paymentMethod === 'Mobile Payment').length }
  ];
  
  // Generate data for daily sales chart
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dailySalesData = daysOfWeek.map(day => ({
    name: day,
    services: Math.floor(Math.random() * 1500) + 500,
    products: Math.floor(Math.random() * 800) + 200
  }));

  return (
    <PageTransition>
      <div className="animate-stagger space-y-6">
        {/* Header actions */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 animate-slide-up">
          <div>
            <h1 className="text-2xl font-semibold text-salon-800">Sales & Reports</h1>
            <p className="text-salon-500 mt-1">Track revenue and analyze business performance</p>
          </div>
          
          <div className="flex items-center gap-3">
            <select 
              className="bg-salon-50 text-salon-800 text-sm rounded-md px-3 py-2 border border-salon-200 focus:outline-none focus:ring-1 focus:ring-accent-500"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            >
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>
            
            <Button className="bg-accent-600 hover:bg-accent-700 text-white">
              <PlusCircle className="h-4 w-4 mr-2" />
              New Sale
            </Button>
          </div>
        </div>
        
        {/* Revenue summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 animate-slide-up" style={{ animationDelay: '0.05s' }}>
          <Card className="bg-gradient-to-br from-accent-600 to-accent-700 text-white shadow-card">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/80">Total Revenue</p>
                  <h3 className="text-2xl font-semibold mt-1">$3,586.25</h3>
                  <p className="text-xs text-white/80 mt-1">
                    <span className="text-white">↑ 12%</span> vs last {dateRange}
                  </p>
                </div>
                <div className="p-3 bg-white/10 rounded-lg">
                  <DollarSign className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-card">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-salon-500">Services Revenue</p>
                  <h3 className="text-2xl font-semibold text-salon-800 mt-1">$2,675.00</h3>
                  <p className="text-xs text-salon-500 mt-1">
                    <span className="text-success-600">↑ 8%</span> vs last {dateRange}
                  </p>
                </div>
                <div className="p-3 bg-salon-100 rounded-lg">
                  <Scissors className="h-6 w-6 text-salon-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-card">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-salon-500">Products Revenue</p>
                  <h3 className="text-2xl font-semibold text-salon-800 mt-1">$911.25</h3>
                  <p className="text-xs text-salon-500 mt-1">
                    <span className="text-success-600">↑ 5%</span> vs last {dateRange}
                  </p>
                </div>
                <div className="p-3 bg-salon-100 rounded-lg">
                  <ShoppingBag className="h-6 w-6 text-salon-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-card">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-salon-500">Transactions</p>
                  <h3 className="text-2xl font-semibold text-salon-800 mt-1">42</h3>
                  <p className="text-xs text-salon-500 mt-1">
                    <span className="text-warning-600">↓ 3%</span> vs last {dateRange}
                  </p>
                </div>
                <div className="p-3 bg-salon-100 rounded-lg">
                  <CreditCard className="h-6 w-6 text-salon-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Sales chart */}
        <Card className="shadow-card animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium text-salon-800 flex items-center gap-2">
              <BarChart2 className="h-5 w-5 text-accent-500" />
              Sales Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dailySalesData} barGap={8}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#616e7c' }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#616e7c' }}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <Tooltip 
                    labelStyle={{ fontWeight: 'bold', color: '#323f4b' }}
                    contentStyle={{ borderRadius: '8px', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' }}
                    formatter={(value) => [`$${value}`, '']}
                  />
                  <Legend />
                  <Bar 
                    dataKey="services" 
                    name="Services" 
                    fill="#0ea5e9" 
                    radius={[4, 4, 0, 0]} 
                    barSize={24}
                  />
                  <Bar 
                    dataKey="products" 
                    name="Products" 
                    fill="#7dd3fc" 
                    radius={[4, 4, 0, 0]} 
                    barSize={24}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Analytics grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-slide-up" style={{ animationDelay: '0.15s' }}>
          {/* Popular Services Chart */}
          <Card className="shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-salon-800 flex items-center gap-2">
                <PieChart className="h-5 w-5 text-accent-500" />
                Most Popular Services
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center">
                <div className="h-[230px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsProPieChart>
                      <Pie
                        data={serviceData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={3}
                        dataKey="value"
                        label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                        labelLine={false}
                      >
                        {serviceData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={COLORS[index % COLORS.length]} 
                          />
                        ))}
                      </Pie>
                    </RechartsProPieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Payment Methods Chart */}
          <Card className="shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-salon-800 flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-accent-500" />
                Payment Methods
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center">
                <div className="h-[230px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsProPieChart>
                      <Pie
                        data={paymentMethodsData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={3}
                        dataKey="value"
                        label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                        labelLine={false}
                      >
                        {paymentMethodsData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={COLORS[index % COLORS.length]} 
                          />
                        ))}
                      </Pie>
                    </RechartsProPieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Recent sales */}
        <Card className="shadow-card overflow-hidden animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium text-salon-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-accent-500" />
                Recent Sales
              </div>
              <Button variant="outline" size="sm" className="h-8 text-xs">
                View All <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-salon-200">
                    <th className="py-3 px-4 text-left font-medium text-salon-500">ID</th>
                    <th className="py-3 px-4 text-left font-medium text-salon-500">Date & Time</th>
                    <th className="py-3 px-4 text-left font-medium text-salon-500">Customer</th>
                    <th className="py-3 px-4 text-left font-medium text-salon-500">Employee</th>
                    <th className="py-3 px-4 text-left font-medium text-salon-500">Service</th>
                    <th className="py-3 px-4 text-left font-medium text-salon-500">Amount</th>
                    <th className="py-3 px-4 text-left font-medium text-salon-500">Payment</th>
                    <th className="py-3 px-4 text-left font-medium text-salon-500">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-salon-100">
                  {salesData.map(sale => (
                    <tr key={sale.id} className="hover:bg-salon-50">
                      <td className="py-3 px-4 font-medium text-salon-800">#{sale.id}</td>
                      <td className="py-3 px-4 text-salon-800">{formatDate(sale.date)}</td>
                      <td className="py-3 px-4 text-salon-800">{sale.customer.name}</td>
                      <td className="py-3 px-4 text-salon-800">{sale.employee.name}</td>
                      <td className="py-3 px-4 text-salon-800">{sale.service.name}</td>
                      <td className="py-3 px-4 font-medium text-salon-800">
                        ${sale.totalAmount.toFixed(2)}
                      </td>
                      <td className="py-3 px-4 text-salon-800">{sale.paymentMethod}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                          sale.status === 'completed' 
                            ? 'bg-success-100 text-success-700' 
                            : 'bg-warning-100 text-warning-700'
                        }`}>
                          {sale.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageTransition>
  );
};

export default SalesPage;
