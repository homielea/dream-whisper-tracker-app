
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
    <Card className={`shadow-sm hover:shadow transition-shadow ${className}`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
          {icon && <div className="text-dream">{icon}</div>}
        </div>
      </CardHeader>
      <CardContent className="py-2">
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <CardDescription className="text-xs mt-1">
            {description}
          </CardDescription>
        )}
      </CardContent>
      {footer && (
        <CardFooter className="pt-2 border-t text-xs text-muted-foreground">
          {footer}
        </CardFooter>
      )}
    </Card>
  );
};

export default StatCard;
