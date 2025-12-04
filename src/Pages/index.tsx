import React, { lazy, Suspense } from "react";
import { Box, VStack, Spinner, Center } from "@chakra-ui/react";
import Header from "@/Components/Header/header";
import Footer from "@/Components/Footer/footer";
import Navigation from "@/Components/Navigation";
import AnimatedSection from "@/Components/AnimatedSection";
import SectionSeparator from "@/Components/common/SectionSeparator";
import BackgroundEffects from "@/Components/common/BackgroundEffects";

// Lazy load de componentes pesados
const Projects = lazy(() => import("@/Components/modules/projects"));
const Education = lazy(() => import("@/Components/modules/education"));
const ProfessionalExperience = lazy(() => import("@/Components/modules/experiencie"));
const About = lazy(() => import("@/Components/modules/about"));
const TechnologiesSection = lazy(() => import("@/Components/modules/carrousel"));
const Stats = lazy(() => import("@/Components/modules/stats"));
const SkillsRadar = lazy(() => import("@/Components/modules/skillsRadar"));
const CTA = lazy(() => import("@/Components/modules/cta"));
const ContactForm = lazy(() => import("@/Components/modules/contactForm"));

const LoadingFallback = () => (
    <Center py={20}>
        <Spinner size="xl" color="purple.500" thickness="4px" speed="0.65s" />
    </Center>
);

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
                        <Suspense fallback={<LoadingFallback />}>
                            <About />
                        </Suspense>
                    </AnimatedSection>
                </Box>

                <SectionSeparator />

                {/* Stats Section */}
                <Box width="100%">
                    <AnimatedSection delay={0.2}>
                        <Suspense fallback={<LoadingFallback />}>
                            <Stats />
                        </Suspense>
                    </AnimatedSection>
                </Box>

                <SectionSeparator />

                {/* Skills Section (Radar + Carousel) */}
                <Box width="100%">
                    <AnimatedSection delay={0.2}>
                        <Suspense fallback={<LoadingFallback />}>
                            <SkillsRadar />
                        </Suspense>
                    </AnimatedSection>
                    <Box height="50px" />
                    <AnimatedSection delay={0.3}>
                        <Suspense fallback={<LoadingFallback />}>
                            <TechnologiesSection />
                        </Suspense>
                    </AnimatedSection>
                </Box>

                <SectionSeparator />

                {/* Experience Section */}
                <Box width="100%">
                    <AnimatedSection delay={0.2}>
                        <Suspense fallback={<LoadingFallback />}>
                            <ProfessionalExperience />
                        </Suspense>
                    </AnimatedSection>
                </Box>

                <SectionSeparator />

                {/* Education Section */}
                <Box width="100%">
                    <AnimatedSection delay={0.2}>
                        <Suspense fallback={<LoadingFallback />}>
                            <Education />
                        </Suspense>
                    </AnimatedSection>
                </Box>

                <SectionSeparator />

                {/* Projects Section */}
                <Box width="100%">
                    <AnimatedSection delay={0.2}>
                        <Suspense fallback={<LoadingFallback />}>
                            <Projects />
                        </Suspense>
                    </AnimatedSection>
                </Box>

                <SectionSeparator />

                {/* CTA Section */}
                <Box width="100%">
                    <AnimatedSection delay={0.2}>
                        <Suspense fallback={<LoadingFallback />}>
                            <CTA />
                        </Suspense>
                    </AnimatedSection>
                </Box>

                <SectionSeparator />

                {/* Contact Section */}
                <Box width="100%" id="contact" pb={20}>
                    <AnimatedSection delay={0.2}>
                        <Suspense fallback={<LoadingFallback />}>
                            <ContactForm />
                        </Suspense>
                    </AnimatedSection>
                </Box>

                <Footer />
            </VStack>
        </Box>
    </Box>
);

export default IndexPage;