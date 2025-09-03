
import React from 'react';
import { useReminders } from '@/context/ReminderContext';
import PageContainer from '@/components/layout/PageContainer';
import ReminderForm from '@/components/reminders/ReminderForm';
import ReminderCard from '@/components/reminders/ReminderCard';

const RemindersPage: React.FC = () => {
  const { reminderPreferences, loading } = useReminders();

  return (
    <PageContainer 
      title="Awareness Reminders"
      description="Build reality check habits and mindfulness throughout your day"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <ReminderForm />
        </div>
        <div className="md:col-span-2">
          <h2 className="text-xl font-bold mb-4">Your Reminders</h2>
          
          {loading ? (
            <div className="text-center p-8">
              <p className="text-muted-foreground">Loading reminders...</p>
            </div>
          ) : reminderPreferences.length === 0 ? (
            <div className="text-center bg-muted/20 rounded-lg p-8">
              <p className="text-muted-foreground">No reminders set up yet</p>
              <p className="text-sm mt-2">Set up reminders to improve your dream awareness</p>
            </div>
          ) : (
            <div className="space-y-4">
              {reminderPreferences.map((reminder) => (
                <ReminderCard key={reminder.id} reminder={reminder} />
              ))}
            </div>
          )}
        </div>
      </div>
    </PageContainer>
  );
};

export default RemindersPage;
