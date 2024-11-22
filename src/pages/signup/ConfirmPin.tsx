"use client";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../../store/store";
import mainLogo from "../../assets/images/corp/main_logo.png";
import abstract1 from "../../assets/images/shapes/abstract_shape_1.png";
import { Button } from "@/components/ui/button";

const ConfirmPin: React.FC = () => {
  const [confirmPin, setConfirmPin] = useState("");
  const [error, setError] = useState("");
  const { pinCode } = useStore((state) => state);
  const navigate = useNavigate();

  const handlePinInput = (digit: string) => {
    if (confirmPin.length < 4) {
      setError("");
      setConfirmPin((prev) => prev + digit);
    }
  };

  const handleDelete = () => {
    setError("");
    setConfirmPin((prev) => prev.slice(0, -1));
  };

  const handleNext = () => {
    if (confirmPin.length === 4) {
      if (confirmPin === pinCode) {
        navigate("/dashboard");
      } else {
        setError("Les codes PIN ne correspondent pas. Veuillez réessayer.");
        setConfirmPin("");
      }
    } else {
      setError("Veuillez entrer un code PIN à 4 chiffres.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full bg-white px-6 relative">
      <button
        className="absolute top-6 left-6"
        onClick={() => navigate(-1)}
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

      <img
        src={mainLogo}
        alt="Elios Logo"
        className="w-14 h-14 mb-4"
      />

      <h1 className="text-base font-bold text-gray-800 mb-4 text-center">
        Confirmez votre code PIN
      </h1>

      <div className="flex justify-center mb-6">
        {[...Array(4)].map((_, idx) => (
          <span
            key={idx}
            className={`w-3 h-3 mx-2 rounded-full ${
              idx < confirmPin.length ? "bg-blue-500" : "bg-gray-300"
            }`}
          />
        ))}
      </div>

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

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <Button
        onClick={handleNext}
        className="w-56 px-3 py-2 bg-blue-500 text-white text-center rounded-full text-sm hover:bg-blue-600 focus:ring-2 focus:ring-blue-400"
      >
        Suivant
      </Button>
    </div>
  );
};

export default ConfirmPin;