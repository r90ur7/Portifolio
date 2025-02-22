import { Box, Heading, Text, Flex, Link, IconButton, VStack } from "@chakra-ui/react";
import { FaDownload, FaGithub, FaLinkedin, FaRegEnvelope } from "react-icons/fa";
import { motion, useAnimation } from "framer-motion";
import React, { useState, useEffect } from "react";

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);
const MotionFlex = motion(Flex);

const Header = () => {
    const controls = useAnimation();
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.pageYOffset;
            const isVisible = prevScrollPos > currentScrollPos;

            setVisible(
                currentScrollPos < 100 ||
                (isVisible && currentScrollPos > 100)
            );
            setPrevScrollPos(currentScrollPos);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [prevScrollPos]);

    useEffect(() => {
        controls.start({
            opacity: visible ? 1 : 0,
            y: visible ? 0 : -20,
            transition: { duration: 0.3 }
        });
    }, [visible, controls]);

    return (
        <MotionBox
            maxWidth="1200px"
            mx="auto"
            position="sticky"
            top="0"
            zIndex="sticky"
            animate={controls}
            initial={{ opacity: 0 }}
        >
            <Flex
                flexWrap="wrap"
                justifyContent="center"
                alignItems="center"
                direction={{ base: "column", md: "row" }}
                gap={{ base: 6, md: 12 }}
            >
                <VStack
                    align={{ base: "center", md: "flex-start" }} // Alinhamento responsivo
                    textAlign={{ base: "center", md: "left" }} // Texto centralizado em mobile
                    spacing={4}
                    maxW={{ base: "100%", md: "50%" }} // Largura máxima responsiva
                >
                    <MotionHeading
                        as="h1"
                        size={{ base: "xl", md: "2xl" }}
                        fontWeight="bold"
                        bgGradient="linear(to-t, #B650F2, #362558)"
                        bgClip="text"
                        filter="brightness(1.2)"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        textAlign={{ base: "center", md: "justify" }}
                    >
                        Rallenson Silva
                    </MotionHeading>

                    <MotionText
                        fontSize={{ base: "lg", md: "xl" }}
                        color="gray.600"
                        fontWeight="medium"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        textAlign={"justify"}
                    >
                        Engenheiro de Software | Desenvolvedor Full Stack
                    </MotionText>

                    <MotionText
                        maxWidth="600px"
                        color="gray.500"
                        lineHeight="tall"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        textAlign={"justify"}

                    >
                        Desenvolvedor Full Stack especializado em React Next.js e .NET, com experiência em construção de sistemas educacionais escaláveis e interfaces intuitivas. Combino técnicas ágeis com arquitetura modular para entregas de alta performance.
                    </MotionText>

                    <MotionFlex
                        flexDirection={"column"}
                        gap={6}
                        mt={4}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.8 }}
                    >
                        <Flex flexWrap={"wrap"} gap={6} justifyContent={"center"}>
                            <Link href="#contact" _hover={{ textDecoration: 'none' }}>
                                <IconButton
                                    as={motion.button}
                                    width="100px"
                                    aria-label="Contato"
                                    icon={<FaRegEnvelope color="#096666FF" />}
                                    variant="solid"
                                    colorScheme="teal"
                                    size="lg"
                                    bg="#0D1B2A"
                                    borderRadius="md"
                                    border="0.2px solid"
                                    borderColor="#9AA6C4FF"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                />
                            </Link>
                            <Link href="https://github.com/r90ur7" isExternal>
                                <IconButton
                                    as={motion.button}
                                    width="100px"
                                    aria-label="GitHub"
                                    icon={<FaGithub color="#096666FF" />}
                                    variant="solid"
                                    colorScheme="teal"
                                    size="lg"
                                    bg="#0D1B2A"
                                    borderRadius="md"
                                    border="0.2px solid"
                                    borderColor="#9AA6C4FF"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                />
                            </Link>
                            <Link href="https://www.linkedin.com/in/gustavo-rallenson/" isExternal>
                                <IconButton
                                    as={motion.button}
                                    width="100px"
                                    aria-label="LinkedIn"
                                    icon={<FaLinkedin color="#096666FF" />}
                                    variant="solid"
                                    colorScheme="teal"
                                    size="lg"
                                    bg="#0D1B2A"
                                    borderRadius="md"
                                    border="0.2px solid"
                                    borderColor="#9AA6C4FF"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                />
                            </Link>
                        </Flex>
                        <Link display={"flex"} justifyContent={"center"} href="https://bronze-stormy-55.tiiny.site" isExternal mt={4} width="100%">
                            <IconButton
                                as={motion.button}
                                width={["100px","100%", "50%", "100%" ]}
                                aria-label="Portfólio"
                                icon={< FaDownload color="#096666FF" />}
                                variant="solid"
                                colorScheme="teal"
                                size="lg"
                                bg="#0D1B2A"
                                borderRadius="md"
                                border="0.2px solid"
                                borderColor="#9AA6C4FF"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            />
                        </Link>
                    </MotionFlex>
                </VStack>
                <VStack
                    align="center"
                    spacing={4}
                    maxW={{ base: "100%", md: "40%" }}
                >
                    <Flex>
                        <VStack>
                            <Box
                                position="relative"
                                w={200}
                                h={{ base: "100vw", md: "55vh" }}
                                maxH={{ base: "6000px", md: "400px" }}
                                borderRadius="md"
                                overflow="hidden"
                                boxShadow="2px 15px 50px 0.1px rgba(182, 80, 242, 0.25)"
                                _before={{
                                    content: '""',
                                    position: "absolute",
                                    top: "-2px",
                                    left: "-2px",
                                    right: "-2px",
                                    bottom: "-2px",
                                    borderRadius: "md",
                                    background: "linear-gradient(to top, #B650F2 0%, #362558 100%)",
                                    zIndex: 0,
                                    filter: "blur(8px)",
                                    opacity: 0.7,
                                }}
                                _after={{
                                    content: '""',
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    borderRadius: "md",
                                    border: "2px solid",
                                    background: "linear-gradient(to top, #362558 0%, #B650F2 100%)",
                                    borderColor: "rgba(182, 80, 242, 0.15)",
                                    mixBlendMode: "soft-light",
                                }}
                            >
                                <Box
                                    as="img"
                                    src="assets/perfil.png"
                                    alt="Minha Foto"
                                    position="absolute"
                                    w="100%"
                                    h="100%"
                                    top="50%"
                                    left="50%"
                                    transform="translate(-50%, -50%)"
                                    zIndex="1"
                                    sx={{
                                        "&": {
                                            minWidth: "100%",
                                            minHeight: "100%",
                                            objectFit: "cover",
                                            objectPosition: "center top",
                                        },
                                    }}
                                />
                            </Box>
                        </VStack>
                    </Flex>
                </VStack>
            </Flex>
        </MotionBox>
    );
};

export default Header;