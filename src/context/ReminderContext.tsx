
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
          
          // Map to ReminderPreference type
          const reminders: ReminderPreference[] = data.map(reminder => ({
            id: reminder.id,
            user_id: reminder.user_id,
            type: reminder.type,
            frequency: reminder.frequency,
            custom_hours: reminder.custom_hours,
            message: reminder.message,
            enabled: reminder.enabled,
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
            setReminderPreferences(prev => [...prev, newReminder as ReminderPreference]);
          } else if (payload.eventType === 'UPDATE') {
            const updatedReminder = payload.new as any;
            setReminderPreferences(prev => prev.map(reminder => 
              reminder.id === updatedReminder.id ? updatedReminder as ReminderPreference : reminder
            ));
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
      const newReminder = {
        user_id: user.id,
        ...preference
      };
      
      const { data, error } = await supabase
        .from('reminders')
        .insert([newReminder])
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
      const { error } = await supabase
        .from('reminders')
        .update(updates)
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
