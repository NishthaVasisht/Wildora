import { useState } from 'react';
import { ArrowRight, RotateCcw } from 'lucide-react';
import Navbar from '@/react-app/components/Navbar';

interface Question {
  id: number;
  question: string;
  answers: Array<{
    text: string;
    era: string;
    image: string;
  }>;
}

const questions: Question[] = [
  {
    id: 1,
    question: "What's your ideal Friday night?",
    answers: [
      {
        text: "Dancing at a glamorous party",
        era: "1989",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop"
      },
      {
        text: "Plotting revenge in the shadows",
        era: "Reputation",
        image: "https://images.unsplash.com/photo-1614624532983-4ce03382d63d?w=200&h=200&fit=crop"
      },
      {
        text: "Writing poetry by a fireplace",
        era: "Folklore",
        image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=200&h=200&fit=crop"
      }
    ]
  },
  {
    id: 2,
    question: "Pick a color palette:",
    answers: [
      {
        text: "Bright blues and pastels",
        era: "1989",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop"
      },
      {
        text: "Dark blacks and metallics",
        era: "Reputation",
        image: "https://images.unsplash.com/photo-1614624532983-4ce03382d63d?w=200&h=200&fit=crop"
      },
      {
        text: "Earthy grays and browns",
        era: "Folklore",
        image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=200&h=200&fit=crop"
      }
    ]
  }
];

const eraDescriptions = {
  "1989": {
    title: "You're 1989!",
    description: "You're bright, optimistic, and love to shake off the negativity. Like this pop masterpiece, you're all about new beginnings and dancing through life.",
    color: "from-sky-400 to-blue-600"
  },
  "Reputation": {
    title: "You're Reputation!",
    description: "You're fierce, bold, and not afraid to speak your mind. Like this era, you've learned to turn your struggles into strength.",
    color: "from-gray-800 to-black"
  },
  "Folklore": {
    title: "You're Folklore!",
    description: "You're introspective, creative, and find beauty in the quiet moments. Like this indie masterpiece, you see magic in storytelling.",
    color: "from-gray-400 to-gray-600"
  }
};

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<string | null>(null);

  const handleAnswer = (era: string) => {
    const newAnswers = [...answers, era];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate result (most frequent era)
      const eraCounts = newAnswers.reduce((acc, era) => {
        acc[era] = (acc[era] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      
      const resultEra = Object.entries(eraCounts).reduce((a, b) => 
        eraCounts[a[0]] > eraCounts[b[0]] ? a : b
      )[0];
      
      setResult(resultEra);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setResult(null);
  };

  if (result) {
    const eraInfo = eraDescriptions[result as keyof typeof eraDescriptions];
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-red-600">
        <Navbar />
        
        <div className="pt-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-8 mb-8">
              <div className={`w-32 h-32 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${eraInfo.color}`} />
              
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {eraInfo.title}
              </h1>
              
              <p className="text-xl text-white/80 leading-relaxed mb-8">
                {eraInfo.description}
              </p>
              
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
      </div>
    );
  }

  const question = questions[currentQuestion];
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-red-600">
      <Navbar />
      
      <div className="pt-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Which Era Are You?
            </h1>
            <p className="text-xl text-white/80">
              Question {currentQuestion + 1} of {questions.length}
            </p>
            
            {/* Progress bar */}
            <div className="w-full max-w-md mx-auto mt-6 bg-white/20 rounded-full h-2">
              <div 
                className="h-2 bg-white rounded-full transition-all duration-500"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-8 mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">
              {question.question}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {question.answers.map((answer, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(answer.era)}
                  className="group backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6 hover:bg-white/20 hover:scale-105 transition-all duration-300 text-left"
                >
                  <img
                    src={answer.image}
                    alt={answer.text}
                    className="w-full aspect-square object-cover rounded-xl mb-4 group-hover:scale-105 transition-transform duration-300"
                  />
                  <p className="text-white font-semibold text-lg">
                    {answer.text}
                  </p>
                  <ArrowRight className="w-5 h-5 text-white/60 mt-2 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
