import { Box, Heading, Flex, Text } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { FaGraduationCap } from "react-icons/fa";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

// Crie uma versão "motion" do Box do Chakra
const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
`;

const Education = () => {
    const formations = [
        {
            title: "Bacharelado em Sistemas de Informação",
            institution: "Centro Universitário Geraldo Di Biase",
            period: "2021 - 2025",
            description:
                "Curso superior com foco em análise e desenvolvimento de sistemas, gestão de TI e arquitetura de software.",
        },
        {
            title: "Especialização em Design Centrado no Usuário",
            institution: "PUCRS",
            period: "2025",
            description:
                "Especialização em design centrado no usuário, abordando técnicas avançadas de UX e UI.",
        },
        {
            title: "Programa de Formação de Desenvolvedores M3 Academy",
            institution: "m3Academy (atualmente Cadastra)",
            period: "2023",
            description:
                "Programa intensivo de desenvolvimento front-end com foco em tecnologias modernas e melhores práticas.",
        },
    ];

    // Configuração do Intersection Observer
    const controls = useAnimation();
    const [ref, inView] = useInView({
        threshold: 0.3,
        triggerOnce: false,
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

    // Variants para os itens da formação (agora uma função que recebe index)
    const itemVariants = (index: any) => ({
        hidden: { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: index * 0.2 } },
    });

    return (
        <MotionBox
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={controls}
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
                {/* Linha vertical central animada */}
                <MotionBox
                    position="absolute"
                    top="0"
                    left="50%"
                    transform="translateX(-50%)"
                    width="2px"
                    height="100%"
                    bg="gray.300"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                />

                {formations.map((formation, index) => (
                    <MotionFlex
                        key={index}
                        mb="10"
                        align="center"
                        justify="center"
                        position="relative"
                        variants={itemVariants(index)} // Passa o index para itemVariants
                        initial="hidden"
                        animate={controls}
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
                                    <MotionBox
                                        width="16px"
                                        height="16px"
                                        borderRadius="full"
                                        bg="purple.500"
                                        animation={`${pulse} 2s infinite`}
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                        whileHover={{ scale: 1.2 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                    >
                                        <FaGraduationCap size={10} color="white" />
                                    </MotionBox>
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
                                    <MotionBox
                                        width="16px"
                                        height="16px"
                                        borderRadius="full"
                                        bg="purple.500"
                                        animation={`${pulse} 2s infinite`}
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                        whileHover={{ scale: 1.2 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                    >
                                        <FaGraduationCap size={10} color="white" />
                                    </MotionBox>
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
                    </MotionFlex>
                ))}
            </Box>
        </MotionBox>
    );
};

export default Education;