import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, RotateCcw, Image, Flag, Edit3, Save, Trash2, Download, Copy, Check, AlertCircle } from 'lucide-react';
import { toPng, toBlob } from 'html-to-image';
import teamsData from '../data/teams.json';
import { getTeamFlag, getTeamBadge } from '../utils/assets';

const DEFAULT_TIERS = [
  { id: 'S', name: 'S', color: 'bg-[#FFB81C]' },
  { id: 'A', name: 'A', color: 'bg-[#004B9C]' },
  { id: 'B', name: 'B', color: 'bg-[#00A3E0]' },
  { id: 'C', name: 'C', color: 'bg-[#94A3B8]' },
  { id: 'D', name: 'D', color: 'bg-[#F97316]' },
  { id: 'F', name: 'F', color: 'bg-[#EF4444]' },
];

const TierList = () => {
  const [tiers, setTiers] = useState(() => {
    const saved = localStorage.getItem('fifa-tier-list-names');
    return saved ? JSON.parse(saved) : DEFAULT_TIERS;
  });

  const [tierData, setTierData] = useState(() => {
    const saved = localStorage.getItem('fifa-tier-list-data');
    if (saved) return JSON.parse(saved);
    
    // Initial state: all teams in 'pool'
    return {
      pool: teamsData.map(t => t.id),
      S: [], A: [], B: [], C: [], D: [], F: []
    };
  });

  const [useBadges, setUseBadges] = useState(false);
  const [editingTierId, setEditingTierId] = useState(null);
  const [isCopying, setIsCopying] = useState(false);
  const [modalConfig, setModalConfig] = useState({ show: false, type: '', title: '', description: '', icon: null, action: null });
  const tierListRef = useRef(null);

  // Persistence
  useEffect(() => {
    localStorage.setItem('fifa-tier-list-data', JSON.stringify(tierData));
  }, [tierData]);

  useEffect(() => {
    localStorage.setItem('fifa-tier-list-names', JSON.stringify(tiers));
  }, [tiers]);

  // Auto-scroll logic during drag
  useEffect(() => {
    const handleDragOver = (e) => {
      const threshold = 150; // px from edge
      const speed = 5; // Reduced from 8 to 5 for even smoother scrolling
      
      if (e.clientY < threshold) {
        window.scrollBy(0, -speed);
      } else if (window.innerHeight - e.clientY < threshold) {
        window.scrollBy(0, speed);
      }
    };

    window.addEventListener('dragover', handleDragOver);
    return () => window.removeEventListener('dragover', handleDragOver);
  }, []);

  const onDragStart = (e, teamId, sourceTier) => {
    e.dataTransfer.setData('teamId', teamId);
    e.dataTransfer.setData('sourceTier', sourceTier);
  };

  const onDrop = (e, targetTier) => {
    e.preventDefault();
    const teamId = e.dataTransfer.getData('teamId');
    const sourceTier = e.dataTransfer.getData('sourceTier');

    if (sourceTier === targetTier) return;

    setTierData(prev => {
      const newSource = prev[sourceTier].filter(id => id !== teamId);
      const newTarget = [...prev[targetTier], teamId];
      return { ...prev, [sourceTier]: newSource, [targetTier]: newTarget };
    });
  };

  const onDragOver = (e) => e.preventDefault();

  const resetList = () => {
    setModalConfig({
      show: true,
      type: 'confirm',
      title: '¿Reiniciar Tier List?',
      description: 'Esta acción devolverá todas las selecciones al pool y restablecerá los nombres originales de los niveles.',
      icon: <RotateCcw size={32} className="text-red-500" />,
      action: handleConfirmReset
    });
  };

  const handleConfirmReset = () => {
    setTierData({
      pool: teamsData.map(t => t.id),
      S: [], A: [], B: [], C: [], D: [], F: []
    });
    setTiers(DEFAULT_TIERS);
    setModalConfig(prev => ({ ...prev, show: false }));
  };

  const handleNameChange = (id, newName) => {
    setTiers(prev => prev.map(t => t.id === id ? { ...t, name: newName } : t));
  };

  const handleDownload = async () => {
    if (!tierListRef.current) return;
    try {
      // Use toPng with improved options
      const dataUrl = await toPng(tierListRef.current, {
        cacheBust: true,
        backgroundColor: '#050505',
        pixelRatio: 2,
        style: {
          margin: '0',
          padding: '20px'
        }
      });
      
      const link = document.createElement('a');
      link.download = `fifa26-tierlist-${new Date().getTime()}.png`;
      link.href = dataUrl;
      document.body.appendChild(link); // Ensure it's in the DOM for manual click
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Error downloading image:', err);
      setModalConfig({
        show: true,
        type: 'error',
        title: 'Error al Descargar',
        description: 'Hubo un problema al generar la imagen. Por favor, intentá de nuevo o revisá los permisos de tu navegador.',
        icon: <Download size={32} className="text-red-500" />,
        action: null
      });
    }
  };

  const handleCopy = async () => {
    if (!tierListRef.current) return;
    setIsCopying(true);
    try {
      const blob = await toBlob(tierListRef.current, {
        cacheBust: true,
        backgroundColor: '#050505',
        pixelRatio: 2
      });
      
      if (!blob) throw new Error('Blob generation failed');

      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob })
      ]);
      setTimeout(() => setIsCopying(false), 2000);
    } catch (err) {
      console.error('Error copying image:', err);
      setModalConfig({
        show: true,
        type: 'error',
        title: 'Error al Copiar',
        description: 'Tu navegador no permite copiar imágenes al portapapeles o hubo un error en la generación.',
        icon: <Copy size={32} className="text-red-500" />,
        action: null
      });
      setIsCopying(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 bg-fifa-black">
      {/* Header */}
      <div className="container mx-auto px-6 mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-[1px] w-8 bg-fifa-blue" />
              <span className="text-xs font-black tracking-[0.4em] uppercase text-fifa-blue">
                Community Ranking
              </span>
            </div>
            <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter uppercase leading-none">
              Tier <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-fifa-blue/50">List</span>
            </h1>
          </motion.div>

          <div className="flex flex-wrap items-center gap-4">
             {/* Toggle Badge/Flag */}
             <button 
              onClick={() => setUseBadges(!useBadges)}
              className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-sm text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white hover:bg-white/10 transition-all"
            >
              {useBadges ? <Flag size={14} /> : <Image size={14} />}
              {useBadges ? 'Ver Banderas' : 'Ver Escudos'}
            </button>

            <button 
              onClick={handleDownload}
              className="flex items-center gap-2 px-6 py-3 bg-fifa-blue/10 border border-fifa-blue/20 rounded-sm text-[10px] font-black uppercase tracking-widest text-fifa-blue hover:bg-fifa-blue hover:text-white transition-all"
            >
              <Download size={14} />
              Descargar PNG
            </button>

            <button 
              onClick={handleCopy}
              disabled={isCopying}
              className="flex items-center gap-2 px-6 py-3 bg-fifa-cyan/10 border border-fifa-cyan/20 rounded-sm text-[10px] font-black uppercase tracking-widest text-fifa-cyan hover:bg-fifa-cyan hover:text-white transition-all disabled:opacity-50"
            >
              {isCopying ? <Check size={14} /> : <Copy size={14} />}
              {isCopying ? 'Copiado!' : 'Copiar Imagen'}
            </button>

            <button 
              onClick={resetList}
              className="flex items-center gap-2 px-6 py-3 bg-red-500/10 border border-red-500/20 rounded-sm text-[10px] font-black uppercase tracking-widest text-red-500 hover:bg-red-500 hover:text-white transition-all"
            >
              <RotateCcw size={14} />
              Reiniciar
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6">
        {/* Tier List Grid */}
        <div ref={tierListRef} className="space-y-4 mb-16 shadow-2xl">
          {tiers.map((tier) => (
            <div 
              key={tier.id}
              className="flex min-h-[110px] border border-white/5 bg-[#0a0c10]"
              onDragOver={onDragOver}
              onDrop={(e) => onDrop(e, tier.id)}
            >
              {/* Tier Label */}
              <div className={`w-32 md:w-44 flex-shrink-0 flex flex-col items-center justify-center p-4 ${tier.color} relative group transition-all duration-300`}>
                {editingTierId === tier.id ? (
                  <input 
                    autoFocus
                    className="w-full bg-black/20 text-black text-center font-black uppercase outline-none px-2 py-1 rounded"
                    value={tier.name}
                    onChange={(e) => handleNameChange(tier.id, e.target.value)}
                    onBlur={() => setEditingTierId(null)}
                    onKeyDown={(e) => e.key === 'Enter' && setEditingTierId(null)}
                  />
                ) : (
                  <div 
                    className="flex flex-col items-center justify-center gap-1 cursor-pointer w-full"
                    onClick={() => setEditingTierId(tier.id)}
                  >
                    <div className={`
                      ${tier.name.length > 8 ? 'text-[10px]' : tier.name.length > 5 ? 'text-sm' : 'text-xl md:text-2xl'}
                      font-black text-black uppercase leading-tight text-center break-all px-1
                    `}>
                      {tier.name}
                    </div>
                    <Edit3 size={12} className="opacity-40 group-hover:opacity-100 transition-opacity" />
                  </div>
                )}
              </div>

              {/* Tier Droppable Area */}
              <div className="flex-1 p-4 flex flex-wrap gap-2 content-start">
                {tierData[tier.id].map(teamId => (
                  <TeamCard 
                    key={teamId} 
                    teamId={teamId} 
                    useBadges={useBadges} 
                    onDragStart={(e) => onDragStart(e, teamId, tier.id)}
                  />
                ))}
                {tierData[tier.id].length === 0 && (
                  <div className="w-full h-full flex items-center justify-center text-[10px] font-bold text-slate-700 uppercase tracking-widest border-2 border-dashed border-white/[0.02]">
                    Arrastrá selecciones aquí
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Pool Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-black text-white uppercase italic tracking-tighter shrink-0">Selecciones</h2>
            <div className="h-px w-full bg-white/5" />
          </div>
          
          <div 
            className="min-h-[200px] p-8 bg-white/[0.02] border border-dashed border-white/10 rounded-xl flex flex-wrap gap-4 justify-center"
            onDragOver={onDragOver}
            onDrop={(e) => onDrop(e, 'pool')}
          >
            {tierData.pool.map(teamId => (
              <TeamCard 
                key={teamId} 
                teamId={teamId} 
                useBadges={useBadges}
                onDragStart={(e) => onDragStart(e, teamId, 'pool')}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Unified Custom Modal */}
      <AnimatePresence>
        {modalConfig.show && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalConfig(prev => ({ ...prev, show: false }))}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-fifa-black border border-white/10 p-8 rounded-sm shadow-2xl z-10"
            >
              <div className="flex flex-col items-center text-center space-y-6">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center border border-white/10 mb-2">
                  {modalConfig.icon || <AlertCircle size={32} className="text-fifa-blue" />}
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-white uppercase tracking-tighter">{modalConfig.title}</h3>
                  <p className="text-slate-400 text-sm font-medium">{modalConfig.description}</p>
                </div>
                <div className="flex flex-col w-full gap-3">
                  {modalConfig.action ? (
                    <>
                      <button 
                        onClick={modalConfig.action}
                        className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-black uppercase tracking-[0.2em] text-xs transition-all rounded-sm"
                      >
                        Confirmar
                      </button>
                      <button 
                        onClick={() => setModalConfig(prev => ({ ...prev, show: false }))}
                        className="w-full py-4 bg-white/5 hover:bg-white/10 text-white font-black uppercase tracking-[0.2em] text-xs border border-white/10 transition-all rounded-sm"
                      >
                        Volver Atrás
                      </button>
                    </>
                  ) : (
                    <button 
                      onClick={() => setModalConfig(prev => ({ ...prev, show: false }))}
                      className="w-full py-4 bg-fifa-blue hover:bg-fifa-blue/80 text-white font-black uppercase tracking-[0.2em] text-xs transition-all rounded-sm"
                    >
                      Aceptar
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

const TeamCard = ({ teamId, useBadges, onDragStart }) => {
  const team = teamsData.find(t => t.id === teamId);
  if (!team) return null;

  const image = useBadges ? getTeamBadge(teamId) : getTeamFlag(teamId);

  return (
    <motion.div
      layout
      draggable
      onDragStart={onDragStart}
      className="cursor-pointer group relative flex-shrink-0"
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className={`
        ${useBadges ? 'w-16 h-16 p-2 rounded-full' : 'w-24 h-14 rounded-sm'}
        overflow-hidden border border-white/10 bg-[#1a1c22] shadow-lg group-hover:border-fifa-blue/50 transition-all flex items-center justify-center flex-none
      `}>
        <img 
          src={image} 
          alt={team.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
          style={{ width: useBadges ? '64px' : '96px', height: useBadges ? '64px' : '56px', minWidth: useBadges ? '64px' : '96px', minHeight: useBadges ? '64px' : '56px' }}
        />
      </div>
      
      {/* Tooltip on hover */}
      <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-black text-[8px] font-black text-white rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 border border-white/10">
        {team.name}
      </div>
    </motion.div>
  );
};

export default TierList;
