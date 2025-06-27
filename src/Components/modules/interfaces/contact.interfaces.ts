// O - Open/Closed Principle & L - Liskov Substitution Principle
// Interfaces que podem ser estendidas sem modificar o código existente

import { ContactFormData, ToastMessage } from '../types/contact.types';

export interface IEmailService {
    sendEmail(data: ContactFormData): Promise<void>;
}

export interface INotificationService {
    showSuccess(message: ToastMessage): void;
    showError(message: ToastMessage): void;
}

export interface IValidationService {
    validateForm(data: ContactFormData): { isValid: boolean; errors: string[] };
}

export interface IFormStateManager {
    resetForm(): void;
    updateField(field: keyof ContactFormData, value: string): void;
    getFormData(): ContactFormData;
}
