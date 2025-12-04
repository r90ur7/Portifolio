import React from "react";
import { Box, VStack } from "@chakra-ui/react";
import Header from "@/Components/Header/header";
import Footer from "@/Components/Footer/footer";
import Navigation from "@/Components/Navigation";
import Projects from "@/Components/modules/projects";
import Education from "@/Components/modules/education";
import ProfessionalExperience from "@/Components/modules/experiencie";
import About from "@/Components/modules/about";
import TechnologiesSection from "@/Components/modules/carrousel";
import Stats from "@/Components/modules/stats";
import SkillsRadar from "@/Components/modules/skillsRadar";
import CTA from "@/Components/modules/cta";
import ContactForm from "@/Components/modules/contactForm";
import AnimatedSection from "@/Components/AnimatedSection";
import SectionSeparator from "@/Components/common/SectionSeparator";
import BackgroundEffects from "@/Components/common/BackgroundEffects";

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