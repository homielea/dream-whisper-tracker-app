
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { BookOpen, Settings, LogIn } from 'lucide-react';

const AppHeader: React.FC = () => {
  const { user, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link to="/" className="flex items-center space-x-2">
          <BookOpen className="h-6 w-6 text-dream" />
          <span className="font-bold text-xl">MILD Dream Tracker</span>
        </Link>
        
        <nav className="flex-1 flex items-center justify-end space-x-4">
          {user ? (
            <>
              <Link to="/journal">
                <Button variant="ghost" size="sm">Dream Journal</Button>
              </Link>
              <Link to="/mood">
                <Button variant="ghost" size="sm">Mood Tracking</Button>
              </Link>
              <Link to="/reminders">
                <Button variant="ghost" size="sm">Reminders</Button>
              </Link>
              <Link to="/settings">
                <Button variant="ghost" size="icon">
                  <Settings className="h-4 w-4" />
                </Button>
              </Link>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={signOut}
              >
                Sign Out
              </Button>
            </>
          ) : (
            <Link to="/auth">
              <Button className="bg-dream hover:bg-dream-dark">
                <LogIn className="h-4 w-4 mr-2" />
                Sign In
              </Button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default AppHeader;
