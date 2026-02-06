import calendarData from '../data/calendar.json';
import { useFilteredList } from '../hooks/useFilteredList';
import DataGrid from '../components/common/DataGrid';
import MatchCard from '../components/calendar/MatchCard';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';
import { Trophy, Filter } from 'lucide-react';

const Calendar = () => {
  const { 
    data: filteredMatches, 
    updateFilter, 
    filters,
    totalCount
  } = useFilteredList(calendarData, {
    searchFields: ['venue', 'city', 'stage'],
    defaultSort: { field: 'date', direction: 'asc' }
  });

  const groups = ['Todas', ...new Set(calendarData.map(m => m.group))].sort();

  return (
    <div className="min-h-screen pt-32 pb-20">
      {/* Header */}
      <div className="container mx-auto px-6 mb-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-[1px] w-8 bg-fifa-blue" />
            <span className="text-xs font-bold tracking-[0.4em] uppercase text-fifa-blue">
              Official Schedule
            </span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter uppercase leading-none mb-6">
            Calendario de <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-fifa-blue/50">
              Partidos
            </span>
          </h1>
          <p className="text-slate-400 font-medium max-w-xl border-l-2 border-fifa-blue/30 pl-6 py-2">
            Seguí el camino a la gloria. Desde el partido inaugural en el Estadio Azteca hasta la gran final en Nueva York Nueva Jersey.
          </p>
        </motion.div>

        {/* Group Filters */}
        <div className="mt-12">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-6 flex items-center gap-3">
             <Filter size={12} className="text-fifa-blue" />
             Filtrar por Grupo
          </p>
          <div className="flex flex-wrap gap-2">
            {groups.map((group) => (
              <button
                key={group}
                onClick={() => updateFilter('group', group)}
                className={`w-12 h-12 flex items-center justify-center rounded-sm text-xs font-black uppercase transition-all border
                  ${((!filters.group && group === 'Todas') || (filters.group === group))
                    ? 'bg-fifa-blue text-white shadow-[0_0_20px_rgba(0,75,156,0.3)] border-fifa-blue' 
                    : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white border-white/5'}`}
              >
                {group === 'Todas' ? 'ALL' : group}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid Container */}
      <div className="container mx-auto px-6 space-y-20">
        <div>
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-fifa-blue/10 border border-fifa-blue/20 flex items-center justify-center">
                  <Trophy size={20} className="text-fifa-blue" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Fase de Grupos</h2>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Junio 2026</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-3xl font-black text-white leading-none">{totalCount}</span>
              <p className="text-[10px] font-bold tracking-[0.1em] uppercase text-slate-500">Partidos Encontrados</p>
            </div>
          </div>
          
          <DataGrid 
            data={filteredMatches}
            renderItem={(match) => <MatchCard match={match} />}
            gridClass="grid grid-cols-1 lg:grid-cols-2 gap-6"
            emptyMessage="No hay partidos programados para este grupo"
          />
        </div>
      </div>
    </div>
  );
};

export default Calendar;
