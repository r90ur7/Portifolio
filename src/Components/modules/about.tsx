import { useEffect } from "react";
import { Box, Heading, Text, SimpleGrid, Flex, Icon, Button } from "@chakra-ui/react";
import {
    FaDatabase,
    FaBrain,
    FaChartLine,
    FaReact,
    FaUserFriends,
} from "react-icons/fa";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

// Crie uma versão "motion" do Box do Chakra
const MotionBox = motion(Box);

const About = () => {
    // Configuração do Intersection Observer
    const controls = useAnimation();
    const [ref, inView] = useInView({
        threshold: 0.3,      // Quando 30% do elemento estiver visível
        triggerOnce: false,  // Permite que a animação ocorra repetidamente
    });

    // Atualiza a animação conforme o elemento entra ou sai da viewport
    useEffect(() => {
        if (inView) {
            controls.start("visible");
        } else {
            controls.start("hidden");
        }
    }, [controls, inView]);

    // Definição dos "variants" para o container principal
    const containerVariants = {
        hidden: { opacity: 0, y: 50, transition: { duration: 0.5 } },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    return (
        <MotionBox
            ref={ref} // Atribua o ref para o Intersection Observer
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            maxW="1200px"
            mx="auto"
            py={{ base: 10, md: 20 }}
            px={{ base: 4, md: 8 }}
            id="about"
        >
            {/* Cabeçalho da seção */}
            <Flex direction="column" align="center" mb={{ base: 8, md: 16 }}>
                <Heading
                    as="h1"
                    fontSize={{ base: "2xl", md: "4xl" }}
                    fontWeight="bold"
                    bgGradient="linear(to-r, #B650F2, #9AA6C4)"
                    bgClip="text"
                    textAlign="center"
                    mb={4}
                >
                    Transformando Visões em Interfaces que Conectam
                </Heading>
                <Text fontSize={{ base: "md", md: "xl" }} color="gray.400" textAlign="center">
                    Soluções que resolvem problemas reais através da inovação tecnológica
                </Text>
            </Flex>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 8, md: 12 }}>
                {/* Coluna com informações do desenvolvedor */}
                <MotionBox
                    p={{ base: 6, md: 8 }}
                    bg="rgba(13, 27, 42, 0.7)"
                    borderRadius="2xl"
                    backdropFilter="blur(10px)"
                    boxShadow="0 8px 32px rgba(0, 0, 0, 0.1)"
                    border="1px solid"
                    borderColor="rgba(182, 80, 242, 0.2)"
                >
                    <Text fontSize={{ base: "md", md: "lg" }} color="gray.300" mb={6} lineHeight="tall">
                        Como <strong>Desenvolvedor Full Stack</strong>, combino expertise técnica em{" "}
                        <strong>React</strong>, <strong>Ts</strong>, <strong>Next.js</strong> e{" "}
                        <strong>C#</strong> para desenvolver soluções que transformam ideias em
                        interfaces modernas e funcionais. Minha jornada inclui:
                    </Text>

                    <Flex direction="column" gap={4}>
                        <Flex align="center">
                            <Icon as={FaChartLine} color="purple.400" mr={3} boxSize={6} />
                            <Text fontSize={{ base: "sm", md: "md" }} color="gray.200">
                                Integração Full Stack com <strong>Experiência em C# (.NET) para desenvolvimento de APIs robustas</strong>, ágeis e escaláveis
                            </Text>
                        </Flex>

                        <Flex align="center">
                            <Icon as={FaDatabase} color="purple.400" mr={3} boxSize={6} />
                            <Text fontSize={{ base: "sm", md: "md" }} color="gray.200">
                                <strong>2 anos</strong> implementando segurança de páginas via API Server-Side e gerenciamento de contexto
                            </Text>
                        </Flex>

                        <Flex align="center">
                            <Icon as={FaBrain} color="purple.400" mr={3} boxSize={6} />
                            <Text fontSize={{ base: "sm", md: "md" }} color="gray.200">
                                Modelos de <strong>chatbots e e-commerce</strong> em produção
                            </Text>
                        </Flex>
                    </Flex>
                </MotionBox>

                {/* Coluna dos Pilares */}
                <MotionBox
                    p={{ base: 6, md: 8 }}
                    bg="rgba(13, 27, 42, 0.7)"
                    borderRadius="2xl"
                    backdropFilter="blur(10px)"
                    boxShadow="0 8px 32px rgba(0, 0, 0, 0.1)"
                    border="1px solid"
                    borderColor="rgba(182, 80, 242, 0.2)"
                >
                    <Heading fontSize={{ base: "xl", md: "2xl" }} color="white" mb={6}>
                        Pilares da Minha Atuação
                    </Heading>

                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                        {[
                            { icon: FaReact, label: "Desenvolvimento Moderno", color: "#4B8BBE" },
                            { icon: FaDatabase, label: "Integração Continua", color: "#B650F2" },
                            { icon: FaUserFriends, label: "Experiência do Usuário (UX)", color: "#9AA6C4" },
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
                                    boxShadow: "0 4px 12px rgba(182, 80, 242, 0.2)",
                                }}
                                transition="all 0.3s ease"
                            >
                                <Icon as={skill.icon} color={skill.color} boxSize={{ base: 6, md: 8 }} mr={3} />
                                <Text fontSize={{ base: "sm", md: "md" }} color="gray.200">
                                    {skill.label}
                                </Text>
                            </Flex>
                        ))}
                    </SimpleGrid>

                    <Box mt={8}>
                        <Button
                            w="full"
                            bgGradient="linear(to-r, #B650F2, #48307A)"
                            color="white"
                            _hover={{ bgGradient: "linear(to-r, #C86BFD, #5A4494)" }}
                            rightIcon={<FaBrain />}
                            size={{ base: "md", md: "lg" }}
                        >
                            Ver Especializações
                        </Button>
                    </Box>
                </MotionBox>
            </SimpleGrid>
        </MotionBox>
    );
};

export default About;