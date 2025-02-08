import { Box, Heading, Text, Flex } from "@chakra-ui/react";
import { FaBriefcase } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProfessionalExperience = () => {
    const experiences = [
        {
            role: "Desenvolvedor Front-end",
            company: "Empresa XYZ",
            period: "2020 - 2022",
            description:
                "Desenvolvimento e manutenção de interfaces web utilizando React, Next.js e Chakra UI, contribuindo para a melhoria da experiência do usuário.",
        },
        {
            role: "Desenvolvedor Full Stack",
            company: "Tech Solutions",
            period: "2022 - 2023",
            description:
                "Construção de aplicações web completas, trabalhando tanto no front-end quanto no back-end com Node.js, Express e MongoDB.",
        },
        {
            role: "Líder de Projetos",
            company: "Inovatech",
            period: "2023 - Atual",
            description:
                "Gerenciamento de equipes e projetos, assegurando entregas de alta qualidade dentro dos prazos, com foco em metodologias ágeis.",
        },
    ];

    return (
        <Box
            maxW="1200px"
            mx="auto"
            py={20}
            px={{ base: 4, md: 8 }}
            id="experience"
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
                Experiência Profissional
            </Heading>

            <Flex wrap="wrap" justify="center" gap={8}>
                {experiences.map((exp, index) => (
                    <Box
                        key={index}
                        w={{ base: "100%", sm: "300px" }}
                        h="200px"
                        style={{ perspective: "1000px" }}
                    >
                        <Box
                            position="relative"
                            w="100%"
                            h="100%"
                            style={{ transformStyle: "preserve-3d" }}
                            transition="transform 0.6s"
                            _hover={{ transform: "rotateY(180deg)" }}
                            cursor="pointer"
                        >
                            {/* Lado da frente do cartão */}
                            <Box
                                position="absolute"
                                w="100%"
                                h="100%"
                                style={{ backfaceVisibility: "hidden" }}
                                bg="rgba(13, 27, 42, 0.8)"
                                borderRadius="2xl"
                                boxShadow="0 8px 32px rgba(0, 0, 0, 0.1)"
                                p={6}
                            >
                                <Flex align="center" mb={4}>
                                    <Box
                                        p={2}
                                        bg="rgba(182, 80, 242, 0.1)"
                                        borderRadius="md"
                                        mr={3}
                                    >
                                        <FaBriefcase size={20} color="#B650F2" />
                                    </Box>
                                    <Text fontWeight="bold" color="white">
                                        {exp.period}
                                    </Text>
                                </Flex>
                                <Heading as="h3" size="md" color="white" mb={2}>
                                    {exp.role}
                                </Heading>
                                <Text color="purple.300" fontSize="sm">
                                    {exp.company}
                                </Text>
                            </Box>
                            <Box
                                position="absolute"
                                w="100%"
                                h="100%"
                                style={{ backfaceVisibility: "hidden" }}
                                bg="rgba(13, 27, 42, 0.9)"
                                borderRadius="2xl"
                                boxShadow="0 8px 32px rgba(0, 0, 0, 0.1)"
                                p={6}
                                transform="rotateY(180deg)"
                            >
                                <Heading as="h3" size="md" color="white" mb={2}>
                                    {exp.role}
                                </Heading>
                                <Text color="gray.300" fontSize="sm">
                                    {exp.description}
                                </Text>
                            </Box>
                        </Box>
                    </Box>
                ))}
            </Flex>
        </Box>
    );
};

export default ProfessionalExperience;
