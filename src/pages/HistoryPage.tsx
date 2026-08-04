import { motion } from 'framer-motion';
import { Clock3, Trophy } from 'lucide-react';

const history = [
  { time: '44.2s', title: 'Cross training', date: 'Today' },
  { time: '51.4s', title: 'Beginner flow', date: 'Yesterday' },
  { time: '57.8s', title: 'Scramble burst', date: '2 days ago' },
];

export default function HistoryPage() {
  return (
    <div className="space-y-6 py-2">
      <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-[28px] border border-white/10 bg-slate-900/70 p-6 shadow-glow backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-400">History</p>
            <h2 className="text-2xl font-semibold text-white">Recent sessions stay saved locally</h2>
          </div>
          <div className="rounded-2xl bg-emerald-500/10 p-2 text-emerald-300">
            <Trophy className="h-5 w-5" />
          </div>
        </div>
        <div className="mt-6 space-y-3">
          {history.map((item) => (
            <div key={item.title} className="flex items-center justify-between rounded-[20px] border border-white/10 bg-slate-950/70 px-4 py-4">
              <div>
                <p className="font-semibold text-white">{item.title}</p>
                <p className="text-sm text-slate-400">{item.date}</p>
              </div>
              <div className="flex items-center gap-2 text-cyan-200">
                <Clock3 className="h-4 w-4" />
                <span>{item.time}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
