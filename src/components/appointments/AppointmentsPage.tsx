
import React, { useState } from 'react';
import { PageTransition } from '@/utils/transitions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Users, 
  Search, 
  Scissors, 
  PlusCircle 
} from 'lucide-react';
import { appointmentsData, servicesData, employeesData, customersData } from '@/utils/mockData';
import { format } from 'date-fns';

const AppointmentsPage: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Get service and employee info by ID
  const getServiceName = (serviceId: number) => {
    const service = servicesData.find(s => s.id === serviceId);
    return service ? service.name : 'Unknown Service';
  };
  
  const getEmployeeName = (employeeId: number) => {
    const employee = employeesData.find(e => e.id === employeeId);
    return employee ? employee.name : 'Unknown Employee';
  };

  // Format time to display
  const formatTime = (date: Date) => {
    return format(new Date(date), 'h:mm a');
  };

  // Group appointments by hour for time slots
  const getTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour <= 18; hour++) {
      slots.push({
        time: `${hour > 12 ? hour - 12 : hour}:00 ${hour >= 12 ? 'PM' : 'AM'}`,
        hour: hour,
        appointments: appointmentsData.filter(apt => {
          const aptHour = new Date(apt.startTime).getHours();
          return aptHour === hour;
        })
      });
    }
    return slots;
  };

  return (
    <PageTransition>
      <div className="animate-stagger space-y-6">
        {/* Header actions */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 animate-slide-up">
          <div>
            <h1 className="text-2xl font-semibold text-salon-800">Appointments</h1>
            <p className="text-salon-500 mt-1">Manage and schedule client appointments</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-salon-400" />
              </div>
              <input
                type="text"
                placeholder="Search appointments..."
                className="py-2 pl-10 pr-4 w-64 bg-salon-50 rounded-md text-sm text-salon-800 focus:outline-none focus:ring-2 focus:ring-accent-500"
              />
            </div>
            
            <Button className="bg-accent-600 hover:bg-accent-700 text-white">
              <PlusCircle className="h-4 w-4 mr-2" />
              New Appointment
            </Button>
          </div>
        </div>
        
        {/* Calendar and Schedule */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          {/* Calendar Component */}
          <Card className="shadow-card overflow-hidden lg:col-span-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-salon-800 flex items-center gap-2">
                <CalendarIcon className="h-5 w-5 text-accent-500" />
                Select Date
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-salon-50 rounded-lg">
                {/* This would be a calendar component */}
                <div className="text-center py-8">
                  <p className="text-salon-500">Calendar Component</p>
                  <p className="text-salon-800 font-medium mt-2">
                    {format(currentDate, 'MMMM d, yyyy')}
                  </p>
                </div>
              </div>
              
              <div className="mt-5 space-y-3">
                <h3 className="text-sm font-medium text-salon-800">Filter Appointments</h3>
                
                <div className="space-y-2">
                  <label className="text-xs text-salon-500">Service Category</label>
                  <select className="w-full bg-salon-50 text-salon-800 text-sm rounded-md px-3 py-2 border border-salon-200 focus:outline-none focus:ring-1 focus:ring-accent-500">
                    <option value="">All Services</option>
                    <option value="Hair">Hair</option>
                    <option value="Nails">Nails</option>
                    <option value="Skincare">Skincare</option>
                    <option value="Wellness">Wellness</option>
                    <option value="Hair Removal">Hair Removal</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs text-salon-500">Employee</label>
                  <select className="w-full bg-salon-50 text-salon-800 text-sm rounded-md px-3 py-2 border border-salon-200 focus:outline-none focus:ring-1 focus:ring-accent-500">
                    <option value="">All Employees</option>
                    {employeesData.map(employee => (
                      <option key={employee.id} value={employee.id}>{employee.name}</option>
                    ))}
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs text-salon-500">Status</label>
                  <select className="w-full bg-salon-50 text-salon-800 text-sm rounded-md px-3 py-2 border border-salon-200 focus:outline-none focus:ring-1 focus:ring-accent-500">
                    <option value="">All Statuses</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="pending">Pending</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Daily Schedule */}
          <Card className="shadow-card overflow-hidden lg:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-salon-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-accent-500" />
                  Today's Schedule
                </div>
                <div className="text-sm font-normal text-salon-500">
                  {format(currentDate, 'EEEE, MMMM d')}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-salon-100">
                {getTimeSlots().map((slot, idx) => (
                  <div key={idx} className="flex">
                    {/* Time column */}
                    <div className="w-20 py-3 px-4 text-salon-500 text-sm font-medium">
                      {slot.time}
                    </div>
                    
                    {/* Appointments column */}
                    <div className="flex-1 py-3 px-4 min-h-[70px] border-l border-salon-100">
                      {slot.appointments.length > 0 ? (
                        <div className="space-y-2">
                          {slot.appointments.map(appointment => (
                            <div 
                              key={appointment.id} 
                              className="p-2 rounded-md bg-accent-50 border-l-4 border-accent-500 transition-all hover:shadow-subtle"
                            >
                              <div className="flex justify-between items-start">
                                <p className="font-medium text-salon-800">{appointment.customer.name}</p>
                                <span className={`text-xs px-2 py-0.5 rounded-full ${
                                  appointment.status === 'confirmed' 
                                    ? 'bg-success-100 text-success-700' 
                                    : 'bg-warning-100 text-warning-700'
                                }`}>
                                  {appointment.status}
                                </span>
                              </div>
                              <div className="mt-1 flex items-center gap-3 text-xs text-salon-500">
                                <div className="flex items-center gap-1">
                                  <Scissors className="h-3 w-3" />
                                  <span>{appointment.service.name}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Users className="h-3 w-3" />
                                  <span>{appointment.employee.name}</span>
                                </div>
                                <div>
                                  {formatTime(appointment.startTime)} - {formatTime(appointment.endTime)}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="h-full flex items-center justify-center">
                          <p className="text-sm text-salon-400">No appointments</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Upcoming Appointments List */}
        <Card className="shadow-card overflow-hidden animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium text-salon-800 flex items-center gap-2">
              <Users className="h-5 w-5 text-accent-500" />
              Upcoming Appointments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-salon-200">
                    <th className="py-3 px-4 text-left font-medium text-salon-500">Client</th>
                    <th className="py-3 px-4 text-left font-medium text-salon-500">Service</th>
                    <th className="py-3 px-4 text-left font-medium text-salon-500">Date & Time</th>
                    <th className="py-3 px-4 text-left font-medium text-salon-500">Duration</th>
                    <th className="py-3 px-4 text-left font-medium text-salon-500">Employee</th>
                    <th className="py-3 px-4 text-left font-medium text-salon-500">Status</th>
                    <th className="py-3 px-4 text-left font-medium text-salon-500">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-salon-100">
                  {appointmentsData.map(appointment => (
                    <tr key={appointment.id} className="hover:bg-salon-50">
                      <td className="py-3 px-4">
                        <div className="font-medium text-salon-800">{appointment.customer.name}</div>
                        <div className="text-xs text-salon-500">{appointment.customer.phone}</div>
                      </td>
                      <td className="py-3 px-4 text-salon-800">{appointment.service.name}</td>
                      <td className="py-3 px-4">
                        <div className="text-salon-800">
                          {format(new Date(appointment.startTime), 'MMM d, yyyy')}
                        </div>
                        <div className="text-xs text-salon-500">
                          {formatTime(appointment.startTime)} - {formatTime(appointment.endTime)}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-salon-800">
                        {appointment.service.duration} min
                      </td>
                      <td className="py-3 px-4 text-salon-800">{appointment.employee.name}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                          appointment.status === 'confirmed' 
                            ? 'bg-success-100 text-success-700' 
                            : 'bg-warning-100 text-warning-700'
                        }`}>
                          {appointment.status}
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
                          <button className="p-1 text-salon-500 hover:text-danger-600 rounded-md hover:bg-salon-100">
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
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
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

export default AppointmentsPage;
