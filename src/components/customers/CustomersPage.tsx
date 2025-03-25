
import React from 'react';
import { PageTransition } from '@/utils/transitions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Search, 
  PlusCircle, 
  Calendar, 
  Mail, 
  Phone,
  Clock,
  User,
  DollarSign,
  MessageSquare
} from 'lucide-react';
import { customersData, servicesData } from '@/utils/mockData';

const CustomersPage: React.FC = () => {
  // Get service name by ID
  const getServiceName = (serviceId: number) => {
    const service = servicesData.find(s => s.id === serviceId);
    return service ? service.name : 'Unknown Service';
  };

  return (
    <PageTransition>
      <div className="animate-stagger space-y-6">
        {/* Header actions */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 animate-slide-up">
          <div>
            <h1 className="text-2xl font-semibold text-salon-800">Customers</h1>
            <p className="text-salon-500 mt-1">Manage customer information and history</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-salon-400" />
              </div>
              <input
                type="text"
                placeholder="Search customers..."
                className="py-2 pl-10 pr-4 w-64 bg-salon-50 rounded-md text-sm text-salon-800 focus:outline-none focus:ring-2 focus:ring-accent-500"
              />
            </div>
            
            <Button className="bg-accent-600 hover:bg-accent-700 text-white">
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Customer
            </Button>
          </div>
        </div>
        
        {/* Customers grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          {customersData.map((customer) => (
            <Card key={customer.id} className="overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300">
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-salon-800">{customer.name}</h3>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-accent-100 text-accent-800">
                        <Clock className="h-3 w-3 mr-1" />
                        {customer.visitCount} visits
                      </span>
                      
                      {customer.totalSpent > 500 && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-success-100 text-success-800">
                          VIP
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="h-10 w-10 rounded-full bg-salon-100 flex items-center justify-center">
                    <User className="h-5 w-5 text-salon-600" />
                  </div>
                </div>
                
                <div className="mt-4 space-y-2">
                  <div className="flex items-center text-sm text-salon-600">
                    <Mail className="h-4 w-4 mr-2 text-salon-400" />
                    <span>{customer.email}</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-salon-600">
                    <Phone className="h-4 w-4 mr-2 text-salon-400" />
                    <span>{customer.phone}</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-salon-600">
                    <Calendar className="h-4 w-4 mr-2 text-salon-400" />
                    <span>Last visit: {customer.lastVisit}</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-salon-600">
                    <DollarSign className="h-4 w-4 mr-2 text-salon-400" />
                    <span>Total spent: ${customer.totalSpent}</span>
                  </div>
                </div>
                
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-salon-700 mb-2">Preferred Services</h4>
                  <div className="flex flex-wrap gap-2">
                    {customer.preferredServices.map((serviceId) => (
                      <span key={serviceId} className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-salon-100 text-salon-700">
                        {getServiceName(serviceId)}
                      </span>
                    ))}
                  </div>
                </div>
                
                {customer.notes && (
                  <div className="mt-4 p-3 bg-salon-50 rounded-md border border-salon-100">
                    <div className="flex items-start gap-2">
                      <MessageSquare className="h-4 w-4 text-salon-400 mt-0.5" />
                      <p className="text-xs text-salon-600">{customer.notes}</p>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="p-3 flex justify-end gap-2 bg-salon-50 border-t border-salon-100">
                <button className="px-3 py-1.5 text-xs font-medium text-salon-600 hover:text-salon-800 bg-white rounded border border-salon-200 hover:border-salon-300 transition-colors">
                  Edit
                </button>
                <button className="px-3 py-1.5 text-xs font-medium text-accent-600 hover:text-accent-700 bg-white rounded border border-salon-200 hover:border-accent-300 transition-colors">
                  Book Appointment
                </button>
              </div>
            </Card>
          ))}
        </div>
        
        {/* Customer Table */}
        <Card className="shadow-card overflow-hidden animate-slide-up" style={{ animationDelay: '0.15s' }}>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium text-salon-800 flex items-center gap-2">
              <Users className="h-5 w-5 text-accent-500" />
              Customer List
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-salon-200">
                    <th className="py-3 px-4 text-left font-medium text-salon-500">Customer</th>
                    <th className="py-3 px-4 text-left font-medium text-salon-500">Contact</th>
                    <th className="py-3 px-4 text-left font-medium text-salon-500">Visits</th>
                    <th className="py-3 px-4 text-left font-medium text-salon-500">Last Visit</th>
                    <th className="py-3 px-4 text-left font-medium text-salon-500">Total Spent</th>
                    <th className="py-3 px-4 text-left font-medium text-salon-500">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-salon-100">
                  {customersData.map(customer => (
                    <tr key={customer.id} className="hover:bg-salon-50">
                      <td className="py-3 px-4">
                        <div className="font-medium text-salon-800">{customer.name}</div>
                        {customer.totalSpent > 500 && (
                          <span className="inline-flex px-2 py-0.5 text-xs rounded-full bg-success-100 text-success-700">
                            VIP
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-salon-800">{customer.email}</div>
                        <div className="text-xs text-salon-500">{customer.phone}</div>
                      </td>
                      <td className="py-3 px-4 text-salon-800">{customer.visitCount}</td>
                      <td className="py-3 px-4 text-salon-800">{customer.lastVisit}</td>
                      <td className="py-3 px-4 font-medium text-salon-800">${customer.totalSpent}</td>
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
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
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
      </div>
    </PageTransition>
  );
};

export default CustomersPage;
