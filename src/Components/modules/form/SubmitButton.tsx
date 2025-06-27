// S - Single Responsibility Principle
// Componente responsável apenas pelo botão de submit

import React from 'react';
import { Button } from '@chakra-ui/react';
import { FaRegEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';

const MotionButton = motion(Button);

interface SubmitButtonProps {
    isLoading: boolean;
    status: 'idle' | 'loading' | 'success' | 'error';
    variants: any;
    controls: any;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({
    isLoading,
    status,
    variants,
    controls
}) => {
    return (
        <MotionButton
            size="lg"
            bgGradient="linear(to-r, #B650F2, #362558)"
            color="white"
            _hover={{ bgGradient: "linear(to-r, #C86BFD, #48307A)" }}
            _active={{ transform: "scale(0.98)" }}
            rightIcon={<FaRegEnvelope />}
            type="submit"
            variants={variants}
            initial="hidden"
            animate={controls}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            isLoading={isLoading}
            loadingText="Enviando..."
        >
            {status === 'success' ? 'Enviado!' : 'Enviar Mensagem'}
        </MotionButton>
    );
};
