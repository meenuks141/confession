import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Flower, Heart, Smile, ChevronDown, Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

const EMOJIS = ['🌸', '✨', '🌙', '🍃', '☁️', '🤍', '🕊️', '🌿', '🥀', '🌊', '🕯️', '💭'];

interface Confession {
  id: string;
  message: string;
  likes_count: number;
  created_at: string;
  has_liked: boolean;
}

interface HomePageProps {
  userId: string;
}

export default function HomePage({ userId }: HomePageProps) {
  const [confessions, setConfessions] = useState<Confession[]>([]);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  
  const emojiPickerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    fetchConfessions();

    const handleClickOutside = (event: MouseEvent) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target as Node)) {
        setShowEmojiPicker(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchConfessions = async () => {
    try {
      const res = await fetch(`/api/confessions?userId=${userId}`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setConfessions(data);
      } else {
        console.error('Received non-array data:', data);
        setConfessions([]);
      }
    } catch (error) {
      console.error('Failed to fetch confessions');
      setConfessions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/confessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });
      if (res.ok) {
        const newConfession = await res.json();
        setConfessions([newConfession, ...confessions]);
        setMessage('');
      }
    } catch (error) {
      console.error('Failed to post confession');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLike = async (id: string) => {
    try {
      const res = await fetch(`/api/confessions/${id}/like`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });
      if (res.ok) {
        const updated = await res.json();
        setConfessions(confessions.map(c => c.id === id ? { ...c, ...updated } : c));
      }
    } catch (error) {
      console.error('Failed to like');
    }
  };

  const addEmoji = (emoji: string) => {
    if (!textareaRef.current) {
      setMessage(prev => prev + emoji);
    } else {
      const start = textareaRef.current.selectionStart;
      const end = textareaRef.current.selectionEnd;
      const text = message;
      const before = text.substring(0, start);
      const after = text.substring(end, text.length);
      setMessage(before + emoji + after);
      
      // Reset focus and cursor position after state update
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.focus();
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + emoji.length;
        }
      }, 0);
    }
    setShowEmojiPicker(false);
  };

  return (
    <div className="min-h-screen bg-background-light flex flex-col">
      <header className="flex items-center justify-between border-b border-primary/10 px-6 md:px-20 py-4 bg-background-light sticky top-0 z-50">
        <Link to="/" className="flex items-center gap-3 text-primary">
          <Flower className="size-7" />
          <h2 className="text-xl font-bold tracking-tight text-slate-900 font-sans">Silent Petals</h2>
        </Link>
        <div className="flex items-center gap-6">
          <nav className="flex items-center gap-8">
            <Link to="/" className="text-slate-600 text-sm font-medium hover:text-primary transition-colors">Home</Link>
            <Link to="/home" className="text-primary text-sm font-medium">Feed</Link>
            <Link to="/about" className="text-slate-600 text-sm font-medium hover:text-primary transition-colors">About</Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 flex justify-center py-10 px-4 md:px-0">
        <div className="flex flex-col max-w-[720px] flex-1 gap-8">
          <div className="text-center space-y-2 mb-4">
            <h1 className="text-slate-900 tracking-tight text-4xl font-bold font-sans">Whisper into the void</h1>
            <p className="text-slate-500 text-base font-normal">A safe space for your quietest thoughts.</p>
          </div>

          {/* Submission Area */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl border border-primary/10 shadow-sm p-1 overflow-hidden"
          >
            <form onSubmit={handleSubmit} className="flex flex-col">
              <textarea 
                ref={textareaRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full min-h-[160px] resize-none border-none bg-transparent focus:ring-0 text-slate-800 placeholder:text-slate-400 confession-text text-xl p-6 leading-relaxed" 
                placeholder="Let it out..."
                maxLength={1000}
              />
              <div className="flex items-center justify-between px-6 py-4 bg-soft-pink/30 border-t border-primary/5">
                <div className="flex gap-4 items-center relative">
                  <div className="relative" ref={emojiPickerRef}>
                    <button 
                      type="button" 
                      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                      className="text-primary/60 hover:text-primary transition-colors"
                    >
                      <Smile className="size-5" />
                    </button>
                    <AnimatePresence>
                      {showEmojiPicker && (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.9, y: 10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.9, y: 10 }}
                          className="absolute bottom-full left-0 mb-2 p-2 bg-white rounded-xl border border-primary/10 shadow-xl grid grid-cols-4 gap-2 z-50"
                        >
                          {EMOJIS.map(emoji => (
                            <button
                              key={emoji}
                              type="button"
                              onClick={() => addEmoji(emoji)}
                              className="size-8 flex items-center justify-center hover:bg-primary/5 rounded-lg transition-colors text-lg"
                            >
                              {emoji}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <span className={cn(
                    "text-xs font-medium",
                    message.length > 900 ? "text-primary" : "text-slate-400"
                  )}>
                    {message.length}/1000
                  </span>
                </div>
                <button 
                  type="submit"
                  disabled={!message.trim() || isSubmitting}
                  className={cn(
                    "flex min-w-[100px] items-center justify-center rounded-full h-10 px-6 bg-primary text-white text-sm font-bold shadow-md transition-all active:scale-95",
                    (!message.trim() || isSubmitting) && "opacity-50 cursor-not-allowed"
                  )}
                >
                  {isSubmitting ? "Posting..." : "Post"}
                </button>
              </div>
            </form>
          </motion.div>

          {/* Feed */}
          <div className="flex flex-col gap-6 mt-4">
            <AnimatePresence mode="popLayout">
              {loading ? (
                <div className="text-center py-20 text-slate-400 italic">Gathering petals...</div>
              ) : confessions.length === 0 ? (
                <div className="text-center py-20 text-slate-400 italic">The garden is quiet. Be the first to whisper.</div>
              ) : (
                confessions.map((confession) => (
                  <motion.div 
                    key={confession.id}
                    layout
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    className="bg-white rounded-xl border border-primary/10 shadow-sm hover:shadow-md transition-shadow group overflow-hidden"
                  >
                    <div className="p-8">
                      <p className="text-slate-800 confession-text text-lg md:text-xl leading-relaxed">
                        "{confession.message}"
                      </p>
                      <div className="mt-6 flex justify-end items-center">
                        <button 
                          onClick={() => handleLike(confession.id)}
                          className="flex items-center gap-2 group/heart"
                        >
                          <Heart className="size-5 text-primary group-hover/heart:fill-primary/20 transition-all" />
                          <span className="text-sm font-medium text-slate-500">{confession.likes_count}</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>

          <div className="flex justify-center py-10">
            <button className="text-primary font-medium text-sm flex items-center gap-2 hover:underline">
              <span>Breathe in more</span>
              <ChevronDown className="size-4" />
            </button>
          </div>
        </div>
      </main>

      <footer className="py-10 flex flex-col items-center gap-4 opacity-40">
        <Leaf className="text-primary size-8" />
        <p className="text-xs tracking-widest uppercase font-sans">The petals fall in silence</p>
      </footer>
    </div>
  );
}
