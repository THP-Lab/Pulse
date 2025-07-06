'use client';

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { Page } from '@/components/PageLayout';
import { Button, TopBar } from '@worldcoin/mini-apps-ui-kit-react';
import type { QuestionnaireData, Question, UserVote } from "@/types/questionnaire";

interface CommunityPulse {
  id: string;
  theme: string;
  questions: Question[];
  totalVotes: number;
  likePercentage: number;
  dislikePercentage: number;
  lastUpdated: string;
}

export default function PulseCommunityPage() {
  const router = useRouter();
  const [communityPulses, setCommunityPulses] = useState<CommunityPulse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTheme, setSelectedTheme] = useState<string>('all');

  useEffect(() => {
    loadCommunityPulses();
  }, []);

  const loadCommunityPulses = async () => {
    try {
      const response = await fetch('/questions.json');
      const data: QuestionnaireData = await response.json();
      
      const themeGroups = groupQuestionsByTheme(data.questions);
      const pulses = Object.entries(themeGroups).map(([theme, questions]) => ({
        id: theme,
        theme,
        questions,
        totalVotes: Math.floor(Math.random() * 1000) + 50,
        likePercentage: Math.floor(Math.random() * 40) + 30,
        dislikePercentage: Math.floor(Math.random() * 40) + 30,
        lastUpdated: new Date().toISOString()
      }));

      setCommunityPulses(pulses);
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading community pulses:', error);
      setIsLoading(false);
    }
  };

  const groupQuestionsByTheme = (questions: Question[]) => {
    const themes: { [key: string]: Question[] } = {};
    
    questions.forEach(question => {
      const theme = question.category;
      if (!themes[theme]) {
        themes[theme] = [];
      }
      themes[theme].push(question);
    });

    return themes;
  };

  const extractTheme = (subject: string, predicate: string): string => {
    const themes = ['DeFi', 'NFT', 'Gaming', 'Metaverse', 'DAO', 'Layer2', 'Privacy'];
    
    for (const theme of themes) {
      if (subject.toLowerCase().includes(theme.toLowerCase()) || 
          predicate.toLowerCase().includes(theme.toLowerCase())) {
        return theme;
      }
    }
    
    return 'General';
  };

  const handleGoBack = () => {
    router.push('/questionnaire');
  };

  const handleTakePulse = (theme: string) => {
    router.push(`/questionnaire?theme=${theme}`);
  };

  const handleGoToYourPulse = () => {
    router.push('/YourPulse');
  };

  const filteredPulses = selectedTheme === 'all' 
    ? communityPulses 
    : communityPulses.filter(pulse => pulse.theme === selectedTheme);

  if (isLoading) {
    return (
      <Page>
        <Page.Main className="flex flex-col items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-500">Loading community pulses...</p>
          </div>
        </Page.Main>
      </Page>
    );
  }

  return (
    <>
      <Page.Header className="p-0">
        <TopBar
          title="Pulse Community"
        />
      </Page.Header>
      
      <Page.Main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4 py-8">
          <header className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2"> Pulse Community</h1>
            <p className="text-lg text-gray-600">Discover what the Web3 community thinks</p>
          </header>

          <div className="flex gap-4 justify-center mb-8">
            <Button
              onClick={handleGoToYourPulse}
              variant="secondary"
              size="sm"
            >
              Your Pulse
            </Button>
          </div>

          <div className="mb-8">
            <div className="flex flex-wrap gap-2 justify-center">
              <button
                onClick={() => setSelectedTheme('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedTheme === 'all' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                All Themes
              </button>
              {Array.from(new Set(communityPulses.map(p => p.theme))).map(theme => (
                <button
                  key={theme}
                  onClick={() => setSelectedTheme(theme)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedTheme === theme 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {theme}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {filteredPulses.map((pulse) => (
              <div 
                key={pulse.id}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-800">{pulse.theme}</h3>
                  <span className="text-sm text-gray-500">{pulse.totalVotes} votes</span>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Community Pulse</span>
                    <span className="text-sm font-medium">
                      {pulse.likePercentage}% positive
                    </span>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${pulse.likePercentage}%` }}
                    />
                  </div>
                </div>
                
                <div className="text-sm text-gray-600 mb-4">
                  {pulse.questions.length} questions available
                </div>
                
                <Button
                  onClick={() => handleTakePulse(pulse.theme)}
                  variant="primary"
                  size="sm"
                  className="w-full"
                >
                  Take {pulse.theme} Pulse
                </Button>
              </div>
            ))}
          </div>

          {filteredPulses.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No pulses found for the selected theme.</p>
            </div>
          )}
        </div>
      </Page.Main>
    </>
  );
}