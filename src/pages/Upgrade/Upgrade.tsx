import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import premiumImage from "@/assets/images/corp/premium_logo_full_torso.png"; 
import { FiCheck } from 'react-icons/fi';
import UpgradePayement from './Upgrade_payement';

const UpgradePlan: React.FC = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState("annual");
  const [isModalOpen, setIsModalOpen] = useState(false); 
  

  const handleUpgradeClick = () => {
     console.log("Clic détecté pour ouvrir le modal");
  setIsModalOpen(true);
  console.log("isModalOpen :", true);
  };

  const closeModal = () => {
    setIsModalOpen(false); // Ferme 
  };

 

  return (
    <div style={styles.container}>
      
      <button
        style={{...styles.backButton,}}
          onClick={() => navigate(-1)}>
                       ←
      </button>

     
      <div style={styles.card}>
      
        <div style={styles.imageContainer}>
          <img src={premiumImage} alt="Plan Premium" style={styles.image} />
          <div style={styles.gradient}></div>
          <span style={styles.badge}>Deviens Premium</span>
          <h1 style={styles.title}>Abonnement</h1>
        </div>



        
        <div style={styles.sectionHeader}>
          <p style={styles.question}>Qu’est-ce que ça change ?</p>
          <hr style={styles.separator} />
        </div>

       
        <ul style={styles.featuresList}>
           <li style={styles.featureItem}>
           <FiCheck style={styles.featureIcon} />
                  De super améliorations
           </li>
           <li style={styles.featureItem}>
           <FiCheck style={styles.featureIcon} />
                 De super améliorations
           </li>
           <li style={styles.featureItem}>
           <FiCheck style={styles.featureIcon} />
                   De super améliorations
           </li>
           <li style={styles.featureItem}>
           <FiCheck style={styles.featureIcon} />
                  De super améliorations
           </li>
        </ul>

        
        <div style={styles.pricing}>
  <label
    style={{
      ...styles.priceOption,
      ...(selectedPlan === "annual" ? styles.selectedOption : {}),
    }}
  >
    <div style={styles.radioGroup}>
      <input
        type="radio"
        name="plan"
        value="annual"
        checked={selectedPlan === "annual"}
        onChange={() => setSelectedPlan("annual")}
        style={styles.radioInput}
      />
      <div>
        <span style={styles.planTitle}>Annuel</span>
        <span style={styles.discount}>Économisez 20%</span>
      </div>
    </div>
    <div style={styles.priceDetails}>
      <strong style={styles.price}>47,99€</strong> /an
    </div>
  </label>

  <label
    style={{
      ...styles.priceOption,
      ...(selectedPlan === "monthly" ? styles.selectedOption : {}),
    }}
  >
    <div style={styles.radioGroup}>
      <input
        type="radio"
        name="plan"
        value="monthly"
        checked={selectedPlan === "monthly"}
        onChange={() => setSelectedPlan("monthly")}
        style={styles.radioInput}
      />
      <span style={styles.planTitle}>Mensuel</span>
    </div>
    <div style={styles.priceDetails}>
      <strong style={styles.price}>4,99€</strong> /mois
    </div>
  </label>
</div>



        <button style={styles.ctaButton} onClick={handleUpgradeClick}>
          Je deviens Premium
        </button>
      </div> 
      {isModalOpen && <UpgradePayement closeModal={closeModal} />}
    </div>
  );
};
const styles = {
    container: {
        fontFamily: "'Inter', Arial, sans-serif",
        backgroundColor: "#f9f9f9",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column" as const,
        alignItems: "center",
        position: "relative", 
      },
      backButton: {
        position: "absolute",
        top: "20px", 
        left: "20px", 
        fontSize: "18px",
        background: "none",
        border: "none",
        cursor: "pointer",
        zIndex: 10, 
      },
    card: {
      backgroundColor: "#fff",
     
      padding: "40px", 
      boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)", 
      textAlign: "center" as const,
      maxWidth: "600px",
      width: "100%",
    },
    imageContainer: {
      position: "relative" as const,
      marginBottom: "40px", 
      width: "100%",
      height: "300px", 
      overflow: "hidden",
    },
    image: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      position: "absolute" as const,
      top: 0,
      left: 0,
    },
    gradient: {
      position: "absolute" as const,
      bottom: 0,
      left: 0,
      width: "100%",
      height: "50%",
      background: "linear-gradient(transparent, #ffffff)",
    },
    badge: {
      position: "absolute" as const,
      left: "1px",
      bottom: "35px",
      backgroundColor: "#EDEDED",
      color: "#000",
      padding: "8px 16px",
      borderRadius: "6px",
      fontSize: "10px",
      fontWeight: "bold" as const,
    },
    title: {
      position: "absolute" as const,
      bottom: "-40px",
      left: "1px",
      fontSize: "28px", 
      color: "#000",
      fontWeight: "bold" as const,
    },
    sectionHeader: {
      marginBottom: "30px",
    },
    question: {
      fontSize: "20px", 
      color: "#333",
      fontWeight: "bold" as const,
      marginBottom: "15px",
    },
    separator: {
      border: "none",
      borderTop: "1px solid #ddd",
      margin: "0 auto",
      width: "85%", 
    },
  
    featuresList: {
        listStyleType: "none",
        padding: 0,
        margin: "20px 0",
        fontSize: "16px",
        lineHeight: "1.8",
        textAlign: "left" as const,
        color: "#333",
      },
      featureItem: {
        display: "flex",
        alignItems: "center",
        gap: "10px", 
        marginBottom: "10px",
      },
      featureIcon: {
        color: "#1A1A1A", 
        fontSize: "18px", 
      },

    ctaButton: {
      width: "350px",
      height:"50px",
      fontSize: "18px",
      backgroundColor: "#4361EE",
      color: "#fff",
      border: "none",
      borderRadius: "50px", 
      cursor: "pointer",
      fontWeight: "bold" as const,
      marginTop: "20px",
    }, 
  
      
    pricing: {
        marginTop: "20px",
        marginBottom: "20px",
        display: "flex",
        flexDirection: "column" as const,
        gap: "10px", 
      },
      priceOption: {
        display: "flex",
        alignItems: "flex-start", 
        justifyContent: "space-between",
        padding: "10px 15px", 
        border: "1px solid #ddd",
        borderRadius: "10px",
        cursor: "pointer",
        backgroundColor: "#f9f9f9",
        minHeight: "60px", 
        height: "auto", 
        boxSizing: "border-box", 
      },
      selectedOption: {
        backgroundColor: "#EDEDED",
        borderColor: "#B3B3B3",
      },
      radioGroup: {
        display: "flex",
        alignItems: "flex-start", 
        gap: "10px",
        width: "200px",
      },
      radioInput: {
        marginTop: "4px",
        width: "20px",
        height: "20px",
      },
      planContent: {
        display: "flex",
        flexDirection: "column" as const,
        gap: "2px", 
      },
      planTitle: {
        fontSize: "14px", 
        fontWeight: "bold" as const,
        color: "#000",
      },
      discount: {
        fontSize: "10px", 
        color: "#555",
        backgroundColor: "#F3F3F3",
        padding: "2px 6px", 
        borderRadius: "4px",
        marginTop: "2px",
        display: "inline-block",
      },
      price: {
        fontSize: "14px", 
        fontWeight: "bold" as const,
        color: "#000",
        textAlign: "right" as const,
      },
    
      overlay: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 999,
      },
      modalBackdrop: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "75%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 999,
      },
      label: { display: "block", fontSize: "14px", marginBottom: "4px" },
      input: {
        width: "100%",
        padding: "10px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        fontSize: "14px",
      },
      
  };
  
  
  
export default UpgradePlan;
