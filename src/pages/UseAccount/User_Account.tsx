import React from "react";
import { FaUser, FaChevronRight } from "react-icons/fa";
import avatarImage from "@/assets/images/icons/User Icon.png";
import eyeImage from "@/assets/images/icons/Icon.png";
import warningImage from "@/assets/images/icons/Group 2041.png";

const AccountPage: React.FC = () => {
  return (
    
    <div style={styles.container}> 
   
   
      <div style={styles.headerContainer}>
        <button style={styles.backButton} onClick={() => window.history.back()}>
          ←
        </button>
        <button style={styles.eyeButton} title="Afficher/Masquer">
          <img
            src={eyeImage}
            alt="Eye Icon"
            style={styles.eyeImage}
          />
        </button>
      </div>

      <div style={styles.card}>
        <div style={styles.userInfoContainer}>
          <img
            src={avatarImage}
            alt="User Avatar"
            style={styles.avatar}
          />
          <div style={styles.userTextContainer}>
            <h2 style={styles.userName}>Nom d'utilisateur</h2>
            <div style={styles.secureBadge}>
              <img 
                src={warningImage} 
                alt="Warning Icon" 
                style={styles.badgeIcon} 
              />
              <span>SÉCURISER MON COMPTE</span>
            </div>
          </div>
        </div>

        <Section 
          title="Mes Comptes" 
          items={[
            "Compte Courant",
            "Livret A",
            "Compte Épargne",
            "Plan Épargne Logement",
            "Assurance Vie"
          ]}
        />
        <Section 
          title="Paramètres & Sécurité" 
          items={[
            "Changer mon mot de passe",
            "Authentification à deux facteurs",
            "Notifications de connexion",
            "Gérer mes appareils",
            "Historique d'accès"
          ]}
        />
      </div>
    </div>
  );
};

interface SectionProps {
  title: string;
  items: string[];
}

const Section: React.FC<SectionProps> = ({ title, items }) => {
  return (
    <div style={styles.sectionContainer}>
      <h3 style={styles.sectionTitle}>{title}</h3>
      {items.map((item, i) => (
        <div key={i} style={styles.listItem}>
          <div style={styles.listItemLeft}>
            <FaUser style={styles.listIcon} />
            <span style={styles.listText}>{item}</span>
          </div>
          <FaChevronRight style={styles.chevronIcon} />
        </div>
      ))}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    fontFamily: "'Inter', Arial, sans-serif",
    backgroundColor: "#f9f9f9",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    position: "relative" as const,
  },
  headerContainer: {
    position: "absolute" as const,
    left: "26px",
    right: "25px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    zIndex: 10,
    marginBottom:"24px"
  },
  backButton: {
    background: "none",
    border: "none",
    fontSize: "18px",
    cursor: "pointer",
  },
  eyeButton: {
    backgroundColor: "transparent",
    border: "none",
    fontSize: "20px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  eyeImage: {
    width: "24px",
    height: "24px",
    objectFit: "contain" as const,
  },
  card: {
    background: "linear-gradient(135deg, #ffffff 0%, #f8faff 100%)",
  
    padding: "40px",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
    textAlign: "center" as const,
    maxWidth: "600px",
    width: "100%",
  },
  userInfoContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: "40px",
    position: "relative" as const,
    borderRadius: "12px",
    textAlign: "left" as const,
    backgroundColor: "#f0f3ff",
    padding: "20px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  },
  avatar: {
    width: "80px",
    height: "80px",
    borderRadius: "12px",
    objectFit: "cover" as const,
    marginRight: "20px",
  },
  userTextContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column" as const,
    justifyContent: "center",
  },
  userName: {
    margin: 0,
    fontSize: "20px",
    fontWeight: "bold" as const,
    color: "#000",
    marginBottom: "4px",
  },
  secureBadge: {
    display: "inline-flex",
    alignItems: "center",
    backgroundColor: "#e0e0e0",
    borderRadius: "4px",
    padding: "4px 8px",
    fontSize: "10px",
    fontWeight: 600 as const,
    color: "#000",
    marginTop: "2px",
  },
  badgeIcon: {
    width: "14px",
    height: "14px",
    marginRight: "5px",
    objectFit: "contain" as const,
  },
  sectionContainer: {
    textAlign: "left" as const,
    marginBottom: "40px",
  },
  sectionTitle: {
    fontSize: "18px",
    fontWeight: "bold" as const,
    marginBottom: "20px",
    color: "#333",
  },
  listItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 0",
    borderBottom: "1px solid #eee",
    transition: "background-color 0.2s",
  },
  listItemLeft: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  listIcon: {
    fontSize: "16px",
    color: "#4361EE",
  },
  listText: {
    fontSize: "14px",
    color: "#000",
  },
  chevronIcon: {
    color: "#333",
    fontSize: "14px",
  },
};

export default AccountPage;
