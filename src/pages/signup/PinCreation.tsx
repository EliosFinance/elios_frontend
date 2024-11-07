import React, { useState } from 'react';
import mainLogo from "./assets/images/corp/main_logo.png";
import { Button } from "@/components/ui/button.tsx";

type PinCreationProps = {
  onNext: (pin: string) => void;
  onBack: () => void;
};

const PinCreation: React.FC<PinCreationProps> = ({ onNext, onBack }) => {
  const [pin, setPin] = useState('');

  const handleNumberClick = (number: string) => {
    if (pin.length < 4) {
      setPin(pin + number);
    }
  };

  const handleBackspace = () => {
    setPin(pin.slice(0, -1));
  };

  const isPinComplete = pin.length === 4;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-white">
      {/* Back Icon */}
      <div className="self-start mb-4 cursor-pointer" onClick={onBack}>
        <span className="text-2xl">←</span>
      </div>

      {/* Logo */}
      <img
        src={mainLogo}
        alt="Elios Logo"
        className="w-12 h-12 rounded-lg mb-4"
      />

      {/* Title */}
      <h1 className="text-lg font-semibold text-center mb-6">
        Créez votre <br /> code PIN
      </h1>

      {/* PIN Indicator */}
      <div className="flex space-x-2 mb-8">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full ${
              i < pin.length ? 'bg-gray-800' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>

      {/* Numeric Keypad */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, '←'].map((item, index) => (
          <button
            key={index}
            onClick={() =>
              item === '←' ? handleBackspace() : handleNumberClick(String(item))
            }
            className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-200 text-lg font-semibold text-gray-800"
            disabled={item === ''}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Next Button */}
      <Button
        onClick={() => onNext(pin)}
        className="w-full max-w-xs bg-blue-500 text-white font-semibold py-2"
        disabled={!isPinComplete}
      >
        Suivant
      </Button>
    </div>
  );
};

export default PinCreation;