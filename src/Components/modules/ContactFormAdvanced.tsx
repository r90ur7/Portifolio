// Versão avançada do ContactForm usando Factory Pattern
// Demonstra como estender os princípios SOLID com padrões de design

import React from 'react';
import { Box, Text, Flex, useToast } from "@chakra-ui/react";
import { motion } from "framer-motion";

// Hooks customizados (Single Responsibility)
import { useContactForm } from './hooks/useContactForm';
import { useContactFormAnimation } from './hooks/useContactFormAnimation';

// Factory para criação de serviços
import { ContactFormServiceFactory, Environment } from './factories/ServiceFactory';
import { ContactFormController } from './controllers/ContactFormController';

// Componentes UI (Single Responsibility)
import { FormInput, FormTextarea } from './form/FormFields';
import { SubmitButton } from './form/SubmitButton';

const MotionBox = motion(Box);

interface ContactFormAdvancedProps {
    environment?: Environment;
    customConfig?: {
        animationThreshold?: number;
        triggerOnce?: boolean;
    };
}

const ContactFormAdvanced: React.FC<ContactFormAdvancedProps> = ({
    environment = Environment.DEVELOPMENT,
    customConfig = {}
}) => {
    // Hooks customizados encapsulam responsabilidades específicas
    const { formData, status, setStatus, formStateManager } = useContactForm();
    const { ref, controls, variants } = useContactFormAnimation({
        threshold: customConfig.animationThreshold || 0.3,
        triggerOnce: customConfig.triggerOnce || false
    });

    // Factory Pattern - cria serviços baseado no ambiente
    const toast = useToast();
    const services = ContactFormServiceFactory.createServices(toast, environment);

    // Controller que orquestra as operações (Single Responsibility + Dependency Injection)
    const controller = new ContactFormController(
        services.emailService,
        services.notificationService,
        services.validationService,
        formStateManager
    );

    const handleSubmit = (e: React.FormEvent) => {
        controller.handleSubmit(e, setStatus);
    };

    return (
        <MotionBox
            ref={ref}
            variants={variants.containerVariants}
            initial="hidden"
            animate={controls}
            maxW="1200px"
            mx="auto"
            px={4}
            py={20}
            bg="linear-gradient(180deg, rgba(54, 37, 88, 0.8) 0%, rgba(13, 27, 42, 0.9) 100%)"
            borderRadius="2xl"
            backdropFilter="blur(10px)"
            boxShadow="0 8px 32px rgba(0, 0, 0, 0.1)"
            as="form"
            onSubmit={handleSubmit}
        >
            <Text
                fontSize="4xl"
                fontWeight="bold"
                bgGradient="linear(to-r, #B650F2, #9AA6C4)"
                bgClip="text"
                textAlign="center"
                mb={12}
            >
                Vamos Trabalhar Juntos?
            </Text>

            {/* Badge para mostrar o ambiente atual (apenas em desenvolvimento) */}
            {environment === Environment.DEVELOPMENT && (
                <Box
                    position="absolute"
                    top={4}
                    right={4}
                    bg="rgba(182, 80, 242, 0.2)"
                    color="white"
                    px={3}
                    py={1}
                    borderRadius="md"
                    fontSize="sm"
                >
                    ENV: {environment}
                </Box>
            )}

            <Flex direction="column" maxW="600px" mx="auto" gap={6}>
                {/* Componentes especializados (Single Responsibility) */}
                <FormInput
                    placeholder="Seu Nome"
                    value={formData.name}
                    onChange={(value) => formStateManager.updateField('name', value)}
                    variants={variants.itemVariants}
                    controls={controls}
                    required
                />

                <FormInput
                    placeholder="Seu Email"
                    type="email"
                    value={formData.email}
                    onChange={(value) => formStateManager.updateField('email', value)}
                    variants={variants.itemVariants}
                    controls={controls}
                    required
                />

                <FormTextarea
                    placeholder="Sua Mensagem"
                    value={formData.message}
                    onChange={(value) => formStateManager.updateField('message', value)}
                    variants={variants.itemVariants}
                    controls={controls}
                    required
                />

                <SubmitButton
                    isLoading={status === 'loading'}
                    status={status}
                    variants={variants.itemVariants}
                    controls={controls}
                />
            </Flex>
        </MotionBox>
    );
};

export default ContactFormAdvanced;

// HOC para diferentes configurações de ambiente
export const ContactFormDevelopment = () => (
    <ContactFormAdvanced environment={Environment.DEVELOPMENT} />
);

export const ContactFormProduction = () => (
    <ContactFormAdvanced environment={Environment.PRODUCTION} />
);

export const ContactFormTest = () => (
    <ContactFormAdvanced environment={Environment.TEST} />
);
