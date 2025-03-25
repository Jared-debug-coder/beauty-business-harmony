
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  iconColor?: string;
  change?: {
    value: number;
    trend: 'up' | 'down' | 'neutral';
  };
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  iconColor = 'text-accent-600',
  change,
  className,
}) => {
  const getTrendColor = () => {
    if (!change) return '';
    return change.trend === 'up' 
      ? 'text-success-500' 
      : change.trend === 'down' 
        ? 'text-danger-500' 
        : 'text-salon-500';
  };

  const getTrendIcon = () => {
    if (!change) return null;
    return change.trend === 'up' 
      ? '↑' 
      : change.trend === 'down' 
        ? '↓' 
        : '→';
  };

  return (
    <motion.div
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className={cn(
        "bg-white rounded-xl overflow-hidden transition-all shadow-card hover:shadow-elevated p-5",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="text-sm font-medium text-salon-500">{title}</h3>
          <div className="mt-2 flex items-baseline">
            <p className="text-2xl font-semibold text-salon-800">{value}</p>
            {change && (
              <span className={`ml-2 text-xs font-medium ${getTrendColor()}`}>
                {getTrendIcon()} {Math.abs(change.value)}%
              </span>
            )}
          </div>
        </div>
        <div className={`p-3 rounded-lg bg-opacity-10 ${iconColor.replace('text-', 'bg-')}`}>
          <Icon className={`h-5 w-5 ${iconColor}`} />
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;
