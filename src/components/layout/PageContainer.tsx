
import React from 'react';

interface PageContainerProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

const PageContainer: React.FC<PageContainerProps> = ({ title, description, children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-midnight-indigo/5 via-dream-violet/5 to-midnight-indigo/5">
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold text-gray-900">{title}</h1>
          {description && <p className="text-gray-600 mt-2">{description}</p>}
        </div>
        {children}
      </div>
    </div>
  );
};

export default PageContainer;
