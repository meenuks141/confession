import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Flower, Heart, Shield, Sprout, Leaf } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background-light">
      <header className="flex items-center justify-between px-6 md:px-20 py-4 bg-white/50 backdrop-blur-md sticky top-0 z-50 border-b border-primary/10">
        <Link to="/" className="flex items-center gap-3 text-primary">
          <div className="size-8 flex items-center justify-center bg-primary/10 rounded-full">
            <Flower className="size-5" />
          </div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900">Silent Petals</h2>
        </Link>
        <nav className="flex items-center gap-8">
          <Link to="/" className="text-slate-600 hover:text-primary transition-colors text-sm font-medium">Home</Link>
          <Link to="/home" className="text-slate-600 hover:text-primary transition-colors text-sm font-medium">Feed</Link>
          <Link to="/about" className="text-primary text-sm font-medium">About</Link>
        </nav>
      </header>

      <main className="flex-1 max-w-[800px] mx-auto px-6 py-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-12"
        >
          <div className="flex flex-col gap-6">
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
              Our Philosophy
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              Silent Petals was born from a simple observation: the internet has become a place of performance. Every thought is tied to a profile, every word is judged by an audience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="flex flex-col gap-4">
              <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <Shield className="size-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">True Anonymity</h3>
              <p className="text-slate-600">
                We don't just hide your name; we don't even ask for it. No profiles, no tracking, no footprints. Just your thoughts, released into the garden.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <Sprout className="size-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Emotional Safety</h3>
              <p className="text-slate-600">
                By removing comments and timestamps, we remove the pressure of engagement. Silent Petals is a place for release, not for debate.
              </p>
            </div>
          </div>

          <div className="bg-white p-10 rounded-2xl border border-primary/10 shadow-sm flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-slate-900">Why "Silent Petals"?</h2>
            <p className="text-slate-600 leading-relaxed italic">
              "Like a petal falling in a quiet garden, a confession should be gentle, beautiful, and eventually return to the earth. It doesn't need to make a sound to be significant."
            </p>
            <div className="flex items-center gap-2 text-primary font-medium">
              <Heart className="size-5 fill-primary" />
              <span>Built for tranquility</span>
            </div>
          </div>

          <div className="flex justify-center pt-10">
            <Link to="/home" className="flex min-w-[200px] items-center justify-center rounded-xl h-14 px-8 bg-primary text-white text-lg font-bold tracking-wide hover:scale-[1.02] transition-all shadow-lg shadow-primary/20">
              Enter the Garden
            </Link>
          </div>
        </motion.div>
      </main>

      <footer className="py-10 flex flex-col items-center gap-4 opacity-40 border-t border-primary/10">
        <Leaf className="text-primary size-8" />
        <p className="text-xs tracking-widest uppercase font-sans">The petals fall in silence</p>
      </footer>
    </div>
  );
}
