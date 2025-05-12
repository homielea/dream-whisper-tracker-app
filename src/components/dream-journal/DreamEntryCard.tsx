
import React from 'react';
import { DreamEntry } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDate, formatTime, formatRelativeTime } from '@/lib/helpers';
import { BookText } from 'lucide-react';

interface DreamEntryCardProps {
  dream: DreamEntry;
}

const DreamEntryCard: React.FC<DreamEntryCardProps> = ({ dream }) => {
  return (
    <Card className="w-full shadow-sm hover:shadow transition-shadow border border-dream-light">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-medium flex items-center">
            <BookText className="h-4 w-4 mr-2 text-dream" />
            <span className="line-clamp-1">
              {dream.ai_summary || dream.text.slice(0, 30) + (dream.text.length > 30 ? '...' : '')}
            </span>
          </CardTitle>
          <CardDescription className="text-xs">
            {formatDate(dream.created_at)} at {formatTime(dream.created_at)}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="py-2">
        <p className="text-sm line-clamp-3">{dream.text}</p>
        
        {dream.voice_url && (
          <div className="mt-2">
            <audio src={dream.voice_url} controls className="w-full h-8" />
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-2 flex flex-wrap gap-1 border-t border-dream-light/30 bg-muted/10">
        {dream.tags?.map((tag, i) => (
          <Badge key={i} variant="secondary" className="bg-dream-light text-dream-dark">
            {tag}
          </Badge>
        ))}
        {!dream.tags?.length && <span className="text-xs text-muted-foreground">Processing tags...</span>}
      </CardFooter>
    </Card>
  );
};

export default DreamEntryCard;
