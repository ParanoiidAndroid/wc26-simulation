// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';


const DataGrid = ({ 
  data, 
  renderItem, 
  emptyMessage = "No se encontraron resultados",
  gridClass = "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
}) => {
  if (data.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="py-20 text-center"
      >
        <p className="text-slate-500 font-bold uppercase tracking-[0.3em] text-sm">
          {emptyMessage}
        </p>
      </motion.div>
    );
  }

  return (
    <div className={gridClass}>
      {data.map((item, index) => (
        <motion.div
          key={item.id || index}
          layout
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            layout: { type: "spring", stiffness: 200, damping: 25 },
            opacity: { duration: 0.4 },
            default: { duration: 0.5, delay: index * 0.05 }
          }}
        >
          {renderItem(item)}
        </motion.div>
      ))}
    </div>
  );
};

export default DataGrid;
