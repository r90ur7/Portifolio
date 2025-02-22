import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface EmailTemplateProps {
  name: string;
  email: string;
  message: string;
}

export default function Email({ name, email, message }: EmailTemplateProps) {
  return (
    <Html>
      <Head />
      <Preview>Nova mensagem do portfólio</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Nova Mensagem do Portfólio</Heading>

          <Text style={text}>
            <strong>Nome:</strong> {name}
          </Text>

          <Text style={text}>
            <strong>Email:</strong> {email}
          </Text>

          <Text style={text}>
            <strong>Mensagem:</strong>
          </Text>
          <Text style={messageBox}>
            {message}
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: '#ffffff',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  maxWidth: '580px',
};

const h1 = {
  color: '#B650F2',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '40px 0',
  padding: '0',
};

const text = {
  color: '#404040',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '16px 0',
};

const messageBox = {
  backgroundColor: '#f4f4f4',
  borderRadius: '4px',
  color: '#404040',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '16px 0',
  padding: '16px',
};