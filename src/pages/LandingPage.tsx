import { motion } from 'framer-motion';
import { ArrowRight, Play, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const cards = [
  'Scan six faces from photos',
  'AI cube reconstruction',
  'Instant solve generation',
  'Interactive 3D replay',
];

export default function LandingPage() {
  return (
    <div className="space-y-6 py-2">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="overflow-hidden rounded-[32px] border border-white/10 bg-slate-900/70 p-8 shadow-glow backdrop-blur-xl"
      >
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-1 text-sm text-cyan-200">
              <Sparkles className="h-4 w-4" /> AI-powered scanning and solving
            </div>
            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Scan your cube. Solve it instantly.
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-slate-400">
              Capture the six faces of a real cube, reconstruct the state, and get a premium solve path in seconds.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/solver" className="rounded-2xl bg-gradient-to-r from-accent-blue to-accent-purple px-5 py-3 font-semibold text-white shadow-lg shadow-blue-500/20">
                Open scanner
              </Link>
              <Link to="/dashboard" className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 font-semibold text-slate-200">
                View analytics
              </Link>
            </div>
          </div>
          <div className="rounded-[28px] border border-white/10 bg-gradient-to-br from-white/10 to-slate-800/80 p-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Workflow</p>
                <p className="text-xl font-semibold">Photo to solve</p>
              </div>
              <div className="rounded-2xl border border-cyan-400/20 bg-cyan-500/10 p-2">
                <Play className="h-5 w-5 text-cyan-300" />
              </div>
            </div>
            <div className="space-y-3">
              {cards.map((item) => (
                <div key={item} className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-slate-300">
                  <span>{item}</span>
                  <ArrowRight className="h-4 w-4 text-slate-500" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          ['6', 'faces scanned'],
          ['94%', 'reconstruction accuracy'],
          ['4.9/5', 'solver quality'],
        ].map(([value, label]) => (
          <div key={label} className="rounded-[24px] border border-white/10 bg-slate-900/70 p-5 backdrop-blur-xl">
            <p className="text-3xl font-semibold text-white">{value}</p>
            <p className="mt-1 text-sm text-slate-400">{label}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
