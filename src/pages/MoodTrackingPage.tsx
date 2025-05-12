
import React from 'react';
import { useEntries } from '@/context/EntriesContext';
import PageContainer from '@/components/layout/PageContainer';
import MoodEntryForm from '@/components/mood-tracking/MoodEntryForm';
import MoodEntryCard from '@/components/mood-tracking/MoodEntryCard';
import TopTagsChart from '@/components/dashboard/TopTagsChart';

const MoodTrackingPage: React.FC = () => {
  const { emotionEntries, loading } = useEntries();

  return (
    <PageContainer 
      title="Mood Tracking"
      description="Track your moods to find correlations with your dreams"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-6">
          <MoodEntryForm />
          <TopTagsChart />
        </div>
        <div className="md:col-span-2">
          <h2 className="text-xl font-bold mb-4">Your Mood Log</h2>
          
          {loading ? (
            <div className="text-center p-8">
              <p className="text-muted-foreground">Loading mood data...</p>
            </div>
          ) : emotionEntries.length === 0 ? (
            <div className="text-center bg-muted/20 rounded-lg p-8">
              <p className="text-muted-foreground">No moods recorded yet</p>
              <p className="text-sm mt-2">Track your moods to see patterns with your dreams</p>
            </div>
          ) : (
            <div className="space-y-4">
              {emotionEntries.map((emotion) => (
                <MoodEntryCard key={emotion.id} emotion={emotion} />
              ))}
            </div>
          )}
        </div>
      </div>
    </PageContainer>
  );
};

export default MoodTrackingPage;
