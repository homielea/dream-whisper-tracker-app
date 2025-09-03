
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  description, 
  icon, 
  footer,
  className = ""
}) => {
  return (
    <Card className={`bg-white/70 backdrop-blur-sm border border-white/40 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-white/80 ${className}`}>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-sm font-medium text-gray-600">
            {title}
          </CardTitle>
          {icon && <div>{icon}</div>}
        </div>
      </CardHeader>
      <CardContent className="py-2">
        <div className="text-3xl font-heading font-bold bg-gradient-to-r from-midnight-indigo to-dream-violet bg-clip-text text-transparent">{value}</div>
        {description && (
          <CardDescription className="text-xs mt-2 text-gray-500">
            {description}
          </CardDescription>
        )}
      </CardContent>
      {footer && (
        <CardFooter className="pt-3 border-t border-gray-200/50 text-xs text-gray-500">
          {footer}
        </CardFooter>
      )}
    </Card>
  );
};

export default StatCard;
