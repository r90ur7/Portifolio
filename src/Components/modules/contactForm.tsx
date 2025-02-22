import { useState, useEffect } from 'react';
import { Box, Text, Input, Textarea, Button, Flex, useToast } from "@chakra-ui/react";
import { FaRegEnvelope } from "react-icons/fa";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const MotionBox = motion(Box);
const MotionButton = motion(Button);
const MotionInput = motion(Input);
const MotionTextarea = motion(Textarea);

const ContactForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const toast = useToast();
    const controls = useAnimation();

    const [ref, inView] = useInView({
        threshold: 0.3,
        triggerOnce: false,
    });

    useEffect(() => {
        if (inView) {
            controls.start("visible");
        } else {
            controls.start("hidden");
        }
    }, [controls, inView]);

    const containerVariants = {
        hidden: { opacity: 0, y: 50, transition: { duration: 0.5 } },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        const emailData = {
            name,
            email,
            message,
        };

        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(emailData)
            });

            if (!response.ok) {
                throw new Error('Erro ao enviar email');
            }

            setStatus('success');
            toast({
                title: "Mensagem enviada!",
                description: "Entrarei em contato em breve.",
                status: "success",
                duration: 5000,
                isClosable: true,
            });

            // Limpar formulário
            setName('');
            setEmail('');
            setMessage('');

        } catch (error) {
            console.error('Erro ao enviar email:', error);
            setStatus('error');
            toast({
                title: "Erro ao enviar mensagem",
                description: "Por favor, tente novamente mais tarde.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };

    return (
        <MotionBox
            ref={ref}
            variants={containerVariants}
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
                <MotionInput
                    placeholder="Seu Nome"
                    size="lg"
                    bg="rgba(255, 255, 255, 0.05)"
                    border="1px solid"
                    borderColor="rgba(182, 80, 242, 0.3)"
                    _focus={{ borderColor: "#B650F2" }}
                    _placeholder={{ color: "gray.400" }}
                    variants={itemVariants}
                    initial="hidden"
                    animate={controls}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <MotionInput
                    placeholder="Seu Email"
                    type="email"
                    size="lg"
                    bg="rgba(255, 255, 255, 0.05)"
                    border="1px solid"
                    borderColor="rgba(182, 80, 242, 0.3)"
                    _focus={{ borderColor: "#B650F2" }}
                    _placeholder={{ color: "gray.400" }}
                    variants={itemVariants}
                    initial="hidden"
                    animate={controls}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <MotionTextarea
                    placeholder="Sua Mensagem"
                    size="lg"
                    rows={6}
                    bg="rgba(255, 255, 255, 0.05)"
                    border="1px solid"
                    borderColor="rgba(182, 80, 242, 0.3)"
                    _focus={{ borderColor: "#B650F2" }}
                    _placeholder={{ color: "gray.400" }}
                    variants={itemVariants}
                    initial="hidden"
                    animate={controls}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                />

                <MotionButton
                    size="lg"
                    bgGradient="linear(to-r, #B650F2, #362558)"
                    color="white"
                    _hover={{ bgGradient: "linear(to-r, #C86BFD, #48307A)" }}
                    _active={{ transform: "scale(0.98)" }}
                    rightIcon={<FaRegEnvelope />}
                    type="submit"
                    variants={itemVariants}
                    initial="hidden"
                    animate={controls}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    isLoading={status === 'loading'}
                    loadingText="Enviando..."
                >
                    {status === 'success' ? 'Enviado!' : 'Enviar Mensagem'}
                </MotionButton>
            </Flex>
        </MotionBox>
    );
};

export default ContactForm;