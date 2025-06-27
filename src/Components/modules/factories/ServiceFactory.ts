// Factory Pattern para criar diferentes tipos de serviços
// Estende os princípios SOLID com o padrão Factory

import { IEmailService, INotificationService, IValidationService } from '../interfaces/contact.interfaces';
import { EmailService, NotificationService, ValidationService } from '../services/contact.services';

// Enum para tipos de ambiente
export enum Environment {
    DEVELOPMENT = 'development',
    PRODUCTION = 'production',
    TEST = 'test'
}

// Factory para EmailService
export class EmailServiceFactory {
    static create(environment: Environment): IEmailService {
        switch (environment) {
            case Environment.DEVELOPMENT:
                return new EmailService(); // Implementação padrão
            case Environment.PRODUCTION:
                return new EmailService(); // Poderia ser SendGrid, AWS SES, etc.
            case Environment.TEST:
                return new MockEmailService(); // Para testes
            default:
                return new EmailService();
        }
    }
}

// Factory para NotificationService
export class NotificationServiceFactory {
    static create(toast: any, environment: Environment): INotificationService {
        switch (environment) {
            case Environment.DEVELOPMENT:
                return new NotificationService(toast);
            case Environment.PRODUCTION:
                return new NotificationService(toast);
            case Environment.TEST:
                return new MockNotificationService();
            default:
                return new NotificationService(toast);
        }
    }
}

// Factory para ValidationService
export class ValidationServiceFactory {
    static create(environment: Environment): IValidationService {
        switch (environment) {
            case Environment.DEVELOPMENT:
                return new ValidationService();
            case Environment.PRODUCTION:
                return new AdvancedValidationService(); // Validação mais rigorosa
            case Environment.TEST:
                return new MockValidationService();
            default:
                return new ValidationService();
        }
    }
}

// Implementações alternativas demonstrando extensibilidade (Open/Closed Principle)

// Mock para testes
class MockEmailService implements IEmailService {
    async sendEmail(data: any): Promise<void> {
        console.log('Mock: Email enviado', data);
        // Simula sucesso em testes
        return Promise.resolve();
    }
}

class MockNotificationService implements INotificationService {
    showSuccess(message: any): void {
        console.log('Mock: Success notification', message);
    }

    showError(message: any): void {
        console.log('Mock: Error notification', message);
    }
}

class MockValidationService implements IValidationService {
    validateForm(data: any): { isValid: boolean; errors: string[] } {
        return { isValid: true, errors: [] };
    }
}

// Implementação avançada para produção
class AdvancedValidationService implements IValidationService {
    validateForm(data: any): { isValid: boolean; errors: string[] } {
        const errors: string[] = [];

        // Validações mais rigorosas
        if (!data.name || data.name.trim().length < 2) {
            errors.push('Nome deve ter pelo menos 2 caracteres');
        }

        if (!data.email || !this.isValidEmail(data.email)) {
            errors.push('Email inválido');
        }

        if (!data.message || data.message.trim().length < 10) {
            errors.push('Mensagem deve ter pelo menos 10 caracteres');
        }

        // Validação de palavras inadequadas
        if (this.containsInappropriateWords(data.message)) {
            errors.push('Mensagem contém palavras inadequadas');
        }

        return {
            isValid: errors.length === 0,
            errors
        };
    }

    private isValidEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    private containsInappropriateWords(message: string): boolean {
        const inappropriateWords = ['spam', 'fake', 'scam'];
        const lowerMessage = message.toLowerCase();
        return inappropriateWords.some(word => lowerMessage.includes(word));
    }
}

// Factory principal que combina todos os serviços
export class ContactFormServiceFactory {
    static createServices(toast: any, environment: Environment = Environment.DEVELOPMENT) {
        return {
            emailService: EmailServiceFactory.create(environment),
            notificationService: NotificationServiceFactory.create(toast, environment),
            validationService: ValidationServiceFactory.create(environment)
        };
    }
}
