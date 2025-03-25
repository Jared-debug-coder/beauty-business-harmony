
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { revenueData } from '@/utils/mockData';

interface ChartTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const CustomTooltip: React.FC<ChartTooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded-lg shadow-lg border border-salon-100">
        <p className="text-sm font-medium text-salon-800">{label}</p>
        <p className="text-sm font-semibold text-accent-600">
          ${payload[0].value.toFixed(2)}
        </p>
      </div>
    );
  }

  return null;
};

const RevenueChart: React.FC = () => {
  return (
    <Card className="overflow-hidden shadow-card hover:shadow-elevated transition-shadow duration-300">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium text-salon-800">Revenue Overview</CardTitle>
          <div className="flex items-center gap-3">
            <select className="bg-salon-50 text-salon-800 text-sm rounded-md px-2 py-1 border border-salon-200 focus:outline-none focus:ring-1 focus:ring-accent-500">
              <option value="week">Last 7 days</option>
              <option value="month">Last 30 days</option>
              <option value="year">This year</option>
            </select>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-[300px] mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={revenueData}
              margin={{
                top: 10,
                right: 10,
                left: 0,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis 
                dataKey="date" 
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
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="monotone" 
                dataKey="revenue" 
                stroke="#0ea5e9" 
                fillOpacity={1}
                fill="url(#colorRevenue)" 
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default RevenueChart;
