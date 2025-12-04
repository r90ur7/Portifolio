import { Box, Heading, Text, SimpleGrid, VStack, Icon } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React, { useState, useEffect, useRef } from "react";
import { FaLaptopCode, FaPalette, FaBrain, FaRocket } from "react-icons/fa";

const MotionBox = motion(Box);

interface StatCardProps {
    icon: any;
    value: number;
    label: string;
    suffix?: string;
    color: string;
    delay: number;
}

const StatCard: React.FC<StatCardProps> = ({ icon, value, label, suffix = "", color, delay }) => {
    const [count, setCount] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.3 }
        );

        const currentRef = cardRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, []);

    useEffect(() => {
        if (isVisible) {
            let start = 0;
            const duration = 2000; // 2 segundos
            const increment = value / (duration / 16); // 60fps

            const timer = setInterval(() => {
                start += increment;
                if (start >= value) {
                    setCount(value);
                    clearInterval(timer);
                } else {
                    setCount(Math.floor(start));
                }
            }, 16);

            return () => clearInterval(timer);
        }
    }, [isVisible, value]);

    return (
        <MotionBox
            ref={cardRef}
            position="relative"
            p={8}
            borderRadius="2xl"
            bg="rgba(13, 27, 42, 0.3)"
            backdropFilter="blur(30px) saturate(200%)"
            border="2px solid"
            borderColor={`${color}40`}
            boxShadow={`0 8px 32px ${color}30, inset 0 1px 0 rgba(255, 255, 255, 0.1)`}
            overflow="hidden"
            initial={{ opacity: 0, y: 50 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay }}
            whileHover={{
                scale: 1.05,
                rotateY: 5,
                boxShadow: `0 12px 48px ${color}50, inset 0 1px 0 rgba(255, 255, 255, 0.2)`
            }}
            _before={{
                content: '""',
                position: "absolute",
                top: 0,
                left: "-100%",
                width: "100%",
                height: "100%",
                background: `linear-gradient(90deg, transparent, ${color}30, transparent)`,
                transition: "left 0.6s ease",
            }}
            _hover={{
                borderColor: color,
                _before: {
                    left: "100%"
                }
            }}
            cursor="pointer"
        >
            {/* Ícone com gradiente */}
            <VStack spacing={4} align="center">
                <Box
                    p={4}
                    borderRadius="xl"
                    bg={`${color}20`}
                    boxShadow={`0 4px 20px ${color}40`}
                >
                    <Icon
                        as={icon}
                        boxSize={12}
                        color={color}
                        filter="drop-shadow(0 0 10px currentColor)"
                    />
                </Box>

                {/* Contador animado */}
                <Text
                    fontSize="5xl"
                    fontWeight="bold"
                    bgGradient={`linear(to-r, ${color}, ${color}DD)`}
                    bgClip="text"
                    textShadow={`0 0 30px ${color}50`}
                    fontFamily="'Inter', sans-serif"
                >
                    {count}{suffix}
                </Text>

                {/* Label */}
                <Text
                    fontSize="lg"
                    color="gray.400"
                    fontWeight="medium"
                    textAlign="center"
                    letterSpacing="wide"
                >
                    {label}
                </Text>
            </VStack>

            {/* Efeito de brilho no canto */}
            <Box
                position="absolute"
                top="-50%"
                right="-50%"
                width="100%"
                height="100%"
                bg={`radial-gradient(circle, ${color}20, transparent 70%)`}
                pointerEvents="none"
                opacity={0.5}
            />
        </MotionBox>
    );
};

const Stats = () => {
    const stats = [
        {
            icon: FaPalette,
            value: 100,
            label: "Foco em UX/UI",
            suffix: "%",
            color: "#B650F2",
        },
        {
            icon: FaLaptopCode,
            value: 100,
            label: "Desenvolvimento Moderno",
            suffix: "%",
            color: "#C86BFD",
        },
        {
            icon: FaBrain,
            value: 100,
            label: "Design Cognitivo",
            suffix: "%",
            color: "#9AA6C4",
        },
        {
            icon: FaRocket,
            value: 100,
            label: "Performance & SEO",
            suffix: "%",
            color: "#48307A",
        },
    ];

    return (
        <Box
            as="section"
            py={20}
            px={{ base: 4, md: 8, lg: 16 }}
            position="relative"
            overflow="hidden"
        >
            {/* Background com gradiente animado */}
            <Box
                position="absolute"
                top="0"
                left="0"
                right="0"
                bottom="0"
                opacity={0.1}
                bgGradient="linear(to-br, #B650F2, #48307A, #9AA6C4)"
                filter="blur(100px)"
                pointerEvents="none"
            />

            <VStack spacing={12} position="relative" zIndex={1}>
                {/* Título da seção */}
                <MotionBox
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <Heading
                        as="h2"
                        size="2xl"
                        textAlign="center"
                        bgGradient="linear(to-r, #B650F2, #C86BFD)"
                        bgClip="text"
                        fontWeight="bold"
                        mb={2}
                        textShadow="0 0 40px rgba(182, 80, 242, 0.3)"
                    >
                        Pilares de Atuação
                    </Heading>
                    <Text
                        textAlign="center"
                        color="gray.400"
                        fontSize="lg"
                        maxW="600px"
                        mx="auto"
                    >
                        Fundamentos que garantem a excelência e o sucesso de cada projeto
                    </Text>
                </MotionBox>

                {/* Grid de estatísticas */}
                <SimpleGrid
                    columns={{ base: 1, sm: 2, lg: 4 }}
                    spacing={8}
                    w="100%"
                    maxW="1400px"
                >
                    {stats.map((stat, index) => (
                        <StatCard
                            key={index}
                            icon={stat.icon}
                            value={stat.value}
                            label={stat.label}
                            suffix={stat.suffix}
                            color={stat.color}
                            delay={index * 0.1}
                        />
                    ))}
                </SimpleGrid>
            </VStack>
        </Box>
    );
};

export default Stats;
