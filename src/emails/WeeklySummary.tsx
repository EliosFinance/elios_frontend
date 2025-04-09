import { Section, Text } from '@react-email/components';
import React from 'react';
import { EmailWrapper } from './EmailWrapper';

export const WeeklySummary: React.FC<{ summary: string }> = ({ summary }) => {
    return (
        <EmailWrapper preview='Récapitulatif hebdomadaire' title='Votre récapitulatif hebdomadaire'>
            <Section>
                <Text>Voici votre récapitulatif de la semaine :</Text>
                <Text>{summary}</Text>
            </Section>
        </EmailWrapper>
    );
};
