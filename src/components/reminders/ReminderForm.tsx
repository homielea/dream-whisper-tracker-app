
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useReminders } from '@/context/ReminderContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Bell, Clock } from 'lucide-react';

type ReminderType = 'reality_check' | 'mood_check';
type FrequencyType = 'hourly' | 'daily' | 'custom';

const ReminderForm: React.FC = () => {
  const [reminderType, setReminderType] = useState<ReminderType>('reality_check');
  const [frequency, setFrequency] = useState<FrequencyType>('hourly');
  const [message, setMessage] = useState('');
  const [enabled, setEnabled] = useState(true);
  const { addReminderPreference } = useReminders();

  const getDefaultMessage = (type: ReminderType): string => {
    return type === 'reality_check' 
      ? 'Are you dreaming right now?' 
      : 'How are you feeling right now?';
  };

  const handleReminderTypeChange = (type: ReminderType) => {
    setReminderType(type);
    setMessage(getDefaultMessage(type));
  };

  const handleSubmit = async () => {
    const finalMessage = message.trim() || getDefaultMessage(reminderType);
    
    await addReminderPreference({
      type: reminderType,
      frequency,
      message: finalMessage,
      enabled,
    });
    
    // Reset form
    setReminderType('reality_check');
    setFrequency('hourly');
    setMessage('');
    setEnabled(true);
  };

  return (
    <Card className="w-full shadow-md border border-dream-light">
      <CardHeader className="bg-dream-light/30">
        <CardTitle className="text-xl text-dream-dark flex items-center">
          <Bell className="h-5 w-5 mr-2" />
          Set a New Reminder
        </CardTitle>
        <CardDescription>Create reminders for reality checks or mood tracking</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        <div className="space-y-2">
          <Label>Reminder Type</Label>
          <RadioGroup 
            defaultValue="reality_check" 
            value={reminderType}
            onValueChange={(value) => handleReminderTypeChange(value as ReminderType)}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="reality_check" id="reality_check" />
              <Label htmlFor="reality_check">Reality Check</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="mood_check" id="mood_check" />
              <Label htmlFor="mood_check">Mood Check</Label>
            </div>
          </RadioGroup>
        </div>
        
        <div className="space-y-2">
          <Label>Frequency</Label>
          <RadioGroup 
            defaultValue="hourly"
            value={frequency}
            onValueChange={(value) => setFrequency(value as FrequencyType)}
            className="flex flex-col space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="hourly" id="hourly" />
              <Label htmlFor="hourly">Hourly</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="daily" id="daily" />
              <Label htmlFor="daily">Daily</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="custom" id="custom" disabled />
              <Label htmlFor="custom" className="opacity-50">Custom (Coming soon)</Label>
            </div>
          </RadioGroup>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="message">Reminder Message</Label>
          <Input
            id="message"
            placeholder={getDefaultMessage(reminderType)}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <Label htmlFor="enabled">Enable Reminder</Label>
          <Switch 
            id="enabled" 
            checked={enabled}
            onCheckedChange={setEnabled}
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-end border-t bg-muted/20 py-3">
        <Button 
          onClick={handleSubmit}
          className="bg-dream hover:bg-dream-dark"
        >
          <Clock className="h-4 w-4 mr-2" />
          Create Reminder
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ReminderForm;
