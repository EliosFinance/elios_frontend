import React from "react";
import { useNavigate } from "react-router-dom";
import mainLogo from "../../assets/images/corp/main_logo.png";
import { Button } from "@/components/ui/button.tsx";

const Welcome: React.FC = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/signup");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full bg-white px-4">
      {/* Logo */}
      <img src={mainLogo} alt="Elios Logo" className="w-24 h-24 mb-6" />

      {/* Titre */}
      <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        ELIOS
      </h1>

      {/* Sous-titre */}
      <p className="text-sm text-gray-500 text-center mb-4">
        Élevez votre expérience financière avec Elios : <br />
        Bienvenue dans le futur de l’ère bancaire.
      </p>

      {/* Séparateur */}
      <div className="flex items-center justify-center mb-6">
        <span className="inline-block w-2 h-[2px] bg-gray-400 rounded-full mx-[2px]"></span>
        <span className="inline-block w-4 h-[2px] bg-gray-600 rounded-full mx-[2px]"></span>
        <span className="inline-block w-6 h-[2px] bg-black rounded-full mx-[2px]"></span>
        <span className="inline-block w-4 h-[2px] bg-gray-600 rounded-full mx-[2px]"></span>
        <span className="inline-block w-2 h-[2px] bg-gray-400 rounded-full mx-[2px]"></span>
      </div>

      {/* Bouton */}
      <Button color="primary"
        onClick={handleStart}
        className="w-full max-w-xs px-6 py-3 bg-blue-500 text-white rounded-full text-sm font-semibold shadow-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none"
      >
        C'EST PARTI
      </Button>
    </div>
  );
};

export default Welcome;