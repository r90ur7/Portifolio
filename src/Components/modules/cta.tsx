import React from 'react';
import { Box, Heading, Text, Button, Flex, Icon, Container } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaEnvelope, FaArrowRight } from 'react-icons/fa';

const MotionBox = motion(Box);
const MotionButton = motion(Button);

const CTA = () => {
    return (
        <Box
            py={20}
            position="relative"
            overflow="hidden"
        >
            {/* Background Glow Effects */}
            <Box
                position="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                w="600px"
                h="600px"
                bgGradient="radial(rgba(182, 80, 242, 0.15), transparent 70%)"
                zIndex={0}
                pointerEvents="none"
            />

            <Container maxW="1000px" position="relative" zIndex={1}>
                <MotionBox
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    bg="rgba(13, 27, 42, 0.6)"
                    backdropFilter="blur(20px)"
                    border="1px solid rgba(182, 80, 242, 0.3)"
                    borderRadius="3xl"
                    p={{ base: 8, md: 16 }}
                    textAlign="center"
                    boxShadow="0 20px 50px rgba(0,0,0,0.3)"
                    position="relative"
                    overflow="hidden"
                >
                    {/* Decorative Top Line */}
                    <Box
                        position="absolute"
                        top={0}
                        left={0}
                        right={0}
                        h="4px"
                        bgGradient="linear(to-r, #B650F2, #48307A)"
                    />

                    {/* Status Badge */}
                    <Flex justify="center" mb={8}>
                        <MotionBox
                            bg="rgba(72, 187, 120, 0.15)"
                            color="green.400"
                            px={4}
                            py={2}
                            borderRadius="full"
                            border="1px solid rgba(72, 187, 120, 0.3)"
                            display="flex"
                            alignItems="center"
                            gap={2}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <Box position="relative" display="flex" alignItems="center" justifyContent="center">
                                <Box
                                    w="8px"
                                    h="8px"
                                    bg="green.400"
                                    borderRadius="full"
                                />
                                <MotionBox
                                    position="absolute"
                                    w="100%"
                                    h="100%"
                                    borderRadius="full"
                                    border="2px solid"
                                    borderColor="green.400"
                                    animate={{ scale: [1, 2], opacity: [1, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                />
                            </Box>
                            <Text fontSize="sm" fontWeight="bold" letterSpacing="wide" textTransform="uppercase">
                                Disponível para novos projetos
                            </Text>
                        </MotionBox>
                    </Flex>

                    <Heading
                        as="h2"
                        fontSize={{ base: "3xl", md: "5xl" }}
                        fontWeight="bold"
                        mb={6}
                        lineHeight="1.2"
                    >
                        Vamos transformar sua ideia em <br />
                        <Box as="span" bgGradient="linear(to-r, #B650F2, #9AA6C4)" bgClip="text">
                            Realidade Digital?
                        </Box>
                    </Heading>

                    <Text
                        color="gray.400"
                        fontSize="lg"
                        maxW="600px"
                        mx="auto"
                        mb={10}
                    >
                        Mande uma mensagem e vamos construir algo incrível juntos!
                        Retornarei o contato o mais breve possível para discutirmos sua visão.
                    </Text>

                    <Flex
                        direction={{ base: "column", sm: "row" }}
                        gap={4}
                        justify="center"
                        align="center"
                    >
                        <MotionButton
                            as="a"
                            href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Reunião+com+Rallenson+Silva&dates=&details=Olá!+Gostaria+de+agendar+uma+reunião+para+discutirmos+seu+projeto.+Por+favor,+escolha+um+horário+disponível.&location=&sf=true&output=xml"
                            target="_blank"
                            rel="noopener noreferrer"
                            size="lg"
                            h="60px"
                            px={8}
                            bgGradient="linear(to-r, #B650F2, #48307A)"
                            color="white"
                            _hover={{
                                bgGradient: "linear(to-r, #C86BFD, #5A4494)",
                                transform: "translateY(-2px)",
                                boxShadow: "0 10px 25px rgba(182, 80, 242, 0.4)"
                            }}
                            _active={{ transform: "translateY(0)" }}
                            leftIcon={<Icon as={FaCalendarAlt} />}
                            rightIcon={<Icon as={FaArrowRight} boxSize={3} />}
                            fontSize="md"
                            fontWeight="bold"
                            borderRadius="xl"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Agendar Reunião
                        </MotionButton>

                        <MotionButton
                            as="a"
                            href="mailto:rallenson900@gmail.com"
                            size="lg"
                            h="60px"
                            px={8}
                            variant="outline"
                            borderColor="rgba(255,255,255,0.2)"
                            color="white"
                            _hover={{
                                bg: "rgba(255,255,255,0.05)",
                                borderColor: "white",
                                transform: "translateY(-2px)"
                            }}
                            leftIcon={<Icon as={FaEnvelope} />}
                            fontSize="md"
                            fontWeight="medium"
                            borderRadius="xl"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Enviar Email
                        </MotionButton>
                    </Flex>
                </MotionBox>
            </Container>
        </Box>
    );
};

export default CTA;
