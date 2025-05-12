
import React from 'react';
import AuthForm from '@/components/auth/AuthForm';
import { BookOpen } from 'lucide-react';

const AuthPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-dream-light/20 p-4">
      <div className="w-full max-w-md text-center mb-6">
        <div className="flex justify-center mb-2">
          <BookOpen className="h-12 w-12 text-dream" />
        </div>
        <h1 className="text-3xl font-bold text-dream-dark">MILD Dream Tracker</h1>
        <p className="text-muted-foreground mt-2">
          Track your dreams, induce lucidity, and discover patterns in your subconscious
        </p>
      </div>
      
      <AuthForm />
      
      <div className="mt-8 text-center text-sm text-muted-foreground">
        <p>MILD stands for Mnemonic Induction of Lucid Dreams</p>
        <p className="mt-1">Record your dreams and set reminders to improve dream recall and lucidity</p>
      </div>
    </div>
  );
};

export default AuthPage;
