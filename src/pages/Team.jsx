import teamsData from '../data/teams.json';
import { useFilteredList } from '../hooks/useFilteredList';
import DataGrid from '../components/common/DataGrid';
import TeamCards from '../components/teams/TeamCards';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';
import { Search, SortAsc } from 'lucide-react';

const Team = () => {
  const { 
    data: filteredTeams, 
    searchTerm, 
    setSearchTerm, 
    updateFilter, 
    filters,
    setSortConfig,
    totalCount
  } = useFilteredList(teamsData, {
    searchFields: ['name', 'shortName', 'coach'],
    defaultSort: { field: 'fifaRanking', direction: 'asc' }
  });

  const confederations = ['Todas', ...new Set(teamsData.map(t => t.confederation))];

  return (
    <div className="min-h-screen pt-32 pb-20">
      {/* Page Header */}
      <div className="container mx-auto px-6 mb-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-12"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-[1px] w-8 bg-fifa-blue" />
              <span className="text-xs font-bold tracking-[0.4em] uppercase text-fifa-blue">
                FIFA World Cup 2026
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase leading-none">
              Selecciones <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-fifa-blue/50">
                Clasificadas
              </span>
            </h1>
          </div>
          
          <div className="text-right">
            <span className="text-6xl font-black text-white leading-none">{totalCount}</span>
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-slate-500 mt-2">Naciones Listas</p>
          </div>
        </motion.div>

        {/* Controls Container */}
        <div className="mt-12 space-y-8">
          {/* Confederation Filters */}
          <div className="flex flex-wrap gap-2">
            {confederations.map((confed) => (
              <button
                key={confed}
                onClick={() => updateFilter('confederation', confed)}
                className={`px-6 py-2.5 rounded-sm text-[10px] font-black uppercase tracking-widest transition-all
                  ${((!filters.confederation && confed === 'Todas') || (filters.confederation === confed))
                    ? 'bg-fifa-blue text-white shadow-[0_0_20px_rgba(0,75,156,0.3)] border-fifa-blue' 
                    : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white border border-white/5'}`}
              >
                {confed}
              </button>
            ))}
          </div>

          {/* Search & Sort */}
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
              <input 
                type="text"
                placeholder="BUSCAR POR NOMBRE O DT..."
                className="w-full bg-[#0a0c10] border border-white/10 rounded-sm py-3 pl-12 pr-4 text-xs font-bold uppercase tracking-widest text-white focus:border-fifa-blue focus:outline-none transition-colors"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <SortAsc className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                <select 
                  className="w-full bg-[#0a0c10] border border-white/10 rounded-sm py-3 pl-12 pr-4 text-[10px] font-black uppercase tracking-widest text-white focus:border-fifa-blue focus:outline-none appearance-none cursor-pointer transition-colors"
                  onChange={(e) => {
                    const [field, direction] = e.target.value.split(':');
                    setSortConfig({ field, direction });
                  }}
                  defaultValue="fifaRanking:asc"
                >
                  <option value="fifaRanking:asc">ORDENAR: RANKING FIFA</option>
                  <option value="name:asc">ORDENAR: NOMBRE (A-Z)</option>
                  <option value="group:asc">ORDENAR: GRUPO (A-L)</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid Container */}
      <div className="container mx-auto px-6">
        <DataGrid 
          data={filteredTeams}
          renderItem={(team) => <TeamCards team={team} />}
          emptyMessage="No se encontraron selecciones con esos filtros"
        />
      </div>
    </div>
  );
};

export default Team;
