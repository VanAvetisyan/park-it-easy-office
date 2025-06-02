import React, { useEffect, useState } from 'react';
import VehicleSelector from '../components/VehicleSelector';
import ParkingSpot from '../components/ParkingSpot';
import NameInput from '../components/NameInput';
import { ref, onValue, set } from 'firebase/database';
import { db } from '../../src/firebase';

type VehicleType = 'car' | 'motorbike' | null;

type ParkingData = {
  id: number;
  isOccupied: boolean;
  occupantName: string;
  vehicleType: VehicleType;
  parkedAt?: string;
};

const Index = () => {
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleType>(null);
  const [userName, setUserName] = useState('');
  const [parkingSpots, setParkingSpots] = useState<ParkingData[]>([
    { id: 84, isOccupied: false, occupantName: '', vehicleType: null, parkedAt: null },
    { id: 85, isOccupied: false, occupantName: '', vehicleType: null, parkedAt: null }
  ]);

  /*const handlePark = (spotId: number) => {
    if (!selectedVehicle || !userName.trim()) return;

    const newSpotData = {
      id: spotId,
      isOccupied: true,
      occupantName: userName.trim(),
      vehicleType: selectedVehicle,
      parkedAt: formatDateTime(Date.now()) // store timestamp (not formatted)
    };

    // Update local state (optional – Firebase will trigger sync too)
    setParkingSpots(spots =>
      spots.map(spot =>
        spot.id === spotId ? { ...spot, ...newSpotData } : spot
      )
    );

    // 🔥 Sync with Firebase
    updateSpot(spotId, newSpotData);

    // Reset selection
    setSelectedVehicle(null);
    setUserName('');
  };*/
  const handlePark = (spotId: number) => {
    if (!selectedVehicle || !userName.trim()) return;

    const newSpotData = {
      id: spotId,
      isOccupied: true,
      occupantName: userName.trim(),
      vehicleType: selectedVehicle,
      parkedAt: formatDateTime(Date.now())
    };

    updateSpot(spotId, newSpotData);

    setSelectedVehicle(null);
    setUserName('');
  };

  const updateSpot = (spotId: number, data: ParkingData) => {
    return set(ref(db, `parkingSpots/${spotId}`), data)
      .then(() => console.log('Spot updated in Firebase'))
      .catch((err) => console.error('Firebase update error:', err));
  };

  const formatDateTime = (timestamp: number) => {
    const date = new Date(timestamp);

    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const yyyy = date.getFullYear();

    const hh = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');

    return `${dd}/${mm}/${yyyy} ${hh}:${min}`;
  };

  const handleUnpark = (spotId: number) => {
    const clearedSpot = {
      id: spotId,
      isOccupied: false,
      occupantName: '',
      vehicleType: null,
      parkedAt: null
    };

    updateSpot(spotId, clearedSpot);
  };

  useEffect(() => {
    const spotsRef = ref(db, 'parkingSpots');

    const unsubscribe = onValue(spotsRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        // Firebase stores objects, convert to array
        const spotsArray = Object.values(data) as ParkingData[];

        setParkingSpots(spotsArray);
      }
    });

    // Optional cleanup (not needed for onValue, but good practice)
    return () => unsubscribe();
  }, []);

  const canPark = selectedVehicle && userName.trim();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">🅿️ Office Parking</h1>
          <p className="text-gray-600 text-lg">Reserve your parking spot in seconds</p>
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