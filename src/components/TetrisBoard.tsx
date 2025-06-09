
import React from 'react';
import { GameState } from '../types/tetrisTypes';
import { BOARD_WIDTH, BOARD_HEIGHT } from '../constants/tetrisConstants';

interface TetrisBoardProps {
  gameState: GameState;
}

export const TetrisBoard: React.FC<TetrisBoardProps> = ({ gameState }) => {
  const renderBoard = () => {
    const board = gameState.board.map(row => [...row]);
    
    // Draw current piece on board
    if (gameState.currentPiece) {
      const { currentPiece } = gameState;
      for (let y = 0; y < currentPiece.shape.length; y++) {
        for (let x = 0; x < currentPiece.shape[y].length; x++) {
          if (currentPiece.shape[y][x]) {
            const boardY = currentPiece.position.y + y;
            const boardX = currentPiece.position.x + x;
            if (boardY >= 0 && boardY < BOARD_HEIGHT && boardX >= 0 && boardX < BOARD_WIDTH) {
              board[boardY][boardX] = currentPiece.color;
            }
          }
        }
      }
    }

    return board.map((row, y) => (
      <div key={y} className="flex">
        {row.map((cell, x) => (
          <div
            key={`${y}-${x}`}
            className={`
              w-6 h-6 border border-gray-700 transition-all duration-100
              ${cell 
                ? 'shadow-inner' 
                : 'bg-gray-900/50'
              }
            `}
            style={{
              backgroundColor: cell || undefined,
              boxShadow: cell ? `inset 0 0 0 1px rgba(255,255,255,0.3), 0 0 10px ${cell}40` : undefined
            }}
          />
        ))}
      </div>
    ));
  };

  return (
    <div className="relative">
      <div className="bg-gray-900 p-4 rounded-lg border-2 border-gray-700 shadow-2xl">
        <div className="grid gap-0 bg-black/30 p-2 rounded">
          {renderBoard()}
        </div>
      </div>
      
      {gameState.isGameOver && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center rounded-lg">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-red-400 mb-2">GAME OVER</h2>
            <p className="text-gray-300">Pressione R para recomeçar</p>
          </div>
        </div>
      )}
      
      {gameState.isPaused && !gameState.isGameOver && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center rounded-lg">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-yellow-400 mb-2">PAUSADO</h2>
            <p className="text-gray-300">Pressione P para continuar</p>
          </div>
        </div>
      )}
    </div>
  );
};
