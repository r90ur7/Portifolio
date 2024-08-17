// components/Hero.tsx
import { Box, Heading, Text, Button, VStack } from '@chakra-ui/react'
import { motion } from 'framer-motion'

const Hero = () => (
    <Box
        bgImage="url('/hero-bg.jpg')"
        bgSize="cover"
        bgPosition="center"
        height="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        color="white"
    >
        <VStack spacing={4} as={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            <Heading as="h1" size="3xl">Bem-vindo ao Meu Portfólio</Heading>
            <Text fontSize="xl">Desenvolvedor Fullstack | Criador de Experiências Digitais</Text>
            <Button colorScheme="brand" size="lg" mt={6}>Saiba Mais</Button>
        </VStack>
    </Box>
)

export default Hero
