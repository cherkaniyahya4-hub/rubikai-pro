import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';
import PageShell from '../components/PageShell';

export default function SettingsPage() {
  return (
    <PageShell
      eyebrow="Workspace settings"
      title="Personalize your studio"
      description="Fine-tune how your experience feels, behaves, and persists across sessions."
      stats={[
        { label: 'Mode', value: 'Dark' },
        { label: 'Storage', value: 'Local' },
        { label: 'Privacy', value: 'Private' },
      ]}
      actions={
        <button className="rounded-full border border-slate-700 bg-slate-800/80 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-700">
          Save changes
        </button>
      }
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="rounded-[28px] border border-white/10 bg-slate-900/70 p-6">
          <p className="text-sm text-slate-400">Appearance</p>
          <div className="mt-4 space-y-3 text-sm text-slate-300">
            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-3 py-3">
              <span>Dark mode default</span>
              <span className="text-cyan-200">On</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-3 py-3">
              <span>Glassmorphism enabled</span>
              <span className="text-cyan-200">On</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-3 py-3">
              <span>Animation intensity</span>
              <span className="text-cyan-200">Balanced</span>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-[28px] border border-white/10 bg-gradient-to-br from-slate-900/80 to-slate-950/90 p-6">
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <ShieldCheck className="h-4 w-4" /> Persistence
          </div>
          <p className="mt-3 text-sm leading-6 text-slate-300">Preferences and history are stored locally for a seamless private experience, with no mandatory account sign-in required.</p>
          <div className="mt-6 rounded-[24px] border border-emerald-400/10 bg-emerald-500/10 p-4 text-sm text-emerald-200">
            Your preferences and recent sessions remain available on this device.
          </div>
        </motion.div>
      </div>
    </PageShell>
  );
}
