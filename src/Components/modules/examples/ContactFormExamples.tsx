// Exemplos de uso do ContactForm refatorado com SOLID

import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';

// Importações do sistema SOLID
import ContactForm from '../contactForm';
import ContactFormAdvanced, {
    ContactFormDevelopment,
    ContactFormProduction,
    ContactFormTest
} from '../ContactFormAdvanced';
import { IEmailService } from '../interfaces/contact.interfaces';
import { ContactFormData } from '../types/contact.types';
import { Environment } from '../factories/ServiceFactory';

// Exemplo 1: Uso básico
export const BasicExample = () => {
    return (
        <ChakraProvider>
            <ContactForm />
        </ChakraProvider>
    );
};

// Exemplo 2: Uso com configurações específicas por ambiente
export const EnvironmentSpecificExample = () => {
    const environment = process.env.NODE_ENV as 'development' | 'production' | 'test';

    return (
        <ChakraProvider>
            {environment === 'development' && <ContactFormDevelopment />}
            {environment === 'production' && <ContactFormProduction />}
            {environment === 'test' && <ContactFormTest />}
        </ChakraProvider>
    );
};

// Exemplo 3: Uso com configurações customizadas
export const CustomConfigExample = () => {
    return (
        <ChakraProvider>
            <ContactFormAdvanced
                environment={Environment.DEVELOPMENT}
                customConfig={{
                    animationThreshold: 0.5,
                    triggerOnce: true
                }}
            />
        </ChakraProvider>
    );
};

// Exemplo 4: Integração com diferentes sistemas
export const IntegrationExample = () => {
    // Pode facilmente trocar implementações
    return (
        <div>
            {/* Para desenvolvimento - validações mais flexíveis */}
            <section>
                <h2>Desenvolvimento</h2>
                <ContactFormDevelopment />
            </section>

            {/* Para produção - validações mais rigorosas */}
            <section>
                <h2>Produção</h2>
                <ContactFormProduction />
            </section>
        </div>
    );
};

// Exemplo 5: Como estender o sistema (demonstra Open/Closed Principle)
class SlackEmailService implements IEmailService {
    async sendEmail(data: ContactFormData): Promise<void> {
        // Implementação para enviar para Slack ao invés de email
        const slackMessage = {
            text: `Novo contato: ${data.name} (${data.email}) - ${data.message}`
        };

        await fetch('https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(slackMessage)
        });
    }
}

// Exemplo 6: Uso em testes
export const TestExample = () => {
    // O sistema SOLID facilita muito os testes
    return (
        <ChakraProvider>
            <ContactFormTest /> {/* Usa implementações mock */}
        </ChakraProvider>
    );
};

const examples = {
    BasicExample,
    EnvironmentSpecificExample,
    CustomConfigExample,
    IntegrationExample,
    TestExample,
    SlackEmailService
};

export default examples;
