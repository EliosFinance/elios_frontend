import { Button, Section, Text } from '@react-email/components';
import React from 'react';
import { EmailWrapper } from './EmailWrapper';

export const NewPartner: React.FC<{ partnerName: string }> = ({ partnerName }) => {
    return (
        <EmailWrapper preview='Nouveau partenaire' title='Nouveau partenaire disponible'>
            <Section>
                <Text>Nous avons le plaisir de vous annoncer notre nouveau partenaire : {partnerName}.</Text>
                <Text>Découvrez dès maintenant ses offres exclusives et bénéficiez d’avantages uniques.</Text>
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
                    Découvrir
                </Button>
            </Section>
        </EmailWrapper>
    );
};
