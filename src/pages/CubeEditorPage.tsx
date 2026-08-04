import { useState } from 'react';
import { motion } from 'framer-motion';
import { RotateCw, Sparkles } from 'lucide-react';

const faces = ['U', 'L', 'F', 'R', 'B', 'D'];

export default function CubeEditorPage() {
  const [selectedFace, setSelectedFace] = useState('F');

  return (
    <div className="space-y-6 py-2">
      <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-[28px] border border-white/10 bg-slate-900/70 p-6 shadow-glow backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-400">Cube editor</p>
            <h2 className="text-2xl font-semibold text-white">Shape your ideal scramble state</h2>
          </div>
          <div className="rounded-2xl bg-purple-500/10 p-2 text-purple-300">
            <Sparkles className="h-5 w-5" />
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          {faces.map((face) => (
            <button key={face} onClick={() => setSelectedFace(face)} className={`rounded-2xl px-4 py-3 text-sm font-semibold ${selectedFace === face ? 'bg-white/15 text-white' : 'bg-white/5 text-slate-300'}`}>
              {face}
            </button>
          ))}
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-[24px] border border-white/10 bg-slate-950/70 p-5">
            <div className="mb-3 flex items-center gap-2 text-sm text-slate-400">
              <RotateCw className="h-4 w-4" /> Active face
            </div>
            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-500/10 to-fuchsia-500/10 p-6 text-center text-3xl font-semibold text-white">{selectedFace}</div>
          </div>
          <div className="rounded-[24px] border border-white/10 bg-slate-950/70 p-5">
            <p className="text-sm text-slate-400">Editor toolkit</p>
            <div className="mt-3 space-y-3">
              {['Rotate face', 'Mirror state', 'Randomize', 'Save preset'].map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/5 px-3 py-3 text-sm text-slate-300">{item}</div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
