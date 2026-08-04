import { motion } from 'framer-motion';
import { ScanEye, Sparkles } from 'lucide-react';
import PageShell from '../components/PageShell';

export default function ArPage() {
  const supported = typeof window !== 'undefined' && 'xr' in navigator;

  return (
    <PageShell
      eyebrow="Augmented reality ready"
      title="Prepare the cube for future WebXR overlays"
      description="The architecture is ready for move arrows, live guidance, and contextual overlays over the real cube."
      stats={[
        { label: 'WebXR', value: supported ? 'Ready' : 'Pending' },
        { label: 'Overlay', value: 'Move arrows' },
        { label: 'Mode', value: 'Future proof' },
      ]}
      actions={
        <button className="rounded-full border border-violet-400/20 bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-200 transition hover:bg-violet-500/20">
          Enable preview
        </button>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="rounded-[28px] border border-white/10 bg-slate-900/70 p-6">
          <div className="flex items-center gap-2 text-sm text-cyan-200">
            <ScanEye className="h-4 w-4" /> AR architecture
          </div>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            This experience is designed to support future WebXR sessions with spatial anchors, move guidance, and immersive cube coaching.
          </p>
          <div className="mt-5 rounded-[24px] border border-white/10 bg-slate-950/70 p-4 text-sm text-slate-300">
            {supported ? 'Your browser exposes WebXR support, making a native overlay path straightforward.' : 'WebXR is not available in this environment yet, but the experience is prepared for it.'}
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-[28px] border border-white/10 bg-gradient-to-br from-cyan-500/10 to-violet-500/10 p-6">
          <div className="flex items-center gap-2 text-sm text-cyan-200">
            <Sparkles className="h-4 w-4" /> Preview state
          </div>
          <h3 className="mt-3 text-2xl font-semibold text-white">Professional placeholder</h3>
          <p className="mt-2 text-sm leading-6 text-slate-300">When WebXR is available, the app can overlay move arrows across the physical cube and guide learners in real time.</p>
        </motion.div>
      </div>
    </PageShell>
  );
}
