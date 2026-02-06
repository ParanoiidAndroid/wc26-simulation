import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/common/Hero';
import AboutSection from './components/common/AboutSection';
import Team from './pages/Team';
import Calendar from './pages/Calendar';
import Stadiums from './pages/Stadiums';
import Simulator from './pages/Simulator';
import UnderConstruction from './components/common/UnderConstruction';
import Preloader from './components/common/Preloader';

function App() {
  const [loading, setLoading] = useState(() => {
    // Check if it's the first time in this session
    return !sessionStorage.getItem('fifa-preloader-shown');
  });

  const handleLoadingComplete = () => {
    sessionStorage.setItem('fifa-preloader-shown', 'true');
    setLoading(false);
  };

  return (
    <Router>
      <div className="min-h-screen bg-fifa-black text-white">
        <AnimatePresence mode="wait">
          {loading && (
            <Preloader key="preloader" onLoadingComplete={handleLoadingComplete} />
          )}
        </AnimatePresence>

        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <AboutSection />
              </>
            } />
            <Route path="/teams" element={<Team />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/players" element={<UnderConstruction title="Jugadores" />} />
            <Route path="/stadiums" element={<Stadiums />} />
            <Route path="/simulator" element={<Simulator />} />
            <Route path="*" element={<UnderConstruction title="No Encontrado" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}


export default App;
