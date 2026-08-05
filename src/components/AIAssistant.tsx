import { AnimatePresence, motion } from 'framer-motion';
import { Bot, SendHorizonal, Sparkles } from 'lucide-react';
import { useMemo, useState } from 'react';

const examples = [
  'Explain this move.',
  'Teach CFOP.',
  'Why is my cube invalid?',
  'How can I improve?',
  'Explain F2L.',
  'Explain OLL.',
  'Explain PLL.',
];

type Message = { role: 'assistant' | 'user'; content: string };

const replies: Record<string, string> = {
  'Explain this move.': 'Think of it as a clean rotation with intention: align your grip, keep your thumb relaxed, and commit to a single face turn. Smoothness matters more than speed.',
  'Teach CFOP.': 'CFOP is a structured path: Cross, then F2L, then OLL, then PLL. Start by solving one cross consistently before worrying about speed.',
  'Why is my cube invalid?': 'An invalid cube usually means the color counts are inconsistent or the scanned stickers don’t match a legal cube state. Retake the face if the confidence is low.',
  'How can I improve?': 'Improve by practicing one algorithm at a time, reviewing your mistakes, and keeping your inspection focused before each turn.',
  'Explain F2L.': 'F2L pairs the first two layers together by building corner-edge pairs and inserting them efficiently into place.',
  'Explain OLL.': 'OLL focuses on orienting the last layer so the top face becomes a single color before the final layer permutation.',
  'Explain PLL.': 'PLL solves the last layer permutation so all pieces land in their correct positions, completing the cube.',
};

export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([{ role: 'assistant', content: 'I can guide your scan, your solve, and your learning path.' }]);
  const [isTyping, setIsTyping] = useState(false);

  const quickQuestions = useMemo(() => examples, []);

  const sendMessage = (value: string) => {
    if (!value.trim()) return;
    setMessages((prev) => [...prev, { role: 'user' as const, content: value }]);
    setInput('');
    setIsTyping(true);
    window.setTimeout(() => {
      const response = replies[value] ?? 'Try one of the suggested prompts for a guided explanation.';
      setMessages((prev) => [...prev, { role: 'assistant' as const, content: response }]);
      setIsTyping(false);
    }, 650);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {open ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="mb-3 w-[340px] rounded-[28px] border border-cyan-400/20 bg-[linear-gradient(135deg,rgba(15,23,42,0.96),rgba(3,7,18,0.95))] p-3 shadow-[0_30px_90px_rgba(4,13,28,0.45)] backdrop-blur-2xl">
            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
              <div className="flex items-center gap-2 text-sm font-semibold text-cyan-200">
                <Bot className="h-4 w-4" /> AI coach
              </div>
              <button onClick={() => setOpen(false)} className="text-sm text-slate-400 transition hover:text-white">Close</button>
            </div>
            <div className="mt-3 space-y-2">
              {messages.map((message, index) => (
                <div key={`${message.role}-${index}`} className={`rounded-2xl px-3 py-2 text-sm leading-6 ${message.role === 'assistant' ? 'border border-white/10 bg-white/5 text-slate-300' : 'border border-cyan-400/20 bg-cyan-500/10 text-cyan-100'}`}>
                  {message.content}
                </div>
              ))}
              {isTyping ? <div className="rounded-2xl bg-white/5 px-3 py-2 text-sm text-slate-400">Typing…</div> : null}
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {quickQuestions.map((question) => (
                <button key={question} onClick={() => sendMessage(question)} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs text-slate-300 transition hover:border-cyan-400/20 hover:text-white">
                  {question}
                </button>
              ))}
            </div>
            <div className="mt-3 flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-900/80 px-2 py-2">
              <input value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => event.key === 'Enter' && sendMessage(input)} placeholder="Ask anything" className="flex-1 bg-transparent px-2 py-1 text-sm text-white outline-none" />
              <button onClick={() => sendMessage(input)} className="rounded-full bg-cyan-500/20 p-2 text-cyan-200 transition hover:bg-cyan-500/30">
                <SendHorizonal className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <button onClick={() => setOpen((value) => !value)} className="flex items-center gap-2 rounded-full border border-cyan-400/20 bg-gradient-to-r from-cyan-500/20 to-violet-500/20 px-4 py-3 text-sm font-semibold text-cyan-100 shadow-[0_18px_45px_rgba(79,140,255,0.18)] transition hover:scale-[1.01]">
        <Sparkles className="h-4 w-4" /> AI Coach
      </button>
    </div>
  );
}
