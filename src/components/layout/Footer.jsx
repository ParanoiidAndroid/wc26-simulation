import { Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';
import { Github, Twitter, Globe, ArrowUpRight, Mail } from 'lucide-react';
import logo from '../../assets/icons/2026-Emblema-FIFAWC26_1.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-fifa-black pt-24 pb-12 overflow-hidden border-t border-white/5">
      {/* Background Decorative Blur */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-fifa-blue/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-fifa-cyan/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-24 mb-20"
        >
          
          {/* Brand Column */}
          <div className="space-y-8">
            <Link to="/" className="flex items-center gap-4 group">
              <img src={logo} alt="FIFA 26" className="h-12 w-auto group-hover:scale-110 transition-transform duration-500" />
              <span className="font-heading font-black text-3xl tracking-tighter text-white">
                FIFA<span className="text-fifa-blue ml-0.5">26</span>
              </span>
            </Link>
            <p className="text-slate-500 text-sm font-medium leading-relaxed max-w-xs">
              Plataforma técnica de seguimiento y simulación para el Mundial 2026. Datos oficiales de sedes, equipos y calendario unificados en una experiencia premium.
            </p>
            <div className="flex items-center gap-4">
               <a href="https://github.com/ParanoiidAndroid" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 border border-white/10 rounded-sm text-white hover:bg-fifa-blue hover:border-fifa-blue transition-all">
                  <Github size={18} />
               </a>
               <a href="#" className="p-3 bg-white/5 border border-white/10 rounded-sm text-slate-400 hover:text-white transition-all">
                  <Twitter size={18} />
               </a>
               <a href="#" className="p-3 bg-white/5 border border-white/10 rounded-sm text-slate-400 hover:text-white transition-all">
                  <Globe size={18} />
               </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-8">
            <h4 className="text-xs font-black text-white uppercase tracking-[0.3em]">Explorar</h4>
            <ul className="space-y-4">
              {['Calendario', 'Equipos', 'Estadios', 'Simulador'].map((item) => (
                <li key={item}>
                  <Link 
                    to={`/${item.toLowerCase().replace('calendario', 'calendar')}`} 
                    className="group flex items-center gap-2 text-slate-400 hover:text-white text-xs font-bold uppercase tracking-widest transition-all"
                  >
                    <ChevronRight size={12} className="text-fifa-blue opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-8">
            <h4 className="text-xs font-black text-white uppercase tracking-[0.3em]">Recursos</h4>
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-slate-400 hover:text-white text-xs font-bold uppercase tracking-widest transition-all">Guía de Sedes</a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-white text-xs font-bold uppercase tracking-widest transition-all">Soporte Técnico</a>
              </li>
              <li>
              </li>
            </ul>
          </div>

          {/* Developer Column */}
          <div className="space-y-8">
            <h4 className="text-xs font-black text-white uppercase tracking-[0.3em]">Desarrollador</h4>
            <div className="p-6 bg-white/[0.02] border border-white/5 rounded-sm space-y-4">
               <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Creado por</p>
               <a 
                href="https://github.com/ParanoiidAndroid" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group block space-y-2"
               >
                 <span className="text-lg font-black text-white block group-hover:text-fifa-blue transition-colors tracking-tighter">ParanoiidAndroid</span>
                 <div className="flex items-center gap-2 text-fifa-blue text-[10px] font-black uppercase tracking-widest">
                    <span>Ver Perfil de GitHub</span>
                    <ArrowUpRight size={12} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                 </div>
               </a>
            </div>
          </div>

        </motion.div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
          <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">
            © {currentYear} FIFA World Cup 2026. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-8">
             <a href="#" className="text-[10px] font-bold text-slate-600 hover:text-white uppercase tracking-widest transition-all">Políticas</a>
             <a href="#" className="text-[10px] font-bold text-slate-600 hover:text-white uppercase tracking-widest transition-all">Términos</a>
             <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[9px] font-black text-white uppercase tracking-widest">Server: AWS US-EAST-1</span>
             </div>
          </div>
        </div>
      </div>

      {/* Extreme Bottom Text Decoration */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 select-none pointer-events-none">
         <span className="text-[150px] font-black text-white/[0.02] tracking-tighter uppercase leading-none whitespace-nowrap">
            PREMIUM ParanoiidAndroid TRACKER 2026
         </span>
      </div>
    </footer>
  );
};

// Internal component for clean icons
const ChevronRight = ({ size, className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="3" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="m9 18 6-6-6-6"/>
  </svg>
);

export default Footer;
