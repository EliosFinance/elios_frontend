import { Section, Text } from '@react-email/components';
import React from 'react';
import { EmailWrapper } from './EmailWrapper';

export const BankAccountAdded: React.FC<{ accountName: string }> = ({ accountName }) => {
    return (
        <EmailWrapper preview='Compte bancaire ajouté' title="Confirmation de l'ajout d'un compte bancaire">
            <Section>
                <Text>Votre compte bancaire "{accountName}" a été ajouté à votre profil avec succès.</Text>
            </Section>
        </EmailWrapper>
    );
};
