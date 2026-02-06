import { useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';
import logo from '../../assets/icons/2026-Emblema-FIFAWC26_1.png';

const Preloader = ({ onLoadingComplete }) => {
  useEffect(() => {
    // Completo después de 2.2 segundos 
    const timer = setTimeout(() => {
      onLoadingComplete();
    }, 2200);

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        transition: { duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }
      }}
      className="fixed inset-0 z-[100] bg-fifa-black flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Dynamic Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-6xl">
          <motion.div 
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.1, 0.2, 0.1] 
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 right-0 w-[500px] h-[500px] bg-fifa-blue/15 blur-[160px] rounded-full" 
          />
          <motion.div 
            animate={{ 
              scale: [1.1, 1, 1.1],
              opacity: [0.05, 0.15, 0.05] 
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-fifa-cyan/10 blur-[160px] rounded-full" 
          />
        </div>
      </div>

      <div className="relative flex flex-col items-center">
        {/* Main Logo Animation */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ 
            scale: 1, 
            opacity: 1,
          }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          {/* Subtle Outer Ring */}
          <svg className="w-56 h-56 -rotate-90">
            <motion.circle
              cx="112"
              cy="112"
              r="108"
              stroke="white"
              strokeWidth="0.5"
              fill="none"
              strokeDasharray="0 680"
              animate={{ strokeDasharray: "680 680" }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="opacity-20"
            />
          </svg>

          {/* Centered Logo */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.img 
              src={logo} 
              alt="FIFA 26" 
              className="h-28 w-auto drop-shadow-[0_0_30px_rgba(0,163,224,0.3)]"
              animate={{ 
                filter: ["brightness(1) drop-shadow(0 0 20px rgba(0,163,224,0.3))", "brightness(1.2) drop-shadow(0 0 40px rgba(0,163,224,0.5))", "brightness(1) drop-shadow(0 0 20px rgba(0,163,224,0.3))"]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>

        {/* Minimalist Loading Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 flex flex-col items-center gap-6"
        >
          <div className="flex items-center gap-4">
             <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-fifa-blue/40" />
             <span className="text-[10px] font-black uppercase tracking-[0.8em] text-slate-400">
               Official Tracker
             </span>
             <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-fifa-blue/40" />
          </div>

          <div className="flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ 
                  opacity: [0.2, 1, 0.2],
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  duration: 1, 
                  repeat: Infinity, 
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
                className="w-1 h-1 rounded-full bg-fifa-blue"
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Extreme Bottom Decoration */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        className="absolute bottom-12 flex items-center gap-4"
      >
        <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white/50">
          fifa world cup 2026
        </span>
      </motion.div>
    </motion.div>
  );
};

export default Preloader;
