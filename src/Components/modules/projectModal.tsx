import React, { useState } from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    ModalFooter,
    Box,
    Image,
    Text,
    Heading,
    Flex,
    Button,
    Icon,
    HStack,
    VStack,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    Badge,
    IconButton,
    SimpleGrid,
    Link
} from "@chakra-ui/react";
import {
    FaGithub,
    FaExternalLinkAlt,
    FaStar,
    FaCodeBranch,
    FaFire,
    FaChevronLeft,
    FaChevronRight,
    FaLightbulb,
    FaTools
} from "react-icons/fa";
import {
    SiReact,
    SiTypescript,
    SiJavascript,
    SiNextdotjs,
    SiDotnet,
    SiSharp,
    SiChakraui,
    SiTailwindcss,
    SiNodedotjs,
    SiPython,
    SiDocker,
    SiPostgresql,
    SiMongodb
} from "react-icons/si";

// Mapeamento de ícones para tecnologias
const techIcons: { [key: string]: any } = {
    "React": SiReact,
    "TypeScript": SiTypescript,
    "JavaScript": SiJavascript,
    "Next.js": SiNextdotjs,
    ".NET": SiDotnet,
    "C#": SiSharp,
    "Chakra UI": SiChakraui,
    "Tailwind": SiTailwindcss,
    "Node.js": SiNodedotjs,
    "Python": SiPython,
    "Docker": SiDocker,
    "PostgreSQL": SiPostgresql,
    "MongoDB": SiMongodb
};

