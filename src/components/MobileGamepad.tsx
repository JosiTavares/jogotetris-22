
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
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900/98 p-6 border-t-4 border-gray-700 backdrop-blur-sm">
      {/* Top Row - Pause/Reset */}
      <div className="flex justify-center gap-6 mb-6">
        <Button
          onClick={onPause}
          disabled={isGameOver}
          className="bg-yellow-600 hover:bg-yellow-700 h-14 px-8 text-base font-bold rounded-full shadow-lg"
        >
          {isPaused ? <Play className="w-5 h-5 mr-2" /> : <Pause className="w-5 h-5 mr-2" />}
          {isPaused ? 'CONTINUAR' : 'PAUSAR'}
        </Button>
        
        <Button
          onClick={onReset}
          className="bg-red-600 hover:bg-red-700 h-14 px-8 text-base font-bold rounded-full shadow-lg"
        >
          REINICIAR
        </Button>
      </div>

      {/* Game Controls */}
      <div className="flex justify-between items-center max-w-lg mx-auto">
        {/* D-Pad */}
        <div className="relative">
          <div className="grid grid-cols-3 grid-rows-3 gap-2 w-40 h-40">
            {/* Top empty */}
            <div></div>
            <Button
              onClick={onRotate}
              disabled={isGameOver || isPaused}
              className="bg-purple-600 hover:bg-purple-700 active:bg-purple-800 w-12 h-12 rounded-lg p-0 border-2 border-purple-400 shadow-lg"
            >
              <RotateCw className="w-6 h-6" />
            </Button>
            <div></div>
            
            {/* Middle row */}
            <Button
              onClick={() => onMove('left')}
              disabled={isGameOver || isPaused}
              className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 w-12 h-12 rounded-lg p-0 border-2 border-blue-400 shadow-lg"
            >
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <div className="w-12 h-12 bg-gray-800 rounded-lg border-2 border-gray-600"></div>
            <Button
              onClick={() => onMove('right')}
              disabled={isGameOver || isPaused}
              className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 w-12 h-12 rounded-lg p-0 border-2 border-blue-400 shadow-lg"
            >
              <ArrowRight className="w-6 h-6" />
            </Button>
            
            {/* Bottom row */}
            <div></div>
            <Button
              onClick={onDrop}
              disabled={isGameOver || isPaused}
              className="bg-green-600 hover:bg-green-700 active:bg-green-800 w-12 h-12 rounded-lg p-0 border-2 border-green-400 shadow-lg"
            >
              <ArrowDown className="w-6 h-6" />
            </Button>
            <div></div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-4">
          <Button
            onClick={onHardDrop}
            disabled={isGameOver || isPaused}
            className="bg-orange-600 hover:bg-orange-700 active:bg-orange-800 w-20 h-20 rounded-full p-0 border-4 border-orange-400 font-bold text-xs shadow-lg"
          >
            <div className="text-center">
              <Square className="w-5 h-5 mx-auto mb-1" />
              DROP
            </div>
          </Button>
          
          <Button
            onClick={onRotate}
            disabled={isGameOver || isPaused}
            className="bg-purple-600 hover:bg-purple-700 active:bg-purple-800 w-20 h-20 rounded-full p-0 border-4 border-purple-400 font-bold text-xs shadow-lg"
          >
            <div className="text-center">
              <RotateCw className="w-5 h-5 mx-auto mb-1" />
              GIRO
            </div>
          </Button>
        </div>
      </div>
      
      <div className="text-center mt-4">
        <p className="text-sm text-gray-400">Gamepad Virtual - Toque nos botões para jogar</p>
      </div>
    </div>
  );
};
