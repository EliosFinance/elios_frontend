import { Button, Section, Text } from '@react-email/components';
import React from 'react';
import { EmailWrapper } from './EmailWrapper';

export const SubscriptionBenefits: React.FC = () => {
    return (
        <EmailWrapper preview='Découvrez nos abonnements' title='Avantages des abonnements disponibles'>
            <Section>
                <Text>Découvrez les avantages exclusifs offerts par nos abonnements premium :</Text>
                <Text>
                    - Fonctionnalités avancées
                    <br />- Support dédié
                    <br />- Offres et promotions exclusives
                </Text>
            </Section>
            <Section style={{ textAlign: 'center', marginTop: '20px' }}>
                <Button
                    style={{
                        backgroundColor: '#1d4ed8',
                        color: '#ffffff',
                        borderRadius: '4px',
                        textDecoration: 'none',
                        padding: '12px 24px',
                    }}
                    href='https://www.elios.finance/'
                >
                    En savoir plus
                </Button>
            </Section>
        </EmailWrapper>
    );
};
