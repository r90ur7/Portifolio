import React from 'react';
import { Box, Text, Flex, useToast } from "@chakra-ui/react";
import { motion } from "framer-motion";

import { useContactForm } from './hooks/useContactForm';
import { useContactFormAnimation } from './hooks/useContactFormAnimation';

import { EmailService, NotificationService, ValidationService } from './services/contact.services';
import { ContactFormController } from './controllers/ContactFormController';

import { FormInput, FormTextarea } from './form/FormFields';
import { SubmitButton } from './form/SubmitButton';

const MotionBox = motion(Box);

const ContactForm: React.FC = () => {
    const { formData, status, setStatus, formStateManager } = useContactForm();
    const { ref, controls, variants } = useContactFormAnimation({
        threshold: 0.3,
        triggerOnce: false
    });

    const toast = useToast();
    const emailService = new EmailService();
    const notificationService = new NotificationService(toast);
    const validationService = new ValidationService();

    const controller = new ContactFormController(
        emailService,
        notificationService,
        validationService,
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

            <Flex direction="column" maxW="600px" mx="auto" gap={6}>
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

export default ContactForm;