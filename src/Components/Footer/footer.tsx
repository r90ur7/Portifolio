// Footer.jsx
import { Box, Text, Button, Flex, Link } from "@chakra-ui/react";
import { FaGithub, FaLinkedin, FaRegEnvelope, FaArrowUp } from "react-icons/fa";
import ContactForm from "../modules/ContactForm";
import { keyframes } from "@emotion/react";

const pulse = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(0); }
`;

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            <Box mt={20} id="contact">
                <ContactForm />
            </Box>

            {/* Footer */}
            <Box
                bg="linear-gradient(180deg, #0D1B2A 0%, #1A1A2E 100%)"
                mt={20}
                py={12}
                position="relative"
            >
                <Flex
                    maxW="1200px"
                    mx="auto"
                    px={4}
                    direction={{ base: "column", md: "row" }}
                    justify="space-between"
                    align="center"
                    gap={8}
                >
                    {/* Redes Sociais */}
                    <Flex gap={6}>
                        <Link href="https://github.com/seu-usuario" isExternal _hover={{ textDecoration: "none" }}>
                            <FaGithub
                                size="28px"
                                color="#9AA6C4"
                                style={{ transition: "all 0.3s" }}
                            // Note: _hover não funciona diretamente em ícones, considere envolver o ícone em um componente Box se quiser estilizar o hover
                            />
                        </Link>

                        <Link href="https://linkedin.com/in/seu-perfil" isExternal _hover={{ textDecoration: "none" }}>
                            <FaLinkedin
                                size="28px"
                                color="#9AA6C4"
                                style={{ transition: "all 0.3s" }}
                            />
                        </Link>

                        <Link href="mailto:seu-email@exemplo.com" _hover={{ textDecoration: "none" }}>
                            <FaRegEnvelope
                                size="28px"
                                color="#9AA6C4"
                                style={{ transition: "all 0.3s" }}
                            />
                        </Link>
                    </Flex>

                    {/* Direitos Autorais */}
                    <Text color="#9AA6C4" textAlign="center">
                        © {new Date().getFullYear()} Rallenson Silva. Todos os direitos reservados.
                    </Text>

                    {/* Botão Voltar ao Topo */}
                    <Button
                        onClick={scrollToTop}
                        bg="rgba(182, 80, 242, 0.1)"
                        border="1px solid"
                        borderColor="#B650F2"
                        color="#B650F2"
                        _hover={{ bg: "rgba(182, 80, 242, 0.2)" }}
                        leftIcon={<FaArrowUp />}
                        animation={`${pulse} 2s ease-in-out infinite`}
                    >
                        Topo
                    </Button>
                </Flex>

                {/* Borda Decorativa */}
                <Box
                    position="absolute"
                    top="0"
                    left="0"
                    right="0"
                    height="2px"
                    bgGradient="linear(to-r, transparent, #B650F2, transparent)"
                />
            </Box>
        </>
    );
};

export default Footer;