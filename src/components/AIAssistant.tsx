import { AnimatePresence, motion } from 'framer-motion';
import { Bot, SendHorizonal, Sparkles } from 'lucide-react';
import { useMemo, useState } from 'react';

const examples = [
  'Explain this move.',
  'Teach CFOP.',
  'Why is my cube invalid?',
  'How can I improve?',
];

type Message = { role: 'assistant' | 'user'; content: string };

const replies: Record<string, string> = {
  'Explain this move.': 'Focus on the face you are turning and keep your grip stable. A calm exection usually leads to cleaner rotations and fewer accidental twists.',
  'Teach CFOP.': 'CFOP is built around Cross, F2L, OLL, and PLL. Start by solving one cross and then gradually reduce your lookahead time.',
  'Why is my cube invalid?': 'An invalid cube usually means a face color count is off or a sticker orientation does not match a legal cube state.',
  'How can I improve?': 'Improve by practicing one algorithm at a time, reviewing your solve history, and keeping your inspection focused.',
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
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="mb-3 w-[320px] rounded-[24px] border border-white/10 bg-slate-950/95 p-3 shadow-[0_30px_90px_rgba(0,0,0,0.45)] backdrop-blur-xl">
            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
              <div className="flex items-center gap-2 text-sm font-semibold text-cyan-200">
                <Bot className="h-4 w-4" /> AI assistant
              </div>
              <button onClick={() => setOpen(false)} className="text-sm text-slate-400">Close</button>
            </div>
            <div className="mt-3 space-y-2">
              {messages.map((message, index) => (
                <div key={`${message.role}-${index}`} className={`rounded-2xl px-3 py-2 text-sm leading-6 ${message.role === 'assistant' ? 'bg-white/5 text-slate-300' : 'bg-cyan-500/10 text-cyan-100'}`}>
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
              <button onClick={() => sendMessage(input)} className="rounded-full bg-cyan-500/20 p-2 text-cyan-200">
                <SendHorizonal className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <button onClick={() => setOpen((value) => !value)} className="flex items-center gap-2 rounded-full border border-cyan-400/20 bg-gradient-to-r from-cyan-500/20 to-violet-500/20 px-4 py-3 text-sm font-semibold text-cyan-100 shadow-lg shadow-cyan-500/10">
        <Sparkles className="h-4 w-4" /> Assistant
      </button>
    </div>
  );
}
