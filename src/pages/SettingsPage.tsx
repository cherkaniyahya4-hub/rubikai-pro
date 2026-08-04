import { motion } from 'framer-motion';
import { Settings2, ShieldCheck } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="space-y-6 py-2">
      <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-[28px] border border-white/10 bg-slate-900/70 p-6 shadow-glow backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-400">Settings</p>
            <h2 className="text-2xl font-semibold text-white">Personalize your workspace</h2>
          </div>
          <div className="rounded-2xl bg-indigo-500/10 p-2 text-indigo-300">
            <Settings2 className="h-5 w-5" />
          </div>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-[24px] border border-white/10 bg-slate-950/70 p-5">
            <p className="text-sm text-slate-400">Appearance</p>
            <div className="mt-3 space-y-2 text-sm text-slate-300">
              <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-3">Dark mode default</div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-3">Glassmorphism enabled</div>
            </div>
          </div>
          <div className="rounded-[24px] border border-white/10 bg-slate-950/70 p-5">
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <ShieldCheck className="h-4 w-4" /> Persistence
            </div>
            <p className="mt-3 text-sm text-slate-300">Preferences and history are stored locally for a seamless private experience.</p>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
