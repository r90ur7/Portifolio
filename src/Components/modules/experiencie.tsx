import { Box, Heading, Text, Flex } from "@chakra-ui/react";
import { FaBriefcase } from "react-icons/fa";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

const ProfessionalExperience = () => {
    const experiences = [
        {
            role: "Desenvolvedor Front-end",
            company: "Ohana Software",
            period: "2023 - 2024",
            description:
                "Construção de aplicações web completas utilizando React, TypeScript, React-query, ChakraUi, zod, React Context e metodologias ágeis (Jira).",
        },
        {
            role: "Desenvolvedor Front-end",
            company: "ImW",
            period: "2023 - 2024",
            description:
                "Desenvolvimento de soluções tecnológicas para gestão regional de uma instituição religiosa de médio porte com Laravel, SQL, PHP e metodologias ágeis (Scrum e Kanban).",
        },
        {
            role: "Desenvolvimento e inovação",
            company: "UGB-Ferp",
            period: "2023 - 2025",
            description:
                "Desenvolvo interfaces para sistemas de gestão escolar com C#, Flutter e Moodle, focando em otimização avançada e garantindo alta performance.",
        },
    ];

    const controls = useAnimation();
    const [ref, inView] = useInView({
        threshold: 0.3,
        triggerOnce: false,
    });

    useEffect(() => {
        if (inView) {
            controls.start("visible");
        } else {
            controls.start("hidden");
        }
    }, [controls, inView]);

    const containerVariants = {
        hidden: { opacity: 0, y: 50, transition: { duration: 0.5 } },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    const itemVariants = (index: any) => ({
        hidden: { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: index * 0.2 } },
    });

    const [flippedCards, setFlippedCards] = useState<boolean[]>(
        new Array(experiences.length).fill(false)
    );

    const toggleFlip = (index: number) => {
        setFlippedCards((prev) => {
            const newFlippedCards = [...prev];
            newFlippedCards[index] = !newFlippedCards[index];
            return newFlippedCards;
        });
    };

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

            <MotionFlex wrap="wrap" justify="center" gap={8}>
                {experiences.map((exp, index) => (
                    <MotionBox
                        key={index}
                        w={{ base: "100%", sm: "300px" }}
                        h="200px"
                        style={{ perspective: "1000px" }}
                        variants={itemVariants(index)}
                        initial="hidden"
                        animate={controls}
                        onClick={() => toggleFlip(index)}
                        cursor="pointer"
                    >
                        <MotionBox
                            position="relative"
                            w="100%"
                            h="100%"
                            style={{ transformStyle: "preserve-3d" }}
                            transition="transform 0.6s"
                            animate={{
                                rotateY: flippedCards[index] ? 180 : 0,
                            }}
                            whileHover={{ rotateY: 180 }}
                        >
                            <MotionBox
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
                            </MotionBox>
                            <MotionBox
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
                            </MotionBox>
                        </MotionBox>
                    </MotionBox>
                ))}
            </MotionFlex>
        </MotionBox>
    );
};

export default ProfessionalExperience;