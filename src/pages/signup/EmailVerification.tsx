import React from 'react';
import mailLogo from './assets/images/mail/mail_icon.png';
import { Button } from "@/components/ui/button.tsx";

type EmailVerificationProps = {
  userEmail: string;
  onResend: () => void;
  onOpenEmailApp: () => void;
  onNext: () => void;
  onBack: () => void;
};

const EmailVerification: React.FC<EmailVerificationProps> = ({
  userEmail,
  onResend,
  onOpenEmailApp,
  onNext,
  onBack,
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-white">
      {/* Back Icon */}
      <div className="self-start mb-4 cursor-pointer" onClick={onBack}>
        <span className="text-2xl">←</span>
      </div>

      {/* Logo */}
      <img
        src={mailLogo}
        alt="Elios Logo"
        className="w-12 h-12 rounded-lg mb-4"
      />

      {/* Email Image */}
      <img
        src="/path_to_email_image.png" // Remplace par le chemin de ton image d'email
        alt="Check your email"
        className="w-40 h-40 object-cover mb-6"
      />

      {/* Title */}
      <h1 className="text-lg font-semibold text-center mb-2">
        Jetez un oeil à vos emails
      </h1>

      {/* Message */}
      <p className="text-center text-gray-600 mb-6">
        Cliquez sur le lien de vérification qui vient d’être envoyé à l’adresse {userEmail}.
        <br />
        Vous pourrez ensuite passer à la suite.
      </p>

      {/* Resend Link */}
      <p className="text-center text-gray-600 mb-6">
        Vous n’avez pas reçu d’email ?{" "}
        <span
          onClick={onResend}
          className="text-blue-500 cursor-pointer font-semibold"
        >
          Renvoyer
        </span>
      </p>

      {/* Open Email App Button */}
      <Button
        onClick={onOpenEmailApp}
        className="w-full max-w-xs bg-blue-500 text-white font-semibold py-2 mb-4"
      >
        Ouvrir mon application d'email
      </Button>

      {/* Next Button */}
      <Button
        onClick={onNext}
        className="w-full max-w-xs bg-gray-200 text-black font-semibold py-2"
      >
        Suivant
      </Button>
    </div>
  );
};

export default EmailVerification;
