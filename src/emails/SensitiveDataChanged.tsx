import { Section, Text } from '@react-email/components';
import React from 'react';
import { EmailWrapper } from './EmailWrapper';

export const SensitiveDataChanged: React.FC<{ field: string }> = ({ field }) => {
    return (
        <EmailWrapper preview='Modification de données sensibles' title='Modification réussie'>
            <Section>
                <Text>
                    Votre {field} a été modifié(e) avec succès. Si vous n&apos;êtes pas à l&apos;origine de ce
                    changement, veuillez contacter immédiatement le support.
                </Text>
            </Section>
        </EmailWrapper>
    );
};
