import React, { useState } from "react";
import ReactDOM from "react-dom";
import premiumImage from "@/assets/images/corp/premium_logo_mini.png";
import EPSIcon from "@/assets/images/icons/EPS.png";
import CardIcon from "@/assets/images/icons/card.png";
import GiropayIcon from "@/assets/images/icons/Giropay.png";

const UpgradePayement: React.FC<{ closeModal: () => void }> = ({ closeModal }) => {
  const [selectedMethod, setSelectedMethod] = useState("Card");

  const modalContent = (
    <>
      <div
        style={styles.overlay}
        onClick={closeModal}
      ></div>

      <div style={styles.modalContainer}>
        <div style={styles.dragHandle}></div>

        <button onClick={closeModal} style={styles.closeButton}>
          ✕
        </button>

        <div style={styles.content}>
          <div style={styles.headerContainer}>
            <img
              src={premiumImage}
              alt="Premium"
              style={styles.premiumImage}
            />
            <div style={styles.textContainer}>
              <h2 style={styles.title}>XX€/mois</h2>
              <p style={styles.subtitle}>
                Devenir <strong>Premium</strong>
              </p>
            </div>
          </div>

          <div style={styles.paymentMethods}>
            <button
              style={{
                ...styles.paymentMethodButton,
                ...(selectedMethod === "Card" ? styles.selectedPayment : {})
              }}
              onClick={() => setSelectedMethod("Card")}
            >
              <img src={CardIcon} alt="Card" style={styles.paymentIcon} />
              <span>Card</span>
            </button>
            <button
              style={{
                ...styles.paymentMethodButton,
                ...(selectedMethod === "EPS" ? styles.selectedPayment : {})
              }}
              onClick={() => setSelectedMethod("EPS")}
            >
              <img src={EPSIcon} alt="EPS" style={styles.paymentIcon} />
              <span>EPS</span>
            </button>
            <button
              style={{
                ...styles.paymentMethodButton,
                ...(selectedMethod === "Giropay" ? styles.selectedPayment : {})
              }}
              onClick={() => setSelectedMethod("Giropay")}
            >
              <img src={GiropayIcon} alt="Giropay" style={styles.paymentIcon} />
              <span>Giropay</span>
            </button>
          </div>

          <form>
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Card number</label>
              <input
                type="text"
                placeholder="1234 1234 1234 1234"
                style={styles.formInput}
              />
            </div>

            <div style={{ display: "flex", gap: "10px", marginBottom: "16px" }}>
              <div style={{ flex: 1 }}>
                <label style={styles.formLabel}>Expiry</label>
                <input
                  type="text"
                  placeholder="MM / YY"
                  style={styles.formInput}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label style={styles.formLabel}>CVC</label>
                <input
                  type="text"
                  placeholder="CVC"
                  style={styles.formInput}
                />
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Country</label>
              <select style={styles.formInput}>
                <option>United States</option>
                <option>France</option>
                <option>Germany</option>
                <option>United Kingdom</option>
              </select>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Postal code</label>
              <input
                type="text"
                placeholder="90210"
                style={styles.formInput}
              />
            </div>

            <button type="submit" style={styles.ctaButton}>
              PAYER
            </button>
          </form>
        </div>
      </div>
    </>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};

const styles: { [key: string]: React.CSSProperties } = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 999,
  },
  modalContainer: {
    position: "fixed",
    bottom: 0,
    left: "235px",
    transform: "translateX(-50%)",
    width: "100%",
    maxWidth: "420px",
    backgroundColor: "white",
    borderRadius: "16px 16px 0 0",
    boxShadow: "0 -4px 24px rgba(0, 0, 0, 0.2)",
    zIndex: 1000,
    overflowY: "auto",
    padding: "20px",
  },
  dragHandle: {
    width: "60px",
    height: "6px",
    backgroundColor: "#EDEDED",
    borderRadius: "3px",
    margin: "12px auto",
  },
  closeButton: {
    position: "absolute" as const,
    top: "16px",
    right: "16px",
    background: "white",
    border: "none",
    borderRadius: "50%",
    width: "32px",
    height: "32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  },
  content: {
    padding: "10px 0",
  },
  headerContainer: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    marginBottom: "16px",
  },
  premiumImage: {
    width: "120px",
    height: "120px",
    borderRadius: "8px",
  },
  title: {
    fontSize: "18px",
    fontWeight: "bold" as const,
    margin: 0,
  },
  subtitle: {
    color: "#666",
    marginBottom: "16px",
  },
  paymentMethods: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "16px",
    gap: "10px",
  },
  paymentMethodButton: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    gap: "8px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "10px",
    cursor: "pointer",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  selectedPayment: {
    backgroundColor: "#EDEDED",
    borderColor: "#B3B3B3",
  },
  paymentIcon: {
    width: "20px",
    height: "20px",
  },
  formGroup: {
    marginBottom: "16px",
  },
  formLabel: {
    display: "block",
    fontSize: "14px",
    marginBottom: "4px",
    color: "#000",
  },
  formInput: {
    width: "100%",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    fontSize: "14px",
  },
  ctaButton: {
    width: "100%",
    padding: "15px",
    backgroundColor: "#4361EE",
    color: "white",
    fontWeight: "bold" as const,
    borderRadius: "50px",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    marginTop: "10px",
  },
};

export default UpgradePayement;
