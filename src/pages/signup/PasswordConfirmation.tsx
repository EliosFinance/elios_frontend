import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store/store.ts'; // Importation du RootState pour récupérer le mot de passe stocké

const PasswordConfirmation: React.FC = () => {
  const navigate = useNavigate();
  const originalPassword = useSelector((state: RootState) => state.auth.password); // Récupère le mot de passe du store
  const [confirmPassword, setConfirmPassword] = useState<string>(''); // Mot de passe de confirmation

  // Validation du mot de passe
  const passwordValidation = {
    match: originalPassword === confirmPassword, // Vérifie que les deux mots de passe sont identiques
  };

  const handleNext = () => {
    if (passwordValidation.match) {
      // Redirection vers la page suivante
      navigate('/'); // Mettre la redirection sur la bonne page
    } else {
      alert("Les mots de passe ne correspondent pas.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full text-center relative">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 text-gray-600 hover:text-black"
        >
          ←
        </button>

        {/* Title */}
        <h1 className="text-xl font-semibold mb-2">Confirmez votre mot de passe Elios</h1>

        {/* Password Confirmation Input */}
        <div className="mb-4 text-left">
          <label htmlFor="confirm-password" className="text-sm text-gray-700">
            Confirmez votre mot de passe
          </label>
          <input
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Confirmez votre mot de passe"
          />
        </div>

        {/* Validation des mots de passe */}
        <ul className="text-left text-sm text-gray-600 mb-6">
          <li className={`flex items-center ${passwordValidation.match ? 'text-green-600' : 'text-red-600'}`}>
            {passwordValidation.match ? '✔️' : '❌'} Les mots de passe correspondent
          </li>
        </ul>

        {/* Submit Button */}
        <button
          onClick={handleNext}
          className="w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded-full hover:bg-indigo-700 transition duration-300"
          disabled={!passwordValidation.match}
        >
          Suivant
        </button>
      </div>
    </div>
  );
};

export default PasswordConfirmation;