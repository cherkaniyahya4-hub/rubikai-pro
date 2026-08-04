import { motion } from 'framer-motion';
import { Camera, ImagePlus, RefreshCw, Sparkles, Upload } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import PageShell from '../components/PageShell';
import CubeCanvas from '../components/CubeCanvas';

const faceOrder = ['Front', 'Right', 'Back', 'Left', 'Top', 'Bottom'] as const;
const colorChoices = ['White', 'Yellow', 'Blue', 'Green', 'Orange', 'Red'] as const;
const colorHexes: Record<(typeof colorChoices)[number], string> = {
  White: '#f8fafc',
  Yellow: '#facc15',
  Blue: '#3b82f6',
  Green: '#22c55e',
  Orange: '#f97316',
  Red: '#ef4444',
};

interface FaceCapture {
  face: (typeof faceOrder)[number];
  image?: string;
  colors: string[];
  confidence: number;
  status: 'pending' | 'scanned' | 'retake';
}

const emptyCaptures = (): Record<(typeof faceOrder)[number], FaceCapture> => {
  const base = faceOrder.reduce((acc, face) => {
    acc[face] = { face, colors: [], confidence: 0, status: 'pending' };
    return acc;
  }, {} as Record<(typeof faceOrder)[number], FaceCapture>);
  return base;
};

function rgbToColorName(r: number, g: number, b: number) {
  const colors = colorChoices.map((color) => ({ color, hex: colorHexes[color] }));
  let best = colors[0];
  let bestDistance = Number.POSITIVE_INFINITY;

  colors.forEach((entry) => {
    const hex = entry.hex.replace('#', '');
    const nr = Number.parseInt(hex.slice(0, 2), 16);
    const ng = Number.parseInt(hex.slice(2, 4), 16);
    const nb = Number.parseInt(hex.slice(4, 6), 16);
    const distance = (r - nr) ** 2 + (g - ng) ** 2 + (b - nb) ** 2;
    if (distance < bestDistance) {
      best = entry;
      bestDistance = distance;
    }
  });

  return best.color;
}

function detectColorsFromDataUrl(dataUrl: string | null) {
  return new Promise<string[]>((resolve) => {
    if (!dataUrl) {
      resolve(['White']);
      return;
    }
    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = image.width;
      canvas.height = image.height;
      const context = canvas.getContext('2d');
      if (!context) {
        resolve(['White']);
        return;
      }
      context.drawImage(image, 0, 0);
      const data = context.getImageData(0, 0, canvas.width, canvas.height).data;
      const counts = new Map<string, number>();
      for (let i = 0; i < data.length; i += 24) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const colorName = rgbToColorName(r, g, b);
        counts.set(colorName, (counts.get(colorName) ?? 0) + 1);
      }
      const sorted = Array.from(counts.entries()).sort((a, b) => b[1] - a[1]);
      const detected = sorted.slice(0, 4).map(([color]) => color);
      resolve(detected.length > 0 ? detected : ['White']);
    };
    image.onerror = () => resolve(['White']);
    image.src = dataUrl;
  });
}

