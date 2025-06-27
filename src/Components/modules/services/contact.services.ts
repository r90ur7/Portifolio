// S - Single Responsibility Principle
// Cada serviço tem uma única responsabilidade

import { ContactFormData, ToastMessage } from '../types/contact.types';
import { IEmailService, INotificationService, IValidationService } from '../interfaces/contact.interfaces';
import { useToast } from '@chakra-ui/react';

export class EmailService implements IEmailService {
    async sendEmail(data: ContactFormData): Promise<void> {
        const response = await fetch('/api/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Erro ao enviar email');
        }
    }
}

export class NotificationService implements INotificationService {
    private toast: ReturnType<typeof useToast>;

    constructor(toast: ReturnType<typeof useToast>) {
        this.toast = toast;
    }

    showSuccess(message: ToastMessage): void {
        this.toast({
            title: message.title,
            description: message.description,
            status: 'success',
            duration: message.duration || 5000,
            isClosable: message.isClosable ?? true,
        });
    }

    showError(message: ToastMessage): void {
        this.toast({
            title: message.title,
            description: message.description,
            status: 'error',
            duration: message.duration || 5000,
            isClosable: message.isClosable ?? true,
        });
    }
}

export class ValidationService implements IValidationService {
    validateForm(data: ContactFormData): { isValid: boolean; errors: string[] } {
        const errors: string[] = [];

        if (!data.name.trim()) {
            errors.push('Nome é obrigatório');
        }

        if (!data.email.trim()) {
            errors.push('Email é obrigatório');
        } else if (!this.isValidEmail(data.email)) {
            errors.push('Email inválido');
        }

        if (!data.message.trim()) {
            errors.push('Mensagem é obrigatória');
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
}
