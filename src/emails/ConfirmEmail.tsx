import { Button, Section, Text } from '@react-email/components';
import React from 'react';
import { EmailWrapper } from './EmailWrapper';

export const ConfirmEmail: React.FC<{ verificationLink: string }> = ({ verificationLink }) => {
    return (
        <EmailWrapper preview='Vérifiez votre adresse e-mail' title="Vérification de l'adresse e-mail">
            <Section>
                <Text>
                    Pour confirmer votre adresse e-mail et activer votre compte, veuillez cliquer sur le bouton
                    ci-dessous.
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
                    href={verificationLink}
                >
                    Vérifier mon adresse
                </Button>
            </Section>
        </EmailWrapper>
    );
};
