import { motion } from 'framer-motion';
import { Activity, BrainCircuit, Clock3, Sparkle, TrendingUp } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import PageShell from '../components/PageShell';

const points = [
  { name: 'Mon', score: 72 },
  { name: 'Tue', score: 78 },
  { name: 'Wed', score: 84 },
  { name: 'Thu', score: 81 },
  { name: 'Fri', score: 91 },
  { name: 'Sat', score: 88 },
  { name: 'Sun', score: 95 },
];

export default function DashboardPage() {
  return (
    <PageShell
      eyebrow="Performance intelligence"
      title="Your scan-to-solve pipeline is improving every week"
      description="A premium command center for recognition quality, learning rhythm, and solver momentum."
      stats={[
        { label: 'Scan quality', value: '97%' },
        { label: 'Training streak', value: '7 days' },
        { label: 'AI roadmap', value: '3 modules' },
      ]}
      actions={
        <button className="rounded-full border border-cyan-400/20 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-200 transition hover:bg-cyan-500/20">
          Export brief
        </button>
      }
    >
      <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="rounded-[28px] border border-white/10 bg-slate-900/70 p-6 shadow-[0_20px_60px_rgba(4,13,28,0.45)] backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Visionary analytics</p>
              <h3 className="mt-2 text-2xl font-semibold text-white">Weekly solve confidence</h3>
            </div>
            <div className="rounded-2xl bg-emerald-500/10 p-2 text-emerald-300">
              <TrendingUp className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-6 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={points}>
                <CartesianGrid stroke="rgba(255,255,255,0.08)" />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Line type="monotone" dataKey="score" stroke="#4f8cff" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="rounded-[28px] border border-cyan-400/10 bg-gradient-to-br from-cyan-500/15 to-violet-500/15 p-6 backdrop-blur-xl">
          <div className="flex items-center gap-2 text-sm text-cyan-200">
            <Sparkle className="h-4 w-4" /> Live scan readiness
          </div>
          <h3 className="mt-3 text-2xl font-semibold text-white">92% recognition accuracy</h3>
          <p className="mt-2 text-sm leading-6 text-slate-300">Your latest scans are producing clean reconstructions and faster solve generation.</p>
          <div className="mt-6 space-y-3 text-sm text-slate-300">
            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/60 px-3 py-3">
              <span>Scans today</span>
              <span className="font-semibold text-white">18</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/60 px-3 py-3">
              <span>Avg. solve time</span>
              <span className="font-semibold text-white">1m 12s</span>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {[
          { title: 'Recognition quality', value: '97%', icon: Activity },
          { title: 'Focus block', value: '7 days', icon: Clock3 },
          { title: 'Next milestone', value: '3 modules', icon: BrainCircuit },
        ].map(({ title, value, icon: Icon }) => (
          <div key={title} className="rounded-[24px] border border-white/10 bg-slate-950/60 p-5 backdrop-blur-xl">
            <div className="flex items-center gap-2 text-slate-400">
              <Icon className="h-4 w-4" />
              <span className="text-sm">{title}</span>
            </div>
            <p className="mt-3 text-2xl font-semibold text-white">{value}</p>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
