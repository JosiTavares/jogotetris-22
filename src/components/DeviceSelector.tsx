
import React from 'react';
import { Button } from '@/components/ui/button';
import { Monitor, Smartphone } from 'lucide-react';

interface DeviceSelectorProps {
  selectedDevice: 'mobile' | 'pc';
  onDeviceChange: (device: 'mobile' | 'pc') => void;
}

export const DeviceSelector: React.FC<DeviceSelectorProps> = ({
  selectedDevice,
  onDeviceChange
}) => {
  return (
    <div className="bg-gray-900 p-4 rounded-lg border-2 border-gray-700 shadow-xl mb-4">
      <h3 className="text-lg font-bold text-white mb-3 text-center">Modo de Controle</h3>
      <div className="grid grid-cols-2 gap-3">
        <Button
          onClick={() => onDeviceChange('pc')}
          className={`h-16 text-base ${
            selectedDevice === 'pc'
              ? 'bg-blue-600 hover:bg-blue-700 border-2 border-blue-400'
              : 'bg-gray-700 hover:bg-gray-600'
          }`}
        >
          <Monitor className="w-6 h-6 mr-2" />
          PC/Teclado
        </Button>
        
        <Button
          onClick={() => onDeviceChange('mobile')}
          className={`h-16 text-base ${
            selectedDevice === 'mobile'
              ? 'bg-green-600 hover:bg-green-700 border-2 border-green-400'
              : 'bg-gray-700 hover:bg-gray-600'
          }`}
        >
          <Smartphone className="w-6 h-6 mr-2" />
          Mobile/Touch
        </Button>
      </div>
    </div>
  );
};
