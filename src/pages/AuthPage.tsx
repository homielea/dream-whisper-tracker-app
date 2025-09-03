
import React from 'react';
import AuthForm from '@/components/auth/AuthForm';
import { Moon } from 'lucide-react';

const AuthPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-midnight-indigo via-dream-violet to-midnight-indigo p-4 relative">
      {/* Background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-1/4 w-64 h-64 bg-aqua-glow/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-dream-violet/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 w-full max-w-md text-center mb-8">
        <div className="flex justify-center mb-6">
          <div className="bg-aqua-glow/20 p-4 rounded-full border border-aqua-glow/30">
            <div className="relative">
              <Moon className="h-12 w-12 text-aqua-glow animate-float" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-aqua-glow rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
        
        <h1 className="text-4xl font-heading font-bold mb-2">
          <span className="bg-gradient-to-r from-lunar-silver to-aqua-glow bg-clip-text text-transparent">
            Noira
          </span>
        </h1>
        
        <p className="text-lunar-silver/90 font-medium mb-2">
          Where night meets clarity.
        </p>
        
        <p className="text-lunar-silver/70 text-sm">
          Unlock the power of lucid dreaming with guided rituals, journaling, and awareness tools.
        </p>
      </div>
      
      <AuthForm />
      
      <div className="relative z-10 mt-8 text-center text-sm text-lunar-silver/60 max-w-md">
        <p>"Noira is the modern tool for dream journaling, lucidity, and guided rituals."</p>
        <p className="mt-2 text-xs text-lunar-silver/50">
          Where night becomes your superpower.
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
