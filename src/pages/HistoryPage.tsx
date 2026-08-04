import { motion } from 'framer-motion';
import { Clock3, Trophy } from 'lucide-react';
import PageShell from '../components/PageShell';

const history = [
  { time: '44.2s', title: 'Cross training', date: 'Today', note: 'Fast recognition on a fresh scramble' },
  { time: '51.4s', title: 'Beginner flow', date: 'Yesterday', note: 'Improved first-layer transitions' },
  { time: '57.8s', title: 'Scramble burst', date: '2 days ago', note: 'Balanced inspection and execution' },
];

export default function HistoryPage() {
  return (
    <PageShell
      eyebrow="Session history"
      title="Recent sessions stay saved locally"
      description="A refined archive of your most meaningful solve moments, ready for review whenever you need momentum."
      stats={[
        { label: 'Best run', value: '44.2s' },
        { label: 'Sessions', value: '24' },
        { label: 'Consistency', value: '91%' },
      ]}
      actions={
        <button className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-200 transition hover:bg-emerald-500/20">
          Clear archive
        </button>
      }
    >
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-[28px] border border-white/10 bg-slate-900/70 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-400">Recent performance</p>
            <h3 className="text-xl font-semibold text-white">A calm, searchable look at your progress</h3>
          </div>
          <div className="rounded-2xl bg-emerald-500/10 p-2 text-emerald-300">
            <Trophy className="h-5 w-5" />
          </div>
        </div>
        <div className="mt-6 space-y-3">
          {history.map((item) => (
            <div key={item.title} className="flex flex-col gap-3 rounded-[20px] border border-white/10 bg-slate-950/70 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-semibold text-white">{item.title}</p>
                <p className="mt-1 text-sm text-slate-400">{item.note}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.25em] text-slate-500">{item.date}</p>
              </div>
              <div className="flex items-center gap-2 text-cyan-200">
                <Clock3 className="h-4 w-4" />
                <span>{item.time}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </PageShell>
  );
}
