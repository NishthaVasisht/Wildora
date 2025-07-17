import { useState, useEffect } from 'react';
import { ArrowRight, RotateCcw, Clock, Star, Trophy } from 'lucide-react';
import Navbar from '@/react-app/components/Navbar';
import AchievementNotification from '@/react-app/components/AchievementNotification';
import { useUserProfile } from '@/react-app/hooks/useUserProfile';

interface Question {
  id: number;
  question: string;
  type: 'era' | 'lyrics' | 'trivia';
  answers: Array<{
    text: string;
    era?: string;
    isCorrect?: boolean;
    image?: string;
  }>;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
}

const quizQuestions: Question[] = [
  {
    id: 1,
    question: "What's your ideal Friday night?",
    type: 'era',
    difficulty: 'easy',
    points: 5,
    answers: [
      {
        text: "Dancing at a glamorous party",
        era: "1989",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop"
      },
      {
        text: "Plotting revenge in the shadows",
        era: "reputation",
        image: "https://images.unsplash.com/photo-1614624532983-4ce03382d63d?w=200&h=200&fit=crop"
      },
      {
        text: "Writing poetry by a fireplace",
        era: "folklore",
        image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=200&h=200&fit=crop"
      }
    ]
  },
  {
    id: 2,
    question: "Complete the lyric: 'I stay out too late, got nothing in my brain...'",
    type: 'lyrics',
    difficulty: 'medium',
    points: 10,
    answers: [
      { text: "That's what people say, mmm-hmm", isCorrect: true },
      { text: "That's what lovers say, oh-oh", isCorrect: false },
      { text: "That's what haters say, hey-hey", isCorrect: false },
      { text: "That's what friends say, yeah-yeah", isCorrect: false }
    ]
  },
  {
    id: 3,
    question: "Which album was Taylor's first full pop album?",
    type: 'trivia',
    difficulty: 'hard',
    points: 15,
    answers: [
      { text: "Red", isCorrect: false },
      { text: "1989", isCorrect: true },
      { text: "Speak Now", isCorrect: false },
      { text: "Fearless", isCorrect: false }
    ]
  },
  {
    id: 4,
    question: "Pick your dream aesthetic:",
    type: 'era',
    difficulty: 'easy',
    points: 5,
    answers: [
      {
        text: "Cozy cabin with fairy lights",
        era: "folklore",
        image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=200&h=200&fit=crop"
      },
      {
        text: "Neon lights and city nights",
        era: "midnights",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop"
      },
      {
        text: "Pastel rainbow everything",
        era: "lover",
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=200&h=200&fit=crop"
      }
    ]
  },
  {
    id: 5,
    question: "What does 'All Too Well (10 Minute Version)' reveal?",
    type: 'trivia',
    difficulty: 'hard',
    points: 20,
    answers: [
      { text: "The scarf was actually a metaphor", isCorrect: false },
      { text: "More details about the relationship", isCorrect: true },
      { text: "It was written in 2021", isCorrect: false },
      { text: "It features a guest vocalist", isCorrect: false }
    ]
  }
];

const achievements = [
  {
    id: 'first_quiz',
    name: 'Quiz Rookie',
    description: 'Complete your first quiz!',
    icon: 'star' as const,
    color: 'yellow'
  },
  {
    id: 'perfect_score',
    name: 'Swiftie Scholar',
    description: 'Get a perfect score on any quiz!',
    icon: 'trophy' as const,
    color: 'purple'
  },
  {
    id: 'speed_demon',
    name: 'Lightning Fast',
    description: 'Complete a quiz in under 30 seconds!',
    icon: 'star' as const,
    color: 'blue'
  }
];

