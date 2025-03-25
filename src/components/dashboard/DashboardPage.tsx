
import React from 'react';
import { PageTransition } from '@/utils/transitions';
import StatCard from '@/components/dashboard/StatCard';
import RevenueChart from '@/components/dashboard/RevenueChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, DollarSign, Users, ShoppingBag, CheckCircle, Package, ArrowUpRight } from 'lucide-react';
import { servicesData, appointmentsData, metricsData, inventoryData } from '@/utils/mockData';

const DashboardPage: React.FC = () => {
  // Calculate upcoming appointments (future appointments)
  const upcomingAppointments = appointmentsData.filter(
    appointment => new Date(appointment.startTime) > new Date()
  );

  // Calculate items requiring attention (low stock)
  const lowStockItems = inventoryData.filter(item => item.stock <= item.minStock);

  return (
    <PageTransition>
      <div className="animate-stagger space-y-6">
        {/* Stats overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 animate-slide-up">
          <StatCard 
            title="Daily Revenue" 
            value={`$${metricsData.dailyRevenue}`} 
            icon={DollarSign}
            iconColor="text-accent-600"
            change={{ value: 8, trend: 'up' }}
          />
          
          <StatCard 
            title="Weekly Revenue" 
            value={`$${metricsData.weeklyRevenue}`} 
            icon={DollarSign}
            iconColor="text-accent-600"
            change={{ value: 12, trend: 'up' }}
          />
          
          <StatCard 
            title="Appointments Today" 
            value={appointmentsData.length} 
            icon={Calendar}
            iconColor="text-success-600"
            change={{ value: 5, trend: 'up' }}
          />
          
          <StatCard 
            title="This Month" 
            value={metricsData.customersMonth} 
            icon={Users}
            iconColor="text-warning-600"
            change={{ value: 2, trend: 'down' }}
          />
        </div>
        
        {/* Revenue Chart */}
        <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <RevenueChart />
        </div>
        
        {/* Bottom section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          {/* Upcoming appointments */}
          <Card className="shadow-card hover:shadow-elevated transition-shadow duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-salon-800 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-accent-500" />
                Upcoming Appointments
              </CardTitle>
            </CardHeader>
            <CardContent>
              {upcomingAppointments.length > 0 ? (
                <ul className="space-y-3">
                  {upcomingAppointments.slice(0, 4).map(appointment => (
                    <li key={appointment.id} className="flex items-center justify-between p-3 bg-salon-50 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-salon-800">{appointment.customer.name}</p>
                        <div className="flex items-center text-xs text-salon-500 mt-1">
                          <span>{appointment.service.name}</span>
                          <span className="mx-1">•</span>
                          <span>
                            {new Date(appointment.startTime).toLocaleTimeString([], { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          appointment.status === 'confirmed' 
                            ? 'bg-success-100 text-success-700' 
                            : 'bg-warning-100 text-warning-700'
                        }`}>
                          {appointment.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-salon-500 text-sm py-4 text-center">
                  No upcoming appointments for today
                </div>
              )}
              
              <button className="mt-4 w-full py-2 bg-salon-50 text-salon-600 font-medium text-sm rounded-lg hover:bg-salon-100 transition-colors flex items-center justify-center gap-1">
                View All Appointments
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </CardContent>
          </Card>
          
          {/* Popular services */}
          <Card className="shadow-card hover:shadow-elevated transition-shadow duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-salon-800 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-success-500" />
                Popular Services
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {servicesData
                  .sort((a, b) => b.popularity - a.popularity)
                  .slice(0, 5)
                  .map(service => (
                    <li key={service.id} className="flex items-center justify-between p-3 bg-salon-50 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-salon-800">{service.name}</p>
                        <div className="flex items-center text-xs text-salon-500 mt-1">
                          <span>{service.category}</span>
                          <span className="mx-1">•</span>
                          <span>{service.duration} min</span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium text-salon-800">${service.price}</span>
                      </div>
                    </li>
                  ))}
              </ul>
              
              <button className="mt-4 w-full py-2 bg-salon-50 text-salon-600 font-medium text-sm rounded-lg hover:bg-salon-100 transition-colors flex items-center justify-center gap-1">
                View All Services
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </CardContent>
          </Card>
          
          {/* Inventory alerts */}
          <Card className="shadow-card hover:shadow-elevated transition-shadow duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-salon-800 flex items-center gap-2">
                <Package className="h-5 w-5 text-warning-500" />
                Inventory Alerts
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
                  
                  {inventoryData
                    .filter(item => item.stock > item.minStock && item.stock <= item.minStock + 3)
                    .slice(0, 3 - lowStockItems.length)
                    .map(item => (
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
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-warning-100 text-warning-700">
                            {item.stock} left
                          </span>
                        </div>
                      </li>
                    ))}
                </ul>
              ) : (
                <div className="text-salon-500 text-sm py-4 text-center">
                  No inventory alerts at this time
                </div>
              )}
              
              <button className="mt-4 w-full py-2 bg-salon-50 text-salon-600 font-medium text-sm rounded-lg hover:bg-salon-100 transition-colors flex items-center justify-center gap-1">
                View Inventory
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageTransition>
  );
};

export default DashboardPage;
