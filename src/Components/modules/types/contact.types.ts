// S - Single Responsibility Principle
// Cada interface tem uma única responsabilidade

export interface ContactFormData {
    name: string;
    email: string;
    message: string;
}

export interface ContactFormState {
    formData: ContactFormData;
    status: 'idle' | 'loading' | 'success' | 'error';
}

export interface ToastMessage {
    title: string;
    description: string;
    status: 'success' | 'error' | 'info' | 'warning';
    duration?: number;
    isClosable?: boolean;
}

export interface AnimationConfig {
    threshold: number;
    triggerOnce: boolean;
}

export interface FormVariants {
    containerVariants: any;
    itemVariants: any;
}