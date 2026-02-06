import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'motion/react';
import logo from '../../assets/icons/2026-Emblema-FIFAWC26_1.png';

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const navLinks = [
    { name: 'Calendario', path: '/calendar' },
    { name: 'Equipos', path: '/teams' },
    { name: 'Jugadores', path: '/players' },
    { name: 'Estadios', path: '/stadiums' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-fifa-black/40 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-4 group" onClick={closeMenu}>
          <div className="relative">
            <img src={logo} alt="FIFA World Cup 2026" className="h-10 w-auto transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(0,163,224,0.5)]" />
            <div className="absolute -inset-1 bg-fifa-cyan/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <span className="font-heading font-black text-2xl tracking-tighter text-white">
            FIFA<span className="text-fifa-blue ml-0.5">26</span>
          </span>
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <NavLink key={link.path} to={link.path} active={location.pathname === link.path}>
              {link.name}
            </NavLink>
          ))}
          <div className="w-px h-4 bg-white/10 mx-4" />
          <NavLink 
            to="/simulator" 
            active={location.pathname === '/simulator'}
            className="text-fifa-blue font-black hover:bg-fifa-blue/10 px-6"
          >
            Simulador
          </NavLink>
        </div>
        
        {/* Mobile Menu Toggle */}
        <button 
          onClick={toggleMenu}
          className="md:hidden p-3 text-white hover:bg-white/5 rounded-xl transition-all border border-white/5 z-50"
        >
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-fifa-black/95 backdrop-blur-2xl border-b border-white/10 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={closeMenu}
                  className={`text-lg font-black uppercase tracking-[0.2em] p-4 rounded-sm transition-all
                    ${location.pathname === link.path ? 'text-white bg-white/5' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="h-px bg-white/10 my-2" />
              <Link
                to="/simulator"
                onClick={closeMenu}
                className={`text-xl font-black uppercase tracking-[0.3em] p-4 rounded-sm transition-all text-fifa-blue bg-fifa-blue/5 border border-fifa-blue/20 flex items-center justify-between
                  ${location.pathname === '/simulator' ? 'bg-fifa-blue/20' : ''}`}
              >
                Simulador
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const NavLink = ({ children, to, className = "", active = false }) => (
  <Link 
    to={to} 
    className={`font-sans text-[13px] font-bold uppercase tracking-widest px-5 py-2.5 rounded-sm transition-all duration-300 relative group
      ${active ? 'text-white bg-white/5' : 'text-slate-400 hover:text-white hover:bg-white/5'}
      ${className}`}
  >
    {children}
    {active && (
      <motion.div 
        layoutId="activeTab"
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-fifa-blue shadow-[0_0_10px_#004b9c]"
      />
    )}
  </Link>
);


export default Navbar;