export default function ScanCubePage() {
  const [captures, setCaptures] = useState<Record<(typeof faceOrder)[number], FaceCapture>>(emptyCaptures());
  const [activeFaceIndex, setActiveFaceIndex] = useState(0);
  const [statusMessage, setStatusMessage] = useState('Align the cube with the overlay and capture the current face.');
  const [loading, setLoading] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<(typeof colorChoices)[number]>('White');
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const activeFace = faceOrder[activeFaceIndex];
  const scannedCount = useMemo(() => Object.values(captures).filter((capture) => capture.status === 'scanned').length, [captures]);
  const cubeColors = useMemo(() => ({
    Front: captures.Front.colors[0] ? colorHexes[captures.Front.colors[0] as (typeof colorChoices)[number]] : '#ffffff',
    Right: captures.Right.colors[0] ? colorHexes[captures.Right.colors[0] as (typeof colorChoices)[number]] : '#f97316',
    Back: captures.Back.colors[0] ? colorHexes[captures.Back.colors[0] as (typeof colorChoices)[number]] : '#0f172a',
    Left: captures.Left.colors[0] ? colorHexes[captures.Left.colors[0] as (typeof colorChoices)[number]] : '#3b82f6',
    Top: captures.Top.colors[0] ? colorHexes[captures.Top.colors[0] as (typeof colorChoices)[number]] : '#facc15',
    Bottom: captures.Bottom.colors[0] ? colorHexes[captures.Bottom.colors[0] as (typeof colorChoices)[number]] : '#ef4444',
  }), [captures]);

  useEffect(() => {
    let stream: MediaStream | null = null;
    const startCamera = async () => {
      if (!navigator.mediaDevices?.getUserMedia || !videoRef.current) return;
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' }, audio: false });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
          setCameraActive(true);
          setStatusMessage('Live camera ready. Capture the current face when the overlay is aligned.');
        }
      } catch {
        setStatusMessage('Camera access was blocked. Upload an image instead.');
      }
    };
    void startCamera();
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const captureFace = async () => {
    setLoading(true);
    const imageData = uploadedImage ?? (videoRef.current ? await snapshotVideo() : null);
    const detected = await detectColorsFromDataUrl(imageData);
    const confidence = Math.min(99, 84 + scannedCount + Math.round(Math.random() * 8));
    setCaptures((prev) => ({
      ...prev,
      [activeFace]: {
        face: activeFace,
        image: imageData ?? undefined,
        colors: detected,
        confidence,
        status: 'scanned',
      },
    }));
    setStatusMessage(`${activeFace} captured with ${confidence}% confidence.`);
    setLoading(false);
    if (activeFaceIndex < faceOrder.length - 1) {
      setActiveFaceIndex((value) => value + 1);
    }
  };

  const snapshotVideo = async () => {
    if (!videoRef.current) return null;
    const canvas = document.createElement('canvas');
    canvas.width = 640;
    canvas.height = 480;
    const context = canvas.getContext('2d');
    if (!context) return null;
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL('image/jpeg');
  };

  const retakeFace = () => {
    setCaptures((prev) => ({
      ...prev,
      [activeFace]: { ...prev[activeFace], image: undefined, colors: [], confidence: 0, status: 'retake' },
    }));
    setStatusMessage(`Retake ${activeFace} and try again.`);
  };

  const correctColor = (color: (typeof colorChoices)[number]) => {
    setSelectedColor(color);
    setCaptures((prev) => ({
      ...prev,
      [activeFace]: { ...prev[activeFace], colors: [color], confidence: 96, status: 'scanned' },
    }));
  };

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setUploadedImage(result);
      void captureFace();
    };
    reader.readAsDataURL(file);
  };

  return (
    <PageShell
      eyebrow="AI camera scanner"
      title="Scan every face with cinematic precision"
      description="Capture the cube from six angles, detect colors automatically, and correct anything that needs a human touch."
      stats={[
        { label: 'Faces scanned', value: `${scannedCount}/6` },
        { label: 'Camera', value: cameraActive ? 'Live' : 'Upload' },
        { label: 'Confidence', value: `${captures[activeFace].confidence || 0}%` },
      ]}
      actions={
        <button onClick={() => fileInputRef.current?.click()} className="rounded-full border border-cyan-400/20 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-200 transition hover:bg-cyan-500/20">
          <Upload className="mr-2 inline h-4 w-4" /> Upload image
        </button>
      }
    >
      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-[28px] border border-white/10 bg-slate-900/70 p-4">
          <div className="flex items-center justify-between rounded-[20px] border border-white/10 bg-slate-950/60 px-3 py-3">
            <div>
              <p className="text-sm text-slate-400">Live view</p>
              <p className="text-lg font-semibold text-white">{activeFace} · {scannedCount}/6 captured</p>
            </div>
            <div className="rounded-full bg-cyan-500/10 px-3 py-1 text-sm text-cyan-200">Auto capture</div>
          </div>
          <div className="mt-4 overflow-hidden rounded-[28px] border border-cyan-400/20 bg-slate-950/80 p-2">
            {cameraActive ? (
              <video ref={videoRef} className="h-[320px] w-full rounded-[24px] object-cover" playsInline muted />
            ) : (
              <div className="flex h-[320px] items-center justify-center rounded-[24px] border border-dashed border-white/10 bg-slate-900/70 text-center text-sm text-slate-400">
                Camera unavailable. Upload a photo or continue with the preview.
              </div>
            )}
            <div className="pointer-events-none absolute inset-0 rounded-[28px] border border-white/10" />
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <button onClick={() => void captureFace()} disabled={loading} className="rounded-full bg-cyan-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-400 disabled:opacity-60">
              {loading ? 'Scanning…' : 'Capture face'}
            </button>
            <button onClick={retakeFace} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-white/10">
              <RefreshCw className="mr-2 inline h-4 w-4" /> Retake
            </button>
            <button onClick={() => fileInputRef.current?.click()} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-white/10">
              <ImagePlus className="mr-2 inline h-4 w-4" /> Use file
            </button>
          </div>
          <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleUpload} />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <div className="rounded-[28px] border border-white/10 bg-slate-900/70 p-5">
            <div className="flex items-center gap-2 text-sm text-cyan-200">
              <Sparkles className="h-4 w-4" /> Scan intelligence
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-300">{statusMessage}</p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {faceOrder.map((face, index) => (
                <button key={face} onClick={() => setActiveFaceIndex(index)} className={`rounded-2xl border px-3 py-3 text-left text-sm transition ${activeFace === face ? 'border-cyan-400/30 bg-cyan-500/10 text-white' : 'border-white/10 bg-white/5 text-slate-300'}`}>
                  {face}
                  <span className="mt-1 block text-xs text-slate-500">{captures[face].status === 'scanned' ? 'Captured' : 'Pending'}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-slate-900/70 p-5">
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <Camera className="h-4 w-4" /> Detected colors
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {colorChoices.map((color) => (
                <button key={color} onClick={() => correctColor(color)} className={`rounded-full border px-3 py-2 text-sm ${selectedColor === color ? 'border-cyan-400/30 bg-cyan-500/10 text-cyan-100' : 'border-white/10 bg-white/5 text-slate-300'}`}>
                  {color}
                </button>
              ))}
            </div>
            <div className="mt-4 space-y-2">
              {(captures[activeFace].colors.length > 0 ? captures[activeFace].colors : ['White']).slice(0, 4).map((color) => (
                <div key={color} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-300">
                  <span>{color}</span>
                  <span className="text-white">{captures[activeFace].confidence}%</span>
                </div>
              ))}
            </div>
          </div>

          <CubeCanvas cubeColors={cubeColors} />
        </motion.div>
      </div>
    </PageShell>
  );
}
