import React from 'react';
import mailLogo from './assets/images/mail/mail_icon.png';
import { Button } from "@/components/ui/button.tsx";

type EmailProps = {
  userEmail: string;
  onEmailOptionSelect: (option: string) => void;
  onNext: () => void;
  onBack: () => void;
};

const Email: React.FC<EmailProps> = ({
  userEmail,
  onEmailOptionSelect,
  onNext,
  onBack,
}) => {
  const emailOptions = ["Gmail", "Outlook", "Mail"];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-white">
      {/* Back Icon */}
      <div className="self-start mb-4 cursor-pointer" onClick={onBack}>
        <span className="text-2xl">←</span>
      </div>

      {/* Envelope Image */}
      <img
        src={mailLogo}
        alt="Envelope"
        className="w-24 h-24 mb-6"
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

      {/* Email Options */}
      <div className="w-full max-w-xs bg-gray-100 rounded-lg p-4 mb-6">
        <p className="text-center text-sm text-gray-600 mb-3">
          Choisissez une option ci-dessous
        </p>
        <div className="flex flex-col space-y-2">
          {emailOptions.map((option, index) => (
            <button
              key={index}
              onClick={() => onEmailOptionSelect(option)}
              className="w-full py-2 bg-white rounded-lg text-gray-800 border border-gray-300 hover:bg-gray-200"
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Next Button */}
      <Button
        onClick={onNext}
        className="w-full max-w-xs bg-blue-500 text-white font-semibold py-2"
      >
        Suivant
      </Button>
    </div>
  );
};

export default Email;