
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/context/AuthContext';
import { Github, Twitter, Mail } from 'lucide-react';

const AuthForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, signUp, signInWithProvider } = useAuth();

  const handleSubmit = async (action: 'signIn' | 'signUp') => {
    if (!email || !password) {
      return;
    }
    
    setIsLoading(true);
    try {
      if (action === 'signIn') {
        await signIn(email, password);
      } else {
        await signUp(email, password);
      }
    } catch (error) {
      // Error handling in auth context
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignIn = async (provider: 'google' | 'twitter' | 'github') => {
    setIsLoading(true);
    try {
      await signInWithProvider(provider);
    } catch (error) {
      // Error handling in auth context
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl">
      <Tabs defaultValue="signin" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-white/10 border border-white/20">
          <TabsTrigger value="signin" className="text-white/70 data-[state=active]:bg-aqua-glow data-[state=active]:text-midnight-indigo font-medium">Sign In</TabsTrigger>
          <TabsTrigger value="signup" className="text-white/70 data-[state=active]:bg-aqua-glow data-[state=active]:text-midnight-indigo font-medium">Sign Up</TabsTrigger>
        </TabsList>
        
        <TabsContent value="signin">
          <CardHeader>
            <CardTitle className="text-2xl font-heading font-bold text-center text-white">Welcome Back</CardTitle>
            <CardDescription className="text-center text-lunar-silver/70">Enter your credentials to access your dream journal</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Input
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus-visible:ring-aqua-glow focus-visible:border-aqua-glow"
              />
            </div>
            <div className="space-y-2">
              <Input
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus-visible:ring-aqua-glow focus-visible:border-aqua-glow"
              />
            </div>
            <Button 
              className="w-full bg-gradient-to-r from-aqua-glow to-dream-violet hover:from-aqua-glow/80 hover:to-dream-violet/80 text-midnight-indigo font-semibold rounded-xl"
              onClick={() => handleSubmit('signIn')}
              disabled={isLoading}
            >
              {isLoading ? 'Signing In...' : 'Sign In with Email'}
            </Button>
            
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <Separator className="bg-white/20" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white/20 px-3 py-1 rounded-full text-white/80 font-medium">Or continue with</span>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-2">
              <Button 
                variant="outline" 
                onClick={() => handleSocialSignIn('google')}
                disabled={isLoading}
                className="flex items-center justify-center gap-2 bg-white/20 border-white/30 hover:bg-white/30 text-white font-medium"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                  <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                    <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
                    <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
                    <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
                    <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
                  </g>
                </svg>
                Google
              </Button>
              <Button 
                variant="outline" 
                onClick={() => handleSocialSignIn('twitter')}
                disabled={isLoading}
                className="flex items-center justify-center gap-2 bg-white/20 border-white/30 hover:bg-white/30 text-white font-medium"
              >
                <Twitter className="h-4 w-4" />
                Twitter
              </Button>
              <Button 
                variant="outline" 
                onClick={() => handleSocialSignIn('github')}
                disabled={isLoading}
                className="flex items-center justify-center gap-2 bg-white/20 border-white/30 hover:bg-white/30 text-white font-medium"
              >
                <Github className="h-4 w-4" />
                GitHub
              </Button>
            </div>
          </CardContent>
        </TabsContent>
        
        <TabsContent value="signup">
          <CardHeader>
            <CardTitle className="text-2xl font-heading font-bold text-center text-white">Create Account</CardTitle>
            <CardDescription className="text-center text-lunar-silver/70">Start tracking your dreams and lucid experiences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Input
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus-visible:ring-aqua-glow focus-visible:border-aqua-glow"
              />
            </div>
            <div className="space-y-2">
              <Input
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus-visible:ring-aqua-glow focus-visible:border-aqua-glow"
              />
            </div>
            <Button 
              className="w-full bg-gradient-to-r from-aqua-glow to-dream-violet hover:from-aqua-glow/80 hover:to-dream-violet/80 text-midnight-indigo font-semibold rounded-xl"
              onClick={() => handleSubmit('signUp')}
              disabled={isLoading}
            >
              {isLoading ? 'Creating Account...' : 'Sign Up with Email'}
            </Button>
            
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <Separator className="bg-white/20" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white/20 px-3 py-1 rounded-full text-white/80 font-medium">Or continue with</span>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-2">
              <Button 
                variant="outline" 
                onClick={() => handleSocialSignIn('google')}
                disabled={isLoading}
                className="flex items-center justify-center gap-2 bg-white/20 border-white/30 hover:bg-white/30 text-white font-medium"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                  <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                    <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
                    <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
                    <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
                    <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
                  </g>
                </svg>
                Google
              </Button>
              <Button 
                variant="outline" 
                onClick={() => handleSocialSignIn('twitter')}
                disabled={isLoading}
                className="flex items-center justify-center gap-2 bg-white/20 border-white/30 hover:bg-white/30 text-white font-medium"
              >
                <Twitter className="h-4 w-4" />
                Twitter
              </Button>
              <Button 
                variant="outline" 
                onClick={() => handleSocialSignIn('github')}
                disabled={isLoading}
                className="flex items-center justify-center gap-2 bg-white/20 border-white/30 hover:bg-white/30 text-white font-medium"
              >
                <Github className="h-4 w-4" />
                GitHub
              </Button>
            </div>
          </CardContent>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default AuthForm;
