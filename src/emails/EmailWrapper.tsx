import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Img,
  Text,
  Button,
} from '@react-email/components';
import React from 'react';
import logo_email from "@/assets/images/mail/mail_icon.png"

export interface EmailWrapperProps {
  preview: string;
  title: string;
  children: React.ReactNode;
}

export const EmailWrapper: React.FC<EmailWrapperProps> = ({ preview, title, children }) => {
  return (
    <Html>
      <Head />
      <Preview>{preview}</Preview>
      <Body style={{ backgroundColor: '#f9f9f9', fontFamily: 'sans-serif', margin: 0, padding: 0 }}>
        <Container style={{ margin: '0 auto', padding: '20px', backgroundColor: '#fff', maxWidth: '600px' }}>
          <Section style={{ textAlign: 'center', marginBottom: '20px' }}>
            <Img src={logo_email} alt="Logo" width={100} height={100} style={{ margin: '0 auto' }} />
            <Text style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '10px' }}>{title}</Text>
          </Section>
          {children}
        </Container>
      </Body>
    </Html>
  );
};