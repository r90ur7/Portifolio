import { Box, Heading, Text, Button } from '@chakra-ui/react'
import AnimatedSection from './AnimatedSection'

const Hero = () => {
    const handleScrollToAboutMe = () => {
        const aboutMeSection = document.getElementById('about-me')
        if (aboutMeSection) {
            aboutMeSection.scrollIntoView({ behavior: 'smooth' })
        }
    }
    return (
        <Box
            bgSize="contain"
            height="100vh"
            display="flex"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            color="white"
            pos={"relative"}
            _before={{
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundImage: 'url("/assets/hero-bg.webp")',
                backgroundSize: "100% auto",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                zIndex: -1,
                bgColor: "rgba(0, 0, 0, 0.5)",
                bgBlendMode: "overlay",
            }}
        >
            <AnimatedSection
            >
                <Heading
                    textShadow={"0 0 10px rgba(0, 0, 0, 0.9)"} as="h1" size="3xl">Bem-vindo ao Meu Portfólio</Heading>
                <Text
                    textShadow={"0 0 10px rgba(0, 0, 0, 0.9)"} fontSize="xl">Desenvolvedor Fullstack | Criador de Experiências Digitais</Text>
                <Button colorScheme="brand" size="lg" mt={6} onClick={handleScrollToAboutMe}>
                    Saiba Mais
                </Button>
            </AnimatedSection>
        </Box>
    )
}

export default Hero
