import React from "react";
import { Button } from "@/components/ui/button.tsx";

const DrawerStep2: React.FC = () => {
  return (
    <>
      <div className="text-center mb-6">
        <h2 className="text-lg font-bold text-gray-800">Se connecter</h2>
      </div>
      <div className="space-y-3">
        <input
          type="email"
          placeholder="Votre email"
          className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
        <input
          type="password"
          placeholder="Votre mot de passe"
          className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
      </div>
      <div className="mt-2 text-center text-xs text-gray-500">
        Don't have an account?{" "}
        <span className="text-blue-500 cursor-pointer">Register</span>
      </div>
      <div className="mt-6">
        <Button className="w-full bg-blue-500 text-white py-2 rounded-full hover:bg-blue-600 text-sm">
          Suivant
        </Button>
      </div>
    </>
  );
};

export default DrawerStep2;