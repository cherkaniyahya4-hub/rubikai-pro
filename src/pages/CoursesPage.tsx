import { motion } from 'framer-motion';
import { BookOpen, Flame, Sparkles, Trophy, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageShell from '../components/PageShell';
import { courseLevels } from '../data/courseData';

export default function CoursesPage() {
  return (
    <PageShell
      eyebrow="Cours"
      title="Apprenez le Rubik’s Cube comme un vrai parcours premium"
      description="Un parcours structuré, motivant et progressif, pensé pour faire monter les joueurs de niveau en niveau."
      stats={[
        { label: 'Niveaux', value: '4' },
        { label: 'Leçons', value: '18' },
        { label: 'XP', value: '1.2k' },
      ]}
      actions={
        <Link to="/courses/debutant" className="rounded-full border border-cyan-400/20 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-200 transition hover:bg-cyan-500/20">
          Commencer
        </Link>
      }
    >
      <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-[28px] border border-white/10 bg-slate-900/70 p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-violet-500/10 p-2 text-violet-300">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-slate-400">Progression</p>
              <h3 className="text-xl font-semibold text-white">Un apprentissage guidé comme une vraie plateforme</h3>
            </div>
          </div>
          <div className="mt-6 space-y-4">
            <div className="rounded-[24px] border border-white/10 bg-slate-950/70 p-4">
              <div className="flex items-center justify-between text-sm text-slate-300">
                <span>Progression globale</span>
                <span className="font-semibold text-white">42%</span>
              </div>
              <div className="mt-3 h-2 rounded-full bg-white/10">
                <div className="h-2 w-[42%] rounded-full bg-gradient-to-r from-cyan-500 to-violet-500" />
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-[22px] border border-white/10 bg-white/5 p-4">
                <div className="flex items-center gap-2 text-cyan-200">
                  <Flame className="h-4 w-4" /> Série
                </div>
                <p className="mt-2 text-2xl font-semibold text-white">7 jours</p>
              </div>
              <div className="rounded-[22px] border border-white/10 bg-white/5 p-4">
                <div className="flex items-center gap-2 text-violet-200">
                  <Trophy className="h-4 w-4" /> Badges
                </div>
                <p className="mt-2 text-2xl font-semibold text-white">3 débloqués</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="rounded-[28px] border border-white/10 bg-gradient-to-br from-cyan-500/10 to-violet-500/10 p-6">
          <div className="flex items-center gap-2 text-sm text-cyan-200">
            <Zap className="h-4 w-4" /> Gamification
          </div>
          <h3 className="mt-3 text-2xl font-semibold text-white">XP, niveaux, défis et récompenses</h3>
          <p className="mt-3 text-sm leading-7 text-slate-300">Chaque leçon vous fait gagner de l’XP, débloque des badges et vous pousse à revenir chaque jour.</p>
          <div className="mt-5 rounded-[24px] border border-white/10 bg-slate-950/70 p-4 text-sm text-slate-300">
            Objectif du jour : terminer 1 chapitre et gagner 120 XP.
          </div>
        </motion.div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {courseLevels.map((level) => (
          <Link key={level.id} to={`/courses/${level.slug}`} className="rounded-[28px] border border-white/10 bg-slate-900/70 p-6 transition hover:border-cyan-400/30 hover:bg-slate-800/80">
            <div className={`rounded-[24px] bg-gradient-to-r ${level.accent} p-4`}>
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <BookOpen className="h-4 w-4" /> {level.title}
              </div>
              <h3 className="mt-3 text-xl font-semibold text-white">{level.description}</h3>
            </div>
            <div className="mt-4 text-sm text-slate-400">
              {level.chapters.length} chapitres · progression claire · contenu premium
            </div>
          </Link>
        ))}
      </div>
    </PageShell>
  );
}
