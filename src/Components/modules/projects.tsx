import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import {
    Box,
    Text,
    Link,
    Heading,
    Spinner,
    Flex,
    Icon,
    Tag,
    TagLabel,
    Tooltip,
    Skeleton,
    Image,
    Button,
    HStack,
    Input,
    InputGroup,
    InputLeftElement,
    useDisclosure,
    Badge,
    Tabs,
    TabList,
    Tab,
    SimpleGrid
} from "@chakra-ui/react";
import { FaGithub, FaStar, FaCodeBranch, FaSearch, FaExternalLinkAlt, FaPlay, FaFire } from "react-icons/fa";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import setupGithubApi from "@/pages/api/setupGithubApi";
import Masonry from 'react-masonry-css';
import projectImages from "@/data/projectImages.json";
import ProjectModal from "./projectModal";

const MotionBox = motion(Box);
const MotionImage = motion(Image);

const Projects = () => {
    const [repositories, setRepositories] = useState([] as any);
    const [filteredRepos, setFilteredRepos] = useState([] as any);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [activeFilter, setActiveFilter] = useState("Todos");
    const [selectedProject, setSelectedProject] = useState(null);

    const { isOpen, onOpen, onClose } = useDisclosure();

    const githubToken = process.env.NEXT_PUBLIC_GITHUB_TOKEN!;
    const githubUsername = process.env.NEXT_PUBLIC_GITHUB_USERNAME!;
    const githubList = process.env.NEXT_PUBLIC_GITHUB_LIST!;

    const { api } = setupGithubApi(githubToken, githubUsername, githubList);

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
        // Dados estáticos apenas do Portfólio
        const portfolioProject = [
            {
                id: 1,
                name: "Portifolio",
                description: "Meu portfólio pessoal moderno e interativo, desenvolvido com Next.js, Chakra UI e Framer Motion. Focado em performance, animações fluidas e experiência do usuário.",
                html_url: "https://github.com/r90ur7/Portifolio",
                topics: ["portfolio", "react", "nextjs", "chakra-ui", "framer-motion"],
                languages: ["TypeScript", "SCSS", "JavaScript"],
                stargazers_count: 10,
                forks_count: 2,
                featureImage: null // Usará o fallbackSrc automático
            }
        ];

        setRepositories(portfolioProject);
        setFilteredRepos(portfolioProject);
        setLoading(false);
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
                    <Heading
                        as="h2"
                        fontSize={{ base: "3xl", md: "5xl" }}
                        fontWeight="bold"
                        bgGradient="linear(to-r, #B650F2, #9AA6C4)"
                        bgClip="text"
                        textAlign="center"
                        mb={8}
                    >
                        Meus Projetos
                    </Heading>

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
                </Flex>

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
                                                <Icon as={FaStar} mr={1} size="xs" /> Featured
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

                {filteredRepos.length === 0 && (
                    <Flex direction="column" align="center" justify="center" py={10}>
                        <Icon as={FaSearch} boxSize={10} color="gray.600" mb={4} />
                        <Text color="gray.400" fontSize="lg">Nenhum projeto encontrado.</Text>
                    </Flex>
                )}
            </Box>

            <ProjectModal
                isOpen={isOpen}
                onClose={onClose}
                project={selectedProject}
            />
        </MotionBox>
    );
};

export default Projects;
