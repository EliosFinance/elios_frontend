import React, { useState } from 'react';
import mainLogo from "./assets/images/corp/main_logo.png";
import { Button } from "@/components/ui/button.tsx";

type ConfirmPasswordProps = {
  originalPassword: string;
  onConfirm: () => void;
  onBack: () => void;
};

const ConfirmPassword: React.FC<ConfirmPasswordProps> = ({
  originalPassword,
  onConfirm,
  onBack,
}) => {
  const [confirmPassword, setConfirmPassword] = useState('');

  // Vérification des critères de mot de passe
  const criteria = [
    { label: "Au moins 8 caractères", isValid: confirmPassword.length >= 8 },
    { label: "Au moins 1 nombre", isValid: /\d/.test(confirmPassword) },
    { label: "Au moins 1 caractère spécial", isValid: /[!@#$%^&*(),.?":{}|<>]/.test(confirmPassword) },
    { label: "Au moins 1 lettre majuscule", isValid: /[A-Z]/.test(confirmPassword) },
    { label: "Au moins 1 lettre minuscule", isValid: /[a-z]/.test(confirmPassword) },
    { label: "Correspond au mot de passe", isValid: confirmPassword === originalPassword },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-white">
      {/* Back Icon */}
      <div className="self-start mb-4 cursor-pointer" onClick={onBack}>
        <span className="text-2xl">←</span>
      </div>

      {/* Logo */}
      <img
        src={mainLogo}
        alt="Elios Logo"
        className="w-12 h-12 rounded-lg mb-4"
      />

      {/* Title */}
      <h1 className="text-lg font-semibold text-center mb-6">
        Confirmez votre <br /> mot de passe Elios
      </h1>

      {/* Confirm Password Input */}
      <div className="w-full max-w-xs mb-4">
        <label className="block text-gray-600 text-sm mb-1">Confirmez votre mot de passe</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirmez votre mot de passe"
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Password Criteria */}
      <div className="w-full max-w-xs mb-6">
        {criteria.map((criterion, index) => (
          <div key={index} className="flex items-center text-sm text-gray-700 mb-1">
            <span className={criterion.isValid ? "text-green-500" : "text-red-500"}>
              {criterion.isValid ? "✓" : "✕"}
            </span>
            <span className="ml-2">{criterion.label}</span>
          </div>
        ))}
      </div>

      {/* Confirm Button */}
      <Button
        onClick={onConfirm}
        className="w-full max-w-xs bg-blue-500 text-white font-semibold py-2"
        disabled={!criteria.every((criterion) => criterion.isValid)}
      >
        Suivant
      </Button>
    </div>
  );
};

export default ConfirmPassword;
