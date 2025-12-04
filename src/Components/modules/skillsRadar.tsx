import React, { useState, useEffect, useRef } from 'react';
import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer,
    Tooltip
} from 'recharts';
import { Box, Heading, Text, VStack, Flex } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const MotionBox = motion(Box);

const data = [
    { subject: 'Frontend', A: 95, fullMark: 100 },
    { subject: 'Backend', A: 85, fullMark: 100 },
    { subject: 'DevOps', A: 70, fullMark: 100 },
    { subject: 'UI/UX', A: 80, fullMark: 100 },
    { subject: 'Mobile', A: 60, fullMark: 100 },
    { subject: 'Soft Skills', A: 90, fullMark: 100 },
];

const SkillsRadar = () => {
    const [ref, inView] = useInView({
        threshold: 0.3,
        triggerOnce: true,
    });
    const [isReady, setIsReady] = useState(false);
    const chartContainerRef = useRef<HTMLDivElement>(null);

    const chartColor = "#B650F2";
    const gridColor = "rgba(255, 255, 255, 0.2)";
    const textColor = "#CBD5E0"; // gray.300

    // Garantir que o container tenha dimensões antes de renderizar o gráfico
    useEffect(() => {
        if (inView && chartContainerRef.current) {
            const checkDimensions = () => {
                const container = chartContainerRef.current;
                if (container) {
                    const { width, height } = container.getBoundingClientRect();
                    if (width > 0 && height > 0) {
                        setIsReady(true);
                    } else {
                        // Tentar novamente após um pequeno delay
                        setTimeout(checkDimensions, 100);
                    }
                }
            };
            
            // Aguardar um frame para garantir que o layout foi aplicado
            requestAnimationFrame(() => {
                setTimeout(checkDimensions, 50);
            });
        }
    }, [inView]);

    return (
        <Box
            ref={ref}
            py={20}
            px={{ base: 4, md: 8 }}
            maxW="1200px"
            mx="auto"
            id="skills-radar"
        >
            <Flex direction={{ base: "column", md: "row" }} align="center" justify="center" gap={10}>

                {/* Texto Explicativo */}
                <MotionBox
                    flex={1}
                    initial={{ opacity: 0, x: -50 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <VStack align="start" spacing={6}>
                        <Heading
                            as="h2"
                            fontSize={{ base: "3xl", md: "4xl" }}
                            fontWeight="bold"
                            bgGradient="linear(to-r, #B650F2, #9AA6C4)"
                            bgClip="text"
                        >
                            Equilíbrio Técnico
                        </Heading>
                        <Text color="gray.400" fontSize="lg" lineHeight="tall">
                            Minha jornada profissional me permitiu desenvolver um perfil equilibrado,
                            com forte ênfase em desenvolvimento Frontend e UX, mas com sólida base em
                            Backend e habilidades interpessoais essenciais.
                        </Text>
                        <Text color="gray.400" fontSize="lg" lineHeight="tall">
                            Este gráfico representa minha distribuição de competências atual,
                            mostrando onde concentro minha maior expertise e onde continuo a evoluir.
                        </Text>
                    </VStack>
                </MotionBox>

                {/* Gráfico Radar */}
                <MotionBox
                    flex={1}
                    w="full"
                    minW={{ base: "100%", md: "400px" }}
                    h={{ base: "350px", md: "400px" }}
                    minH={{ base: "350px", md: "400px" }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    bg="rgba(13, 27, 42, 0.4)"
                    borderRadius="2xl"
                    border="1px solid"
                    borderColor="rgba(182, 80, 242, 0.2)"
                    backdropFilter="blur(10px)"
                    p={4}
                    position="relative"
                    overflow="hidden"
                >
                    <Box 
                        ref={chartContainerRef}
                        width="100%" 
                        height="100%" 
                        minWidth="300px"
                        minHeight="300px"
                        position="relative"
                    >
                        {isReady && (
                            <ResponsiveContainer 
                                width="100%" 
                                height="100%" 
                                minHeight={300}
                                minWidth={300}
                            >
                                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
                                    <PolarGrid stroke={gridColor} />
                                    {/* @ts-ignore - recharts type compatibility issue with React 18 */}
                                    <PolarAngleAxis dataKey="subject" tick={{ fill: textColor, fontSize: 14 }} />
                                    {/* @ts-ignore - recharts type compatibility issue with React 18 */}
                                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                    <Radar
                                        name="Competência"
                                        dataKey="A"
                                        stroke={chartColor}
                                        strokeWidth={3}
                                        fill={chartColor}
                                        fillOpacity={0.4}
                                    />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#1A202C', border: 'none', borderRadius: '8px', color: '#fff' }}
                                        itemStyle={{ color: '#B650F2' }}
                                    />
                                </RadarChart>
                            </ResponsiveContainer>
                        )}
                    </Box>
                </MotionBox>

            </Flex>
        </Box>
    );
};

export default SkillsRadar;
