// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';

const UnderConstruction = ({ title }) => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center pt-32 px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-8"
      >
        <div className="relative inline-block">
          <img 
            src="/under-const.jfif" 
            alt="Sección en construcción" 
            className="w-80 md:w-[450px] rounded-2xl shadow-2xl border border-white/10"
          />
          <div className="absolute inset-0 bg-fifa-black/20 rounded-2xl" />
          <div className="absolute -inset-4 bg-fifa-blue/10 blur-3xl -z-10" />
        </div>

        <div className="space-y-4">
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase leading-none">
            DESARROLLANDO <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-fifa-blue to-fifa-cyan">
              {title}
            </span>
          </h2>
          <p className="text-slate-500 font-bold uppercase tracking-[0.3em] text-[10px] md:text-sm">
            Modulo en progreso
          </p>
        </div>

        <div className="pt-8">
          <div className="inline-flex items-center gap-4 px-6 py-3 bg-white/5 border border-white/10 rounded-full animate-pulse">
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default UnderConstruction;
