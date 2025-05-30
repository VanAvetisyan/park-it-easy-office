import React, { useState } from 'react';
import VehicleSelector from '../components/VehicleSelector';
import ParkingSpot from '../components/ParkingSpot';
import NameInput from '../components/NameInput';

type VehicleType = 'car' | 'motorbike' | null;
type ParkingData = {
  id: number;
  isOccupied: boolean;
  occupantName: string;
  vehicleType: VehicleType;
};

const Index = () => {
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleType>(null);
  const [userName, setUserName] = useState('');
  const [parkingSpots, setParkingSpots] = useState<ParkingData[]>([
    { id: 84, isOccupied: false, occupantName: '', vehicleType: null },
    { id: 85, isOccupied: false, occupantName: '', vehicleType: null }
  ]);

  const handlePark = (spotId: number) => {
    if (!selectedVehicle || !userName.trim()) return;
    
    setParkingSpots(spots => 
      spots.map(spot => 
        spot.id === spotId 
          ? { 
              ...spot, 
              isOccupied: true, 
              occupantName: userName.trim(), 
              vehicleType: selectedVehicle 
            }
          : spot
      )
    );
    
    // Reset selection after parking
    setSelectedVehicle(null);
    setUserName('');
  };

  const handleUnpark = (spotId: number) => {
    setParkingSpots(spots => 
      spots.map(spot => 
        spot.id === spotId 
          ? { ...spot, isOccupied: false, occupantName: '', vehicleType: null }
          : spot
      )
    );
  };

  const canPark = selectedVehicle && userName.trim();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            🅿️ Office Parking
          </h1>
          <p className="text-gray-600 text-lg">
            Reserve your parking spot in seconds
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 animate-scale-in">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <VehicleSelector 
                selectedVehicle={selectedVehicle}
                onVehicleSelect={setSelectedVehicle}
              />
              
              {selectedVehicle && (
                <div className="animate-fade-in">
                  <NameInput 
                    userName={userName}
                    onNameChange={setUserName}
                  />
                </div>
              )}
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Available Spots
              </h3>
              
              {parkingSpots.map(spot => (
                <ParkingSpot
                  key={spot.id}
                  spot={spot}
                  canPark={!!canPark}
                  onPark={handlePark}
                  onUnpark={handleUnpark}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="text-center text-gray-500 text-sm animate-fade-in">
          Select your vehicle, enter your name, and choose a spot to park
        </div>
      </div>
    </div>
  );
};

export default Index;
