import { Box, Heading, Text, Flex, Link, IconButton, VStack } from "@chakra-ui/react";
import { FaDownload, FaGithub, FaLinkedin, FaRegEnvelope } from "react-icons/fa";
import { motion, useAnimation } from "framer-motion";
import React, { useState, useEffect } from "react";
import { TypeAnimation } from 'react-type-animation';
import ParticlesBackground from "@/Components/common/ParticlesBackground";

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
            {/* Partículas de fundo */}
            <ParticlesBackground />

            <Flex
                flexWrap="wrap"
                justifyContent="center"
                alignItems="center"
                direction={{ base: "column", md: "row" }}
                gap={{ base: 6, md: 12 }}
            >
                <VStack
                    align={{ base: "center", md: "flex-start" }}
                    textAlign={{ base: "center", md: "left" }}
                    spacing={4}
                    maxW={{ base: "100%", md: "50%" }}
                >
                    <MotionHeading
                        as="h1"
                        size={{ base: "xl", md: "2xl" }}
                        fontWeight="bold"
                        bgGradient="linear(to-r, #B650F2, #C86BFD, #B650F2)"
                        bgClip="text"
                        filter="brightness(1.3)"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        textAlign={{ base: "center", md: "justify" }}
                        textShadow="0 0 40px rgba(182, 80, 242, 0.3)"
                    >
                        Rallenson Silva
                    </MotionHeading>

                    <Box
                        fontSize={{ base: "lg", md: "xl" }}
                        fontWeight="medium"
                        minH={{ base: "60px", md: "40px" }}
                        textAlign={{ base: "center", md: "justify" }}
                    >
                        <TypeAnimation
                            sequence={[
                                'Engenheiro de Software',
                                2000,
                                'Desenvolvedor Full Stack',
                                2000,
                                'Especialista em React & Next.js',
                                2000,
                                'Desenvolvedor .NET',
                                2000,
                            ]}
                            wrapper="span"
                            speed={50}
                            style={{
                                background: 'linear-gradient(to right, #9AA6C4, #B650F2)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                                display: 'inline-block',
                            }}
                            repeat={Infinity}
                        />
                    </Box>

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
                                    icon={<FaRegEnvelope size={20} />}
                                    variant="solid"
                                    size="lg"
                                    bg="rgba(13, 27, 42, 0.4)"
                                    backdropFilter="blur(20px) saturate(180%)"
                                    borderRadius="xl"
                                    border="1px solid"
                                    borderColor="rgba(182, 80, 242, 0.4)"
                                    color="#B650F2"
                                    boxShadow="0 8px 32px rgba(182, 80, 242, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
                                    position="relative"
                                    overflow="hidden"
                                    _before={{
                                        content: '""',
                                        position: "absolute",
                                        top: 0,
                                        left: "-100%",
                                        width: "100%",
                                        height: "100%",
                                        background: "linear-gradient(90deg, transparent, rgba(182, 80, 242, 0.3), transparent)",
                                        transition: "left 0.5s ease"
                                    }}
                                    _hover={{
                                        bg: "rgba(182, 80, 242, 0.25)",
                                        borderColor: "#B650F2",
                                        boxShadow: "0 12px 40px rgba(182, 80, 242, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
                                        transform: "translateY(-2px)",
                                        _before: {
                                            left: "100%"
                                        }
                                    }}
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    transition="all 0.3s ease"
                                />
                            </Link>
                            <Link href="https://github.com/r90ur7" isExternal>
                                <IconButton
                                    as={motion.button}
                                    width="100px"
                                    aria-label="GitHub"
                                    icon={<FaGithub size={20} />}
                                    variant="solid"
                                    size="lg"
                                    bg="rgba(13, 27, 42, 0.4)"
                                    backdropFilter="blur(20px) saturate(180%)"
                                    borderRadius="xl"
                                    border="1px solid"
                                    borderColor="rgba(154, 166, 196, 0.4)"
                                    color="#9AA6C4"
                                    boxShadow="0 8px 32px rgba(154, 166, 196, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
                                    position="relative"
                                    overflow="hidden"
                                    _before={{
                                        content: '""',
                                        position: "absolute",
                                        top: 0,
                                        left: "-100%",
                                        width: "100%",
                                        height: "100%",
                                        background: "linear-gradient(90deg, transparent, rgba(154, 166, 196, 0.3), transparent)",
                                        transition: "left 0.5s ease"
                                    }}
                                    _hover={{
                                        bg: "rgba(154, 166, 196, 0.25)",
                                        borderColor: "#9AA6C4",
                                        boxShadow: "0 12px 40px rgba(154, 166, 196, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
                                        transform: "translateY(-2px)",
                                        _before: {
                                            left: "100%"
                                        }
                                    }}
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    transition="all 0.3s ease"
                                />
                            </Link>
                            <Link href="https://www.linkedin.com/in/gustavo-rallenson/" isExternal>
                                <IconButton
                                    as={motion.button}
                                    width="100px"
                                    aria-label="LinkedIn"
                                    icon={<FaLinkedin size={20} />}
                                    variant="solid"
                                    size="lg"
                                    bg="rgba(13, 27, 42, 0.4)"
                                    backdropFilter="blur(20px) saturate(180%)"
                                    borderRadius="xl"
                                    border="1px solid"
                                    borderColor="rgba(72, 48, 122, 0.4)"
                                    color="#48307A"
                                    boxShadow="0 8px 32px rgba(72, 48, 122, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
                                    position="relative"
                                    overflow="hidden"
                                    _before={{
                                        content: '""',
                                        position: "absolute",
                                        top: 0,
                                        left: "-100%",
                                        width: "100%",
                                        height: "100%",
                                        background: "linear-gradient(90deg, transparent, rgba(72, 48, 122, 0.3), transparent)",
                                        transition: "left 0.5s ease"
                                    }}
                                    _hover={{
                                        bg: "rgba(72, 48, 122, 0.25)",
                                        borderColor: "#48307A",
                                        boxShadow: "0 12px 40px rgba(72, 48, 122, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
                                        transform: "translateY(-2px)",
                                        _before: {
                                            left: "100%"
                                        }
                                    }}
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    transition="all 0.3s ease"
                                />
                            </Link>
                        </Flex>
                        <Link display={"flex"} justifyContent={"center"} href="https://bronze-stormy-55.tiiny.site" isExternal mt={4} width="100%">
                            <IconButton
                                as={motion.button}
                                width={["100px", "100%", "50%", "100%"]}
                                aria-label="Download CV"
                                icon={<FaDownload size={20} />}
                                variant="solid"
                                size="lg"
                                bgGradient="linear(to-r, #B650F2, #48307A)"
                                backdropFilter="blur(20px) saturate(180%)"
                                borderRadius="xl"
                                border="1px solid"
                                borderColor="rgba(182, 80, 242, 0.6)"
                                color="white"
                                boxShadow="0 8px 32px rgba(182, 80, 242, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)"
                                position="relative"
                                overflow="hidden"
                                _before={{
                                    content: '""',
                                    position: "absolute",
                                    top: 0,
                                    left: "-100%",
                                    width: "100%",
                                    height: "100%",
                                    background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)",
                                    transition: "left 0.5s ease"
                                }}
                                _hover={{
                                    bgGradient: "linear(to-r, #C86BFD, #5A4494)",
                                    boxShadow: "0 12px 40px rgba(182, 80, 242, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.3)",
                                    transform: "translateY(-2px)",
                                    _before: {
                                        left: "100%"
                                    }
                                }}
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                transition="all 0.3s ease"
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
                            <MotionBox
                                position="relative"
                                w={200}
                                h={{ base: "100vw", md: "55vh" }}
                                maxH={{ base: "6000px", md: "400px" }}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                whileHover={{ scale: 1.05 }}
                            >
                                {/* Borda animada com gradiente rotativo */}
                                <Box
                                    position="absolute"
                                    top="-4px"
                                    left="-4px"
                                    right="-4px"
                                    bottom="-4px"
                                    borderRadius="2xl"
                                    overflow="hidden"
                                    _before={{
                                        content: '""',
                                        position: "absolute",
                                        top: "-50%",
                                        left: "-50%",
                                        width: "200%",
                                        height: "200%",
                                        background: "conic-gradient(from 0deg, #B650F2, #C86BFD, #48307A, #9AA6C4, #B650F2, #C86BFD, #48307A, #9AA6C4, #B650F2)",
                                        animation: "rotateBorder 4s linear infinite",
                                    }}
                                    sx={{
                                        "@keyframes rotateBorder": {
                                            "0%": { transform: "rotate(0deg)" },
                                            "100%": { transform: "rotate(360deg)" },
                                        }
                                    }}
                                />

                                {/* Container da imagem */}
                                <Box
                                    position="relative"
                                    w="100%"
                                    h="100%"
                                    borderRadius="2xl"
                                    overflow="hidden"
                                    boxShadow="0 20px 60px rgba(182, 80, 242, 0.4)"
                                    bg="#0D1B2A"
                                    zIndex={1}
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
                                        zIndex="2"
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
                            </MotionBox>
                        </VStack>
                    </Flex>
                </VStack>
            </Flex>
        </MotionBox>
    );
};

export default Header;