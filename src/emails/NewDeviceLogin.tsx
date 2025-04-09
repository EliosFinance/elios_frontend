import { Section, Text } from '@react-email/components';
import React from 'react';
import { EmailWrapper } from './EmailWrapper';

export const NewDeviceLogin: React.FC<{ deviceName: string; date: string }> = ({ deviceName, date }) => {
    return (
        <EmailWrapper preview='Nouvelle connexion détectée' title='Nouvelle connexion'>
            <Section>
                <Text>Une connexion a été détectée depuis un nouvel appareil :</Text>
                <Text>
                    <strong>Appareil : </strong>
                    {deviceName}
                </Text>
                <Text>
                    <strong>Date : </strong>
                    {date}
                </Text>
            </Section>
            <Section>
                <Text>
                    Si vous n&apos;êtes pas à l&apos;origine de cette connexion, veuillez sécuriser votre compte
                    immédiatement.
                </Text>
            </Section>
        </EmailWrapper>
    );
};
