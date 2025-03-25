
import React, { useState } from 'react';
import { PageTransition } from '@/utils/transitions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Scissors, 
  Search, 
  PlusCircle, 
  Filter, 
  Clock, 
  DollarSign,
  BarChart,
  Tag
} from 'lucide-react';
import { servicesData } from '@/utils/mockData';

const ServicesPage: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter services based on category and search term
  const filteredServices = servicesData.filter(service => {
    const matchesCategory = filter === 'all' || service.category.toLowerCase() === filter.toLowerCase();
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         service.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  
  // Get unique categories for filter
  const categories = ['all', ...new Set(servicesData.map(service => service.category.toLowerCase()))];

  return (
    <PageTransition>
      <div className="animate-stagger space-y-6">
        {/* Header actions */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 animate-slide-up">
          <div>
            <h1 className="text-2xl font-semibold text-salon-800">Services</h1>
            <p className="text-salon-500 mt-1">Manage salon services and pricing</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-salon-400" />
              </div>
              <input
                type="text"
                placeholder="Search services..."
                className="py-2 pl-10 pr-4 w-64 bg-salon-50 rounded-md text-sm text-salon-800 focus:outline-none focus:ring-2 focus:ring-accent-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Button className="bg-accent-600 hover:bg-accent-700 text-white">
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Service
            </Button>
          </div>
        </div>
        
        {/* Category filter */}
        <div className="flex items-center gap-3 overflow-x-auto pb-2 animate-slide-up" style={{ animationDelay: '0.05s' }}>
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
        
        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          {filteredServices.map((service) => (
            <Card key={service.id} className="overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300">
              <div className="p-5 border-b border-salon-100">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-salon-800">{service.name}</h3>
                    <div className="flex items-center mt-1">
                      <Tag className="h-3.5 w-3.5 text-salon-500 mr-1.5" />
                      <span className="text-xs text-salon-500">{service.category}</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="font-semibold text-salon-800">${service.price}</span>
                  </div>
                </div>
                
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center text-sm text-salon-500">
                    <Clock className="h-4 w-4 mr-1.5" />
                    <span>{service.duration} min</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-salon-500">
                    <BarChart className="h-4 w-4 mr-1.5" />
                    <span>{service.popularity}% popularity</span>
                  </div>
                </div>
              </div>
              
              <div className="p-3 flex justify-end gap-2 bg-salon-50">
                <button className="px-3 py-1.5 text-xs font-medium text-salon-600 hover:text-salon-800 bg-white rounded border border-salon-200 hover:border-salon-300 transition-colors">
                  Edit
                </button>
                <button className="px-3 py-1.5 text-xs font-medium text-danger-600 hover:text-danger-700 bg-white rounded border border-salon-200 hover:border-danger-300 transition-colors">
                  Delete
                </button>
              </div>
            </Card>
          ))}
          
          {/* Empty state */}
          {filteredServices.length === 0 && (
            <div className="col-span-full py-12 flex flex-col items-center justify-center text-salon-500">
              <Scissors className="h-12 w-12 mb-3 opacity-20" />
              <p className="text-lg font-medium">No services found</p>
              <p className="text-sm mt-1">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
        
        {/* Service Categories */}
        <Card className="shadow-card overflow-hidden animate-slide-up" style={{ animationDelay: '0.15s' }}>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium text-salon-800 flex items-center gap-2">
              <Tag className="h-5 w-5 text-accent-500" />
              Service Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.filter(category => category !== 'all').map((category, index) => {
                const categoryServices = servicesData.filter(
                  service => service.category.toLowerCase() === category
                );
                const averagePrice = categoryServices.reduce(
                  (sum, service) => sum + service.price, 0
                ) / categoryServices.length;
                
                return (
                  <div 
                    key={index}
                    className="p-4 bg-salon-50 rounded-lg hover:bg-salon-100 transition-colors"
                  >
                    <h3 className="font-medium text-salon-800">
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </h3>
                    <div className="mt-2 flex justify-between text-sm text-salon-600">
                      <div className="flex items-center">
                        <Scissors className="h-4 w-4 mr-1.5" />
                        <span>{categoryServices.length} services</span>
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-0.5" />
                        <span>${averagePrice.toFixed(2)} avg</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageTransition>
  );
};

export default ServicesPage;
