
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { Moon, Settings, LogIn } from 'lucide-react';

const AppHeader: React.FC = () => {
  const { user, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link to="/" className="flex items-center space-x-2">
          <div className="relative">
            <Moon className="h-6 w-6 text-dream-violet" />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-aqua-glow rounded-full animate-pulse"></div>
          </div>
          <span className="font-heading font-bold text-xl bg-gradient-to-r from-dream-violet to-aqua-glow bg-clip-text text-transparent">
            Noira
          </span>
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
              <Link to="/rituals">
                <Button variant="ghost" size="sm">Rituals</Button>
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
              <Button className="bg-gradient-to-r from-dream-violet to-aqua-glow hover:from-dream-violet/80 hover:to-aqua-glow/80 text-white">
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
