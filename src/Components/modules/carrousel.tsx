import { Box, Heading, Flex, Text, Icon, Badge, Tabs, TabList, Tab, VStack } from "@chakra-ui/react";
import {
    SiReact, SiNextdotjs, SiTypescript, SiJavascript, SiChakraui, SiTailwindcss,
    SiNodedotjs, SiDotnet, SiSharp, SiPostgresql, SiMongodb,
    SiDocker, SiAmazon, SiGit, SiFigma, SiPostman
} from "react-icons/si";
import { FaCode } from "react-icons/fa";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MotionBox = motion(Box);

// Dados das Skills
const skillsData: { [key: string]: any[] } = {
    "Todos": [], // Será preenchido dinamicamente
    "Frontend": [
        { name: "React", icon: SiReact, color: "#61DAFB", level: 90, proficiency: "Avançado", desc: "Biblioteca para interfaces." },
        { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF", level: 85, proficiency: "Avançado", desc: "Framework React Production-grade." },
        { name: "TypeScript", icon: SiTypescript, color: "#3178C6", level: 85, proficiency: "Avançado", desc: "JS com superpoderes." },
        { name: "Chakra UI", icon: SiChakraui, color: "#319795", level: 95, proficiency: "Especialista", desc: "UI Kit modular e acessível." },
        { name: "Tailwind", icon: SiTailwindcss, color: "#38B2AC", level: 80, proficiency: "Avançado", desc: "CSS utilitário rápido." },
        { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E", level: 90, proficiency: "Avançado", desc: "Linguagem da Web." },
    ],
    "Backend": [
        { name: ".NET Core", icon: SiDotnet, color: "#512BD4", level: 85, proficiency: "Avançado", desc: "Framework cross-platform." },
        { name: "C#", icon: SiSharp, color: "#239120", level: 90, proficiency: "Avançado", desc: "Linguagem robusta e tipada." },
        { name: "Node.js", icon: SiNodedotjs, color: "#339933", level: 80, proficiency: "Intermediário", desc: "JS no servidor." },
        { name: "PostgreSQL", icon: SiPostgresql, color: "#336791", level: 75, proficiency: "Intermediário", desc: "SQL robusto e confiável." },
        { name: "MongoDB", icon: SiMongodb, color: "#47A248", level: 70, proficiency: "Intermediário", desc: "NoSQL flexível." },
    ],
    "DevOps": [
        { name: "Docker", icon: SiDocker, color: "#2496ED", level: 75, proficiency: "Intermediário", desc: "Containers em qualquer lugar." },
        { name: "AWS", icon: SiAmazon, color: "#FF9900", level: 60, proficiency: "Básico", desc: "Cloud Computing." },
        { name: "Git", icon: SiGit, color: "#F05032", level: 90, proficiency: "Avançado", desc: "Versionamento essencial." },
    ],
    "Tools": [
        { name: "VS Code", icon: FaCode, color: "#007ACC", level: 95, proficiency: "Especialista", desc: "Editor favorito." },
        { name: "Figma", icon: SiFigma, color: "#F24E1E", level: 70, proficiency: "Intermediário", desc: "Design e prototipagem." },
        { name: "Postman", icon: SiPostman, color: "#FF6C37", level: 85, proficiency: "Avançado", desc: "Teste de APIs." },
    ]
};

// Preenche a categoria "Todos"
skillsData["Todos"] = [
    ...skillsData["Frontend"],
    ...skillsData["Backend"],
    ...skillsData["DevOps"],
    ...skillsData["Tools"]
];

const SkillCard = ({ skill }: any) => {
    return (
        <Box px={2} py={4} h="full">
            <MotionBox
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                bg="rgba(13, 27, 42, 0.6)"
                borderRadius="2xl"
                border="1px solid"
                borderColor="rgba(182, 80, 242, 0.2)"
                backdropFilter="blur(10px)"
                boxShadow="0 4px 20px rgba(0,0,0,0.2)"
                p={6}
                h="220px" // Altura fixa para uniformidade
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                position="relative"
                overflow="hidden"
                _before={{
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    w: "100%",
                    h: "4px",
                    bg: skill.color,
                    opacity: 0.7
                }}
            >
                <Flex justify="space-between" align="start">
                    <Flex
                        align="center"
                        justify="center"
                        w={14}
                        h={14}
                        borderRadius="xl"
                        bg={`${skill.color}15`}
                        color={skill.color}
                    >
                        <Icon as={skill.icon} boxSize={8} />
                    </Flex>
                    <Badge
                        colorScheme={skill.proficiency === "Especialista" ? "purple" : skill.proficiency === "Avançado" ? "green" : "blue"}
                        variant="solid"
                        fontSize="0.6rem"
                        borderRadius="full"
                        px={2}
                        textTransform="uppercase"
                    >
                        {skill.proficiency}
                    </Badge>
                </Flex>

                <Box>
                    <Text fontWeight="bold" fontSize="xl" color="white" mb={1}>{skill.name}</Text>
                    <Text fontSize="xs" color="gray.400" noOfLines={2} mb={4} minH="32px">
                        {skill.desc}
                    </Text>

                    <VStack align="stretch" spacing={1}>
                        <Flex justify="space-between" fontSize="xs" color="gray.500">
                            <Text>Dominância</Text>
                            <Text>{skill.level}%</Text>
                        </Flex>
                        <Box w="full" h="4px" bg="gray.700" borderRadius="full" overflow="hidden">
                            <Box
                                w={`${skill.level}%`}
                                h="full"
                                bg={skill.color}
                                borderRadius="full"
                                sx={{ transition: "width 1s ease-in-out" }}
                            />
                        </Box>
                    </VStack>
                </Box>
            </MotionBox>
        </Box>
    );
};

const TechnologiesSection = () => {
    const [activeCategory, setActiveCategory] = useState("Todos");
    const controls = useAnimation();
    const [ref, inView] = useInView({
        threshold: 0.2,
        triggerOnce: false,
    });

    useEffect(() => {
        if (inView) {
            controls.start("visible");
        }
    }, [controls, inView]);

    const sliderSettings = {
        dots: true,
        infinite: skillsData[activeCategory].length > 3, // Só faz loop se tiver itens suficientes
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        arrows: false,
        responsive: [
            { breakpoint: 1280, settings: { slidesToShow: 3 } },
            { breakpoint: 900, settings: { slidesToShow: 2 } },
            { breakpoint: 600, settings: { slidesToShow: 1 } }
        ],
        appendDots: (dots: any) => (
            <Box
                position="absolute"
                bottom="-40px"
                w="100%"
                display="flex"
                justifyContent="center"
            >
                <ul style={{ margin: "0px", padding: "0px", display: "flex", gap: "10px" }}> {dots} </ul>
            </Box>
        ),
        customPaging: () => (
            <Box
                w="10px"
                h="10px"
                borderRadius="full"
                bg="gray.600"
                _hover={{ bg: "#B650F2" }}
                className="slick-dot"
                transition="all 0.3s"
            />
        )
    };

    return (
        <Box
            ref={ref}
            maxW="1400px"
            mx="auto"
            py={20}
            px={{ base: 4, md: 8 }}
            id="skills"
            overflow="hidden"
            minH="600px"
        >
            <VStack spacing={10}>
                <VStack spacing={4} textAlign="center">
                    <Heading
                        as="h2"
                        fontSize={{ base: "3xl", md: "5xl" }}
                        fontWeight="bold"
                        bgGradient="linear(to-r, #B650F2, #9AA6C4)"
                        bgClip="text"
                    >
                        Tech Stack
                    </Heading>
                    <Text color="gray.400" fontSize="lg" maxW="600px">
                        Minhas ferramentas de escolha para criar experiências digitais.
                    </Text>
                </VStack>

                {/* Filtros de Categoria */}
                <Tabs
                    variant="soft-rounded"
                    colorScheme="purple"
                    align="center"
                    onChange={(index) => setActiveCategory(Object.keys(skillsData)[index])}
                >
                    <TabList
                        flexWrap="wrap"
                        justifyContent="center"
                        gap={2}
                        bg="rgba(13, 27, 42, 0.4)"
                        p={2}
                        borderRadius="full"
                        display="inline-flex"
                        mb={8}
                    >
                        {Object.keys(skillsData).map((category) => (
                            <Tab
                                key={category}
                                color="gray.400"
                                _selected={{ color: "white", bg: "rgba(182, 80, 242, 0.3)", boxShadow: "0 0 15px rgba(182, 80, 242, 0.2)" }}
                                px={6}
                                transition="all 0.3s"
                            >
                                {category}
                            </Tab>
                        ))}
                    </TabList>
                </Tabs>

                {/* Carrossel de Cards */}
                <Box w="100%" px={{ base: 0, md: 8 }} pb={12}>
                    <motion.div
                        key={activeCategory} // Força re-renderização ao trocar categoria para animar
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Slider {...sliderSettings}>
                            {skillsData[activeCategory].map((skill: any, index: number) => (
                                <SkillCard key={index} skill={skill} />
                            ))}
                        </Slider>
                    </motion.div>
                </Box>
            </VStack>
        </Box>
    );
};

export default TechnologiesSection;