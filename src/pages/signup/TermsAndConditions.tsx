import React, { useState } from 'react';
import mainLogo from "./assets/images/corp/main_logo.png";
import { Button } from "@/components/ui/button.tsx";

type TermsAndConditionsProps = {
  onNext: () => void;
  onBack: () => void;
};

const TermsAndConditions: React.FC<TermsAndConditionsProps> = ({ onNext, onBack }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

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
        Conditions générales <br /> d'utilisations
      </h1>

      {/* Terms and Conditions Text */}
      <div className="w-full max-w-xs h-48 p-4 mb-4 border border-gray-300 rounded overflow-y-scroll text-sm text-gray-700">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac lacus cursus risus posuere pharetra sed eu
          turpis. Cras pulvinar elementum dolor, eget aliquam felis facilisis et. Fusce ante risus, gravida vitae augue a,
          venenatis bibendum nunc. Nam vitae ante fringilla leo vulputate interdum.
        </p>
        <p>
          Curabitur sollicitudin elit sit amet lectus auctor, non blandit nulla varius. Pellentesque vel sapien euismod,
          feugiat dui sed, fermentum efficitur odio.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur...
        </p>
      </div>

      {/* Checkbox */}
      <div className="flex items-center mb-6">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
          className="w-5 h-5 mr-2"
        />
        <label className="text-sm text-gray-700">
          J'ai lu et j'accepte les conditions générales
        </label>
      </div>

      {/* Next Button */}
      <Button
        onClick={onNext}
        className="w-full max-w-xs bg-blue-500 text-white font-semibold py-2"
        disabled={!isChecked}
      >
        Suivant
      </Button>
    </div>
  );
};

export default TermsAndConditions;