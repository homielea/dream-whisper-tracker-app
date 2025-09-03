
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import PageContainer from '@/components/layout/PageContainer';
import DreamEntryForm from '@/components/dream-journal/DreamEntryForm';
import MoodEntryForm from '@/components/mood-tracking/MoodEntryForm';
import StatCard from '@/components/dashboard/StatCard';
import RecentEntriesList from '@/components/dashboard/RecentEntriesList';
import TopTagsChart from '@/components/dashboard/TopTagsChart';
import { Moon, Star, CalendarDays, Sparkles } from 'lucide-react';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  
  // This would come from user data in a real app
  const streakDays = 5;
  const dreamsRecorded = 12;
  const lucidDreams = 3;

  return (
    <PageContainer 
      title={`Welcome back${user?.email ? ', ' + user.email.split('@')[0] : ''}`}
      description="Where night meets clarity - continue your lucid dreaming journey"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard 
          title="Current Streak" 
          value={`${streakDays} days`}
          description="Keep recording dreams to maintain your streak"
          icon={<CalendarDays className="h-4 w-4 text-dream-violet" />}
        />
        <StatCard 
          title="Dreams Recorded" 
          value={dreamsRecorded}
          description="Your dream journal is growing"
          icon={<Moon className="h-4 w-4 text-aqua-glow" />}
        />
        <StatCard 
          title="Lucid Dreams" 
          value={lucidDreams}
          description="Dreams where you achieved awareness"
          icon={<Sparkles className="h-4 w-4 text-dream-violet" />}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold mb-4">Record Today's Dream</h2>
            <DreamEntryForm />
          </div>
          <div>
            <h2 className="text-xl font-bold mb-4">How Are You Feeling?</h2>
            <MoodEntryForm />
          </div>
        </div>
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
            <RecentEntriesList />
          </div>
          <div>
            <h2 className="text-xl font-bold mb-4">Dream Themes</h2>
            <TopTagsChart />
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default DashboardPage;
