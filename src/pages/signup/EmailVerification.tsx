import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importation de useNavigate
import {Button} from "@/components/ui/button.tsx";

const EmailVerification: React.FC = () => {
  const navigate = useNavigate(); // Utilisation de useNavigate

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full text-center">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)} // Utilisation de navigate pour revenir en arrière
          className="absolute top-4 left-4 text-gray-600 hover:text-black"
        >
          ←
        </button>

        {/* Logo Image */}
        <img
          src="src\assets\images\corp\main_logo.png"
          alt="Logo"
          className="rounded-lg w-16 h-16 mx-auto mb-4"
        />

        {/* Email Icon */}
        <img
          src="src\assets\images\mail\mail_icon.png"
          alt="Email Icon"
          className="rounded-lg w-32 h-32 mx-auto mb-4"
        />

        {/* Title */}
        <h1 className="text-xl font-semibold mb-2">Jetez un oeil à vos emails</h1>

        {/* Instructions */}
        <p className="text-gray-600 text-sm mb-4">
          Cliquez sur le lien de vérification qui vient d'être envoyé à l'adresse <b>usertest@gmail.com</b>
          <br />
          Vous pourrez ensuite passer à la suite.
        </p>

        {/* Resend Email Link */}
        <p className="text-gray-600 text-sm mb-6">
          Vous n'avez pas reçu d'email ?{' '}
          <a href="#" className="text-indigo-600 font-bold hover:underline">
            Renvoyer
          </a>
        </p>

        {/* Open Email App Button */}
        <button className="w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded-full hover:bg-indigo-700 transition duration-300 mb-4">
          Ouvrir mon application d'email
        </button>

        {/* Suivant Button */}
        <Button
          onClick={() => navigate('/')} // Mettre une navigation vers l'autre étape de la connexion
          className="w-full text-indigo-600 font-bold py-2 px-4 rounded-full hover:bg-gray-100"
        >
          Suivant
        </Button>
      </div>
    </div>
  );
};

export default EmailVerification;
