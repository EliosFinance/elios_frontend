import React from 'react';
import mainLogo from "./assets/images/corp/main_logo.png";
import {Button} from "@/components/ui/button.tsx";

type SignupProps = {
  onEmailSubmit: (email: string) => void;
  onGoogleLogin: () => void;
  onAppleLogin: () => void;
  onExistingAccountClick: () => void;
};

const Signup: React.FC<SignupProps> = ({
  onEmailSubmit,
  onGoogleLogin,
  onAppleLogin,
  onExistingAccountClick,
}) => {
  const [email, setEmail] = React.useState('');

  const handleEmailSubmit = () => {
    onEmailSubmit(email);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-white">
      {/* Logo */}
      <img
        src={mainLogo}
        alt="Elios Logo"
        className="w-16 h-16 rounded-lg mb-4"
      />

      {/* Title */}
      <h1 className="text-lg font-semibold text-center mb-2">
        Créez un compte pour sauvegarder vos réponses
      </h1>

      {/* Rating */}
      <div className="flex items-center space-x-1 mb-2">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="text-gray-400 text-xl">★</span>
        ))}
      </div>
      <p className="text-gray-600 text-sm mb-6">noté 4.98/5 - 4324 notes</p>

      {/* Email Input */}
      <div className="w-full max-w-xs mb-4">
        <label className="block text-gray-600 text-sm mb-1">Votre email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Votre email"
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Submit Button */}
      <Button
        onClick={handleEmailSubmit}
        className="w-full max-w-xs mb-6 text-lg"
      >
        Suivant
      </Button>

      {/* Divider */}
      <div className="flex items-center w-full max-w-xs mb-6">
        <hr className="flex-grow border-gray-300" />
        <span className="px-2 text-gray-500 text-sm">ou</span>
        <hr className="flex-grow border-gray-300" />
      </div>

      {/* Social Login Buttons */}
      <Button
        onClick={onGoogleLogin}
        className="flex items-center justify-center w-full max-w-xs mb-3 py-2 border border-gray-300 rounded-full text-sm font-semibold text-gray-700"
      >
        <img src="/path_to_google_icon.png" alt="Google" className="w-5 h-5 mr-2" />
        Continuer avec Google
      </Button>

      <Button
        onClick={onAppleLogin}
        className="flex items-center justify-center w-full max-w-xs mb-3 py-2 border border-gray-300 rounded-full text-sm font-semibold text-gray-700"
      >
        <img src="/path_to_apple_icon.png" alt="Apple" className="w-5 h-5 mr-2" />
        Continuer avec Apple
      </Button>

      {/* Existing Account Link */}
      <Button
        onClick={onExistingAccountClick}
        variant="link"
        className="w-full max-w-xs py-2 text-sm font-semibold text-gray-500 mt-2"
      >
        J'ai déjà un compte
      </Button>
    </div>
  );
};

export default Signup;
