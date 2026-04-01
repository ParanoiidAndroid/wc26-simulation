export const LOCAL_TO_ARG_OFFSETS = {
  // +1h to Arg (EDT UTC-4 to ARG UTC-3)
  "Toronto": 1,
  "Atlanta": 1,
  "Miami": 1,
  "Philadelphia": 1,
  "East Rutherford": 1,
  "Boston": 1,
  "Foxborough": 1,
  "New York New Jersey": 1,
  
  // +2h to Arg (CDT UTC-5 to ARG UTC-3)
  "Houston": 2,
  "Dallas": 2,
  "Kansas City": 2,
  
  // +3h to Arg (CST UTC-6 to ARG UTC-3)
  "Ciudad de México": 3,
  "Guadalajara": 3,
  "Monterrey": 3,
  
  // +4h to Arg (PDT UTC-7 to ARG UTC-3)
  "Los Angeles": 4,
  "San Francisco": 4,
  "Seattle": 4,
  "Vancouver": 4
};

/**
 * Converts a time string (HH:mm) from Local city time to Argentine time.
 * @param {string} localTimeStr - "HH:mm" in Local time
 * @param {string} city - City name
 * @returns {string} - "HH:mm" in Argentine time
 */
export const getArgTime = (localTimeStr, city) => {
  if (!localTimeStr) return "";
  
  const [hours, minutes] = localTimeStr.split(':').map(Number);
  const offset = LOCAL_TO_ARG_OFFSETS[city] || 0;
  
  let argHours = hours + offset;
  
  // Handle day wrap
  if (argHours < 0) argHours += 24;
  if (argHours >= 24) argHours -= 24;
  
  return `${String(argHours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
};
