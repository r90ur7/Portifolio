import { Box, Flex, Text, VStack } from "@chakra-ui/react";

const Timeline = () => {
    const experiences = [
        {
            year: "2020",
            title: "Desenvolvedor Frontend",
            company: "Empresa ABC",
            description: "Desenvolvimento de interfaces utilizando React e Next.js.",
        },
        {
            year: "2021",
            title: "Engenheiro de Software",
            company: "Empresa XYZ",
            description: "Liderança em projetos de aplicativos web e mobile.",
        },
        {
            year: "2022",
            title: "Especialista em UI/UX",
            company: "Startup 123",
            description: "Foco na experiência do usuário e design acessível.",
        },
        {
            year: "2023",
            title: "Desenvolvedor Full Stack",
            company: "Tech Solutions",
            description:
                "Atuação em projetos com backend em Node.js e frontend em React.",
        },
    ];

    return (
        <VStack align="stretch" spacing={8} w="full" mb={10}>
            {experiences.map((exp, index) => (
                <Flex key={index} align="flex-start" position="relative">
                    {/* Linha de Conexão */}
                    <Box
                        position="absolute"
                        top="0"
                        left="10px"
                        height="100%"
                        width="2px"
                        bg="purple.500"
                        zIndex={-1}
                    />
                    {/* Ponto */}
                    <Box
                        w="20px"
                        h="20px"
                        bg="purple.500"
                        borderRadius="full"
                        position="relative"
                    />
                    {/* Conteúdo */}
                    <Box ml={6}>
                        <Text fontWeight="bold" fontSize="lg" color="purple.500">
                            {exp.year}
                        </Text>
                        <Text fontWeight="semibold">{exp.title}</Text>
                        <Text fontSize="sm" color="gray.500">
                            {exp.company}
                        </Text>
                        <Text mt={2}>{exp.description}</Text>
                    </Box>
                </Flex>
            ))}
        </VStack>
    );
};

export default Timeline;