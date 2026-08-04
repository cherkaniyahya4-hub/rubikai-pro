import { motion } from 'framer-motion';
import { CheckCircle2, ImagePlus, ScanLine, Sparkles } from 'lucide-react';
import { FaceName, useCubeStore } from '../store/useCubeStore';

interface Props {
  face: FaceName;
  index: number;
}

export default function FaceScannerCard({ face, index }: Props) {
  const scan = useCubeStore((state) => state.scans[face]);
  const setFaceScan = useCubeStore((state) => state.setFaceScan);

  const handleFile = (file?: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const sampleColors = ['#4f8cff', '#f59e0b', '#ffffff', '#10b981', '#ef4444', '#8b5cf6'];
      setFaceScan(face, {
        image: result,
        colors: sampleColors.slice(0, 4),
        status: 'scanned',
        confidence: 0.92,
      });
    };
    reader.readAsDataURL(file);
  };

  return (
    <motion.div layout className="rounded-[24px] border border-white/10 bg-slate-900/70 p-4 backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-400">Face {index}</p>
          <h3 className="text-lg font-semibold text-white">{face}</h3>
        </div>
        <div className={`rounded-2xl p-2 ${scan.status === 'scanned' ? 'bg-emerald-500/10 text-emerald-300' : 'bg-cyan-500/10 text-cyan-300'}`}>
          {scan.status === 'scanned' ? <CheckCircle2 className="h-4 w-4" /> : <ScanLine className="h-4 w-4" />}
        </div>
      </div>

      {scan.image ? (
        <img src={scan.image} alt={face} className="mt-4 h-32 w-full rounded-2xl object-cover" />
      ) : (
        <div className="mt-4 flex h-32 items-center justify-center rounded-2xl border border-dashed border-white/10 bg-slate-950/70 text-sm text-slate-400">
          <div className="text-center">
            <ImagePlus className="mx-auto mb-2 h-5 w-5" />
            <p>Upload or capture</p>
          </div>
        </div>
      )}

      <div className="mt-4 flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-3 py-3 text-sm text-slate-300">
        <span>Color confidence</span>
        <span className="font-semibold text-white">{Math.round(scan.confidence * 100)}%</span>
      </div>

      <label className="mt-3 flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-white/10 bg-gradient-to-r from-accent-blue/20 to-accent-purple/20 px-3 py-3 text-sm font-semibold text-white">
        <Sparkles className="h-4 w-4" />
        Capture photo
        <input type="file" accept="image/*" capture="environment" className="hidden" onChange={(e) => handleFile(e.target.files?.[0])} />
      </label>
    </motion.div>
  );
}
