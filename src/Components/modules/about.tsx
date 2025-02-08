import { Box, Heading, Text, SimpleGrid, Flex, Tag, Icon, Button } from "@chakra-ui/react";
import { FaPython, FaDatabase, FaBrain, FaChartLine } from "react-icons/fa";
import Carrousel from "./carrousel";

const About = () => {
    return (
        <Box
            maxW="1200px"
            mx="auto"
            py={20}
            px={{ base: 4, md: 8 }}
            id="about"
        >
            <Flex direction="column" align="center" mb={16}>
                <Heading
                    as="h1"
                    fontSize="4xl"
                    fontWeight="bold"
                    bgGradient="linear(to-r, #B650F2, #9AA6C4)"
                    bgClip="text"
                    textAlign="center"
                    mb={4}
                >
                    Transformando Dados em Insights
                </Heading>
                <Text fontSize="xl" color="gray.400" textAlign="center">
                    Código que resolve problemas reais através da inovação tecnológica
                </Text>
            </Flex>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={12}>
                <Box
                    p={8}
                    bg="rgba(13, 27, 42, 0.7)"
                    borderRadius="2xl"
                    backdropFilter="blur(10px)"
                    boxShadow="0 8px 32px rgba(0, 0, 0, 0.1)"
                    border="1px solid"
                    borderColor="rgba(182, 80, 242, 0.2)"
                >
                    <Text fontSize="lg" color="gray.300" mb={6} lineHeight="tall">
                        Como <strong>Analista de Sistemas Full Stack</strong>, combino expertise técnica em
                        <strong> Python</strong>, <strong>Power BI</strong> e <strong>Business Intelligence</strong> para
                        desenvolver soluções que transformam dados brutos em estratégias acionáveis. Minha jornada inclui:
                    </Text>

                    <Flex direction="column" gap={4}>
                        <Flex align="center">
                            <Icon as={FaChartLine} color="purple.400" mr={3} boxSize={6} />
                            <Text color="gray.200">
                                <strong>+3 anos</strong> implementando sistemas de análise preditiva
                            </Text>
                        </Flex>

                        <Flex align="center">
                            <Icon as={FaDatabase} color="purple.400" mr={3} boxSize={6} />
                            <Text color="gray.200">
                                Arquitetura de <strong>Data Warehouses</strong> otimizados
                            </Text>
                        </Flex>

                        <Flex align="center">
                            <Icon as={FaBrain} color="purple.400" mr={3} boxSize={6} />
                            <Text color="gray.200">
                                Modelos de <strong>Machine Learning</strong> em produção
                            </Text>
                        </Flex>
                    </Flex>
                </Box>

                {/* Coluna de Habilidades */}
                <Box
                    p={8}
                    bg="rgba(13, 27, 42, 0.7)"
                    borderRadius="2xl"
                    backdropFilter="blur(10px)"
                    boxShadow="0 8px 32px rgba(0, 0, 0, 0.1)"
                    border="1px solid"
                    borderColor="rgba(182, 80, 242, 0.2)"
                >
                    <Heading fontSize="2xl" color="white" mb={6}>
                        Pilares da Minha Atuação
                    </Heading>

                    <SimpleGrid columns={2} spacing={4}>
                        {[
                            { icon: FaPython, label: "Automação com Python", color: "#4B8BBE" },
                            { icon: FaDatabase, label: "Engenharia de Dados", color: "#B650F2" },
                            { icon: FaChartLine, label: "Business Intelligence", color: "#9AA6C4" },
                            { icon: FaBrain, label: "IA Aplicada", color: "#FFD43B" },
                        ].map((skill, index) => (
                            <Flex
                                key={index}
                                p={4}
                                bg="rgba(18, 18, 18, 0.5)"
                                borderRadius="lg"
                                align="center"
                                _hover={{
                                    transform: "translateY(-3px)",
                                    boxShadow: "0 4px 12px rgba(182, 80, 242, 0.2)"
                                }}
                                transition="all 0.3s ease"
                            >
                                <Icon
                                    as={skill.icon}
                                    color={skill.color}
                                    boxSize={8}
                                    mr={3}
                                />
                                <Text color="gray.200">{skill.label}</Text>
                            </Flex>
                        ))}
                    </SimpleGrid>

                    <Button
                        mt={8}
                        w="full"
                        bgGradient="linear(to-r, #B650F2, #48307A)"
                        color="white"
                        _hover={{ bgGradient: "linear(to-r, #C86BFD, #5A4494)" }}
                        rightIcon={<FaBrain />}
                    >
                        Ver Especializações
                    </Button>
                </Box>
            </SimpleGrid>
        </Box>
    );
};

export default About;