import { useState } from 'react';
import { Heart, MessageCircle, Share, MoreHorizontal } from 'lucide-react';
import Navbar from '@/react-app/components/Navbar';
import MoodBoard from '@/react-app/components/MoodBoard';
import EasterEggHunt from '@/react-app/components/EasterEggHunt';

interface Story {
  id: string;
  username: string;
  avatar: string;
  image: string;
  isViewed: boolean;
}

interface Post {
  id: string;
  username: string;
  avatar: string;
  image: string;
  caption: string;
  likes: number;
  comments: number;
  isLiked: boolean;
  timeAgo: string;
  era: string;
}

const stories: Story[] = [
  {
    id: '1',
    username: 'swiftie_forever',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332b044?w=150&h=150&fit=crop&crop=face',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=600&fit=crop',
    isViewed: false
  },
  {
    id: '2',
    username: 'taylor_era_13',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    image: 'https://images.unsplash.com/photo-1614624532983-4ce03382d63d?w=400&h=600&fit=crop',
    isViewed: true
  },
  {
    id: '3',
    username: 'folklore_vibes',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=600&fit=crop',
    isViewed: false
  }
];

const posts: Post[] = [
  {
    id: '1',
    username: 'swiftie_forever',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332b044?w=150&h=150&fit=crop&crop=face',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=600&fit=crop',
    caption: 'Shaking off the bad vibes with this 1989 masterpiece! ✨ #ShakeItOff #1989Era',
    likes: 1547,
    comments: 89,
    isLiked: false,
    timeAgo: '2 hours ago',
    era: '1989'
  },
  {
    id: '2',
    username: 'reputation_stan',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    image: 'https://images.unsplash.com/photo-1614624532983-4ce03382d63d?w=600&h=600&fit=crop',
    caption: 'Look what you made me do... fall in love with this era all over again 🖤 #ReputationEra #LWYMMD',
    likes: 2341,
    comments: 156,
    isLiked: true,
    timeAgo: '4 hours ago',
    era: 'Reputation'
  },
  {
    id: '3',
    username: 'folklore_vibes',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=600&fit=crop',
    caption: 'Cardigan weather is here and I am living for it 🍂 The storytelling in folklore is unmatched',
    likes: 987,
    comments: 67,
    isLiked: false,
    timeAgo: '6 hours ago',
    era: 'Folklore'
  },
  {
    id: '4',
    username: 'midnights_lover',
    avatar: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=150&h=150&fit=crop&crop=face',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=600&fit=crop',
    caption: 'It\'s me, hi, I\'m the problem, it\'s me 🌙 Midnights hits different at 3am',
    likes: 3456,
    comments: 234,
    isLiked: true,
    timeAgo: '8 hours ago',
    era: 'Midnights'
  }
];

export default function Social() {
  const [feedPosts, setFeedPosts] = useState(posts);
  const [feedStories, setFeedStories] = useState(stories);
  const [activeTab, setActiveTab] = useState('feed');

  const handleLike = (postId: string) => {
    setFeedPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1
            }
          : post
      )
    );
  };

  const handleStoryView = (storyId: string) => {
    setFeedStories(prevStories =>
      prevStories.map(story =>
        story.id === storyId ? { ...story, isViewed: true } : story
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-red-600">
      <Navbar />
      <EasterEggHunt />
      
      <div className="pt-20 pb-8">
        <div className="max-w-6xl mx-auto px-4">
          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-2">
              <div className="flex space-x-2">
                <button
                  onClick={() => setActiveTab('feed')}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 cursor-pointer ${
                    activeTab === 'feed'
                      ? 'bg-white text-gray-900'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  SwiftFeed
                </button>
                <button
                  onClick={() => setActiveTab('moods')}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 cursor-pointer ${
                    activeTab === 'moods'
                      ? 'bg-white text-gray-900'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  Mood Boards
                </button>
              </div>
            </div>
          </div>

          {activeTab === 'moods' ? (
            <MoodBoard />
          ) : (
            <div className="max-w-md mx-auto">
              {/* Stories Section */}
              <div className="mb-8">
                <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
                  {feedStories.map((story) => (
                    <div
                      key={story.id}
                      className="flex-shrink-0 cursor-pointer"
                      onClick={() => handleStoryView(story.id)}
                    >
                      <div
                        className={`w-16 h-16 rounded-full p-0.5 ${
                          story.isViewed
                            ? 'bg-gray-300'
                            : 'bg-gradient-to-r from-purple-500 to-pink-500'
                        }`}
                      >
                        <img
                          src={story.avatar}
                          alt={story.username}
                          className="w-full h-full rounded-full object-cover border-2 border-white"
                        />
                      </div>
                      <p className="text-white text-xs text-center mt-1 truncate w-16">
                        {story.username}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Posts Feed */}
              <div className="space-y-6">
                {feedPosts.map((post) => (
                  <div
                    key={post.id}
                    className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl overflow-hidden"
                  >
                    {/* Post Header */}
                    <div className="flex items-center justify-between p-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={post.avatar}
                          alt={post.username}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <p className="text-white font-semibold text-sm">
                            {post.username}
                          </p>
                          <p className="text-white/60 text-xs">{post.timeAgo}</p>
                        </div>
                      </div>
                      <button className="text-white/60 hover:text-white cursor-pointer">
                        <MoreHorizontal size={20} />
                      </button>
                    </div>

                    {/* Post Image */}
                    <div className="relative">
                      <img
                        src={post.image}
                        alt="Post"
                        className="w-full aspect-square object-cover"
                      />
                      <div className="absolute top-4 right-4">
                        <span className="bg-black/50 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
                          {post.era}
                        </span>
                      </div>
                    </div>

                    {/* Post Actions */}
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-4">
                          <button
                            onClick={() => handleLike(post.id)}
                            className="cursor-pointer transition-transform hover:scale-110"
                          >
                            <Heart
                              size={24}
                              className={`transition-colors ${
                                post.isLiked
                                  ? 'text-red-500 fill-red-500'
                                  : 'text-white hover:text-red-500'
                              }`}
                            />
                          </button>
                          <button className="text-white hover:text-gray-300 cursor-pointer">
                            <MessageCircle size={24} />
                          </button>
                          <button className="text-white hover:text-gray-300 cursor-pointer">
                            <Share size={24} />
                          </button>
                        </div>
                      </div>

                      {/* Likes Count */}
                      <p className="text-white font-semibold text-sm mb-2">
                        {post.likes.toLocaleString()} likes
                      </p>

                      {/* Caption */}
                      <p className="text-white text-sm leading-relaxed mb-2">
                        <span className="font-semibold">{post.username}</span>{' '}
                        {post.caption}
                      </p>

                      {/* Comments */}
                      <button className="text-white/60 text-sm hover:text-white cursor-pointer">
                        View all {post.comments} comments
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
