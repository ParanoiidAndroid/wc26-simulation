// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';
import { Trophy, Home, Globe, Zap, ArrowRight } from 'lucide-react';

import { getTeamFlag, getTeamBadge } from '../../utils/assets';

const TeamCards = ({ team }) => {
  const teamFlag = getTeamFlag(team.id);
  const teamBadge = getTeamBadge(team.id);

  return (
    <motion.div 
      whileHover={{ y: -8 }}
      className="group relative bg-[#0a0c10] border border-white/5 rounded-xl overflow-hidden shadow-2xl transition-all duration-500"
    >
      {/* Background Flag Watermark - Subtle Parallax Effect */}
      {teamFlag && (
        <motion.div 
          className="absolute inset-0 z-0 opacity-[0.03] grayscale pointer-events-none"
          whileHover={{ scale: 1.1, x: -5, y: -5 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <img src={teamFlag} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0c10]/0 via-[#0a0c10]/80 to-[#0a0c10]" />
        </motion.div>
      )}

      {/* Premium Shimmer Sheen Effect */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-[-25deg] group-hover:left-[200%] transition-all duration-1000 ease-in-out" />
      </div>

      {/* Visual Background Pattern - Subtle */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none transition-opacity group-hover:opacity-[0.04]">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
      </div>

      {/* Top Banner with Flag Integration */}
      <div className="h-40 relative overflow-hidden flex items-end pb-8 px-8 group/flag">
        {teamFlag ? (
          <div className="absolute inset-0 z-0">
             <motion.img 
               src={teamFlag} 
               alt="" 
               className="w-full h-full object-cover opacity-10 filter grayscale group-hover:grayscale-0 group-hover:opacity-40 transition-all duration-700" 
               initial={{ scale: 1.15, rotate: -1 }}
               whileHover={{ scale: 1, rotate: 0 }}
             />
             
             {/* Localized Flag Sheen - Only on head flag */}
             <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
               <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-25deg] group-hover:left-[200%] transition-all duration-1000 ease-in-out" />
             </div>

             {/* Animated Vignette/Depth on Hover */}
             <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c10] via-transparent to-[#0a0c10]/20 opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
             <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-[#0a0c10]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          </div>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-fifa-blue/10 to-transparent opacity-30" />
        )}
        
        {/* Glow - Only on Hover for Impact */}
        <div className="absolute -inset-4 bg-fifa-blue/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <div className="relative z-10 flex items-center gap-5 w-full">
          {teamBadge && (
            <div className="w-12 h-12 relative flex-shrink-0 flex items-center justify-center">
               <img 
                 src={teamBadge} 
                 alt={team.name} 
                 className="max-w-full max-h-full object-contain relative z-10 drop-shadow-2xl group-hover:scale-110 transition-transform duration-500" 
               />
            </div>
          )}
          <h3 className="text-2xl font-black text-white tracking-tighter uppercase leading-none group-hover:text-fifa-blue transition-colors duration-300">
            {team.name}
          </h3>
        </div>

        <div className="absolute top-6 right-8 text-[10px] font-black text-slate-500 tracking-[0.2em] uppercase origin-right group-hover:text-fifa-blue transition-colors duration-300">
          {team.confederation}
        </div>
      </div>

      <div className="p-8 pt-4 space-y-6 relative z-10">
        {/* Main Stats */}
        <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.15em]">
           <div className="flex items-center gap-3 text-slate-400">
             <span className="px-2 py-1 bg-white/5 rounded-sm border border-white/5 text-white font-bold">{team.shortName}</span>
             <span className="text-fifa-blue font-black bg-fifa-blue/10 px-2 py-1 rounded-sm">{team.group}</span>
           </div>
           <div className="flex items-center gap-1.5 text-slate-200">
             <Trophy size={12} className="text-fifa-gold shadow-sm" />
             <span className="text-sm font-black tracking-tight">RANK #{team.fifaRanking}</span>
           </div>
        </div>

        {/* Separator - Unified Dark Blue */}
        <div className="h-[1px] w-full bg-white/5" />

        {/* Coach Detail */}
        <div className="flex flex-col gap-1">
          <p className="text-[9px] text-slate-500 uppercase font-black tracking-widest flex items-center gap-2">
            Director Técnico
            <Zap size={10} className="text-fifa-blue opacity-50" />
          </p>
          <p className="text-lg font-bold text-slate-100 group-hover:text-white transition-colors duration-300">{team.coach}</p>
        </div>

        {/* Bottom Actions */}
        <div className="flex items-center justify-between pt-4">
          {team.host ? (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-fifa-gold/5 border border-fifa-gold/20 rounded-sm">
              <Home size={12} className="text-fifa-gold" />
              <span className="text-[10px] font-black text-fifa-gold uppercase tracking-tighter">Sede Oficial</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-fifa-blue transition-colors duration-300" />
              <span className="text-[10px] font-black text-slate-500 uppercase">Clasificado</span>
            </div>
          )}
          
          <button className="flex items-center gap-2 h-10 px-6 border border-fifa-blue/40 hover:border-fifa-blue hover:bg-fifa-blue text-white transition-all duration-300 rounded-sm group/btn relative overflow-hidden shadow-lg hover:shadow-fifa-blue/20">
            <span className="text-[10px] font-black uppercase tracking-[0.1em] relative z-10">Perfil</span>
            <ArrowRight size={14} className="relative z-10 transition-transform duration-300 group-hover/btn:translate-x-1" />
          </button>
        </div>
      </div>

      {/* Frame Visual Accents - Subtler */}
      <div className="absolute top-0 right-0 w-12 h-12 pointer-events-none opacity-10">
        <div className="absolute top-4 right-4 w-[1px] h-8 bg-white/40" />
        <div className="absolute top-4 right-4 w-8 h-[2px] bg-white/40" />
      </div>
      <div className="absolute bottom-4 left-4 w-4 h-[1px] bg-white/10 pointer-events-none" />
    </motion.div>
  );
};

export default TeamCards;


