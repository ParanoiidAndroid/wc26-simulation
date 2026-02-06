// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';
import { MapPin, Users, Calendar, Info } from 'lucide-react';
import { getStadiumImage } from '../../utils/assets';

const StadiumCard = ({ stadium, expansive = false }) => {
  const stadiumImg = getStadiumImage(stadium);

  return (
    <motion.div 
      layout
      whileHover={{ y: -5 }}
      transition={{ layout: { type: "spring", stiffness: 200, damping: 25 } }}
      className={`group relative bg-[#0a0c10] border border-white/5 rounded-xl overflow-hidden shadow-2xl transition-all duration-500 flex flex-col md:flex-row h-full 
        ${expansive ? 'md:min-h-[450px]' : 'md:min-h-[320px]'}`}
    >
      {/* Image Section - Horizontal Left */}
      <motion.div 
        layout
        className={`relative overflow-hidden transition-all duration-500
          ${expansive ? 'w-full md:w-3/5 h-80 md:h-auto' : 'w-full md:w-2/5 h-64 md:h-auto'}`}
      >
        {stadiumImg ? (
          <>
            <motion.img 
              layout
              src={stadiumImg} 
              alt={stadium.tournamentName} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
            />
            {/* Localized Shimmer strictly on image */}
            <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-25deg] group-hover:left-[200%] transition-all duration-1000 ease-in-out" />
            </div>
          </>
        ) : (
          <div className="w-full h-full bg-fifa-blue/5 flex items-center justify-center">
            <Info className="text-fifa-blue/20" size={48} />
          </div>
        )}
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0a0c10] hidden md:block" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c10] via-transparent to-transparent md:hidden" />
      </motion.div>

      {/* Content Section - Horizontal Right */}
      <motion.div layout className="flex-1 p-8 flex flex-col justify-between space-y-6">
        <div>
          <div className="flex justify-between items-start mb-4">
            <motion.div layout className="space-y-1">
              <span className="text-[10px] font-black text-fifa-blue uppercase tracking-[0.3em]">
                {stadium.country}
              </span>
              <h3 className="text-2xl md:text-3xl font-black text-white tracking-tighter uppercase leading-none group-hover:text-fifa-blue transition-colors">
                {stadium.tournamentName}
              </h3>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">
                Nombre Original: {stadium.originalName}
              </p>
            </motion.div>
            <motion.div layout className="px-3 py-1 bg-white/5 border border-white/10 rounded-sm text-[10px] font-black text-white tracking-widest uppercase">
              {stadium.code}
            </motion.div>
          </div>

          <motion.div layout className="flex items-center gap-2 text-slate-300 mb-8">
            <MapPin size={14} className="text-fifa-blue" />
            <span className="text-xs font-bold uppercase tracking-wide">{stadium.city}, {stadium.country}</span>
          </motion.div>

          {/* Technical Specs Grid */}
          <motion.div layout className="grid grid-cols-2 gap-4 border-t border-white/5 pt-8">
            <div className="space-y-1">
              <p className="text-[9px] text-slate-500 uppercase font-black tracking-widest flex items-center gap-2">
                <Users size={12} className="text-fifa-blue" />
                Capacidad
              </p>
              <p className="text-xl font-black text-white tracking-tight">
                {stadium.capacity.toLocaleString()}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-[9px] text-slate-500 uppercase font-black tracking-widest flex items-center gap-2">
                <Calendar size={12} className="text-fifa-blue" />
                Inaugurado
              </p>
              <p className="text-xl font-black text-white tracking-tight">
                {stadium.builtYear}
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div layout className="pt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-fifa-cyan animate-pulse" />
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sede Lista para 2026</span>
          </div>
          <button className="text-[10px] font-black uppercase tracking-widest px-6 py-2 border border-white/10 hover:border-fifa-blue hover:bg-fifa-blue/10 text-white transition-all rounded-sm">
            Ver Mapa
          </button>
        </motion.div>
      </motion.div>

      {/* Frame Accent */}
      <motion.div layout className="absolute top-0 right-0 w-24 h-24 pointer-events-none opacity-[0.03] grayscale">
         <img src={stadiumImg} alt="" className="w-full h-full object-cover" />
      </motion.div>
    </motion.div>
  );
};

export default StadiumCard;
