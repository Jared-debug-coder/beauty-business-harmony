
import { subDays, format, startOfDay, addHours, addMinutes } from 'date-fns';

// Revenue data for charts
export const revenueData = [
  { date: format(subDays(new Date(), 6), 'MMM dd'), revenue: 1200 },
  { date: format(subDays(new Date(), 5), 'MMM dd'), revenue: 1800 },
  { date: format(subDays(new Date(), 4), 'MMM dd'), revenue: 1600 },
  { date: format(subDays(new Date(), 3), 'MMM dd'), revenue: 2100 },
  { date: format(subDays(new Date(), 2), 'MMM dd'), revenue: 1900 },
  { date: format(subDays(new Date(), 1), 'MMM dd'), revenue: 2400 },
  { date: format(new Date(), 'MMM dd'), revenue: 1700 },
];

// Services data
export const servicesData = [
  { id: 1, name: 'Haircut', category: 'Hair', price: 30, duration: 30, popularity: 92 },
  { id: 2, name: 'Hair Coloring', category: 'Hair', price: 120, duration: 120, popularity: 76 },
  { id: 3, name: 'Blowout', category: 'Hair', price: 50, duration: 45, popularity: 84 },
  { id: 4, name: 'Manicure', category: 'Nails', price: 35, duration: 45, popularity: 80 },
  { id: 5, name: 'Pedicure', category: 'Nails', price: 45, duration: 60, popularity: 78 },
  { id: 6, name: 'Facial', category: 'Skincare', price: 80, duration: 60, popularity: 65 },
  { id: 7, name: 'Massage', category: 'Wellness', price: 90, duration: 60, popularity: 72 },
  { id: 8, name: 'Waxing', category: 'Hair Removal', price: 40, duration: 30, popularity: 60 },
  { id: 9, name: 'Eyebrow Threading', category: 'Hair Removal', price: 25, duration: 15, popularity: 58 },
  { id: 10, name: 'Hair Treatment', category: 'Hair', price: 70, duration: 45, popularity: 53 },
];

// Employee data
export const employeesData = [
  { 
    id: 1, 
    name: 'Emma Johnson', 
    role: 'Hair Stylist', 
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    email: 'emma.j@salon.com',
    phone: '(555) 123-4567',
    startDate: '2021-05-12',
    services: [1, 2, 3, 10],
    commission: 30,
    workHours: '9:00 AM - 5:00 PM'
  },
  { 
    id: 2, 
    name: 'Michael Smith', 
    role: 'Barber', 
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    email: 'michael.s@salon.com',
    phone: '(555) 987-6543',
    startDate: '2020-11-03',
    services: [1, 3],
    commission: 25,
    workHours: '10:00 AM - 6:00 PM'
  },
  { 
    id: 3, 
    name: 'Sophia Martinez', 
    role: 'Nail Technician', 
    image: 'https://randomuser.me/api/portraits/women/22.jpg',
    email: 'sophia.m@salon.com',
    phone: '(555) 456-7890',
    startDate: '2022-02-15',
    services: [4, 5],
    commission: 20,
    workHours: '9:00 AM - 5:00 PM'
  },
  { 
    id: 4, 
    name: 'Olivia Wilson', 
    role: 'Esthetician', 
    image: 'https://randomuser.me/api/portraits/women/17.jpg',
    email: 'olivia.w@salon.com',
    phone: '(555) 234-5678',
    startDate: '2021-09-20',
    services: [6, 8, 9],
    commission: 25,
    workHours: '11:00 AM - 7:00 PM'
  },
  { 
    id: 5, 
    name: 'James Rodriguez', 
    role: 'Massage Therapist', 
    image: 'https://randomuser.me/api/portraits/men/54.jpg',
    email: 'james.r@salon.com',
    phone: '(555) 876-5432',
    startDate: '2022-04-10',
    services: [7],
    commission: 30,
    workHours: '12:00 PM - 8:00 PM'
  }
];

