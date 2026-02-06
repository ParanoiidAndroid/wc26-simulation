// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import heroVideo from '../../assets/video/FIFA26-WC-BG-HERO.mp4';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <div className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-fifa-black">
      {/* Verificar dsp */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-fifa-black/80 backdrop-blur-[2px] z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-fifa-black via-fifa-black/40 to-transparent z-15" />
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="w-full h-full object-cover grayscale-[40%]"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
      </div>

      <div className="container mx-auto px-6 relative z-20">
        <div className="max-w-5xl">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-start text-left"
          >
            <motion.h1 
              variants={itemVariants}
              className="text-7xl md:text-[150px] font-black mb-10 leading-[0.8] tracking-tighter text-white"
            >
              FIFA <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-fifa-blue/50">
                WORLD CUP
              </span>
              <br />
              <span className="relative">
                26™
                <div className="absolute -bottom-4 left-0 w-32 h-2.5 bg-fifa-blue rounded-full blur-[2px]" />
              </span>
            </motion.h1>

            {/* Cold Data Stats Section */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap gap-12 md:gap-20 mb-16 py-8 border-y border-white/10 w-full"
            >
              <div className="flex flex-col">
                <span className="text-5xl md:text-7xl font-black text-white leading-none">48</span>
                <span className="text-xs font-bold tracking-[0.3em] uppercase text-fifa-blue mt-2">Selecciones</span>
              </div>
              
              <div className="flex flex-col">
                <span className="text-5xl md:text-7xl font-black text-white leading-none">16</span>
                <span className="text-xs font-bold tracking-[0.3em] uppercase text-fifa-blue mt-2">Ciudades Sede</span>
              </div>
              
              <div className="flex flex-col">
                <span className="text-5xl md:text-7xl font-black text-white leading-none">3</span>
                <span className="text-xs font-bold tracking-[0.3em] uppercase text-fifa-blue mt-2">Países Anfitriones</span>
              </div>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-6"
            >
              <Link 
                to="/simulator"
                className="px-12 py-5 bg-fifa-blue hover:bg-[#003a7a] text-white font-bold rounded-sm transition-all shadow-[0_0_30px_rgba(0,75,156,0.3)] flex items-center gap-4 group text-lg uppercase tracking-wider"
              >
                Simular Resultados
                <div className="w-6 h-6 flex items-center justify-center bg-white/10 rounded-full group-hover:translate-x-1 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
              
              <Link 
                to="/calendar"
                className="px-12 py-5 border border-white/10 hover:border-white/30 text-white font-bold rounded-sm transition-all backdrop-blur-md bg-white/5 text-lg uppercase tracking-wider hover:bg-white/10 text-center"
              >
                Calendario Oficial
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Technical Grid / Elements */}
      <div className="absolute right-0 top-0 h-full w-1/3 border-l border-white/5 pointer-events-none z-10 hidden xl:block">
        <div className="absolute top-1/4 right-0 w-full h-[1px] bg-white/5" />
        <div className="absolute top-2/4 right-0 w-full h-[1px] bg-white/5" />
        <div className="absolute top-3/4 right-0 w-full h-[1px] bg-white/5" />
      </div>

      {/* Decorative Blur Orbs */}
      <div className="absolute -top-24 -right-24 w-[600px] h-[600px] bg-fifa-blue/10 blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 -left-24 w-[400px] h-[400px] bg-fifa-cyan/5 blur-[150px] rounded-full pointer-events-none" />
    </div>
  );
};


export default Hero;



