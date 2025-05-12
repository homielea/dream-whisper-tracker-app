
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useEntries } from '@/context/EntriesContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Save, Smile, Meh, Frown } from 'lucide-react';

type MoodType = 'happy' | 'neutral' | 'sad' | 'custom';

const MoodEntryForm: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);
  const [customMood, setCustomMood] = useState('');
  const [notes, setNotes] = useState('');
  const { addEmotionEntry } = useEntries();

  const handleMoodSelect = (mood: MoodType) => {
    setSelectedMood(mood);
    if (mood !== 'custom') {
      setCustomMood('');
    }
  };

  const handleSubmit = async () => {
    const moodToSubmit = selectedMood === 'custom' ? customMood : selectedMood;
    
    if (moodToSubmit) {
      await addEmotionEntry(moodToSubmit, notes);
      setSelectedMood(null);
      setCustomMood('');
      setNotes('');
    }
  };

  const getMoodIcon = (mood: MoodType) => {
    switch (mood) {
      case 'happy': return <Smile className="h-6 w-6" />;
      case 'neutral': return <Meh className="h-6 w-6" />;
      case 'sad': return <Frown className="h-6 w-6" />;
      default: return null;
    }
  };

  return (
    <Card className="w-full shadow-md border border-dream-light">
      <CardHeader className="bg-dream-blue/10">
        <CardTitle className="text-xl text-dream-dark">Track Your Mood</CardTitle>
        <CardDescription>Record how you're feeling to find correlations with your dreams</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 pt-6">
        <div className="flex justify-center space-x-4">
          {(['happy', 'neutral', 'sad'] as MoodType[]).map((mood) => (
            <Button
              key={mood}
              type="button"
              variant={selectedMood === mood ? "default" : "outline"}
              className={`p-6 ${selectedMood === mood ? 'bg-dream hover:bg-dream-dark' : ''}`}
              onClick={() => handleMoodSelect(mood)}
            >
              {getMoodIcon(mood)}
            </Button>
          ))}
          <Button
            type="button"
            variant={selectedMood === 'custom' ? "default" : "outline"}
            className={`p-6 ${selectedMood === 'custom' ? 'bg-dream hover:bg-dream-dark' : ''}`}
            onClick={() => handleMoodSelect('custom')}
          >
            Custom
          </Button>
        </div>
        
        {selectedMood === 'custom' && (
          <Input
            placeholder="How are you feeling?"
            value={customMood}
            onChange={(e) => setCustomMood(e.target.value)}
            className="mt-2"
          />
        )}
        
        <Textarea
          placeholder="Notes about your mood (optional)"
          className="min-h-24 resize-none"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </CardContent>
      <CardFooter className="flex justify-end border-t bg-muted/20 py-3">
        <Button 
          onClick={handleSubmit}
          className="bg-dream hover:bg-dream-dark"
          disabled={!selectedMood || (selectedMood === 'custom' && !customMood.trim())}
        >
          <Save className="h-4 w-4 mr-2" />
          Save Mood
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MoodEntryForm;
