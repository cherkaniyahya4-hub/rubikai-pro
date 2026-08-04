import { motion } from 'framer-motion';

interface Props {
  moves: string[];
}

export default function SolutionTimeline({ moves }: Props) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-slate-950/70 p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Solution timeline</h3>
        <span className="text-sm text-slate-400">Auto-play ready</span>
      </div>
      <div className="space-y-3">
        {moves.map((move, index) => (
          <motion.div key={`${move}-${index}`} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-3 py-3 text-sm text-slate-300">
            <span>{index + 1}. {move}</span>
            <span className="text-cyan-200">{index === 0 ? 'Current' : index === moves.length - 1 ? 'Final' : 'Next'}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
