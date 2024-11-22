import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../../store/store";
import mainLogo from "../../assets/images/corp/main_logo.png";
import { Button } from "@/components/ui/button.tsx";

const CreatePassword: React.FC = () => {
  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState(false); // État pour vérifier si toutes les conditions sont remplies
  const setPasswordStore = useStore((state) => state.setPassword);
  const navigate = useNavigate();

  const handleNext = () => {
    if (!isValid) return; // Empêche de naviguer si les conditions ne sont pas remplies
    setPasswordStore(password);
    navigate("/confirm-password"); // Navigue vers la confirmation du mot de passe
  };

  // Fonction pour valider les conditions du mot de passe
  const validatePassword = () => {
    const conditions = [
      password.length >= 8, // Au moins 8 caractères
      /[0-9]/.test(password), // Au moins 1 nombre
      /[;_/!@#$%^&*(),.?":{}|<>]/.test(password), // Au moins 1 caractère spécial
      /[A-Z]/.test(password), // Au moins 1 lettre majuscule
      /[a-z]/.test(password), // Au moins 1 lettre minuscule
    ];
    setIsValid(conditions.every((condition) => condition)); // Vérifie si toutes les conditions sont remplies
  };

  // Valide dynamiquement à chaque changement de mot de passe
  useEffect(() => {
    validatePassword();
  }, [password]);

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
        Créez votre mot de passe Elios
      </h1>

      {/* Champ de mot de passe */}
      <input
        type="password"
        placeholder="Votre mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full max-w-sm px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Critères de mot de passe */}
      <ul className="text-sm text-gray-600 mb-6 space-y-2 w-full max-w-sm">
        {[
          { text: "Au moins 8 caractères", condition: password.length >= 8 },
          { text: "Au moins 1 nombre", condition: /[0-9]/.test(password) },
          {
            text: "Au moins 1 caractère spécial",
            condition: /[;_/!@#$%^&*(),.?":{}|<>]/.test(password),
          },
          { text: "Au moins 1 lettre majuscule", condition: /[A-Z]/.test(password) },
          { text: "Au moins 1 lettre minuscule", condition: /[a-z]/.test(password) },
        ].map(({ text, condition }, idx) => (
          <li key={idx} className="flex items-center">
            <span
              className={`mr-2 ${condition ? "text-green-500" : "text-red-500"}`}
            >
              {condition ? "✓" : "✗"}
            </span>
            {text}
          </li>
        ))}
      </ul>

      {/* Bouton Suivant */}
      <Button
        onClick={handleNext}
        disabled={!isValid} // Désactive le bouton si les conditions ne sont pas remplies
        className={`w-full max-w-sm px-4 py-2 rounded-full text-center ${
          isValid
            ? "bg-blue-500 text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-400"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
      >
        Suivant
      </Button>
    </div>
  );
};

export default CreatePassword;