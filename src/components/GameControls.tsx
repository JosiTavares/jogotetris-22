
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
        <h3 className="text-lg font-bold text-white mb-4 text-center">Controles</h3>
        
        <div className="space-y-3">
          <div className="flex gap-2">
            <Button
              onClick={onPause}
              disabled={isGameOver}
              className="flex-1 bg-yellow-600 hover:bg-yellow-700"
            >
              {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
              {isPaused ? 'Continuar' : 'Pausar'}
            </Button>
            
            <Button
              onClick={onReset}
              className="flex-1 bg-red-600 hover:bg-red-700"
            >
              Reiniciar
            </Button>
          </div>
          
          <div className="grid grid-cols-3 gap-2">
            <Button
              onClick={() => onMove('left')}
              disabled={isGameOver || isPaused}
              className="bg-blue-600 hover:bg-blue-700"
              size="sm"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            
            <Button
              onClick={onRotate}
              disabled={isGameOver || isPaused}
              className="bg-purple-600 hover:bg-purple-700"
              size="sm"
            >
              <RotateCw className="w-4 h-4" />
            </Button>
            
            <Button
              onClick={() => onMove('right')}
              disabled={isGameOver || isPaused}
              className="bg-blue-600 hover:bg-blue-700"
              size="sm"
            >
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <Button
              onClick={onDrop}
              disabled={isGameOver || isPaused}
              className="bg-green-600 hover:bg-green-700"
              size="sm"
            >
              <ArrowDown className="w-4 h-4" />
              Descer
            </Button>
            
            <Button
              onClick={onHardDrop}
              disabled={isGameOver || isPaused}
              className="bg-orange-600 hover:bg-orange-700"
              size="sm"
            >
              <Square className="w-4 h-4" />
              Queda
            </Button>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-900 p-4 rounded-lg border-2 border-gray-700 shadow-xl">
        <h4 className="text-sm font-bold text-white mb-2">Teclas:</h4>
        <div className="text-xs text-gray-300 space-y-1">
          <div>← → : Mover</div>
          <div>↑ / Espaço: Girar</div>
          <div>↓ : Descer</div>
          <div>Enter: Queda rápida</div>
          <div>P: Pausar</div>
        </div>
      </div>
    </div>
  );
};
