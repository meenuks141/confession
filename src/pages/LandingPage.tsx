import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Flower, Shield, Sprout, Heart, Share2, Mail } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex items-center justify-between px-6 md:px-20 py-4 bg-white/50 backdrop-blur-md sticky top-0 z-50 border-b border-primary/10">
        <div className="flex items-center gap-3 text-primary">
          <div className="size-8 flex items-center justify-center bg-primary/10 rounded-full">
            <Flower className="size-5" />
          </div>
          <h2 className="text-xl font-bold tracking-tight">Silent Petals</h2>
        </div>
        <div className="flex items-center gap-8">
          <nav className="hidden md:flex items-center gap-9">
            <Link to="/" className="text-primary transition-colors text-sm font-medium">Home</Link>
            <Link to="/home" className="text-slate-600 hover:text-primary transition-colors text-sm font-medium">Feed</Link>
            <Link to="/about" className="text-slate-600 hover:text-primary transition-colors text-sm font-medium">About</Link>
          </nav>
          <Link to="/home" className="flex min-w-[84px] items-center justify-center rounded-xl h-10 px-5 bg-primary text-white text-sm font-bold tracking-wide hover:bg-primary/90 transition-all shadow-sm">
            Enter Garden
          </Link>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative petal-gradient overflow-hidden">
          <div className="max-w-[1200px] mx-auto px-6 py-12 md:py-24">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col gap-10 items-center justify-center text-center"
            >
              <div className="flex flex-col gap-6 max-w-[800px]">
                <h1 className="text-5xl md:text-7xl font-black leading-tight tracking-tight text-slate-900">
                  Silent Petals
                </h1>
                <p className="text-lg md:text-2xl font-medium max-w-[600px] mx-auto leading-relaxed text-slate-600">
                  Where secrets bloom silently. Share your deepest thoughts in an ethereal, anonymous sanctuary.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/home" className="flex min-w-[200px] items-center justify-center rounded-xl h-14 px-8 bg-primary text-white text-lg font-bold tracking-wide hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-primary/20">
                  Start Confessing
                </Link>
                <Link to="/home" className="flex min-w-[200px] items-center justify-center rounded-xl h-14 px-8 border-2 border-primary/20 text-primary text-lg font-bold tracking-wide hover:bg-primary/5 transition-all">
                  Browse Blooms
                </Link>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="mt-20 md:mt-32 relative"
            >
              <div className="w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-2xl relative">
                <img 
                  alt="Soft pink flower petals scattered" 
                  className="w-full h-full object-cover" 
                  src="https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&q=80&w=1920"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background-light/80 to-transparent"></div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="max-w-[1200px] mx-auto px-6 py-20 flex flex-col gap-16">
          <div className="flex flex-col gap-4 max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
              A Sacred Space for Reflection
            </h2>
            <p className="text-lg text-slate-600">
              We believe some things are meant to be shared without the weight of identity. Our platform is a garden for your unspoken truths.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Shield, title: "Absolute Privacy", desc: "Your secrets are yours. We encrypt everything and never store identifiable data. No accounts required to read." },
              { icon: Sprout, title: "Minimalist Peace", desc: "A distraction-free environment designed to help you focus on the relief of letting go." },
              { icon: Heart, title: "Kind Community", desc: "A community of shared vulnerability. Support others with gentle reactions without words." }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="flex flex-col gap-5 rounded-xl border border-primary/10 bg-white/50 p-8 backdrop-blur-sm hover:border-primary/30 transition-all group"
              >
                <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <feature.icon className="size-6" />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-bold text-slate-900">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="bg-primary/5 py-24">
          <div className="max-w-[800px] mx-auto px-6 text-center flex flex-col gap-8 items-center">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight text-slate-900">
              Release your secret into the garden today.
            </h2>
            <p className="text-xl max-w-xl text-slate-600">
              Join others who have found peace in the silent petals.
            </p>
            <Link to="/home" className="flex min-w-[240px] items-center justify-center rounded-xl h-14 px-8 bg-primary text-white text-lg font-bold tracking-wide hover:shadow-lg hover:shadow-primary/30 transition-all">
              Start Confessing Now
            </Link>
          </div>
        </section>
      </main>

      <footer className="flex flex-col gap-10 px-6 md:px-20 py-16 border-t border-primary/10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-3 text-primary">
              <Flower className="size-6" />
              <span className="text-lg font-bold text-slate-900">Silent Petals</span>
            </div>
            <p className="text-slate-500 text-sm max-w-[280px] text-center md:text-left">
              A peaceful corner of the internet for anonymous self-expression.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-8">
            <a href="#" className="text-slate-600 hover:text-primary text-sm font-medium transition-colors">Terms of Service</a>
            <a href="#" className="text-slate-600 hover:text-primary text-sm font-medium transition-colors">Privacy Policy</a>
            <a href="#" className="text-slate-600 hover:text-primary text-sm font-medium transition-colors">Support</a>
          </div>
          <div className="flex gap-5">
            <a href="#" className="size-10 rounded-full bg-primary/5 flex items-center justify-center text-slate-600 hover:bg-primary/10 hover:text-primary transition-all">
              <Share2 className="size-5" />
            </a>
            <a href="#" className="size-10 rounded-full bg-primary/5 flex items-center justify-center text-slate-600 hover:bg-primary/10 hover:text-primary transition-all">
              <Mail className="size-5" />
            </a>
          </div>
        </div>
        <div className="text-center pt-8 border-t border-slate-200">
          <p className="text-slate-500 text-xs">
            © 2024 Silent Petals. Designed for tranquility. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
