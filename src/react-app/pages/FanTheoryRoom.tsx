import { useEffect, useRef, useState } from 'react';
import { ArrowUp, Heart, MessageCircle } from 'lucide-react';
import { gsap } from 'gsap';
import Navbar from '@/react-app/components/Navbar';

interface Thread {
  id: string;
  title: string;
  content: string;
  category: 'Music Video' | 'Secret Message' | 'Easter Egg';
  votes: number;
  voteType: 'Hearts' | 'Snake Rings';
  comments: Comment[];
  createdAt: string;
}

interface Comment {
  id: string;
  content: string;
  author: string;
  createdAt: string;
}

const FanTheoryRoom: React.FC = () => {
  const threadContainerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [threads, setThreads] = useState<Thread[]>([
    {
      id: '1',
      title: 'TTPD Fortnight Video: Chessboard Symbolism',
      content:
        'The black-and-white chessboard in the "Fortnight" video from TTPD could symbolize a battle of duality. The 13 chess pieces might hint at a July 13, 2025, announcement for TS12. Thoughts?',
      category: 'Music Video',
      votes: 67,
      voteType: 'Hearts',
      comments: [
        {
          id: 'c1',
          content: 'The typewriter font in the video screams poetry! Maybe a book of lyrics is coming?',
          author: 'PoetSwiftie',
          createdAt: '2025-07-17T14:20:00Z',
        },
      ],
      createdAt: '2025-07-16T09:00:00Z',
    },
    {
      id: '2',
      title: 'Reputation TV Easter Eggs in Recent Posts',
      content:
        'Taylor’s recent Instagram post had a snake emoji in the caption 👀. Could this confirm Reputation (Taylor’s Version) dropping in August 2025, aligning with the 2017 album’s anniversary?',
      category: 'Easter Egg',
      votes: 123,
      voteType: 'Snake Rings',
      comments: [],
      createdAt: '2025-07-15T18:45:00Z',
    },
    {
      id: '3',
      title: 'Secret Message in TTPD Album Booklet',
      content:
        'The lyric booklet for TTPD has hidden initials "TS" in the artwork on page 13. Is this a clue for a new single or a secret project tied to her debut album re-release?',
      category: 'Secret Message',
      votes: 45,
      voteType: 'Hearts',
      comments: [
        {
          id: 'c2',
          content: 'I saw that too! Maybe it’s a nod to a debut album re-record!',
          author: 'EasterEggHunter',
          createdAt: '2025-07-16T11:30:00Z',
        },
      ],
      createdAt: '2025-07-15T10:15:00Z',
    },
  ]);

  const [newThread, setNewThread] = useState<Partial<Thread>>({
    title: '',
    content: '',
    category: 'Music Video',
    voteType: 'Hearts',
  });

  const [newComment, setNewComment] = useState<{ [key: string]: string }>({});
  const [commentAuthor, setCommentAuthor] = useState<string>('');

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: -60, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
        }
      );
    }

    if (threadContainerRef.current) {
      const cards = threadContainerRef.current.querySelectorAll('.thread-card');
      gsap.set(cards, {
        opacity: 0,
        y: 60,
        scale: 0.8,
      });
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.2,
      });
    }

    gsap.to('.floating-sparkle', {
      duration: 3,
      y: '-=20',
      x: '+=10',
      rotation: 180,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: 0.4,
    });
  }, [threads]);

  const handleVote = (threadId: string, increment: number): void => {
    setThreads((prev) =>
      prev.map((thread) =>
        thread.id === threadId
          ? { ...thread, votes: thread.votes + increment }
          : thread
      )
    );
  };

  const handleSubmitThread = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!newThread.title || !newThread.content) return;

    const newId = (threads.length + 1).toString();
    setThreads([
      ...threads,
      {
        id: newId,
        title: newThread.title,
        content: newThread.content,
        category: newThread.category as Thread['category'],
        votes: 0,
        voteType: newThread.voteType as Thread['voteType'],
        comments: [],
        createdAt: new Date().toISOString(),
      },
    ]);

    setNewThread({ title: '', content: '', category: 'Music Video', voteType: 'Hearts' });
  };

  const handleSubmitComment = (e: React.FormEvent<HTMLFormElement>, threadId: string): void => {
    e.preventDefault();
    if (!newComment[threadId] || !commentAuthor) return;

    setThreads((prev) =>
      prev.map((thread) =>
        thread.id === threadId
          ? {
              ...thread,
              comments: [
                ...thread.comments,
                {
                  id: `c${thread.comments.length + 1}`,
                  content: newComment[threadId],
                  author: commentAuthor,
                  createdAt: new Date().toISOString(),
                },
              ],
            }
          : thread
      )
    );

    setNewComment((prev) => ({ ...prev, [threadId]: '' }));
    setCommentAuthor('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-red-600">
      <Navbar />
      <div className="pt-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div ref={headerRef} className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Swiftie Fan Theory Haven
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Dive into Taylor Swift's music videos, secret messages, and Easter eggs! Share your theories and vote with Hearts or Snake Rings.
            </p>
          </div>

          <form
            onSubmit={handleSubmitThread}
            className="mb-16 p-8 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-500"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Drop Your Swiftie Theory</h2>
            <input
              type="text"
              placeholder="Your Theory Title"
              value={newThread.title}
              onChange={(e) => setNewThread({ ...newThread, title: e.target.value })}
              className="w-full p-4 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-300"
            />
            <textarea
              placeholder="Share your Swiftie theory..."
              value={newThread.content}
              onChange={(e) => setNewThread({ ...newThread, content: e.target.value })}
              className="w-full p-4 mt-4 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 h-36 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-300"
            />
            <div className="flex gap-4 mt-4">
              <select
                value={newThread.category}
                onChange={(e) => setNewThread({ ...newThread, category: e.target.value as Thread['category'] })}
                className="p-4 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-300"
              >
                <option value="Music Video">Music Video</option>
                <option value="Secret Message">Secret Message</option>
                <option value="Easter Egg">Easter Egg</option>
              </select>
              <select
                value={newThread.voteType}
                onChange={(e) => setNewThread({ ...newThread, voteType: e.target.value as Thread['voteType'] })}
                className="p-4 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-300"
              >
                <option value="Hearts">Hearts</option>
                <option value="Snake Rings">Snake Rings</option>
              </select>
            </div>
            <button
              type="submit"
              className="mt-6 px-8 py-3 bg-white/20 text-white font-semibold rounded-full hover:bg-white/30 transition-all duration-300 relative overflow-hidden"
            >
              Post Your Theory
              <div className="absolute inset-0 bg-white/20 rounded-full h-full w-0 group-hover:w-full transition-all duration-1000" />
            </button>
          </form>

          <div ref={threadContainerRef} className="grid grid-cols-1 gap-8 pb-16">
            {threads.map((thread) => (
              <div key={thread.id} className="thread-card group cursor-pointer">
                <div className="relative overflow-hidden rounded-2xl backdrop-blur-md bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-500 hover:scale-105 hover:-translate-y-2">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-white">{thread.title}</h3>
                      <span className="text-white/60 text-sm font-medium">
                        {new Date(thread.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <span className="text-sm text-white/60 mb-2 block">{thread.category}</span>
                    <p className="text-white/80 text-sm leading-relaxed mb-4">{thread.content}</p>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleVote(thread.id, 1)}
                        className="p-2 hover:bg-white/20 rounded-full transition-all duration-300"
                      >
                        <ArrowUp className="w-6 h-6 text-white" />
                      </button>
                      <span className="flex items-center gap-2 text-sm font-medium text-white">
                        {thread.votes} {thread.voteType === 'Hearts' ? <Heart className="w-5 h-5 text-pink-500" /> : '🐍'}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 border-t border-white/20 pt-4 px-6">
                    <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                      <MessageCircle className="w-5 h-5" /> Comments
                    </h4>
                    {thread.comments.length > 0 ? (
                      thread.comments.map((comment) => (
                        <div
                          key={comment.id}
                          className="p-4 bg-white/10 rounded-lg mb-3"
                        >
                          <p className="text-sm text-white/60 font-medium">
                            {comment.author} • {new Date(comment.createdAt).toLocaleDateString()}
                          </p>
                          <p className="text-white/80 text-sm">{comment.content}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-white/60 text-sm">No comments yet. Be the first to share your thoughts!</p>
                    )}
                    <form
                      onSubmit={(e) => handleSubmitComment(e, thread.id)}
                      className="mt-4 flex flex-col gap-4"
                    >
                      <input
                        type="text"
                        placeholder="Your name"
                        value={commentAuthor}
                        onChange={(e) => setCommentAuthor(e.target.value)}
                        className="p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                      />
                      <textarea
                        placeholder="Add a comment..."
                        value={newComment[thread.id] || ''}
                        onChange={(e) =>
                          setNewComment({ ...newComment, [thread.id]: e.target.value })
                        }
                        className="p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 h-24 focus:outline-none focus:ring-2 focus:ring-white/30"
                      />
                      <button
                        type="submit"
                        className="px-6 py-2 bg-white/20 text-white font-semibold rounded-full hover:bg-white/30 transition-all duration-300"
                      >
                        Post Comment
                      </button>
                    </form>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end">
                    <div className="p-6 w-full">
                      <div className="text-white text-sm font-medium mb-2">Join the discussion</div>
                      <div className="w-full bg-white/20 rounded-full h-1">
                        <div className="h-1 bg-white rounded-full w-0 group-hover:w-full transition-all duration-1000 delay-200" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FanTheoryRoom;