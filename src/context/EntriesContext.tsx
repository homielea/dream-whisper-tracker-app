
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Entry, DreamEntry, EmotionEntry, Pattern } from '@/types';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from './AuthContext';

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
          // This will be implemented when Supabase is connected
          // For now, we'll use dummy data
          setDreamEntries([
            {
              id: '1',
              user_id: user.id,
              created_at: new Date().toISOString(),
              entry_type: 'dream',
              text: 'I was flying over a purple landscape',
              ai_summary: 'A flying dream with purple scenery',
              tags: ['flying', 'purple', 'landscape'],
              insights: { clarity: 'high', lucidity: 'partial' }
            }
          ]);
          
          setEmotionEntries([
            {
              id: '1',
              user_id: user.id,
              created_at: new Date().toISOString(),
              entry_type: 'emotion',
              mood: 'calm',
              text: 'Feeling relaxed today',
              tags: ['calm', 'relaxed']
            }
          ]);
          
          setPatterns({
            id: '1',
            user_id: user.id,
            top_tags: ['flying', 'purple', 'calm'],
            insights: { 
              correlations: {
                'calm': ['flying', 'clarity'],
                'stress': ['falling', 'chase']
              }
            },
            updated_at: new Date().toISOString()
          });
        } catch (error) {
          console.error('Error fetching entries:', error);
          toast({
            variant: "destructive",
            title: "Failed to load entries",
            description: "There was a problem loading your dream data.",
          });
        } finally {
          setLoading(false);
        }
      }
    };

    fetchEntries();
  }, [user, toast]);

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
      // Placeholder for Supabase entry creation
      toast({
        title: "Please connect Supabase",
        description: "Saving entries requires Supabase connection",
      });
      
      // In a real scenario, we would submit to Supabase and then add the returned entry
      const mockEntry: DreamEntry = {
        id: `temp-${Date.now()}`,
        user_id: user.id,
        created_at: new Date().toISOString(),
        entry_type: 'dream',
        text,
        voice_url: voiceUrl,
        ai_summary: 'Processing...',
        tags: [],
        insights: {}
      };
      
      setDreamEntries(prev => [mockEntry, ...prev]);
      
      toast({
        title: "Dream Saved",
        description: "Your dream has been recorded.",
      });
    } catch (error) {
      console.error('Error adding dream entry:', error);
      toast({
        variant: "destructive",
        title: "Failed to Save Dream",
        description: "There was a problem saving your dream entry.",
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
      // Placeholder for Supabase entry creation
      toast({
        title: "Please connect Supabase",
        description: "Saving entries requires Supabase connection",
      });
      
      // In a real scenario, we would submit to Supabase and then add the returned entry
      const mockEntry: EmotionEntry = {
        id: `temp-${Date.now()}`,
        user_id: user.id,
        created_at: new Date().toISOString(),
        entry_type: 'emotion',
        mood,
        text,
        tags
      };
      
      setEmotionEntries(prev => [mockEntry, ...prev]);
      
      toast({
        title: "Mood Saved",
        description: "Your mood has been recorded.",
      });
    } catch (error) {
      console.error('Error adding emotion entry:', error);
      toast({
        variant: "destructive",
        title: "Failed to Save Mood",
        description: "There was a problem saving your mood entry.",
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
