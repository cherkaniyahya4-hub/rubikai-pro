import { motion } from 'framer-motion';
import { Shuffle, Sparkles } from 'lucide-react';
import { useMemo, useState } from 'react';

const scramblePool = ['R U R\' U\'', 'L U\' L\' U', 'F R U R\' U\' F\'', 'M2 U M2 U2 M2 U M2'];

export default function ScramblePage() {
  const [scramble, setScramble] = useState(scramblePool[0]);

  const randomScramble = useMemo(() => scramble, [scramble]);

  return (
    <div className="space-y-6 py-2">
      <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-[28px] border border-white/10 bg-slate-900/70 p-6 shadow-glow backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-400">Scramble generator</p>
            <h2 className="text-2xl font-semibold text-white">Generate fresh patterns in one tap</h2>
          </div>
          <div className="rounded-2xl bg-cyan-500/10 p-2 text-cyan-300">
            <Shuffle className="h-5 w-5" />
          </div>
        </div>

        <div className="mt-6 rounded-[24px] border border-white/10 bg-slate-950/70 p-6">
          <div className="mb-4 flex items-center gap-2 text-sm text-slate-400">
            <Sparkles className="h-4 w-4" /> Current scramble
          </div>
          <p className="text-2xl font-semibold text-white">{randomScramble}</p>
          <button
            onClick={() => setScramble(scramblePool[Math.floor(Math.random() * scramblePool.length)])}
            className="mt-6 rounded-2xl bg-gradient-to-r from-accent-blue to-accent-purple px-4 py-3 font-semibold text-white"
          >
            New scramble
          </button>
        </div>
      </motion.section>
    </div>
  );
}
