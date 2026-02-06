import { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Layout, ChevronRight, RotateCcw, Save } from 'lucide-react';
import { useSimulator } from '../hooks/useSimulator';
import teamsData from '../data/teams.json';
import calendarData from '../data/calendar.json';
import { getTeamFlag } from '../utils/assets';

const Simulator = () => {
  const [activeTab, setActiveTab] = useState('groups'); // groups | knockout
  const { standings, matchResults, knockoutWinners, updateScore, setWinner, resetSimulator, advancement } = useSimulator(
    calendarData.filter(m => m.stage === 'Fase de Grupos'),
    teamsData
  );

  const simulateGroupPhase = () => {
    calendarData.filter(m => m.stage === 'Fase de Grupos').forEach(match => {
      const s1 = Math.floor(Math.random() * 4);
      const s2 = Math.floor(Math.random() * 4);
      updateScore(match.id, s1, s2);
    });
  };

  const groups = Object.keys(standings).sort();

  return (
    <div className="min-h-screen pt-32 pb-20 overflow-hidden">
      {/* Background Decorative Element */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-fifa-blue blur-[150px]" />
        <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-fifa-gold blur-[150px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-[1px] w-8 bg-fifa-gold" />
              <span className="text-xs font-black tracking-[0.4em] uppercase text-fifa-gold">
                Tournament Engine
              </span>
            </div>
            <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter uppercase leading-none">
              Simulador <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-fifa-blue">Oficial</span>
            </h1>
          </motion.div>

          <div className="flex flex-wrap items-center gap-4">
            <button 
              onClick={simulateGroupPhase}
              className="flex items-center gap-2 px-6 py-3 bg-fifa-blue/10 border border-fifa-blue/30 rounded-sm text-[10px] font-black uppercase tracking-widest text-fifa-blue hover:bg-fifa-blue hover:text-white transition-all active:scale-95 shadow-[0_0_20px_rgba(0,75,156,0.1)]"
            >
              <Trophy size={14} />
              Simular Resultados
            </button>
            <button 
              onClick={resetSimulator}
              className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-sm text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white hover:bg-white/10 transition-all active:scale-95"
            >
              <RotateCcw size={14} />
              Reiniciar
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-8 border-b border-white/5 mb-12 relative">
          <button 
            onClick={() => setActiveTab('groups')}
            className={`pb-4 text-xs font-black uppercase tracking-[0.3em] transition-all relative ${activeTab === 'groups' ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}
          >
            Fase de Grupos
            {activeTab === 'groups' && <motion.div layoutId="simTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-fifa-blue" />}
          </button>
          <button 
            onClick={() => setActiveTab('knockout')}
            className={`pb-4 text-xs font-black uppercase tracking-[0.3em] transition-all relative ${activeTab === 'knockout' ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}
          >
            Eliminatorias
            {activeTab === 'knockout' && <motion.div layoutId="simTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-fifa-blue" />}
          </button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'groups' ? (
            <motion.div 
              key="groups"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-16"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-12">
                {groups.map((groupKey) => (
                  <GroupTable 
                    key={groupKey}
                    groupKey={groupKey}
                    standings={standings[groupKey]}
                    matches={calendarData.filter(m => m.group === groupKey)}
                    matchResults={matchResults}
                    updateScore={updateScore}
                  />
                ))}
              </div>

              {/* Race for Best 3rd Places Tracker */}
              <div className="pt-8">
                 <BestThirdsTable thirdPlaces={advancement.thirdPlaces} />
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="knockout"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
               <KnockoutSection 
                 advancement={advancement} 
                 knockoutWinners={knockoutWinners}
                 setWinner={setWinner}
               />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const GroupTable = ({ groupKey, standings, matches, matchResults, updateScore }) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between border-b border-fifa-blue/20 pb-2">
          <h3 className="text-xl font-black text-white italic tracking-tighter flex items-center gap-3">
            <span className="w-1 h-4 bg-fifa-blue" />
            GRUPO {groupKey}
          </h3>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Tabla de Posiciones</span>
        </div>
      </div>

      <div className="overflow-hidden rounded-sm border border-white/5 bg-[#0a0c10] shadow-2xl">
        <table className="w-full text-[10px] font-bold uppercase tracking-tighter">
          <thead>
            <tr className="bg-white/5 text-slate-500 border-b border-white/5">
              <th className="px-3 py-3 text-left w-8">#</th>
              <th className="px-3 py-3 text-left">Equipo</th>
              <th className="px-2 py-3 text-center">PJ</th>
              <th className="px-2 py-3 text-center">DG</th>
              <th className="px-2 py-3 text-center">PTS</th>
            </tr>
          </thead>
          <tbody className="relative">
            <AnimatePresence mode="popLayout">
              {standings.map((team, idx) => (
                <motion.tr 
                  layout
                  key={team.id} 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className={`border-b border-white/5 transition-colors hover:bg-white/[0.02] ${idx < 2 ? 'bg-fifa-blue/5' : idx === 2 ? 'bg-white/[0.01]' : ''}`}
                >
                  <td className="px-3 py-3 text-slate-500">
                    <div className="flex flex-col items-center">
                       {idx + 1}
                       {idx < 2 && <div className="w-1 h-1 bg-fifa-blue rounded-full mt-1" />}
                       {idx === 2 && <div className="w-1 h-1 bg-slate-500 rounded-full mt-1" />}
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-2">
                      <img src={getTeamFlag(team.id)} alt="" className="w-5 h-3 object-cover rounded-px border border-white/10" />
                      <span className="text-white truncate max-w-[80px]">{team.name}</span>
                    </div>
                  </td>
                  <td className="px-2 py-3 text-center text-slate-400 font-medium">{team.mp}</td>
                  <td className={`px-2 py-3 text-center font-black ${team.gd > 0 ? 'text-green-500' : team.gd < 0 ? 'text-red-500' : 'text-slate-400'}`}>
                    {team.gd > 0 ? `+${team.gd}` : team.gd}
                  </td>
                  <td className="px-2 py-3 text-center">
                    <span className="text-white text-sm font-black italic">{team.pts}</span>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 gap-2">
        {matches.map(match => {
          const res = matchResults[match.id];
          const isComplete = res && res.score1 !== null && res.score2 !== null;
          const winner = isComplete ? (res.score1 > res.score2 ? 1 : res.score1 < res.score2 ? 2 : 0) : null;

          return (
            <motion.div 
              key={match.id} 
              layout
              className={`flex flex-col gap-2 p-3 bg-white/[0.03] border rounded-sm transition-all duration-500 
                ${isComplete ? (winner === 1 || winner === 2 ? 'border-fifa-blue/20 bg-fifa-blue/[0.02]' : 'border-white/10') : 'border-white/5'}`}
            >
              <div className="flex items-center gap-3">
                <div className={`flex-1 flex items-center justify-end gap-2 min-w-0 transition-all ${winner === 2 ? 'opacity-30 grayscale' : 'opacity-100'}`}>
                   <span className="text-[10px] text-white font-black truncate text-right uppercase tracking-[0.1em]">
                     {teamsData.find(t => t.id === match.team1)?.shortName}
                   </span>
                   <img src={getTeamFlag(match.team1)} alt="" className="w-7 h-4.5 object-cover rounded-sm border border-white/10" />
                </div>
                
                <div className="flex items-center gap-1 shrink-0">
                  <input 
                    type="number"
                    min="0"
                    placeholder="0"
                    className={`w-10 h-9 bg-black/60 border rounded text-center text-[13px] font-black text-white focus:border-fifa-blue transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
                      ${isComplete && winner === 1 ? 'border-fifa-blue/50 ring-1 ring-fifa-blue/20' : 'border-white/10'}`}
                    value={matchResults[match.id]?.score1 ?? ''}
                    onChange={(e) => updateScore(match.id, e.target.value, matchResults[match.id]?.score2 ?? '')}
                  />
                  <span className="text-slate-700 font-black text-sm">:</span>
                  <input 
                    type="number"
                    min="0"
                    placeholder="0"
                    className={`w-10 h-9 bg-black/60 border rounded text-center text-[13px] font-black text-white focus:border-fifa-blue transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
                      ${isComplete && winner === 2 ? 'border-fifa-blue/50 ring-1 ring-fifa-blue/20' : 'border-white/10'}`}
                    value={matchResults[match.id]?.score2 ?? ''}
                    onChange={(e) => updateScore(match.id, matchResults[match.id]?.score1 ?? '', e.target.value)}
                  />
                </div>

                <div className={`flex-1 flex items-center gap-2 min-w-0 transition-all ${winner === 1 ? 'opacity-30 grayscale' : 'opacity-100'}`}>
                   <img src={getTeamFlag(match.team2)} alt="" className="w-7 h-4.5 object-cover rounded-sm border border-white/10" />
                   <span className="text-[10px] text-white font-black truncate uppercase tracking-[0.1em]">
                     {teamsData.find(t => t.id === match.team2)?.shortName}
                   </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

const BestThirdsTable = ({ thirdPlaces }) => {
  return (
    <div className="space-y-6 lg:col-span-2 xl:col-span-3">
      <div className="flex items-center gap-3 border-b border-fifa-gold/20 pb-2 text-fifa-gold">
        <Trophy size={18} />
        <h3 className="text-lg font-black italic tracking-tighter uppercase">Ranking de Mejores Terceros</h3>
      </div>
      
      <div className="overflow-hidden rounded-sm border border-white/5 bg-[#0a0c10] shadow-2xl">
        <table className="w-full text-[10px] font-bold uppercase tracking-tighter">
          <thead>
            <tr className="bg-white/5 text-slate-500 border-b border-white/5">
              <th className="px-3 py-3 text-left w-8">#</th>
              <th className="px-3 py-3 text-left">Equipo</th>
              <th className="px-2 py-3 text-center">Gr</th>
              <th className="px-2 py-3 text-center">PTS</th>
              <th className="px-2 py-3 text-center">DG</th>
              <th className="px-2 py-3 text-center">Estado</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence mode="popLayout">
              {thirdPlaces.map((team, idx) => (
                <motion.tr 
                  layout
                  key={team.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`border-b border-white/5 transition-all ${idx < 8 ? 'bg-fifa-blue/5' : 'bg-red-500/5 opacity-50'}`}
                >
                  <td className="px-3 py-3 text-slate-500">{idx + 1}</td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-2">
                      <img src={getTeamFlag(team.id)} alt="" className="w-5 h-3 object-cover rounded-px" />
                      <span className="text-white">{team.name}</span>
                    </div>
                  </td>
                  <td className="px-2 py-3 text-center text-fifa-blue">{team.originGroup}</td>
                  <td className="px-2 py-3 text-center text-white">{team.pts}</td>
                  <td className={`px-2 py-3 text-center ${team.gd > 0 ? 'text-green-500' : 'text-slate-400'}`}>{team.gd > 0 ? `+${team.gd}` : team.gd}</td>
                  <td className="px-2 py-3 text-center">
                    {idx < 8 ? (
                      <span className="text-[8px] px-2 py-0.5 bg-fifa-blue/20 text-fifa-blue rounded-full">Clasificado</span>
                    ) : (
                      <span className="text-[8px] px-2 py-0.5 bg-red-500/20 text-red-400 rounded-full">Eliminado</span>
                    )}
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
};

const MatchNode = ({ match, knockoutWinners = {}, setWinner }) => {
  if (!match) return (
    <div className="flex flex-col justify-center">
      <div className="bg-white/5 border border-dashed border-white/10 rounded p-4 opacity-50 grayscale">
        <div className="h-10 flex items-center justify-center text-[10px] font-black text-slate-600 uppercase italic">Esperando...</div>
      </div>
    </div>
  );

  // Defensive check for the error reported by user
  const winners = knockoutWinners || {};
  const winnerId = winners[match.id];

  return (
    <div className="relative group">
      <div className="bg-[#0a0c10] border border-white/5 rounded-sm overflow-hidden shadow-2xl hover:border-fifa-blue/30 transition-all duration-500">
        <div className="p-1 bg-white/[0.02] border-b border-white/5 flex justify-between px-3">
           <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">{match.id}</span>
           {winnerId && <div className="w-1 h-1 bg-fifa-blue rounded-full shadow-[0_0_5px_rgba(0,163,224,1)] animate-pulse" />}
        </div>
        <div className="divide-y divide-white/5">
          {[match.t1, match.t2].map((team, idx) => {
            const isEliminated = winnerId && team && winnerId !== team.id;
            
            return (
              <div 
                key={team?.id || idx}
                onClick={() => team && setWinner(match.id, team.id)}
                className={`flex items-center justify-between p-3 cursor-pointer transition-all hover:bg-white/5 group/team
                  ${winnerId === team?.id ? 'bg-fifa-blue/10' : team ? '' : 'opacity-30'}
                  ${!team ? 'pointer-events-none' : ''}
                  ${isEliminated ? 'opacity-30 grayscale' : 'opacity-100'}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all
                    ${winnerId === team?.id ? 'border-fifa-blue bg-fifa-blue/20' : 'border-white/10'}`}>
                    {winnerId === team?.id && <div className="w-1.5 h-1.5 bg-fifa-blue rounded-full shadow-[0_0_5px_rgba(0,163,224,0.5)]" />}
                  </div>
                  {team ? (
                    <>
                      <img src={getTeamFlag(team.id)} alt="" className="w-6 h-4 object-cover rounded shadow-sm border border-white/5" />
                      <span className="text-[11px] font-black text-white uppercase tracking-tighter truncate max-w-[80px]">{team.shortName}</span>
                    </>
                  ) : (
                    <span className="text-[9px] font-black text-slate-700 uppercase italic">TBD</span>
                  )}
                </div>
                {team && (
                  <span className="text-[9px] font-bold text-slate-600">
                    {team.pos === 3 ? '3°' : `${team.originGroup}${team.pos}`}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const KnockoutSection = ({ advancement, knockoutWinners = {}, setWinner }) => {
  const { r32Matches, r16Matches, qfMatches, sfMatches, finalMatch, thirdPlaceMatch } = advancement;

  // Split matches for symmetric layout
  const leftR32 = r32Matches.slice(0, 8);
  const rightR32 = r32Matches.slice(8, 16).reverse();

  const leftR16 = r16Matches.slice(0, 4);
  const rightR16 = r16Matches.slice(4, 8).reverse();

  const leftQF = qfMatches.slice(0, 2);
  const rightQF = qfMatches.slice(2, 4).reverse();

  const leftSF = sfMatches.slice(0, 1);
  const rightSF = sfMatches.slice(1, 2);

  return (
    <div className="space-y-16 pb-20">
      {/* Visual Header */}
      <div className="flex items-center gap-4 px-1">
         <Trophy className="text-fifa-gold" size={32} />
         <div>
           <h2 className="text-3xl font-black text-white tracking-tighter uppercase leading-none">Cuadro de Eliminatorias</h2>
           <p className="text-slate-500 text-[10px] font-bold tracking-widest uppercase mt-1 italic">World Cup 2026</p>
         </div>
      </div>

      <div className="relative overflow-x-auto pb-12 mask-fade-edges">
        <div className="min-w-[1400px] py-4 space-y-12">
          
          {/* Aligned Round Headers */}
          <div className="grid grid-cols-7 gap-4 items-center">
            <div className="col-span-1 text-center">
              <h4 className="text-[9px] font-black text-fifa-blue uppercase tracking-[0.3em] px-3 py-2 border border-fifa-blue/20 bg-fifa-blue/5 rounded-full inline-block">Dieciseisavos</h4>
            </div>
            <div className="col-span-1 text-center">
              <h4 className="text-[9px] font-black text-fifa-gold uppercase tracking-[0.3em] px-3 py-2 border border-fifa-gold/20 bg-fifa-gold/5 rounded-full inline-block">Octavos</h4>
            </div>
            <div className="col-span-1 text-center">
              <h4 className="text-[9px] font-black text-white uppercase tracking-[0.3em] px-3 py-2 border border-white/20 bg-white/5 rounded-full inline-block">Cuartos</h4>
            </div>
            <div className="col-span-1 text-center">
              <h4 className="text-[9px] font-black text-fifa-gold uppercase tracking-[0.3em] px-4 py-2 border border-fifa-gold/20 bg-fifa-gold/5 rounded-full inline-block">Semifinales</h4>
            </div>
            <div className="col-span-1 text-center">
              <h4 className="text-[9px] font-black text-white uppercase tracking-[0.3em] px-3 py-2 border border-white/20 bg-white/5 rounded-full inline-block">Cuartos</h4>
            </div>
            <div className="col-span-1 text-center">
              <h4 className="text-[9px] font-black text-fifa-gold uppercase tracking-[0.3em] px-3 py-2 border border-fifa-gold/20 bg-fifa-gold/5 rounded-full inline-block">Octavos</h4>
            </div>
            <div className="col-span-1 text-center">
              <h4 className="text-[9px] font-black text-fifa-blue uppercase tracking-[0.3em] px-3 py-2 border border-fifa-blue/20 bg-fifa-blue/5 rounded-full inline-block">Dieciseisavos</h4>
            </div>
          </div>

          {/* Unified Tree Grid */}
          <div className="grid grid-cols-7 gap-4 items-center">
            
            {/* Left Bracket */}
            <div className="col-span-1 flex flex-col gap-6">
              {leftR32.map(match => <MatchNode key={match.id} match={match} knockoutWinners={knockoutWinners} setWinner={setWinner} />)}
            </div>

            <div className="col-span-1 flex flex-col justify-around h-full py-16">
              {leftR16.map(match => <MatchNode key={match.id} match={match} knockoutWinners={knockoutWinners} setWinner={setWinner} />)}
            </div>

            <div className="col-span-1 flex flex-col justify-around h-full py-32">
              {leftQF.map(match => <MatchNode key={match.id} match={match} knockoutWinners={knockoutWinners} setWinner={setWinner} />)}
            </div>

            {/* Center: Semi-Finals */}
            <div className="col-span-1 flex flex-col justify-around h-full py-40">
              <div className="space-y-4">
                 <span className="text-[8px] font-black text-fifa-blue uppercase tracking-[0.4em] block text-center opacity-40">Semi Izquierda</span>
                 {leftSF.map(match => <MatchNode key={match.id} match={match} knockoutWinners={knockoutWinners} setWinner={setWinner} />)}
              </div>
              <div className="space-y-4">
                 {rightSF.map(match => <MatchNode key={match.id} match={match} knockoutWinners={knockoutWinners} setWinner={setWinner} />)}
                 <span className="text-[8px] font-black text-fifa-blue uppercase tracking-[0.4em] block text-center opacity-40">Semi Derecha</span>
              </div>
            </div>

            {/* Right Bracket */}
            <div className="col-span-1 flex flex-col justify-around h-full py-32">
              {rightQF.map(match => <MatchNode key={match.id} match={match} knockoutWinners={knockoutWinners} setWinner={setWinner} />)}
            </div>

            <div className="col-span-1 flex flex-col justify-around h-full py-16">
              {rightR16.map(match => <MatchNode key={match.id} match={match} knockoutWinners={knockoutWinners} setWinner={setWinner} />)}
            </div>

            <div className="col-span-1 flex flex-col gap-6">
              {rightR32.map(match => <MatchNode key={match.id} match={match} knockoutWinners={knockoutWinners} setWinner={setWinner} />)}
            </div>

          </div>
        </div>
      </div>

      {/* Final & 3rd Place Section */}
      <div className="max-w-6xl mx-auto space-y-24 mt-20 pt-20 border-t border-white/5 relative">
         <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-6 bg-[#050608] text-[10px] font-black text-slate-700 uppercase tracking-[0.6em] border border-white/5 py-1 rounded-full">
           El Desenlace
         </div>

         {/* Champion Reveal Animation */}
         <AnimatePresence>
           {knockoutWinners['FINAL'] && (
             <motion.div 
               initial={{ opacity: 0, scale: 0.8, y: 50 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               className="relative z-20"
             >
               <div className="absolute inset-0 bg-fifa-gold/10 blur-[120px] rounded-full animate-pulse" />
               <div className="relative bg-gradient-to-b from-fifa-gold/20 via-[#0a0c10] to-[#050608] border-2 border-fifa-gold/30 p-12 rounded-lg text-center shadow-[0_0_100px_rgba(255,184,28,0.15)] overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-fifa-gold to-transparent opacity-50" />
                  
                  <motion.div
                    animate={{ rotate: [0, -5, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 4 }}
                  >
                    <Trophy className="text-fifa-gold mx-auto mb-6 drop-shadow-[0_0_20px_rgba(255,184,28,0.5)]" size={80} />
                  </motion.div>
                  
                  <h4 className="text-fifa-gold text-xs font-black uppercase tracking-[0.5em] mb-4">Campeón del Mundo</h4>
                  
                  <div className="flex flex-col items-center gap-6">
                    <motion.div 
                      key={knockoutWinners['FINAL']}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex flex-col items-center gap-4"
                    >
                      <img 
                        src={getTeamFlag(knockoutWinners['FINAL'])} 
                        alt="Flag" 
                        className="w-48 h-32 object-cover rounded-md shadow-2xl border-2 border-white/20 ring-4 ring-fifa-gold/20" 
                      />
                      <h2 className="text-6xl md:text-8xl font-black text-white italic tracking-tighter uppercase drop-shadow-2xl">
                        {teamsData.find(t => t.id === knockoutWinners['FINAL'])?.name}
                      </h2>
                    </motion.div>
                  </div>
                  
                  <div className="mt-8 flex items-center justify-center gap-4">
                    <div className="h-[1px] w-12 bg-fifa-gold/30" />
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest italic"></span>
                    <div className="h-[1px] w-12 bg-fifa-gold/30" />
                  </div>
               </div>
             </motion.div>
           )}
         </AnimatePresence>

         <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            {/* 3rd Place Match  */}
            <div className="lg:col-span-4 order-2 lg:order-1 px-4 opacity-70 hover:opacity-100 transition-opacity">
               <div className="space-y-4">
                  <div className="flex items-center gap-3 justify-center lg:justify-start">
                    <div className="h-px flex-1 bg-white/5 lg:hidden" />
                    <h3 className="text-sm font-black text-slate-500 uppercase tracking-[0.3em]">Tercer Puesto</h3>
                    <div className="h-px flex-1 bg-white/5" />
                  </div>
                  <div className="bg-white/[0.02] border border-white/5 p-4 rounded-sm scale-90 lg:scale-100 origin-bottom">
                     <MatchNode match={thirdPlaceMatch} knockoutWinners={knockoutWinners} setWinner={setWinner} />
                     <p className="text-[7px] font-black text-slate-600 uppercase tracking-widest mt-3 text-center">18 Julio • Miami</p>
                  </div>
               </div>
            </div>

            {/* Grand Final - Center and Massive */}
            <div className="lg:col-span-8 order-1 lg:order-2">
               <div className="space-y-8 text-center relative group">
                  <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-[1px] h-16 bg-gradient-to-b from-transparent to-fifa-gold/40" />
                  
                  <div className="space-y-2">
                     <div className="flex items-center justify-center gap-4">
                        <motion.div 
                          animate={{ opacity: [0.4, 1, 0.4] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                          className="h-px w-12 bg-fifa-gold/30" 
                        />
                        <Trophy className="text-fifa-gold drop-shadow-[0_0_10px_rgba(255,184,28,0.3)]" size={56} />
                        <motion.div 
                          animate={{ opacity: [0.4, 1, 0.4] }}
                          transition={{ repeat: Infinity, duration: 2, delay: 1 }}
                          className="h-px w-12 bg-fifa-gold/30" 
                        />
                     </div>
                     <h3 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter uppercase leading-none bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-slate-500">Gran Final</h3>
                  </div>

                  <div className="relative">
                     <div className="absolute -inset-1 bg-fifa-gold/20 blur-2xl rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                     <div className="relative bg-gradient-to-b from-fifa-gold/25 via-[#0a0c10]/95 to-[#050608] border-2 border-fifa-gold/50 p-10 rounded shadow-[0_0_60px_rgba(255,184,28,0.1)] ring-1 ring-fifa-gold/20">
                        <MatchNode match={finalMatch} knockoutWinners={knockoutWinners} setWinner={setWinner} />
                        <div className="flex items-center justify-between mt-6 px-2">
                           <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">MetLife Stadium</span>
                           <span className="text-[10px] font-black text-fifa-gold uppercase tracking-[0.2em] animate-pulse">19 Julio • NY</span>
                           <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">82,500 Cap.</span>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Simulator;
