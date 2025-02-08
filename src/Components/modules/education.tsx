import { Box, Heading, Flex, Text } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { FaGraduationCap } from "react-icons/fa";

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
`;

const Education = () => {
    const formations = [
        {
            title: "Graduação em Sistemas de Informação",
            institution: "Centro Universitário Geraldo Di Biase",
            period: "2021 - 2025",
            description:
                "Formação focada em análise e desenvolvimento de sistemas, com ênfase em gestão de TI e arquitetura de software.",
        },
        {
            title: "MBA em Gestão de Tecnologia da Informação",
            institution: "Pontifícia Universidade Católica",
            period: "2024 - 2025",
            description:
                "Especialização em governança de TI e gestão estratégica de projetos tecnológicos.",
        },
        {
            title: "Certificação em Inteligência Artificial",
            institution: "Deep Learning Institute",
            period: "2023",
            description:
                "Desenvolvimento de modelos de machine learning e implementação de soluções de IA em produção.",
        },
    ];

    return (
        <Box
            maxW="1200px"
            mx="auto"
            py={20}
            px={{ base: 4, md: 8 }}
            id="education"
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
                Formação Acadêmica
            </Heading>

            <Box position="relative" mx="auto" maxW="800px" pb="10">
                {/* Linha vertical central */}
                <Box
                    position="absolute"
                    top="0"
                    left="50%"
                    transform="translateX(-50%)"
                    width="2px"
                    height="100%"
                    bg="gray.300"
                />

                {formations.map((formation, index) => (
                    <Flex
                        key={index}
                        mb="10"
                        align="center"
                        justify="center"
                        position="relative"
                    >
                        {index % 2 === 0 ? (
                            <>
                                {/* Conteúdo à esquerda */}
                                <Box flex="0.45" textAlign="right" pr={4}>
                                    <Text fontWeight="bold" color="white">
                                        {formation.period}
                                    </Text>
                                    <Heading as="h3" size="md" color="white">
                                        {formation.title}
                                    </Heading>
                                    <Text color="purple.300" fontSize="sm">
                                        {formation.institution}
                                    </Text>
                                    <Text color="gray.300" mt={2}>
                                        {formation.description}
                                    </Text>
                                </Box>

                                {/* Marcador central */}
                                <Box flex="0.1" display="flex" alignItems="center" justifyContent="center">
                                    <Box
                                        width="16px"
                                        height="16px"
                                        borderRadius="full"
                                        bg="purple.500"
                                        animation={`${pulse} 2s infinite`}
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                    >
                                        <FaGraduationCap size={10} color="white" />
                                    </Box>
                                </Box>

                                {/* Espaço vazio à direita */}
                                <Box flex="0.45" />
                            </>
                        ) : (
                            <>
                                {/* Espaço vazio à esquerda */}
                                <Box flex="0.45" />

                                {/* Marcador central */}
                                <Box flex="0.1" display="flex" alignItems="center" justifyContent="center">
                                    <Box
                                        width="16px"
                                        height="16px"
                                        borderRadius="full"
                                        bg="purple.500"
                                        animation={`${pulse} 2s infinite`}
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                    >
                                        <FaGraduationCap size={10} color="white" />
                                    </Box>
                                </Box>

                                {/* Conteúdo à direita */}
                                <Box flex="0.45" textAlign="left" pl={4}>
                                    <Text fontWeight="bold" color="white">
                                        {formation.period}
                                    </Text>
                                    <Heading as="h3" size="md" color="white">
                                        {formation.title}
                                    </Heading>
                                    <Text color="purple.300" fontSize="sm">
                                        {formation.institution}
                                    </Text>
                                    <Text color="gray.300" mt={2}>
                                        {formation.description}
                                    </Text>
                                </Box>
                            </>
                        )}
                    </Flex>
                ))}
            </Box>
        </Box>
    );
};

export default Education;