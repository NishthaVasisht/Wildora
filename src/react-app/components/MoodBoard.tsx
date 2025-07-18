import { useState } from 'react';
import { Plus, X, Heart, Share2 } from 'lucide-react';
// import { useUserProfile } from '@/react-app/hooks/useUserProfile';

interface MoodItem {
  id: string;
  type: 'image' | 'text' | 'color';
  content: string;
  position: { x: number; y: number };
  era?: string;
}

interface MoodBoard {
  id: string;
  title: string;
  items: MoodItem[];
  era: string;
  likes: number;
  isLiked: boolean;
  creator: string;
}

const eraThemes = {
  'fearless': {
    colors: ['#FFD700', '#FFA500', '#FFFF00'],
    aesthetic: 'Country Golden Hour',
    bgGradient: 'from-yellow-400 to-amber-500'
  },
  'red': {
    colors: ['#DC143C', '#8B0000', '#FF6347'],
    aesthetic: 'Autumn Romance',
    bgGradient: 'from-red-500 to-red-700'
  },
  '1989': {
    colors: ['#87CEEB', '#4169E1', '#ADD8E6'],
    aesthetic: 'Polaroid Pop',
    bgGradient: 'from-sky-400 to-blue-600'
  },
  'reputation': {
    colors: ['#2F2F2F', '#000000', '#696969'],
    aesthetic: 'Dark Academia',
    bgGradient: 'from-gray-800 to-black'
  },
  'lover': {
    colors: ['#FFB6C1', '#DA70D6', '#FFE4E1'],
    aesthetic: 'Pastel Dreams',
    bgGradient: 'from-pink-300 to-purple-400'
  },
  'folklore': {
    colors: ['#708090', '#2F4F4F', '#D3D3D3'],
    aesthetic: 'Cottagecore Cozy',
    bgGradient: 'from-gray-400 to-gray-600'
  },
  'evermore': {
    colors: ['#A0522D', '#8B4513', '#CD853F'],
    aesthetic: 'Autumn Forest',
    bgGradient: 'from-amber-600 to-orange-800'
  },
  'midnights': {
    colors: ['#191970', '#4B0082', '#663399'],
    aesthetic: 'Lavender Haze',
    bgGradient: 'from-indigo-900 to-purple-900'
  },
  'tortured-poets': {
    colors: ['#696969', '#2F2F2F', '#A9A9A9'],
    aesthetic: 'Gothic Poetry',
    bgGradient: 'from-stone-600 to-slate-800'
  }
};

const sampleBoards: MoodBoard[] = [
  {
    id: '1',
    title: 'Folklore Cabin Vibes',
    era: 'folklore',
    likes: 234,
    isLiked: false,
    creator: 'folklore_stan',
    items: [
      {
        id: '1',
        type: 'image',
        content: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=200&h=200&fit=crop',
        position: { x: 20, y: 20 }
      },
      {
        id: '2',
        type: 'text',
        content: 'cozy autumn mornings',
        position: { x: 60, y: 15 }
      },
      {
        id: '3',
        type: 'color',
        content: '#708090',
        position: { x: 15, y: 60 }
      }
    ]
  },
  {
    id: '2',
    title: 'Midnights Purple Dreams',
    era: 'midnights',
    likes: 567,
    isLiked: true,
    creator: 'lavender_haze',
    items: [
      {
        id: '1',
        type: 'image',
        content: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop',
        position: { x: 25, y: 25 }
      },
      {
        id: '2',
        type: 'text',
        content: '3am thoughts',
        position: { x: 65, y: 20 }
      }
    ]
  }
];

