"use client";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../../store/store";
import mainLogo from "../../assets/images/corp/main_logo.png";
import abstract1 from "../../assets/images/shapes/abstract_shape_1.png";

const EnterPIN: React.FC = () => {
  const [pin, setPin] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [error, setError] = useState(""); // État pour afficher les erreurs
  const { pinCode } = useStore((state) => state); // Récupère le PIN stocké
  const navigate = useNavigate();

  const handlePinInput = (digit: string) => {
    if (pin.length < 4) {
      setError(""); // Réinitialise l'erreur en cas de saisie
      const newPin = pin + digit;
      setPin(newPin);

      // Si le PIN est complet, vérifier sa validité
      if (newPin.length === 4) {
        if (newPin === pinCode) {
          navigate("/dashboard"); // Redirection vers le tableau de bord
        } else {
          setAttempts((prev) => prev + 1);
          setError("Code PIN incorrect. Veuillez réessayer.");
          setPin("");

          // Vérifie les tentatives restantes
          if (attempts + 1 >= 3) {
            setError(
              "Vous avez dépassé le nombre maximum de tentatives. Redirection..."
            );
            setTimeout(() => {
              navigate("/signup"); // Redirection vers l'écran de connexion
            }, 2000);
          }
        }
      }
    }
  };

  const handleDelete = () => {
    setError(""); // Réinitialise l'erreur
    setPin((prev) => prev.slice(0, -1)); // Supprime le dernier chiffre
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full bg-white px-8 relative">
      {/* Bouton Retour */}
      <button
        className="absolute top-6 left-6"
        onClick={() => navigate("/signup")}
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
        className="w-14 h-14 mb-4"
      />

      {/* Titre */}
      <h1 className="text-base font-bold text-gray-800 mb-4 text-center">
        Entrez votre code PIN
      </h1>

      {/* Indicateur de longueur du code PIN */}
      <div className="flex justify-center mb-6">
        {[...Array(4)].map((_, idx) => (
          <span
            key={idx}
            className={`w-3 h-3 mx-2 rounded-full ${
              idx < pin.length ? "bg-blue-500" : "bg-gray-300"
            }`}
          />
        ))}
      </div>

      {/* Pavé numérique */}
      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src={abstract1}
            alt="Background"
            className="w-56 h-56"
          />
        </div>
        <div className="grid grid-cols-3 gap-4 relative z-10">
          {Array.from({ length: 9 }, (_, i) => i + 1).map((number) => (
            <button
              key={number}
              className="w-14 h-14 bg-gray-200 text-gray-800 rounded-full text-xl font-bold hover:bg-gray-300 flex items-center justify-center"
              onClick={() => handlePinInput(number.toString())}
            >
              {number}
            </button>
          ))}
          <div />
          <button
            className="w-14 h-14 bg-gray-200 text-gray-800 rounded-full text-xl font-bold hover:bg-gray-300 flex items-center justify-center"
            onClick={() => handlePinInput("0")}
          >
            0
          </button>
          <button
            className="w-14 h-14 bg-red-200 text-red-600 rounded-full text-xl hover:bg-red-300 flex items-center justify-center"
            onClick={handleDelete}
          >
            ⌫
          </button>
        </div>
      </div>

      {/* Message d'erreur */}
      {error && (
        <p className="text-red-500 text-sm text-center mb-4">{error}</p>
      )}

      {/* Lien d'oubli du PIN */}
      <p className="mt-6 text-sm text-blue-500 cursor-pointer hover:underline">
        Mot de passe oublié ?
      </p>
    </div>
  );
};

export default EnterPIN;