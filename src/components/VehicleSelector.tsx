
import React from 'react';
import { Car, Bike } from 'lucide-react';

type VehicleType = 'car' | 'motorbike' | null;

interface VehicleSelectorProps {
  selectedVehicle: VehicleType;
  onVehicleSelect: (vehicle: VehicleType) => void;
}

const VehicleSelector: React.FC<VehicleSelectorProps> = ({ 
  selectedVehicle, 
  onVehicleSelect 
}) => {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Choose Your Vehicle
      </h3>
      
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => onVehicleSelect(selectedVehicle === 'car' ? null : 'car')}
          className={`p-6 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
            selectedVehicle === 'car'
              ? 'border-blue-500 bg-blue-50 shadow-lg'
              : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
          }`}
        >
          <Car 
            size={48} 
            className={`mx-auto mb-2 transition-colors duration-300 ${
              selectedVehicle === 'car' ? 'text-blue-600' : 'text-gray-600'
            }`} 
          />
          <p className={`font-medium transition-colors duration-300 ${
            selectedVehicle === 'car' ? 'text-blue-700' : 'text-gray-700'
          }`}>
            Car
          </p>
        </button>

        <button
          onClick={() => onVehicleSelect(selectedVehicle === 'motorbike' ? null : 'motorbike')}
          className={`p-6 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
            selectedVehicle === 'motorbike'
              ? 'border-green-500 bg-green-50 shadow-lg'
              : 'border-gray-200 hover:border-green-300 hover:bg-green-50'
          }`}
        >
          <Bike 
            size={48} 
            className={`mx-auto mb-2 transition-colors duration-300 ${
              selectedVehicle === 'motorbike' ? 'text-green-600' : 'text-gray-600'
            }`} 
          />
          <p className={`font-medium transition-colors duration-300 ${
            selectedVehicle === 'motorbike' ? 'text-green-700' : 'text-gray-700'
          }`}>
            Motorbike
          </p>
        </button>
      </div>
    </div>
  );
};

export default VehicleSelector;
