import React from 'react';
import {Button} from "@/components/ui/button.tsx";

const SignupStepTwo: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        {/* Image */}
        <div className="flex justify-center mb-6">
          <img 
            src="src\assets\images\corp\main_logo.png" 
            alt="Statue" 
            className="h-16 w-16 rounded-full object-cover"
          />
        </div>
        
        {/* Titre */}
        <h1 className="text-xl font-semibold text-center mb-4">
          Créez un compte pour sauvegarder vos réponses
        </h1>
        
        {/* Étoiles de notation */}
        <div className="flex flex-col items-center mb-6">
          <div className="flex space-x-1">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6 text-gray-400"
              >
                <polygon points="12 2 15 8 21 9 17 14 18 21 12 18 6 21 7 14 3 9 9 8 12 2" />
              </svg>
            ))}
          </div>
          <p className="text-sm text-gray-500">
            noté 4.98/5 - 4324 notes
          </p>
        </div>

        {/* Formulaire Email */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1" htmlFor="email">
            Votre email
          </label>
          <input
            type="email"
            id="email"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Entrez votre email"
          />
        </div>

        {/* Bouton "Suivant" */}
        <div className="mb-6">
          <Button className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-full hover:bg-indigo-700 transition duration-300">
            Suivant
          </Button>
        </div>

        {/* Séparateur "ou" */}
        <div className="flex items-center justify-center mb-6">
          <span className="bg-gray-300 h-px w-full"></span>
          <span className="px-4 text-gray-500">ou</span>
          <span className="bg-gray-300 h-px w-full"></span>
        </div>

        {/* Connexion avec Google et Apple */}
        <div className="space-y-3">
          <button className="w-full flex items-center justify-center border border-gray-300 py-2 px-4 rounded-full hover:bg-gray-100 transition">
            <img
              src="src\assets\images\icons\google_icon.png"
              alt="Google Icon"
              className="mr-2"
            />
            Continuer avec Google
          </button>
          <button className="w-full flex items-center justify-center border border-gray-300 py-2 px-4 rounded-full hover:bg-gray-100 transition">
            <img
              src="src\assets\images\icons\apple_icon.png"
              alt="Apple Icon"
              className="mr-2"
            />
            Continuer avec Apple
          </button>
        </div>

        {/* Lien "J'ai déjà un compte" */}
        <div className="mt-6 text-center">
          <button className="text-gray-600 hover:underline">
            J'ai déjà un compte
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupStepTwo;
