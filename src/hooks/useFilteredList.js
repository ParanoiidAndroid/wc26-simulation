import { useState, useMemo } from 'react';

/**
 * Hook genérico para filtrar, buscar y ordenar listas de datos.
 * 
 * @param {Array} initialData - Los datos originales.
 * @param {Object} options - Opciones de configuración.
 * @param {Array} options.searchFields - Campos por los que se puede buscar texto.
 * @param {string} options.defaultSort - Campo de ordenamiento por defecto.
 */
export const useFilteredList = (initialData, options = {}) => {
  const { searchFields = [], defaultSort = null } = options;

  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({});
  const [sortConfig, setSortConfig] = useState(defaultSort);

  // Función para actualizar un filtro específico
  const updateFilter = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value === 'Todas' ? null : value
    }));
  };

  // Lógica de procesamiento de la lista
  const filteredData = useMemo(() => {
    let result = [...initialData];

    // 1. Aplicar Búsqueda
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      result = result.filter(item => 
        searchFields.some(field => {
          const value = item[field];
          return value && String(value).toLowerCase().includes(lowerSearch);
        })
      );
    }

    // 2. Aplicar Filtros (exactamente igual a lo que hay en el item)
    Object.keys(filters).forEach(key => {
      const filterValue = filters[key];
      if (filterValue !== null && filterValue !== undefined) {
        result = result.filter(item => item[key] === filterValue);
      }
    });

    // 3. Aplicar Ordenamiento
    if (sortConfig) {
      result.sort((a, b) => {
        let valA = a[sortConfig.field];
        let valB = b[sortConfig.field];

        // Lógica para que los valores nulos/vacíos siempre vayan al final
        const isEmptyA = valA === null || valA === undefined || valA === 0;
        const isEmptyB = valB === null || valB === undefined || valB === 0;

        if (isEmptyA && !isEmptyB) return 1;
        if (!isEmptyA && isEmptyB) return -1;
        if (isEmptyA && isEmptyB) return 0;

        if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
        if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [initialData, searchTerm, filters, sortConfig, searchFields]);

  return {
    data: filteredData,
    searchTerm,
    setSearchTerm,
    filters,
    updateFilter,
    sortConfig,
    setSortConfig,
    totalCount: filteredData.length
  };
};
