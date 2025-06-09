
import React from 'react';
import { GameStats as GameStatsType } from '../types/tetrisTypes';

interface GameStatsProps {
  stats: GameStatsType;
}

export const GameStats: React.FC<GameStatsProps> = ({ stats }) => {
  return (
    <div className="bg-gray-900 p-4 rounded-lg border-2 border-gray-700 shadow-xl">
      <h3 className="text-lg font-bold text-white mb-4 text-center">Estatísticas</h3>
      <div className="space-y-3">
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-3 rounded-lg">
          <div className="text-white text-sm font-medium">Pontuação</div>
          <div className="text-white text-xl font-bold">{stats.score.toLocaleString()}</div>
        </div>
        
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-3 rounded-lg">
          <div className="text-white text-sm font-medium">Linhas</div>
          <div className="text-white text-xl font-bold">{stats.lines}</div>
        </div>
        
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-3 rounded-lg">
          <div className="text-white text-sm font-medium">Nível</div>
          <div className="text-white text-xl font-bold">{stats.level}</div>
        </div>
      </div>
    </div>
  );
};
