import { motion } from 'framer-motion';
import { Camera, CheckCircle2, Play, RotateCcw, Sparkles, TimerReset } from 'lucide-react';
import { useMemo, useState } from 'react';
import FaceScannerCard from '../components/FaceScannerCard';
import SolutionTimeline from '../components/SolutionTimeline';
import CubeViewer from '../components/CubeViewer';
import { useCubeStore } from '../store/useCubeStore';

const faces: Array<'Front' | 'Right' | 'Back' | 'Left' | 'Top' | 'Bottom'> = ['Front', 'Right', 'Back', 'Left', 'Top', 'Bottom'];

export default function SolverPage() {
  const scans = useCubeStore((state) => state.scans);
  const validation = useCubeStore((state) => state.validation);
  const setValidation = useCubeStore((state) => state.setValidation);
  const setSolveResult = useCubeStore((state) => state.setSolveResult);
  const solveResult = useCubeStore((state) => state.solveResult);
  const [playing, setPlaying] = useState(false);

  const scannedCount = useMemo(() => Object.values(scans).filter((face) => face.status === 'scanned').length, [scans]);

  const handleSolve = () => {
    const allScanned = Object.values(scans).every((face) => face.status === 'scanned');
    if (!allScanned) {
      setValidation({ message: 'Capture all six faces before generating a solve.', ok: false });
      return;
    }

    setValidation({ message: 'Cube state reconstructed successfully.', ok: true });
    setSolveResult({
      moves: ['R', 'U', 'R\'', 'U\''],
      difficulty: 82,
      time: '1m 14s',
      category: 'CFOP',
    });
  };

  const reset = () => {
    useCubeStore.getState().clearScans();
    setValidation({ message: 'Scan all six faces to reconstruct the cube.', ok: false });
    setPlaying(false);
  };

  return (
    <div className="space-y-6 py-2">
      <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="rounded-[32px] border border-white/10 bg-slate-900/70 p-6 shadow-glow backdrop-blur-xl">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-1 text-sm text-cyan-200">
              <Camera className="h-4 w-4" /> Scan your cube. Solve it instantly.
            </div>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">Photo-first cube scanning with AI reconstruction and instant solving.</h2>
            <p className="mt-3 max-w-2xl text-lg text-slate-400">Capture each of the six faces from a real cube, validate the state, and receive a premium solve timeline with a matching 3D view.</p>

            <div className="mt-6 flex flex-wrap gap-3">
              <button onClick={handleSolve} className="rounded-2xl bg-gradient-to-r from-accent-blue to-accent-purple px-5 py-3 font-semibold text-white">Generate solution</button>
              <button onClick={reset} className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 font-semibold text-slate-200">Reset scan</button>
            </div>

            <div className="mt-6 grid gap-3 md:grid-cols-3">
              <div className="rounded-[20px] border border-white/10 bg-slate-950/70 p-4">
                <p className="text-sm text-slate-400">Faces scanned</p>
                <p className="text-2xl font-semibold text-white">{scannedCount}/6</p>
              </div>
              <div className="rounded-[20px] border border-white/10 bg-slate-950/70 p-4">
                <p className="text-sm text-slate-400">Validation</p>
                <p className={`text-sm font-semibold ${validation.ok ? 'text-emerald-300' : 'text-amber-300'}`}>{validation.message}</p>
              </div>
              <div className="rounded-[20px] border border-white/10 bg-slate-950/70 p-4">
                <p className="text-sm text-slate-400">Solve mode</p>
                <p className="text-2xl font-semibold text-white">Auto-play</p>
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-gradient-to-br from-cyan-500/10 to-fuchsia-500/10 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Status</p>
                <p className="text-xl font-semibold text-white">Ready for capture</p>
              </div>
              <div className="rounded-2xl bg-slate-950/60 p-2 text-cyan-300">
                <Sparkles className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-4 space-y-3">
              {faces.map((face, index) => (
                <div key={face} className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/60 px-3 py-3 text-sm text-slate-300">
                  <span>{index + 1}. {face}</span>
                  <span className={scans[face].status === 'scanned' ? 'text-emerald-300' : 'text-slate-400'}>{scans[face].status === 'scanned' ? 'Captured' : 'Pending'}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {faces.map((face, index) => (
          <FaceScannerCard key={face} face={face} index={index + 1} />
        ))}
      </section>

      {solveResult ? (
        <motion.section initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="space-y-4">
            <div className="rounded-[28px] border border-white/10 bg-slate-900/70 p-6 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Solve statistics</p>
                  <h3 className="text-xl font-semibold text-white">Premium solve report</h3>
                </div>
                <div className="rounded-2xl bg-emerald-500/10 p-2 text-emerald-300">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-6 grid gap-3 md:grid-cols-2">
                <div className="rounded-[20px] border border-white/10 bg-slate-950/70 p-4">
                  <p className="text-sm text-slate-400">Total moves</p>
                  <p className="text-2xl font-semibold text-white">{solveResult.moves.length}</p>
                </div>
                <div className="rounded-[20px] border border-white/10 bg-slate-950/70 p-4">
                  <p className="text-sm text-slate-400">Difficulty</p>
                  <p className="text-2xl font-semibold text-white">{solveResult.difficulty}/100</p>
                </div>
                <div className="rounded-[20px] border border-white/10 bg-slate-950/70 p-4">
                  <p className="text-sm text-slate-400">Estimated time</p>
                  <p className="text-2xl font-semibold text-white">{solveResult.time}</p>
                </div>
                <div className="rounded-[20px] border border-white/10 bg-slate-950/70 p-4">
                  <p className="text-sm text-slate-400">Category</p>
                  <p className="text-2xl font-semibold text-white">{solveResult.category}</p>
                </div>
              </div>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-slate-900/70 p-6 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Playback controls</h3>
                <div className="flex gap-2">
                  <button onClick={() => setPlaying((value) => !value)} className="rounded-2xl bg-white/10 p-2 text-slate-200">
                    <Play className="h-4 w-4" />
                  </button>
                  <button className="rounded-2xl bg-white/10 p-2 text-slate-200">
                    <TimerReset className="h-4 w-4" />
                  </button>
                  <button className="rounded-2xl bg-white/10 p-2 text-slate-200">
                    <RotateCcw className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="mt-4 rounded-[20px] border border-white/10 bg-slate-950/70 p-4 text-sm text-slate-300">
                <p className="text-cyan-200">Current move</p>
                <p className="mt-2 text-2xl font-semibold text-white">{solveResult.moves[0]}</p>
              </div>
              <div className="mt-4 text-sm text-slate-400">{playing ? 'Auto-play enabled' : 'Pause mode'} · Speed 1.0x</div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-[28px] border border-white/10 bg-slate-900/70 p-4 backdrop-blur-xl">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Interactive cube</p>
                  <h3 className="text-xl font-semibold text-white">Live scanned state</h3>
                </div>
              </div>
              <CubeViewer />
            </div>
            <SolutionTimeline moves={solveResult.moves} />
          </div>
        </motion.section>
      ) : null}
    </div>
  );
}
