import { Section, Text } from '@react-email/components';
import React from 'react';
import { EmailWrapper } from './EmailWrapper';

export const TwoFactorEnabled: React.FC = () => {
    return (
        <EmailWrapper preview='2FA activé' title="Confirmation de l'activation 2FA">
            <Section>
                <Text>Votre authentification à deux facteurs a été activée avec succès.</Text>
                <Text>
                    Si vous n&apos;êtes pas à l&apos;origine de cette activation, contactez immédiatement le support.
                </Text>
            </Section>
        </EmailWrapper>
    );
};
