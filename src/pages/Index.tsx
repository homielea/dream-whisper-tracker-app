
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import AppHeader from '@/components/layout/AppHeader';
import LandingPage from './LandingPage';

const Index: React.FC = () => {
  const { user, loading } = useAuth();
  
  // Show landing page to non-authenticated users
  if (!loading && !user) {
    return (
      <>
        <AppHeader />
        <LandingPage />
      </>
    );
  }
  
  // Redirect logged in users to dashboard
  if (!loading && user) {
    return <Navigate to="/dashboard" />;
  }
  
  // Loading state
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="bg-dream/10 p-4 rounded-full mx-auto mb-4">
          <div className="h-12 w-12 text-dream animate-pulse-gentle" />
        </div>
        <p className="text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
};

export default Index;
