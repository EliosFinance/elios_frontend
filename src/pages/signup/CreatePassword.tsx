import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setPassword } from 'src/store/store.ts'; // Importation de l'action setPassword

const CreatePassword: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Hook pour dispatcher les actions Redux
  const [password, setPasswordInput] = useState<string>(''); // Mot de passe initial

  // Validation du mot de passe
  const passwordValidation = {
    length: password.length >= 8,
    number: /\d/.test(password),
    specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
  };

  const handleNext = () => {
    if (
      passwordValidation.length &&
      passwordValidation.number &&
      passwordValidation.specialChar &&
      passwordValidation.uppercase &&
      passwordValidation.lowercase
    ) {
      // Stocker le mot de passe dans Redux
      dispatch(setPassword(password));
      navigate('/confirm-password'); // Aller à la page de confirmation du mot de passe
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full text-center">
        {/* Title */}
        <h1 className="text-xl font-semibold mb-2">Créez votre mot de passe Elios</h1>

        {/* Password Input */}
        <div className="mb-4 text-left">
          <label htmlFor="password" className="text-sm text-gray-700">
            Votre mot de passe
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPasswordInput(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Entrez votre mot de passe"
          />
        </div>

        {/* Password Rules */}
        <ul className="text-left text-sm text-gray-600 mb-6">
          <li className={`flex items-center ${passwordValidation.length ? 'text-green-600' : 'text-red-600'}`}>
            {passwordValidation.length ? '✔️' : '❌'} Au moins 8 caractères
          </li>
          <li className={`flex items-center ${passwordValidation.number ? 'text-green-600' : 'text-red-600'}`}>
            {passwordValidation.number ? '✔️' : '❌'} Au moins 1 nombre
          </li>
          <li className={`flex items-center ${passwordValidation.specialChar ? 'text-green-600' : 'text-red-600'}`}>
            {passwordValidation.specialChar ? '✔️' : '❌'} Au moins 1 caractère spécial
          </li>
          <li className={`flex items-center ${passwordValidation.uppercase ? 'text-green-600' : 'text-red-600'}`}>
            {passwordValidation.uppercase ? '✔️' : '❌'} Au moins 1 lettre majuscule
          </li>
          <li className={`flex items-center ${passwordValidation.lowercase ? 'text-green-600' : 'text-red-600'}`}>
            {passwordValidation.lowercase ? '✔️' : '❌'} Au moins 1 lettre minuscule
          </li>
        </ul>

        {/* Submit Button */}
        <button
          onClick={handleNext}
          className="w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded-full hover:bg-indigo-700 transition duration-300"
          disabled={
            !passwordValidation.length ||
            !passwordValidation.number ||
            !passwordValidation.specialChar ||
            !passwordValidation.uppercase ||
            !passwordValidation.lowercase
          }
        >
          Suivant
        </button>
      </div>
    </div>
  );
};

export default CreatePassword;