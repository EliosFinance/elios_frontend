import React from 'react';
import { useNavigate } from 'react-router-dom';
import mailLogo from "../../assets/images/mail/mail_icon.png";
import { Button } from "@/components/ui/button.tsx";

const EmailVerification: React.FC = () => {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate('/create-password'); // Navigue vers la création du mot de passe
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full bg-white px-4">
      {/* Bouton Retour */}
      <button className="self-start absolute top-4 left-4" onClick={() => navigate(-1)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-800"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Logo */}
      <img
        src={mailLogo}
        alt="Mail Logo"
        className="w-24 h-24 mb-6"
      />

      {/* Titre et sous-titre */}
      <h1 className="text-xl font-bold text-gray-800 mb-4 text-center">
        Jetez un oeil à vos emails
      </h1>
      <p className="text-sm text-gray-600 text-center mb-6">
        Cliquez sur le lien de vérification qui vient d'être envoyé à l'adresse <br />
        <span className="font-semibold">usertest@gmail.com</span>. <br />
        Vous pourrez ensuite passer à la suite.
      </p>

      {/* Lien pour renvoyer l'email */}
      <p className="text-sm text-gray-600 mb-6 text-center">
        Vous n'avez pas reçu d'email ?{' '}
        <button className="text-blue-500 font-semibold">Renvoyer</button>
      </p>

      {/* Boutons */}
      <Button className="w-full max-w-sm mb-4 px-4 py-2 bg-blue-500 text-white text-center rounded-lg hover:bg-blue-600">
        Ouvrir mon application d'email
      </Button>
      <Button
        onClick={handleNext}
        className="w-full max-w-sm px-4 py-2 bg-gray-200 text-gray-800 text-center rounded-lg hover:bg-gray-300"
      >
        Suivant
      </Button>
    </div>
  );
};

export default EmailVerification;