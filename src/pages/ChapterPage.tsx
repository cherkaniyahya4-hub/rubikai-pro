import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, CheckCircle2, Lightbulb, PlayCircle, TriangleAlert } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import PageShell from '../components/PageShell';
import { getChapterBySlug, getChapterNavigation } from '../data/courseData';

export default function ChapterPage() {
  const { levelSlug, chapterSlug } = useParams();
  const chapter = getChapterBySlug(levelSlug ?? '', chapterSlug ?? '');
  const navigation = getChapterNavigation(levelSlug ?? '', chapterSlug ?? '');

  if (!chapter) {
    return <div className="rounded-[28px] border border-white/10 bg-slate-900/70 p-8 text-slate-300">Chapitre introuvable.</div>;
  }

  return (
    <PageShell
      eyebrow={`Cours · ${levelSlug}`}
      title={chapter.title}
      description={chapter.summary}
      stats={[
        { label: 'Objectifs', value: `${chapter.objectives.length}` },
        { label: 'À retenir', value: `${chapter.keyTakeaways.length}` },
        { label: 'Quiz', value: '1' },
      ]}
    >
      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="rounded-[28px] border border-white/10 bg-slate-900/70 p-6">
          <div className="flex items-center gap-2 text-sm text-cyan-200">
            <BookOpen className="h-4 w-4" /> Explication
          </div>
          <p className="mt-4 text-sm leading-8 text-slate-300">{chapter.summary}</p>

          <div className="mt-6 rounded-[24px] border border-white/10 bg-slate-950/70 p-4">
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <PlayCircle className="h-4 w-4" /> {chapter.videoLabel}
            </div>
            <div className="mt-4 flex h-36 items-center justify-center rounded-[22px] border border-dashed border-white/10 bg-gradient-to-br from-cyan-500/10 to-violet-500/10 text-sm text-slate-300">
              Placeholder vidéo · contenu premium à venir
            </div>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-2">
            <div className="rounded-[22px] border border-white/10 bg-white/5 p-4">
              <div className="flex items-center gap-2 text-sm text-cyan-200">
                <Lightbulb className="h-4 w-4" /> À retenir
              </div>
              <ul className="mt-3 space-y-2 text-sm text-slate-300">
                {chapter.keyTakeaways.map((item) => <li key={item} className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 text-cyan-300" /> {item}</li>)}
              </ul>
            </div>
            <div className="rounded-[22px] border border-white/10 bg-white/5 p-4">
              <div className="flex items-center gap-2 text-sm text-amber-200">
                <TriangleAlert className="h-4 w-4" /> Erreurs fréquentes
              </div>
              <ul className="mt-3 space-y-2 text-sm text-slate-300">
                {chapter.mistakes.map((item) => <li key={item} className="flex items-start gap-2"><TriangleAlert className="mt-0.5 h-4 w-4 text-amber-300" /> {item}</li>)}
              </ul>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <div className="rounded-[28px] border border-white/10 bg-slate-900/70 p-6">
            <h3 className="text-lg font-semibold text-white">Objectifs de la leçon</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-300">
              {chapter.objectives.map((objective) => <li key={objective} className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 text-cyan-300" /> {objective}</li>)}
            </ul>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-slate-900/70 p-6">
            <h3 className="text-lg font-semibold text-white">Algorithmes</h3>
            <div className="mt-4 space-y-3">
              {chapter.algorithms.map((algorithm) => (
                <div key={algorithm.title} className="rounded-[22px] border border-white/10 bg-white/5 p-4">
                  <p className="text-sm font-semibold text-white">{algorithm.title}</p>
                  <p className="mt-2 text-sm text-cyan-200">{algorithm.notation}</p>
                  <p className="mt-2 text-sm text-slate-400">{algorithm.explanation}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-gradient-to-br from-cyan-500/10 to-violet-500/10 p-6">
            <h3 className="text-lg font-semibold text-white">Mini quiz</h3>
            <p className="mt-3 text-sm text-slate-300">{chapter.quiz.question}</p>
            <div className="mt-4 space-y-2">
              {chapter.quiz.options.map((option) => (
                <div key={option} className="rounded-2xl border border-white/10 bg-slate-950/70 px-3 py-2 text-sm text-slate-300">{option}</div>
              ))}
            </div>
            <div className="mt-4 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-200">Réponse : {chapter.quiz.answer}</div>
          </div>
        </motion.div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        {navigation?.previous ? (
          <Link to={`/courses/${levelSlug}/${navigation.previous.slug}`} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 transition hover:bg-white/10">
            <ArrowRight className="h-4 w-4 rotate-180" /> Leçon précédente
          </Link>
        ) : <div />}
        {navigation?.next ? (
          <Link to={`/courses/${levelSlug}/${navigation.next.slug}`} className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-200 transition hover:bg-cyan-500/20">
            Leçon suivante <ArrowRight className="h-4 w-4" />
          </Link>
        ) : null}
      </div>
    </PageShell>
  );
}
