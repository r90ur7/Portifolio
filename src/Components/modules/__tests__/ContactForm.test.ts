// Exemplo de testes unitários facilitados pelos princípios SOLID

import { ContactFormController } from '../controllers/ContactFormController';
import { ValidationService } from '../services/contact.services';
import { IEmailService, INotificationService, IValidationService, IFormStateManager } from '../interfaces/contact.interfaces';
import { ContactFormData } from '../types/contact.types';

const mockEmailService: IEmailService = {
    sendEmail: jest.fn()
};

const mockNotificationService: INotificationService = {
    showSuccess: jest.fn(),
    showError: jest.fn()
};

const mockValidationService: IValidationService = {
    validateForm: jest.fn()
};

const mockFormStateManager: IFormStateManager = {
    resetForm: jest.fn(),
    updateField: jest.fn(),
    getFormData: jest.fn()
};

describe('ContactFormController', () => {
    let controller: ContactFormController;
    let mockSetStatus: jest.Mock;

    beforeEach(() => {
        controller = new ContactFormController(
            mockEmailService,
            mockNotificationService,
            mockValidationService,
            mockFormStateManager
        );

        mockSetStatus = jest.fn();

        jest.clearAllMocks();
    });

    describe('handleSubmit', () => {
        const mockFormData: ContactFormData = {
            name: 'João Silva',
            email: 'joao@email.com',
            message: 'Olá, gostaria de conversar!'
        };

        const mockEvent = {
            preventDefault: jest.fn()
        } as any;

        beforeEach(() => {
            (mockFormStateManager.getFormData as jest.Mock).mockReturnValue(mockFormData);
        });

        it('deve prevenir o comportamento padrão do formulário', async () => {
            (mockValidationService.validateForm as jest.Mock).mockReturnValue({
                isValid: true,
                errors: []
            });

            await controller.handleSubmit(mockEvent, mockSetStatus);

            expect(mockEvent.preventDefault).toHaveBeenCalled();
        });

        it('deve mostrar erro quando validação falha', async () => {
            const validationErrors = ['Nome é obrigatório', 'Email inválido'];
            (mockValidationService.validateForm as jest.Mock).mockReturnValue({
                isValid: false,
                errors: validationErrors
            });

            await controller.handleSubmit(mockEvent, mockSetStatus);

            expect(mockNotificationService.showError).toHaveBeenCalledWith({
                title: "Erro de validação",
                description: validationErrors.join(', '),
                status: "error"
            });

            expect(mockEmailService.sendEmail).not.toHaveBeenCalled();
        });

        it('deve enviar email e mostrar sucesso quando dados são válidos', async () => {
            (mockValidationService.validateForm as jest.Mock).mockReturnValue({
                isValid: true,
                errors: []
            });

            (mockEmailService.sendEmail as jest.Mock).mockResolvedValue(undefined);

            await controller.handleSubmit(mockEvent, mockSetStatus);

            expect(mockSetStatus).toHaveBeenCalledWith('loading');
            expect(mockEmailService.sendEmail).toHaveBeenCalledWith(mockFormData);
            expect(mockSetStatus).toHaveBeenCalledWith('success');
            expect(mockNotificationService.showSuccess).toHaveBeenCalledWith({
                title: "Mensagem enviada!",
                description: "Entrarei em contato em breve.",
                status: "success"
            });
            expect(mockFormStateManager.resetForm).toHaveBeenCalled();
        });

        it('deve tratar erro ao enviar email', async () => {
            (mockValidationService.validateForm as jest.Mock).mockReturnValue({
                isValid: true,
                errors: []
            });

            const emailError = new Error('Erro de rede');
            (mockEmailService.sendEmail as jest.Mock).mockRejectedValue(emailError);

            // Spy no console.error
            const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

            await controller.handleSubmit(mockEvent, mockSetStatus);

            expect(mockSetStatus).toHaveBeenCalledWith('loading');
            expect(mockSetStatus).toHaveBeenCalledWith('error');
            expect(mockNotificationService.showError).toHaveBeenCalledWith({
                title: "Erro ao enviar mensagem",
                description: "Por favor, tente novamente mais tarde.",
                status: "error"
            });
            expect(consoleSpy).toHaveBeenCalledWith('Erro ao enviar email:', emailError);
            expect(mockFormStateManager.resetForm).not.toHaveBeenCalled();

            consoleSpy.mockRestore();
        });

        it('deve definir status de loading antes de tentar enviar', async () => {
            (mockValidationService.validateForm as jest.Mock).mockReturnValue({
                isValid: true,
                errors: []
            });

            (mockEmailService.sendEmail as jest.Mock).mockImplementation(
                () => new Promise(resolve => setTimeout(resolve, 100))
            );

            const promise = controller.handleSubmit(mockEvent, mockSetStatus);

            expect(mockSetStatus).toHaveBeenCalledWith('loading');

            await promise;
        });
    });
});

describe('ValidationService', () => {
    let validationService: ValidationService;

    beforeEach(() => {
        validationService = new ValidationService();
    });

    describe('validateForm', () => {
        it('deve validar formulário com dados corretos', () => {
            const validData: ContactFormData = {
                name: 'João Silva',
                email: 'joao@email.com',
                message: 'Mensagem válida'
            };

            const result = validationService.validateForm(validData);

            expect(result.isValid).toBe(true);
            expect(result.errors).toHaveLength(0);
        });

        it('deve retornar erro para nome vazio', () => {
            const invalidData: ContactFormData = {
                name: '',
                email: 'joao@email.com',
                message: 'Mensagem válida'
            };

            const result = validationService.validateForm(invalidData);

            expect(result.isValid).toBe(false);
            expect(result.errors).toContain('Nome é obrigatório');
        });

        it('deve retornar erro para email inválido', () => {
            const invalidData: ContactFormData = {
                name: 'João Silva',
                email: 'email-inválido',
                message: 'Mensagem válida'
            };

            const result = validationService.validateForm(invalidData);

            expect(result.isValid).toBe(false);
            expect(result.errors).toContain('Email inválido');
        });

        it('deve retornar erro para mensagem vazia', () => {
            const invalidData: ContactFormData = {
                name: 'João Silva',
                email: 'joao@email.com',
                message: ''
            };

            const result = validationService.validateForm(invalidData);

            expect(result.isValid).toBe(false);
            expect(result.errors).toContain('Mensagem é obrigatória');
        });

        it('deve retornar múltiplos erros', () => {
            const invalidData: ContactFormData = {
                name: '',
                email: 'email-inválido',
                message: ''
            };

            const result = validationService.validateForm(invalidData);

            expect(result.isValid).toBe(false);
            expect(result.errors).toHaveLength(3);
            expect(result.errors).toContain('Nome é obrigatório');
            expect(result.errors).toContain('Email inválido');
            expect(result.errors).toContain('Mensagem é obrigatória');
        });
    });
});

export { };
