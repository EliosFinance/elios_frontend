import { Button, Section, Text } from '@react-email/components';
import React from 'react';
import { EmailWrapper } from './EmailWrapper';

export const GiftAvailable: React.FC<{ giftDescription: string }> = ({ giftDescription }) => {
    return (
        <EmailWrapper preview='Cadeau disponible' title='Vous avez un cadeau !'>
            <Section>
                <Text>Bonne nouvelle ! Un cadeau vous attend :</Text>
                <Text>{giftDescription}</Text>
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
                    Réclamer mon cadeau
                </Button>
            </Section>
        </EmailWrapper>
    );
};
