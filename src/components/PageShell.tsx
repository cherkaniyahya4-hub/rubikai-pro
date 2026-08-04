import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface PageShellProps {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
  actions?: ReactNode;
  stats?: Array<{ label: string; value: string }>;
}

export default function PageShell({ eyebrow, title, description, children, actions, stats }: PageShellProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-[32px] border border-white/10 bg-slate-900/70 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_30px_80px_rgba(79,140,255,0.16)] backdrop-blur-2xl"
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-1 text-sm font-medium text-cyan-200">
            <span className="h-2 w-2 rounded-full bg-cyan-300" />
            {eyebrow}
          </div>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">{title}</h2>
          <p className="mt-3 text-base leading-7 text-slate-400">{description}</p>
        </div>
        {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
      </div>

      {stats && stats.length > 0 ? (
        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {stats.map((item) => (
            <div key={item.label} className="rounded-[20px] border border-white/10 bg-slate-950/70 p-4">
              <p className="text-sm text-slate-400">{item.label}</p>
              <p className="mt-2 text-2xl font-semibold text-white">{item.value}</p>
            </div>
          ))}
        </div>
      ) : null}

      <div className="mt-8">{children}</div>
    </motion.section>
  );
}
