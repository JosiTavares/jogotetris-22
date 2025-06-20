
import React from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCw, ArrowDown, ArrowLeft, ArrowRight, Square } from 'lucide-react';

interface GameControlsProps {
  isPaused: boolean;
  isGameOver: boolean;
  onPause: () => void;
  onReset: () => void;
  onMove: (direction: 'left' | 'right') => void;
  onRotate: () => void;
  onDrop: () => void;
  onHardDrop: () => void;
}

export const GameControls: React.FC<GameControlsProps> = ({
  isPaused,
  isGameOver,
  onPause,
  onReset,
  onMove,
  onRotate,
  onDrop,
  onHardDrop
}) => {
  return (
    <div className="space-y-4">
      <div className="bg-gray-900 p-4 rounded-lg border-2 border-gray-700 shadow-xl">
        <h3 className="text-lg font-bold text-white mb-4 text-center">Controles PC</h3>
        
        <div className="space-y-3">
          <div className="flex gap-2">
            <Button
              onClick={onPause}
              disabled={isGameOver}
              className="flex-1 bg-yellow-600 hover:bg-yellow-700 h-12 text-base"
            >
              {isPaused ? <Play className="w-5 h-5 mr-2" /> : <Pause className="w-5 h-5 mr-2" />}
              {isPaused ? 'Continuar' : 'Pausar'}
            </Button>
            
            <Button
              onClick={onReset}
              className="flex-1 bg-red-600 hover:bg-red-700 h-12 text-base"
            >
              Reiniciar
            </Button>
          </div>
          
          <div className="grid grid-cols-3 gap-2">
            <Button
              onClick={() => onMove('left')}
              disabled={isGameOver || isPaused}
              className="bg-blue-600 hover:bg-blue-700 h-12 min-h-12"
            >
              <ArrowLeft className="w-6 h-6" />
            </Button>
            
            <Button
              onClick={onRotate}
              disabled={isGameOver || isPaused}
              className="bg-purple-600 hover:bg-purple-700 h-12 min-h-12"
            >
              <RotateCw className="w-6 h-6" />
            </Button>
            
            <Button
              onClick={() => onMove('right')}
              disabled={isGameOver || isPaused}
              className="bg-blue-600 hover:bg-blue-700 h-12 min-h-12"
            >
              <ArrowRight className="w-6 h-6" />
            </Button>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <Button
              onClick={onDrop}
              disabled={isGameOver || isPaused}
              className="bg-green-600 hover:bg-green-700 h-12 text-sm"
            >
              <ArrowDown className="w-5 h-5 mr-1" />
              Descer
            </Button>
            
            <Button
              onClick={onHardDrop}
              disabled={isGameOver || isPaused}
              className="bg-orange-600 hover:bg-orange-700 h-12 text-sm"
            >
              <Square className="w-5 h-5 mr-1" />
              Queda
            </Button>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-900 p-4 rounded-lg border-2 border-gray-700 shadow-xl">
        <h4 className="text-sm font-bold text-white mb-2">Controles de Teclado:</h4>
        <div className="text-xs text-gray-300 space-y-1">
          <div><span className="text-blue-400">A/D ou ←/→</span>: Mover</div>
          <div><span className="text-purple-400">W/Q/↑/Espaço</span>: Girar</div>
          <div><span className="text-green-400">S/↓</span>: Descer</div>
          <div><span className="text-orange-400">E/Enter</span>: Queda rápida</div>
          <div><span className="text-yellow-400">P</span>: Pausar</div>
        </div>
        <div className="mt-2 text-xs text-gray-500">
          ✓ Compatível com teclado 60%
        </div>
      </div>
    </div>
  );
};
