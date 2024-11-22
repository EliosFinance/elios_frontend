import React from "react";
import googleIcon from "../assets/images/icons/google_icon.png";
import appleIcon from "../assets/images/icons/apple_icon.png";
import { Button } from "@/components/ui/button.tsx";

interface DrawerStep1Props {
  onNext: () => void;
}

const DrawerStep1: React.FC<DrawerStep1Props> = ({ onNext }) => {
  return (
    <>
      <div className="text-center mb-6">
        <h2 className="text-lg font-bold text-gray-800">Se connecter</h2>
      </div>
      <div className="flex flex-col space-y-3">
        <Button className="w-full bg-gray-200 text-gray-800 py-2 rounded-full hover:bg-gray-300">
          J'ai déjà un compte
        </Button>
        <Button className="w-full flex items-center bg-gray-200 text-gray-800 py-2 rounded-full hover:bg-gray-300">
          <img src={googleIcon} alt="Google" className="w-5 h-5 mr-3" />
          Continuer avec Google
        </Button>
        <Button className="w-full flex items-center bg-gray-200 text-gray-800 py-2 rounded-full hover:bg-gray-300">
          <img src={appleIcon} alt="Apple" className="w-5 h-5 mr-3" />
          Continuer avec Apple
        </Button>
      </div>
      <div className="mt-6">
        <Button
          className="w-full bg-blue-500 text-white py-2 rounded-full hover:bg-blue-600 text-sm"
          onClick={onNext}
        >
          Se connecter avec un email
        </Button>
      </div>
    </>
  );
};

export default DrawerStep1;