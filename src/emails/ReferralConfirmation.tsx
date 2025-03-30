import { Section, Text } from '@react-email/components';
import React from 'react';
import { EmailWrapper } from './EmailWrapper';

export const ReferralConfirmation: React.FC<{ friendName: string }> = ({ friendName }) => {
    return (
        <EmailWrapper preview='Parrainage confirmé' title='Confirmation de parrainage'>
            <Section>
                <Text>Félicitations ! Votre parrainage de {friendName} a été confirmé avec succès.</Text>
                <Text>Un bonus vous sera crédité sur votre compte dans les prochains instants.</Text>
            </Section>
        </EmailWrapper>
    );
};
