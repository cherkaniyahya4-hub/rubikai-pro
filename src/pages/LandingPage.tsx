import { motion } from 'framer-motion';
import { ArrowRight, Play, Sparkles, Zap } from 'lucide-react';
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
        className="overflow-hidden rounded-[36px] border border-white/10 bg-[linear-gradient(135deg,rgba(15,23,42,0.88),rgba(2,6,23,0.92))] p-8 shadow-[0_30px_90px_rgba(15,23,42,0.55)] backdrop-blur-2xl"
      >
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-1 text-sm font-medium text-cyan-200">
              <Sparkles className="h-4 w-4" /> AI-powered scanning and solving
            </div>
            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              The most premium way to scan and solve a cube.
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-400">
              Capture the six faces of a real cube, reconstruct the state instantly, and follow a beautiful solve path from photo to solution.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/solver" className="rounded-2xl bg-gradient-to-r from-cyan-500 via-sky-500 to-violet-500 px-5 py-3 font-semibold text-white shadow-[0_20px_50px_rgba(79,140,255,0.24)] transition hover:scale-[1.01]">
                Open scanner
              </Link>
              <Link to="/dashboard" className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 font-semibold text-slate-200 transition hover:bg-white/10">
                View analytics
              </Link>
            </div>
          </div>
          <div className="rounded-[28px] border border-white/10 bg-gradient-to-br from-white/10 to-slate-800/80 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Workflow</p>
                <p className="text-xl font-semibold text-white">Photo to solve</p>
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
            <div className="mt-4 flex items-center gap-2 rounded-2xl border border-violet-400/20 bg-violet-500/10 px-3 py-3 text-sm text-violet-100">
              <Zap className="h-4 w-4" /> Real-time guidance and premium replay built in.
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
