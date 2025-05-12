
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BookOpen, Clock, BarChart2 } from 'lucide-react';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-dream-light/30">
      {/* Hero Section */}
      <div className="container pt-20 pb-16 text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-dream/10 p-4 rounded-full">
            <BookOpen className="h-12 w-12 text-dream animate-float" />
          </div>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-dream-dark mb-4">
          MILD Lucid Dream Tracker
        </h1>
        
        <p className="max-w-2xl mx-auto text-lg text-muted-foreground mb-8">
          Record your dreams, set reality check reminders, and discover patterns to 
          enhance your lucid dreaming practice
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/auth">
            <Button className="bg-dream hover:bg-dream-dark px-8 py-6 text-lg">
              Get Started
            </Button>
          </Link>
          <Link to="/about">
            <Button variant="outline" className="border-dream text-dream hover:bg-dream/5 px-8 py-6 text-lg">
              Learn More
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="container py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Dream Tracking Features</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/80 p-6 rounded-lg shadow-sm border border-dream-light flex flex-col items-center text-center">
            <div className="bg-dream/10 p-4 rounded-full mb-4">
              <BookOpen className="h-8 w-8 text-dream" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Dream Journal</h3>
            <p className="text-muted-foreground">
              Record your dreams with text or voice. AI analysis helps identify themes and patterns.
            </p>
          </div>
          
          <div className="bg-white/80 p-6 rounded-lg shadow-sm border border-dream-light flex flex-col items-center text-center">
            <div className="bg-dream/10 p-4 rounded-full mb-4">
              <Clock className="h-8 w-8 text-dream" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Reality Check Reminders</h3>
            <p className="text-muted-foreground">
              Set customizable reminders to perform reality checks throughout the day.
            </p>
          </div>
          
          <div className="bg-white/80 p-6 rounded-lg shadow-sm border border-dream-light flex flex-col items-center text-center">
            <div className="bg-dream/10 p-4 rounded-full mb-4">
              <BarChart2 className="h-8 w-8 text-dream" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Mood & Dream Analysis</h3>
            <p className="text-muted-foreground">
              Track your moods and discover how they correlate with dream themes.
            </p>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="container py-16 text-center">
        <div className="max-w-3xl mx-auto bg-dream/10 p-8 rounded-lg border border-dream-light">
          <h2 className="text-2xl font-bold mb-4">Ready to Explore Your Dreams?</h2>
          <p className="text-lg text-muted-foreground mb-6">
            Start your lucid dreaming journey with our comprehensive tracking tools.
          </p>
          <Link to="/auth">
            <Button className="bg-dream hover:bg-dream-dark px-8">
              Create Your Account
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="container py-8 border-t text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} MILD Lucid Dream Tracker</p>
      </footer>
    </div>
  );
};

export default LandingPage;
