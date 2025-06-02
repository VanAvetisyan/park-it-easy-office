
import React from 'react';
import { Car, Bike, CircleParking, CircleParkingOff } from 'lucide-react';

type VehicleType = 'car' | 'motorbike' | null;

interface ParkingData {
  id: number;
  isOccupied: boolean;
  occupantName: string;
  vehicleType: VehicleType;
  parkedAt?: string;
}

interface ParkingSpotProps {
  spot: ParkingData;
  canPark: boolean;
  onPark: (spotId: number) => void;
  onUnpark: (spotId: number) => void;
}

const ParkingSpot: React.FC<ParkingSpotProps> = ({ 
  spot, 
  canPark, 
  onPark, 
  onUnpark 
}) => {
  const getVehicleIcon = () => {
    if (spot.vehicleType === 'car') return <Car size={24} />;
    if (spot.vehicleType === 'motorbike') return <Bike size={24} />;
    return null;
  };

  return (
    <div className={`p-6 rounded-xl border-2 transition-all duration-300 ${
      spot.isOccupied 
        ? 'border-red-300 bg-red-50' 
        : 'border-green-300 bg-green-50 hover:shadow-md'
    }`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {spot.isOccupied ? (
            <CircleParkingOff className="text-red-600" size={32} />
          ) : (
            <CircleParking className="text-green-600" size={32} />
          )}
          <div>
            <h4 className="font-semibold text-gray-800">
              Parking Spot {spot.id}
            </h4>
            <p className={`text-sm ${
              spot.isOccupied ? 'text-red-600' : 'text-green-600'
            }`}>
              {spot.isOccupied ? 'Occupied' : 'Available'}
            </p>
          </div>
        </div>
        
        {spot.isOccupied && getVehicleIcon() && (
          <div className="text-gray-600">
            {getVehicleIcon()}
          </div>
        )}
      </div>

      {spot.isOccupied ? (
        <div className="space-y-3">
          <div className="bg-white rounded-lg p-3">
            <p className="text-sm text-gray-600">Parked by:</p>
            <p className="font-medium text-gray-800">{spot.occupantName}</p>
            <p className="text-sm text-gray-600">Parked since:</p>
            <p className="font-medium text-gray-800">{spot.parkedAt}</p>
          </div>
          <button
            onClick={() => onUnpark(spot.id)}
            className="w-full py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300 font-medium"
          >
            Unpark
          </button>
        </div>
      ) : (
        <button
          onClick={() => onPark(spot.id)}
          disabled={!canPark}
          className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
            canPark
              ? 'bg-green-500 text-white hover:bg-green-600 hover:scale-105'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          {canPark ? 'Park Here' : 'Select vehicle & enter name'}
        </button>
      )}
    </div>
  );
};

export default ParkingSpot;
