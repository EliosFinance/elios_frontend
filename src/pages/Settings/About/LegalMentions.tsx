import React, { useRef } from "react";
import arrowBackIcon from "/Users/micromedia/Desktop/ELIOS/elios_frontend/src/assets/images/icons/arrow_back.png";

const legalSections = [

  {
    title: "1. Éditeur de l’Application",
    content:
      "L’application ELIOS est éditée par ELIOS SAS, une société par actions simplifiée au capital de [montant du capital] €, immatriculée au RCS de [Ville] sous le numéro [Numéro RCS].\n\nSiège social : [Adresse complète]\nEmail de contact : [Email de contact]\nDirecteur de la publication : [Nom du responsable]",
  },

  {
    title: "2. Hébergement",
    content:
      "L’application ELIOS est hébergée par :\n\nNom de l’hébergeur : [Nom de l’hébergeur]\nAdresse : [Adresse complète de l’hébergeur]\nContact : [Email/téléphone de l’hébergeur]",
  },

  {
    title: "3. Propriété Intellectuelle",
    content:
      "Tous les éléments présents sur l’application ELIOS, incluant textes, images, logos, marques et logiciels, sont protégés par la législation sur la propriété intellectuelle. Toute reproduction ou modification est interdite sans autorisation préalable d’ELIOS SAS.",
  },


  {
    title: "4. Responsabilité",
    content:
      "L’éditeur s’efforce de fournir des informations exactes et mises à jour sur l’application ELIOS, mais ne saurait être tenu responsable des erreurs, omissions ou résultats pouvant découler de l’utilisation des informations disponibles sur l’application.\n\nL’utilisateur reconnaît utiliser l’application sous sa propre responsabilité et accepte que ELIOS SAS ne puisse être tenu responsable de dommages directs ou indirects liés à son usage.",
  },

  {
    title: "5. Modification des Mentions Légales",
    content:
      "ELIOS SAS se réserve le droit de modifier à tout moment les présentes mentions légales afin de les adapter à l’évolution de ses services et obligations légales.",
  },
  
  {
    title: "6. Droit Applicable et Juridiction Compétente",
    content:
      "Les présentes mentions légales sont soumises au droit français. En cas de litige, les tribunaux compétents seront ceux du ressort du siège social de ELIOS SAS.",
  },
  {
    title: "7. Contact",
    content:
      "Pour toute question ou assistance, contactez-nous à support@eliosfinance.com.",
  },
];

const LegalMentions: React.FC = () => {
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  return (
    <div className="flex justify-center items-center w-full h-screen bg-gray-100 p-4">
      <div className="relative w-full max-w-sm h-full bg-white flex flex-col">
        
        <button className="absolute top-4 left-4 p-2">
          <img src={arrowBackIcon} alt="Retour" className="w-5 h-5" />
        </button>

        <h1 className="text-base font-semibold text-center text-black mt-12">
          Mentions Légales
        </h1>

        <div className="flex-1 overflow-y-auto p-6 mt-4 mx-4 bg-[#252525] text-white rounded-lg shadow-lg border min-w-[220px]">
          {legalSections.map((section, index) => (
            <div
              key={index}
              ref={(el) => (sectionRefs.current[index] = el)}
              className="mb-4 border-b pb-2"
            >
              <h2 className="text-sm font-bold">{section.title}</h2>
              <p className="text-xs mt-2 whitespace-pre-line">{section.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LegalMentions;