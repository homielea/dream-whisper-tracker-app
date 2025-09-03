export interface Ritual {
  id: string;
  name: string;
  description: string;
  instructions: string[];
  duration: number; // in minutes
  category: 'reality_check' | 'lucid_dreaming' | 'dream_recall' | 'meditation';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface RitualSession {
  id: string;
  ritualId: string;
  userId: string;
  completedAt: string;
  rating?: number; // 1-5 stars
  notes?: string;
}

export const PREDEFINED_RITUALS: Ritual[] = [
  {
    id: 'reality-check-hands',
    name: 'Hand Reality Check',
    description: 'Look at your hands and count your fingers to check if you\'re dreaming.',
    instructions: [
      'Hold your hands up in front of your face',
      'Look at your palms and count your fingers',
      'Look away and look back again',
      'Ask yourself: "Am I dreaming right now?"',
      'In dreams, hands often appear distorted or have extra/missing fingers'
    ],
    duration: 1,
    category: 'reality_check',
    difficulty: 'beginner'
  },
  {
    id: 'reality-check-digital',
    name: 'Digital Clock Reality Check',
    description: 'Check digital clocks or text to see if they remain consistent.',
    instructions: [
      'Look at a digital clock, phone, or any text',
      'Note the time or what the text says',
      'Look away briefly',
      'Look back at the same display',
      'In dreams, text and numbers often change when you look away and back'
    ],
    duration: 1,
    category: 'reality_check',
    difficulty: 'beginner'
  },
  {
    id: 'mild-technique',
    name: 'Mnemonic Induction (MILD)',
    description: 'Set the intention to remember you\'re dreaming as you fall asleep.',
    instructions: [
      'As you\'re falling asleep, repeat: "Next time I\'m dreaming, I will remember I\'m dreaming"',
      'Visualize yourself becoming lucid in a recent dream',
      'Imagine recognizing dream signs and realizing you\'re dreaming',
      'Feel confident that you will remember to do reality checks in your dreams',
      'Continue until you fall asleep'
    ],
    duration: 10,
    category: 'lucid_dreaming',
    difficulty: 'intermediate'
  },
  {
    id: 'wake-back-bed',
    name: 'Wake-Back-to-Bed (WBTB)',
    description: 'Wake up early, stay awake briefly, then return to sleep for lucid dreams.',
    instructions: [
      'Set an alarm for 4-6 hours after falling asleep',
      'When the alarm goes off, get out of bed',
      'Stay awake for 15-60 minutes thinking about lucid dreaming',
      'Read about lucid dreaming or visualize becoming lucid',
      'Go back to sleep with the intention to have a lucid dream',
      'Practice MILD technique as you fall back asleep'
    ],
    duration: 30,
    category: 'lucid_dreaming',
    difficulty: 'intermediate'
  },
  {
    id: 'dream-recall-meditation',
    name: 'Dream Recall Meditation',
    description: 'A meditation to improve your ability to remember dreams.',
    instructions: [
      'Lie down comfortably in a quiet space',
      'Close your eyes and take several deep breaths',
      'Set the intention: "I will remember my dreams clearly"',
      'Visualize yourself waking up and immediately writing in your dream journal',
      'Imagine remembering vivid details from your dreams',
      'Feel grateful for the dreams you will remember'
    ],
    duration: 15,
    category: 'dream_recall',
    difficulty: 'beginner'
  },
  {
    id: 'mindfulness-meditation',
    name: 'Awareness Meditation',
    description: 'Practice mindfulness to increase awareness in dreams.',
    instructions: [
      'Find a comfortable seated position',
      'Close your eyes and focus on your breathing',
      'Notice thoughts, sensations, and sounds without judgment',
      'Practice asking: "What am I experiencing right now?"',
      'Cultivate a habit of questioning reality',
      'This awareness practice will carry into your dreams'
    ],
    duration: 20,
    category: 'meditation',
    difficulty: 'beginner'
  }
];

export class RitualService {
  static getAllRituals(): Ritual[] {
    return PREDEFINED_RITUALS;
  }

  static getRitualsByCategory(category: Ritual['category']): Ritual[] {
    return PREDEFINED_RITUALS.filter(ritual => ritual.category === category);
  }

  static getRitualsByDifficulty(difficulty: Ritual['difficulty']): Ritual[] {
    return PREDEFINED_RITUALS.filter(ritual => ritual.difficulty === difficulty);
  }

  static getRitualById(id: string): Ritual | null {
    return PREDEFINED_RITUALS.find(ritual => ritual.id === id) || null;
  }

  static getBeginnerRituals(): Ritual[] {
    return this.getRitualsByDifficulty('beginner');
  }

  static getQuickRituals(): Ritual[] {
    return PREDEFINED_RITUALS.filter(ritual => ritual.duration <= 5);
  }

  // Mock session tracking - in real app this would integrate with Supabase
  static completeRitualSession(userId: string, ritualId: string, rating?: number, notes?: string): RitualSession {
    const session: RitualSession = {
      id: Date.now().toString(),
      ritualId,
      userId,
      completedAt: new Date().toISOString(),
      rating,
      notes
    };

    // Store in localStorage for demo purposes
    const sessions = JSON.parse(localStorage.getItem('ritual-sessions') || '[]');
    sessions.push(session);
    localStorage.setItem('ritual-sessions', JSON.stringify(sessions));

    return session;
  }

  static getUserSessions(userId: string): RitualSession[] {
    const sessions = JSON.parse(localStorage.getItem('ritual-sessions') || '[]');
    return sessions.filter((session: RitualSession) => session.userId === userId);
  }

  static getTodaysSessions(userId: string): RitualSession[] {
    const today = new Date().toDateString();
    return this.getUserSessions(userId).filter(session => {
      return new Date(session.completedAt).toDateString() === today;
    });
  }
}