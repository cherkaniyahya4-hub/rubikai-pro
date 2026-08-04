import { motion } from 'framer-motion';
import { BookOpen, GraduationCap, PlayCircle } from 'lucide-react';

const modules = [
  { title: 'Beginner foundations', level: '01', description: 'Understand notation and basic turning patterns.' },
  { title: 'Layer progression', level: '02', description: 'Learn the flow toward first-layer confidence.' },
  { title: 'Advanced inspection', level: '03', description: 'Improve look-ahead and efficient solve planning.' },
];

export default function LearningPage() {
  return (
    <div className="space-y-6 py-2">
      <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-[28px] border border-white/10 bg-slate-900/70 p-6 shadow-glow backdrop-blur-xl">
        <div className="flex items-center gap-2 text-sm text-cyan-200">
          <GraduationCap className="h-4 w-4" /> Learning Academy
        </div>
        <h2 className="mt-3 text-2xl font-semibold text-white">Train with curated modules and elegant progress tracking</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {modules.map((module) => (
            <div key={module.title} className="rounded-[24px] border border-white/10 bg-slate-950/70 p-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">Module {module.level}</span>
                <BookOpen className="h-4 w-4 text-slate-500" />
              </div>
              <h3 className="mt-3 text-lg font-semibold text-white">{module.title}</h3>
              <p className="mt-2 text-sm text-slate-400">{module.description}</p>
              <button className="mt-4 flex items-center gap-2 text-sm font-semibold text-cyan-200">
                <PlayCircle className="h-4 w-4" /> Start lesson
              </button>
            </div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
