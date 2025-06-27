// D - Dependency Inversion Principle
// Controller que orquestra as operações do formulário

import { IEmailService, INotificationService, IValidationService, IFormStateManager } from '../interfaces/contact.interfaces';

export class ContactFormController {
    constructor(
        private emailService: IEmailService,
        private notificationService: INotificationService,
        private validationService: IValidationService,
        private formStateManager: IFormStateManager
    ) { }

    async handleSubmit(
        e: React.FormEvent,
        setStatus: (status: 'idle' | 'loading' | 'success' | 'error') => void
    ): Promise<void> {
        e.preventDefault();

        const formData = this.formStateManager.getFormData();
        const validation = this.validationService.validateForm(formData);

        if (!validation.isValid) {
            this.notificationService.showError({
                title: "Erro de validação",
                description: validation.errors.join(', '),
                status: "error"
            });
            return;
        }

        setStatus('loading');

        try {
            await this.emailService.sendEmail(formData);

            setStatus('success');
            this.notificationService.showSuccess({
                title: "Mensagem enviada!",
                description: "Entrarei em contato em breve.",
                status: "success"
            });

            this.formStateManager.resetForm();

        } catch (error) {
            console.error('Erro ao enviar email:', error);
            setStatus('error');
            this.notificationService.showError({
                title: "Erro ao enviar mensagem",
                description: "Por favor, tente novamente mais tarde.",
                status: "error"
            });
        }
    }
}