export default function MoodBoard() {
  const [boards, setBoards] = useState(sampleBoards);
  const [isCreating, setIsCreating] = useState(false);
  const [newBoard, setNewBoard] = useState<Partial<MoodBoard>>({
    title: '',
    era: 'midnights',
    items: []
  });
  // const { profile } = useUserProfile();

  const handleCreateBoard = () => {
    if (!newBoard.title) return;
    
    const board: MoodBoard = {
      id: Date.now().toString(),
      title: newBoard.title,
      era: newBoard.era || 'midnights',
      items: [],
      likes: 0,
      isLiked: false,
      creator: 'You'
    };
    
    setBoards([board, ...boards]);
    setNewBoard({ title: '', era: 'midnights', items: [] });
    setIsCreating(false);
  };

  const handleLike = (boardId: string) => {
    setBoards(boards.map(board => 
      board.id === boardId 
        ? { 
            ...board, 
            isLiked: !board.isLiked,
            likes: board.isLiked ? board.likes - 1 : board.likes + 1 
          }
        : board
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Swiftie Mood Boards</h2>
          <p className="text-white/80">Create and share aesthetic boards inspired by Taylor's eras</p>
        </div>
        <button
          onClick={() => setIsCreating(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl text-white hover:bg-white/30 transition-all duration-300 cursor-pointer"
        >
          <Plus size={18} />
          <span>Create Board</span>
        </button>
      </div>

      {/* Create Board Modal */}
      {isCreating && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="relative w-full max-w-md mx-auto">
            <div className="backdrop-blur-xl bg-gradient-to-br from-white/25 via-white/15 to-white/10 border border-white/30 rounded-3xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">Create Mood Board</h3>
                <button
                  onClick={() => setIsCreating(false)}
                  className="text-white/60 hover:text-white cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-white/80 text-sm mb-2">Board Title</label>
                  <input
                    type="text"
                    value={newBoard.title || ''}
                    onChange={(e) => setNewBoard({ ...newBoard, title: e.target.value })}
                    placeholder="My Era Aesthetic..."
                    className="w-full px-4 py-2 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:border-white/50"
                  />
                </div>
                
                <div>
                  <label className="block text-white/80 text-sm mb-2">Era Theme</label>
                  <select
                    value={newBoard.era || 'midnights'}
                    onChange={(e) => setNewBoard({ ...newBoard, era: e.target.value })}
                    className="w-full px-4 py-2 bg-white/10 border border-white/30 rounded-xl text-white focus:outline-none focus:border-white/50"
                  >
                    {Object.entries(eraThemes).map(([era, theme]) => (
                      <option key={era} value={era} className="bg-gray-800">
                        {era.toUpperCase()} - {theme.aesthetic}
                      </option>
                    ))}
                  </select>
                </div>
                
                <button
                  onClick={handleCreateBoard}
                  disabled={!newBoard.title}
                  className="w-full px-4 py-2 bg-white text-gray-900 rounded-xl font-semibold hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                >
                  Create Board
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mood Boards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {boards.map((board) => {
          const theme = eraThemes[board.era as keyof typeof eraThemes];
          
          return (
            <div
              key={board.id}
              className="group backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl overflow-hidden hover:bg-white/20 hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              {/* Board Canvas */}
              <div className={`relative h-48 bg-gradient-to-br ${theme.bgGradient} p-4`}>
                <div className="absolute inset-4">
                  {board.items.map((item) => (
                    <div
                      key={item.id}
                      className="absolute"
                      style={{
                        left: `${item.position.x}%`,
                        top: `${item.position.y}%`,
                        transform: 'translate(-50%, -50%)'
                      }}
                    >
                      {item.type === 'image' && (
                        <img
                          src={item.content}
                          alt=""
                          className="w-12 h-12 rounded-lg object-cover shadow-lg"
                        />
                      )}
                      {item.type === 'text' && (
                        <span className="text-white text-xs font-medium bg-black/20 px-2 py-1 rounded-full backdrop-blur-sm">
                          {item.content}
                        </span>
                      )}
                      {item.type === 'color' && (
                        <div
                          className="w-6 h-6 rounded-full shadow-lg border-2 border-white/30"
                          style={{ backgroundColor: item.content }}
                        />
                      )}
                    </div>
                  ))}
                </div>
                
                {/* Era Badge */}
                <div className="absolute top-2 right-2">
                  <span className="bg-black/30 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
                    {board.era.toUpperCase()}
                  </span>
                </div>
              </div>
              
              {/* Board Info */}
              <div className="p-4">
                <h3 className="text-white font-semibold mb-2">{board.title}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-white/60 text-sm">by {board.creator}</span>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLike(board.id);
                      }}
                      className="flex items-center space-x-1 cursor-pointer"
                    >
                      <Heart
                        size={16}
                        className={`transition-colors ${
                          board.isLiked ? 'text-red-500 fill-red-500' : 'text-white/60 hover:text-red-500'
                        }`}
                      />
                      <span className="text-white/60 text-sm">{board.likes}</span>
                    </button>
                    <button className="text-white/60 hover:text-white cursor-pointer">
                      <Share2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
