import { create } from 'zustand';

export type FaceName = 'Front' | 'Right' | 'Back' | 'Left' | 'Top' | 'Bottom';

export interface FaceScan {
  face: FaceName;
  image?: string;
  colors: string[];
  status: 'pending' | 'scanned' | 'error';
  confidence: number;
}

interface SolveResult {
  moves: string[];
  difficulty: number;
  time: string;
  category: string;
}

interface CubeState {
  scans: Record<FaceName, FaceScan>;
  solveResult: SolveResult | null;
  validation: { message: string; ok: boolean };
  setFaceScan: (face: FaceName, scan: Partial<FaceScan>) => void;
  clearScans: () => void;
  setSolveResult: (result: SolveResult) => void;
  setValidation: (validation: { message: string; ok: boolean }) => void;
}

const initialScans = (): Record<FaceName, FaceScan> => ({
  Front: { face: 'Front', colors: [], status: 'pending', confidence: 0 },
  Right: { face: 'Right', colors: [], status: 'pending', confidence: 0 },
  Back: { face: 'Back', colors: [], status: 'pending', confidence: 0 },
  Left: { face: 'Left', colors: [], status: 'pending', confidence: 0 },
  Top: { face: 'Top', colors: [], status: 'pending', confidence: 0 },
  Bottom: { face: 'Bottom', colors: [], status: 'pending', confidence: 0 },
});

export const useCubeStore = create<CubeState>((set) => ({
  scans: initialScans(),
  solveResult: null,
  validation: { message: 'Scan all six faces to reconstruct the cube.', ok: false },
  setFaceScan: (face, scan) =>
    set((state) => ({
      scans: {
        ...state.scans,
        [face]: { ...state.scans[face], ...scan },
      },
    })),
  clearScans: () => set({ scans: initialScans(), solveResult: null, validation: { message: 'Scan all six faces to reconstruct the cube.', ok: false } }),
  setSolveResult: (result) => set({ solveResult: result }),
  setValidation: (validation) => set({ validation }),
}));
