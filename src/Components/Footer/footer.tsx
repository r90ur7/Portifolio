import { Box, Text, Button, Flex, Link, SimpleGrid, Icon, Input, InputGroup, InputRightElement, IconButton, VStack, HStack, Divider } from "@chakra-ui/react";
import { FaGithub, FaLinkedin, FaRegEnvelope, FaArrowUp, FaDownload, FaPaperPlane, FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <Box
            bg="rgba(13, 27, 42, 0.95)"
            borderTop="1px solid rgba(182, 80, 242, 0.2)"
            position="relative"
            pt={20}
            pb={10}
            mt={0}
        >
            <Box width="100%" px={{ base: 6, md: 10, lg: 16 }}>
                <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10} mb={16}>

                    {/* Coluna 1: Sobre */}
                    <VStack align="start" spacing={6}>
                        <Text
                            fontSize="2xl"
                            fontWeight="bold"
                            bgGradient="linear(to-r, #B650F2, #9AA6C4)"
                            bgClip="text"
                        >
                            Rallenson Silva
                        </Text>
                        <Text color="gray.400" lineHeight="tall">
                            Desenvolvedor Full Stack focado em criar experiências digitais imersivas e performáticas. Transformando ideias complexas em código elegante.
                        </Text>
                        <Button
                            as="a"
                            href="/Rallenson_Silva.pdf"
                            download="Rallenson_Silva.pdf"
                            leftIcon={<FaDownload />}
                            colorScheme="purple"
                            variant="outline"
                            size="sm"
                            _hover={{ bg: "rgba(182, 80, 242, 0.1)" }}
                        >
                            Download CV
                        </Button>
                    </VStack>

                    {/* Coluna 2: Links Rápidos */}
                    <VStack align="start" spacing={4}>
                        <Text fontSize="lg" fontWeight="bold" color="white">Links Rápidos</Text>
                        <Link href="#about" color="gray.400" _hover={{ color: "#B650F2", pl: 2 }} transition="all 0.2s">Sobre Mim</Link>
                        <Link href="#projects" color="gray.400" _hover={{ color: "#B650F2", pl: 2 }} transition="all 0.2s">Projetos</Link>
                        <Link href="#skills" color="gray.400" _hover={{ color: "#B650F2", pl: 2 }} transition="all 0.2s">Skills</Link>
                        <Link href="#contact" color="gray.400" _hover={{ color: "#B650F2", pl: 2 }} transition="all 0.2s">Contato</Link>
                    </VStack>

                    {/* Coluna 3: Contato */}
                    <VStack align="start" spacing={4}>
                        <Text fontSize="lg" fontWeight="bold" color="white">Contato</Text>
                        <HStack color="gray.400">
                            <Icon as={FaRegEnvelope} color="#B650F2" />
                            <Link href="mailto:rallenson900@gmail.com" _hover={{ color: "white" }}>rallenson900@gmail.com</Link>
                        </HStack>
                        <HStack color="gray.400">
                            <Icon as={FaLinkedin} color="#0077B5" />
                            <Link href="https://linkedin.com/in/gustavo-rallenson" isExternal _hover={{ color: "white" }}>/in/gustavo-rallenson</Link>
                        </HStack>
                        <HStack color="gray.400">
                            <Icon as={FaGithub} color="#ffffff" />
                            <Link href="https://github.com/r90ur7" isExternal _hover={{ color: "white" }}>/r90ur7</Link>
                        </HStack>
                        <HStack color="gray.400">
                            <Icon as={FaMapMarkerAlt} color="#E53E3E" />
                            <Text>Brasil</Text>
                        </HStack>
                    </VStack>

                    {/* Coluna 4: Newsletter */}
                    <VStack align="start" spacing={6}>
                        <Text fontSize="lg" fontWeight="bold" color="white">Newsletter</Text>
                        <Text color="gray.400" fontSize="sm">
                            Receba atualizações sobre meus novos projetos e artigos sobre tecnologia.
                        </Text>
                        <InputGroup size="md">
                            <Input
                                pr="4.5rem"
                                type="email"
                                placeholder="Seu email"
                                bg="rgba(255,255,255,0.05)"
                                border="none"
                                _focus={{ bg: "rgba(255,255,255,0.1)", ring: 2, ringColor: "purple.500" }}
                                color="white"
                            />
                            <InputRightElement width="3rem">
                                <IconButton
                                    h="1.75rem"
                                    size="sm"
                                    aria-label="Subscribe"
                                    icon={<FaPaperPlane />}
                                    colorScheme="purple"
                                    variant="ghost"
                                />
                            </InputRightElement>
                        </InputGroup>
                    </VStack>
                </SimpleGrid>

                <Divider borderColor="rgba(255,255,255,0.1)" mb={8} />

                <Flex
                    direction={{ base: "column", md: "row" }}
                    justify="space-between"
                    align="center"
                    gap={4}
                >
                    <Text color="gray.500" fontSize="sm" textAlign="center">
                        © {new Date().getFullYear()} Rallenson Silva. Feito com <Icon as={FaPaperPlane} color="#B650F2" mx={1} /> e React.
                    </Text>

                    <HStack spacing={4}>
                        <SocialButton icon={FaGithub} href="https://github.com/r90ur7" label="GitHub" />
                        <SocialButton icon={FaLinkedin} href="https://linkedin.com/in/gustavo-rallenson" label="LinkedIn" />
                        <SocialButton icon={FaRegEnvelope} href="mailto:rallenson900@gmail.com" label="Email" />
                    </HStack>

                    <Button
                        onClick={scrollToTop}
                        size="sm"
                        variant="ghost"
                        color="gray.400"
                        _hover={{ color: "#B650F2", bg: "rgba(182, 80, 242, 0.1)" }}
                        leftIcon={<FaArrowUp />}
                    >
                        Voltar ao Topo
                    </Button>
                </Flex>
            </Box>
        </Box>
    );
};

const SocialButton = ({ icon, href, label }: any) => (
    <IconButton
        as="a"
        href={href}
        target="_blank"
        aria-label={label}
        icon={<Icon as={icon} boxSize={5} />}
        variant="ghost"
        color="gray.400"
        _hover={{
            color: "white",
            bg: "rgba(255,255,255,0.1)",
            transform: "translateY(-3px)"
        }}
        transition="all 0.3s"
        borderRadius="full"
    />
);

export default Footer;