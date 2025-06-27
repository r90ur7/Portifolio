// S - Single Responsibility Principle
// Hook customizado para gerenciar o estado do formulário

import { useState } from 'react';
import { ContactFormData } from '../types/contact.types';
import { IFormStateManager } from '../interfaces/contact.interfaces';

export class FormStateManager implements IFormStateManager {
    private setFormData: React.Dispatch<React.SetStateAction<ContactFormData>>;
    private formData: ContactFormData;

    constructor(
        formData: ContactFormData,
        setFormData: React.Dispatch<React.SetStateAction<ContactFormData>>
    ) {
        this.formData = formData;
        this.setFormData = setFormData;
    }

    resetForm(): void {
        this.setFormData({
            name: '',
            email: '',
            message: ''
        });
    }

    updateField(field: keyof ContactFormData, value: string): void {
        this.setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    }

    getFormData(): ContactFormData {
        return this.formData;
    }
}

export const useContactForm = () => {
    const [formData, setFormData] = useState<ContactFormData>({
        name: '',
        email: '',
        message: ''
    });

    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const formStateManager = new FormStateManager(formData, setFormData);

    return {
        formData,
        status,
        setStatus,
        formStateManager
    };
};
