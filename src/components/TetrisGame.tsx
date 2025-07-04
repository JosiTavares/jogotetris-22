
import React from 'react';
import { useTetris } from '../hooks/useTetris';
import { TetrisBoard } from './TetrisBoard';
import { NextPiece } from './NextPiece';
import { GameStats } from './GameStats';
import { GameControls } from './GameControls';
import { DeviceSelector } from './DeviceSelector';
import { MobileGamepad } from './MobileGamepad';

export const TetrisGame: React.FC = () => {
  const { gameState, controlMode, setControlMode, actions } = useTetris();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 p-2 md:p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-center mb-4 md:mb-8 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          TETRIS
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 md:gap-6">
          {/* Left Panel - Device Selector, Stats and Next Piece */}
          <div className="space-y-3 md:space-y-4 order-2 lg:order-1">
            <DeviceSelector 
              selectedDevice={controlMode}
              onDeviceChange={setControlMode}
            />
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
          
          {/* Right Panel - Controls (only show for PC mode) */}
          {controlMode === 'pc' && (
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
          )}
        </div>
        
        {/* Instructions */}
        <div className="mt-4 md:mt-8 text-center text-gray-400">
          <p className="text-xs md:text-sm">
            {controlMode === 'mobile' ? (
              <span>Use o gamepad virtual na parte inferior da tela</span>
            ) : (
              <>
                <span className="md:hidden">Setas ou WASD para mover • W/Q/Espaço para girar • E/Enter para queda rápida</span>
                <span className="hidden md:inline">
                  Setas ou WASD: Mover • ↑/W/Q/Espaço: Girar • ↓/S: Descer • E/Enter: Queda rápida • P: Pausar
                </span>
              </>
            )}
          </p>
        </div>
      </div>

      {/* Mobile Gamepad */}
      {controlMode === 'mobile' && (
        <MobileGamepad
          isPaused={gameState.isPaused}
          isGameOver={gameState.isGameOver}
          onPause={actions.pauseGame}
          onReset={actions.resetGame}
          onMove={actions.movePiece}
          onRotate={actions.rotatePiece}
          onDrop={actions.dropPiece}
          onHardDrop={actions.hardDrop}
        />
      )}
    </div>
  );
};
