import React from "react";
import { Box, VStack, Spinner, Center } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import Header from "@/Components/Header/header";
import Footer from "@/Components/Footer/footer";
import Navigation from "@/Components/Navigation";
import AnimatedSection from "@/Components/AnimatedSection";
import SectionSeparator from "@/Components/common/SectionSeparator";
import BackgroundEffects from "@/Components/common/BackgroundEffects";

// Loading component
const LoadingFallback = () => (
    <Center py={20}>
        <Spinner size="xl" color="purple.500" thickness="4px" speed="0.65s" />
    </Center>
);

// Dynamic imports com Next.js (previne erros de hidratação)
const Projects = dynamic(() => import("@/Components/modules/projects"), {
    loading: () => <LoadingFallback />,
    ssr: true
});

const Education = dynamic(() => import("@/Components/modules/education"), {
    loading: () => <LoadingFallback />,
    ssr: true
});

const ProfessionalExperience = dynamic(() => import("@/Components/modules/experiencie"), {
    loading: () => <LoadingFallback />,
    ssr: true
});

const About = dynamic(() => import("@/Components/modules/about"), {
    loading: () => <LoadingFallback />,
    ssr: true
});

const TechnologiesSection = dynamic(() => import("@/Components/modules/carrousel"), {
    loading: () => <LoadingFallback />,
    ssr: true
});

const Stats = dynamic(() => import("@/Components/modules/stats"), {
    loading: () => <LoadingFallback />,
    ssr: true
});

const SkillsRadar = dynamic(() => import("@/Components/modules/skillsRadar"), {
    loading: () => <LoadingFallback />,
    ssr: true
});

const CTA = dynamic(() => import("@/Components/modules/cta"), {
    loading: () => <LoadingFallback />,
    ssr: true
});

const ContactForm = dynamic(() => import("@/Components/modules/contactForm"), {
    loading: () => <LoadingFallback />,
    ssr: true
});

const IndexPage = () => (
    <Box
        as="main"
        bg="transparent"
        color="white"
        minHeight="100vh"
        position="relative"
        overflow="hidden"
    >
        <BackgroundEffects />
        <Navigation />

        <Box position="relative" zIndex={2}>
            <VStack spacing={0} width="100%">
                {/* Header / Hero Section */}
                <Box width="100%" p={{ base: "20px", md: "75px 15%" }} id="home">
                    <AnimatedSection delay={0.1}>
                        <Header />
                    </AnimatedSection>
                </Box>

                <SectionSeparator />

                {/* About Section */}
                <Box width="100%">
                    <AnimatedSection delay={0.2}>
                        <About />
                    </AnimatedSection>
                </Box>

                <SectionSeparator />

                {/* Stats Section */}
                <Box width="100%">
                    <AnimatedSection delay={0.2}>
                        <Stats />
                    </AnimatedSection>
                </Box>

                <SectionSeparator />

                {/* Skills Section (Radar + Carousel) */}
                <Box width="100%">
                    <AnimatedSection delay={0.2}>
                        <SkillsRadar />
                    </AnimatedSection>
                    <Box height="50px" />
                    <AnimatedSection delay={0.3}>
                        <TechnologiesSection />
                    </AnimatedSection>
                </Box>

                <SectionSeparator />

                {/* Experience Section */}
                <Box width="100%">
                    <AnimatedSection delay={0.2}>
                        <ProfessionalExperience />
                    </AnimatedSection>
                </Box>

                <SectionSeparator />

                {/* Education Section */}
                <Box width="100%">
                    <AnimatedSection delay={0.2}>
                        <Education />
                    </AnimatedSection>
                </Box>

                <SectionSeparator />

                {/* Projects Section */}
                <Box width="100%">
                    <AnimatedSection delay={0.2}>
                        <Projects />
                    </AnimatedSection>
                </Box>

                <SectionSeparator />

                {/* CTA Section */}
                <Box width="100%">
                    <AnimatedSection delay={0.2}>
                        <CTA />
                    </AnimatedSection>
                </Box>

                <SectionSeparator />

                {/* Contact Section */}
                <Box width="100%" id="contact" pb={20}>
                    <AnimatedSection delay={0.2}>
                        <ContactForm />
                    </AnimatedSection>
                </Box>

                <Footer />
            </VStack>
        </Box>
    </Box>
);

export default IndexPage;