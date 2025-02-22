// Components/EmailTemplate.tsx
import { FC } from 'react';
import {
  Html,
  Body,
  Container,
  Text,
  Heading,
  Hr,
  Section,
} from '@react-email/components';

interface EmailTemplateProps {
  name: string;
  email: string;
  message: string;
}

export const Email: FC<EmailTemplateProps> = ({
  name,
  email,
  message,
}) => (
  <Html>
    <Body style={main}>
      <Container style={container}>
        <Heading style={heading}>Nova Mensagem do Portfólio</Heading>
        <Section style={section}>
          <Text style={text}><strong>Nome:</strong> {name}</Text>
          <Text style={text}><strong>Email:</strong> {email}</Text>
          <Hr style={hr} />
          <Text style={text}><strong>Mensagem:</strong></Text>
          <Text style={messageStyle}>{message}</Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  padding: '40px 0',
  margin: '0 auto',
  width: '100%',
  maxWidth: '600px',
};

const heading = {
  fontSize: '24px',
  color: '#B650F2',
  marginBottom: '20px',
};

const section = {
  backgroundColor: '#ffffff',
  padding: '30px',
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(182, 80, 242, 0.2)',
};

const text = {
  fontSize: '16px',
  color: '#404040',
  margin: '10px 0',
};

const messageStyle = {
  fontSize: '16px',
  color: '#404040',
  margin: '15px 0',
  padding: '15px',
  backgroundColor: '#f8f9fa',
  borderRadius: '4px',
  border: '1px solid #e9ecef',
};

const hr = {
  margin: '20px 0',
  borderColor: 'rgba(182, 80, 242, 0.2)',
};