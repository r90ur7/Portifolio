// components/Experience.tsx
import { Box, VStack, HStack, Text, Heading, Divider } from '@chakra-ui/react';

const experiences = [
    {
        title: "Desenvolvedor Fullstack - Empresa X",
        date: "Jan 2021 - Presente",
        description: "Trabalhei em projetos inovadores, desenvolvendo soluções fullstack utilizando tecnologias modernas.",
    },
    {
        title: "Desenvolvedor Frontend - Empresa Y",
        date: "Mar 2019 - Dez 2020",
        description: "Desenvolvi interfaces de usuário responsivas e acessíveis, colaborando com designers e desenvolvedores backend.",
    },
];

const Experience = () => (
    <Box py={20} px={10} bg="brand.50">
        <VStack spacing={8} align="start">
            <Heading as="h2" size="xl" color="brand.700">Experiência</Heading>
            <VStack spacing={4} align="start" position="relative">
                {experiences.map((experience, index) => (
                    <HStack key={index} align="start" spacing={4} position="relative">
                        <Box position="relative">
                            <Box bg="brand.500" h="10px" w="10px" borderRadius="full" />
                            {index < experiences.length - 1 && (
                                <Divider orientation="vertical" borderColor="brand.500" borderWidth="2px" height="100%" position="absolute" top="10px" left="4px" />
                            )}
                        </Box>
                        <VStack align="start">
                            <Heading as="h3" size="md">{experience.title}</Heading>
                            <Text>{experience.date}</Text>
                            <Text>{experience.description}</Text>
                        </VStack>
                    </HStack>
                ))}
            </VStack>
        </VStack>
    </Box>
);

export default Experience;
