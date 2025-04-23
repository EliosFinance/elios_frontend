import { Section, Text } from '@react-email/components';
import React from 'react';
import { EmailWrapper } from './EmailWrapper';

export const MonthlySummary: React.FC<{ summary: string }> = ({ summary }) => {
    return (
        <EmailWrapper preview='Récapitulatif mensuel' title='Votre récapitulatif mensuel'>
            <Section>
                <Text>Voici votre récapitulatif du mois :</Text>
                <Text>{summary}</Text>
            </Section>
        </EmailWrapper>
    );
};
