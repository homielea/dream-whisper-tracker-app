
import React from 'react';
import PageContainer from '@/components/layout/PageContainer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const SettingsPage: React.FC = () => {
  const { toast } = useToast();
  
  const handleSupabaseConnect = () => {
    toast({
      title: "Supabase Connection Required",
      description: "Please connect your project to Supabase using the green button in the top-right corner.",
    });
  };

  return (
    <PageContainer 
      title="Settings"
      description="Configure your dream tracking application"
    >
      <div className="max-w-2xl">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Supabase Integration</CardTitle>
            <CardDescription>Connect to Supabase to enable full functionality</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              This app requires a Supabase connection to store your dreams, mood entries, and reminders.
            </p>
            <Button onClick={handleSupabaseConnect}>
              Set Up Database Connection
            </Button>
          </CardContent>
        </Card>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>About MILD Dream Tracking</CardTitle>
            <CardDescription>Understanding the MILD technique for lucid dreaming</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-2">
              MILD (Mnemonic Induction of Lucid Dreaming) is a technique developed by Dr. Stephen LaBerge that involves:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4 mb-4">
              <li>Setting an intention to remember dreams</li>
              <li>Reality checks throughout the day</li>
              <li>Telling yourself "I will be aware that I'm dreaming" before sleep</li>
              <li>Visualizing becoming lucid in a dream</li>
            </ul>
            <p>
              This app helps you implement the MILD technique by providing a dream journal, reminders for reality checks, and tools to spot patterns in your dreams.
            </p>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
};

export default SettingsPage;
