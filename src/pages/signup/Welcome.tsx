import React from 'react';
import mainLogo from "./assets/images/corp/main_logo.png";
import { Button } from "@/components/ui/button.tsx";

type WelcomeProps = {
  onStartClick: () => void;
};

const Welcome: React.FC<WelcomeProps> = ({ onStartClick }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-white">
      {/* Image */}
      <img
        src={mainLogo}
        alt="Elios"
        className="w-48 h-48 rounded-lg object-cover mb-6"
      />

      {/* Title */}
      <h1 className="text-2xl font-bold mb-2">ELIOS</h1>

      {/* Subtitle */}
      <p className="text-center text-gray-600 mb-4">
        Elevez votre experience financière avec Elios : Bienvenue dans le futur
        de l'ère bancaire.
      </p>

      {/* Divider */}
      <div className="w-6 border-t-2 border-gray-800 mb-6"></div>

      {/* Start Button */}
      <Button
        onClick={onStartClick}
        className="bg-blue-500 text-white font-bold py-2 px-6 rounded-full text-lg"
      >
        C'EST PARTI
      </Button>
    </div>
  );
};

export default Welcome;
