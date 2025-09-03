
import React, { useState, useEffect, useCallback } from 'react';
import { DreamEntry } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { formatDate, formatTime, formatRelativeTime } from '@/lib/helpers';
import { DreamAnalysisService, DreamAnalysisResult } from '@/services/dreamAnalysis';
import { BookText, Brain, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';

interface DreamEntryCardProps {
  dream: DreamEntry;
}

const DreamEntryCard: React.FC<DreamEntryCardProps> = ({ dream }) => {
  const [analysis, setAnalysis] = useState<DreamAnalysisResult | null>(null);
  const [analysisLoading, setAnalysisLoading] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);

  useEffect(() => {
    // Auto-generate analysis if not stored
    if (dream.text && !dream.ai_summary && !analysis) {
      generateAnalysis();
    }
  }, [dream.text, dream.ai_summary, analysis, generateAnalysis]);

  const generateAnalysis = useCallback(async () => {
    if (!dream.text) return;
    
    setAnalysisLoading(true);
    try {
      const result = await DreamAnalysisService.analyzeDreamAsync(dream.text);
      setAnalysis(result);
    } catch (error) {
      console.error('Failed to analyze dream:', error);
    } finally {
      setAnalysisLoading(false);
    }
  }, [dream.text]);

  return (
    <Card className="w-full bg-white/70 backdrop-blur-sm border border-white/40 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-white/80">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-medium flex items-center">
            <BookText className="h-4 w-4 mr-2 text-dream" />
            <span className="line-clamp-1">
              {dream.ai_summary || analysis?.summary || dream.text.slice(0, 30) + (dream.text.length > 30 ? '...' : '')}
            </span>
          </CardTitle>
          <div className="flex items-center gap-2">
            {(analysis || dream.ai_summary) && (
              <Sparkles className="h-4 w-4 text-dream" title="AI Analysis Available" />
            )}
            <CardDescription className="text-xs">
              {formatDate(dream.created_at)} at {formatTime(dream.created_at)}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="py-2">
        <p className="text-sm line-clamp-3">{dream.text}</p>
        
        {dream.voice_url && (
          <div className="mt-2">
            <audio src={dream.voice_url} controls className="w-full h-8" />
          </div>
        )}

        {/* AI Analysis Section */}
        {(analysis || analysisLoading) && (
          <Collapsible open={showAnalysis} onOpenChange={setShowAnalysis} className="mt-4">
            <CollapsibleTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-between bg-dream/5 border-dream-light hover:bg-dream/10"
                disabled={analysisLoading}
              >
                <div className="flex items-center">
                  <Brain className="h-4 w-4 mr-2 text-dream" />
                  {analysisLoading ? 'Analyzing dream...' : 'AI Dream Analysis'}
                </div>
                {showAnalysis ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-3 space-y-3">
              {analysis && (
                <>
                  <div className="p-3 bg-dream/5 rounded-md border border-dream-light/50">
                    <h4 className="font-medium text-sm text-dream-dark mb-2">Summary</h4>
                    <p className="text-sm text-muted-foreground">{analysis.summary}</p>
                  </div>

                  {analysis.themes.length > 0 && (
                    <div>
                      <h4 className="font-medium text-sm text-dream-dark mb-2">Dream Themes</h4>
                      <div className="flex flex-wrap gap-1">
                        {analysis.themes.map((theme, i) => (
                          <Badge key={i} variant="outline" className="capitalize">
                            {theme}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {analysis.emotions.length > 0 && (
                    <div>
                      <h4 className="font-medium text-sm text-dream-dark mb-2">Emotions</h4>
                      <div className="flex flex-wrap gap-1">
                        {analysis.emotions.map((emotion, i) => (
                          <Badge key={i} variant="secondary" className="capitalize bg-blue-100 text-blue-800">
                            {emotion}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {analysis.lucidityIndicators.length > 0 && (
                    <div>
                      <h4 className="font-medium text-sm text-dream-dark mb-2 flex items-center">
                        <Sparkles className="h-4 w-4 mr-1" />
                        Lucid Dream Detected!
                      </h4>
                      <div className="text-sm text-muted-foreground">
                        {analysis.lucidityIndicators.join(', ')}
                      </div>
                    </div>
                  )}

                  {analysis.insights.length > 0 && (
                    <div>
                      <h4 className="font-medium text-sm text-dream-dark mb-2">Insights</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {analysis.insights.map((insight, i) => (
                          <li key={i} className="flex items-start">
                            <span className="inline-block w-1 h-1 rounded-full bg-dream mt-2 mr-2 flex-shrink-0" />
                            {insight}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              )}
            </CollapsibleContent>
          </Collapsible>
        )}
      </CardContent>
      
      <CardFooter className="pt-2 flex flex-wrap gap-1 border-t border-dream-light/30 bg-muted/10">
        {dream.tags?.map((tag, i) => (
          <Badge key={i} variant="secondary" className="bg-dream-light text-dream-dark">
            {tag}
          </Badge>
        ))}
        {analysis?.themes.map((theme, i) => (
          <Badge key={`theme-${i}`} variant="outline" className="capitalize border-dream-light text-dream">
            {theme}
          </Badge>
        ))}
        {!dream.tags?.length && !analysis?.themes.length && (
          <span className="text-xs text-muted-foreground">Processing tags...</span>
        )}
      </CardFooter>
    </Card>
  );
};

export default DreamEntryCard;
