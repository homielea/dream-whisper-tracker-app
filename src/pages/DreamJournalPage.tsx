
import React from 'react';
import { useEntries } from '@/context/EntriesContext';
import PageContainer from '@/components/layout/PageContainer';
import DreamEntryForm from '@/components/dream-journal/DreamEntryForm';
import DreamEntryCard from '@/components/dream-journal/DreamEntryCard';

const DreamJournalPage: React.FC = () => {
  const { dreamEntries, loading } = useEntries();

  return (
    <PageContainer 
      title="Dream Journal"
      description="Record and track your dreams over time"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <DreamEntryForm />
        </div>
        <div className="md:col-span-2">
          <h2 className="text-xl font-bold mb-4">Your Dreams</h2>
          
          {loading ? (
            <div className="text-center p-8">
              <p className="text-muted-foreground">Loading dreams...</p>
            </div>
          ) : dreamEntries.length === 0 ? (
            <div className="text-center bg-muted/20 rounded-lg p-8">
              <p className="text-muted-foreground">No dreams recorded yet</p>
              <p className="text-sm mt-2">Record your first dream to get started</p>
            </div>
          ) : (
            <div className="space-y-4">
              {dreamEntries.map((dream) => (
                <DreamEntryCard key={dream.id} dream={dream} />
              ))}
            </div>
          )}
        </div>
      </div>
    </PageContainer>
  );
};

export default DreamJournalPage;
