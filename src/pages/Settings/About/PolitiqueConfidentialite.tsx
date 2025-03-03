import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { List, ChevronDown } from "lucide-react";
import "swiper/css"; 
import "swiper/css/pagination";
import "swiper/css/navigation";
import arrowBackIcon from "/Users/micromedia/Desktop/ELIOS/elios_frontend/src/assets/images/icons/arrow_back.png";



const PolitiqueConfidentialite = () => {
  
  const navigate = useNavigate();
  const [isSommaireOpen, setIsSommaireOpen] = useState(false);
  const sectionRefs = useRef([]);
  const privacySections = [
    { title: "Manifeste", content: "Chez ELIOS, la protection de vos données personnelles est notre priorité.\n\nNotre objectif est de vous offrir un accompagnement en éducation financière grâce à la technologie, en vous aidant à suivre vos dépenses, gérer votre budget et optimiser votre épargne de manière sécurisée et efficace.\n\nNous nous engageons à respecter la réglementation en matière de protection des données personnelles et à ne jamais vendre vos informations à des tiers." },
    { title: "1_Quelles données personnelles collectons-nous ?", content: "Nous collectons uniquement les données nécessaires au bon fonctionnement de notre service et à l’optimisation de votre expérience utilisateur.\n\n-Données collectées lors de la navigation sur l’application : cookies, pages visitées, liens cliqués, adresse IP, navigateur.\n-Données d’identification : nom, prénom, adresse email, numéro de téléphone.\n-Données financières : solde de compte, historique des transactions, comptes bancaires connectés.\n- Données relatives à votre patrimoine : investissements, projets d’épargne." },
    { title: "2_Sur quelles bases légales, pour quelles finalités et pendant combien de temps conservons-nous vos données personnelles ?", content: (
        <table className="w-full border-collapse border border-gray-200 text-xs mt-2">
          <thead>
            <tr className="bg-gray-300">
              <th className="border border-gray-300 p-2">Finalités</th>
              <th className="border border-gray-300 p-2">Base légale</th>
              <th className="border border-gray-300 p-2">Durée de conservation</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 p-2">Fournir nos services (gestion des comptes, suivi des transactions, conseils financiers).</td>
              <td className="border border-gray-300 p-2">Exécution du contrat</td>
              <td className="border border-gray-300 p-2">Tant que votre compte est actif, puis archivage pendant 5 ans.</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">Améliorer nos services et réaliser des analyses statistiques.</td>
              <td className="border border-gray-300 p-2">Intérêt légitime</td>
              <td className="border border-gray-300 p-2">2 ans après la dernière interaction.</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">Adresser des communications promotionnelles (newsletters, offres).</td>
              <td className="border border-gray-300 p-2">Consentement</td>
              <td className="border border-gray-300 p-2">3 ans après votre dernier contact.</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">Répondre aux demandes et réclamations.</td>
              <td className="border border-gray-300 p-2">Intérêt légitime</td>
              <td className="border border-gray-300 p-2">Temps de traitement, puis 2 ans en archivage.</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">Respecter nos obligations légales (fraude, lutte contre le blanchiment).</td>
              <td className="border border-gray-300 p-2">Obligation légale</td>
              <td className="border border-gray-300 p-2">1 an après la clôture du compte.</td>
            </tr>
          </tbody>
        </table>
      )
    },
    { title: "3_Qui sont les destinataires de vos données ?", content: "Vos données sont accessibles uniquement aux personnes et prestataires nécessaires à leur traitement :\n-Personnel de notre société (support client, équipes techniques).\n-Nos sous-traitants : Hébergement, analyse de données, support technique, paiements.\n-Nos partenaires bancaires: pour l’agrégation de comptes et services financiers.\n- Autorités légales: si nous sommes tenus de fournir certaines données." },
    { title: "4_Vos données sont-elles transférées hors de l’Union européenne ?", content: "Vos données sont stockées en Europe (France). Toutefois, certains prestataires peuvent être situés hors de l’UE. Dans ce cas, nous nous assurons que des clauses contractuelles types validées par la Commission européenne encadrent ces transferts." },
    { title: "5_Quels sont vos droits sur vos données ?", content: "Conformément au RGPD, vous disposez des droits suivants :\n- Droit d’accès: Obtenir une copie de vos données.\n- Droit de rectification : Corriger des données inexactes.\n-Droit à l’effacement : Supprimer vos données sous certaines conditions.\n- Droit à la limitation : Restreindre temporairement le traitement.\n- Droit d’opposition : Refuser un traitement de données dans certains cas.\n- Droit à la portabilité : Récupérer vos données dans un format structuré.\n-Droit de retirer votre consentement à tout moment.\n-Droit d’introduire une réclamation auprès de la CNIL (www.cnil.fr).\n\nVous pouvez exercer vos droits en nous écrivant à **[email de contact]**." },
    { title: "6_Point de contact en matière de données personnelles", content: "- **Email de contact** : [email de contact]\n- **Adresse postale** : [adresse de la société]" },
    { title: "7_Modifications", content: "Nous pouvons mettre à jour cette politique à tout moment. Les modifications seront publiées sur cette page et, en cas de changement majeur, nous vous en informerons directement." }
  ];

  const scrollToSection = (index) => {
    if (sectionRefs.current[index]) {
      sectionRefs.current[index].scrollIntoView({ behavior: "smooth", block: "start" });
      setIsSommaireOpen(false); 
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-screen bg-gray-100 p-4">
      <div className="relative w-full max-w-sm h-full bg-white flex flex-col">
        <button className="absolute top-4 left-4 p-2" onClick={() => navigate(-1)}>
          <img src={arrowBackIcon} alt="Retour" className="w-5 h-5" />
        </button>
        <h1 className="text-base font-semibold text-center text-black mt-12">Politique de Confidentialité</h1>
        <div className="p-4">
          <button
            className="w-full flex justify-between items-center bg-gray-200 p-2 rounded-lg"
            onClick={() => setIsSommaireOpen(!isSommaireOpen)}
          >
            Sommaire <ChevronDown size={20} />
          </button>
          {isSommaireOpen && (
            <ul className="bg-white border rounded-lg mt-2 p-2 shadow-lg">
              {privacySections.map((section, index) => (
                <li key={index} className="p-2 border-b last:border-b-0">
                  <button
                    className="w-full text-left flex items-center"
                    onClick={() => scrollToSection(index)}
                  >
                    <ChevronDown size={16} className="mr-2" /> {section.title}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="flex-1 overflow-y-auto p-6 mt-4 mx-4 bg-[#252525] text-white rounded-lg shadow-lg border min-w-[220px]">
          {privacySections.map((section, index) => (
            <div key={index} ref={(el) => (sectionRefs.current[index] = el)} className="mb-4 border-b pb-2">
              <h2 className="text-sm font-bold">{section.title}</h2>
              <div className="text-xs mt-2 whitespace-pre-line">{section.content}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PolitiqueConfidentialite;