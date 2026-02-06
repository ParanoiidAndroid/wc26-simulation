import { useState } from 'react';
import { useFilteredList } from '../hooks/useFilteredList';
import DataGrid from '../components/common/DataGrid';
import StadiumCard from '../components/stadiums/StadiumCard';
import stadiumData from '../data/stadium.json';
// eslint-disable-next-line no-unused-vars
import { motion, LayoutGroup } from 'motion/react';
import { Search, Map, Layout, LayoutGrid } from 'lucide-react';

const Stadiums = () => {
  const [viewMode, setViewMode] = (useState('2x1')); // '1x1' or '2x1'

  const { 
    data: filteredStadiums, 
    searchTerm, 
    setSearchTerm, 
    updateFilter, 
    filters,
    totalCount
  } = useFilteredList(stadiumData, {
    searchFields: ['tournamentName', 'originalName', 'city', 'country'],
    defaultSort: { field: 'tournamentName', direction: 'asc' }
  });

  const countries = ['Todas', ...new Set(stadiumData.map(s => s.country))];

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
              Host Venues 2026
            </span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter uppercase leading-none mb-6">
            Sedes y <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-fifa-blue/50">
              Estadios
            </span>
          </h1>
          <p className="text-slate-400 font-medium max-w-xl border-l-2 border-fifa-blue/30 pl-6 py-2">
            Explora los 16 templos del fútbol donde se escribirá la historia. Instalaciones de clase mundial preparadas para el mayor evento deportivo del planeta.
          </p>
        </motion.div>

        {/* Filters & Search */}
        <div className="mt-16 space-y-8">
           <div className="flex flex-wrap items-center justify-between gap-6">
              <div className="flex flex-wrap gap-2">
                {countries.map((country) => (
                  <button
                    key={country}
                    onClick={() => updateFilter('country', country)}
                    className={`px-8 py-3 rounded-sm text-[10px] font-black uppercase tracking-widest transition-all border
                      ${((!filters.country && country === 'Todas') || (filters.country === country))
                        ? 'bg-fifa-blue text-white shadow-[0_0_20px_rgba(0,75,156,0.3)] border-fifa-blue' 
                        : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white border-white/5'}`}
                  >
                    {country}
                  </button>
                ))}
              </div>

              {/* View Toggle */}
              <div className="flex items-center bg-white/5 border border-white/5 p-1 rounded-sm">
                <button 
                  onClick={() => setViewMode('1x1')}
                  className={`p-2 rounded-sm transition-all ${viewMode === '1x1' ? 'bg-fifa-blue text-white' : 'text-slate-500 hover:text-slate-300'}`}
                  title="Vista 1x1"
                >
                  <Layout size={18} />
                </button>
                <button 
                  onClick={() => setViewMode('2x1')}
                  className={`p-2 rounded-sm transition-all ${viewMode === '2x1' ? 'bg-fifa-blue text-white' : 'text-slate-500 hover:text-slate-300'}`}
                  title="Vista 2x1"
                >
                  <LayoutGrid size={18} />
                </button>
              </div>
           </div>

          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
              <input 
                type="text"
                placeholder="BUSCAR ESTADIO O CIUDAD..."
                className="w-full bg-[#0a0c10] border border-white/10 rounded-sm py-3 pl-12 pr-4 text-xs font-bold uppercase tracking-widest text-white focus:border-fifa-blue focus:outline-none transition-colors"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-4 text-slate-500">
               <Map size={18} className="text-fifa-blue" />
               <span className="text-xs font-bold uppercase tracking-widest">{totalCount} Sedes Oficiales</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid Container */}
      <div className="container mx-auto px-6">
        <LayoutGroup>
          <DataGrid 
            data={filteredStadiums}
            renderItem={(stadium) => <StadiumCard stadium={stadium} expansive={viewMode === '1x1'} />}
            gridClass={`grid gap-8 ${viewMode === '1x1' ? 'grid-cols-1' : 'grid-cols-1 xl:grid-cols-2'}`}
            emptyMessage="No se encontraron estadios con esos criterios"
          />
        </LayoutGroup>
      </div>
    </div>
  );
};


export default Stadiums;
