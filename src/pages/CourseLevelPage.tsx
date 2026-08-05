import { motion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import PageShell from '../components/PageShell';
import { getLevelBySlug } from '../data/courseData';

export default function CourseLevelPage() {
  const { levelSlug } = useParams();
  const level = getLevelBySlug(levelSlug ?? '');

  if (!level) {
    return <div className="rounded-[28px] border border-white/10 bg-slate-900/70 p-8 text-slate-300">Niveau introuvable.</div>;
  }

  return (
    <PageShell
      eyebrow={`Cours · ${level.title}`}
      title={level.title}
      description={level.description}
      stats={[
        { label: 'Chapitres', value: `${level.chapters.length}` },
        { label: 'XP', value: '320' },
        { label: 'Badge', value: 'En cours' },
      ]}
    >
      <div className="grid gap-4">
        {level.chapters.map((chapter, index) => (
          <motion.div key={chapter.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.04 }} className="rounded-[24px] border border-white/10 bg-slate-900/70 p-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm text-slate-400">Chapitre {index + 1}</p>
                <h3 className="mt-2 text-xl font-semibold text-white">{chapter.title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-400">{chapter.summary}</p>
              </div>
              <Link to={`/courses/${level.slug}/${chapter.slug}`} className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-200 transition hover:bg-cyan-500/20">
                Ouvrir <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap justify-between gap-3">
        <Link to="/courses" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 transition hover:bg-white/10">
          <ChevronLeft className="h-4 w-4" /> Retour aux cours
        </Link>
        <Link to={`/courses/${level.slug}/${level.chapters[0]?.slug}`} className="inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-200 transition hover:bg-violet-500/20">
          Première leçon <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
    </PageShell>
  );
}