// Customer data
export const customersData = [
  { 
    id: 1, 
    name: 'Sophia Williams', 
    email: 'sophia.w@example.com', 
    phone: '(555) 111-2233', 
    lastVisit: '2023-06-15',
    totalSpent: 480,
    visitCount: 8,
    preferredServices: [1, 6],
    notes: 'Prefers natural products. Allergic to sulfates.'
  },
  { 
    id: 2, 
    name: 'Daniel Johnson', 
    email: 'daniel.j@example.com', 
    phone: '(555) 444-5566', 
    lastVisit: '2023-06-02',
    totalSpent: 210,
    visitCount: 4,
    preferredServices: [1],
    notes: 'Likes to book with Michael specifically.'
  },
  { 
    id: 3, 
    name: 'Isabella Brown', 
    email: 'isabella.b@example.com', 
    phone: '(555) 777-8899', 
    lastVisit: '2023-05-28',
    totalSpent: 950,
    visitCount: 12,
    preferredServices: [2, 4, 5],
    notes: 'VIP customer. Prefers afternoon appointments.'
  },
  { 
    id: 4, 
    name: 'Ethan Miller', 
    email: 'ethan.m@example.com', 
    phone: '(555) 123-7890', 
    lastVisit: '2023-06-18',
    totalSpent: 180,
    visitCount: 3,
    preferredServices: [1, 8],
    notes: 'New customer. Referred by Isabella Brown.'
  },
  { 
    id: 5, 
    name: 'Mia Davis', 
    email: 'mia.d@example.com', 
    phone: '(555) 222-3344', 
    lastVisit: '2023-05-22',
    totalSpent: 560,
    visitCount: 9,
    preferredServices: [3, 7],
    notes: 'Prefers early morning appointments. Likes to chat.'
  }
];

// Inventory data
export const inventoryData = [
  { 
    id: 1, 
    name: 'Professional Hair Shampoo', 
    category: 'Hair Care', 
    stock: 24, 
    minStock: 10,
    costPrice: 12.5,
    sellingPrice: 28,
    supplier: 'BeautyCo Supplies',
    lastRestocked: '2023-06-01'
  },
  { 
    id: 2, 
    name: 'Hair Coloring Kit - Blonde', 
    category: 'Hair Color', 
    stock: 8, 
    minStock: 5,
    costPrice: 18,
    sellingPrice: 45,
    supplier: 'ColorMaster Pro',
    lastRestocked: '2023-05-15'
  },
  { 
    id: 3, 
    name: 'Premium Nail Polish Set', 
    category: 'Nail Care', 
    stock: 15, 
    minStock: 8,
    costPrice: 22,
    sellingPrice: 40,
    supplier: 'NailPro Distributors',
    lastRestocked: '2023-06-10'
  },
  { 
    id: 4, 
    name: 'Facial Cleansing Cream', 
    category: 'Skincare', 
    stock: 12, 
    minStock: 6,
    costPrice: 15,
    sellingPrice: 35,
    supplier: 'BeautyCo Supplies',
    lastRestocked: '2023-05-28'
  },
  { 
    id: 5, 
    name: 'Massage Oil - Lavender', 
    category: 'Massage', 
    stock: 7, 
    minStock: 4,
    costPrice: 10,
    sellingPrice: 32,
    supplier: 'WellnessPro Products',
    lastRestocked: '2023-05-20'
  },
  { 
    id: 6, 
    name: 'Hair Styling Gel', 
    category: 'Hair Care', 
    stock: 18, 
    minStock: 8,
    costPrice: 8,
    sellingPrice: 22,
    supplier: 'BeautyCo Supplies',
    lastRestocked: '2023-06-05'
  },
  { 
    id: 7, 
    name: 'Hair Dryer - Professional', 
    category: 'Equipment', 
    stock: 3, 
    minStock: 2,
    costPrice: 45,
    sellingPrice: 120,
    supplier: 'SalonEquip Inc.',
    lastRestocked: '2023-04-12'
  },
  { 
    id: 8, 
    name: 'Waxing Kit Complete', 
    category: 'Hair Removal', 
    stock: 4, 
    minStock: 3,
    costPrice: 35,
    sellingPrice: 85,
    supplier: 'BeautyCo Supplies',
    lastRestocked: '2023-05-10'
  }
];

