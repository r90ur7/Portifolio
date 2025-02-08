import React, { useEffect, useState } from "react";
import {
    Box,
    Text,
    Link,
    Heading,
    Spinner,
    Flex,
    SimpleGrid,
    Icon,
    Tag,
    TagLabel,
    Tooltip
} from "@chakra-ui/react";
import { FaGithub, FaStar, FaCodeBranch } from "react-icons/fa";
import setupGithubApi from "@/api/setupApi";

const Projects = () => {
    const [repositories, setRepositories] = useState([] as any);
    const [loading, setLoading] = useState(true);

    // Acesse as variáveis de ambiente
    const githubToken = process.env.NEXT_PUBLIC_GITHUB_TOKEN!;
    const githubUsername = process.env.NEXT_PUBLIC_GITHUB_USERNAME!;
    const githubList = process.env.NEXT_PUBLIC_GITHUB_LIST!;




    // Configure a API do GitHub
    const { api } = setupGithubApi(githubToken, githubUsername, githubList);

    useEffect(() => {
        const fetchRepositories = async () => {
            try {
                // Busca os repositórios
                const reposResponse = await api.get(`/users/${githubUsername}/repos`);

                // Filtra os repositórios
                const reposFromList = reposResponse.data.filter((repo: any) =>
                    repo.topics.includes(githubList)
                );

                // Para cada repositório, busca as linguagens
                const reposWithLanguages = await Promise.all(
                    reposFromList.map(async (repo: any) => {
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
            } catch (error) {
                console.error("Erro ao buscar repositórios:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRepositories();
    }, []);

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
        <Box
            maxW="1200px"
            mx="auto"
            py={20}
            px={{ base: 4, md: 8 }}
            id="projects"
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

            {repositories.length > 0 ? (
                <SimpleGrid
                    columns={{ base: 1, md: 2, lg: 3 }}
                    spacing={8}
                >
                    {repositories.map((repo: any) => (
                        <Box
                            key={repo.id}
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
                                            {repo.description || "Projeto desenvolvido com tecnologias modernas"}
                                        </Text>

                                        {/* Tecnologias */}
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

                                        {/* Estatísticas */}
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
                    ))}
                </SimpleGrid>
            ) : (
                <Text textAlign="center" color="gray.400">
                    Nenhum projeto encontrado na lista especificada
                </Text>
            )}
        </Box>
    );
};

export default Projects;