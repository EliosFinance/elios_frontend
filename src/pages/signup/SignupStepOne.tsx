import React from 'react';
import {Button} from "@/components/ui/button.tsx";

const SignupStepOne: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-xs text-center">
        <img
          src="src\assets\images\corp\main_logo.png"
          alt="Card Image"
          className="rounded-lg mb-4 w-full object-cover"
        />
        <h1 className="text-2xl font-bold mb-2">ELIOS</h1>
        <p className="text-gray-600 mb-6">
          Elevez votre experience financière avec Elios : Bienvenue dans le futur de l'ère bancaire.
        </p>
        <Button className="bg-indigo-600 text-white font-bold py-2 px-4 rounded-full hover:bg-indigo-700 transition duration-300 ease-in-out">
          C'EST PARTI
        </Button>
      </div>
    </div>
  );
};

export default SignupStepOne;
