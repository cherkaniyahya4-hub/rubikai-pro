import { Github, Linkedin, Mail, Sparkles } from 'lucide-react';

const links = [
  { label: 'Developer', value: 'Yahya Cherkani' },
  { label: 'GitHub', value: 'https://github.com/cherkaniyahya4-hub', href: 'https://github.com/cherkaniyahya4-hub' },
  { label: 'LinkedIn', value: 'https://www.linkedin.com/in/yahyacherkani/', href: 'https://www.linkedin.com/in/yahyacherkani/' },
  { label: 'Email', value: 'cherkaniyahya4@gmail.com', href: 'mailto:cherkaniyahya4@gmail.com' },
];

export default function Footer() {
  return (
    <footer className="mt-8 rounded-[28px] border border-white/10 bg-slate-900/70 p-6 shadow-[0_20px_60px_rgba(4,13,28,0.35)] backdrop-blur-xl">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm font-semibold text-cyan-200">
            <Sparkles className="h-4 w-4" /> RubikAI Pro
          </div>
          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">
            Crafted for modern cube enthusiasts who want premium scanning, fast solving, and elegant learning experiences.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          {links.map((item) => (
            <a
              key={item.label}
              href={item.href ?? '#'}
              target={item.href ? '_blank' : undefined}
              rel={item.href ? 'noreferrer' : undefined}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-300 transition hover:border-cyan-400/20 hover:text-white"
            >
              <span className="mr-2 text-slate-500">{item.label}</span>
              {item.value}
            </a>
          ))}
        </div>
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-white/10 pt-5 text-sm text-slate-500">
        <a href="https://github.com/cherkaniyahya4-hub" target="_blank" rel="noreferrer" className="rounded-full bg-white/5 p-2 text-slate-300 transition hover:text-white">
          <Github className="h-4 w-4" />
        </a>
        <a href="https://www.linkedin.com/in/yahyacherkani/" target="_blank" rel="noreferrer" className="rounded-full bg-white/5 p-2 text-slate-300 transition hover:text-white">
          <Linkedin className="h-4 w-4" />
        </a>
        <a href="mailto:cherkaniyahya4@gmail.com" className="rounded-full bg-white/5 p-2 text-slate-300 transition hover:text-white">
          <Mail className="h-4 w-4" />
        </a>
      </div>
    </footer>
  );
}