// Generate appointments for the current day
const today = startOfDay(new Date());
const generateTimeSlot = (baseHour: number, minutes: number) => addMinutes(addHours(today, baseHour), minutes);

export const appointmentsData = [
  { 
    id: 1, 
    customer: customersData[0], 
    service: servicesData[0], 
    employee: employeesData[0],
    startTime: generateTimeSlot(10, 0),
    endTime: generateTimeSlot(10, 30),
    status: 'confirmed',
    notes: ''
  },
  { 
    id: 2, 
    customer: customersData[1], 
    service: servicesData[0], 
    employee: employeesData[1],
    startTime: generateTimeSlot(11, 0),
    endTime: generateTimeSlot(11, 30),
    status: 'confirmed',
    notes: 'First-time client'
  },
  { 
    id: 3, 
    customer: customersData[2], 
    service: servicesData[1], 
    employee: employeesData[0],
    startTime: generateTimeSlot(13, 0),
    endTime: generateTimeSlot(15, 0),
    status: 'confirmed',
    notes: 'Bringing reference photos'
  },
  { 
    id: 4, 
    customer: customersData[3], 
    service: servicesData[7], 
    employee: employeesData[3],
    startTime: generateTimeSlot(14, 30),
    endTime: generateTimeSlot(15, 0),
    status: 'confirmed',
    notes: ''
  },
  { 
    id: 5, 
    customer: customersData[4], 
    service: servicesData[6], 
    employee: employeesData[4],
    startTime: generateTimeSlot(16, 0),
    endTime: generateTimeSlot(17, 0),
    status: 'confirmed',
    notes: 'Requested extra focus on shoulders'
  },
  { 
    id: 6, 
    customer: customersData[0], 
    service: servicesData[5], 
    employee: employeesData[3],
    startTime: generateTimeSlot(17, 30),
    endTime: generateTimeSlot(18, 30),
    status: 'pending',
    notes: 'Follow-up from last facial treatment'
  }
];

// Sales data
export const salesData = [
  { 
    id: 1, 
    date: subDays(new Date(), 1),
    customer: customersData[0],
    employee: employeesData[0],
    service: servicesData[0],
    products: [inventoryData[0]],
    serviceAmount: 30,
    productAmount: 28,
    taxAmount: 5.8,
    totalAmount: 63.8,
    paymentMethod: 'Credit Card',
    status: 'completed'
  },
  { 
    id: 2, 
    date: subDays(new Date(), 1),
    customer: customersData[1],
    employee: employeesData[1],
    service: servicesData[0],
    products: [],
    serviceAmount: 30,
    productAmount: 0,
    taxAmount: 3,
    totalAmount: 33,
    paymentMethod: 'Cash',
    status: 'completed'
  },
  { 
    id: 3, 
    date: subDays(new Date(), 2),
    customer: customersData[2],
    employee: employeesData[0],
    service: servicesData[1],
    products: [inventoryData[1]],
    serviceAmount: 120,
    productAmount: 45,
    taxAmount: 16.5,
    totalAmount: 181.5,
    paymentMethod: 'Credit Card',
    status: 'completed'
  },
  { 
    id: 4, 
    date: new Date(),
    customer: customersData[3],
    employee: employeesData[3],
    service: servicesData[7],
    products: [],
    serviceAmount: 40,
    productAmount: 0,
    taxAmount: 4,
    totalAmount: 44,
    paymentMethod: 'Mobile Payment',
    status: 'pending'
  },
  { 
    id: 5, 
    date: new Date(),
    customer: customersData[4],
    employee: employeesData[4],
    service: servicesData[6],
    products: [inventoryData[4]],
    serviceAmount: 90,
    productAmount: 32,
    taxAmount: 12.2,
    totalAmount: 134.2,
    paymentMethod: 'Credit Card',
    status: 'completed'
  }
];

// Business metrics data
export const metricsData = {
  dailyRevenue: 245,
  weeklyRevenue: 1870,
  monthlyRevenue: 7580,
  appointmentsToday: 6,
  appointmentsWeek: 32,
  customersMonth: 78,
  inventoryAlerts: 2,
  topService: 'Haircut',
  topEmployee: 'Emma Johnson',
  averageServiceValue: 62.50
};
