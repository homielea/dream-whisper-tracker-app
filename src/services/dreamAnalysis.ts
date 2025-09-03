export interface DreamAnalysisResult {
  summary: string;
  themes: string[];
  emotions: string[];
  lucidityIndicators: string[];
  insights: string[];
}

export class DreamAnalysisService {
  private static analyzeThemes(dreamText: string): string[] {
    const themes: string[] = [];
    const lowerText = dreamText.toLowerCase();
    
    // Common dream themes
    const themeKeywords = {
      'flying': ['fly', 'flying', 'soar', 'floating', 'airborne'],
      'falling': ['fall', 'falling', 'drop', 'plummet'],
      'water': ['water', 'ocean', 'river', 'swimming', 'drowning', 'rain'],
      'animals': ['dog', 'cat', 'bird', 'snake', 'spider', 'animal'],
      'people': ['person', 'people', 'friend', 'family', 'stranger'],
      'chase': ['chase', 'chased', 'running', 'escape', 'pursued'],
      'school': ['school', 'classroom', 'teacher', 'exam', 'test'],
      'work': ['work', 'job', 'office', 'boss', 'meeting'],
      'death': ['death', 'die', 'dead', 'funeral', 'grave'],
      'lost': ['lost', 'missing', 'can\'t find', 'searching']
    };

    Object.entries(themeKeywords).forEach(([theme, keywords]) => {
      if (keywords.some(keyword => lowerText.includes(keyword))) {
        themes.push(theme);
      }
    });

    return themes;
  }

  private static analyzeEmotions(dreamText: string): string[] {
    const emotions: string[] = [];
    const lowerText = dreamText.toLowerCase();
    
    const emotionKeywords = {
      'fear': ['afraid', 'scared', 'terrified', 'fear', 'frightened', 'panic'],
      'joy': ['happy', 'joy', 'excited', 'elated', 'cheerful', 'delighted'],
      'sadness': ['sad', 'crying', 'tears', 'grief', 'sorrow', 'depressed'],
      'anger': ['angry', 'mad', 'furious', 'rage', 'irritated', 'annoyed'],
      'confusion': ['confused', 'lost', 'puzzled', 'bewildered', 'unclear'],
      'peace': ['calm', 'peaceful', 'serene', 'tranquil', 'relaxed']
    };

    Object.entries(emotionKeywords).forEach(([emotion, keywords]) => {
      if (keywords.some(keyword => lowerText.includes(keyword))) {
        emotions.push(emotion);
      }
    });

    return emotions;
  }

  private static analyzeLucidityIndicators(dreamText: string): string[] {
    const indicators: string[] = [];
    const lowerText = dreamText.toLowerCase();
    
    const lucidKeywords = [
      'realized i was dreaming',
      'knew i was dreaming',
      'lucid',
      'aware it was a dream',
      'controlled the dream',
      'reality check',
      'dream sign',
      'became aware'
    ];

    lucidKeywords.forEach(keyword => {
      if (lowerText.includes(keyword)) {
        indicators.push(keyword);
      }
    });

    return indicators;
  }

  private static generateInsights(themes: string[], emotions: string[], lucidityIndicators: string[]): string[] {
    const insights: string[] = [];

    // Theme-based insights
    if (themes.includes('flying')) {
      insights.push('Flying dreams often represent a desire for freedom or escape from limitations.');
    }
    if (themes.includes('falling')) {
      insights.push('Falling dreams may indicate feelings of losing control in waking life.');
    }
    if (themes.includes('water')) {
      insights.push('Water in dreams often relates to emotions and the unconscious mind.');
    }
    if (themes.includes('chase')) {
      insights.push('Being chased in dreams might reflect avoidance of a situation or feeling in waking life.');
    }

    // Emotion-based insights
    if (emotions.includes('fear')) {
      insights.push('Fear in dreams can help process anxieties from your waking life.');
    }
    if (emotions.includes('joy')) {
      insights.push('Positive emotions in dreams may reflect contentment or hopes for the future.');
    }

    // Lucidity insights
    if (lucidityIndicators.length > 0) {
      insights.push('Great job achieving lucidity! This shows growing dream awareness.');
    }

    // General insight if no specific patterns found
    if (insights.length === 0) {
      insights.push('Every dream offers unique insights into your subconscious mind.');
    }

    return insights;
  }

  static analyzeDream(dreamText: string): DreamAnalysisResult {
    if (!dreamText || dreamText.trim().length === 0) {
      return {
        summary: 'No dream content to analyze.',
        themes: [],
        emotions: [],
        lucidityIndicators: [],
        insights: ['Record your dreams in more detail for better analysis.']
      };
    }

    const themes = this.analyzeThemes(dreamText);
    const emotions = this.analyzeEmotions(dreamText);
    const lucidityIndicators = this.analyzeLucidityIndicators(dreamText);
    const insights = this.generateInsights(themes, emotions, lucidityIndicators);

    // Generate summary
    let summary = `This dream `;
    
    if (themes.length > 0) {
      summary += `features themes of ${themes.join(', ')}`;
    } else {
      summary += `contains unique personal symbolism`;
    }

    if (emotions.length > 0) {
      summary += ` with emotional undertones of ${emotions.join(', ')}`;
    }

    if (lucidityIndicators.length > 0) {
      summary += `. Notably, this was a lucid dream experience!`;
    } else {
      summary += `.`;
    }

    return {
      summary,
      themes,
      emotions,
      lucidityIndicators,
      insights
    };
  }

  // Simulate async API call for future integration
  static async analyzeDreamAsync(dreamText: string): Promise<DreamAnalysisResult> {
    // Add small delay to simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    return this.analyzeDream(dreamText);
  }
}