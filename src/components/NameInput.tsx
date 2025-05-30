
import React from 'react';
import { User } from 'lucide-react';

interface NameInputProps {
  userName: string;
  onNameChange: (name: string) => void;
}

const NameInput: React.FC<NameInputProps> = ({ userName, onNameChange }) => {
  return (
    <div>
      <label className="block text-lg font-semibold text-gray-800 mb-2">
        Your Name
      </label>
      <div className="relative">
        <User 
          size={20} 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          value={userName}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder="Enter your name..."
          className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-300 text-gray-700"
        />
      </div>
    </div>
  );
};

export default NameInput;
