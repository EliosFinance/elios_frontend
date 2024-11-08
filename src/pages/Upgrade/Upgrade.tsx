import React from 'react';

import premium_logo_full_torso from '@/assets/images/corp/premium_logo_full_torso.png';
import premium_logo_mini from '@/assets/images/corp/premium_logo_mini.png';

const UpgradePlan: React.FC = () => {
    return (
        <div style={styles.pageContainer}>
            <div style={styles.upgradePlan}>
                <div style={styles.subscriptionCard}>
                    <button style={styles.backButton}>←</button>
                    <img src={premium_logo_full_torso} alt='Subscription Plan' style={styles.mainImage} />

                    <h2>Abonnement</h2>
                    <p>Qu’est-ce que ça change?</p>

                    <ul style={styles.featuresList}>
                        <li>✔️ De super améliorations</li>
                        <li>✔️ De super améliorations</li>
                        <li>✔️ De super améliorations</li>
                        <li>✔️ De super améliorations</li>
                    </ul>

                    <div style={styles.priceOptions}>
                        <label style={styles.optionLabel}>
                            <input type='radio' name='plan' value='annual' defaultChecked />
                            <span>
                                Annuel <strong>47,99€</strong> /an
                            </span>
                            <span style={styles.discount}>Économisez 20%</span>
                        </label>

                        <label style={styles.optionLabel}>
                            <input type='radio' name='plan' value='monthly' />
                            <span>
                                Mensuel <strong>4,99€</strong> /mois
                            </span>
                        </label>
                    </div>

                    <button style={styles.premiumButton}>Je deviens Premium</button>
                </div>

                <div style={styles.paymentModal}>
                    <button style={styles.closeButton}>×</button>
                    <img src={premium_logo_mini} alt='Premium Icon' style={styles.iconImage} />

                    <h3>XX€/mois Devenir Premium</h3>

                    <div style={styles.paymentOptions}>
                        <button style={{ ...styles.paymentOption, ...styles.activePaymentOption }}>💳 Card</button>
                        <button style={styles.paymentOption}>🏦 EPS</button>
                        <button style={styles.paymentOption}>💰 Giropay</button>
                    </div>

                    <form style={styles.paymentForm}>
                        <input type='text' placeholder='Card number' style={styles.input} />
                        <input type='text' placeholder='MM / YY' style={styles.input} />
                        <input type='text' placeholder='CVC' style={styles.input} />
                        <input type='text' placeholder='Postal code' style={styles.input} />

                        <select style={styles.select}>
                            <option value='US'>United States</option>
                            <option value='FR'>France</option>
                            <option value='DE'>Germany l</option>
                        </select>

                        <button type='submit' style={styles.payButton}>
                            Payer
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

const styles = {
    pageContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        padding: '20px',
        backgroundColor: '#f0f0f0',
    },
    upgradePlan: {
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '20px',
        width: '100%',
        maxWidth: '600px',
        fontFamily: 'Arial, sans-serif',
    },
    subscriptionCard: {
        backgroundColor: '#fff',
        borderRadius: '8px',
        padding: '20px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    paymentModal: {
        backgroundColor: '#f9f9f9',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },

    upgradeTitle: {
        textAlign: 'center' as const,
        fontSize: '24px',
        color: '#333',
    },

    backButton: {
        background: 'none',
        border: 'none',
        fontSize: '18px',
        color: '#333',
        cursor: 'pointer',
    },
    mainImage: {
        width: '80%',
        borderRadius: '8px',
        margin: '10px auto',
        display: 'block',
    },
    featuresList: {
        listStyle: 'none',
        padding: 0,
        fontSize: '16px',
        color: '#666',
        textAlign: 'left',
        lineHeight: '1.5',
    },

    priceOptions: {
        display: 'flex',
        flexDirection: 'column' as const,
        marginTop: '20px',
    },
    optionLabel: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '10px',
        cursor: 'pointer',
        padding: '5px',
        border: '1px solid #ddd',
        borderRadius: '5px',
    },

    discount: {
        color: '#ff5722',
        fontSize: '14px',
        marginLeft: '10px',
    },
    premiumButton: {
        width: '100%',
        backgroundColor: '#007bff',
        color: 'white',
        padding: '12px',
        fontSize: '16px',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        marginTop: '20px',
    },

    closeButton: {
        background: 'none',
        border: 'none',
        fontSize: '18px',
        color: '#333',
        cursor: 'pointer',
        float: 'right' as const,
    },
    iconImage: {
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        marginBottom: '10px',
    },
    paymentOptions: {
        display: 'flex',
        justifyContent: 'space-around' as const,
        margin: '20px 0',
    },
    paymentOption: {
        backgroundColor: '#e0e0e0',
        padding: '10px',
        borderRadius: '8px',
        cursor: 'pointer',
    },
    activePaymentOption: {
        backgroundColor: '#007bff',
        color: 'white',
    },
    paymentForm: {
        display: 'flex',
        flexDirection: 'column' as const,
    },
    input: {
        marginBottom: '10px',
        padding: '10px',
        fontSize: '16px',
        border: '1px solid #ccc',
        borderRadius: '8px',
    },
    select: {
        marginBottom: '10px',
        padding: '10px',
        fontSize: '16px',
        border: '1px solid #ccc',
        borderRadius: '8px',
    },
    payButton: {
        backgroundColor: '#007bff',
        color: 'white',
        padding: '12px',
        fontSize: '16px',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
    },
};

export default UpgradePlan;
