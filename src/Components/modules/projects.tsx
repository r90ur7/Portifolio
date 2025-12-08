import React, { useEffect, useState } from "react";
import {
    Box,
    Text,
    Heading,
    Spinner,
    Flex,
    Icon,
    Tag,
    Image,
    Button,
    HStack,
    VStack,
    Input,
    InputGroup,
    InputLeftElement,
    useDisclosure,
    Badge,
    Tabs,
    TabList,
    Tab
} from "@chakra-ui/react";
import { FaGithub, FaStar, FaCodeBranch, FaSearch, FaExternalLinkAlt } from "react-icons/fa";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Masonry from 'react-masonry-css';
import ProjectModal from "./projectModal";
import { fetchGitHubProjects } from '@/services/githubApi';

const MotionBox = motion(Box);

const Projects = () => {
    const [repositories, setRepositories] = useState([] as any);
    const [filteredRepos, setFilteredRepos] = useState([] as any);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [activeFilter, setActiveFilter] = useState("Todos");
    const [selectedProject, setSelectedProject] = useState(null);

    const { isOpen, onOpen, onClose } = useDisclosure();

    const controls = useAnimation();
    const [ref, inView] = useInView({
        threshold: 0.1,
        triggerOnce: false,
        rootMargin: "-50px 0px",
    });

    useEffect(() => {
        if (inView) {
            controls.start("visible");
        }
    }, [controls, inView]);

    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
        hover: {
            y: -10,
            scale: 1.02,
            boxShadow: "0 20px 40px rgba(182, 80, 242, 0.2)",
            transition: { duration: 0.3 }
        }
    };

    useEffect(() => {
        const loadProjects = async () => {
            setLoading(true);
            try {
                const projects = await fetchGitHubProjects();
                setRepositories(projects);
                setFilteredRepos(projects);
            } catch (error) {
                console.error('Erro ao carregar projetos:', error);
                // O serviço já retorna fallback data em caso de erro
            } finally {
                setLoading(false);
            }
        };

        loadProjects();
    }, []);

    useEffect(() => {
        let result = repositories;

        // Filter by Search
        if (searchTerm) {
            result = result.filter((repo: any) =>
                repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                repo.description?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Filter by Category
        if (activeFilter !== "Todos") {
            if (activeFilter === "Featured") {
                result = result.filter((repo: any) => repo.stargazers_count > 0 || repo.topics.includes('featured'));
            } else {
                result = result.filter((repo: any) =>
                    repo.languages.some((lang: string) => lang.toLowerCase() === activeFilter.toLowerCase()) ||
                    repo.topics.includes(activeFilter.toLowerCase())
                );
            }
        }

        setFilteredRepos(result);
    }, [searchTerm, activeFilter, repositories]);

    const handleProjectClick = (project: any) => {
        setSelectedProject(project);
        onOpen();
    };

    const filters = ["Todos", "Featured", "React", "TypeScript", "C#"];

    if (loading) {
        return (
            <Flex justify="center" align="center" minH="50vh">
                <Spinner size="xl" color="purple.500" thickness="3px" speed="0.65s" />
            </Flex>
        );
    }

    return (
        <MotionBox
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            py={20}
            px={{ base: 4, md: 8 }}
            id="projects"
            minH="80vh"
        >
            <Box maxW="1200px" mx="auto">
                <Flex direction="column" align="center" mb={12}>
                    <Flex align="center" gap={3} mb={8}>
                        <Heading
                            as="h2"
                            fontSize={{ base: "3xl", md: "5xl" }}
                            fontWeight="bold"
                            bgGradient="linear(to-r, #B650F2, #9AA6C4)"
                            bgClip="text"
                            textAlign="center"
                        >
                            Meus Projetos
                        </Heading>
                        {/* Botão para forçar atualização (modo desenvolvimento) */}
                        {process.env.NODE_ENV === 'development' && (
                            <Button
                                size="xs"
                                variant="ghost"
                                colorScheme="purple"
                                onClick={() => {
                                    localStorage.removeItem('github_projects_cache');
                                    window.location.reload();
                                }}
                                title="Forçar atualização dos projetos (limpa cache)"
                            >
                                🔄
                            </Button>
                        )}
                    </Flex>

                    {/* Featured Projects Section */}
                    {filteredRepos.filter((repo: any) => repo.isFeatured).length > 0 && (
                        <Box mb={16} w="full">
                            <Flex
                                align="center"
                                justify="space-between"
                                mb={8}
                                pb={4}
                                borderBottom="2px solid"
                                borderColor="rgba(182, 80, 242, 0.3)"
                            >
                                <Flex align="center" gap={3}>
                                    <Box
                                        p={2}
                                        borderRadius="lg"
                                        bgGradient="linear(45deg, #B650F2, #C86BFD)"
                                        boxShadow="0 4px 15px rgba(182, 80, 242, 0.4)"
                                    >
                                        <Icon as={FaStar} color="white" boxSize={6} />
                                    </Box>
                                    <Heading
                                        as="h3"
                                        fontSize={{ base: "2xl", md: "3xl" }}
                                        fontWeight="extrabold"
                                        bgGradient="linear(to-r, #B650F2, #9AA6C4)"
                                        bgClip="text"
                                    >
                                        Projetos em Destaque
                                    </Heading>
                                </Flex>
                                <Badge
                                    colorScheme="purple"
                                    fontSize="sm"
                                    px={3}
                                    py={1}
                                    borderRadius="full"
                                >
                                    {filteredRepos.filter((repo: any) => repo.isFeatured).length} projetos
                                </Badge>
                            </Flex>

                            {/* Masonry Grid para Projetos em Destaque */}
                            <Masonry
                                breakpointCols={{
                                    default: 2,
                                    1100: 1
                                }}
                                className="masonry-grid"
                                columnClassName="masonry-grid_column"
                                style={{ width: '100%' }}
                            >
                                {filteredRepos
                                    .filter((repo: any) => repo.isFeatured)
                                    .map((repo: any, index: number) => (
                                        <MotionBox
                                            key={`featured-${repo.id}`}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5, delay: index * 0.1 }}
                                            whileHover={{ y: -8 }}
                                            cursor="pointer"
                                            onClick={() => handleProjectClick(repo)}
                                            mb={6}
                                        >
                                            <Box
                                                position="relative"
                                                bg="rgba(13, 27, 42, 0.6)"
                                                borderRadius="2xl"
                                                overflow="hidden"
                                                border="1px solid rgba(182, 80, 242, 0.3)"
                                                transition="all 0.3s"
                                                h="full"
                                                _hover={{
                                                    borderColor: "#B650F2",
                                                    boxShadow: "0 20px 60px rgba(182, 80, 242, 0.3)"
                                                }}
                                            >
                                                {/* Gradiente animado de fundo */}
                                                <Box
                                                    position="absolute"
                                                    top={0}
                                                    left={0}
                                                    right={0}
                                                    bottom={0}
                                                    bgGradient="linear(135deg, rgba(182, 80, 242, 0.1), transparent)"
                                                    opacity={0}
                                                    transition="opacity 0.3s"
                                                    _groupHover={{ opacity: 1 }}
                                                    pointerEvents="none"
                                                />

                                                {/* Imagem */}
                                                <Box
                                                    position="relative"
                                                    h="280px"
                                                    overflow="hidden"
                                                >
                                                    {/* Badge Destaque */}
                                                    <Badge
                                                        position="absolute"
                                                        top={4}
                                                        left={4}
                                                        colorScheme="yellow"
                                                        variant="solid"
                                                        borderRadius="full"
                                                        px={3}
                                                        py={1}
                                                        fontSize="xs"
                                                        fontWeight="bold"
                                                        zIndex={3}
                                                        display="flex"
                                                        alignItems="center"
                                                        gap={1}
                                                        boxShadow="0 4px 12px rgba(0,0,0,0.3)"
                                                    >
                                                        <Icon as={FaStar} boxSize={3} />
                                                        DESTAQUE
                                                    </Badge>

                                                    <Image
                                                        src={repo.featureImage}
                                                        alt={repo.name}
                                                        w="100%"
                                                        h="100%"
                                                        objectFit="cover"
                                                        transition="transform 0.5s"
                                                        _groupHover={{ transform: "scale(1.1)" }}
                                                        fallbackSrc={`/api/og?repo=${encodeURIComponent(repo.name)}&desc=${encodeURIComponent(repo.description || '')}`}
                                                    />

                                                    {/* Overlay gradiente */}
                                                    <Box
                                                        position="absolute"
                                                        inset={0}
                                                        bgGradient="linear(to-b, transparent, rgba(13, 27, 42, 0.9))"
                                                    />
                                                </Box>

                                                {/* Conteúdo */}
                                                <Box p={6} position="relative" zIndex={1}>
                                                    <Heading
                                                        size="lg"
                                                        color="white"
                                                        mb={3}
                                                        fontWeight="bold"
                                                        display="flex"
                                                        alignItems="center"
                                                        gap={2}
                                                    >
                                                        {repo.name}
                                                        <Icon
                                                            as={FaExternalLinkAlt}
                                                            boxSize={4}
                                                            color="purple.400"
                                                            opacity={0}
                                                            transition="opacity 0.3s"
                                                            _groupHover={{ opacity: 1 }}
                                                        />
                                                    </Heading>

                                                    <Text
                                                        color="gray.300"
                                                        fontSize="md"
                                                        mb={4}
                                                        lineHeight="tall"
                                                        noOfLines={3}
                                                    >
                                                        {repo.description}
                                                    </Text>

                                                    <Flex wrap="wrap" gap={2} mb={4}>
                                                        {repo.languages.slice(0, 4).map((lang: string) => (
                                                            <Tag
                                                                key={lang}
                                                                size="sm"
                                                                variant="solid"
                                                                bg="rgba(182, 80, 242, 0.15)"
                                                                color="#C86BFD"
                                                                borderRadius="full"
                                                                px={3}
                                                                py={1}
                                                                fontWeight="semibold"
                                                                border="1px solid rgba(182, 80, 242, 0.3)"
                                                            >
                                                                {lang}
                                                            </Tag>
                                                        ))}
                                                    </Flex>

                                                    <Flex justify="space-between" align="center" pt={4} borderTop="1px solid rgba(255,255,255,0.1)">
                                                        <HStack color="gray.400" spacing={4} fontSize="sm">
                                                            <Flex align="center" gap={1}>
                                                                <Icon as={FaStar} color="#B650F2" />
                                                                <Text fontWeight="semibold">{repo.stargazers_count}</Text>
                                                            </Flex>
                                                            <Flex align="center" gap={1}>
                                                                <Icon as={FaCodeBranch} color="#B650F2" />
                                                                <Text fontWeight="semibold">{repo.forks_count}</Text>
                                                            </Flex>
                                                        </HStack>

                                                        <Button
                                                            rightIcon={<FaExternalLinkAlt />}
                                                            variant="ghost"
                                                            color="purple.400"
                                                            size="sm"
                                                            fontSize="xs"
                                                        >
                                                            Ver Mais
                                                        </Button>
                                                    </Flex>
                                                </Box>
                                            </Box>
                                        </MotionBox>
                                    ))}
                            </Masonry>
                        </Box>
                    )}

                    {/* Search and Filter Bar */}
                    <Flex
                        w="full"
                        maxW="800px"
                        direction={{ base: "column", md: "row" }}
                        gap={4}
                        align="center"
                        bg="rgba(13, 27, 42, 0.6)"
                        p={4}
                        borderRadius="2xl"
                        backdropFilter="blur(10px)"
                        border="1px solid rgba(182, 80, 242, 0.2)"
                    >
                        <InputGroup maxW={{ base: "full", md: "300px" }}>
                            <InputLeftElement pointerEvents="none">
                                <Icon as={FaSearch} color="gray.400" />
                            </InputLeftElement>
                            <Input
                                placeholder="Buscar projetos..."
                                variant="filled"
                                bg="rgba(0,0,0,0.2)"
                                _hover={{ bg: "rgba(0,0,0,0.3)" }}
                                _focus={{ bg: "rgba(0,0,0,0.3)", borderColor: "#B650F2" }}
                                color="white"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                borderRadius="xl"
                            />
                        </InputGroup>

                        <Tabs
                            variant="soft-rounded"
                            colorScheme="purple"
                            onChange={(index) => setActiveFilter(filters[index])}
                            isLazy
                        >
                            <TabList overflowX="auto" py={1} sx={{
                                '&::-webkit-scrollbar': { display: 'none' },
                                scrollbarWidth: 'none'
                            }}>
                                {filters.map((filter) => (
                                    <Tab
                                        key={filter}
                                        color="gray.400"
                                        _selected={{ color: "white", bg: "rgba(182, 80, 242, 0.3)" }}
                                        whiteSpace="nowrap"
                                    >
                                        {filter}
                                    </Tab>
                                ))}
                            </TabList>
                        </Tabs>
                    </Flex>
                </Flex >

                <AnimatePresence>
                    <Masonry
                        breakpointCols={{
                            default: 3,
                            1100: 2,
                            700: 1
                        }}
                        className="masonry-grid"
                        columnClassName="masonry-grid_column"
                        style={{ width: '100%' }}
                    >
                        {filteredRepos.map((repo: any) => (
                            <MotionBox
                                key={repo.id}
                                layoutId={repo.id}
                                variants={itemVariants}
                                initial="hidden"
                                animate="visible"
                                whileHover="hover"
                                mb={8}
                                cursor="pointer"
                                onClick={() => handleProjectClick(repo)}
                            >
                                <Box
                                    position="relative"
                                    bg="rgba(13, 27, 42, 0.8)"
                                    borderRadius="2xl"
                                    overflow="hidden"
                                    border="1px solid"
                                    borderColor="rgba(182, 80, 242, 0.2)"
                                    _before={{
                                        content: '""',
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        height: "4px",
                                        bgGradient: "linear(to-r, #B650F2, #48307A)",
                                        opacity: 0,
                                        transition: "opacity 0.3s"
                                    }}
                                    _hover={{
                                        borderColor: "#B650F2",
                                        _before: { opacity: 1 }
                                    }}
                                >
                                    {/* Image Container */}
                                    <Box position="relative" h="200px" overflow="hidden">
                                        <Image
                                            src={repo.featureImage}
                                            alt={repo.name}
                                            w="100%"
                                            h="100%"
                                            objectFit="cover"
                                            transition="transform 0.5s"
                                            _groupHover={{ transform: "scale(1.1)" }}
                                            fallbackSrc={`/api/og?repo=${encodeURIComponent(repo.name)}&desc=${encodeURIComponent(repo.description || '')}`}
                                        />
                                        <Box
                                            position="absolute"
                                            inset={0}
                                            bg="blackAlpha.600"
                                            opacity={0}
                                            transition="opacity 0.3s"
                                            _groupHover={{ opacity: 1 }}
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="center"
                                        >
                                            <Button
                                                leftIcon={<FaExternalLinkAlt />}
                                                variant="solid"
                                                colorScheme="purple"
                                                size="sm"
                                                borderRadius="full"
                                            >
                                                Ver Detalhes
                                            </Button>
                                        </Box>

                                        {/* Featured Badge */}
                                        {(repo.stargazers_count > 0 || repo.topics.includes('featured')) && (
                                            <Badge
                                                position="absolute"
                                                top={3}
                                                right={3}
                                                colorScheme="yellow"
                                                variant="solid"
                                                borderRadius="full"
                                                px={2}
                                                display="flex"
                                                alignItems="center"
                                                boxShadow="0 2px 10px rgba(0,0,0,0.3)"
                                            >
                                                <Icon as={FaStar} mr={1} boxSize={3} /> Featured
                                            </Badge>
                                        )}
                                    </Box>

                                    {/* Content */}
                                    <Box p={6}>
                                        <Heading size="md" color="white" mb={2} noOfLines={1}>
                                            {repo.name}
                                        </Heading>
                                        <Text color="gray.400" fontSize="sm" mb={4} noOfLines={2}>
                                            {repo.description}
                                        </Text>

                                        <Flex wrap="wrap" gap={2} mb={4}>
                                            {repo.languages.slice(0, 3).map((lang: string) => (
                                                <Tag
                                                    key={lang}
                                                    size="sm"
                                                    variant="subtle"
                                                    colorScheme="purple"
                                                    bg="rgba(182, 80, 242, 0.15)"
                                                >
                                                    {lang}
                                                </Tag>
                                            ))}
                                        </Flex>

                                        <Flex justify="space-between" align="center" pt={4} borderTop="1px solid rgba(255,255,255,0.1)">
                                            <HStack color="gray.500" spacing={4} fontSize="sm">
                                                <Flex align="center">
                                                    <Icon as={FaStar} mr={1} /> {repo.stargazers_count}
                                                </Flex>
                                                <Flex align="center">
                                                    <Icon as={FaCodeBranch} mr={1} /> {repo.forks_count}
                                                </Flex>
                                            </HStack>
                                            <Icon as={FaGithub} color="gray.500" boxSize={5} />
                                        </Flex>
                                    </Box>
                                </Box>
                            </MotionBox>
                        ))}
                    </Masonry>
                </AnimatePresence>

                {
                    filteredRepos.length === 0 && (
                        <Flex direction="column" align="center" justify="center" py={10}>
                            <Icon as={FaSearch} boxSize={10} color="gray.600" mb={4} />
                            <Text color="gray.400" fontSize="lg">Nenhum projeto encontrado.</Text>
                        </Flex>
                    )
                }
            </Box >

            <ProjectModal
                isOpen={isOpen}
                onClose={onClose}
                project={selectedProject}
            />
        </MotionBox >
    );
};

export default Projects;
