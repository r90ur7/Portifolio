import { useEffect } from "react";
import { Box, Heading, Text, SimpleGrid, Flex, Icon, Badge, VStack, HStack } from "@chakra-ui/react";
import {
    FaCode,
    FaServer,
    FaMobileAlt,
    FaRocket,
    FaGraduationCap,
    FaBriefcase,
    FaLaptopCode,
    FaStar
} from "react-icons/fa";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

const TimelineItem = ({ icon, year, title, description, delay, isLast = false }: any) => (
    <Flex gap={4} position="relative">
        {/* Linha vertical conectora */}
        {!isLast && (
            <Box
                position="absolute"
                left="20px"
                top="40px"
                bottom="-20px"
                width="2px"
                bgGradient="linear(to-b, #B650F2, rgba(182, 80, 242, 0.1))"
                zIndex={0}
            />
        )}

        {/* Ícone do marco */}
        <Flex
            direction="column"
            align="center"
            zIndex={1}
        >
            <Flex
                align="center"
                justify="center"
                w="40px"
                h="40px"
                borderRadius="full"
                bg="rgba(13, 27, 42, 0.8)"
                border="2px solid"
                borderColor="#B650F2"
                boxShadow="0 0 15px rgba(182, 80, 242, 0.4)"
            >
                <Icon as={icon} color="#B650F2" boxSize={4} />
            </Flex>
        </Flex>

        {/* Conteúdo */}
        <MotionBox
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay }}
            viewport={{ once: true }}
            pb={8}
            flex={1}
        >
            <Flex align="center" mb={1}>
                <Badge
                    colorScheme="purple"
                    variant="solid"
                    bg="rgba(182, 80, 242, 0.2)"
                    color="#C86BFD"
                    border="1px solid"
                    borderColor="rgba(182, 80, 242, 0.4)"
                    px={2}
                    borderRadius="md"
                    mr={3}
                >
                    {year}
                </Badge>
                <Text fontWeight="bold" color="white" fontSize="lg">
                    {title}
                </Text>
            </Flex>
            <Text color="gray.400" fontSize="sm" lineHeight="tall">
                {description}
            </Text>
        </MotionBox>
    </Flex>
);

const SkillBadge = ({ icon, label, color }: any) => (
    <MotionBox
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
    >
        <Badge
            display="flex"
            alignItems="center"
            px={3}
            py={2}
            borderRadius="lg"
            bg="rgba(255, 255, 255, 0.05)"
            backdropFilter="blur(5px)"
            border="1px solid"
            borderColor={`${color}30`}
            color="gray.200"
            textTransform="none"
            fontSize="sm"
            fontWeight="medium"
            transition="all 0.3s ease"
            _hover={{
                bg: `${color}15`,
                borderColor: color,
                boxShadow: `0 0 15px ${color}30`
            }}
            cursor="default"
        >
            <Icon as={icon} color={color} mr={2} boxSize={4} />
            {label}
        </Badge>
    </MotionBox>
);

