import React, { useState, useEffect, useCallback } from 'react';
import { RitualService, Ritual, RitualSession } from '@/services/rituals';
import { useAuth } from '@/context/AuthContext';
import PageContainer from '@/components/layout/PageContainer';
import RitualCard from '@/components/rituals/RitualCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, Target, Trophy, Calendar } from 'lucide-react';

const RitualsPage: React.FC = () => {
  const [rituals] = useState<Ritual[]>(RitualService.getAllRituals());
  const [todaysSessions, setTodaysSessions] = useState<RitualSession[]>([]);
  const [totalSessions, setTotalSessions] = useState<RitualSession[]>([]);
  const { user } = useAuth();

  const loadSessions = useCallback(() => {
    if (user) {
      const todaysSessions = RitualService.getTodaysSessions(user.id);
      const allSessions = RitualService.getUserSessions(user.id);
      setTodaysSessions(todaysSessions);
      setTotalSessions(allSessions);
    }
  }, [user]);

  useEffect(() => {
    loadSessions();
  }, [loadSessions]);

  const getCompletedRitualIds = () => {
    return new Set(todaysSessions.map(session => session.ritualId));
  };

  const getCategoryStats = () => {
    const stats = {
      reality_check: 0,
      lucid_dreaming: 0,
      dream_recall: 0,
      meditation: 0
    };

    totalSessions.forEach(session => {
      const ritual = RitualService.getRitualById(session.ritualId);
      if (ritual) {
        stats[ritual.category]++;
      }
    });

    return stats;
  };

  const completedToday = getCompletedRitualIds();
  const categoryStats = getCategoryStats();

  return (
    <PageContainer 
      title="Lucid Dreaming Rituals"
      description="Master consciousness through guided practices and awareness techniques"
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription className="text-xs">Today's Rituals</CardDescription>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </div>
            <CardTitle className="text-2xl">{todaysSessions.length}</CardTitle>
          </CardHeader>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription className="text-xs">Total Sessions</CardDescription>
              <Trophy className="h-4 w-4 text-yellow-600" />
            </div>
            <CardTitle className="text-2xl">{totalSessions.length}</CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription className="text-xs">Reality Checks</CardDescription>
              <Target className="h-4 w-4 text-blue-600" />
            </div>
            <CardTitle className="text-2xl">{categoryStats.reality_check}</CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription className="text-xs">Streak Days</CardDescription>
              <Calendar className="h-4 w-4 text-dream" />
            </div>
            <CardTitle className="text-2xl">5</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All Rituals</TabsTrigger>
          <TabsTrigger value="reality_check">Reality Checks</TabsTrigger>
          <TabsTrigger value="lucid_dreaming">Lucid Dreaming</TabsTrigger>
          <TabsTrigger value="dream_recall">Dream Recall</TabsTrigger>
          <TabsTrigger value="meditation">Meditation</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {rituals.map((ritual) => (
              <div key={ritual.id} className="relative">
                {completedToday.has(ritual.id) && (
                  <Badge className="absolute top-2 right-2 z-10 bg-green-100 text-green-800">
                    Completed Today ✓
                  </Badge>
                )}
                <RitualCard 
                  ritual={ritual} 
                  onComplete={loadSessions}
                />
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="reality_check" className="space-y-6 mt-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Reality Check Rituals</h3>
            <p className="text-sm text-muted-foreground">
              Build the habit of questioning reality throughout the day. This awareness will carry into your dreams.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {RitualService.getRitualsByCategory('reality_check').map((ritual) => (
              <div key={ritual.id} className="relative">
                {completedToday.has(ritual.id) && (
                  <Badge className="absolute top-2 right-2 z-10 bg-green-100 text-green-800">
                    Completed Today ✓
                  </Badge>
                )}
                <RitualCard 
                  ritual={ritual} 
                  onComplete={loadSessions}
                />
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="lucid_dreaming" className="space-y-6 mt-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Lucid Dreaming Techniques</h3>
            <p className="text-sm text-muted-foreground">
              Advanced techniques to increase your chances of becoming lucid in dreams.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {RitualService.getRitualsByCategory('lucid_dreaming').map((ritual) => (
              <div key={ritual.id} className="relative">
                {completedToday.has(ritual.id) && (
                  <Badge className="absolute top-2 right-2 z-10 bg-green-100 text-green-800">
                    Completed Today ✓
                  </Badge>
                )}
                <RitualCard 
                  ritual={ritual} 
                  onComplete={loadSessions}
                />
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="dream_recall" className="space-y-6 mt-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Dream Recall Enhancement</h3>
            <p className="text-sm text-muted-foreground">
              Improve your ability to remember and record your dreams in detail.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {RitualService.getRitualsByCategory('dream_recall').map((ritual) => (
              <div key={ritual.id} className="relative">
                {completedToday.has(ritual.id) && (
                  <Badge className="absolute top-2 right-2 z-10 bg-green-100 text-green-800">
                    Completed Today ✓
                  </Badge>
                )}
                <RitualCard 
                  ritual={ritual} 
                  onComplete={loadSessions}
                />
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="meditation" className="space-y-6 mt-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Meditation & Awareness</h3>
            <p className="text-sm text-muted-foreground">
              Develop mindfulness and awareness that will enhance your dream consciousness.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {RitualService.getRitualsByCategory('meditation').map((ritual) => (
              <div key={ritual.id} className="relative">
                {completedToday.has(ritual.id) && (
                  <Badge className="absolute top-2 right-2 z-10 bg-green-100 text-green-800">
                    Completed Today ✓
                  </Badge>
                )}
                <RitualCard 
                  ritual={ritual} 
                  onComplete={loadSessions}
                />
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </PageContainer>
  );
};

export default RitualsPage;