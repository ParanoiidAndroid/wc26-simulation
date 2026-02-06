// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';
import { MapPin, Clock, Calendar as CalendarIcon, ArrowRight } from 'lucide-react';
import { getTeamFlag } from '../../utils/assets';
import teamsData from '../../data/teams.json';

const MatchCard = ({ match }) => {
  const team1 = teamsData.find(t => t.id === match.team1);
  const team2 = teamsData.find(t => t.id === match.team2);

  const flag1 = getTeamFlag(match.team1);
  const flag2 = getTeamFlag(match.team2);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="group relative bg-[#0a0c10] border border-white/5 rounded-xl overflow-hidden hover:border-fifa-blue/30 transition-all duration-500"
    >
      {/* Background Accen */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-fifa-blue/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />

      <div className="p-6 md:p-8 space-y-8">
        {/* Match Header Info */}
        <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
          <div className="flex items-center gap-2">
            <CalendarIcon size={12} className="text-fifa-blue" />
            <span>{match.date}</span>
          </div>
          <div className="px-2 py-0.5 bg-white/5 border border-white/5 rounded-sm text-fifa-cyan">
             {match.stage} - Grupo {match.group}
          </div>
        </div>

        {/* Teams Section */}
        <div className="flex items-center justify-between gap-4 py-4">
          {/* Team 1 */}
          <div className="flex-1 flex flex-col items-center gap-4 text-center">
            <div className="w-16 h-10 md:w-20 md:h-12 overflow-hidden rounded-md border border-white/5 shadow-lg group-hover:border-fifa-blue/20 transition-colors">
              <img src={flag1} alt={team1?.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            </div>
            <span className="text-sm md:text-base font-black uppercase tracking-tighter text-white">
              {team1?.name}
            </span>
          </div>

          {/* VS Divider */}
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="text-2xl md:text-4xl font-black italic text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20">
              VS
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 bg-fifa-blue/10 rounded-full border border-fifa-blue/20">
               <Clock size={12} className="text-fifa-cyan" />
               <span className="text-[11px] font-black text-white">{match.time}</span>
            </div>
          </div>

          {/* Team 2 */}
          <div className="flex-1 flex flex-col items-center gap-4 text-center">
            <div className="w-16 h-10 md:w-20 md:h-12 overflow-hidden rounded-md border border-white/5 shadow-lg group-hover:border-fifa-blue/20 transition-colors">
              <img src={flag2} alt={team2?.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            </div>
            <span className="text-sm md:text-base font-black uppercase tracking-tighter text-white">
              {team2?.name}
            </span>
          </div>
        </div>

        {/* Venue Info */}
        <div className="pt-6 border-t border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-400">
            <MapPin size={14} className="text-fifa-gold" />
            <span className="text-[11px] font-bold uppercase tracking-wide">{match.venue}, {match.city}</span>
          </div>
          
          <button className="text-[10px] font-black uppercase tracking-widest text-fifa-blue hover:text-fifa-cyan transition-colors flex items-center gap-1.5 group/btn">
            Ver Entradas
            <ArrowRight size={12} className="group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default MatchCard;
