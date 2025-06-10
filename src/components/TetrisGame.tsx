
import React from 'react';
import { useTetris } from '../hooks/useTetris';
import { TetrisBoard } from './TetrisBoard';
import { NextPiece } from './NextPiece';
import { GameStats } from './GameStats';
import { GameControls } from './GameControls';

export const TetrisGame: React.FC = () => {
  const { gameState, actions } = useTetris();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 p-2 md:p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-center mb-4 md:mb-8 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          TETRIS
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 md:gap-6">
          {/* Left Panel - Stats and Next Piece */}
          <div className="space-y-3 md:space-y-4 order-2 lg:order-1">
            <GameStats 
              stats={{
                score: gameState.score,
                lines: gameState.lines,
                level: gameState.level
              }}
            />
            <NextPiece nextPiece={gameState.nextPiece} />
          </div>
          
          {/* Center - Game Board */}
          <div className="lg:col-span-2 flex justify-center order-1 lg:order-2">
            <TetrisBoard gameState={gameState} />
          </div>
          
          {/* Right Panel - Controls */}
          <div className="order-3">
            <GameControls
              isPaused={gameState.isPaused}
              isGameOver={gameState.isGameOver}
              onPause={actions.pauseGame}
              onReset={actions.resetGame}
              onMove={actions.movePiece}
              onRotate={actions.rotatePiece}
              onDrop={actions.dropPiece}
              onHardDrop={actions.hardDrop}
            />
          </div>
        </div>
        
        <div className="mt-4 md:mt-8 text-center text-gray-400">
          <p className="text-xs md:text-sm">
            <span className="md:hidden">Toque para girar • Arraste para mover e soltar</span>
            <span className="hidden md:inline">Use as setas do teclado para jogar • Espaço para girar • Enter para queda rápida</span>
          </p>
        </div>
      </div>
    </div>
  );
};
