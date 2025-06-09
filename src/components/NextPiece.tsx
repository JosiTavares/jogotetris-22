
import React from 'react';
import { Tetromino } from '../types/tetrisTypes';

interface NextPieceProps {
  nextPiece: Tetromino | null;
}

export const NextPiece: React.FC<NextPieceProps> = ({ nextPiece }) => {
  if (!nextPiece) return null;

  return (
    <div className="bg-gray-900 p-4 rounded-lg border-2 border-gray-700 shadow-xl">
      <h3 className="text-lg font-bold text-white mb-3 text-center">Próxima</h3>
      <div className="bg-black/30 p-3 rounded flex justify-center">
        <div className="grid gap-0">
          {nextPiece.shape.map((row, y) => (
            <div key={y} className="flex">
              {row.map((cell, x) => (
                <div
                  key={`${y}-${x}`}
                  className={`w-4 h-4 border border-gray-800 ${
                    cell ? 'shadow-inner' : ''
                  }`}
                  style={{
                    backgroundColor: cell ? nextPiece.color : 'transparent',
                    boxShadow: cell ? `inset 0 0 0 1px rgba(255,255,255,0.3), 0 0 8px ${nextPiece.color}40` : undefined
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
