const flags = import.meta.glob('../assets/images/flags/*.{png,jpg,jpeg,svg}', { eager: true, as: 'url' });
const badges = import.meta.glob('../assets/images/teams/*.{png,jpg,jpeg,svg}', { eager: true, as: 'url' });
const stadiums = import.meta.glob('../assets/images/stadiums/*.{png,jpg,jpeg,webp,svg}', { eager: true, as: 'url' });

export const getTeamFlag = (teamId) => {
  let searchId = teamId;
  
  // mapeo de ids
  if (teamId.startsWith('uefa-')) searchId = 'europe';
  if (teamId.startsWith('fifa-')) searchId = 'fifa';
  
  const flagKey = Object.keys(flags).find(key => key.includes(`flag-${searchId}.`));
  return flagKey ? flags[flagKey] : null;
};

export const getTeamBadge = (teamId) => {
  const badgeKey = Object.keys(badges).find(key => key.includes(`badge-${teamId}.`));
  return badgeKey ? badges[badgeKey] : null;
};

export const getStadiumImage = (stadium) => {
  const { code, city, tournamentName, originalName } = stadium;
  // Definir busqueda de imagenes
  const searchTerms = [
    code.toLowerCase(),
    city.toLowerCase().replace(/\s+/g, ''),
    tournamentName.toLowerCase().replace(/\s+/g, ''),
    originalName.toLowerCase().replace(/\s+/g, '')
  ];

  const stadiumKey = Object.keys(stadiums).find(key => {
    const fileName = key.toLowerCase().split('/').pop().split('.')[0];
    const normalizedName = fileName.replace('stadium', '');
    
    // 
    if (searchTerms.some(term => term && (term.includes(normalizedName) || normalizedName.includes(term)))) return true;
    
    // fix para BC place
    if (normalizedName === 'bcplase' && searchTerms.some(term => term.includes('bcplace'))) return true;

    return false;
  });

  return stadiumKey ? stadiums[stadiumKey] : null;
};

