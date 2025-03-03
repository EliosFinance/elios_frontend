import React, { useState, useRef } from "react";
import { ChevronDown } from "lucide-react";
import arrowBackIcon from "/Users/micromedia/Desktop/ELIOS/elios_frontend/src/assets/images/icons/arrow_back.png";


const termsSections = [

    {
      title: "1. Présentation de l’Application",
      content:
        "Elios est une application de gestion financière visant à aider les jeunes à mieux gérer leur budget grâce à des outils d’analyse des dépenses, des contenus éducatifs et des défis interactifs. Elios permet de connecter un ou plusieurs comptes bancaires afin de récupérer les dépenses des utilisateurs, sans stocker ni afficher leurs IBAN ou autres informations sensibles.",
    },

    {
      title: "2. Définitions",
      content:
        "• Utilisateur : Toute personne ayant créé un compte sur Elios.\n" +
        "• Service : Ensemble des fonctionnalités offertes par Elios.\n" +
        "• Compte bancaire connecté : Un compte bancaire lié à Elios pour le suivi des dépenses.\n" +
        "• Abonnement : Offre payante permettant d’accéder à certaines fonctionnalités premium.\n" +
        "• Partenaires : Entreprises collaborant avec Elios pour offrir des récompenses et avantages aux utilisateurs.",
    },

    {
      title: "3. Accès et Utilisation du Service",
      content:
        "• L’inscription sur Elios est gratuite et requiert une adresse e-mail valide.\n" +
        "• Chaque utilisateur peut connecter gratuitement jusqu’à deux comptes bancaires. Au-delà, un abonnement est requis.\n" +
        "• Elios ne stocke pas les identifiants bancaires des utilisateurs et ne récupère que les données de dépenses.\n" +
        "• L’utilisateur est responsable de la confidentialité de ses identifiants de connexion.",
    },

    {
      title: "4. Abonnements et Tarification",
      content:
        "Elios propose trois types d’abonnements :\n" +
        "• Mensuel : Accès premium sur une base mensuelle.\n" +
        "• Annuel : Accès premium pour une durée d’un an, avec une réduction par rapport à l’offre mensuelle.\n" +
        "• Familial : Permet de connecter plusieurs comptes pour un groupe familial.\n\n" +
        "Les abonnements permettent d’accéder à :\n" +
        "• Un nombre illimité de comptes bancaires connectés.\n" +
        "• Des articles de blog et vidéos d’experts sur l’éducation financière.\n" +
        "• Des challenges financiers pour gagner des points échangeables chez nos partenaires.",
    },
    {
      title: "5. Résiliation et Annulation",
      content:
        "• L’utilisateur peut résilier son abonnement à tout moment depuis l’application. L’accès aux fonctionnalités premium sera maintenu jusqu’à la fin de la période en cours.\n" +
        "• Elios se réserve le droit de suspendre un compte en cas d’utilisation frauduleuse ou de non-respect des présentes conditions.",
    },
    {
      title: "6. Protection des Données Personnelles",
      content:
        "• Elios ne stocke pas les identifiants bancaires et ne conserve que les dépenses pour analyse.\n" +
        "• Les données personnelles des utilisateurs sont protégées conformément aux réglementations en vigueur (RGPD).\n" +
        "• Les utilisateurs peuvent à tout moment demander la suppression de leurs données.",
    },
    {
      title: "7. Sécurité du Compte",
      content:
        "• Les utilisateurs doivent protéger leurs identifiants et signaler immédiatement toute activité suspecte.\n" +
        "• Elios met en place des mesures de sécurité avancées pour protéger les données des utilisateurs.",
    },
    {
      title: "8. Responsabilités et Limitation de Garantie",
      content:
        "• Elios fournit des outils d’analyse et d’éducation financière, mais ne garantit pas l’exactitude absolue des données bancaires récupérées.\n" +
        "• Elios n’est pas une institution financière et ne fournit pas de conseils financiers individualisés.\n" +
        "• En cas de dysfonctionnement du service, Elios fera son possible pour rétablir l’accès rapidement, mais ne peut être tenu responsable de toute perte liée à une interruption temporaire.",
    },
    {
      title: "9. Modification des Conditions Générales",
      content:
        "• Elios peut modifier ces conditions à tout moment. Les utilisateurs seront notifiés de toute mise à jour importante.\n" +
        "• L’utilisation continue de l’application après modification des conditions implique leur acceptation.",
    },
    {
      title: "10. Droit Applicable et Juridiction",
      content:
        "• Ces conditions sont régies par les lois en vigueur dans le pays où Elios est enregistré.\n" +
        "• En cas de litige, les tribunaux compétents seront ceux du pays d’enregistrement d’Elios.",
    },
    {
      title: "11. Contact et Support",
      content:
        "Pour toute question ou demande d’assistance, contactez-nous à support@eliosfinance.com.",
    },
  ];
  

  
  const TermsOfUse: React.FC = () => {
    const [isSommaireOpen, setIsSommaireOpen] = useState(false);
    const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  
    const scrollToSection = (index: number) => {
      if (sectionRefs.current[index]) {
        sectionRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "start" });
        setIsSommaireOpen(false); 
      }
    };
  
    return (
      <div className="flex justify-center items-center w-full h-screen bg-gray-100 p-4">
        <div className="relative w-full max-w-sm h-full bg-white flex flex-col">
         
          <button className="absolute top-4 left-4 p-2">
            <img src={arrowBackIcon} alt="Retour" className="w-5 h-5" />
          </button>
  
          <h1 className="text-base font-semibold text-center text-black mt-12">
            Conditions Générales d’Utilisation
          </h1>
  
         
          <div className="p-4">
            <button
              className="w-full flex justify-between items-center bg-gray-200 p-2 rounded-lg"
              onClick={() => setIsSommaireOpen(!isSommaireOpen)}
            >
              Sommaire <ChevronDown size={20} />
            </button>
            {isSommaireOpen && (
              <ul className="bg-white border rounded-lg mt-2 p-2 shadow-lg">
                {termsSections.map((section, index) => (
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
            {termsSections.map((section, index) => (
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
  
  export default TermsOfUse;