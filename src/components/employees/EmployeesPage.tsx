
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
  Scissors,
  Clock,
  DollarSign
} from 'lucide-react';
import { employeesData, servicesData } from '@/utils/mockData';

const EmployeesPage: React.FC = () => {
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
            <h1 className="text-2xl font-semibold text-salon-800">Employees</h1>
            <p className="text-salon-500 mt-1">Manage salon staff and assignments</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-salon-400" />
              </div>
              <input
                type="text"
                placeholder="Search employees..."
                className="py-2 pl-10 pr-4 w-64 bg-salon-50 rounded-md text-sm text-salon-800 focus:outline-none focus:ring-2 focus:ring-accent-500"
              />
            </div>
            
            <Button className="bg-accent-600 hover:bg-accent-700 text-white">
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Employee
            </Button>
          </div>
        </div>
        
        {/* Employees grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          {employeesData.map((employee) => (
            <Card key={employee.id} className="overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300">
              <div className="p-5">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      src={employee.image}
                      alt={employee.name}
                      className="h-16 w-16 rounded-full object-cover border-2 border-white shadow-subtle"
                    />
                    <div className="absolute bottom-0 right-0 h-4 w-4 rounded-full bg-success-500 border-2 border-white"></div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-salon-800">{employee.name}</h3>
                    <p className="text-sm text-salon-500">{employee.role}</p>
                    <div className="mt-2 flex items-center">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-accent-100 text-accent-800">
                        <Clock className="h-3 w-3 mr-1" />
                        {employee.workHours}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 space-y-2">
                  <div className="flex items-center text-sm text-salon-600">
                    <Mail className="h-4 w-4 mr-2 text-salon-400" />
                    <span>{employee.email}</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-salon-600">
                    <Phone className="h-4 w-4 mr-2 text-salon-400" />
                    <span>{employee.phone}</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-salon-600">
                    <Calendar className="h-4 w-4 mr-2 text-salon-400" />
                    <span>Started {employee.startDate}</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-salon-600">
                    <DollarSign className="h-4 w-4 mr-2 text-salon-400" />
                    <span>{employee.commission}% Commission</span>
                  </div>
                </div>
                
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-salon-700 mb-2">Services Offered</h4>
                  <div className="flex flex-wrap gap-2">
                    {employee.services.map((serviceId) => (
                      <span key={serviceId} className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-salon-100 text-salon-700">
                        <Scissors className="h-3 w-3 mr-1" />
                        {getServiceName(serviceId)}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="p-3 flex justify-end gap-2 bg-salon-50 border-t border-salon-100">
                <button className="px-3 py-1.5 text-xs font-medium text-salon-600 hover:text-salon-800 bg-white rounded border border-salon-200 hover:border-salon-300 transition-colors">
                  Edit
                </button>
                <button className="px-3 py-1.5 text-xs font-medium text-accent-600 hover:text-accent-700 bg-white rounded border border-salon-200 hover:border-accent-300 transition-colors">
                  Schedule
                </button>
              </div>
            </Card>
          ))}
        </div>
        
        {/* Employee Performance */}
        <Card className="shadow-card overflow-hidden animate-slide-up" style={{ animationDelay: '0.15s' }}>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium text-salon-800 flex items-center gap-2">
              <Users className="h-5 w-5 text-accent-500" />
              Employee Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-salon-200">
                    <th className="py-3 px-4 text-left font-medium text-salon-500">Employee</th>
                    <th className="py-3 px-4 text-left font-medium text-salon-500">Role</th>
                    <th className="py-3 px-4 text-left font-medium text-salon-500">Services Offered</th>
                    <th className="py-3 px-4 text-left font-medium text-salon-500">Commission Rate</th>
                    <th className="py-3 px-4 text-left font-medium text-salon-500">Status</th>
                    <th className="py-3 px-4 text-left font-medium text-salon-500">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-salon-100">
                  {employeesData.map(employee => (
                    <tr key={employee.id} className="hover:bg-salon-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={employee.image}
                            alt={employee.name}
                            className="h-8 w-8 rounded-full object-cover"
                          />
                          <div className="font-medium text-salon-800">{employee.name}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-salon-800">{employee.role}</td>
                      <td className="py-3 px-4 text-salon-800">{employee.services.length} services</td>
                      <td className="py-3 px-4 text-salon-800">{employee.commission}%</td>
                      <td className="py-3 px-4">
                        <span className="inline-flex px-2 py-1 text-xs rounded-full bg-success-100 text-success-700">
                          Active
                        </span>
                      </td>
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
                          <button className="p-1 text-salon-500 hover:text-salon-800 rounded-md hover:bg-salon-100">
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
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
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

export default EmployeesPage;
