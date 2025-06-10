
import React from 'react';
import { Button } from '@/components/ui/button';
import { RotateCw, ArrowDown, ArrowLeft, ArrowRight, Square, Play, Pause } from 'lucide-react';

interface MobileGamepadProps {
  isPaused: boolean;
  isGameOver: boolean;
  onPause: () => void;
  onReset: () => void;
  onMove: (direction: 'left' | 'right') => void;
  onRotate: () => void;
  onDrop: () => void;
  onHardDrop: () => void;
}

export const MobileGamepad: React.FC<MobileGamepadProps> = ({
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
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900/95 p-4 border-t-2 border-gray-700">
      {/* Top Row - Pause/Reset */}
      <div className="flex justify-center gap-4 mb-4">
        <Button
          onClick={onPause}
          disabled={isGameOver}
          className="bg-yellow-600 hover:bg-yellow-700 h-12 px-6 text-sm font-bold rounded-full"
        >
          {isPaused ? <Play className="w-4 h-4 mr-1" /> : <Pause className="w-4 h-4 mr-1" />}
          {isPaused ? 'CONTINUAR' : 'PAUSAR'}
        </Button>
        
        <Button
          onClick={onReset}
          className="bg-red-600 hover:bg-red-700 h-12 px-6 text-sm font-bold rounded-full"
        >
          REINICIAR
        </Button>
      </div>

      {/* Game Controls */}
      <div className="flex justify-between items-center max-w-sm mx-auto">
        {/* D-Pad */}
        <div className="relative">
          <div className="grid grid-cols-3 grid-rows-3 gap-1 w-32 h-32">
            {/* Top empty */}
            <div></div>
            <Button
              onTouchStart={() => onRotate()}
              disabled={isGameOver || isPaused}
              className="bg-purple-600 hover:bg-purple-700 w-10 h-10 rounded-lg p-0 border-2 border-purple-400"
            >
              <RotateCw className="w-5 h-5" />
            </Button>
            <div></div>
            
            {/* Middle row */}
            <Button
              onTouchStart={() => onMove('left')}
              disabled={isGameOver || isPaused}
              className="bg-blue-600 hover:bg-blue-700 w-10 h-10 rounded-lg p-0 border-2 border-blue-400"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="w-10 h-10 bg-gray-800 rounded-lg border-2 border-gray-600"></div>
            <Button
              onTouchStart={() => onMove('right')}
              disabled={isGameOver || isPaused}
              className="bg-blue-600 hover:bg-blue-700 w-10 h-10 rounded-lg p-0 border-2 border-blue-400"
            >
              <ArrowRight className="w-5 h-5" />
            </Button>
            
            {/* Bottom row */}
            <div></div>
            <Button
              onTouchStart={() => onDrop()}
              disabled={isGameOver || isPaused}
              className="bg-green-600 hover:bg-green-700 w-10 h-10 rounded-lg p-0 border-2 border-green-400"
            >
              <ArrowDown className="w-5 h-5" />
            </Button>
            <div></div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <Button
            onTouchStart={() => onHardDrop()}
            disabled={isGameOver || isPaused}
            className="bg-orange-600 hover:bg-orange-700 w-16 h-16 rounded-full p-0 border-4 border-orange-400 font-bold text-xs"
          >
            <div className="text-center">
              <Square className="w-4 h-4 mx-auto mb-1" />
              DROP
            </div>
          </Button>
          
          <Button
            onTouchStart={() => onRotate()}
            disabled={isGameOver || isPaused}
            className="bg-purple-600 hover:bg-purple-700 w-16 h-16 rounded-full p-0 border-4 border-purple-400 font-bold text-xs"
          >
            <div className="text-center">
              <RotateCw className="w-4 h-4 mx-auto mb-1" />
              GIRO
            </div>
          </Button>
        </div>
      </div>
      
      <div className="text-center mt-3">
        <p className="text-xs text-gray-400">Gamepad Virtual - Toque nos botões para jogar</p>
      </div>
    </div>
  );
};
