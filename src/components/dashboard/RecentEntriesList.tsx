
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useEntries } from '@/context/EntriesContext';
import DreamEntryCard from '@/components/dream-journal/DreamEntryCard';
import MoodEntryCard from '@/components/mood-tracking/MoodEntryCard';

const RecentEntriesList: React.FC = () => {
  const { getRecentEntries } = useEntries();
  const recentEntries = getRecentEntries();
  
  return (
    <ScrollArea className="h-[400px] pr-4">
      <div className="space-y-4">
        {recentEntries.length === 0 ? (
          <div className="text-center text-muted-foreground p-8">
            <p>No entries yet. Start by recording a dream or your mood!</p>
          </div>
        ) : (
          recentEntries.map((entry) => (
            <div key={entry.id}>
              {entry.entry_type === 'dream' ? (
                <DreamEntryCard dream={entry} />
              ) : (
                <MoodEntryCard emotion={entry} />
              )}
            </div>
          ))
        )}
      </div>
    </ScrollArea>
  );
};

export default RecentEntriesList;
