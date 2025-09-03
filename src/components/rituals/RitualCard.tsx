import React, { useState } from 'react';
import { Ritual, RitualService } from '@/services/rituals';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Clock, Star, CheckCircle, Play, Moon, Eye, Brain, Sparkles } from 'lucide-react';

interface RitualCardProps {
  ritual: Ritual;
  onComplete?: () => void;
}

const RitualCard: React.FC<RitualCardProps> = ({ ritual, onComplete }) => {
  const [showInstructions, setShowInstructions] = useState(false);
  const [rating, setRating] = useState(0);
  const [notes, setNotes] = useState('');
  const [isCompleting, setIsCompleting] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const getCategoryIcon = (category: Ritual['category']) => {
    switch (category) {
      case 'reality_check': return <Eye className="h-4 w-4" />;
      case 'lucid_dreaming': return <Moon className="h-4 w-4" />;
      case 'dream_recall': return <Brain className="h-4 w-4" />;
      case 'meditation': return <Sparkles className="h-4 w-4" />;
      default: return <Star className="h-4 w-4" />;
    }
  };

  const getDifficultyColor = (difficulty: Ritual['difficulty']) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCompleteRitual = async () => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Sign in required",
        description: "Please sign in to track ritual completions.",
      });
      return;
    }

    setIsCompleting(true);
    try {
      RitualService.completeRitualSession(user.id, ritual.id, rating || undefined, notes || undefined);
      
      toast({
        title: "Ritual completed! ✨",
        description: `Well done completing "${ritual.name}". Keep building your practice!`,
      });

      setShowInstructions(false);
      setRating(0);
      setNotes('');
      onComplete?.();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error completing ritual",
        description: "Please try again.",
      });
    } finally {
      setIsCompleting(false);
    }
  };

  return (
    <Card className="w-full shadow-sm hover:shadow-md transition-shadow border border-dream-light">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-dream/10 rounded-full">
              {getCategoryIcon(ritual.category)}
            </div>
            <div>
              <CardTitle className="text-lg font-medium">{ritual.name}</CardTitle>
              <CardDescription className="text-sm">{ritual.description}</CardDescription>
            </div>
          </div>
          <div className="flex flex-col items-end space-y-1">
            <Badge className={`text-xs ${getDifficultyColor(ritual.difficulty)}`}>
              {ritual.difficulty}
            </Badge>
            <div className="flex items-center text-xs text-muted-foreground">
              <Clock className="h-3 w-3 mr-1" />
              {ritual.duration} min
            </div>
          </div>
        </div>
      </CardHeader>

      <CardFooter className="pt-0">
        <Dialog open={showInstructions} onOpenChange={setShowInstructions}>
          <DialogTrigger asChild>
            <Button 
              className="w-full bg-dream hover:bg-dream-dark"
              size="sm"
            >
              <Play className="h-4 w-4 mr-2" />
              Start Ritual
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                {getCategoryIcon(ritual.category)}
                <span className="ml-2">{ritual.name}</span>
              </DialogTitle>
              <DialogDescription>
                {ritual.description}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 max-h-96 overflow-y-auto">
              <div>
                <h4 className="font-medium text-sm mb-2">Instructions:</h4>
                <ol className="space-y-2">
                  {ritual.instructions.map((instruction, index) => (
                    <li key={index} className="flex items-start text-sm">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-dream/20 text-dream text-xs mr-3 mt-0.5 flex-shrink-0">
                        {index + 1}
                      </span>
                      <span>{instruction}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="border-t pt-4">
                <Label htmlFor="rating" className="text-sm font-medium">
                  How did it go? (optional)
                </Label>
                <div className="flex items-center space-x-1 mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className="p-1"
                    >
                      <Star
                        className={`h-5 w-5 ${
                          star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="notes" className="text-sm font-medium">
                  Notes (optional)
                </Label>
                <Textarea
                  id="notes"
                  placeholder="How did this ritual feel? Any insights or experiences..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="mt-2"
                  rows={3}
                />
              </div>
            </div>

            <div className="flex space-x-2 pt-4">
              <Button
                variant="outline"
                onClick={() => setShowInstructions(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleCompleteRitual}
                disabled={isCompleting}
                className="flex-1 bg-dream hover:bg-dream-dark"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                {isCompleting ? 'Completing...' : 'Complete Ritual'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default RitualCard;