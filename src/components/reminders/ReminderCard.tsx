
import React from 'react';
import { ReminderPreference } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { useReminders } from '@/context/ReminderContext';
import { formatRelativeTime } from '@/lib/helpers';
import { Bell, Clock, Trash2 } from 'lucide-react';

interface ReminderCardProps {
  reminder: ReminderPreference;
}

const ReminderCard: React.FC<ReminderCardProps> = ({ reminder }) => {
  const { updateReminderPreference, deleteReminderPreference } = useReminders();

  const handleToggleEnabled = () => {
    updateReminderPreference(reminder.id, { enabled: !reminder.enabled });
  };

  const handleDelete = () => {
    deleteReminderPreference(reminder.id);
  };

  const getFrequencyText = (frequency: string): string => {
    switch (frequency) {
      case 'hourly': return 'Every hour';
      case 'daily': return 'Once per day';
      case 'custom': return 'Custom schedule';
      default: return frequency;
    }
  };

  const getTypeIcon = () => {
    return reminder.type === 'reality_check' 
      ? <Bell className="h-4 w-4 mr-2 text-dream" />
      : <Clock className="h-4 w-4 mr-2 text-dream-calm" />;
  };

  return (
    <Card className={`w-full shadow-sm hover:shadow transition-shadow border ${reminder.enabled ? 'border-dream-light' : 'border-muted opacity-70'}`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-medium flex items-center">
            {getTypeIcon()}
            <span className="capitalize">{reminder.type.replace('_', ' ')}</span>
          </CardTitle>
          <Switch 
            checked={reminder.enabled}
            onCheckedChange={handleToggleEnabled}
          />
        </div>
        <CardDescription className="text-xs">
          {getFrequencyText(reminder.frequency)}
          {reminder.last_sent && (
            <> • Last sent {formatRelativeTime(reminder.last_sent)}</>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="py-2">
        <p className="text-sm">{reminder.message}</p>
      </CardContent>
      <CardFooter className="pt-2 flex justify-end border-t">
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-destructive hover:text-destructive hover:bg-destructive/10"
          onClick={handleDelete}
        >
          <Trash2 className="h-4 w-4 mr-1" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ReminderCard;