export default function EnhancedQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<{ era?: string; score?: number; totalPoints?: number } | null>(null);
  const [timeStarted, setTimeStarted] = useState<number | null>(null);
  const [timeTaken, setTimeTaken] = useState<number | null>(null);
  const [currentAchievement, setCurrentAchievement] = useState<any>(null);
  const { profile, addSwiftCoins, addAchievement } = useUserProfile();

  useEffect(() => {
    if (currentQuestion === 0 && !timeStarted) {
      setTimeStarted(Date.now());
    }
  }, [currentQuestion, timeStarted]);

  const handleAnswer = async (answer: string, isCorrect?: boolean) => {
    const newAnswers = [...answers];
    if (isCorrect !== undefined) {
      newAnswers.push(isCorrect ? 'correct' : 'incorrect');
    } else {
      newAnswers.push(answer);
    }
    setAnswers(newAnswers);

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate result
      const endTime = Date.now();
      const totalTime = timeStarted ? Math.floor((endTime - timeStarted) / 1000) : 0;
      setTimeTaken(totalTime);

      // Calculate score for trivia/lyrics questions
      let score = 0;
      let totalPoints = 0;
      let eraCount: Record<string, number> = {};

      quizQuestions.forEach((question, index) => {
        totalPoints += question.points;
        
        if (question.type === 'era') {
          const selectedAnswer = question.answers.find(a => a.text === newAnswers[index]);
          if (selectedAnswer?.era) {
            eraCount[selectedAnswer.era] = (eraCount[selectedAnswer.era] || 0) + 1;
          }
        } else {
          if (newAnswers[index] === 'correct') {
            score += question.points;
          }
        }
      });

      // Find dominant era
      const dominantEra = Object.entries(eraCount).reduce((a, b) => 
        eraCount[a[0]] > eraCount[b[0]] ? a : b
      )?.[0];

      setResult({ era: dominantEra, score, totalPoints });

      // Save quiz attempt and check achievements
      if (profile) {
        try {
          const response = await fetch('/api/quiz/attempt', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              quiz_type: 'mixed',
              score,
              questions_answered: quizQuestions.length,
              time_taken: totalTime
            })
          });

          if (response.ok) {
            const data = await response.json();
            await addSwiftCoins(data.coins_earned);
            
            // Check for achievements
            checkAchievements(score, totalPoints, totalTime);
          }
        } catch (error) {
          console.error('Failed to save quiz attempt:', error);
        }
      }
    }
  };

  const checkAchievements = async (score: number, totalPoints: number, timeTaken: number) => {
    // First quiz achievement
    if (!profile?.achievement_badges?.includes('first_quiz')) {
      await addAchievement('first_quiz');
      setCurrentAchievement(achievements.find(a => a.id === 'first_quiz'));
      
      // Add achievement to backend
      fetch('/api/achievements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          achievement_id: 'first_quiz',
          achievement_name: 'Quiz Rookie'
        })
      });
    }

    // Perfect score achievement
    if (score === totalPoints && !profile?.achievement_badges?.includes('perfect_score')) {
      await addAchievement('perfect_score');
      setTimeout(() => {
        setCurrentAchievement(achievements.find(a => a.id === 'perfect_score'));
      }, 2000);
      
      fetch('/api/achievements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          achievement_id: 'perfect_score',
          achievement_name: 'Swiftie Scholar'
        })
      });
    }

    // Speed achievement
    if (timeTaken < 30 && !profile?.achievement_badges?.includes('speed_demon')) {
      await addAchievement('speed_demon');
      setTimeout(() => {
        setCurrentAchievement(achievements.find(a => a.id === 'speed_demon'));
      }, 4000);
      
      fetch('/api/achievements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          achievement_id: 'speed_demon',
          achievement_name: 'Lightning Fast'
        })
      });
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setResult(null);
    setTimeStarted(null);
    setTimeTaken(null);
  };

  const eraDescriptions = {
    "1989": {
      title: "You're 1989!",
      description: "You're bright, optimistic, and love to shake off the negativity. Like this pop masterpiece, you're all about new beginnings and dancing through life.",
      color: "from-sky-400 to-blue-600"
    },
    "reputation": {
      title: "You're Reputation!",
      description: "You're fierce, bold, and not afraid to speak your mind. Like this era, you've learned to turn your struggles into strength.",
      color: "from-gray-800 to-black"
    },
    "folklore": {
      title: "You're Folklore!",
      description: "You're introspective, creative, and find beauty in the quiet moments. Like this indie masterpiece, you see magic in storytelling.",
      color: "from-gray-400 to-gray-600"
    },
    "midnights": {
      title: "You're Midnights!",
      description: "You're mysterious, thoughtful, and love those late-night conversations. Like this album, you find beauty in the darkness.",
      color: "from-indigo-900 to-purple-900"
    },
    "lover": {
      title: "You're Lover!",
      description: "You're romantic, colorful, and believe in the power of love. Like this era, you see the world through rose-colored glasses.",
      color: "from-pink-300 to-purple-400"
    }
  };

  if (result) {
    const eraInfo = result.era ? eraDescriptions[result.era as keyof typeof eraDescriptions] : null;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-red-600">
        <Navbar />
        
        <div className="pt-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-8 mb-8">
              {eraInfo && (
                <>
                  <div className={`w-32 h-32 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${eraInfo.color}`} />
                  <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    {eraInfo.title}
                  </h1>
                  <p className="text-xl text-white/80 leading-relaxed mb-6">
                    {eraInfo.description}
                  </p>
                </>
              )}
              
              {/* Quiz Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-4">
                  <div className="text-2xl font-bold text-white">{result.score}</div>
                  <div className="text-white/60 text-sm">Points</div>
                </div>
                <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-4">
                  <div className="text-2xl font-bold text-white">{Math.round((result.score! / result.totalPoints!) * 100)}%</div>
                  <div className="text-white/60 text-sm">Accuracy</div>
                </div>
                <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-4">
                  <div className="text-2xl font-bold text-white">{timeTaken}s</div>
                  <div className="text-white/60 text-sm">Time</div>
                </div>
              </div>
              
              <button
                onClick={resetQuiz}
                className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-white font-semibold hover:bg-white/30 transition-all duration-300"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                Take Quiz Again
              </button>
            </div>
          </div>
        </div>
        
        <AchievementNotification
          achievement={currentAchievement}
          onClose={() => setCurrentAchievement(null)}
        />
      </div>
    );
  }

  const question = quizQuestions[currentQuestion];
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-red-600">
      <Navbar />
      
      <div className="pt-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Enhanced Swiftie Quiz
            </h1>
            <div className="flex items-center justify-center space-x-6 text-white/80">
              <div className="flex items-center space-x-2">
                <span>Question {currentQuestion + 1} of {quizQuestions.length}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock size={16} />
                <span>{timeStarted ? Math.floor((Date.now() - timeStarted) / 1000) : 0}s</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star size={16} />
                <span>{question.points} points</span>
              </div>
            </div>
            
            {/* Progress bar */}
            <div className="w-full max-w-md mx-auto mt-6 bg-white/20 rounded-full h-3">
              <div 
                className="h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full transition-all duration-500"
                style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                {question.question}
              </h2>
              <div className={`px-3 py-1 rounded-full text-white text-xs font-medium ${
                question.difficulty === 'easy' ? 'bg-green-500/30' :
                question.difficulty === 'medium' ? 'bg-yellow-500/30' : 'bg-red-500/30'
              }`}>
                {question.difficulty.toUpperCase()}
              </div>
            </div>
            
            <div className={`grid gap-4 ${
              question.type === 'era' ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-1 md:grid-cols-2'
            }`}>
              {question.answers.map((answer, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(answer.text, answer.isCorrect)}
                  className="group backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6 hover:bg-white/20 hover:scale-105 transition-all duration-300 text-left cursor-pointer"
                >
                  {answer.image && (
                    <img
                      src={answer.image}
                      alt={answer.text}
                      className="w-full aspect-square object-cover rounded-xl mb-4 group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
                  <p className="text-white font-semibold text-lg mb-2">
                    {answer.text}
                  </p>
                  <ArrowRight className="w-5 h-5 text-white/60 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <AchievementNotification
        achievement={currentAchievement}
        onClose={() => setCurrentAchievement(null)}
      />
    </div>
  );
}
