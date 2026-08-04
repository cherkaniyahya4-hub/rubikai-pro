import { motion } from 'framer-motion';
import { BookOpen, GraduationCap, PlayCircle, Sparkles } from 'lucide-react';
import PageShell from '../components/PageShell';

const modules = [
  { title: 'Beginner foundations', level: '01', description: 'Understand notation and basic turning patterns.', progress: '82%' },
  { title: 'Layer progression', level: '02', description: 'Learn the flow toward first-layer confidence.', progress: '61%' },
  { title: 'Advanced inspection', level: '03', description: 'Improve look-ahead and efficient solve planning.', progress: '43%' },
];

export default function LearningPage() {
  return (
    <PageShell
      eyebrow="Learning academy"
      title="Train with curated modules and elegant progress tracking"
      description="Each lesson is framed like a premium coaching experience, with crisp progression and focused next steps."
      stats={[
        { label: 'Current streak', value: '12 days' },
        { label: 'Theory depth', value: '3 levels' },
        { label: 'Weekly focus', value: '2 drills' },
      ]}
      actions={
        <button className="rounded-full border border-violet-400/20 bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-200 transition hover:bg-violet-500/20">
          Resume plan
        </button>
      }
    >
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="rounded-[28px] border border-white/10 bg-gradient-to-br from-slate-900/80 to-slate-950/90 p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-cyan-500/10 p-2 text-cyan-300">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-slate-400">Adaptive coaching</p>
              <h3 className="text-xl font-semibold text-white">A guided path that keeps momentum high</h3>
            </div>
          </div>
          <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-300">
            4 lessons ready
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {modules.map((module) => (
            <div key={module.title} className="rounded-[24px] border border-white/10 bg-slate-950/70 p-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">Module {module.level}</span>
                <BookOpen className="h-4 w-4 text-slate-500" />
              </div>
              <h4 className="mt-3 text-lg font-semibold text-white">{module.title}</h4>
              <p className="mt-2 text-sm leading-6 text-slate-400">{module.description}</p>
              <div className="mt-4 flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-300">
                <span>Progress</span>
                <span className="font-semibold text-white">{module.progress}</span>
              </div>
              <button className="mt-4 flex items-center gap-2 text-sm font-semibold text-cyan-200">
                <PlayCircle className="h-4 w-4" /> Start lesson
              </button>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-[28px] border border-white/10 bg-slate-900/70 p-6">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-violet-500/10 p-2 text-violet-300">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm text-slate-400">Recommended next</p>
            <h3 className="text-xl font-semibold text-white">Layer transitions with clearer look-ahead</h3>
          </div>
        </div>
      </motion.div>
    </PageShell>
  );
}
