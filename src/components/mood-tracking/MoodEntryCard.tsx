
import React from 'react';
import { EmotionEntry } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDate, formatTime, formatRelativeTime } from '@/lib/helpers';
import { Heart, Smile, Meh, Frown } from 'lucide-react';

interface MoodEntryCardProps {
  emotion: EmotionEntry;
}

const MoodEntryCard: React.FC<MoodEntryCardProps> = ({ emotion }) => {
  const getMoodIcon = () => {
    switch (emotion.mood.toLowerCase()) {
      case 'happy':
      case 'good':
      case 'great':
      case 'excellent':
        return <Smile className="h-4 w-4 text-green-500" />;
      case 'neutral':
      case 'okay':
      case 'ok':
      case 'fine':
        return <Meh className="h-4 w-4 text-amber-500" />;
      case 'sad':
      case 'bad':
      case 'terrible':
      case 'awful':
        return <Frown className="h-4 w-4 text-red-500" />;
      default:
        return <Heart className="h-4 w-4 text-dream" />;
    }
  };

  return (
    <Card className="w-full shadow-sm hover:shadow transition-shadow border border-dream-blue/30">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-medium flex items-center">
            {getMoodIcon()}
            <span className="ml-2 capitalize">{emotion.mood}</span>
          </CardTitle>
          <CardDescription className="text-xs">
            {formatRelativeTime(emotion.created_at)}
          </CardDescription>
        </div>
      </CardHeader>
      {emotion.text && (
        <CardContent className="py-2">
          <p className="text-sm line-clamp-2">{emotion.text}</p>
        </CardContent>
      )}
      {emotion.tags && emotion.tags.length > 0 && (
        <CardFooter className="pt-2 flex flex-wrap gap-1 border-t border-dream-blue/10 bg-muted/10">
          {emotion.tags.map((tag, i) => (
            <Badge key={i} variant="secondary" className="bg-dream-blue/20 text-dream-dark">
              {tag}
            </Badge>
          ))}
        </CardFooter>
      )}
    </Card>
  );
};

export default MoodEntryCard;
