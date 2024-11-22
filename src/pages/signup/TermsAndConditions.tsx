import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import mainLogo from "../../assets/images/corp/main_logo.png";
import { Button } from "@/components/ui/button.tsx";

const TermsAndConditions: React.FC = () => {
  const [isAccepted, setIsAccepted] = useState(false); // État pour gérer l'acceptation
  const navigate = useNavigate();

  const handleNext = () => {
    if (!isAccepted) {
      alert('Veuillez accepter les conditions générales pour continuer.');
      return;
    }
    navigate('/dashboard'); // Navigue vers la prochaine étape (par ex. tableau de bord)
  };

  return (
    <div className="flex items-center justify-center h-screen w-full bg-white px-4">
      <div className="flex flex-col items-center w-full max-w-lg">
        {/* Bouton Retour */}
        <button
          className="absolute top-4 left-4"
          onClick={() => navigate(-1)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-800"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Logo */}
        <img
          src={mainLogo}
          alt="Elios Logo"
          className="w-20 h-20 mb-4"
        />

        {/* Titre */}
        <h1 className="text-xl font-bold text-gray-800 mb-4 text-center">
          Conditions générales d’utilisations
        </h1>

        {/* Contenu des conditions générales */}
        <div className="w-full p-4 border border-blue-300 rounded-lg mb-6 text-sm text-gray-700 overflow-y-auto max-h-64">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac lacus cursus risus
          posuere pharetra sed eu turpis. Cras pulvinar elementum dolor, eget aliquam felis
          facilisis et. Fusce ante risus, gravida vitae ante a, venenatis vestibulum nunc. Nam
          vitae ante fringilla leo vulputate interdum. Cras et magna ac lorem elementum
          efficitur dapibus sed massa.
          <br />
          <br />
          Nulla a risus vel orci pulvinar tristique non ut urna. Sed ut felis ex. Suspendisse vel
          erat sem. Phasellus et vulputate sapien. In aliquet iaculis mi. Curabitur pulvinar
          sapien sed auctor pretium. Sed sed porta est, eu placerat felis.
          <br />
          <br />
          Lorem ipsum dolor sit amet, consectetur...
        </div>

        {/* Checkbox pour accepter les CGU */}
        <div className="flex items-center space-x-2 mb-4">
          <input
            type="checkbox"
            id="accept-terms"
            checked={isAccepted}
            onChange={(e) => setIsAccepted(e.target.checked)}
            className="w-5 h-5 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="accept-terms" className="text-sm text-gray-800">
            J'ai lu et j'accepte les conditions générales
          </label>
        </div>

        {/* Bouton Suivant */}
        <Button
          onClick={handleNext}
          className={`w-full px-4 py-2 text-white text-center rounded-lg ${
            isAccepted ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-300 cursor-not-allowed'
          }`}
          disabled={!isAccepted}
        >
          Suivant
        </Button>
      </div>
    </div>
  );
};

export default TermsAndConditions;