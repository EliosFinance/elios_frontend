import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store/store.ts'; // Récupération du PIN stocké

const PinConfirmation: React.FC = () => {
  const navigate = useNavigate();
  const originalPin = useSelector((state: RootState) => state.auth.pin); // Récupère le PIN du store
  const [confirmPin, setConfirmPin] = useState<string>(''); // PIN de confirmation

  // Limiter la longueur du code PIN à 4 chiffres
  const handleNumberClick = (num: string) => {
    if (confirmPin.length < 4) {
      setConfirmPin((prevPin) => prevPin + num);
    }
  };

  const handleNext = () => {
    if (confirmPin === originalPin) {
      navigate('/next-page');
    } else {
      alert('Les codes PIN ne correspondent pas.');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full text-center relative">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 text-gray-600 hover:text-black"
        >
          ←
        </button>

        {/* Title */}
        <h1 className="text-xl font-semibold mb-2">Confirmez votre code PIN</h1>

        {/* PIN Display */}
        <div className="flex justify-center space-x-2 mb-6">
          {[...Array(4)].map((_, index) => (
            <span
              key={index}
              className={`h-4 w-4 rounded-full ${confirmPin.length > index ? 'bg-black' : 'bg-gray-300'}`}
            />
          ))}
        </div>

        {/* Keypad */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].map((num) => (
            <button
              key={num}
              onClick={() => handleNumberClick(num)}
              className="bg-gray-200 text-2xl w-16 h-16 rounded-full hover:bg-gray-300 transition"
            >
              {num}
            </button>
          ))}
        </div>

        {/* Submit Button */}
        <button
          onClick={handleNext}
          className="w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded-full hover:bg-indigo-700 transition duration-300"
          disabled={confirmPin.length !== 4}
        >
          Suivant
        </button>
      </div>
    </div>
  );
};

export default PinConfirmation;