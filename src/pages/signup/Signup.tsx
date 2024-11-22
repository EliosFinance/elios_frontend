"use client";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import mainLogo from "../../assets/images/corp/main_logo.png";
import googleIcon from "../../assets/images/icons/google_icon.png";
import appleIcon from "../../assets/images/icons/apple_icon.png";
import { Button } from "@/components/ui/button.tsx";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerClose,
} from "@/components/ui/drawer";
import DrawerStep1 from "../../components/DrawerStep1";
import DrawerStep2 from "../../components/DrawerStep2";

const SignUpScreen: React.FC = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null); // État pour le message d'erreur
  const [drawerStep, setDrawerStep] = useState<"step1" | "step2">("step1");
  const navigate = useNavigate();

  const isValidEmail = (email: string): boolean => {
    // Expression régulière pour valider une adresse email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = () => {
    if (!isValidEmail(email)) {
      setError("Veuillez entrer une adresse email valide.");
      return;
    }
    setError(null); // Réinitialise l'erreur si l'email est valide
    navigate("/verify-email");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full bg-white">
      {/* Logo */}
      <img src={mainLogo} alt="Elios Logo" className="w-20 h-20 mb-4" />

      {/* Titre */}
      <h1 className="text-lg font-bold text-gray-800 mb-2 text-center">
        Créez un compte pour sauvegarder vos réponses
      </h1>

      {/* Étoiles et score */}
      <div className="flex flex-col items-center mb-4">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.327 4.086a1 1 0 00.95.69h4.294c.969 0 1.371 1.24.588 1.81l-3.475 2.535a1 1 0 00-.364 1.118l1.327 4.086c.3.921-.755 1.688-1.538 1.118l-3.475-2.535a1 1 0 00-1.176 0l-3.475 2.535c-.783.57-1.838-.197-1.538-1.118l1.327-4.086a1 1 0 00-.364-1.118L2.22 9.513c-.783-.57-.38-1.81.588-1.81h4.294a1 1 0 00.95-.69l1.327-4.086z" />
            </svg>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-1">noté 4.98/5 - 4324 notes</p>
      </div>

      {/* Champ email */}
      <div className="w-full max-w-sm px-4">
        <label className="block text-xs text-gray-700 mb-2" htmlFor="email">
          Votre email
        </label>
        <input
          id="email"
          type="email"
          placeholder="Entrez votre email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`w-full px-4 py-2 border ${
            error ? "border-red-500" : "border-gray-300"
          } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm`}
        />
        {/* Message d'erreur */}
        {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
      </div>

      {/* Bouton Suivant */}
      <Button color="primary"
        onClick={handleSubmit}
        className="w-full max-w-sm mt-3 px-4 py-2 bg-blue-500 text-white rounded-full text-sm font-semibold hover:bg-blue-600 focus:ring-2 focus:ring-blue-400"
>
        Suivant
      </Button>

      {/* Diviseur */}
      <div className="flex items-center w-full max-w-sm my-4">
        <hr className="flex-grow border-gray-300" />
        <span className="mx-4 text-xs text-gray-500">ou</span>
        <hr className="flex-grow border-gray-300" />
      </div>

      {/* Boutons de connexion */}
      <div className="flex flex-col w-full max-w-sm space-y-2 px-4">
        <button className="flex items-center justify-center w-full px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-100">
          <img src={googleIcon} alt="Google" className="w-4 h-4 mr-3" />
          <span className="text-sm">Continuer avec Google</span>
        </button>
        <button className="flex items-center justify-center w-full px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-100">
          <img src={appleIcon} alt="Apple" className="w-4 h-4 mr-3" />
          <span className="text-sm">Continuer avec Apple</span>
        </button>

        {/* Drawer pour "J'ai déjà un compte" */}
        <Drawer>
          <DrawerTrigger asChild>
            <Button className="w-full bg-gray-200 text-gray-800 py-2 rounded-full hover:bg-gray-300">
              J'ai déjà un compte
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerClose className="absolute top-4 right-4">
              <button>
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </DrawerClose>
            <div className="p-4">
              {drawerStep === "step1" ? (
                <DrawerStep1 onNext={() => setDrawerStep("step2")} />
              ) : (
                <DrawerStep2 />
              )}
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
};

export default SignUpScreen;