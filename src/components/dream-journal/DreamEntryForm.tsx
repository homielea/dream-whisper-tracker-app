
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useEntries } from '@/context/EntriesContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Mic, Save, X } from 'lucide-react';

const DreamEntryForm: React.FC = () => {
  const [dreamText, setDreamText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | undefined>(undefined);
  const { addDreamEntry } = useEntries();
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);

  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);
      
      recorder.addEventListener("dataavailable", (event) => {
        setAudioChunks((prev) => [...prev, event.data]);
      });
      
      recorder.addEventListener("stop", () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioURL(audioUrl);
        setIsRecording(false);
        
        // In a real app, we would upload this to storage
        // For now, just simulate having the URL
      });
      
      recorder.start();
      setIsRecording(true);
      setAudioChunks([]);
    } catch (error) {
      console.error("Failed to start recording", error);
    }
  };
  
  const handleStopRecording = () => {
    if (mediaRecorder && mediaRecorder.state !== "inactive") {
      mediaRecorder.stop();
      mediaRecorder.stream.getTracks().forEach(track => track.stop());
    }
  };
  
  const handleCancelRecording = () => {
    if (mediaRecorder && mediaRecorder.state !== "inactive") {
      mediaRecorder.stop();
      mediaRecorder.stream.getTracks().forEach(track => track.stop());
    }
    setAudioURL(undefined);
    setIsRecording(false);
    setAudioChunks([]);
  };

  const handleSubmit = async () => {
    if (dreamText.trim() || audioURL) {
      await addDreamEntry(dreamText, audioURL);
      setDreamText('');
      setAudioURL(undefined);
      setAudioChunks([]);
    }
  };

  return (
    <Card className="w-full bg-white/70 backdrop-blur-sm border border-white/40 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-dream-violet/5 to-aqua-glow/5">
        <CardTitle className="text-xl font-heading text-midnight-indigo">Record Your Dream</CardTitle>
        <CardDescription className="text-gray-600">Write down your dream or record it with voice</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 pt-6">
        <Textarea
          placeholder="Describe your dream here..."
          className="min-h-32 resize-none"
          value={dreamText}
          onChange={(e) => setDreamText(e.target.value)}
        />
        
        <div className="flex items-center space-x-4">
          {audioURL && (
            <div className="flex-1 p-2 bg-dream-blue rounded-md flex items-center">
              <audio src={audioURL} controls className="w-full" />
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setAudioURL(undefined)}
                className="ml-2 hover:bg-white/20"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
          
          {!audioURL && (
            <div className="flex items-center space-x-2">
              <Button
                type="button"
                variant={isRecording ? "destructive" : "outline"}
                size="icon"
                onClick={isRecording ? handleStopRecording : handleStartRecording}
                className={isRecording ? "animate-pulse" : ""}
              >
                <Mic className="h-4 w-4" />
              </Button>
              
              {isRecording && (
                <span className="text-sm text-muted-foreground animate-pulse">
                  Recording...
                </span>
              )}
              
              {isRecording && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleCancelRecording}
                >
                  Cancel
                </Button>
              )}
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end border-t border-gray-200/50 bg-gradient-to-r from-dream-violet/5 to-aqua-glow/5 py-3">
        <Button 
          onClick={handleSubmit}
          className="bg-gradient-to-r from-dream-violet to-aqua-glow hover:from-dream-violet/80 hover:to-aqua-glow/80 text-white rounded-xl"
          disabled={!dreamText.trim() && !audioURL}
        >
          <Save className="h-4 w-4 mr-2" />
          Save Dream
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DreamEntryForm;