interface ProjectModalProps {
    isOpen: boolean;
    onClose: () => void;
    project: any;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ isOpen, onClose, project }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    if (!project) return null;

    // Simulação de galeria (usando a imagem principal + placeholders se não houver outras)
    // Em um cenário real, você buscaria essas imagens de uma API ou JSON
    const galleryImages = [
        project.featureImage,
        // Adicione mais URLs de imagens aqui se tiver
    ].filter(Boolean);

    const handleNextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
    };

    const handlePrevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
    };

    const getTechIcon = (techName: string) => {
        // Tenta encontrar o ícone exato ou parcial
        const key = Object.keys(techIcons).find(k => techName.toLowerCase().includes(k.toLowerCase()));
        return key ? techIcons[key] : FaTools;
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="2xl" isCentered scrollBehavior="inside">
            <ModalOverlay backdropFilter="blur(10px)" bg="rgba(0,0,0,0.8)" />
            <ModalContent
                bg="#0D1B2A"
                borderColor="rgba(182, 80, 242, 0.3)"
                borderWidth="1px"
                borderRadius="2xl"
                boxShadow="0 0 50px rgba(182, 80, 242, 0.2)"
                maxH="90vh"
            >
                <ModalHeader
                    bgGradient="linear(to-r, #B650F2, #9AA6C4)"
                    bgClip="text"
                    fontSize="2xl"
                    fontWeight="bold"
                    borderBottom="1px solid rgba(255,255,255,0.1)"
                    pb={4}
                >
                    {project.name}
                </ModalHeader>
                <ModalCloseButton color="white" mt={2} />

                <ModalBody py={6} px={{ base: 4, md: 6 }}>
                    {/* Galeria de Imagens */}
                    <Box
                        borderRadius="xl"
                        overflow="hidden"
                        mb={8}
                        position="relative"
                        boxShadow="0 20px 40px rgba(0,0,0,0.6)"
                        bg="black"
                        h="350px"
                    >
                        <Image
                            src={galleryImages[currentImageIndex]}
                            alt={`${project.name} screenshot ${currentImageIndex + 1}`}
                            w="100%"
                            h="100%"
                            objectFit="contain"
                            fallbackSrc={`/api/og?repo=${encodeURIComponent(project.name)}&desc=${encodeURIComponent(project.description || '')}`}
                        />

                        {/* Controles da Galeria (só mostra se tiver mais de 1 imagem) */}
                        {galleryImages.length > 1 && (
                            <>
                                <IconButton
                                    aria-label="Previous image"
                                    icon={<FaChevronLeft />}
                                    position="absolute"
                                    left={2}
                                    top="50%"
                                    transform="translateY(-50%)"
                                    onClick={handlePrevImage}
                                    colorScheme="blackAlpha"
                                    borderRadius="full"
                                    size="sm"
                                />
                                <IconButton
                                    aria-label="Next image"
                                    icon={<FaChevronRight />}
                                    position="absolute"
                                    right={2}
                                    top="50%"
                                    transform="translateY(-50%)"
                                    onClick={handleNextImage}
                                    colorScheme="blackAlpha"
                                    borderRadius="full"
                                    size="sm"
                                />
                                <Flex position="absolute" bottom={4} left="50%" transform="translateX(-50%)" gap={2}>
                                    {galleryImages.map((_, idx) => (
                                        <Box
                                            key={idx}
                                            w={2}
                                            h={2}
                                            borderRadius="full"
                                            bg={idx === currentImageIndex ? "purple.400" : "whiteAlpha.500"}
                                            cursor="pointer"
                                            onClick={() => setCurrentImageIndex(idx)}
                                        />
                                    ))}
                                </Flex>
                            </>
                        )}

                        {project.topics.includes('featured') && (
                            <Badge
                                position="absolute"
                                top={4}
                                right={4}
                                colorScheme="purple"
                                variant="solid"
                                px={3}
                                py={1}
                                borderRadius="full"
                                boxShadow="0 4px 15px rgba(0,0,0,0.3)"
                                display="flex"
                                alignItems="center"
                            >
                                <Icon as={FaFire} mr={1} /> Featured
                            </Badge>
                        )}
                    </Box>

                    <Tabs variant="line" colorScheme="purple" isFitted>
                        <TabList mb={4} borderBottomColor="rgba(255,255,255,0.1)">
                            <Tab color="gray.400" _selected={{ color: "white", borderColor: "#B650F2" }}>Sobre</Tab>
                            <Tab color="gray.400" _selected={{ color: "white", borderColor: "#B650F2" }}>Tecnologias</Tab>
                            <Tab color="gray.400" _selected={{ color: "white", borderColor: "#B650F2" }}>Desafios</Tab>
                        </TabList>

                        <TabPanels>
                            {/* Aba Sobre */}
                            <TabPanel p={0}>
                                <VStack align="start" spacing={4}>
                                    <Text color="gray.300" fontSize="lg" lineHeight="tall">
                                        {project.description || "Sem descrição disponível."}
                                    </Text>

                                    <Flex w="full" justify="space-between" align="center" p={4} bg="rgba(255,255,255,0.05)" borderRadius="lg" mt={2}>
                                        <HStack spacing={8}>
                                            <VStack align="start" spacing={0}>
                                                <Text color="gray.500" fontSize="xs" textTransform="uppercase" letterSpacing="wide">Stars</Text>
                                                <Flex align="center" color="yellow.400" fontSize="xl" fontWeight="bold">
                                                    <Icon as={FaStar} mr={2} />
                                                    {project.stargazers_count}
                                                </Flex>
                                            </VStack>
                                            <VStack align="start" spacing={0}>
                                                <Text color="gray.500" fontSize="xs" textTransform="uppercase" letterSpacing="wide">Forks</Text>
                                                <Flex align="center" color="blue.400" fontSize="xl" fontWeight="bold">
                                                    <Icon as={FaCodeBranch} mr={2} />
                                                    {project.forks_count}
                                                </Flex>
                                            </VStack>
                                        </HStack>
                                    </Flex>
                                </VStack>
                            </TabPanel>

                            {/* Aba Tecnologias */}
                            <TabPanel p={0}>
                                <SimpleGrid columns={{ base: 2, sm: 3 }} spacing={4} mt={2}>
                                    {project.languages.map((lang: string) => (
                                        <Flex
                                            key={lang}
                                            align="center"
                                            p={3}
                                            bg="rgba(255,255,255,0.05)"
                                            borderRadius="lg"
                                            border="1px solid rgba(255,255,255,0.05)"
                                            _hover={{ borderColor: "purple.500", bg: "rgba(182, 80, 242, 0.1)" }}
                                            transition="all 0.2s"
                                        >
                                            <Icon as={getTechIcon(lang)} boxSize={6} color="#B650F2" mr={3} />
                                            <Text color="gray.200" fontWeight="medium">{lang}</Text>
                                        </Flex>
                                    ))}
                                </SimpleGrid>
                            </TabPanel>

                            {/* Aba Desafios & Soluções (Mockado por enquanto) */}
                            <TabPanel p={0}>
                                <VStack align="start" spacing={6} mt={2}>
                                    <Box>
                                        <Flex align="center" mb={2} color="red.300">
                                            <Icon as={FaLightbulb} mr={2} />
                                            <Heading size="sm">O Desafio</Heading>
                                        </Flex>
                                        <Text color="gray.400">
                                            Criar uma interface intuitiva e responsiva que pudesse lidar com grandes volumes de dados sem comprometer a performance, mantendo a consistência visual em todos os dispositivos.
                                        </Text>
                                    </Box>

                                    <Box>
                                        <Flex align="center" mb={2} color="green.300">
                                            <Icon as={FaTools} mr={2} />
                                            <Heading size="sm">A Solução</Heading>
                                        </Flex>
                                        <Text color="gray.400">
                                            Implementação de arquitetura baseada em componentes reutilizáveis, uso de estratégias de cache avançadas e otimização de renderização. Adoção de design system para garantir consistência.
                                        </Text>
                                    </Box>
                                </VStack>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </ModalBody>

                <ModalFooter borderTop="1px solid rgba(255,255,255,0.1)" bg="rgba(0,0,0,0.2)">
                    <Button
                        as={Link}
                        href={project.html_url}
                        isExternal
                        leftIcon={<FaGithub />}
                        variant="outline"
                        colorScheme="purple"
                        mr={3}
                        _hover={{ textDecoration: 'none', bg: 'rgba(182, 80, 242, 0.1)' }}
                    >
                        Repositório
                    </Button>
                    <Button
                        as={Link}
                        href={project.homepage || project.html_url}
                        isExternal
                        leftIcon={<FaExternalLinkAlt />}
                        bgGradient="linear(to-r, #B650F2, #48307A)"
                        color="white"
                        _hover={{
                            bgGradient: "linear(to-r, #C86BFD, #5A4494)",
                            transform: "translateY(-2px)",
                            boxShadow: "0 5px 15px rgba(182, 80, 242, 0.4)"
                        }}
                        textDecoration="none"
                    >
                        Ver Demo
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default ProjectModal;
