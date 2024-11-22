import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../../store/store";
import mainLogo from "../../assets/images/corp/main_logo.png";
import { Button } from "@/components/ui/button.tsx";

const ConfirmPassword: React.FC = () => {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { password } = useStore((state) => state);
  const navigate = useNavigate();

  const handleNext = () => {
    if (confirmPassword !== password) {
      setError("Les mots de passe ne correspondent pas. Veuillez réessayer.");
    } else {
      setError("");
      navigate("/create-pin");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full bg-white px-4">
      {/* Bouton Retour */}
      <button
        className="absolute top-4 left-4"
        onClick={() => navigate(-1)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-800"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      {/* Logo */}
      <img
        src={mainLogo}
        alt="Elios Logo"
        className="w-24 h-24 mb-6"
      />

      {/* Titre */}
      <h1 className="text-xl font-bold text-gray-800 mb-4 text-center">
        Confirmez votre mot de passe Elios
      </h1>

      {/* Champ pour confirmer le mot de passe */}
      <input
        type="password"
        placeholder="Confirmez votre mot de passe"
        value={confirmPassword}
        onChange={(e) => {
          setConfirmPassword(e.target.value);
          setError("");
        }}
        className="w-full max-w-sm px-4 py-2 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Message d'erreur */}
      {error && (
        <p className="text-red-500 text-sm text-center mb-4">{error}</p>
      )}

      {/* Critères de validation */}
      <ul className="text-sm text-gray-600 mb-6 space-y-2 w-full max-w-sm">
        {[
          "Au moins 8 caractères",
          "Au moins 1 nombre",
          "Au moins 1 caractère spécial",
          "Au moins 1 lettre majuscule",
          "Au moins 1 lettre minuscule",
        ].map((criteria, idx) => (
          <li key={idx} className="flex items-center">
            <span className="text-green-500 mr-2">✓</span> {criteria}
          </li>
        ))}
      </ul>

      {/* Bouton Suivant */}
      <Button
        onClick={handleNext}
        className="w-full max-w-sm px-4 py-2 bg-blue-500 text-white text-center rounded-full hover:bg-blue-600 focus:ring-2 focus:ring-blue-400"
      >
        Suivant
      </Button>
    </div>
  );
};

export default ConfirmPassword;