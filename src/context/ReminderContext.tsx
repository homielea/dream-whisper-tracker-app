
import React, { createContext, useContext, useState, useEffect } from 'react';
import { ReminderPreference } from '@/types';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from './AuthContext';

interface ReminderContextType {
  reminderPreferences: ReminderPreference[];
  loading: boolean;
  addReminderPreference: (preference: Omit<ReminderPreference, 'id' | 'user_id'>) => Promise<void>;
  updateReminderPreference: (id: string, updates: Partial<ReminderPreference>) => Promise<void>;
  deleteReminderPreference: (id: string) => Promise<void>;
}

const ReminderContext = createContext<ReminderContextType | undefined>(undefined);

export const ReminderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [reminderPreferences, setReminderPreferences] = useState<ReminderPreference[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    // Load reminder preferences when user is authenticated
    const fetchReminderPreferences = async () => {
      if (user) {
        setLoading(true);
        try {
          // This will be implemented when Supabase is connected
          // For now, we'll use dummy data
          setReminderPreferences([
            {
              id: '1',
              user_id: user.id,
              type: 'reality_check',
              frequency: 'hourly',
              message: 'Are you dreaming right now?',
              enabled: true,
              last_sent: new Date(Date.now() - 3600000).toISOString() // 1 hour ago
            },
            {
              id: '2',
              user_id: user.id,
              type: 'mood_check',
              frequency: 'daily',
              message: 'How are you feeling today?',
              enabled: true,
              last_sent: new Date(Date.now() - 86400000).toISOString() // 1 day ago
            }
          ]);
        } catch (error) {
          console.error('Error fetching reminder preferences:', error);
          toast({
            variant: "destructive",
            title: "Failed to load reminders",
            description: "There was a problem loading your reminder settings.",
          });
        } finally {
          setLoading(false);
        }
      }
    };

    fetchReminderPreferences();
  }, [user, toast]);

  const addReminderPreference = async (preference: Omit<ReminderPreference, 'id' | 'user_id'>) => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Authentication Required",
        description: "Please sign in to add a reminder.",
      });
      return;
    }

    try {
      // Placeholder for Supabase reminder creation
      toast({
        title: "Please connect Supabase",
        description: "Saving reminders requires Supabase connection",
      });
      
      // In a real scenario, we would submit to Supabase and then add the returned reminder
      const mockPreference: ReminderPreference = {
        id: `temp-${Date.now()}`,
        user_id: user.id,
        ...preference
      };
      
      setReminderPreferences(prev => [...prev, mockPreference]);
      
      toast({
        title: "Reminder Added",
        description: `Your ${preference.type} reminder has been set.`,
      });
    } catch (error) {
      console.error('Error adding reminder preference:', error);
      toast({
        variant: "destructive",
        title: "Failed to Add Reminder",
        description: "There was a problem saving your reminder.",
      });
    }
  };

  const updateReminderPreference = async (id: string, updates: Partial<ReminderPreference>) => {
    try {
      // Placeholder for Supabase reminder update
      toast({
        title: "Please connect Supabase",
        description: "Updating reminders requires Supabase connection",
      });
      
      // Update local state
      setReminderPreferences(prev => 
        prev.map(pref => pref.id === id ? { ...pref, ...updates } : pref)
      );
      
      toast({
        title: "Reminder Updated",
        description: "Your reminder has been updated.",
      });
    } catch (error) {
      console.error('Error updating reminder preference:', error);
      toast({
        variant: "destructive",
        title: "Failed to Update Reminder",
        description: "There was a problem updating your reminder.",
      });
    }
  };

  const deleteReminderPreference = async (id: string) => {
    try {
      // Placeholder for Supabase reminder deletion
      toast({
        title: "Please connect Supabase",
        description: "Deleting reminders requires Supabase connection",
      });
      
      // Update local state
      setReminderPreferences(prev => prev.filter(pref => pref.id !== id));
      
      toast({
        title: "Reminder Deleted",
        description: "Your reminder has been deleted.",
      });
    } catch (error) {
      console.error('Error deleting reminder preference:', error);
      toast({
        variant: "destructive",
        title: "Failed to Delete Reminder",
        description: "There was a problem deleting your reminder.",
      });
    }
  };

  return (
    <ReminderContext.Provider value={{ 
      reminderPreferences, 
      loading,
      addReminderPreference,
      updateReminderPreference,
      deleteReminderPreference
    }}>
      {children}
    </ReminderContext.Provider>
  );
};

export const useReminders = () => {
  const context = useContext(ReminderContext);
  if (context === undefined) {
    throw new Error('useReminders must be used within a ReminderProvider');
  }
  return context;
};