const About = () => {
    const controls = useAnimation();
    const [ref, inView] = useInView({
        threshold: 0.2,
        triggerOnce: true,
    });

    useEffect(() => {
        if (inView) {
            controls.start("visible");
        }
    }, [controls, inView]);

    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    return (
        <MotionBox
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            maxW="1200px"
            mx="auto"
            py={{ base: 10, md: 20 }}
            px={{ base: 4, md: 8 }}
            id="about"
        >
            {/* Cabeçalho */}
            <Flex direction="column" align="center" mb={{ base: 10, md: 16 }}>
                <Heading
                    as="h1"
                    fontSize={{ base: "3xl", md: "5xl" }}
                    fontWeight="bold"
                    bgGradient="linear(to-r, #B650F2, #C86BFD, #9AA6C4)"
                    bgClip="text"
                    textAlign="center"
                    mb={4}
                    letterSpacing="tight"
                >
                    Minha Jornada & Expertise
                </Heading>
                <Text
                    fontSize={{ base: "md", md: "xl" }}
                    color="gray.400"
                    textAlign="center"
                    maxW="700px"
                >
                    Conectando pontos entre design intuitivo e engenharia robusta para criar experiências digitais memoráveis.
                </Text>
            </Flex>

            <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={{ base: 12, lg: 16 }}>
                {/* Coluna 1: Sobre e Badges */}
                <VStack align="stretch" spacing={8}>
                    <MotionBox
                        p={8}
                        bg="rgba(13, 27, 42, 0.6)"
                        borderRadius="2xl"
                        backdropFilter="blur(20px)"
                        border="1px solid"
                        borderColor="rgba(182, 80, 242, 0.3)"
                        boxShadow="0 8px 32px rgba(0, 0, 0, 0.2)"
                        position="relative"
                        overflow="hidden"
                        _before={{
                            content: '""',
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            height: "2px",
                            background: "linear-gradient(90deg, transparent, #B650F2, transparent)",
                        }}
                    >
                        <Heading fontSize="2xl" color="white" mb={6} display="flex" alignItems="center">
                            <Icon as={FaStar} color="#FFD43B" mr={3} />
                            Quem sou eu
                        </Heading>

                        <Text color="gray.300" fontSize="lg" lineHeight="1.8" mb={6}>
                            Sou um <strong>Engenheiro de Software</strong> apaixonado por transformar problemas complexos em soluções elegantes. Minha abordagem combina a precisão técnica do <strong>Backend (.NET)</strong> com a criatividade interativa do <strong>Frontend (React/Next.js)</strong>.
                        </Text>

                        <Text color="gray.400" fontSize="md" lineHeight="1.8" mb={8}>
                            Não apenas escrevo código; construo produtos digitais que escalam, performam e encantam. Meu foco está em entregar valor real através de arquiteturas limpas e interfaces que os usuários amam usar.
                        </Text>

                        <Heading fontSize="lg" color="white" mb={4}>
                            Especializações Técnicas
                        </Heading>

                        <Flex gap={3} flexWrap="wrap">
                            <SkillBadge icon={FaCode} label="Frontend Architecture" color="#61DAFB" />
                            <SkillBadge icon={FaServer} label="Backend & API Design" color="#B650F2" />
                            <SkillBadge icon={FaMobileAlt} label="Responsive UI/UX" color="#FFD43B" />
                            <SkillBadge icon={FaRocket} label="Performance Optimization" color="#48307A" />
                        </Flex>
                    </MotionBox>
                </VStack>

                {/* Coluna 2: Timeline Visual */}
                <Box>
                    <Heading fontSize="2xl" color="white" mb={8} pl={2}>
                        Timeline Profissional
                    </Heading>

                    <Box pl={2}>
                        <TimelineItem
                            icon={FaGraduationCap}
                            year="2021"
                            title="Início da Jornada"
                            description="Mergulho profundo nos fundamentos da computação e primeiros passos com desenvolvimento web."
                            delay={0.2}
                        />
                        <TimelineItem
                            icon={FaCode}
                            year="2022"
                            title="Desenvolvimento Full Stack"
                            description="Foco intensivo em React e .NET, construindo as primeiras aplicações completas e APIs RESTful."
                            delay={0.4}
                        />
                        <TimelineItem
                            icon={FaBriefcase}
                            year="2023"
                            title="Projetos Profissionais"
                            description="Atuação em projetos reais, implementando arquiteturas escaláveis e focando em Clean Code."
                            delay={0.6}
                        />
                        <TimelineItem
                            icon={FaRocket}
                            year="2024"
                            title="Especialização & Inovação"
                            description="Foco atual em Next.js, arquitetura de microsserviços e interfaces de alta performance."
                            delay={0.8}
                            isLast={true}
                        />
                    </Box>
                </Box>
            </SimpleGrid>
        </MotionBox>
    );
};

export default About;