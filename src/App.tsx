import { AnimatePresence, motion } from 'framer-motion';
import { Routes, Route, NavLink, useLocation } from 'react-router-dom';
import { BookOpen, Boxes, Camera, Gauge, History, LayoutDashboard, ScanEye, Settings, Sparkles, Trophy, Wand2 } from 'lucide-react';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import SolverPage from './pages/SolverPage';
import LearningPage from './pages/LearningPage';
import HistoryPage from './pages/HistoryPage';
import SettingsPage from './pages/SettingsPage';
import CubeEditorPage from './pages/CubeEditorPage';
import ScramblePage from './pages/ScramblePage';
import ScanCubePage from './pages/ScanCubePage';
import ArPage from './pages/ArPage';
import Footer from './components/Footer';
import AIAssistant from './components/AIAssistant';

const navItems = [
  { to: '/', label: 'Home', icon: Sparkles },
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/solver', label: 'Solver', icon: Boxes },
  { to: '/scan', label: 'Scan Cube', icon: Camera },
  { to: '/editor', label: 'Cube Editor', icon: Wand2 },
  { to: '/scramble', label: 'Scramble', icon: Trophy },
  { to: '/ar', label: 'AR Ready', icon: ScanEye },
  { to: '/learning', label: 'Academy', icon: BookOpen },
  { to: '/history', label: 'History', icon: History },
  { to: '/settings', label: 'Settings', icon: Settings },
];

function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-transparent text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-4 lg:flex-row lg:gap-6 lg:px-6">
        <aside className="mb-4 w-full rounded-[28px] border border-white/10 bg-slate-900/70 p-4 shadow-glow backdrop-blur-xl lg:sticky lg:top-4 lg:mb-0 lg:h-[calc(100vh-2rem)] lg:w-72">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-2xl bg-gradient-to-br from-accent-blue via-accent-indigo to-accent-purple p-2.5">
              <Boxes className="h-6 w-6" />
            </div>
            <div>
              <p className="text-lg font-semibold">RubikAI Pro</p>
              <p className="text-sm text-slate-400">Premium solving studio</p>
            </div>
          </div>

          <nav className="space-y-2">
            {navItems.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium transition ${
                    isActive ? 'bg-white/10 text-white shadow-lg shadow-blue-500/10' : 'text-slate-400 hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                <Icon className="h-4 w-4" />
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="mt-8 rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-cyan-500/10 to-fuchsia-500/10 p-4">
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-cyan-200">
              <Gauge className="h-4 w-4" /> Pro mode
            </div>
            <p className="text-sm text-slate-300">Real-time cube insight, smart learn paths, and instant solver guidance.</p>
            <button className="mt-4 rounded-2xl bg-white/10 px-3 py-2 text-sm font-semibold text-white">Upgrade</button>
          </div>
        </aside>

        <main className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="min-h-[calc(100vh-2rem)]"
            >
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/solver" element={<SolverPage />} />
                <Route path="/scan" element={<ScanCubePage />} />
                <Route path="/editor" element={<CubeEditorPage />} />
                <Route path="/scramble" element={<ScramblePage />} />
                <Route path="/ar" element={<ArPage />} />
                <Route path="/learning" element={<LearningPage />} />
                <Route path="/history" element={<HistoryPage />} />
                <Route path="/settings" element={<SettingsPage />} />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
      <div className="mx-auto max-w-7xl px-4 pb-6 lg:px-6">
        <Footer />
      </div>
      <AIAssistant />
    </div>
  );
}

export default App;
