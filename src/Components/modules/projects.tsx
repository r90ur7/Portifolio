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
    HStack
} from "@chakra-ui/react";
import { FaGithub, FaStar, FaCodeBranch } from "react-icons/fa";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import setupGithubApi from "@/pages/api/setupGithubApi";
import Masonry from 'react-masonry-css';
import projectImages from "@/data/projectImages.json";

const MotionBox = motion(Box);

const Projects = () => {
    const [repositories, setRepositories] = useState([] as any);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
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
    const [pageTrigger, setPageTrigger] = useState(0);

    useEffect(() => {
        if (inView) {
            controls.start("visible");
        } else {
            controls.start("hidden");
        }
    }, [controls, inView, pageTrigger]);

    const containerVariants = {
        hidden: { opacity: 0, y: 50, transition: { duration: 0.5 } },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    const itemVariants = (index: number) => ({
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: index * 0.2 } },
    });

    useEffect(() => {
        const fetchRepositories = async () => {
            try {
                const reposResponse = await api.get(`/users/${githubUsername}/repos`);
                console.log('Total repos from GitHub:', reposResponse.data.length);
                console.log('Looking for topic:', githubList);

                const reposFromList = reposResponse.data.filter((repo: any) => {
                    console.log(`Repo: ${repo.name}, topics:`, repo.topics);
                    return repo.topics.includes(githubList) || repo.topics.includes('new');
                });
                console.log('Filtered repos with topic:', reposFromList.length);

                reposFromList.sort((a: any, b: any) => {
                    const aHasNew = a.topics.includes('new');
                    const bHasNew = b.topics.includes('new');

                    if (aHasNew && !bHasNew) return -1;
                    if (!aHasNew && bHasNew) return 1;
                    return 0;
                });

                const postsWithImages = reposFromList.map((repo: any) => {
                    console.log('Repo name:', repo.name);
                    const match = projectImages.projects.find((img: any) => img.projectName === repo.name);
                    if (match) {
                        console.log('Match found:', match);
                        repo.featureImage = match.imageURL;
                    } else {
                        console.log('No match for:', repo.name);
                    }
                    return repo;
                });

                const reposWithLanguages = await Promise.all(
                    postsWithImages.map(async (repo: any) => {
                        const languagesResponse = await api.get(repo.languages_url);
                        const languages = Object.entries(languagesResponse.data)
                            .sort((a: any, b: any) => b[1] - a[1])
                            .slice(0, 3)
                            .map(([language]) => language);

                        return {
                            ...repo,
                            languages
                        };
                    })
                );

                setRepositories(reposWithLanguages);
                Cookies.set('portfolio_github_projects_cached', JSON.stringify(reposWithLanguages), { expires: 2 / 24 });
            } catch (error) {
                console.error("Erro ao buscar repositórios:", error);
            } finally {
                setLoading(false);
            }
        };
        const cachedRepos = Cookies.get('portfolio_github_projects_cached');
        if (cachedRepos) {
            setRepositories(JSON.parse(cachedRepos));
            setLoading(false);
        } else {
            fetchRepositories();
        }
    }, [api, githubList, githubUsername]);

    const totalPages = Math.ceil(repositories.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentRepositories = repositories.slice(startIndex, endIndex);

    const goToPage = (page: number) => {
        setCurrentPage(page);
        controls.set("hidden");
        setPageTrigger(prev => prev + 1);
    };

    if (loading) {
        return (
            <Flex justify="center" align="center" minH="50vh">
                <Spinner
                    size="xl"
                    color="purple.500"
                    thickness="3px"
                    speed="0.65s"
                />
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
            <Heading
                as="h2"
                fontSize="4xl"
                fontWeight="bold"
                bgGradient="linear(to-r, #B650F2, #9AA6C4)"
                bgClip="text"
                textAlign="center"
                mb={16}
            >
                Meus Projetos
            </Heading>
            <Box maxW="1200px" mx="auto">
                {repositories.length > 0 ? (
                    <>
                        <Masonry
                            breakpointCols={{
                                default: 3,
                                1200: 3,
                                900: 2,
                                600: 1
                            }}
                            className="masonry-grid"
                            columnClassName="masonry-grid_column"
                            style={{ width: '100%' }}
                        >
                            {currentRepositories.map((repo: any, index: number) => (
                                <MotionBox
                                    key={repo.id}
                                    variants={itemVariants(index)}
                                    initial="hidden"
                                    animate={controls}
                                    style={{ width: '100%', marginBottom: 32 }}
                                >
                                    <Box
                                        position="relative"
                                        p={6}
                                        bg="rgba(13, 27, 42, 0.7)"
                                        borderRadius="2xl"
                                        backdropFilter="blur(10px)"
                                        boxShadow="0 8px 32px rgba(0, 0, 0, 0.1)"
                                        _hover={{
                                            transform: "translateY(-5px)",
                                            boxShadow: "0 12px 40px rgba(182, 80, 242, 0.2)"
                                        }}
                                        transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                                    >
                                        <Box mb={4} w="100%" maxW="480px" mx="auto" display="flex" alignItems="center" justifyContent="center" minH="260px" minW="320px">
                                            <Link href={repo.homepage || repo.html_url} isExternal>
                                                <Skeleton isLoaded>
                                                    <Image
                                                        src={repo.featureImage}
                                                        alt={repo.name}
                                                        borderRadius="lg"
                                                        objectFit="contain"
                                                        w="100%"
                                                        minW="320px"
                                                        maxW="480px"
                                                        h="260px"
                                                        minH="200px"
                                                        maxH="320px"
                                                        display="block"
                                                        mx="auto"
                                                        my="auto"
                                                        fallbackSrc={`/api/og?repo=${encodeURIComponent(repo.name)}&desc=${encodeURIComponent(repo.description || '')}&author=${githubUsername}`}
                                                    />
                                                </Skeleton>
                                            </Link>
                                        </Box>

                                        <Box
                                            _before={{
                                                content: '""',
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                right: 0,
                                                bottom: 0,
                                                borderRadius: '2xl',
                                                border: '1px solid',
                                                borderColor: 'rgba(182, 80, 242, 0.3)',
                                                zIndex: -1
                                            }}
                                        >
                                            <Link href={repo.html_url} isExternal _hover={{ textDecoration: "none" }}>
                                                <Flex direction="column" h="full">
                                                    <Flex align="center" mb={4}>
                                                        <Icon as={FaGithub} boxSize={6} color="purple.400" mr={3} />
                                                        <Text
                                                            fontWeight="bold"
                                                            fontSize="xl"
                                                            bgGradient="linear(to-r, #B650F2, #9AA6C4)"
                                                            bgClip="text"
                                                        >
                                                            {repo.name}
                                                        </Text>
                                                    </Flex>

                                                    <Text color="gray.300" flex={1} mb={6}>
                                                        {repo.description || ""}
                                                    </Text>
                                                    <Flex wrap="wrap" gap={2} mb={6}>
                                                        {repo.languages.map((language: string) => (
                                                            <Tooltip key={language} label={language} hasArrow>
                                                                <Tag
                                                                    size="md"
                                                                    variant="subtle"
                                                                    colorScheme="purple"
                                                                    borderRadius="full"
                                                                    bg="rgba(182, 80, 242, 0.1)"
                                                                >
                                                                    <TagLabel>{language}</TagLabel>
                                                                </Tag>
                                                            </Tooltip>
                                                        ))}
                                                    </Flex>
                                                    <Flex justify="space-between" color="gray.400">
                                                        <Flex align="center">
                                                            <Icon as={FaStar} mr={2} />
                                                            <Text>{repo.stargazers_count}</Text>
                                                        </Flex>
                                                        <Flex align="center">
                                                            <Icon as={FaCodeBranch} mr={2} />
                                                            <Text>{repo.forks_count}</Text>
                                                        </Flex>
                                                    </Flex>
                                                </Flex>
                                            </Link>
                                        </Box>
                                    </Box>
                                </MotionBox>
                            ))}
                        </Masonry>

                        {/* Controles de Paginação - sempre visíveis */}
                        <Flex justify="center" align="center" mt={12} gap={2}>
                            <Button
                                onClick={() => goToPage(currentPage - 1)}
                                disabled={currentPage === 1}
                                variant="outline"
                                colorScheme="purple"
                                size="sm"
                            >
                                Anterior
                            </Button>

                            <HStack spacing={1}>
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                    <Button
                                        key={page}
                                        onClick={() => goToPage(page)}
                                        variant={currentPage === page ? "solid" : "outline"}
                                        colorScheme="purple"
                                        size="sm"
                                        minW="40px"
                                    >
                                        {page}
                                    </Button>
                                ))}
                            </HStack>

                            <Button
                                onClick={() => goToPage(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                variant="outline"
                                colorScheme="purple"
                                size="sm"
                            >
                                Próximo
                            </Button>
                        </Flex>
                    </>
                ) : (
                    <Text textAlign="center" color="gray.400">
                        Nenhum projeto encontrado na lista especificada.
                    </Text>
                )}
            </Box>
        </MotionBox>
    );
};

export default Projects;
