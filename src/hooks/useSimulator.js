import { useState, useMemo, useEffect } from 'react';

/**
 * useSimulator Hook
 * Manages the whole World Cup 2026 simulation logic.
 */
export const useSimulator = (initialMatches, teams) => {
  // State for match scores
  const [matchResults, setMatchResults] = useState(() => {
    try {
      const saved = localStorage.getItem('fifa-wc26-sim');
      return (saved && JSON.parse(saved)) || {};
    } catch { return {}; }
  });

  // State for knockout winners (id of the winning team)
  const [knockoutWinners, setKnockoutWinners] = useState(() => {
    try {
      const saved = localStorage.getItem('fifa-wc26-knockout');
      return (saved && JSON.parse(saved)) || {};
    } catch { return {}; }
  });

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('fifa-wc26-sim', JSON.stringify(matchResults));
  }, [matchResults]);

  useEffect(() => {
    localStorage.setItem('fifa-wc26-knockout', JSON.stringify(knockoutWinners));
  }, [knockoutWinners]);

  const updateScore = (matchId, score1, score2) => {
    setMatchResults(prev => ({
      ...prev,
      [matchId]: { 
        score1: score1 === '' ? null : parseInt(score1), 
        score2: score2 === '' ? null : parseInt(score2) 
      }
    }));
  };

  const setWinner = (matchId, teamId) => {
    setKnockoutWinners(prev => ({
      ...prev,
      [matchId]: teamId
    }));
  };

  const resetSimulator = () => {
    setMatchResults({});
    setKnockoutWinners({});
    localStorage.removeItem('fifa-wc26-sim');
    localStorage.removeItem('fifa-wc26-knockout');
  };

  // 1. Calculate Standings for each group
  const standings = useMemo(() => {
    const groups = {};
    
    // Initialize groups
    teams.forEach(team => {
      if (!groups[team.group]) {
        groups[team.group] = [];
      }
      groups[team.group].push({
        ...team,
        mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0
      });
    });

    // Process match results
    initialMatches.forEach(match => {
      const result = matchResults[match.id];
      if (result && result.score1 !== null && result.score2 !== null) {
        const { score1, score2 } = result;
        const group = groups[match.group];
        const t1 = group.find(t => t.id === match.team1);
        const t2 = group.find(t => t.id === match.team2);

        if (t1 && t2) {
          t1.mp += 1;
          t2.mp += 1;
          t1.gf += score1;
          t1.ga += score2;
          t2.gf += score2;
          t2.ga += score1;
          t1.gd = t1.gf - t1.ga;
          t2.gd = t2.gf - t2.ga;

          if (score1 > score2) {
            t1.w += 1;
            t1.pts += 3;
            t2.l += 1;
          } else if (score1 < score2) {
            t2.w += 1;
            t2.pts += 3;
            t1.l += 1;
          } else {
            t1.d += 1;
            t2.d += 1;
            t1.pts += 1;
            t2.pts += 1;
          }
        }
      }
    });

    // Sort each group
    Object.keys(groups).forEach(groupKey => {
      groups[groupKey].sort((a, b) => {
        if (b.pts !== a.pts) return b.pts - a.pts;
        if (b.gd !== a.gd) return b.gd - a.gd;
        return b.gf - a.gf;
      });
    });

    return groups;
  }, [initialMatches, teams, matchResults]);

  // 2. Identify advancing teams
  const advancement = useMemo(() => {
    const qualified = []; // Teams in R32
    const thirdPlaces = [];

    Object.keys(standings).forEach(groupKey => {
      const group = standings[groupKey];
      // 1st and 2nd always advance
      if (group[0]) qualified.push({ ...group[0], pos: 1, originGroup: groupKey });
      if (group[1]) qualified.push({ ...group[1], pos: 2, originGroup: groupKey });
      // 3rd place goes to pool
      if (group[2]) thirdPlaces.push({ ...group[2], pos: 3, originGroup: groupKey });
    });

    // Sort 3rd places to find top 8
    thirdPlaces.sort((a, b) => {
      if (b.pts !== a.pts) return b.pts - a.pts;
      if (b.gd !== a.gd) return b.gd - a.gd;
      return b.gf - a.gf;
    });

    const topThirdPlaces = thirdPlaces.slice(0, 8);
    const allQualified = [...qualified, ...topThirdPlaces];

    const winners = allQualified.filter(t => t.pos === 1);
    const runnersUp = allQualified.filter(t => t.pos === 2);
    const bestThirds = allQualified.filter(t => t.pos === 3);

    const r32Matches = [];
    
    // R32 Pairing Logic (Simplified schema)
    if (winners.length === 12 && runnersUp.length === 12 && bestThirds.length === 8) {
      r32Matches.push({ id: 'R32-1', t1: winners.find(t => t.originGroup === 'A'), t2: bestThirds[0] });
      r32Matches.push({ id: 'R32-2', t1: runnersUp.find(t => t.originGroup === 'A'), t2: runnersUp.find(t => t.originGroup === 'B') });
      r32Matches.push({ id: 'R32-3', t1: winners.find(t => t.originGroup === 'B'), t2: bestThirds[1] });
      r32Matches.push({ id: 'R32-4', t1: winners.find(t => t.originGroup === 'C'), t2: bestThirds[2] });
      r32Matches.push({ id: 'R32-5', t1: runnersUp.find(t => t.originGroup === 'C'), t2: runnersUp.find(t => t.originGroup === 'D') });
      r32Matches.push({ id: 'R32-6', t1: winners.find(t => t.originGroup === 'D'), t2: bestThirds[3] });
      r32Matches.push({ id: 'R32-7', t1: winners.find(t => t.originGroup === 'E'), t2: bestThirds[4] });
      r32Matches.push({ id: 'R32-8', t1: runnersUp.find(t => t.originGroup === 'E'), t2: runnersUp.find(t => t.originGroup === 'F') });
      r32Matches.push({ id: 'R32-9', t1: winners.find(t => t.originGroup === 'F'), t2: bestThirds[5] });
      r32Matches.push({ id: 'R32-10', t1: winners.find(t => t.originGroup === 'G'), t2: bestThirds[6] });
      r32Matches.push({ id: 'R32-11', t1: runnersUp.find(t => t.originGroup === 'G'), t2: runnersUp.find(t => t.originGroup === 'H') });
      r32Matches.push({ id: 'R32-12', t1: winners.find(t => t.originGroup === 'H'), t2: bestThirds[7] });
      r32Matches.push({ id: 'R32-13', t1: winners.find(t => t.originGroup === 'I'), t2: winners.find(t => t.originGroup === 'J') });
      r32Matches.push({ id: 'R32-14', t1: runnersUp.find(t => t.originGroup === 'I'), t2: runnersUp.find(t => t.originGroup === 'J') });
      r32Matches.push({ id: 'R32-15', t1: winners.find(t => t.originGroup === 'K'), t2: winners.find(t => t.originGroup === 'L') });
      r32Matches.push({ id: 'R32-16', t1: runnersUp.find(t => t.originGroup === 'K'), t2: runnersUp.find(t => t.originGroup === 'L') });
    }

    // Helper to get winner team object
    const getWinner = (matchId, matchesArray) => {
      const match = matchesArray.find(m => m.id === matchId);
      const winnerId = knockoutWinners[matchId];
      if (!winnerId || !match) return null;
      return winnerId === match.t1?.id ? match.t1 : match.t2;
    };

    // R16 Matches
    const r16Matches = [];
    if (r32Matches.length === 16) {
      for (let i = 0; i < 8; i++) {
        r16Matches.push({
          id: `R16-${i + 1}`,
          t1: getWinner(`R32-${i * 2 + 1}`, r32Matches),
          t2: getWinner(`R32-${i * 2 + 2}`, r32Matches)
        });
      }
    }

    // QF Matches
    const qfMatches = [];
    if (r16Matches.length === 8) {
      for (let i = 0; i < 4; i++) {
        qfMatches.push({
          id: `QF-${i + 1}`,
          t1: getWinner(`R16-${i * 2 + 1}`, r16Matches),
          t2: getWinner(`R16-${i * 2 + 2}`, r16Matches)
        });
      }
    }

    // SF Matches
    const sfMatches = [];
    if (qfMatches.length === 4) {
      for (let i = 0; i < 2; i++) {
        sfMatches.push({
          id: `SF-${i + 1}`,
          t1: getWinner(`QF-${i * 2 + 1}`, qfMatches),
          t2: getWinner(`QF-${i * 2 + 2}`, qfMatches)
        });
      }
    }

    // Final Match
    let finalMatch = null;
    if (sfMatches.length === 2) {
      finalMatch = {
        id: 'FINAL',
        t1: getWinner('SF-1', sfMatches),
        t2: getWinner('SF-2', sfMatches)
      };
    }

    // Third Place Match
    let thirdPlaceMatch = null;
    if (sfMatches.length === 2) {
      const getLoser = (matchId, matchesArray) => {
        const match = matchesArray.find(m => m.id === matchId);
        const winnerId = knockoutWinners[matchId];
        if (!winnerId || !match) return null;
        return winnerId === match.t1?.id ? match.t2 : match.t1;
      };
      thirdPlaceMatch = {
        id: '3RD',
        t1: getLoser('SF-1', sfMatches),
        t2: getLoser('SF-2', sfMatches)
      };
    }

    return {
      allQualified,
      topThirdPlaces,
      thirdPlaces,
      r32Matches,
      r16Matches,
      qfMatches,
      sfMatches,
      finalMatch,
      thirdPlaceMatch,
      isGroupPhaseComplete: Object.keys(matchResults).filter(id => initialMatches.some(m => m.id === id)).length >= initialMatches.length
    };
  }, [standings, initialMatches, matchResults, knockoutWinners]);

  return {
    standings,
    matchResults,
    knockoutWinners,
    updateScore,
    setWinner,
    resetSimulator,
    advancement
  };
};
