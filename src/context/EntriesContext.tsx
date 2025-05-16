
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Entry, DreamEntry, EmotionEntry, Pattern } from '@/types';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from './AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface EntriesContextType {
  dreamEntries: DreamEntry[];
  emotionEntries: EmotionEntry[];
  patterns: Pattern | null;
  loading: boolean;
  addDreamEntry: (text: string, voiceUrl?: string) => Promise<void>;
  addEmotionEntry: (mood: string, text?: string, tags?: string[]) => Promise<void>;
  getRecentEntries: () => Entry[];
  getTopTags: () => string[];
}

const EntriesContext = createContext<EntriesContextType | undefined>(undefined);

export const EntriesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [dreamEntries, setDreamEntries] = useState<DreamEntry[]>([]);
  const [emotionEntries, setEmotionEntries] = useState<EmotionEntry[]>([]);
  const [patterns, setPatterns] = useState<Pattern | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    // Load entries when user is authenticated
    const fetchEntries = async () => {
      if (user) {
        setLoading(true);
        try {
          // Fetch dream entries
          const { data: dreamData, error: dreamError } = await supabase
            .from('entries')
            .select('*')
            .eq('user_id', user.id)
            .eq('entry_type', 'dream');
          
          if (dreamError) throw dreamError;
          
          // Type assertion to ensure proper typing
          const typedDreamEntries = dreamData.map(entry => ({
            ...entry,
            entry_type: 'dream' as const
          })) as DreamEntry[];
          
          setDreamEntries(typedDreamEntries);
          
          // Fetch emotion entries
          const { data: emotionData, error: emotionError } = await supabase
            .from('entries')
            .select('*')
            .eq('user_id', user.id)
            .eq('entry_type', 'emotion');
          
          if (emotionError) throw emotionError;
          
          // Type assertion to ensure proper typing including mood field
          const typedEmotionEntries = emotionData.map(entry => ({
            ...entry,
            entry_type: 'emotion' as const,
            mood: entry.mood || '' // Ensure mood field exists
          })) as EmotionEntry[];
          
          setEmotionEntries(typedEmotionEntries);
          
          // Fetch patterns
          const { data: patternData, error: patternError } = await supabase
            .from('patterns')
            .select('*')
            .eq('user_id', user.id)
            .single();
          
          if (patternError && patternError.code !== 'PGRST116') {
            // PGRST116 is code for no rows returned, which is expected if no patterns exist yet
            throw patternError;
          }
          
          if (patternData) {
            // Ensure patternData has insights field
            const typedPattern = {
              ...patternData,
              insights: patternData.insights || patternData.correlations || {}
            } as Pattern;
            
            setPatterns(typedPattern);
          }
        } catch (error: any) {
          console.error('Error fetching entries:', error);
          toast({
            variant: "destructive",
            title: "Failed to load entries",
            description: error.message || "There was a problem loading your dream data.",
          });
        } finally {
          setLoading(false);
        }
      } else {
        // No user, reset state
        setDreamEntries([]);
        setEmotionEntries([]);
        setPatterns(null);
        setLoading(false);
      }
    };

    fetchEntries();
  }, [user, toast]);

  // Set up real-time subscription for new entries
  useEffect(() => {
    if (!user) return;
    
    const channel = supabase
      .channel('entries-changes')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'entries',
          filter: `user_id=eq.${user.id}`
        }, 
        (payload) => {
          const newEntry = payload.new as any;
          
          if (payload.eventType === 'INSERT') {
            if (newEntry.entry_type === 'dream') {
              setDreamEntries(prev => [{
                ...newEntry,
                entry_type: 'dream' as const
              } as DreamEntry, ...prev]);
            } else if (newEntry.entry_type === 'emotion') {
              setEmotionEntries(prev => [{
                ...newEntry,
                entry_type: 'emotion' as const,
                mood: newEntry.mood || ''
              } as EmotionEntry, ...prev]);
            }
          } else if (payload.eventType === 'UPDATE') {
            if (newEntry.entry_type === 'dream') {
              setDreamEntries(prev => prev.map(entry => 
                entry.id === newEntry.id ? {
                  ...newEntry,
                  entry_type: 'dream' as const
                } as DreamEntry : entry
              ));
            } else if (newEntry.entry_type === 'emotion') {
              setEmotionEntries(prev => prev.map(entry => 
                entry.id === newEntry.id ? {
                  ...newEntry,
                  entry_type: 'emotion' as const,
                  mood: newEntry.mood || ''
                } as EmotionEntry : entry
              ));
            }
          } else if (payload.eventType === 'DELETE') {
            const oldEntry = payload.old as any;
            if (oldEntry.entry_type === 'dream') {
              setDreamEntries(prev => prev.filter(entry => entry.id !== oldEntry.id));
            } else if (oldEntry.entry_type === 'emotion') {
              setEmotionEntries(prev => prev.filter(entry => entry.id !== oldEntry.id));
            }
          }
        }
      )
      .subscribe();
    
    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const addDreamEntry = async (text: string, voiceUrl?: string) => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Authentication Required",
        description: "Please sign in to add a dream entry.",
      });
      return;
    }

    try {
      const newEntry = {
        user_id: user.id,
        entry_type: 'dream',
        text,
        voice_url: voiceUrl,
      };
      
      const { data, error } = await supabase
        .from('entries')
        .insert([newEntry])
        .select();
      
      if (error) throw error;
      
      toast({
        title: "Dream Saved",
        description: "Your dream has been recorded.",
      });

      // Entry will be added via real-time subscription
      
    } catch (error: any) {
      console.error('Error adding dream entry:', error);
      toast({
        variant: "destructive",
        title: "Failed to Save Dream",
        description: error.message || "There was a problem saving your dream entry.",
      });
    }
  };

  const addEmotionEntry = async (mood: string, text?: string, tags?: string[]) => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Authentication Required",
        description: "Please sign in to add a mood entry.",
      });
      return;
    }

    try {
      const newEntry = {
        user_id: user.id,
        entry_type: 'emotion',
        mood,
        text,
        tags
      };
      
      const { data, error } = await supabase
        .from('entries')
        .insert([newEntry])
        .select();
      
      if (error) throw error;
      
      toast({
        title: "Mood Saved",
        description: "Your mood has been recorded.",
      });

      // Entry will be added via real-time subscription
      
    } catch (error: any) {
      console.error('Error adding emotion entry:', error);
      toast({
        variant: "destructive",
        title: "Failed to Save Mood",
        description: error.message || "There was a problem saving your mood entry.",
      });
    }
  };

  const getRecentEntries = (): Entry[] => {
    // Combine dream and emotion entries, sort by date
    const allEntries: Entry[] = [...dreamEntries, ...emotionEntries];
    return allEntries.sort((a, b) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    ).slice(0, 5); // Return the 5 most recent
  };

  const getTopTags = (): string[] => {
    return patterns?.top_tags || [];
  };

  return (
    <EntriesContext.Provider value={{ 
      dreamEntries, 
      emotionEntries, 
      patterns, 
      loading, 
      addDreamEntry, 
      addEmotionEntry,
      getRecentEntries,
      getTopTags
    }}>
      {children}
    </EntriesContext.Provider>
  );
};

export const useEntries = () => {
  const context = useContext(EntriesContext);
  if (context === undefined) {
    throw new Error('useEntries must be used within an EntriesProvider');
  }
  return context;
};
