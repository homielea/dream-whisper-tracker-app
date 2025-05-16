import React, { createContext, useContext, useState, useEffect } from 'react';
import { ReminderPreference } from '@/types';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from './AuthContext';
import { supabase } from '@/integrations/supabase/client';

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
          // Fetch reminders
          const { data, error } = await supabase
            .from('reminders')
            .select('*')
            .eq('user_id', user.id);
          
          if (error) throw error;
          
          // Map database schema to our app's ReminderPreference type
          const reminders: ReminderPreference[] = data.map(reminder => ({
            id: reminder.id,
            user_id: reminder.user_id,
            type: reminder.type as 'reality_check' | 'mood_check',
            frequency: 'hourly', // Default value, will be overridden based on frequency number
            days_active: reminder.days_active,
            start_time: reminder.start_time,
            end_time: reminder.end_time,
            // Map numeric frequency to string format our app uses
            ...(reminder.frequency === 1 ? { frequency: 'hourly' as const } : 
               reminder.frequency === 24 ? { frequency: 'daily' as const } : 
               { frequency: 'custom' as const }),
            // These fields might need defaults or mapping
            message: reminder.type === 'reality_check' ? 
              'Are you dreaming right now?' : 'How are you feeling right now?',
            enabled: true, // Default to enabled
            last_sent: reminder.last_sent
          }));
          
          setReminderPreferences(reminders);
          
        } catch (error: any) {
          console.error('Error fetching reminder preferences:', error);
          toast({
            variant: "destructive",
            title: "Failed to load reminders",
            description: error.message || "There was a problem loading your reminder settings.",
          });
        } finally {
          setLoading(false);
        }
      } else {
        // No user, reset state
        setReminderPreferences([]);
        setLoading(false);
      }
    };

    fetchReminderPreferences();
  }, [user, toast]);

  // Set up real-time subscription for reminders
  useEffect(() => {
    if (!user) return;
    
    const channel = supabase
      .channel('reminders-changes')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'reminders',
          filter: `user_id=eq.${user.id}`
        }, 
        (payload) => {
          if (payload.eventType === 'INSERT') {
            const newReminder = payload.new as any;
            const mappedReminder: ReminderPreference = {
              id: newReminder.id,
              user_id: newReminder.user_id,
              type: newReminder.type as 'reality_check' | 'mood_check',
              frequency: newReminder.frequency === 1 ? 'hourly' : 
                         newReminder.frequency === 24 ? 'daily' : 'custom',
              days_active: newReminder.days_active,
              start_time: newReminder.start_time,
              end_time: newReminder.end_time,
              message: newReminder.type === 'reality_check' ? 
                'Are you dreaming right now?' : 'How are you feeling right now?',
              enabled: true,
              last_sent: newReminder.last_sent
            };
            setReminderPreferences(prev => [...prev, mappedReminder]);
          } else if (payload.eventType === 'UPDATE') {
            const updatedReminder = payload.new as any;
            setReminderPreferences(prev => prev.map(reminder => {
              if (reminder.id === updatedReminder.id) {
                return {
                  ...reminder,
                  type: updatedReminder.type as 'reality_check' | 'mood_check',
                  frequency: updatedReminder.frequency === 1 ? 'hourly' : 
                             updatedReminder.frequency === 24 ? 'daily' : 'custom',
                  days_active: updatedReminder.days_active,
                  start_time: updatedReminder.start_time,
                  end_time: updatedReminder.end_time,
                  last_sent: updatedReminder.last_sent
                };
              }
              return reminder;
            }));
          } else if (payload.eventType === 'DELETE') {
            const oldReminder = payload.old as any;
            setReminderPreferences(prev => prev.filter(reminder => reminder.id !== oldReminder.id));
          }
        }
      )
      .subscribe();
    
    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

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
      // Convert from our app's format to database format
      const frequencyValue = preference.frequency === 'hourly' ? 1 : 
                            preference.frequency === 'daily' ? 24 : 1; // Default to 1 for custom
      
      const dbReminder = {
        user_id: user.id,
        type: preference.type,
        frequency: frequencyValue,
        days_active: [0, 1, 2, 3, 4, 5, 6], // Default to all days
        start_time: '09:00:00', // Default start time
        end_time: '21:00:00',   // Default end time
      };
      
      const { data, error } = await supabase
        .from('reminders')
        .insert([dbReminder])
        .select();
      
      if (error) throw error;
      
      toast({
        title: "Reminder Added",
        description: `Your ${preference.type} reminder has been set.`,
      });

      // Reminder will be added via real-time subscription
      
    } catch (error: any) {
      console.error('Error adding reminder preference:', error);
      toast({
        variant: "destructive",
        title: "Failed to Add Reminder",
        description: error.message || "There was a problem saving your reminder.",
      });
    }
  };

  const updateReminderPreference = async (id: string, updates: Partial<ReminderPreference>) => {
    try {
      // Convert from our app's format to database format
      const dbUpdates: any = {};
      
      if (updates.frequency) {
        dbUpdates.frequency = updates.frequency === 'hourly' ? 1 : 
                              updates.frequency === 'daily' ? 24 : 1;
      }
      
      if (updates.type) {
        dbUpdates.type = updates.type;
      }
      
      // Other fields would need to be mapped here if needed
      
      const { error } = await supabase
        .from('reminders')
        .update(dbUpdates)
        .eq('id', id);
      
      if (error) throw error;
      
      toast({
        title: "Reminder Updated",
        description: "Your reminder has been updated.",
      });

      // Reminder will be updated via real-time subscription
      
    } catch (error: any) {
      console.error('Error updating reminder preference:', error);
      toast({
        variant: "destructive",
        title: "Failed to Update Reminder",
        description: error.message || "There was a problem updating your reminder.",
      });
    }
  };

  const deleteReminderPreference = async (id: string) => {
    try {
      const { error } = await supabase
        .from('reminders')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      toast({
        title: "Reminder Deleted",
        description: "Your reminder has been deleted.",
      });

      // Reminder will be deleted via real-time subscription
      
    } catch (error: any) {
      console.error('Error deleting reminder preference:', error);
      toast({
        variant: "destructive",
        title: "Failed to Delete Reminder",
        description: error.message || "There was a problem deleting your reminder.",
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
