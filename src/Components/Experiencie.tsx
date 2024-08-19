// components/Experience.tsx
import { Box, VStack, HStack, Text, Heading } from '@chakra-ui/react'

const Experience = () => (
    <Box py={20} px={10} bg="brand.50">
        <VStack spacing={8} align="start">
            <Heading as="h2" size="xl" color="brand.700">Experiência</Heading>
            <VStack spacing={4} align="start">
                <HStack align="start">
                    <Box bg="brand.500" h="10px" w="10px" borderRadius="full" />
                    <VStack align="start">
                        <Heading as="h3" size="md">Desenvolvedor Fullstack - Empresa X</Heading>
                        <Text>Jan 2021 - Presente</Text>
                        <Text>Trabalhei em projetos inovadores...</Text>
                    </VStack>
                </HStack>
                {/* Adicione mais experiências aqui */}
            </VStack>
        </VStack>
    </Box>
)

export default Experience
