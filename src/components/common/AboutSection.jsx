// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';
import { Info, ShieldAlert, Trophy, Users, MapPin, Activity } from 'lucide-react';

const AboutSection = () => {
  const features = [
    { 
      icon: <Trophy size={18} />, 
      title: "Fixture Oficial", 
      desc: "Calendario completo de los 104 partidos del torneo." 
    },
    { 
      icon: <Users size={18} />, 
      title: "Naciones & Equipos", 
      desc: "Información de los 48 equipos y sus estrellas." 
    },
    { 
      icon: <Activity size={18} />, 
      title: "Simulador Real", 
      desc: "Motor de predicción basado en reglas oficiales." 
    },
    { 
      icon: <MapPin size={18} />, 
      title: "Sedes & Estadios", 
      desc: "Exploración técnica de los 16 estadios del Mundial 2026." 
    }
  ];

  return (
    <section className="relative py-24 md:py-32 bg-[#05070a] overflow-hidden border-y border-white/5">
      {/* Background Accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-fifa-blue/30 to-transparent" />
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 xl:gap-24">
          
          {/* Left Content: Text & Disclaimer */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 space-y-10"
          >
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="h-[2px] w-6 bg-fifa-blue" />
                <span className="text-[10px] font-black tracking-[0.4em] uppercase text-fifa-blue"></span>
              </div>
              <h2 className="text-4xl md:text-6xl xl:text-7xl font-black text-white tracking-tighter uppercase leading-[0.9] lg:max-w-md">
                La central técnica <br />
                del <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-fifa-blue">Mundial 2026</span>
              </h2>
            </div>

            <p className="text-slate-400 font-medium text-base md:text-lg leading-relaxed max-w-lg">
              Diseñado para entusiastas del fútbol, esta plataforma unifica la complejidad del formato de 48 equipos en una interfaz técnica y atractiva.
            </p>

            {/* Disclaimer Box */}
            <div className="relative">
              <div className="absolute -inset-2 bg-amber-500/5 blur-2xl rounded-full" />
              <div className="relative p-5 border-l-2 border-amber-500/50 bg-white/[0.02] flex gap-5">
                <ShieldAlert className="text-amber-500 shrink-0" size={20} />
                <div className="space-y-1">
                  <h4 className="text-[10px] font-black text-amber-500 uppercase tracking-widest">Aviso Legal</h4>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wide leading-relaxed">
                    Este sitio es un <span className="text-white">PROYECTO INDEPENDIENTE</span>. <br />
                    NO es oficial ni está afiliado a la FIFA. Los datos son informativos para simulación técnica.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Content: Redesigned Feature Cards */}
          <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {features.map((feature, idx) => (
              <motion.div 
                key={feature.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="relative group p-6 md:p-8 rounded-sm bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all duration-500"
              >
                {/* Technical Corner Detail */}
                <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-white/0 group-hover:border-fifa-blue/40 group-hover:w-12 group-hover:h-12 transition-all duration-500" />
                
                <div className="mb-6 flex items-center justify-between">
                  <div className="p-3 bg-fifa-blue/10 text-fifa-blue group-hover:bg-fifa-blue group-hover:text-white transition-colors duration-500 rounded-sm">
                    {feature.icon}
                  </div>
                  <span className="text-[10px] font-black text-white/10 group-hover:text-fifa-blue/20 transition-colors uppercase">0{idx + 1}</span>
                </div>
                
                <h3 className="text-[11px] font-black text-white uppercase tracking-[0.2em] mb-3 group-hover:text-fifa-blue transition-colors">
                  {feature.title}
                </h3>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wide leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
